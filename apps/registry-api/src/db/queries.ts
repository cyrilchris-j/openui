import type {
  Category,
  CollectionDetail,
  CollectionSummary,
  ContributorSummary,
  DesignToken,
  Paginated,
  ResourceDetail,
  ResourceSummary,
  ResourceType,
  SearchQuery,
  SearchResult,
  SubmissionSummary,
  TagSummary,
} from "@openui/types";
import { isPublicResourceStatus } from "@openui/types";
import { buildFacets, parseSearchParams } from "@openui/search";
import { notFound } from "@openui/utils";

import type { Database } from "./client.js";

/**
 * Read queries.
 *
 * Every list query is written as: filter → window count → order → limit/offset,
 * in one round trip, with the total returned alongside the page. That avoids the
 * classic N+1 of "select count(*) then select page" and keeps the API's
 * pagination honest under concurrent writes.
 */

/** The row shape returned by the resource list projection. */
interface ResourceRow {
  id: string;
  slug: string;
  name: string;
  title: string;
  description: string;
  resource_type: ResourceType;
  status: string;
  category_slug: string | null;
  category_name: string | null;
  design_system_slug: string | null;
  license_spdx: string | null;
  author_id: string | null;
  author_username: string | null;
  author_display_name: string | null;
  author_avatar_url: string | null;
  latest_version: string | null;
  tags: string[] | null;
  genre: string | null;
  macrostructure: string | null;
  density: string | null;
  shape_language: string | null;
  motion_language: string | null;
  typography_style: string | null;
  color_strategy: string | null;
  dependencies: string[] | null;
  registry_dependencies: string[] | null;
  download_count: number;
  view_count: number;
  favorite_count: number;
  difficulty: string | null;
  created_at: Date;
  updated_at: Date;
  published_at: Date | null;
  total_count?: string | number;
}

function iso(value: Date | string | null): string {
  if (value === null) return new Date(0).toISOString();
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
}

export function toResourceSummary(row: ResourceRow): ResourceSummary {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    title: row.title,
    description: row.description,
    resourceType: row.resource_type,
    status: row.status as ResourceSummary["status"],
    categorySlug: row.category_slug,
    categoryName: row.category_name,
    designSystemSlug: row.design_system_slug,
    licenseSpdx: row.license_spdx,
    author: row.author_id
      ? {
          id: row.author_id,
          username: row.author_username ?? "unknown",
          displayName: row.author_display_name,
          avatarUrl: row.author_avatar_url,
        }
      : null,
    latestVersion: row.latest_version,
    tags: row.tags ?? [],
    // The database schema has no subcategory/fingerprint columns yet; they are
    // registry-artifact concepts. Explicit nulls, never plausible guesses.
    subcategory: null,
    fingerprint: null,
    design: row.genre
      ? {
          genre: row.genre,
          macrostructure: row.macrostructure,
          density: row.density,
          shapeLanguage: row.shape_language,
          motionLanguage: row.motion_language,
          typographyStyle: row.typography_style,
          colorStrategy: row.color_strategy,
        }
      : null,
    dependencies: row.dependencies ?? [],
    registryDependencies: row.registry_dependencies ?? [],
    downloadCount: Number(row.download_count ?? 0),
    viewCount: Number(row.view_count ?? 0),
    favoriteCount: Number(row.favorite_count ?? 0),
    difficulty: row.difficulty,
    createdAt: iso(row.created_at),
    updatedAt: iso(row.updated_at),
    publishedAt: row.published_at ? iso(row.published_at) : null,
  };
}

/**
 * The shared projection, split into fields and joins so that a caller can add
 * `count(*) over ()` for pagination totals without duplicating the joins.
 *
 * Dependencies come from the version row, not from the resource: they are part of
 * what was reviewed and published at that version, and a resource that dropped a
 * dependency should not retroactively change its history.
 */
const RESOURCE_FIELDS = `
  r.id, r.slug, r.name, r.title, r.description, r.resource_type, r.status::text as status,
  c.slug as category_slug, c.name as category_name,
  ds.slug as design_system_slug,
  l.spdx_id as license_spdx,
  r.author_id, p.username as author_username, p.display_name as author_display_name, p.avatar_url as author_avatar_url,
  v.version as latest_version,
  (select array_agg(t.slug::text order by t.slug) from resource_tags rt join tags t on t.id = rt.tag_id where rt.resource_id = r.id) as tags,
  ds.genre::text as genre, ds.macrostructure::text as macrostructure, ds.density::text as density,
  ds.shape_language::text as shape_language, ds.motion_language::text as motion_language,
  ds.typography_style::text as typography_style, ds.color_strategy::text as color_strategy,
  coalesce(v.npm_dependencies, '{}') as dependencies,
  coalesce(v.registry_dependencies, '{}') as registry_dependencies,
  r.download_count, r.view_count, r.favorite_count, r.difficulty::text as difficulty,
  r.created_at, r.updated_at, r.published_at
`;

const RESOURCE_JOINS = `
  from resources r
  left join categories c on c.id = r.category_id
  left join design_systems ds on ds.id = r.design_system_id
  left join licenses l on l.id = r.license_id
  left join profiles p on p.user_id = r.author_id
  left join resource_versions v on v.id = r.latest_version_id
`;

/** Anonymous readers only ever see published or deprecated, non-deleted rows. */
const PUBLIC_FILTER = `r.deleted_at is null and r.status in ('published', 'deprecated')`;

export interface ListOptions {
  limit: number;
  offset: number;
  sorts: "recent" | "popular" | "name";
}

export async function listResources(
  sql: Database,
  options: ListOptions & { resourceType?: ResourceType; categorySlug?: string },
): Promise<Paginated<ResourceSummary>> {
  const order =
    options.sorts === "popular"
      ? sql`r.download_count desc, r.favorite_count desc`
      : options.sorts === "name"
        ? sql`lower(r.title) asc`
        : sql`r.published_at desc nulls last`;

  const rows = await sql<ResourceRow[]>`
    select ${sql.unsafe(RESOURCE_FIELDS)}, count(*) over () as total_count
    ${sql.unsafe(RESOURCE_JOINS)}
    where ${sql.unsafe(PUBLIC_FILTER)}
      and (${options.resourceType ?? null}::resource_type is null or r.resource_type = ${options.resourceType ?? null}::resource_type)
      and (${options.categorySlug ?? null}::text is null or c.slug = ${options.categorySlug ?? null})
    order by ${order}
    limit ${options.limit} offset ${options.offset}
  `;

  return {
    items: rows.map(toResourceSummary),
    total: Number(rows[0]?.total_count ?? 0),
    page: Math.floor(options.offset / Math.max(1, options.limit)) + 1,
    perPage: options.limit,
    hasMore: options.offset + rows.length < Number(rows[0]?.total_count ?? 0),
  };
}

export async function getResourceBySlug(sql: Database, slug: string): Promise<ResourceDetail> {
  const rows = await sql<ResourceRow[]>`
    select ${sql.unsafe(RESOURCE_FIELDS)}
    ${sql.unsafe(RESOURCE_JOINS)}
    where r.slug = ${slug} and ${sql.unsafe(PUBLIC_FILTER)}
    limit 1
  `;
  const row = rows[0];
  if (!row) throw notFound(`Resource "${slug}" was not found.`);

  const versions = await sql<
    Array<{
      id: string;
      resource_id: string;
      version: string;
      commit_sha: string | null;
      changelog: string | null;
      is_latest: boolean;
      published_at: Date | null;
      created_at: Date;
    }>
  >`
    select id, resource_id, version, commit_sha, changelog, is_latest, published_at, created_at
    from resource_versions
    where resource_id = ${row.id}
    order by created_at desc
  `;

  const latest = versions.find((version) => version.is_latest) ?? versions[0];
  const files = latest
    ? await sql<
        Array<{
          id: string;
          path: string;
          file_type: string;
          content_hash: string;
          size_bytes: number;
          source_url: string | null;
        }>
      >`
        select id, path, file_type, content_hash, size_bytes, source_url
        from resource_files
        where resource_version_id = ${latest.id}
        order by path
      `
    : [];

  const designRules = await sql<Array<{ design_md: string | null }>>`
    select ds.design_md
    from design_systems ds
    join resources r on r.design_system_id = ds.id
    where r.id = ${row.id}
    limit 1
  `;

  return {
    ...toResourceSummary(row),
    repositoryUrl: null,
    documentationUrl: null,
    previewUrl: null,
    versions: versions.map((version) => ({
      id: version.id,
      resourceId: version.resource_id,
      version: version.version,
      commitSha: version.commit_sha,
      changelog: version.changelog,
      isLatest: version.is_latest,
      publishedAt: version.published_at ? iso(version.published_at) : null,
      createdAt: iso(version.created_at),
    })),
    files: files.map((file) => ({
      id: file.id,
      path: file.path,
      fileType: file.file_type,
      contentHash: file.content_hash,
      sizeBytes: Number(file.size_bytes),
      sourceUrl: file.source_url,
    })),
    designRules: designRules[0]?.design_md ?? null,
  };
}

export async function listResourceFiles(sql: Database, slug: string, version: string) {
  const rows = await sql<Array<{ path: string; file_type: string; content: string; content_hash: string; size_bytes: number; target: string | null }>>`
    select f.path, f.file_type, f.content, f.content_hash, f.size_bytes, f.target
    from resource_files f
    join resource_versions v on v.id = f.resource_version_id
    join resources r on r.id = v.resource_id
    where r.slug = ${slug} and v.version = ${version}
    order by f.path
  `;
  return rows;
}

export async function listCategories(sql: Database): Promise<Category[]> {
  const rows = await sql<
    Array<{
      id: string;
      slug: string;
      name: string;
      description: string | null;
      resource_type: ResourceType | null;
      sort_order: number;
      resource_count: string;
    }>
  >`
    select c.id, c.slug, c.name, c.description, c.resource_type, c.sort_order,
           count(r.id) filter (where r.status in ('published','deprecated') and r.deleted_at is null) as resource_count
    from categories c
    left join resources r on r.category_id = c.id
    group by c.id
    order by c.sort_order
  `;
  return rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    resourceType: row.resource_type,
    sortOrder: row.sort_order,
    resourceCount: Number(row.resource_count),
  }));
}

export async function listTags(sql: Database, limit = 60): Promise<TagSummary[]> {
  const rows = await sql<Array<{ id: string; slug: string; name: string; resource_count: string }>>`
    select t.id, t.slug, t.name, count(rt.resource_id) as resource_count
    from tags t
    left join resource_tags rt on rt.tag_id = t.id
    group by t.id
    order by count(rt.resource_id) desc, t.slug asc
    limit ${limit}
  `;
  return rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    resourceCount: Number(row.resource_count),
  }));
}

export interface DesignSystemRecord {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  dna: Record<string, string | null>;
  designMd: string | null;
  tokens: DesignToken[];
  resourceCount: number;
}

export async function listDesignSystems(sql: Database): Promise<DesignSystemRecord[]> {
  const rows = await sql<
    Array<{
      id: string;
      slug: string;
      name: string;
      description: string | null;
      genre: string | null;
      macrostructure: string | null;
      density: string | null;
      shape_language: string | null;
      motion_language: string | null;
      typography_style: string | null;
      color_strategy: string | null;
      design_md: string | null;
      resource_count: string;
    }>
  >`
    select ds.*, count(r.id) filter (where r.status in ('published','deprecated') and r.deleted_at is null) as resource_count
    from design_systems ds
    left join resources r on r.design_system_id = ds.id
    where ds.deleted_at is null
    group by ds.id
    order by ds.name
  `;

  return rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    dna: {
      genre: row.genre,
      macrostructure: row.macrostructure,
      density: row.density,
      shapeLanguage: row.shape_language,
      motionLanguage: row.motion_language,
      typographyStyle: row.typography_style,
      colorStrategy: row.color_strategy,
    },
    designMd: row.design_md,
    tokens: [],
    resourceCount: Number(row.resource_count),
  }));
}

export async function getDesignSystem(sql: Database, slug: string): Promise<DesignSystemRecord> {
  const systems = await listDesignSystems(sql);
  const system = systems.find((candidate) => candidate.slug === slug);
  if (!system) throw notFound(`Design system "${slug}" was not found.`);

  const tokens = await sql<
    Array<{
      id: string;
      design_system_id: string;
      token_type: DesignToken["tokenType"];
      name: string;
      value: string;
      dark_value: string | null;
      description: string | null;
      sort_order: number;
    }>
  >`
    select * from design_tokens where design_system_id = ${system.id} order by token_type, sort_order, name
  `;

  return {
    ...system,
    tokens: tokens.map((token) => ({
      id: token.id,
      designSystemId: token.design_system_id,
      tokenType: token.token_type,
      name: token.name,
      value: token.value,
      darkValue: token.dark_value,
      description: token.description,
      sortOrder: token.sort_order,
    })),
  };
}

export async function listContributors(sql: Database, limit = 48): Promise<ContributorSummary[]> {
  const rows = await sql<
    Array<{
      id: string;
      username: string | null;
      display_name: string | null;
      avatar_url: string | null;
      bio: string | null;
      resource_count: number;
      total_downloads: string;
      created_at: Date;
    }>
  >`
    select c.id, p.username, coalesce(c.name, p.display_name) as display_name,
           coalesce(c.avatar_url, p.avatar_url) as avatar_url, coalesce(c.bio, p.bio) as bio,
           c.resource_count, c.total_downloads, c.created_at
    from contributors c
    left join profiles p on p.user_id = c.profile_user_id
    order by c.total_downloads desc, c.name asc
    limit ${limit}
  `;
  return rows.map((row) => ({
    id: row.id,
    username: row.username ?? row.id.slice(0, 8),
    displayName: row.display_name,
    avatarUrl: row.avatar_url,
    bio: row.bio,
    resourceCount: Number(row.resource_count ?? 0),
    totalDownloads: Number(row.total_downloads ?? 0),
    joinedAt: iso(row.created_at),
  }));
}

export async function getContributor(sql: Database, username: string): Promise<ContributorSummary> {
  const rows = await listContributors(sql, 200);
  const contributor = rows.find((candidate) => candidate.username === username);
  if (!contributor) throw notFound(`Contributor "${username}" was not found.`);
  return contributor;
}

/* -------------------------------------------------------------------------- */
/* Search                                                                      */
/* -------------------------------------------------------------------------- */

export async function searchResources(sql: Database, raw: URLSearchParams): Promise<SearchResult> {
  const query = parseSearchParams(raw);
  const started = Date.now();

  const rows = await sql<
    Array<{
      resource_id: string;
      slug: string;
      title: string;
      rank: number;
      strategy: string;
      total: string;
    }>
  >`
    select * from app.search_resources(
      ${query.q ?? null},
      ${query.filters?.type ?? null}::resource_type[],
      ${query.filters?.category ?? null}::text[],
      ${query.filters?.genre ?? null}::design_genre[],
      ${query.filters?.density ?? null}::density[],
      ${query.filters?.shape ?? null}::shape_language[],
      ${query.filters?.motion ?? null}::motion_language[],
      ${query.filters?.typography ?? null}::typography_style[],
      ${query.filters?.macrostructure ?? null}::macrostructure[],
      ${query.filters?.designSystem?.[0] ?? null},
      ${query.filters?.license ?? null}::text[],
      ${query.filters?.difficulty ?? null}::difficulty[],
      ${query.filters?.zeroDependency ?? null},
      ${query.sort ?? "relevance"},
      ${query.perPage ?? 24},
      ${((query.page ?? 1) - 1) * (query.perPage ?? 24)}
    )
  `;

  const ids = rows.map((row) => row.resource_id);
  const total = Number(rows[0]?.total ?? 0);
  const full = ids.length > 0 ? await getResourcesByIds(sql, ids) : [];

  return {
    items: full,
    total,
    page: query.page ?? 1,
    perPage: query.perPage ?? 24,
    hasMore: (query.page ?? 1) * (query.perPage ?? 24) < total,
    tookMs: Date.now() - started,
    facets: buildFacets(full),
    strategy: (rows[0]?.strategy as SearchResult["strategy"]) ?? "browse",
  };
}

async function getResourcesByIds(sql: Database, ids: string[]): Promise<ResourceSummary[]> {
  const rows = await sql<ResourceRow[]>`
    select ${sql.unsafe(RESOURCE_FIELDS)}
    ${sql.unsafe(RESOURCE_JOINS)}
    where r.id = any(${ids}::uuid[]) and ${sql.unsafe(PUBLIC_FILTER)}
  `;
  const byId = new Map(rows.map((row) => [row.id, toResourceSummary(row)]));
  // Preserve the order the search returned, which carries the ranking.
  return ids.map((id) => byId.get(id)).filter((item): item is ResourceSummary => Boolean(item));
}

/* -------------------------------------------------------------------------- */
/* Collections and submissions                                                 */
/* -------------------------------------------------------------------------- */

export async function listCollections(
  sql: Database,
  options: { ownerId?: string | null; viewerId?: string | null; limit: number; offset: number },
): Promise<Paginated<CollectionSummary>> {
  const rows = await sql<
    Array<{
      id: string;
      slug: string;
      title: string;
      description: string | null;
      is_public: boolean;
      owner_id: string;
      owner_username: string | null;
      owner_display_name: string | null;
      item_count: string;
      created_at: Date;
      updated_at: Date;
      total_count: string;
    }>
  >`
    select c.id, c.slug, c.title, c.description, c.is_public, c.owner_id,
           p.username as owner_username, p.display_name as owner_display_name,
           (select count(*) from collection_items ci where ci.collection_id = c.id) as item_count,
           c.created_at, c.updated_at, count(*) over () as total_count
    from collections c
    left join profiles p on p.user_id = c.owner_id
    where (
      (c.is_public and c.owner_id is not distinct from ${options.ownerId ?? null})
      or (${options.ownerId ?? null}::uuid is not null and c.owner_id = ${options.ownerId ?? null})
    )
    order by c.updated_at desc
    limit ${options.limit} offset ${options.offset}
  `;

  return {
    items: rows.map((row) => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      description: row.description,
      isPublic: row.is_public,
      owner: row.owner_username
        ? { id: row.owner_id, username: row.owner_username, displayName: row.owner_display_name }
        : null,
      itemCount: Number(row.item_count),
      createdAt: iso(row.created_at),
      updatedAt: iso(row.updated_at),
    })),
    total: Number(rows[0]?.total_count ?? 0),
    page: Math.floor(options.offset / Math.max(1, options.limit)) + 1,
    perPage: options.limit,
    hasMore: options.offset + rows.length < Number(rows[0]?.total_count ?? 0),
  };
}

export async function getCollection(
  sql: Database,
  id: string,
  viewerId: string | null,
): Promise<CollectionDetail> {
  const rows = await sql<
    Array<{
      id: string;
      slug: string;
      title: string;
      description: string | null;
      is_public: boolean;
      owner_id: string;
      owner_username: string | null;
      owner_display_name: string | null;
      created_at: Date;
      updated_at: Date;
    }>
  >`
    select c.id, c.slug, c.title, c.description, c.is_public, c.owner_id,
           p.username as owner_username, p.display_name as owner_display_name, c.created_at, c.updated_at
    from collections c
    left join profiles p on p.user_id = c.owner_id
    where c.id = ${id}
      and (c.is_public or c.owner_id = ${viewerId}::uuid)
    limit 1
  `;

  const row = rows[0];
  if (!row) throw notFound("Collection not found.");

  const itemRows = await sql<Array<{ id: string; resource_id: string; note: string | null; sort_order: number }>>`
    select id, resource_id, note, sort_order from collection_items where collection_id = ${id} order by sort_order, id
  `;
  const resources = await getResourcesByIds(sql, itemRows.map((item) => item.resource_id));
  const byId = new Map(resources.map((resource) => [resource.id, resource]));

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    isPublic: row.is_public,
    owner: row.owner_username
      ? { id: row.owner_id, username: row.owner_username, displayName: row.owner_display_name }
      : null,
    itemCount: itemRows.length,
    createdAt: iso(row.created_at),
    updatedAt: iso(row.updated_at),
    items: itemRows
      .map((item) => {
        const resource = byId.get(item.resource_id);
        if (!resource) return null;
        return {
          id: item.id,
          collectionId: id,
          resourceId: item.resource_id,
          note: item.note,
          sortOrder: item.sort_order,
          resource,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null),
  };
}

export async function listSubmissions(
  sql: Database,
  options: {
    submitterId?: string | null;
    status?: string | null;
    submissionId?: string | null;
    limit: number;
    offset: number;
  },
): Promise<Paginated<SubmissionSummary>> {
  const rows = await sql<
    Array<{
      id: string;
      title: string;
      slug: string;
      resource_type: ResourceType;
      status: string;
      submitter_id: string | null;
      submitter_username: string | null;
      submitter_display_name: string | null;
      pull_request_url: string | null;
      review_notes: string | null;
      reviewer_id: string | null;
      created_at: Date;
      updated_at: Date;
      total_count: string;
    }>
  >`
    select s.id, s.title, s.slug, s.resource_type, s.status::text as status, s.submitter_id,
           p.username as submitter_username, p.display_name as submitter_display_name,
           s.pull_request_url, s.review_notes, s.reviewer_id, s.created_at, s.updated_at,
           count(*) over () as total_count
    from submissions s
    left join profiles p on p.user_id = s.submitter_id
    where (${options.submitterId ?? null}::uuid is null or s.submitter_id = ${options.submitterId ?? null})
      and (${options.status ?? null}::text is null or s.status = ${options.status ?? null}::submission_status)
      and (${options.submissionId ?? null}::uuid is null or s.id = ${options.submissionId ?? null})
    order by s.created_at asc
    limit ${options.limit} offset ${options.offset}
  `;

  return {
    items: rows.map((row) => ({
      id: row.id,
      title: row.title,
      slug: row.slug,
      resourceType: row.resource_type,
      status: row.status as SubmissionSummary["status"],
      submitter: row.submitter_username
        ? {
            id: row.submitter_id ?? "",
            username: row.submitter_username,
            displayName: row.submitter_display_name,
          }
        : null,
      pullRequestUrl: row.pull_request_url,
      reviewNotes: row.review_notes,
      reviewerId: row.reviewer_id,
      createdAt: iso(row.created_at),
      updatedAt: iso(row.updated_at),
    })),
    total: Number(rows[0]?.total_count ?? 0),
    page: Math.floor(options.offset / Math.max(1, options.limit)) + 1,
    perPage: options.limit,
    hasMore: options.offset + rows.length < Number(rows[0]?.total_count ?? 0),
  };
}

export { isPublicResourceStatus };

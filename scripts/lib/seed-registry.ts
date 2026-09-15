import type { Sql } from "postgres";

import {
  REGISTRY_ITEM_TYPE_TO_RESOURCE_TYPE,
  type BuiltRegistryItem,
} from "@openui/types";
import { parseDesignMarkdown } from "@openui/registry-schema";

import { integrityOf } from "./build.js";

/**
 * Registry → database mapping.
 *
 * Two rules make this safe to run repeatedly:
 *
 *  1. `upsertResourceFromItem` is an upsert keyed on the slug, so re-running the
 *     seed updates metadata (title, description, DNA) without duplicating rows.
 *  2. Publishing goes through `app.publish_resource`, which refuses to write a
 *     version that already exists. A re-run is therefore a no-op for content and
 *     a refresh for metadata — which is exactly the behaviour a sync job needs.
 */

export interface UpsertResult {
  resourceId: string;
  created: boolean;
  latestVersion: string | null;
}

async function referenceId(sql: Sql, table: string, column: string, value: string): Promise<string | null> {
  const rows = await sql.unsafe<Array<{ id: string }>>(
    `select id from ${table} where ${column} = $1 limit 1`,
    [value],
  );
  return rows[0]?.id ?? null;
}

export async function upsertResourceFromItem(
  sql: Sql,
  item: BuiltRegistryItem,
  namespace = "default",
): Promise<UpsertResult> {
  const resourceType = REGISTRY_ITEM_TYPE_TO_RESOURCE_TYPE[item.type];
  const designRules = item.designRules ? parseDesignMarkdown(item.designRules) : null;
  const dna = { ...(item.meta?.dna ?? {}), ...(designRules?.dna ?? {}) };

  const categoryId = await referenceId(sql, "categories", "slug", item.category);
  const licenseId = item.license ? await referenceId(sql, "licenses", "spdx_id", item.license) : null;
  const designSystemId = item.designSystem
    ? await referenceId(sql, "design_systems", "slug", item.designSystem)
    : null;

  const existing = await sql<Array<{ id: string; latest_version: string | null }>>`
    select r.id, v.version as latest_version
      from resources r
      left join resource_versions v on v.id = r.latest_version_id
     where r.slug = ${item.name}
     limit 1
  `;

  const row = existing[0];

  const rows = await sql<Array<{ id: string }>>`
    insert into resources (
      slug, name, title, description, resource_type, status, category_id,
      design_system_id, license_id, difficulty, repository_url, documentation_url,
      preview_url, published_at, namespace
    ) values (
      ${item.name}, ${item.name}, ${item.title}, ${item.description}, ${resourceType},
      ${"published"}::resource_status, ${categoryId}, ${designSystemId}, ${licenseId},
      ${item.meta?.difficulty ?? null}, ${null}, ${item.docs ?? null},
      ${item.files.some((file) => file.path.startsWith("screenshot") || file.path.startsWith("preview")) ? item.url : null},
      now(), ${namespace}
    )
    on conflict (slug) do update set
      namespace = excluded.namespace,
      title = excluded.title,
      description = excluded.description,
      resource_type = excluded.resource_type,
      category_id = excluded.category_id,
      design_system_id = excluded.design_system_id,
      license_id = excluded.license_id,
      difficulty = excluded.difficulty
    returning id
  `;

  const resourceId = rows[0]?.id;
  if (!resourceId) throw new Error(`Could not upsert resource "${item.name}".`);

  // Design DNA is stored on the design system when one is referenced; a resource
  // without a system gets its own tokens-less DNA recorded in the audit log, so
  // the fingerprint is still reproducible from the database.
  if (!designSystemId && Object.keys(dna).length > 0) {
    await sql`
      insert into audit_logs (action, entity_type, entity_id, diff)
      values ('resource.design_dna', 'resource', ${resourceId}, ${sql.json(dna)})
    `;
  }

  // Tags come from the item's own list plus its category, and are created on
  // demand. Contributors cannot create tags directly through the API.
  const tagSlugs = [...new Set([...(item.tags ?? []), resourceType])].slice(0, 12);
  for (const slug of tagSlugs) {
    await sql`
      insert into tags (slug, name) values (${slug}, ${slug})
      on conflict (slug) do nothing
    `;
    const tagId = await referenceId(sql, "tags", "slug", slug);
    if (tagId) {
      await sql`
        insert into resource_tags (resource_id, tag_id) values (${resourceId}, ${tagId})
        on conflict do nothing
      `;
    }
  }

  return { resourceId, created: !row, latestVersion: row?.latest_version ?? null };
}

export interface PublishOptions {
  expectedLatest?: string | null;
  version?: string;
}

/**
 * Publishes an item's files as a new immutable version.
 *
 * Returns the version string when a new version was written, and `null` when the
 * version already exists (a re-run), so callers can report accurately.
 */
export async function publishResource(
  sql: Sql,
  resourceId: string,
  item: BuiltRegistryItem,
  defaultVersion: string,
  options: PublishOptions = {},
): Promise<string | null> {
  const version = options.version ?? defaultVersion;

  const existing = await sql<Array<{ id: string }>>`
    select id from resource_versions where resource_id = ${resourceId} and version = ${version} limit 1
  `;
  if (existing[0]) return null;

  const files = item.files.map((file) => ({
    path: file.path,
    type: file.type,
    target: file.target ?? null,
    content: file.content,
    contentHash: file.contentHash,
    sizeBytes: file.sizeBytes,
    sourceUrl: null,
  }));

  const integrity = integrityOf(item);

  await sql`
    select app.publish_resource(
      ${resourceId},
      ${version},
      ${sql.json(files)},
      ${null},
      ${`Published from registry artifact ${item.name}.`},
      ${integrity},
      ${options.expectedLatest ?? null},
      ${null},
      ${item.dependencies},
      ${item.registryDependencies}
    )
  `;

  return version;
}

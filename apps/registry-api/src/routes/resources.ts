import { Hono } from "hono";

import type { Category, ResourceDetail, ResourceSummary, SearchResult } from "@openui/types";
import { badRequest, notFound, unauthorized } from "@openui/utils";
import { anonymizeIdentity } from "@openui/utils/node";

import {
  getContributor,
  getDesignSystem,
  getResourceBySlug,
  listCategories,
  listContributors,
  listDesignSystems,
  listResourceFiles,
  listResources,
  listTags,
  searchResources,
} from "../db/queries.js";
import {
  addFavorite,
  isFavorited,
  removeFavorite,
  recordDownload,
  recordView,
  resolveResourceId,
} from "../db/writes.js";
import { optionalResourceType, pagination, slugParam, sortParam } from "../params.js";
import { requirePrincipal, type AppBindings, type AppContext } from "../middleware.js";

/**
 * Public read surface.
 *
 * Every route here is reachable without authentication and only ever returns
 * rows that pass the public filter in the query layer (published or deprecated,
 * not deleted). That same filter is enforced again by the RLS policies, so a
 * mistake in one place does not become a disclosure.
 */
export function resourceRoutes(): Hono<AppBindings> {
  const app = new Hono<AppBindings>();

  app.get("/", async (c) => {
    const searchParams = new URL(c.req.url).searchParams;
    const { limit, offset } = pagination(searchParams);
    const resourceType = optionalResourceType(searchParams.get("type"));
    const categorySlug = searchParams.get("category");

    const result = await listResources(c.get("sql"), {
      limit,
      offset,
      sorts: sortParam(searchParams.get("sort")),
      ...(resourceType ? { resourceType } : {}),
      ...(categorySlug ? { categorySlug } : {}),
    });
    return c.json(result);
  });

  app.get("/:slug", async (c) => {
    const sql = c.get("sql");
    const slug = slugParam(c.req.param("slug"));
    const detail: ResourceDetail = await getResourceBySlug(sql, slug);

    // A read is a signal, so it is recorded — but never awaited in the response
    // path, and always against a hashed client identity rather than an address.
    void recordView(sql, detail.id, {
      userId: c.get("principal")?.auth.userId ?? null,
      clientHash: clientHashFor(c),
    });

    const principal = c.get("principal");
    const favorited = principal
      ? await isFavorited(sql, principal.auth.userId, detail.id)
      : false;
    return c.json({ ...detail, favorited });
  });

  app.get("/:slug/versions", async (c) => {
    const detail = await getResourceBySlug(c.get("sql"), slugParam(c.req.param("slug")));
    return c.json({ items: detail.versions, total: detail.versions.length });
  });

  app.get("/:slug/files", async (c) => {
    const sql = c.get("sql");
    const slug = slugParam(c.req.param("slug"));
    const requested = c.req.query("version");
    const detail = await getResourceBySlug(sql, slug);

    // Files are only served for a version the resource actually published.
    const version = requested ?? detail.versions.find((candidate) => candidate.isLatest)?.version;
    if (!version) throw badRequest("This resource has no published version yet.");
    if (!detail.versions.some((candidate) => candidate.version === version)) {
      throw badRequest(`Version "${version}" was not found for this resource.`);
    }

    const files = await listResourceFiles(sql, slug, version);
    return c.json({ version, items: files, total: files.length });
  });

  app.post("/:slug/download", async (c) => {
    const sql = c.get("sql");
    const slug = slugParam(c.req.param("slug"));
    const resourceId = await resolveResourceId(sql, slug);
    const downloadCount = await recordDownload(sql, resourceId, {
      userId: c.get("principal")?.auth.userId ?? null,
      clientHash: clientHashFor(c),
    });
    return c.json({ slug, downloadCount });
  });

  app.post("/:slug/favorite", async (c) => {
    const principal = requirePrincipal(c);
    const sql = c.get("sql");
    const slug = slugParam(c.req.param("slug"));
    const resourceId = await resolveResourceId(sql, slug);
    const result = await addFavorite(sql, principal.auth.userId, resourceId);
    return c.json({ slug, ...result });
  });

  app.delete("/:slug/favorite", async (c) => {
    const principal = requirePrincipal(c);
    const sql = c.get("sql");
    const slug = slugParam(c.req.param("slug"));
    const resourceId = await resolveResourceId(sql, slug);
    const result = await removeFavorite(sql, principal.auth.userId, resourceId);
    return c.json({ slug, ...result });
  });

  return app;
}

/** Categories, tags, themes, design systems, contributors and search. */
export function catalogRoutes(): Hono<AppBindings> {
  const app = new Hono<AppBindings>();

  app.get("/categories", async (c) => {
    const items: Category[] = await listCategories(c.get("sql"));
    return c.json({ items, total: items.length });
  });

  app.get("/categories/:slug", async (c) => {
    const slug = slugParam(c.req.param("slug"));
    const category = (await listCategories(c.get("sql"))).find(
      (candidate) => candidate.slug === slug,
    );
    if (!category) throw notFound(`Category "${slug}" was not found.`);

    const searchParams = new URL(c.req.url).searchParams;
    const { limit, offset } = pagination(searchParams);
    const result = await listResources(c.get("sql"), {
      limit,
      offset,
      sorts: sortParam(searchParams.get("sort")),
      categorySlug: slug,
    });
    return c.json({ category, ...result });
  });

  app.get("/tags", async (c) => {
    const items = await listTags(c.get("sql"));
    return c.json({ items, total: items.length });
  });

  app.get("/tags/:slug", async (c) => {
    const slug = slugParam(c.req.param("slug"));
    // Tag filtering goes through the same ranking function the search page uses,
    // so a tag landing page and a tag filter return the same ordering.
    const params = new URLSearchParams(new URL(c.req.url).searchParams);
    params.set("tag", slug);
    const result: SearchResult = await searchResources(c.get("sql"), params);
    return c.json({ tag: { slug }, ...result });
  });

  // Themes are resources of type `theme`. The dedicated route exists because the
  // navigation treats them as a top-level category rather than a filter.
  app.get("/themes", async (c) => {
    const searchParams = new URL(c.req.url).searchParams;
    const { limit, offset } = pagination(searchParams);
    const result = await listResources(c.get("sql"), {
      limit,
      offset,
      sorts: sortParam(searchParams.get("sort")),
      resourceType: "theme",
    });
    return c.json(result);
  });

  app.get("/design-systems", async (c) => {
    const items = await listDesignSystems(c.get("sql"));
    return c.json({ items, total: items.length });
  });

  app.get("/design-systems/:slug", async (c) => {
    const system = await getDesignSystem(c.get("sql"), slugParam(c.req.param("slug")));
    const searchParams = new URL(c.req.url).searchParams;
    const { limit, offset } = pagination(searchParams);
    const resources = await listResources(c.get("sql"), {
      limit,
      offset,
      sorts: sortParam(searchParams.get("sort")),
    });
    const items: ResourceSummary[] = resources.items.filter(
      (item) => item.designSystemSlug === system.slug,
    );
    return c.json({ ...system, items, total: items.length });
  });

  app.get("/contributors", async (c) => {
    const items = await listContributors(c.get("sql"));
    return c.json({ items, total: items.length });
  });

  app.get("/contributors/:username", async (c) => {
    const username = c.req.param("username");
    if (!/^[A-Za-z0-9_-]{2,39}$/.test(username)) throw badRequest("That is not a valid username.");
    const contributor = await getContributor(c.get("sql"), username);

    const searchParams = new URL(c.req.url).searchParams;
    const { limit, offset } = pagination(searchParams);
    const resources = await listResources(c.get("sql"), {
      limit,
      offset,
      sorts: sortParam(searchParams.get("sort")),
    });
    const items = resources.items.filter(
      (item) => item.author?.username.toLowerCase() === username.toLowerCase(),
    );
    return c.json({ ...contributor, items, total: items.length });
  });

  app.get("/search", async (c) => {
    const result: SearchResult = await searchResources(
      c.get("sql"),
      new URL(c.req.url).searchParams,
    );
    return c.json(result);
  });

  return app;
}

/**
 * Hashes the client address so no raw address is ever written to the database.
 * The salt comes from the environment, so digests are not portable between
 * deployments (or reversible against a precomputed table).
 */
export function clientHashFor(c: AppContext): string | null {
  const address =
    c.req.header("x-forwarded-for")?.split(",")[0]?.trim() ??
    c.req.header("cf-connecting-ip") ??
    c.req.header("x-real-ip");
  if (!address) return null;
  return anonymizeIdentity(address, c.get("env").TELEMETRY_SALT);
}

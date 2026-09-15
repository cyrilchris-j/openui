import { Hono } from "hono";

import { publicConfig } from "../env.js";
import type { AppBindings, AppContext } from "../middleware.js";
import type { RegistryStore } from "../registry/store.js";

/**
 * Registry endpoints.
 *
 * These are the endpoints the CLI and any other consumer talks to. Their
 * contract is stricter than the human-facing API in two ways:
 *
 *  - **They are byte-stable.** An item response is the artifact exactly as the
 *    build wrote it, so an integrity digest computed by the client matches the
 *    one in the index. Re-serialising here would break that.
 *  - **They are aggressively cacheable.** Published artifacts are immutable, so
 *    the response carries a long `max-age` plus an `ETag` derived from the
 *    content, and a conditional request is answered without touching disk.
 */
export function registryRoutes(store: RegistryStore): Hono<AppBindings> {
  const app = new Hono<AppBindings>();

  app.get("/registry.json", async (c) => {
    const index = await store.index();
    return c.json(index);
  });

  /**
   * Namespace-qualified item lookup.
   *
   * Note the ordering trap: `/:namespace/:name` and `/:name` collide for any
   * single-segment path, so the qualified route is registered first and the
   * unqualified route validates that its segment is not a namespace itself.
   */
  app.get("/:namespace/:name", async (c) => {
    const namespace = c.req.param("namespace");
    const name = c.req.param("name").replace(/\.json$/, "");
    return serveItem(c, store, name, namespace);
  });

  app.get("/:name", async (c) => {
    const segment = c.req.param("name");

    // `registry.json` is handled above; anything else ending in `.json` is an
    // item. A request without the suffix is accepted too, because a human typing
    // the URL should get the metadata rather than a 404.
    const name = segment.replace(/\.json$/, "");
    const index = await store.index();
    if (index.namespaces.includes(name)) {
      // The segment was a namespace, not an item: answer with that namespace's
      // items rather than pretending it is a component.
      const items = index.items.filter((entry) => entry.namespace === name);
      return c.json({ namespace: name, items, total: items.length });
    }

    return serveItem(c, store, name);
  });

  return app;
}

async function serveItem(
  c: AppContext,
  store: RegistryStore,
  name: string,
  namespace?: string,
): Promise<Response> {
  const { artifact, raw, entry } = await store.item(name, namespace);

  // Weak-free ETag over the artifact bytes: two builds of identical content
  // produce the same validator, so a client only re-downloads on real change.
  const etag = `"${entry.integrity}"`;
  c.header("etag", etag);
  c.header(
    "cache-control",
    "public, max-age=300, s-maxage=86400, stale-while-revalidate=604800, immutable",
  );
  c.header("content-type", "application/json; charset=utf-8");

  if (c.req.header("if-none-match") === etag) return c.body(null, 304);

  // Headers are already set; returning the raw string keeps the bytes identical
  // to the artifact on disk rather than a pretty-printed re-encoding.
  void artifact;
  return c.body(raw, 200);
}

export function healthRoutes(store: RegistryStore): Hono<AppBindings> {
  const app = new Hono<AppBindings>();

  app.get("/health", async (c) => {
    const env = c.get("env");
    let database = "unknown";
    let registry: { items: number; directory: string } | { error: string };

    try {
      await c.get("sql")`select 1`;
      database = "ok";
    } catch {
      database = "unreachable";
    }

    try {
      const index = await store.index();
      registry = { items: index.items.length, directory: store.directory() };
    } catch (error) {
      registry = { error: error instanceof Error ? error.message : "unavailable" };
    }

    const degraded = database !== "ok";
    return c.json(
      {
        status: degraded ? "degraded" : "ok",
        database,
        registry,
        config: publicConfig(env),
      },
      // A degraded dependency is a 503 so a platform health check can act on it.
      degraded ? 503 : 200,
    );
  });

  app.get("/config", (c) => c.json(publicConfig(c.get("env"))));

  /**
   * Endpoint index. Cheap to serve and genuinely useful when someone lands on
   * the API root with a browser instead of guessing at paths.
   */
  app.get("/", (c) =>
    c.json({
      name: "OpenUI Registry API",
      version: "v1",
      registry: c.get("env").REGISTRY_BASE_URL,
      endpoints: [
        "GET    /api/v1/resources",
        "GET    /api/v1/resources/:slug",
        "GET    /api/v1/resources/:slug/versions",
        "GET    /api/v1/resources/:slug/files",
        "POST   /api/v1/resources/:slug/download",
        "POST   /api/v1/resources/:slug/favorite",
        "DELETE /api/v1/resources/:slug/favorite",
        "GET    /api/v1/categories",
        "GET    /api/v1/categories/:slug",
        "GET    /api/v1/tags",
        "GET    /api/v1/tags/:slug",
        "GET    /api/v1/themes",
        "GET    /api/v1/design-systems",
        "GET    /api/v1/design-systems/:slug",
        "GET    /api/v1/contributors",
        "GET    /api/v1/contributors/:username",
        "GET    /api/v1/search",
        "GET    /api/v1/me",
        "GET    /api/v1/me/favorites",
        "GET    /api/v1/me/collections",
        "GET    /api/v1/me/submissions",
        "GET    /api/v1/collections",
        "POST   /api/v1/collections",
        "GET    /api/v1/collections/:id",
        "PATCH  /api/v1/collections/:id",
        "DELETE /api/v1/collections/:id",
        "POST   /api/v1/collections/:id/items",
        "DELETE /api/v1/collections/:id/items/:slug",
        "POST   /api/v1/submissions",
        "GET    /api/v1/submissions/:id",
        "POST   /api/v1/reports",
        "GET    /api/v1/health",
        "GET    /r/registry.json",
        "GET    /r/:name.json",
        "GET    /r/:namespace/:name.json",
      ],
    }),
  );

  return app;
}

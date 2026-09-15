import { Hono } from "hono";

import type { AppBindings } from "../middleware.js";
import { getCollection, listCollections } from "../db/queries.js";
import { pagination, uuidParam } from "../params.js";

/**
 * Public collection read surface.
 *
 * A private collection is invisible to everyone but its owner: the query filters
 * on `is_public or owner_id = viewer`, and the API resolves the viewer from a
 * verified token rather than from a query parameter. Passing someone else's id
 * changes nothing.
 */
export function collectionRoutes(): Hono<AppBindings> {
  const app = new Hono<AppBindings>();

  app.get("/", async (c) => {
    const searchParams = new URL(c.req.url).searchParams;
    const { limit, offset } = pagination(searchParams);
    const owner = searchParams.get("owner");
    const viewerId = c.get("principal")?.auth.userId ?? null;

    const result = await listCollections(c.get("sql"), {
      // `owner=me` means "my collections", which requires a principal.
      ownerId: owner === "me" ? viewerId : null,
      viewerId,
      limit,
      offset,
    });

    // `owner=me` without a session must not silently return every public
    // collection as though it were the caller's.
    if (owner === "me" && !viewerId) {
      return c.json({ items: [], total: 0, page: 1, perPage: limit, hasMore: false });
    }
    return c.json(result);
  });

  app.get("/:id", async (c) => {
    const id = uuidParam(c.req.param("id"), "collection id");
    const collection = await getCollection(
      c.get("sql"),
      id,
      c.get("principal")?.auth.userId ?? null,
    );
    return c.json(collection);
  });

  return app;
}

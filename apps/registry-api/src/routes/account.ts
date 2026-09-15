import { Hono } from "hono";

import { z } from "zod";

import { notFound } from "@openui/utils";

import type { Database } from "../db/client.js";
import type { AppBindings } from "../middleware.js";
import { parseJson, requirePrincipal } from "../middleware.js";
import {
  createCollection,
  createReport,
  createSubmission,
  deleteCollection,
  addCollectionItem,
  listFavorites,
  listUserSubmissions,
  removeCollectionItem,
  updateCollection,
} from "../db/writes.js";
import { getCollection, listCollections, listResources, listSubmissions } from "../db/queries.js";
import { pagination, uuidParam } from "../params.js";

/**
 * Authenticated routes.
 *
 * Everything mounted here requires a verified principal. Ownership is enforced
 * in the query's `where` clause rather than by a check that could be forgotten,
 * so a resource that belongs to someone else is simply not found.
 */
export function accountRoutes(): Hono<AppBindings> {
  const app = new Hono<AppBindings>();

  app.get("/me", async (c) => {
    const principal = requirePrincipal(c);
    const sql = c.get("sql");
    const rows = await sql<
      Array<{
        id: string;
        user_id: string;
        username: string;
        display_name: string | null;
        bio: string | null;
        avatar_url: string | null;
        website_url: string | null;
        github_username: string | null;
        role: string;
        created_at: Date;
        updated_at: Date;
      }>
    >`
      select * from profiles where user_id = ${principal.auth.userId} limit 1
    `;
    const profile = rows[0];
    if (!profile) {
      throw notFound(
        "Your profile has not been created yet. Complete sign-up in the web app and try again.",
      );
    }
    return c.json({
      userId: profile.user_id,
      username: profile.username,
      displayName: profile.display_name,
      bio: profile.bio,
      avatarUrl: profile.avatar_url,
      websiteUrl: profile.website_url,
      githubUsername: profile.github_username,
      // The database is the authority; the token's claim is not echoed back.
      role: principal.role,
      email: principal.auth.email,
      createdAt: profile.created_at.toISOString(),
      updatedAt: profile.updated_at.toISOString(),
    });
  });

  app.get("/me/favorites", async (c) => {
    const principal = requirePrincipal(c);
    const sql = c.get("sql");
    const ids = await listFavorites(sql, principal.auth.userId);
    if (ids.length === 0) return c.json({ items: [], total: 0 });

    const page = pagination(new URL(c.req.url).searchParams);
    const all = await listResources(sql, { limit: 500, offset: 0, sorts: "recent" });
    const byId = new Map(ids.map((id, index) => [id, index]));
    const items = all.items
      .filter((item) => byId.has(item.id))
      // Favourites are ordered by when they were saved, newest first.
      .sort((a, b) => (byId.get(a.id) ?? 0) - (byId.get(b.id) ?? 0));

    return c.json({
      items: items.slice(page.offset, page.offset + page.limit),
      total: items.length,
      page: page.page,
      perPage: page.limit,
      hasMore: page.offset + page.limit < items.length,
    });
  });

  app.get("/me/collections", async (c) => {
    const principal = requirePrincipal(c);
    const { limit, offset } = pagination(new URL(c.req.url).searchParams);
    const result = await listCollections(c.get("sql"), {
      ownerId: principal.auth.userId,
      viewerId: principal.auth.userId,
      limit,
      offset,
    });
    return c.json(result);
  });

  app.post("/collections", async (c) => {
    const principal = requirePrincipal(c);
    const input = await parseJson(c, collectionBodySchema);
    const created = await createCollection(c.get("sql"), principal.auth.userId, input);
    return c.json(created, 201);
  });

  app.patch("/collections/:id", async (c) => {
    const principal = requirePrincipal(c);
    const id = uuidParam(c.req.param("id"), "collection id");
    const input = await parseJson(c, collectionBodySchema.partial());
    const updated = await updateCollection(c.get("sql"), principal.auth.userId, id, input);
    return c.json(updated);
  });

  app.delete("/collections/:id", async (c) => {
    const principal = requirePrincipal(c);
    const id = uuidParam(c.req.param("id"), "collection id");
    await deleteCollection(c.get("sql"), principal.auth.userId, id);
    return c.body(null, 204);
  });

  app.post("/collections/:id/items", async (c) => {
    const principal = requirePrincipal(c);
    const id = uuidParam(c.req.param("id"), "collection id");
    const input = await parseJson(c, collectionItemBodySchema);
    const sql = c.get("sql");
    const resourceId = await resolveResourceIdOrThrow(sql, input.resourceSlug);
    await addCollectionItem(sql, principal.auth.userId, id, resourceId, input.note);
    const collection = await getCollection(sql, id, principal.auth.userId);
    return c.json(collection, 201);
  });

  app.delete("/collections/:id/items/:slug", async (c) => {
    const principal = requirePrincipal(c);
    const id = uuidParam(c.req.param("id"), "collection id");
    const slug = slugSchema.parse(c.req.param("slug"));
    const sql = c.get("sql");
    const resourceId = await resolveResourceIdOrThrow(sql, slug);
    await removeCollectionItem(sql, principal.auth.userId, id, resourceId);
    return c.body(null, 204);
  });

  app.get("/me/submissions", async (c) => {
    const principal = requirePrincipal(c);
    const items = await listUserSubmissions(c.get("sql"), principal.auth.userId);
    return c.json({ items, total: items.length });
  });

  /**
   * A contributor opens a submission — never a published resource. The row lands
   * in `submissions` with status `pending` and can only move from there through
   * the moderation routes.
   */
  app.post("/submissions", async (c) => {
    const principal = requirePrincipal(c);
    const input = await parseJson(c, submissionBodySchema);
    const created = await createSubmission(c.get("sql"), principal.auth.userId, input);
    return c.json(created, 201);
  });

  app.get("/submissions/:id", async (c) => {
    const principal = requirePrincipal(c);
    const id = uuidParam(c.req.param("id"), "submission id");
    const sql = c.get("sql");
    const isStaff = principal.role === "moderator" || principal.role === "admin";

    // A submitter may read their own submission; staff may read any. Anyone else
    // gets a 404 rather than a 403, so the endpoint does not confirm existence.
    const result = await listSubmissions(sql, {
      submitterId: isStaff ? null : principal.auth.userId,
      submissionId: id,
      limit: 1,
      offset: 0,
    });
    const submission = result.items[0];
    if (!submission) throw notFound("Submission not found.");
    return c.json(submission);
  });

  /**
   * Report a resource. Sign-in is not required — someone who spots stolen work
   * should be able to say so — but an authenticated report is linked to an
   * account and deduplicated against open reports.
   */
  app.post("/reports", async (c) => {
    const input = await parseJson(c, reportBodySchema);
    const created = await createReport(c.get("sql"), c.get("principal")?.auth.userId ?? null, input);
    return c.json({ id: created.id, status: "open" }, 201);
  });

  return app;
}

/** Resolves a slug to an id, translating "unknown slug" into a 404. */
async function resolveResourceIdOrThrow(sql: Database, slug: string) {
  const result = await listResources(sql, { limit: 500, offset: 0, sorts: "recent" });
  const match = result.items.find((item) => item.slug === slug);
  if (!match) throw notFound(`Resource "${slug}" was not found.`);
  return match.id;
}

const slugSchema = z
  .string()
  .min(2)
  .max(64)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase words separated by single hyphens.");

const collectionBodySchema = z.object({
  title: z.string().min(2).max(80),
  description: z.string().max(400).optional(),
  isPublic: z.boolean().default(false),
  slug: slugSchema.optional(),
});

const collectionItemBodySchema = z.object({
  resourceSlug: slugSchema,
  note: z.string().max(280).optional(),
});

const submissionBodySchema = z.object({
  title: z.string().min(2).max(80),
  description: z.string().min(20).max(320),
  resourceType: z.enum([
    "component",
    "text",
    "motion",
    "interaction",
    "background",
    "layout",
    "section",
    "block",
    "theme",
    "pattern",
    "template",
    "ai",
    "hook",
    "utility",
    "config",
  ]),
  slug: slugSchema,
  pullRequestUrl: z.string().url().max(300).optional(),
});

const reportBodySchema = z.object({
  resourceSlug: slugSchema.optional(),
  reason: z.enum([
    "malicious_code",
    "license_violation",
    "stolen_work",
    "spam",
    "broken_preview",
    "inaccessible",
    "other",
  ]),
  details: z.string().max(2000).optional(),
});

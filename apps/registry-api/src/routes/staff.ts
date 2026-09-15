import { Hono } from "hono";

import { z } from "zod";

import { requireRole } from "../auth.js";
import { listSubmissions } from "../db/queries.js";
import {
  analyticsOverview,
  banUser,
  deprecateResource,
  listAuditLogs,
  reviewSubmission,
  setUserRole,
  softDeleteResource,
  updateReportStatus,
} from "../db/writes.js";
import type { AppBindings } from "../middleware.js";
import { parseJson, requirePrincipal } from "../middleware.js";
import { pagination, slugParam, uuidParam } from "../params.js";

/**
 * Staff surface.
 *
 * Authorisation is server-side and database-backed at every step: `requireRole`
 * reads the role from `profiles`, and the migrations' RLS policies enforce the
 * same rule again for direct database access. A hand-crafted token carrying
 * `role: "admin"` changes nothing here — the token's role claim is never read.
 */
export function staffRoutes(): Hono<AppBindings> {
  const app = new Hono<AppBindings>();

  app.get("/submissions", async (c) => {
    requireRole(requirePrincipal(c), "moderator");
    const searchParams = new URL(c.req.url).searchParams;
    const { limit, offset } = pagination(searchParams);
    const status = searchParams.get("status");
    const result = await listSubmissions(c.get("sql"), {
      status: isSubmissionStatus(status) ? status : null,
      limit,
      offset,
    });
    return c.json(result);
  });

  app.post("/submissions/:id/review", async (c) => {
    const principal = requireRole(requirePrincipal(c), "moderator");
    const id = uuidParam(c.req.param("id"), "submission id");
    const input = await parseJson(c, reviewBodySchema);

    // Approval is what turns a contribution into published content, so it is
    // gated one rank above routine triage: moderators may request changes or
    // reject, only administrators may approve.
    if (input.decision === "approved") requireRole(principal, "admin");

    const result = await reviewSubmission(c.get("sql"), principal.auth.userId, id, input);
    return c.json(result);
  });

  app.post("/reports/:id/status", async (c) => {
    const principal = requireRole(requirePrincipal(c), "moderator");
    const id = uuidParam(c.req.param("id"), "report id");
    const input = await parseJson(c, reportStatusBodySchema);
    const result = await updateReportStatus(
      c.get("sql"),
      principal.auth.userId,
      id,
      input.status,
      input.notes,
    );
    return c.json(result);
  });

  app.post("/resources/:slug/deprecate", async (c) => {
    const principal = requireRole(requirePrincipal(c), "moderator");
    const slug = slugParam(c.req.param("slug"));
    const result = await deprecateResource(c.get("sql"), principal.auth.userId, slug);
    return c.json({ slug, status: "deprecated", id: result.id });
  });

  app.delete("/resources/:slug", async (c) => {
    const principal = requireRole(requirePrincipal(c), "admin");
    const slug = slugParam(c.req.param("slug"));
    const result = await softDeleteResource(c.get("sql"), principal.auth.userId, slug);
    return c.json({ slug, status: "archived", id: result.id });
  });

  app.post("/users/:id/role", async (c) => {
    const principal = requireRole(requirePrincipal(c), "admin");
    const userId = uuidParam(c.req.param("id"), "user id");
    const input = await parseJson(c, roleBodySchema);
    const result = await setUserRole(c.get("sql"), principal.auth.userId, userId, input.role);
    return c.json(result);
  });

  app.post("/users/:id/ban", async (c) => {
    const principal = requireRole(requirePrincipal(c), "admin");
    const userId = uuidParam(c.req.param("id"), "user id");
    const input = await parseJson(c, banBodySchema);
    const result = await banUser(c.get("sql"), principal.auth.userId, userId, input.banned);
    return c.json({ id: result.id, banned: input.banned });
  });

  app.get("/audit-logs", async (c) => {
    requireRole(requirePrincipal(c), "admin");
    const items = await listAuditLogs(c.get("sql"));
    return c.json({ items, total: items.length });
  });

  app.get("/analytics", async (c) => {
    requireRole(requirePrincipal(c), "moderator");
    return c.json(await analyticsOverview(c.get("sql")));
  });

  return app;
}

type SubmissionStatusFilter = "pending" | "reviewing" | "approved" | "rejected" | "changes_requested";

function isSubmissionStatus(value: string | null): value is SubmissionStatusFilter {
  return (
    value === "pending" ||
    value === "reviewing" ||
    value === "approved" ||
    value === "rejected" ||
    value === "changes_requested"
  );
}

const reviewBodySchema = z.object({
  decision: z.enum(["reviewing", "approved", "rejected", "changes_requested"]),
  notes: z.string().max(2000).optional(),
});

const reportStatusBodySchema = z.object({
  status: z.enum(["open", "triaged", "resolved", "dismissed"]),
  notes: z.string().max(2000).optional(),
});

const roleBodySchema = z.object({
  role: z.enum(["user", "contributor", "moderator", "admin"]),
});

const banBodySchema = z.object({ banned: z.boolean().default(true) });

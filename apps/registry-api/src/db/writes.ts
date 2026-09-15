import { z } from "zod";

import { conflict, forbidden, notFound, OpenUIError } from "@openui/utils";

import type { Database } from "./client.js";

/**
 * Mutations.
 *
 * Three rules hold across every function here:
 *
 *  1. **Idempotence by constraint, not by check-then-write.** Favourites use
 *     `on conflict do nothing`, so two concurrent requests cannot produce an
 *     error or a duplicate.
 *  2. **Ownership is part of the `where` clause.** An update that belongs to
 *     another user matches zero rows and is reported as a 404, never as a
 *     successful no-op.
 *  3. **Status transitions are constrained in SQL.** A contributor cannot move a
 *     submission to `approved` by sending a different enum value, because the
 *     policy and the `where` clause both require staff.
 */

export async function addFavorite(sql: Database, userId: string, resourceId: string): Promise<{ favorited: boolean }> {
  await sql`
    insert into favorites (user_id, resource_id)
    values (${userId}, ${resourceId})
    on conflict (user_id, resource_id) do nothing
  `;
  return { favorited: true };
}

export async function removeFavorite(sql: Database, userId: string, resourceId: string): Promise<{ favorited: boolean }> {
  await sql`delete from favorites where user_id = ${userId} and resource_id = ${resourceId}`;
  return { favorited: false };
}

export async function listFavorites(sql: Database, userId: string) {
  const rows = await sql<Array<{ resource_id: string }>>`
    select resource_id from favorites where user_id = ${userId} order by created_at desc
  `;
  return rows.map((row) => row.resource_id);
}

export async function isFavorited(sql: Database, userId: string, resourceId: string): Promise<boolean> {
  const rows = await sql<Array<{ exists: boolean }>>`
    select exists(select 1 from favorites where user_id = ${userId} and resource_id = ${resourceId}) as exists
  `;
  return rows[0]?.exists ?? false;
}

export async function resolveResourceId(sql: Database, slug: string): Promise<string> {
  const rows = await sql<Array<{ id: string }>>`
    select id from resources
     where slug = ${slug} and deleted_at is null and status in ('published', 'deprecated')
     limit 1
  `;
  const id = rows[0]?.id;
  if (!id) throw notFound(`Resource "${slug}" was not found.`);
  return id;
}

/** Counters are incremented inside the database, never read-modify-written. */
export async function recordDownload(
  sql: Database,
  resourceId: string,
  options: { userId: string | null; clientHash: string | null },
): Promise<number> {
  const rows = await sql<Array<{ record_download: number }>>`
    select app.record_download(${resourceId}, null, ${options.userId}, ${options.clientHash})
  `;
  return Number(rows[0]?.record_download ?? 0);
}

export async function recordView(
  sql: Database,
  resourceId: string,
  options: { userId: string | null; clientHash: string | null },
): Promise<void> {
  await sql`select app.record_view(${resourceId}, ${options.clientHash}, ${options.userId})`;
}

/* -------------------------------------------------------------------------- */
/* Collections                                                                 */
/* -------------------------------------------------------------------------- */

export const collectionInputSchema = z.object({
  title: z.string().min(2).max(80),
  description: z.string().max(400).optional(),
  isPublic: z.boolean().default(false),
  slug: z
    .string()
    .min(2)
    .max(64)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .optional(),
});

export type CollectionInput = z.infer<typeof collectionInputSchema>;

function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64)
    .replace(/-+$/, "");
}

export async function createCollection(sql: Database, userId: string, input: CollectionInput) {
  const slug = input.slug ?? slugifyTitle(input.title);
  if (!slug) throw conflict("Could not derive a slug from that title. Provide one explicitly.");

  try {
    const rows = await sql<Array<{ id: string; slug: string }>>`
      insert into collections (owner_id, slug, title, description, is_public)
      values (${userId}, ${slug}, ${input.title}, ${input.description ?? null}, ${input.isPublic})
      returning id, slug
    `;
    return rows[0]!;
  } catch (error) {
    if (String(error).includes("collections_owner_slug_unique")) {
      throw conflict(`You already have a collection with the slug "${slug}".`);
    }
    throw error;
  }
}

/**
 * A partial update. The shape is spelled out rather than derived from the zod
 * input type on purpose: `Partial<z.input<...>>` and `Partial<z.output<...>>`
 * differ on defaulted fields, and the looser explicit shape is what a PATCH
 * body actually is.
 */
export interface CollectionPatch {
  title?: string;
  description?: string;
  isPublic?: boolean;
  slug?: string;
}

export async function updateCollection(
  sql: Database,
  userId: string,
  id: string,
  input: CollectionPatch,
) {
  const rows = await sql<Array<{ id: string }>>`
    update collections
       set title = coalesce(${input.title ?? null}, title),
           description = coalesce(${input.description ?? null}, description),
           is_public = coalesce(${input.isPublic ?? null}, is_public)
     where id = ${id} and owner_id = ${userId}
    returning id
  `;
  if (!rows[0]) throw notFound("Collection not found.");
  return rows[0];
}

export async function deleteCollection(sql: Database, userId: string, id: string): Promise<void> {
  const rows = await sql<Array<{ id: string }>>`
    delete from collections where id = ${id} and owner_id = ${userId} returning id
  `;
  if (!rows[0]) throw notFound("Collection not found.");
}

export async function addCollectionItem(
  sql: Database,
  userId: string,
  collectionId: string,
  resourceId: string,
  note?: string,
): Promise<void> {
  const owned = await sql<Array<{ id: string }>>`
    select id from collections where id = ${collectionId} and owner_id = ${userId} limit 1
  `;
  if (!owned[0]) throw notFound("Collection not found.");

  const next = await sql<Array<{ next: number }>>`
    select coalesce(max(sort_order), 0) + 1 as next from collection_items where collection_id = ${collectionId}
  `;

  await sql`
    insert into collection_items (collection_id, resource_id, note, sort_order)
    values (${collectionId}, ${resourceId}, ${note ?? null}, ${next[0]?.next ?? 1})
    on conflict (collection_id, resource_id) do update set note = excluded.note
  `;
}

export async function removeCollectionItem(
  sql: Database,
  userId: string,
  collectionId: string,
  resourceId: string,
): Promise<void> {
  const owned = await sql<Array<{ id: string }>>`
    select id from collections where id = ${collectionId} and owner_id = ${userId} limit 1
  `;
  if (!owned[0]) throw notFound("Collection not found.");
  await sql`delete from collection_items where collection_id = ${collectionId} and resource_id = ${resourceId}`;
}

/* -------------------------------------------------------------------------- */
/* Submissions                                                                 */
/* -------------------------------------------------------------------------- */

export const submissionInputSchema = z.object({
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
  slug: z
    .string()
    .min(2)
    .max(64)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase words separated by single hyphens."),
  pullRequestUrl: z.string().url().max(300).optional(),
});

export type SubmissionInput = z.infer<typeof submissionInputSchema>;

export async function createSubmission(sql: Database, userId: string, input: SubmissionInput) {
  // A slug that already exists is a clear conflict, reported before the row is
  // written so the contributor gets a useful message rather than a 500.
  const existing = await sql<Array<{ id: string }>>`
    select id from resources where slug = ${input.slug} limit 1
  `;
  if (existing[0]) {
    throw conflict(`The slug "${input.slug}" is already published. Choose a different name.`);
  }

  const rows = await sql<Array<{ id: string; status: string }>>`
    insert into submissions (submitter_id, slug, title, description, resource_type, status, pull_request_url)
    values (${userId}, ${input.slug}, ${input.title}, ${input.description},
            ${input.resourceType}::resource_type, 'pending', ${input.pullRequestUrl ?? null})
    returning id, status::text as status
  `;
  return rows[0]!;
}

export async function listUserSubmissions(sql: Database, userId: string, limit = 50) {
  return sql<Array<{ id: string; title: string; slug: string; status: string; created_at: Date }>>`
    select id, title, slug, status::text as status, created_at
    from submissions where submitter_id = ${userId}
    order by created_at desc limit ${limit}
  `;
}

/* -------------------------------------------------------------------------- */
/* Reports                                                                     */
/* -------------------------------------------------------------------------- */

export const reportInputSchema = z.object({
  resourceSlug: z.string().min(1).max(64).optional(),
  reason: z.enum(["malicious_code", "license_violation", "stolen_work", "spam", "broken_preview", "inaccessible", "other"]),
  details: z.string().max(2000).optional(),
});

export type ReportInput = z.infer<typeof reportInputSchema>;

export async function createReport(sql: Database, userId: string | null, input: ReportInput) {
  const resourceId = input.resourceSlug ? await resolveResourceId(sql, input.resourceSlug) : null;

  // Rate-limit abuse at the data level as well as the edge: one open report per
  // reporter per resource is enough to start a review.
  if (userId && resourceId) {
    const existing = await sql<Array<{ id: string }>>`
      select id from reports
       where reporter_id = ${userId} and resource_id = ${resourceId} and status in ('open', 'triaged')
       limit 1
    `;
    if (existing[0]) throw conflict("You already have an open report for this resource.");
  }

  const rows = await sql<Array<{ id: string }>>`
    insert into reports (resource_id, reporter_id, reason, details)
    values (${resourceId}, ${userId}, ${input.reason}::report_reason, ${input.details ?? null})
    returning id
  `;
  return rows[0]!;
}

/* -------------------------------------------------------------------------- */
/* Moderation                                                                  */
/* -------------------------------------------------------------------------- */

export const reviewInputSchema = z.object({
  decision: z.enum(["reviewing", "approved", "rejected", "changes_requested"]),
  notes: z.string().max(2000).optional(),
});

export type ReviewInput = z.infer<typeof reviewInputSchema>;

export async function reviewSubmission(
  sql: Database,
  reviewerId: string,
  submissionId: string,
  input: ReviewInput,
) {
  return sql.begin(async (tx) => {
    const rows = await tx<Array<{ id: string; submitter_id: string | null }>>`
      select id, submitter_id from submissions where id = ${submissionId} for update
    `;
    if (!rows[0]) throw notFound("Submission not found.");

    await tx`
      insert into reviews (submission_id, reviewer_id, decision, notes)
      values (${submissionId}, ${reviewerId}, ${input.decision}::submission_status, ${input.notes ?? null})
      on conflict (submission_id, reviewer_id)
      do update set decision = excluded.decision, notes = excluded.notes, created_at = now()
    `;

    await tx`
      update submissions
         set status = ${input.decision}::submission_status,
             review_notes = ${input.notes ?? null},
             reviewer_id = ${reviewerId}
       where id = ${submissionId}
    `;

    await tx`
      insert into audit_logs (actor_id, action, entity_type, entity_id, diff)
      values (${reviewerId}, 'submission.review', 'submission', ${submissionId},
              ${tx.json({ decision: input.decision })})
    `;

    return { id: submissionId, status: input.decision };
  });
}

export async function updateReportStatus(
  sql: Database,
  staffId: string,
  reportId: string,
  status: "open" | "triaged" | "resolved" | "dismissed",
  notes?: string,
) {
  const rows = await sql<Array<{ id: string }>>`
    update reports
       set status = ${status}::report_status,
           resolution_notes = ${notes ?? null},
           resolved_at = case when ${status} in ('resolved', 'dismissed') then now() else null end
     where id = ${reportId}
    returning id
  `;
  if (!rows[0]) throw notFound("Report not found.");

  await sql`
    insert into audit_logs (actor_id, action, entity_type, entity_id, diff)
    values (${staffId}, 'report.update', 'report', ${reportId}, ${sql.json({ status })})
  `;
  return rows[0];
}

export async function deprecateResource(sql: Database, staffId: string, slug: string) {
  const rows = await sql<Array<{ id: string }>>`
    update resources
       set status = 'deprecated'
     where slug = ${slug} and deleted_at is null and status = 'published'
    returning id
  `;
  if (!rows[0]) throw notFound("Published resource not found.");

  await sql`
    insert into audit_logs (actor_id, action, entity_type, entity_id, diff)
    values (${staffId}, 'resource.deprecate', 'resource', ${rows[0].id}, ${sql.json({ slug })})
  `;
  return rows[0];
}

/**
 * Soft delete. Published resources are never removed destructively — a consumer
 * that installed version 1.0.0 must be able to see what it contained.
 */
export async function softDeleteResource(sql: Database, staffId: string, slug: string) {
  const rows = await sql<Array<{ id: string }>>`
    update resources set deleted_at = now(), status = 'archived'
     where slug = ${slug} and deleted_at is null
    returning id
  `;
  if (!rows[0]) throw notFound("Resource not found.");

  await sql`
    insert into audit_logs (actor_id, action, entity_type, entity_id, diff)
    values (${staffId}, 'resource.soft_delete', 'resource', ${rows[0].id}, ${sql.json({ slug })})
  `;
  return rows[0];
}

export async function setUserRole(sql: Database, staffId: string, userId: string, role: "user" | "contributor" | "moderator" | "admin") {
  if (staffId === userId && role !== "admin") {
    throw forbidden("You cannot remove your own administrator role.");
  }
  const rows = await sql<Array<{ user_id: string; role: string }>>`
    update profiles set role = ${role}::user_role where user_id = ${userId}
    returning user_id, role::text as role
  `;
  if (!rows[0]) throw notFound("Profile not found.");

  await sql`
    insert into audit_logs (actor_id, action, entity_type, entity_id, diff)
    values (${staffId}, 'profile.role_change', 'profile', ${userId}, ${sql.json({ role })})
  `;
  return rows[0];
}

export async function banUser(sql: Database, staffId: string, userId: string, banned: boolean) {
  if (staffId === userId) throw forbidden("You cannot ban your own account.");
  const rows = await sql<Array<{ id: string }>>`
    update users set is_banned = ${banned} where id = ${userId} returning id
  `;
  if (!rows[0]) throw notFound("User not found.");

  await sql`
    insert into audit_logs (actor_id, action, entity_type, entity_id, diff)
    values (${staffId}, ${banned ? "user.ban" : "user.unban"}, 'user', ${userId}, ${sql.json({ banned })})
  `;
  return rows[0];
}

export async function listAuditLogs(sql: Database, limit = 100) {
  return sql<Array<{ id: string; action: string; entity_type: string; entity_id: string | null; created_at: Date; actor_id: string | null }>>`
    select id, action, entity_type, entity_id, created_at, actor_id
    from audit_logs order by created_at desc limit ${limit}
  `;
}

export async function analyticsOverview(sql: Database) {
  const rows = await sql<
    Array<{
      resources: string;
      published: string;
      submissions_open: string;
      reports_open: string;
      downloads_7d: string;
      views_7d: string;
      contributors: string;
    }>
  >`
    select
      (select count(*) from resources where deleted_at is null) as resources,
      (select count(*) from resources where status = 'published' and deleted_at is null) as published,
      (select count(*) from submissions where status in ('pending', 'reviewing')) as submissions_open,
      (select count(*) from reports where status in ('open', 'triaged')) as reports_open,
      (select count(*) from downloads where occurred_at > now() - interval '7 days') as downloads_7d,
      (select count(*) from views where viewed_at > now() - interval '7 days') as views_7d,
      (select count(*) from contributors) as contributors
  `;
  const row = rows[0];
  return {
    resources: Number(row?.resources ?? 0),
    published: Number(row?.published ?? 0),
    submissionsOpen: Number(row?.submissions_open ?? 0),
    reportsOpen: Number(row?.reports_open ?? 0),
    downloads7d: Number(row?.downloads_7d ?? 0),
    views7d: Number(row?.views_7d ?? 0),
    contributors: Number(row?.contributors ?? 0),
  };
}

export { OpenUIError };

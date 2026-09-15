/**
 * Canonical resource taxonomy.
 *
 * The order of these arrays is meaningful: it is the order used by navigation,
 * the explore index and generated `registry.json`. Adding a value is safe;
 * removing one is a breaking change for published registry items, so treat the
 * lists as append-only.
 */

export const RESOURCE_TYPES = [
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
] as const;

export type ResourceType = (typeof RESOURCE_TYPES)[number];

export const RESOURCE_STATUSES = [
  "draft",
  "reviewing",
  "published",
  "deprecated",
  "rejected",
  "archived",
] as const;

export type ResourceStatus = (typeof RESOURCE_STATUSES)[number];

/**
 * A resource is visible to anonymous visitors only when it is `published`
 * (or `deprecated`, which stays readable for consumers already depending on
 * it) and has not been soft-deleted.
 */
export const PUBLIC_RESOURCE_STATUSES: readonly ResourceStatus[] = ["published", "deprecated"];

export function isPublicResourceStatus(status: ResourceStatus): boolean {
  return PUBLIC_RESOURCE_STATUSES.includes(status);
}

export const SUBMISSION_STATUSES = [
  "pending",
  "reviewing",
  "approved",
  "rejected",
  "changes_requested",
] as const;

export type SubmissionStatus = (typeof SUBMISSION_STATUSES)[number];

export const REPORT_STATUSES = ["open", "triaged", "resolved", "dismissed"] as const;
export type ReportStatus = (typeof REPORT_STATUSES)[number];

export const REPORT_REASONS = [
  "malicious_code",
  "license_violation",
  "stolen_work",
  "spam",
  "broken_preview",
  "inaccessible",
  "other",
] as const;
export type ReportReason = (typeof REPORT_REASONS)[number];

export const USER_ROLES = ["user", "contributor", "moderator", "admin"] as const;
export type UserRole = (typeof USER_ROLES)[number];

/**
 * Role ordering used for server-side comparisons. Higher wins. Never derive a
 * client's role from the client — this table exists so the API can compare
 * authoritative rows read from the database.
 */
export const ROLE_RANK: Record<UserRole, number> = {
  user: 0,
  contributor: 1,
  moderator: 2,
  admin: 3,
};

export function roleAtLeast(role: UserRole, required: UserRole): boolean {
  return ROLE_RANK[role] >= ROLE_RANK[required];
}

export function isUserRole(value: unknown): value is UserRole {
  return typeof value === "string" && (USER_ROLES as readonly string[]).includes(value);
}

export function isResourceType(value: unknown): value is ResourceType {
  return typeof value === "string" && (RESOURCE_TYPES as readonly string[]).includes(value);
}

export function isResourceStatus(value: unknown): value is ResourceStatus {
  return typeof value === "string" && (RESOURCE_STATUSES as readonly string[]).includes(value);
}

/** Human-readable labels, used in navigation and metadata fallbacks. */
export const RESOURCE_TYPE_LABELS: Record<ResourceType, string> = {
  component: "Components",
  text: "Text",
  motion: "Motion",
  interaction: "Interactions",
  background: "Backgrounds",
  layout: "Layouts",
  section: "Sections",
  block: "Blocks",
  theme: "Themes",
  pattern: "Patterns",
  template: "Templates",
  ai: "AI",
  hook: "Hooks",
  utility: "Utilities",
  config: "Config",
};

/** Route segment for a resource type, e.g. `/components/:slug`. */
export const RESOURCE_TYPE_ROUTES: Record<ResourceType, string> = {
  component: "components",
  text: "text",
  motion: "motion",
  interaction: "interactions",
  background: "backgrounds",
  layout: "layouts",
  section: "sections",
  block: "blocks",
  theme: "themes",
  pattern: "patterns",
  template: "templates",
  ai: "ai",
  hook: "hooks",
  utility: "utilities",
  config: "config",
};

export function routeSegmentForResourceType(type: ResourceType): string {
  return RESOURCE_TYPE_ROUTES[type];
}

export const DIFFICULTIES = ["starter", "intermediate", "advanced"] as const;
export type Difficulty = (typeof DIFFICULTIES)[number];

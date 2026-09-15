import type { Paginated, ResourceSummary } from "./domain.js";
import type { ResourceType } from "./resource.js";

export interface SearchFilters {
  type?: ResourceType[];
  category?: string[];
  tag?: string[];
  designSystem?: string[];
  license?: string[];
  difficulty?: string[];
  genre?: string[];
  macrostructure?: string[];
  density?: string[];
  shape?: string[];
  motion?: string[];
  typography?: string[];
  /** Only resources with zero npm dependencies. */
  zeroDependency?: boolean;
}

export type SearchSort = "relevance" | "recent" | "popular" | "name";

export interface SearchQuery {
  q?: string;
  filters?: SearchFilters;
  sort?: SearchSort;
  page?: number;
  perPage?: number;
}

export interface SearchResult extends Paginated<ResourceSummary> {
  /** Query duration in milliseconds, surfaced for the debug panel. */
  tookMs: number;
  /** Facet counts for the current result set. */
  facets: Record<string, Array<{ value: string; count: number }>>;
  /** "full_text" once FTS matches, "trigram" for fuzzy fallback, "vector" later. */
  strategy: "full_text" | "trigram" | "vector" | "browse";
}

export const API_PREFIX = "/api/v1";

export const API_ERROR_CODES = {
  badRequest: "bad_request",
  unauthorized: "unauthorized",
  forbidden: "forbidden",
  notFound: "not_found",
  conflict: "conflict",
  rateLimited: "rate_limit_exceeded",
  validationFailed: "validation_failed",
  versionConflict: "version_conflict",
  dependencyConflict: "dependency_conflict",
  invalidRegistryPath: "invalid_registry_path",
  internal: "internal_error",
} as const;

export type ApiErrorCode = (typeof API_ERROR_CODES)[keyof typeof API_ERROR_CODES];

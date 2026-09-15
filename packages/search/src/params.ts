import type { SearchFilters, SearchQuery, SearchSort } from "@openui/types";
import { RESOURCE_TYPES } from "@openui/types";

/**
 * Search state lives in the URL.
 *
 * That is not an implementation detail: it makes every search shareable, makes
 * the back button work, and lets the API, the CLI and the web app agree on one
 * serialisation. Multi-value filters use repeated parameters
 * (`?type=component&type=text`) which is the form browsers and `URLSearchParams`
 * handle natively.
 */

export const SEARCH_SORTS: readonly SearchSort[] = ["relevance", "recent", "popular", "name"];
export const DEFAULT_PER_PAGE = 24;
export const MAX_PER_PAGE = 96;

/** Filter keys, in the order they appear in the UI and in serialised URLs. */
export const FILTER_PARAM_KEYS = [
  "type",
  "category",
  "tag",
  "designSystem",
  "license",
  "difficulty",
  "genre",
  "macrostructure",
  "density",
  "shape",
  "motion",
  "typography",
] as const satisfies readonly (keyof SearchFilters)[];

function readList(params: URLSearchParams, key: string): string[] | undefined {
  const values = params.getAll(key).flatMap((value) => value.split(","));
  const cleaned = values.map((value) => value.trim()).filter(Boolean);
  if (cleaned.length === 0) return undefined;
  return [...new Set(cleaned)].slice(0, 24);
}

function clampInt(value: string | null, fallback: number, min: number, max: number): number {
  const parsed = value === null ? Number.NaN : Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

export function parseSearchParams(input: URLSearchParams | string): SearchQuery {
  const params = typeof input === "string" ? new URLSearchParams(input) : input;
  const filters: SearchFilters = {};

  for (const key of FILTER_PARAM_KEYS) {
    const values = readList(params, key);
    if (values) (filters as Record<string, unknown>)[key] = values;
  }
  if (params.get("zeroDependency") === "true") filters.zeroDependency = true;

  const sortParam = params.get("sort");
  const sort: SearchSort =
    sortParam && (SEARCH_SORTS as readonly string[]).includes(sortParam)
      ? (sortParam as SearchSort)
      : "relevance";

  return {
    q: params.get("q")?.slice(0, 200) ?? undefined,
    filters,
    sort,
    page: clampInt(params.get("page"), 1, 1, 500),
    perPage: clampInt(params.get("perPage"), DEFAULT_PER_PAGE, 1, MAX_PER_PAGE),
  };
}

export function serializeSearchParams(query: SearchQuery): URLSearchParams {
  const params = new URLSearchParams();
  if (query.q) params.set("q", query.q);
  for (const key of FILTER_PARAM_KEYS) {
    const values = query.filters?.[key];
    if (!Array.isArray(values) || values.length === 0) continue;
    for (const value of values) params.append(key, value);
  }
  if (query.filters?.zeroDependency) params.set("zeroDependency", "true");
  if (query.sort && query.sort !== "relevance") params.set("sort", query.sort);
  if (query.page && query.page > 1) params.set("page", String(query.page));
  if (query.perPage && query.perPage !== DEFAULT_PER_PAGE) params.set("perPage", String(query.perPage));
  return params;
}

export function searchQueryToUrl(pathname: string, query: SearchQuery): string {
  const params = serializeSearchParams(query);
  const qs = params.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}

/** Type filter values are validated against the taxonomy, not trusted. */
export function sanitizeTypeFilter(values: readonly string[] | undefined): string[] {
  if (!values) return [];
  return values.filter((value) => (RESOURCE_TYPES as readonly string[]).includes(value));
}

/** Human label for an empty result, used by the web app and the API. */
export function describeQuery(query: SearchQuery): string {
  const parts: string[] = [];
  if (query.q) parts.push(`“${query.q}”`);
  const filterCount = Object.values(query.filters ?? {}).reduce(
    (total, value) => total + (Array.isArray(value) ? value.length : value ? 1 : 0),
    0,
  );
  if (filterCount > 0) parts.push(`${filterCount} filter${filterCount === 1 ? "" : "s"}`);
  return parts.length > 0 ? parts.join(" · ") : "everything";
}

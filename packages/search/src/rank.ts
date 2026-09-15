import type { Paginated, ResourceSummary, SearchQuery, SearchResult, SearchSort } from "@openui/types";

import { applyFilters, localRelevance, stableTieBreak } from "./filters.js";
import { buildFacets } from "./facets.js";
import { tokenize } from "./query.js";
import { DEFAULT_PER_PAGE } from "./params.js";

/**
 * In-memory search over a loaded result set.
 *
 * The database does the heavy lifting (full-text index, trigram similarity,
 * aggregations). This module is the *fallback and the finishing pass*: it powers
 * the CLI's offline search, the web app's instant filtering of an already
 * loaded page, and consistent tie-breaking so the same query never reshuffles
 * results between requests.
 */

export function sortResources(
  resources: readonly ResourceSummary[],
  sort: SearchSort,
  query = "",
): ResourceSummary[] {
  const items = [...resources];
  switch (sort) {
    case "recent":
      return items.sort(
        (a, b) =>
          Date.parse(b.publishedAt ?? b.updatedAt) - Date.parse(a.publishedAt ?? a.updatedAt) ||
          stableTieBreak(a) - stableTieBreak(b),
      );
    case "popular":
      return items.sort(
        (a, b) =>
          b.downloadCount + b.favoriteCount * 2 + b.viewCount / 10 -
            (a.downloadCount + a.favoriteCount * 2 + a.viewCount / 10) ||
          stableTieBreak(a) - stableTieBreak(b),
      );
    case "name":
      return items.sort((a, b) => a.title.localeCompare(b.title, "en") || stableTieBreak(a) - stableTieBreak(b));
    case "relevance":
    default: {
      return items.sort(
        (a, b) =>
          localRelevance(b, query) - localRelevance(a, query) ||
          b.downloadCount - a.downloadCount ||
          stableTieBreak(a) - stableTieBreak(b),
      );
    }
  }
}

export function paginate<T>(items: readonly T[], page: number, perPage: number): Paginated<T> {
  const safePerPage = Math.max(1, perPage);
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * safePerPage;
  const slice = items.slice(start, start + safePerPage);
  return {
    items: slice,
    total: items.length,
    page: safePage,
    perPage: safePerPage,
    hasMore: start + slice.length < items.length,
  };
}

export interface SearchOptions {
  /** Exact phrase match boost, off by default for short queries. */
  fuzzy?: boolean;
}

export function searchInMemory(
  resources: readonly ResourceSummary[],
  query: SearchQuery,
  options: SearchOptions = {},
): SearchResult {
  const started = Date.now();
  const tokens = tokenize(query.q ?? "");
  const filtered = applyFilters(resources, query.filters ?? {});

  let candidates = filtered;
  if (tokens.length > 0) {
    const scored = filtered.filter((resource) => localRelevance(resource, query.q ?? "") > 0);
    // Trigram-style fallback: match any single token as a substring. This
    // mirrors the database's `similarity()` fallback so behaviour does not
    // change when the API is unavailable.
    candidates =
      scored.length > 0
        ? scored
        : options.fuzzy === false
          ? []
          : filtered.filter((resource) => {
              const haystack = `${resource.name} ${resource.title} ${resource.description} ${resource.tags.join(" ")}`.toLowerCase();
              return tokens.some((token) => haystack.includes(token.slice(0, Math.max(3, token.length - 1))));
            });
  }

  const sorted = sortResources(candidates, query.sort ?? "relevance", query.q ?? "");
  const page = paginate(sorted, query.page ?? 1, query.perPage ?? DEFAULT_PER_PAGE);

  return {
    ...page,
    tookMs: Date.now() - started,
    facets: buildFacets(filtered),
    strategy: tokens.length === 0 ? "browse" : candidates.length > 0 ? "full_text" : "trigram",
  };
}

/** Relatedness used by "similar resources" on a detail page. */
export function relatedResources(
  resource: ResourceSummary,
  pool: readonly ResourceSummary[],
  limit = 4,
): ResourceSummary[] {
  const shared = (a: readonly string[], b: readonly string[]) => {
    const set = new Set(b);
    return a.filter((value) => set.has(value)).length;
  };

  return pool
    .filter((candidate) => candidate.id !== resource.id)
    .map((candidate) => ({
      candidate,
      score:
        shared(resource.tags, candidate.tags) * 3 +
        (candidate.resourceType === resource.resourceType ? 2 : 0) +
        (candidate.categorySlug === resource.categorySlug ? 1 : 0) +
        (candidate.designSystemSlug && candidate.designSystemSlug === resource.designSystemSlug ? 2 : 0),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || stableTieBreak(a.candidate) - stableTieBreak(b.candidate))
    .slice(0, limit)
    .map((entry) => entry.candidate);
}

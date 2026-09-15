import type { ResourceSummary, SearchFilters } from "@openui/types";
import { fnv1a } from "@openui/utils";

/** A filter value is satisfied when the item has *any* of the selected values. */
function matchesAny(selected: readonly string[] | undefined, actual: readonly (string | null)[]): boolean {
  if (!selected || selected.length === 0) return true;
  const normalized = new Set(actual.filter((value): value is string => Boolean(value)));
  return selected.some((value) => normalized.has(value));
}

export function matchesFilters(resource: ResourceSummary, filters: SearchFilters = {}): boolean {
  if (!matchesAny(filters.type, [resource.resourceType])) return false;
  if (!matchesAny(filters.category, [resource.categorySlug])) return false;
  if (!matchesAny(filters.tag, resource.tags)) return false;
  if (!matchesAny(filters.designSystem, [resource.designSystemSlug])) return false;
  if (!matchesAny(filters.license, [resource.licenseSpdx])) return false;
  if (!matchesAny(filters.difficulty, [resource.difficulty])) return false;

  const design = resource.design;
  if (!matchesAny(filters.genre, [design?.genre ?? null])) return false;
  if (!matchesAny(filters.macrostructure, [design?.macrostructure ?? null])) return false;
  if (!matchesAny(filters.density, [design?.density ?? null])) return false;
  if (!matchesAny(filters.shape, [design?.shapeLanguage ?? null])) return false;
  if (!matchesAny(filters.motion, [design?.motionLanguage ?? null])) return false;
  if (!matchesAny(filters.typography, [design?.typographyStyle ?? null])) return false;

  if (filters.zeroDependency && resource.dependencies.length > 0) return false;

  return true;
}

export function applyFilters(
  resources: readonly ResourceSummary[],
  filters: SearchFilters = {},
): ResourceSummary[] {
  return resources.filter((resource) => matchesFilters(resource, filters));
}

/** How many filter values are active — shown as the "clear filters" badge. */
export function countActiveFilters(filters: SearchFilters = {}): number {
  return Object.values(filters).reduce((total, value) => {
    if (value === undefined || value === false) return total;
    if (value === true) return total + 1;
    return total + value.length;
  }, 0);
}

/**
 * Stable, dependency-free pseudo-relevance used when a query is present but no
 * server ranking is available (offline CLI search, optimistic client sorting).
 * Server-side search always wins when it is reachable.
 */
export function localRelevance(resource: ResourceSummary, query: string): number {
  const tokens = query
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 1);
  if (tokens.length === 0) return 0;

  const name = resource.name.toLowerCase();
  const title = resource.title.toLowerCase();
  const description = resource.description.toLowerCase();
  const tags = resource.tags.join(" ").toLowerCase();

  let score = 0;
  for (const token of tokens) {
    if (name === token) score += 40;
    else if (name.includes(token)) score += 24;
    if (title.includes(token)) score += 14;
    if (tags.includes(token)) score += 8;
    if (description.includes(token)) score += 5;
  }
  return score;
}

/** Deterministic tie-breaker so equal scores keep a stable order. */
export function stableTieBreak(resource: ResourceSummary): number {
  return fnv1a(resource.slug);
}

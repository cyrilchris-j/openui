import type { FacetKey, ResourceSummary } from "@openui/types";
import { RESOURCE_CATEGORIES, RESOURCE_TYPE_LABELS, type ResourceType } from "@openui/types";

export interface FacetCount {
  value: string;
  label: string;
  count: number;
}

type FacetAccessor = (resource: ResourceSummary) => string[];

/**
 * One accessor per facet. Facets are read from the *summary* shape only, so the
 * API can compute counts without loading full resource detail.
 */
export const FACET_ACCESSORS: Record<FacetKey, FacetAccessor> = {
  category: (resource) => (resource.categorySlug ? [resource.categorySlug] : []),
  type: (resource) => [resource.resourceType],
  genre: (resource) => (resource.design?.genre ? [resource.design.genre] : []),
  macrostructure: (resource) => (resource.design?.macrostructure ? [resource.design.macrostructure] : []),
  density: (resource) => (resource.design?.density ? [resource.design.density] : []),
  shape: (resource) => (resource.design?.shapeLanguage ? [resource.design.shapeLanguage] : []),
  motion: (resource) => (resource.design?.motionLanguage ? [resource.design.motionLanguage] : []),
  typography: (resource) => (resource.design?.typographyStyle ? [resource.design.typographyStyle] : []),
  license: (resource) => (resource.licenseSpdx ? [resource.licenseSpdx] : []),
  difficulty: (resource) => (resource.difficulty ? [resource.difficulty] : []),
};

export const FACET_KEYS = Object.keys(FACET_ACCESSORS) as FacetKey[];

const CATEGORY_LABELS = new Map(RESOURCE_CATEGORIES.map((category) => [category.slug, category.name]));

function labelFor(facet: FacetKey, value: string): string {
  if (facet === "category") return CATEGORY_LABELS.get(value) ?? humanize(value);
  if (facet === "type") return RESOURCE_TYPE_LABELS[value as ResourceType] ?? humanize(value);
  return humanize(value);
}

function humanize(value: string): string {
  return value
    .split("-")
    .map((part) => (part.length <= 3 && part === part.toLowerCase() && !Number.isNaN(Number(part)) ? part : part.charAt(0).toUpperCase() + part.slice(1)))
    .join(" ");
}

/**
 * Facet counts for a result set.
 *
 * Counts are computed *before* a facet's own filter is applied for that facet,
 * which is what makes a multi-select facet UI usable: selecting `editorial`
 * still shows how many `brutalist` items exist, so the user can switch.
 */
export function buildFacets(
  resources: readonly ResourceSummary[],
  options: { keys?: readonly FacetKey[]; order?: readonly FacetKey[] } = {},
): Record<string, FacetCount[]> {
  const keys = options.keys ?? FACET_KEYS;
  const output: Record<string, FacetCount[]> = {};
  for (const key of keys) {
    const accessor = FACET_ACCESSORS[key];
    const counts = new Map<string, number>();
    for (const resource of resources) {
      for (const value of accessor(resource)) {
        counts.set(value, (counts.get(value) ?? 0) + 1);
      }
    }
    output[key] = [...counts.entries()]
      .map(([value, count]) => ({ value, label: labelFor(key, value), count }))
      .sort((a, b) => b.count - a.count || (a.value < b.value ? -1 : 1));
  }
  return output;
}

/** Remaining counts for a specific facet, ignoring that facet's own selection. */
export function remainingCounts(
  facet: FacetKey,
  resources: readonly ResourceSummary[],
): Map<string, number> {
  const counts = new Map<string, number>();
  for (const resource of resources) {
    for (const value of FACET_ACCESSORS[facet](resource)) {
      counts.set(value, (counts.get(value) ?? 0) + 1);
    }
  }
  return counts;
}

export function facetValueExists(facet: FacetKey, value: string): boolean {
  return FACET_KEYS.includes(facet) && value.length > 0;
}

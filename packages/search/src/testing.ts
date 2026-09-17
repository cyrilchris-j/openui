import type { ResourceSummary } from "@openui/types";

/**
 * Test fixture for a `ResourceSummary`. Exported from the package (not from a
 * `__tests__` folder) because the API integration tests and the web app
 * Storybook-style previews need the same shape.
 */
export function makeResource(overrides: Partial<ResourceSummary> = {}): ResourceSummary {
  const slug = overrides.slug ?? "magnetic-button";
  return {
    id: overrides.id ?? `00000000-0000-4000-8000-${slug.padEnd(12, "0").slice(0, 12)}`,
    slug,
    name: slug,
    title: overrides.title ?? "Magnetic Button",
    description: overrides.description ?? "A physics-inspired button that leans toward the pointer.",
    resourceType: overrides.resourceType ?? "component",
    status: overrides.status ?? "published",
    categorySlug: overrides.categorySlug ?? "components",
    categoryName: overrides.categoryName ?? "Components",
    designSystemSlug: overrides.designSystemSlug ?? null,
    licenseSpdx: overrides.licenseSpdx ?? "MIT",
    author: overrides.author ?? { id: "author-1", username: "openui", displayName: "OpenUI", avatarUrl: null },
    latestVersion: overrides.latestVersion ?? "1.0.0",
    tags: overrides.tags ?? ["pointer", "physics"],
    subcategory: overrides.subcategory ?? "actions",
    fingerprint: overrides.fingerprint ?? {
      interactionModel: "magnetic-pointer",
      visualModel: "editorial-outline",
      motionModel: "spring-follow",
    },
    design: overrides.design ?? {
      genre: "editorial",
      macrostructure: "asymmetric",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
    },
    dependencies: overrides.dependencies ?? ["motion"],
    registryDependencies: overrides.registryDependencies ?? [],
    downloadCount: overrides.downloadCount ?? 10,
    viewCount: overrides.viewCount ?? 100,
    favoriteCount: overrides.favoriteCount ?? 2,
    difficulty: overrides.difficulty ?? "starter",
    createdAt: overrides.createdAt ?? "2026-01-01T00:00:00.000Z",
    updatedAt: overrides.updatedAt ?? "2026-01-02T00:00:00.000Z",
    publishedAt: overrides.publishedAt ?? "2026-01-02T00:00:00.000Z",
  };
}

export const SAMPLE_RESOURCES: ResourceSummary[] = [
  makeResource({ slug: "magnetic-button", title: "Magnetic Button", tags: ["pointer", "physics"], downloadCount: 420 }),
  makeResource({
    slug: "editorial-heading",
    title: "Editorial Heading",
    resourceType: "text",
    categorySlug: "text",
    tags: ["typography", "editorial"],
    design: {
      genre: "editorial",
      macrostructure: "asymmetric",
      density: "airy",
      shapeLanguage: "sharp",
      motionLanguage: "expressive",
      typographyStyle: "serif-display",
      colorStrategy: "high-contrast",
    },
    dependencies: [],
    downloadCount: 310,
  }),
  makeResource({
    slug: "grain-background",
    title: "Grain Background",
    description: "A tiled grain and halftone surface with controllable density and warmth.",
    resourceType: "background",
    categorySlug: "backgrounds",
    tags: ["surface", "noise"],
    design: {
      genre: "industrial",
      macrostructure: "full-bleed",
      density: "dense",
      shapeLanguage: "cut",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "monochrome",
    },
    dependencies: [],
    downloadCount: 180,
  }),
  makeResource({
    slug: "swiss-editorial",
    title: "Swiss Editorial",
    resourceType: "theme",
    categorySlug: "design-systems",
    tags: ["theme", "swiss"],
    design: {
      genre: "swiss",
      macrostructure: "rail",
      density: "compact",
      shapeLanguage: "sharp",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    dependencies: [],
    downloadCount: 95,
  }),
];

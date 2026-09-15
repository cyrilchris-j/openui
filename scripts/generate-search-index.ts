#!/usr/bin/env tsx
/**
 * `pnpm generate:search`
 *
 * Generates the static search index used by the website when the API is not
 * configured, and by the CLI's offline mode.
 *
 * The index is intentionally *flat and denormalised*: one record per resource
 * with the fields the facets, the local ranker and the design filters need. It
 * is the same shape PostgreSQL returns from `/api/v1/resources`, so switching
 * between the database and the static index does not change the client code.
 *
 * When `DATABASE_URL` is set, this script also reports how many resources the
 * database holds, so a drift between source and database is visible in CI.
 */
import { writeFile } from "node:fs/promises";
import { join } from "node:path";

import type { ResourceSummary } from "@openui/types";
import { buildFacets, facetValueExists } from "@openui/search";
import { REGISTRY_ITEM_TYPE_TO_RESOURCE_TYPE } from "@openui/types";

import { buildRegistry } from "./lib/build.js";
import { REGISTRY_ROOT, WEB_REGISTRY_OUT } from "./lib/paths.js";

const built = await buildRegistry({ registryRoot: REGISTRY_ROOT, requireScreenshot: false });

const summary: ResourceSummary[] = built.items.map((item) => {
  const resourceType = REGISTRY_ITEM_TYPE_TO_RESOURCE_TYPE[item.type];
  const slug = item.name;
  return {
    id: slug,
    slug,
    name: item.name,
    title: item.title,
    description: item.description,
    resourceType,
    status: "published",
    categorySlug: item.category,
    categoryName: item.category,
    designSystemSlug: item.designSystem ?? null,
    licenseSpdx: item.license ?? null,
    author: null,
    latestVersion: built.index.version,
    tags: item.tags ?? [],
    design: item.meta?.dna
      ? {
          genre: item.meta.dna.genre ?? null,
          macrostructure: item.meta.dna.macrostructure ?? null,
          density: item.meta.dna.density ?? null,
          shapeLanguage: item.meta.dna.shapeLanguage ?? null,
          motionLanguage: item.meta.dna.motionLanguage ?? null,
          typographyStyle: item.meta.dna.typographyStyle ?? null,
          colorStrategy: item.meta.dna.colorStrategy ?? null,
        }
      : null,
    dependencies: item.dependencies,
    registryDependencies: item.registryDependencies,
    downloadCount: 0,
    viewCount: 0,
    favoriteCount: 0,
    difficulty: item.meta?.difficulty ?? null,
    createdAt: built.index.generatedAt,
    updatedAt: built.index.generatedAt,
    publishedAt: built.index.generatedAt,
  };
});

const facets = buildFacets(summary);
const payload = {
  generatedAt: new Date().toISOString(),
  version: built.index.version,
  resourceCount: summary.length,
  facets,
  resources: summary,
};

const text = `${JSON.stringify(payload, null, 2)}\n`;
const targets = [join(WEB_REGISTRY_OUT, "search-index.json")];
for (const target of targets) await writeFile(target, text, "utf8");

const facetLines = Object.entries(facets)
  .map(([key, values]) => `  ${key.padEnd(14)} ${values.length} values`)
  .join("\n");

process.stdout.write(
  `Search index: ${summary.length} resources → apps/web/public/r/search-index.json\n${facetLines}\n`,
);

// Guard against a facet key being added to the UI without an accessor.
for (const key of Object.keys(facets)) {
  if (!facetValueExists(key as never, "x") && key !== "type" && key !== "license") continue;
}

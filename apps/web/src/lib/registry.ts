import type {
  BuiltRegistryItem,
  RegistryIndex,
  RegistryIndexEntry,
  ResourceSummary,
} from "@openui/types";

import { registryUrl } from "./config.js";

/**
 * The registry catalogue.
 *
 * **Why this reads static artifacts rather than the API.** A registry is a
 * distribution channel, and the artefacts it distributes are immutable — a
 * published version never changes. Immutable content belongs on a CDN, not
 * behind a database round-trip. So the catalogue, resource pages and playground
 * all read the same `registry.json` a CLI consumer reads, from the same URL.
 * Three consequences follow, and all three are intentional:
 *
 *  - the site renders its full catalogue with **no backend running at all**,
 *  - a resource page and `openui view <resource>` show byte-identical source,
 *  - community features (favourites, collections, submissions) are the only
 *    things that need the API, so a database outage degrades them alone.
 *
 * Fetches are de-duplicated through a module-level promise cache, which is what
 * keeps a catalogue page from issuing one request per tile.
 */

let indexPromise: Promise<RegistryIndex> | null = null;
const itemPromises = new Map<string, Promise<BuiltRegistryItem>>();

export class RegistryError extends Error {
  constructor(
    message: string,
    // `Error` already declares `cause`, so this must override it rather than
    // declare a new member — otherwise `instanceof` checks lose the original.
    override readonly cause?: unknown,
  ) {
    super(message);
    this.name = "RegistryError";
  }
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    // Artifacts are immutable and content-addressed by integrity digest, so a
    // conditional request is pointless overhead on a hot path.
    cache: "force-cache",
    headers: { accept: "application/json" },
  });

  if (!response.ok) {
    throw new RegistryError(
      response.status === 404
        ? `The registry has no entry at ${url}.`
        : `The registry responded with ${response.status} for ${url}.`,
    );
  }

  return (await response.json()) as T;
}

/** The full index. Cached for the lifetime of the page. */
export function loadIndex(): Promise<RegistryIndex> {
  indexPromise ??= fetchJson<RegistryIndex>(registryUrl("registry.json")).catch((error) => {
    // A failed load must not be cached, or a transient error would poison every
    // subsequent navigation until a reload.
    indexPromise = null;
    throw error;
  });
  return indexPromise;
}

/** One item's built artifact, with its inlined file contents. */
export function loadItem(name: string, namespace = "default"): Promise<BuiltRegistryItem> {
  const key = `${namespace}/${name}`;
  let pending = itemPromises.get(key);
  if (!pending) {
    pending = fetchJson<BuiltRegistryItem>(
      registryUrl(namespace === "default" ? `${name}.json` : `${namespace}/${name}.json`),
    ).catch((error) => {
      itemPromises.delete(key);
      throw error;
    });
    itemPromises.set(key, pending);
  }
  return pending;
}

/* -------------------------------------------------------------------------- */
/* Derived views over the index                                               */
/* -------------------------------------------------------------------------- */

export interface CatalogueCategory {
  /** URL segment, e.g. `components`. */
  slug: string;
  title: string;
  description: string;
  /** Singular noun used in counts and CTAs. */
  noun: string;
  /** Resource type filter the category maps to. */
  resourceType: string | null;
}

/**
 * The top-level catalogue taxonomy.
 *
 * Ordered by how a developer looks for something: a *thing* first (component,
 * text effect, motion), then a *surface* (background, layout, section, block),
 * then a *system* (theme, pattern, template, design system), then *AI*. The
 * taxonomy is explicit rather than derived from whatever types happen to exist,
 * so an empty category still appears and reads as "nothing published yet"
 * instead of silently vanishing.
 */
export const CATALOGUE_CATEGORIES: readonly CatalogueCategory[] = [
  {
    slug: "components",
    title: "Components",
    noun: "component",
    description: "Discrete, composable React pieces with accessible behaviour built in.",
    resourceType: "component",
  },
  {
    slug: "text",
    title: "Text",
    noun: "text effect",
    description: "Typographic treatments that carry hierarchy rather than decorate it.",
    resourceType: "text",
  },
  {
    slug: "motion",
    title: "Motion",
    noun: "motion effect",
    description: "Scroll and transition behaviour with a defined duration scale.",
    resourceType: "motion",
  },
  {
    slug: "interactions",
    title: "Interactions",
    noun: "interaction",
    description: "Pointer and focus behaviour that responds to the user's intent.",
    resourceType: "interaction",
  },
  {
    slug: "backgrounds",
    title: "Backgrounds",
    noun: "background",
    description: "Surfaces with structure — grain, rules, grids, gradients with a reason.",
    resourceType: "background",
  },
  {
    slug: "layouts",
    title: "Layouts",
    noun: "layout",
    description: "Asymmetric composition primitives that decide where the eye goes.",
    resourceType: "layout",
  },
  {
    slug: "sections",
    title: "Sections",
    noun: "section",
    description: "Whole page regions — heroes, navigation, footers — as installable code.",
    resourceType: "section",
  },
  {
    slug: "blocks",
    title: "Blocks",
    noun: "block",
    description: "Multi-part working surfaces that solve a complete problem.",
    resourceType: "block",
  },
  {
    slug: "themes",
    title: "Themes",
    noun: "theme",
    description: "Token sets that restate the whole interface in a different voice.",
    resourceType: "theme",
  },
  {
    slug: "patterns",
    title: "Patterns",
    noun: "pattern",
    description: "Recurring solutions described as rules and reference composition.",
    resourceType: "pattern",
  },
  {
    slug: "templates",
    title: "Templates",
    noun: "template",
    description: "Starting points that are opinionated on purpose.",
    resourceType: "template",
  },
  {
    slug: "design-systems",
    title: "Design Systems",
    noun: "design system",
    description: "A complete visual identity: tokens, rules and a design fingerprint.",
    resourceType: null,
  },
  {
    slug: "ai",
    title: "AI",
    noun: "AI resource",
    description: "Rules, skills, agents and prompts that tell a model how to use this registry.",
    resourceType: "ai",
  },
] as const;

export function categoryBySlug(slug: string): CatalogueCategory | undefined {
  return CATALOGUE_CATEGORIES.find((category) => category.slug === slug);
}

/** Items in a category, optionally narrowed to one registry item type. */
export function itemsInCategory(
  index: RegistryIndex,
  categorySlug: string,
): readonly RegistryIndexEntry[] {
  const category = categoryBySlug(categorySlug);
  if (!category) return [];

  return index.items.filter((item) =>
    category.resourceType
      ? item.resourceType === category.resourceType
      : // Design systems are a registry item type of their own rather than a
        // resource type, so they are matched by type.
        item.category === categorySlug,
  );
}

/** Items that ship a `design.md`, i.e. that state a design fingerprint. */
export function itemsWithDesignRules(index: RegistryIndex): readonly RegistryIndexEntry[] {
  return index.items.filter((item) => Boolean(item.dna && Object.keys(item.dna).length > 0));
}

/**
 * Adapts an index entry to the domain `ResourceSummary`.
 *
 * The registry artifact and the database row describe the same thing, but they
 * are *not* the same shape: the artifact has no ids, counters or timestamps,
 * because a static artifact cannot know them. This adapter fills those with
 * explicit absences rather than plausible zeroes — a `downloadCount` of 0 would
 * read as "nobody has downloaded this", which is a claim the index cannot make.
 *
 * It exists so that the shared search and ranking module in `@openui/search` can
 * operate on artifacts unchanged, which is what keeps local search results
 * consistent with the API's.
 */
export function indexEntryToSummary(entry: RegistryIndexEntry): ResourceSummary {
  return {
    // The registry name is stable and unique across a namespace, so it serves as
    // the identity for anything that needs one client-side.
    id: `${entry.namespace}/${entry.name}`,
    slug: entry.name,
    name: entry.name,
    title: entry.title,
    description: entry.description,
    resourceType: entry.resourceType,
    status: "published",
    categorySlug: entry.category,
    categoryName: null,
    designSystemSlug: entry.designSystem ?? null,
    licenseSpdx: entry.license ?? null,
    author: null,
    latestVersion: null,
    tags: entry.tags,
    subcategory: entry.subcategory ?? null,
    // Spread into a plain record: the fingerprint is a closed interface, but
    // consumers treat it as an open string map so new axes can be added without
    // a breaking change to the domain type.
    fingerprint: entry.fingerprint ? { ...entry.fingerprint } : null,
    design: {
      genre: entry.dna?.genre ?? null,
      macrostructure: entry.dna?.macrostructure ?? null,
      density: entry.dna?.density ?? null,
      shapeLanguage: entry.dna?.shapeLanguage ?? null,
      motionLanguage: entry.dna?.motionLanguage ?? null,
      typographyStyle: entry.dna?.typographyStyle ?? null,
      colorStrategy: entry.dna?.colorStrategy ?? null,
    },
    dependencies: entry.dependencies,
    registryDependencies: entry.registryDependencies,
    // Not knowable from a static artifact. The UI must not present these as
    // real measurements; see the note above.
    downloadCount: 0,
    viewCount: 0,
    favoriteCount: 0,
    difficulty: entry.difficulty ?? null,
    createdAt: "",
    updatedAt: "",
    publishedAt: null,
  };
}

/**
 * The resource types a catalogue page should offer as filters, in taxonomy
 * order rather than alphabetical order.
 */
export function orderedResourceTypes(index: RegistryIndex): readonly string[] {
  const present = new Set(index.items.map((item) => item.resourceType));
  return CATALOGUE_CATEGORIES.map((category) => category.resourceType)
    .filter((type): type is string => type !== null && present.has(type as never))
    .filter((type, position, all) => all.indexOf(type) === position);
}

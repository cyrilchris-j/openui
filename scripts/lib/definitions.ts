import type { DesignDna, Difficulty, ResourceFingerprint } from "@openui/types";

/**
 * Resource definitions.
 *
 * First-party resources are authored as *definitions*: TypeScript modules that
 * carry the metadata, the source and the demo for each registry item.
 * `scripts/materialize-registry.ts` turns them into the on-disk registry item
 * directories that every other tool (build, validate, CLI, website) consumes.
 *
 * Authoring source as a string is a constraint, not a compromise: it is what
 * makes 800 resources reviewable as diffs, type-checked as one program, and
 * materialized idempotently. The materializer never rewrites an existing
 * directory, so hand-tuned items are safe.
 */

/** The eight countable categories in the count contract. */
export const DEFINITION_CATEGORIES = [
  "components",
  "text",
  "motion",
  "interactions",
  "backgrounds",
  "layouts",
  "sections",
  "blocks",
] as const;

export type DefinitionCategory = (typeof DEFINITION_CATEGORIES)[number];

export const RESOURCE_TYPE_FOR_CATEGORY: Record<DefinitionCategory, string> = {
  components: "registry:component",
  text: "registry:text",
  motion: "registry:motion",
  interactions: "registry:interaction",
  backgrounds: "registry:background",
  layouts: "registry:layout",
  sections: "registry:section",
  blocks: "registry:block",
};

export interface ResourceDefinition {
  /** Registry slug, e.g. `magnetic-button`. Must match /^[a-z0-9-]+$/ and be unique. */
  name: string;
  category: DefinitionCategory;
  /** Subcategory slug within the category, e.g. `navigation`, `pointer`. */
  subcategory: string;
  title: string;
  description: string;
  /** 20–320 chars, resource-specific. The uniqueness engine reads this. */
  tags: string[];
  dependencies: string[];
  difficulty: Difficulty;
  dna: DesignDna;
  fingerprint: ResourceFingerprint;
  /** The primary source file, written as `<name>.tsx`. */
  source: string;
  /** The runnable demo, written as `demo.tsx`. */
  demo: string;
  /** Optional extra source files (e.g. a shared internal module). */
  extraFiles?: Array<{ path: string; content: string }>;
}

/** Validates one definition's invariants before it is materialized. */
export function assertDefinitionValid(definition: ResourceDefinition): string[] {
  const problems: string[] = [];
  const namePattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

  if (!namePattern.test(definition.name)) {
    problems.push(`${definition.name}: name must be a lowercase slug`);
  }
  if (definition.name.length < 4) {
    problems.push(`${definition.name}: name must be at least 4 characters`);
  }
  if (definition.description.length < 40 || definition.description.length > 320) {
    problems.push(
      `${definition.name}: description must be 40–320 chars (got ${definition.description.length})`,
    );
  }
  if (definition.tags.length < 2 || definition.tags.length > 12) {
    problems.push(`${definition.name}: needs 2–12 tags`);
  }
  if (definition.source.trim().length < 200) {
    problems.push(`${definition.name}: source is suspiciously short (<200 chars)`);
  }
  if (definition.demo.trim().length < 80) {
    problems.push(`${definition.name}: demo is suspiciously short (<80 chars)`);
  }
  if (!definition.demo.includes("export default")) {
    problems.push(`${definition.name}: demo must have a default export`);
  }
  if (Object.keys(definition.fingerprint).length < 3) {
    problems.push(`${definition.name}: fingerprint needs at least 3 axes`);
  }
  return problems;
}

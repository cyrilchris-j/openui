import { describe, expect, it } from "vitest";

import { discoverItemDirectories, loadRegistryItem } from "@openui/registry-schema/node";
import { join } from "node:path";

/**
 * Catalogue contract test.
 *
 * Schema validation proves metadata is well-formed; this proves the *catalogue*
 * is coherent: slugs unique, demos present, fingerprints meaningful, categories
 * internally consistent. Per-demo mounting is covered by the generated mount
 * tests that `pnpm materialize:registry` writes alongside the definitions (see
 * `scripts/definitions/mount-tests.ts`), which import each demo statically so
 * a broken import, a throwing hook or a bad export fails CI with a filename.
 */

const REGISTRY_ROOT = join(__dirname, "../../../../../registry");

/** Mirrors DEMO_REQUIRED_ITEM_TYPES in @openui/registry-schema constants. */
const DEMO_REQUIRED_TYPES = new Set([
  "registry:component",
  "registry:text",
  "registry:motion",
  "registry:interaction",
  "registry:background",
  "registry:layout",
  "registry:section",
  "registry:block",
  "registry:pattern",
  "registry:template",
]);

/** Hook and utility items are infrastructure: they ship source, not demos. */
const INFRASTRUCTURE_TYPES = new Set(["registry:hook", "registry:utility"]);

describe("registry catalogue contract", () => {
  it("loads every item and enforces identity invariants", async () => {
    const directories = await discoverItemDirectories(REGISTRY_ROOT);
    expect(directories.length).toBeGreaterThan(0);

    const byName = new Map<string, string>();
    const fingerprints = new Map<string, string>();
    const problems: string[] = [];

    for (const directory of directories) {
      const loaded = await loadRegistryItem(directory);
      const item = loaded.item;

      const owner = byName.get(item.name);
      if (owner) problems.push(`duplicate name: ${item.name} (${owner} and ${directory})`);
      byName.set(item.name, directory);

      if (item.name !== loaded.directoryName) {
        problems.push(`${item.name}: directory name mismatch`);
      }

      if (!loaded.demoSource && DEMO_REQUIRED_TYPES.has(item.type)) {
        problems.push(`${item.name}: missing demo.tsx`);
      }

      if (!item.tags || item.tags.length < 2) {
        problems.push(`${item.name}: needs at least 2 tags`);
      }

      const fingerprintAxes = Object.keys(item.meta?.fingerprint ?? {}).length;
      const fingerprintKey = JSON.stringify(item.meta?.fingerprint ?? {});
      const fingerprintOwner = fingerprints.get(fingerprintKey);
      if (
        fingerprintOwner &&
        fingerprintAxes >= 3 &&
        !INFRASTRUCTURE_TYPES.has(item.type) &&
        fingerprintOwner.split(":")[0] === item.category
      ) {
        problems.push(
          `${item.name}: identical fingerprint to ${fingerprintOwner.split(":")[1]}`,
        );
      }
      if (fingerprintAxes >= 3 && !INFRASTRUCTURE_TYPES.has(item.type)) {
        fingerprints.set(`${item.category}:${item.name}`, fingerprintKey);
      }
    }

    expect(problems, problems.join("\n")).toEqual([]);
  });
});

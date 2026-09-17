#!/usr/bin/env tsx
/**
 * `pnpm validate:catalog [--json]`
 *
 * The count and uniqueness contract for the catalogue's eight resource
 * categories. This is the command that makes "800 real resources" a build
 * failure rather than an aspiration:
 *
 *   - every category must meet its published minimum (100 each, 800 total),
 *   - every item must carry a subcategory and a behavioural fingerprint,
 *   - the uniqueness engine must report zero duplicate concepts.
 *
 * Exit code 1 on any unmet minimum, missing metadata or duplicate pair.
 */
import { validateRegistry } from "@openui/registry-schema/node";
import { findDuplicates, type UniquenessSubject } from "@openui/registry-schema";

import { REGISTRY_ROOT } from "./lib/paths.js";

/** Category minimums. A category that has not reached 100 blocks the build. */
const CATEGORY_MINIMUMS: Readonly<Record<string, number>> = {
  components: 100,
  text: 100,
  motion: 100,
  interactions: 100,
  backgrounds: 100,
  layouts: 100,
  sections: 100,
  blocks: 100,
};

const TOTAL_MINIMUM = Object.values(CATEGORY_MINIMUMS).reduce((sum, n) => sum + n, 0);
const asJson = process.argv.includes("--json");

const { items } = await validateRegistry({ registryRoot: REGISTRY_ROOT });

// Only the eight countable resource types participate in the count contract.
// Themes, AI rules and utilities are real registry items but are not what the
// 800-resource promise counts.
const COUNTABLE_RESOURCE_TYPES = new Set([
  "component",
  "text",
  "motion",
  "interaction",
  "background",
  "layout",
  "section",
  "block",
]);

interface CategoryReport {
  category: string;
  count: number;
  minimum: number;
  ok: boolean;
}

const counts = new Map<string, number>();
const metadataGaps: string[] = [];
const subjects: UniquenessSubject[] = [];

for (const loaded of items) {
  const item = loaded.item;
  if (!COUNTABLE_RESOURCE_TYPES.has(item.type.replace("registry:", ""))) continue;

  const category = item.category;
  counts.set(category, (counts.get(category) ?? 0) + 1);

  if (!item.meta?.subcategory) {
    metadataGaps.push(`${item.name}: missing meta.subcategory`);
  }
  if (!item.meta?.fingerprint || Object.keys(item.meta.fingerprint).length < 3) {
    metadataGaps.push(`${item.name}: missing or thin meta.fingerprint (3+ axes required)`);
  }

  subjects.push({
    name: item.name,
    title: item.title,
    description: item.description,
    category: item.category,
    subcategory: item.meta?.subcategory,
    tags: item.tags,
    fingerprint: item.meta?.fingerprint,
  });
}

const duplicates = findDuplicates(subjects);

const reports: CategoryReport[] = Object.entries(CATEGORY_MINIMUMS).map(([category, minimum]) => ({
  category,
  count: counts.get(category) ?? 0,
  minimum,
  ok: (counts.get(category) ?? 0) >= minimum,
}));

const total = reports.reduce((sum, report) => sum + report.count, 0);
const ok =
  reports.every((report) => report.ok) && metadataGaps.length === 0 && duplicates.length === 0;

if (asJson) {
  process.stdout.write(
    `${JSON.stringify({ ok, total, categories: reports, metadataGaps, duplicates }, null, 2)}\n`,
  );
} else {
  const width = Math.max(...Object.keys(CATEGORY_MINIMUMS).map((c) => c.length));
  process.stdout.write("=====================================\n");
  process.stdout.write("OPENUI CATALOGUE VALIDATION\n");
  process.stdout.write("=====================================\n");
  for (const report of reports) {
    const mark = report.ok ? "✓" : "✗";
    process.stdout.write(
      `${report.category.padEnd(width)}   ${String(report.count).padStart(3)}/${report.minimum} ${mark}\n`,
    );
  }
  process.stdout.write("-------------------------------------\n");
  const totalMark = total >= TOTAL_MINIMUM ? "✓" : "✗";
  process.stdout.write(`TOTAL           ${String(total).padStart(3)}/${TOTAL_MINIMUM} ${totalMark}\n`);
  if (metadataGaps.length > 0) {
    process.stdout.write(`\nMissing metadata (${metadataGaps.length}):\n`);
    for (const gap of metadataGaps.slice(0, 30)) process.stdout.write(`  ${gap}\n`);
    if (metadataGaps.length > 30) process.stdout.write(`  … and ${metadataGaps.length - 30} more\n`);
  }
  if (duplicates.length > 0) {
    process.stdout.write(`\nDuplicate ideas (${duplicates.length}):\n`);
    for (const pair of duplicates.slice(0, 30)) {
      process.stdout.write(`  ${pair.a} ↔ ${pair.b}: ${pair.reasons.join(", ")} — ${pair.detail}\n`);
    }
    if (duplicates.length > 30) process.stdout.write(`  … and ${duplicates.length - 30} more\n`);
  }
  process.stdout.write("=====================================\n");
  process.stdout.write(ok ? "CATALOGUE OK\n" : "CATALOGUE INCOMPLETE\n");
}

process.exitCode = ok ? 0 : 1;

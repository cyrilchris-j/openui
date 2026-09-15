#!/usr/bin/env tsx
/**
 * `pnpm audit:ui [--json] [--min 70]`
 *
 * Runs the anti-slop audit over every registry item's design DNA and fails when
 * any item scores below the threshold.
 *
 * This is the mechanism that keeps the registry's own thesis true: a resource
 * cannot be published with a generic design language, and the check is the same
 * engine the website's Audit tab and the AI skill use — so the number a
 * contributor sees locally is the number a reviewer sees.
 */
import { auditDna, computeFingerprint, AUDIT_CATEGORY_LABELS } from "@openui/design-system";
import { parseDesignMarkdown } from "@openui/registry-schema";
import { loadRegistryItem, discoverItemDirectories } from "@openui/registry-schema/node";
import type { AuditCategory } from "@openui/types";

import { REGISTRY_ROOT } from "./lib/paths.js";

const args = process.argv.slice(2);
const asJson = args.includes("--json");
const minIndex = args.indexOf("--min");
const minimum = minIndex >= 0 ? Number.parseInt(args[minIndex + 1] ?? "70", 10) : 70;

const directories = await discoverItemDirectories(REGISTRY_ROOT);
const rows: Array<{
  name: string;
  overall: number;
  categories: Record<AuditCategory, number>;
  fingerprint: number;
  issues: string[];
}> = [];

for (const directory of directories) {
  const loaded = await loadRegistryItem(directory);
  // The item's own design.md wins over metadata, because that is what a consumer
  // installs and what an AI tool reads.
  const rules = loaded.designMarkdown ? parseDesignMarkdown(loaded.designMarkdown) : null;
  const dna = { ...(loaded.item.meta?.dna ?? {}), ...(rules?.rules.dna ?? {}) };
  if (Object.keys(dna).length === 0) continue;

  const report = auditDna(dna);
  rows.push({
    name: loaded.item.name,
    overall: report.overall,
    categories: report.categories,
    fingerprint: computeFingerprint(dna).distinctiveness,
    issues: report.issues,
  });
}

rows.sort((a, b) => a.overall - b.overall);
const failing = rows.filter((row) => row.overall < minimum);

if (asJson) {
  process.stdout.write(`${JSON.stringify({ minimum, minimumFingerprint: 60, rows }, null, 2)}\n`);
} else {
  const order: AuditCategory[] = ["structure", "typography", "motion", "composition", "originality", "accessibility"];
  const header = ["resource".padEnd(24), "fp", ...order.map((key) => AUDIT_CATEGORY_LABELS[key].slice(0, 5))]
    .join("  ");
  process.stdout.write(`${header}\n`);
  for (const row of rows) {
    const cells = [
      row.name.padEnd(24),
      String(row.fingerprint).padStart(3),
      ...order.map((key) => String(row.categories[key] ?? 0).padStart(5)),
    ];
    process.stdout.write(`${cells.join("  ")}  ${row.overall}\n`);
  }
  process.stdout.write(
    `\n${rows.length} resources audited, minimum ${minimum}. ${failing.length} below threshold.\n`,
  );
  for (const row of failing) {
    process.stdout.write(`\n${row.name} — ${row.overall}/100\n`);
    for (const issue of row.issues.slice(0, 4)) process.stdout.write(`  - ${issue}\n`);
  }
}

if (failing.length > 0) process.exitCode = 1;

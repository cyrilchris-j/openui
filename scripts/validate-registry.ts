#!/usr/bin/env tsx
/**
 * `pnpm validate:registry [--strict] [--json]`
 *
 * Validates every registry item and prints a report. Exit code 1 on error, and
 * on warning when `--strict` is passed (which is what CI does for pull requests
 * that touch `registry/`).
 */
import { validateRegistry } from "@openui/registry-schema/node";
import { inspectDependencies } from "@openui/registry-schema";

import { REGISTRY_ROOT } from "./lib/paths.js";

const args = new Set(process.argv.slice(2));
const strict = args.has("--strict");
const asJson = args.has("--json");

const { issues, items, result } = await validateRegistry({
  registryRoot: REGISTRY_ROOT,
  strict,
  requireScreenshot: false,
});

const errors = issues.filter((issue) => issue.level === "error");
const warnings = issues.filter((issue) => issue.level === "warning");

if (asJson) {
  process.stdout.write(`${JSON.stringify({ result, issues }, null, 2)}\n`);
} else {
  const fileCount = items.reduce((total, item) => total + item.files.length, 0);
  process.stdout.write(
    `Registry: ${result.itemCount} items, ${fileCount} files, ${errors.length} errors, ${warnings.length} warnings\n`,
  );

  for (const issue of [...errors, ...warnings]) {
    const location = [issue.item, issue.path].filter(Boolean).join(" ");
    process.stdout.write(`  ${issue.level === "error" ? "error" : "warn "}  ${location}: ${issue.message}\n`);
  }

  // Dependency policy summary: surfaced so a reviewer sees unapproved packages
  // without reading every registry.json.
  const unapproved = items.flatMap((item) =>
    inspectDependencies(item.item.dependencies)
      .filter((finding) => finding.code === "unapproved_package")
      .map((finding) => `${item.item.name}: ${finding.message}`),
  );
  if (unapproved.length > 0) {
    process.stdout.write(`\nDependency policy (${unapproved.length}):\n`);
    for (const line of unapproved) process.stdout.write(`  note  ${line}\n`);
  }
}

if (errors.length > 0 || (strict && warnings.length > 0)) {
  process.exitCode = 1;
}

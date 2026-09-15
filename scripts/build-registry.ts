#!/usr/bin/env tsx
/**
 * `pnpm build:registry`
 *
 * Builds immutable registry artifacts and the index.
 *
 * Outputs:
 *   apps/web/public/r/<name>.json          one artifact per item
 *   apps/web/public/r/registry.json        the index
 *   apps/web/public/r/index.json           alias, for consumers that expect `index.json`
 *   registry/index.json                    the index committed to the repository
 *
 * Errors abort the build; warnings are printed and do not block a local build.
 */
import { writeFile } from "node:fs/promises";
import { join } from "node:path";

import { ensureDir, writeJsonFile } from "@openui/utils/node";

import { buildRegistry } from "./lib/build.js";
import { REGISTRY_INDEX_FILE, REGISTRY_ROOT, WEB_REGISTRY_OUT } from "./lib/paths.js";

const started = Date.now();
const strict = process.argv.includes("--strict");

const built = await buildRegistry({
  registryRoot: REGISTRY_ROOT,
  strict,
  requireScreenshot: false,
  onItem: (item, position, total) => {
    process.stdout.write(`  [${String(position + 1).padStart(3, "0")}/${total}] ${item.name}\n`);
  },
});

const errors = built.issues.filter((issue) => issue.level === "error");
if (errors.length > 0) {
  process.stderr.write(`\nBuild aborted: ${errors.length} validation error(s).\n`);
  for (const issue of errors.slice(0, 20)) {
    process.stderr.write(`  ${issue.item ?? ""} ${issue.path ?? ""}: ${issue.message}\n`);
  }
  process.exit(1);
}

await ensureDir(WEB_REGISTRY_OUT);
for (const artifact of built.artifacts) {
  await writeFile(join(WEB_REGISTRY_OUT, artifact.path), artifact.json, "utf8");
}

const indexJson = `${JSON.stringify(built.index, null, 2)}\n`;
await writeFile(join(WEB_REGISTRY_OUT, "registry.json"), indexJson, "utf8");
await writeFile(join(WEB_REGISTRY_OUT, "index.json"), indexJson, "utf8");
await writeFile(REGISTRY_INDEX_FILE, indexJson, "utf8");

const warnings = built.issues.filter((issue) => issue.level === "warning");
const duration = Date.now() - started;

process.stdout.write(
  `\nBuilt ${built.items.length} artifacts in ${duration}ms\n` +
    `  index:      apps/web/public/r/registry.json\n` +
    `  namespaces: ${built.index.namespaces.join(", ")}\n` +
    `  warnings:   ${warnings.length}\n`,
);

if (warnings.length > 0 && process.env["VERBOSE"]) {
  for (const warning of warnings) {
    process.stdout.write(`  warn  ${warning.item ?? ""} ${warning.message}\n`);
  }
}

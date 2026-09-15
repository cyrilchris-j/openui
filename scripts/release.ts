#!/usr/bin/env tsx
/**
 * `pnpm release [--version 1.2.0] [--dry]`
 *
 * Runs the publish pipeline locally and records what would be published:
 *
 *   1. strict validation (warnings are failures)
 *   2. dependency policy check
 *   3. artifact build with integrity digests
 *   4. `registry/versions.json` — the immutable release manifest
 *
 * The database is *not* written from here. Publishing to a live registry is a
 * deliberate act performed by the release workflow with the service role key,
 * which is why this script stops at "here is the manifest".
 */
import { execFileSync } from "node:child_process";
import { writeFile } from "node:fs/promises";

import { inspectDependencies } from "@openui/registry-schema";

import { buildRegistry, integrityOf } from "./lib/build.js";
import { REGISTRY_ROOT, REGISTRY_VERSIONS_FILE } from "./lib/paths.js";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry");
const versionIndex = args.indexOf("--version");
const version = versionIndex >= 0 ? args[versionIndex + 1] : process.env["REGISTRY_VERSION"];

if (versionIndex >= 0 && !version) {
  process.stderr.write("--version requires a semver value, e.g. --version 1.2.0\n");
  process.exit(1);
}

function git(args: string[]): string | null {
  try {
    return execFileSync("git", args, { encoding: "utf8" }).trim();
  } catch {
    return null;
  }
}

const commitSha = git(["rev-parse", "HEAD"]);
const branch = git(["rev-parse", "--abbrev-ref", "HEAD"]);

process.stdout.write("1/4  Validating registry (strict)\n");
const built = await buildRegistry({
  registryRoot: REGISTRY_ROOT,
  strict: true,
  requireScreenshot: true,
  ...(version ? { version } : {}),
});

const errors = built.issues.filter((issue) => issue.level === "error");
const warnings = built.issues.filter((issue) => issue.level === "warning");

if (errors.length + warnings.length > 0) {
  process.stderr.write(`\nRelease blocked: ${errors.length} errors, ${warnings.length} warnings.\n`);
  for (const issue of [...errors, ...warnings].slice(0, 30)) {
    process.stderr.write(`  ${issue.level}  ${issue.item ?? ""} ${issue.message}\n`);
  }
  process.exit(1);
}
process.stdout.write(`     ${built.items.length} items valid\n`);

process.stdout.write("2/4  Checking dependency policy\n");
const policyFindings = built.items.flatMap((item) =>
  inspectDependencies(item.dependencies).map((finding) => ({ item: item.name, ...finding })),
);
const policyErrors = policyFindings.filter((finding) => finding.level === "error");
if (policyErrors.length > 0) {
  process.stderr.write("\nRelease blocked by dependency policy:\n");
  for (const finding of policyErrors) process.stderr.write(`  ${finding.item}: ${finding.message}\n`);
  process.exit(1);
}
process.stdout.write(`     ${policyFindings.length} notes, 0 blocking\n`);

process.stdout.write("3/4  Building artifacts\n");
const manifest = {
  registry: built.index.name,
  version: built.index.version,
  generatedAt: built.index.generatedAt,
  commitSha,
  branch,
  namespaces: built.index.namespaces,
  items: built.items.map((item) => ({
    name: item.name,
    version: built.index.version,
    integrity: integrityOf(item),
    files: item.files.length,
    url: item.url,
  })),
};

process.stdout.write("4/4  Writing manifest\n");
if (dryRun) {
  process.stdout.write(`     --dry: not writing ${REGISTRY_VERSIONS_FILE}\n`);
  process.stdout.write(`${JSON.stringify(manifest, null, 2).slice(0, 800)}\n...\n`);
} else {
  await writeFile(REGISTRY_VERSIONS_FILE, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  process.stdout.write(`     registry/versions.json (${manifest.items.length} items)\n`);
}

process.stdout.write(
  `\nReady to publish ${built.index.name}@${built.index.version}` +
    (commitSha ? ` from ${commitSha.slice(0, 7)}` : "") +
    "\nNext: the release workflow uploads artifacts and calls the publish endpoint with the service role key.\n",
);

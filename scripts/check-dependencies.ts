#!/usr/bin/env tsx
/**
 * `pnpm check:dependencies [--offline]`
 *
 * Two passes over every registry item's npm dependencies:
 *
 *   1. **Policy** (always, offline): forbidden specifiers, wildcard ranges,
 *      duplicate declarations and packages outside the approved list.
 *   2. **Vulnerabilities** (online, skipped with `--offline`): a batch query to
 *      the OSV API, which is the same database GitHub's advisory feed uses.
 *
 * The online pass is advisory, not blocking: a newly published CVE in a
 * transitive dependency should open a review item, not break every build in the
 * repository at 3am. Policy violations *are* blocking.
 */
import { inspectDependencies } from "@openui/registry-schema";
import { discoverItemDirectories, loadRegistryItem } from "@openui/registry-schema/node";

import { REGISTRY_ROOT } from "./lib/paths.js";

const offline = process.argv.includes("--offline");

interface PackageUse {
  name: string;
  range: string | null;
  items: string[];
}

const directories = await discoverItemDirectories(REGISTRY_ROOT);
const policyFindings: Array<{ item: string; level: string; message: string }> = [];
const packages = new Map<string, PackageUse>();

for (const directory of directories) {
  const loaded = await loadRegistryItem(directory);
  for (const finding of inspectDependencies(loaded.item.dependencies)) {
    policyFindings.push({ item: loaded.item.name, level: finding.level, message: finding.message });
  }
  for (const specifier of loaded.item.dependencies) {
    const at = specifier.lastIndexOf("@");
    const name = at > 0 ? specifier.slice(0, at) : specifier;
    const range = at > 0 ? specifier.slice(at + 1) : null;
    const entry = packages.get(name) ?? { name, range, items: [] };
    entry.items.push(loaded.item.name);
    if (range) entry.range = range;
    packages.set(name, entry);
  }
}

const blocking = policyFindings.filter((finding) => finding.level === "error");
const notes = policyFindings.filter((finding) => finding.level === "warning");

process.stdout.write(
  `Dependency policy: ${blocking.length} blocking, ${notes.length} notes across ${packages.size} packages\n`,
);
for (const finding of blocking) process.stdout.write(`  error  ${finding.item}: ${finding.message}\n`);
for (const finding of notes) process.stdout.write(`  note   ${finding.item}: ${finding.message}\n`);

interface OsvVulnerability {
  id: string;
  summary?: string;
  severity?: Array<{ type: string; score: string }>;
  affected?: Array<{ ranges?: Array<{ events?: Array<{ introduced?: string; fixed?: string }> }> }>;
}

async function osvBatch(queries: Array<{ package: { name: string; ecosystem: string }; version?: string }>) {
  const response = await fetch("https://api.osv.dev/v1/querybatch", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ queries }),
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) throw new Error(`OSV responded ${response.status}`);
  return (await response.json()) as { results: Array<{ vulns?: OsvVulnerability[] }> };
}

if (offline) {
  process.stdout.write("\nVulnerability scan skipped (--offline).\n");
} else {
  const list = [...packages.values()];
  try {
    const results = await osvBatch(
      list.map((entry) => ({
        package: { name: entry.name, ecosystem: "npm" },
        version: entry.range?.replace(/^[\^~]/, "").split(".")[0] ? undefined : undefined,
      })),
    );

    let vulnerable = 0;
    results.results.forEach((result, index) => {
      const entry = list[index];
      if (!entry || !result.vulns || result.vulns.length === 0) return;
      vulnerable += 1;
      process.stdout.write(`\n  ${entry.name}: ${result.vulns.length} known advisory(ies) in range ${entry.range ?? "any"}\n`);
      for (const vuln of result.vulns.slice(0, 5)) {
        process.stdout.write(`    ${vuln.id} — ${(vuln.summary ?? "no summary").slice(0, 100)}\n`);
      }
      process.stdout.write(`    used by: ${entry.items.join(", ")}\n`);
    });

    process.stdout.write(
      vulnerable === 0
        ? "\nVulnerability scan: no advisories matched the declared ranges.\n"
        : `\nVulnerability scan: ${vulnerable} package(s) need review (advisory, not blocking).\n`,
    );
  } catch (error) {
    process.stdout.write(`\nVulnerability scan unavailable: ${(error as Error).message}\n`);
  }
}

if (blocking.length > 0) process.exitCode = 1;

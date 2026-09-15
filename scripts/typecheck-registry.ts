#!/usr/bin/env tsx
/**
 * `pnpm typecheck:registry`
 *
 * Registry items are not workspace packages — they are published artifacts, so
 * `pnpm typecheck` never sees them. That is correct for the repository and
 * dangerous for the product: the first-party resources ARE the showcase.
 *
 * This script closes the gap. It generates a throwaway tsconfig that maps the
 * registry's own import convention (`@/lib/cn`) onto the `cn` utility item and
 * compiles every `.ts`/`.tsx` file under `registry/` with the same strict options
 * the rest of the monorepo uses. Broken showcase code fails CI.
 */
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, relative } from "node:path";

import ts from "typescript";

import { discoverItemDirectories } from "@openui/registry-schema/node";
import { toPosix } from "@openui/utils/node";

import { REGISTRY_ROOT, REPO_ROOT } from "./lib/paths.js";

const workdir = await mkdtemp(join(tmpdir(), "openui-registry-tsc-"));
const directories = await discoverItemDirectories(REGISTRY_ROOT);

// `@/lib/...` resolves to the `cn` utility item, which is where the registry
// keeps its one shared helper. Consumer projects map the same specifier through
// their own aliases; the CLI rewrites it on install.
const cnDirectory = directories.find((directory) => directory.endsWith("/components/cn"));

const config = {
  compilerOptions: {
    target: "ES2022",
    lib: ["ES2022", "DOM", "DOM.Iterable"],
    jsx: "react-jsx",
    module: "ESNext",
    moduleResolution: "bundler",
    strict: true,
    noUncheckedIndexedAccess: true,
    skipLibCheck: true,
    noEmit: true,
    esModuleInterop: true,
    allowImportingTsExtensions: true,
    types: [],
    paths: {
      "@/lib/cn": [toPosix(relative(workdir, join(cnDirectory ?? REGISTRY_ROOT, "cn.ts")))],
      "@/lib/*": [toPosix(relative(workdir, join(cnDirectory ?? REGISTRY_ROOT, "*")))],
      "@/*": [toPosix(relative(workdir, REGISTRY_ROOT)) + "/*"],
    },
  },
  include: [`${toPosix(relative(workdir, REGISTRY_ROOT))}/**/*.ts`, `${toPosix(relative(workdir, REGISTRY_ROOT))}/**/*.tsx`],
  exclude: [`${toPosix(relative(workdir, REGISTRY_ROOT))}/generated/**`],
};

const configPath = join(workdir, "tsconfig.json");
await writeFile(configPath, JSON.stringify(config, null, 2), "utf8");

const parsed = ts.parseJsonConfigFileContent(
  JSON.parse(await readFile(configPath, "utf8")) as ts.CompilerOptions,
  ts.sys,
  workdir,
);

const program = ts.createProgram({ rootNames: parsed.fileNames, options: { ...parsed.options, noEmit: true } });
const diagnostics = ts.getPreEmitDiagnostics(program);

const formatted = diagnostics.map((diagnostic) => {
  const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, " ");
  if (!diagnostic.file || diagnostic.start === undefined) return `error: ${message}`;
  const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
  const file = toPosix(relative(REPO_ROOT, diagnostic.file.fileName));
  return `${file}:${line + 1}:${character + 1} ${message}`;
});

await rm(workdir, { recursive: true, force: true });

if (formatted.length === 0) {
  process.stdout.write(`Registry typecheck: ${parsed.fileNames.length} files, 0 errors\n`);
} else {
  process.stdout.write(`Registry typecheck: ${formatted.length} problem(s)\n`);
  for (const line of formatted.slice(0, 60)) process.stdout.write(`  ${line}\n`);
  process.exitCode = 1;
}

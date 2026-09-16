import type { BuiltRegistryItem } from "@openui/types";

/**
 * Turns a built registry item into a Sandpack filesystem.
 *
 * This is where the registry's install contract is *executed* rather than
 * described, and it has to mirror what the CLI does:
 *
 *  1. Every file the item ships is written at its own path, with `@/lib/...`
 *     imports rewritten to the sandbox's local `./lib/...` — the same alias
 *     rewrite the CLI performs against a real project.
 *  2. A demo (`demo.tsx`) becomes `/App.tsx`, so the sandbox has an entry point.
 *  3. Anything with no demo gets a generated entry that renders the item's
 *     primary export, which is what makes a component without a hand-written
 *     demo previewable at all.
 *
 * If the item declares a `cn` registry dependency, a local `cn` module is
 * synthesised. That mirrors the `cn` utility published in the registry, and it
 * keeps the sandbox free of a network install for a four-line helper.
 */

/** The `cn` implementation the registry publishes as its `cn` item. */
const CN_MODULE = `import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: Parameters<typeof clsx>): string {
  return twMerge(clsx(inputs));
}
`;

export type SandboxFiles = Record<string, string>;

export function buildSandboxFiles(item: BuiltRegistryItem): SandboxFiles {
  const files: SandboxFiles = {};
  const needsCn =
    item.registryDependencies.includes("cn") ||
    item.files.some((file) => file.content.includes("@/lib/cn"));

  for (const file of item.files) {
    // `README.md` and `design.md` are documentation, not sandbox inputs.
    if (file.path.endsWith(".md") || file.path.endsWith(".mdx")) continue;

    const sandboxPath = `/${file.path}`;
    files[sandboxPath] = rewriteImports(file.content);
  }

  if (needsCn) files["/lib/cn.ts"] = CN_MODULE;

  // The item's own demo is the entry point.
  if (files["/demo.tsx"]) {
    files["/App.tsx"] = files["/demo.tsx"]!;
    delete files["/demo.tsx"];
  } else if (!files["/App.tsx"]) {
    const entry = generatedEntry(item, files);
    if (entry) files["/App.tsx"] = entry;
  }

  return files;
}

/**
 * Rewrites the alias the registry is authored against into sandbox-relative
 * paths. `@/lib/cn` → `./lib/cn`, and `@/components/...` → a local sibling.
 * Also strips `"use client"` — a Next.js directive that is meaningless (and
 * confusing) inside the Sandpack preview, which runs plain React.
 */
function rewriteImports(source: string): string {
  return source
    .replace(/^["']use client["'];\n?/m, "")
    .replace(/(["'])@\/lib\//g, "$1./lib/")
    .replace(/(["'])@\/components\//g, "$1./")
    .replace(/(["'])@\/hooks\//g, "$1./");
}

/**
 * Generates an entry for an item with no `demo.tsx`.
 *
 * The export to mount is found by pattern rather than guessed: a resource's
 * primary export is conventionally named after its file (PascalCase) or is the
 * default export. When neither can be determined, no entry is generated and the
 * playground says so — which is better than rendering a blank frame.
 */
function generatedEntry(item: BuiltRegistryItem, files: SandboxFiles): string | null {
  const componentFile = Object.keys(files).find(
    (path) => path.endsWith(".tsx") && !path.startsWith("/lib/"),
  );
  if (!componentFile) return null;

  const source = files[componentFile]!;
  const named = /export\s+(?:function|const)\s+([A-Z][A-Za-z0-9]*)/.exec(source);
  const hasDefault = /export\s+default\s/.test(source);
  const importPath = `./${componentFile.replace(/^\//, "").replace(/\.tsx$/, "")}`;

  const symbol = named?.[1];
  if (symbol) {
    return `import { ${symbol} } from "${importPath}";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center p-10">
      <${symbol} />
    </div>
  );
}
`;
  }

  if (hasDefault) {
    return `import Component from "${importPath}";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center p-10">
      <Component />
    </div>
  );
}
`;
  }

  void item;
  return null;
}

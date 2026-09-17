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

/**
 * Local implementations of the registry's hook items.
 *
 * A demo that imports `@/hooks/use-in-view` declares a *registry dependency*,
 * which the CLI resolves by installing the hook item first. The sandbox has no
 * installer, so each dependency is satisfied from an inlined module with the
 * same public API — the identical strategy the `cn` module already uses.
 */
const HOOK_MODULES: Record<string, string> = {
  "use-in-view": `import { useEffect, useRef, useState } from "react";

export function useInView(options = {}) {
  const { once = false, threshold = 0, rootMargin = "0px" } = options;
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(element);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [once, threshold, rootMargin]);

  return { ref, inView };
}

export default useInView;
`,
  "use-reduced-motion": `import { useEffect, useState } from "react";

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}

export default useReducedMotion;
`,
  "use-canvas-loop": `import { useEffect, useRef } from "react";

export function useCanvasLoop(draw, options = {}) {
  const canvasRef = useRef(null);
  const drawRef = useRef(draw);
  drawRef.current = draw;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
    resizeObserver?.observe(canvas);

    let raf = null;
    let running = false;
    let onScreen = true;
    const startEpoch = performance.now();

    const frame = (time) => {
      raf = null;
      drawRef.current(context, width, height, time - startEpoch);
      if (running) raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (running || reduced) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      if (raf !== null) { cancelAnimationFrame(raf); raf = null; }
    };

    if (reduced || options.static) {
      drawRef.current(context, width, height, 0);
    } else {
      start();
    }

    const intersection = typeof IntersectionObserver !== "undefined"
      ? new IntersectionObserver(([entry]) => {
          onScreen = Boolean(entry?.isIntersecting);
          if (onScreen && !document.hidden && !reduced && !options.static) start();
          if (!onScreen) stop();
        })
      : null;
    intersection?.observe(canvas);

    const visibility = () => {
      if (document.hidden) stop();
      else if (onScreen && !reduced && !options.static) start();
    };
    document.addEventListener("visibilitychange", visibility);

    return () => {
      stop();
      resizeObserver?.disconnect();
      intersection?.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);

  return canvasRef;
}

export default useCanvasLoop;
`,
};

export function buildSandboxFiles(item: BuiltRegistryItem): SandboxFiles {
  const files: SandboxFiles = {};
  const needsCn =
    item.registryDependencies.includes("cn") ||
    item.files.some((file) => file.content.includes("@/lib/cn"));

  // Detect every hook dependency actually imported by the item's source —
  // declared or not — and inline the module for each.
  const hookDeps = new Set<string>();
  for (const file of item.files) {
    for (const match of file.content.matchAll(/from ["']@\/hooks\/([a-z0-9-]+)["']/g)) {
      hookDeps.add(match[1]!);
    }
  }

  for (const file of item.files) {
    // `README.md` and `design.md` are documentation, not sandbox inputs.
    if (file.path.endsWith(".md") || file.path.endsWith(".mdx")) continue;

    const sandboxPath = `/${file.path}`;
    files[sandboxPath] = rewriteImports(file.content);
  }

  if (needsCn) files["/lib/cn.ts"] = CN_MODULE;
  for (const hookName of hookDeps) {
    const module = HOOK_MODULES[hookName];
    if (module) files[`/hooks/${hookName}.ts`] = module;
  }

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
    .replace(/(["'])@\/hooks\//g, "$1./hooks/");
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

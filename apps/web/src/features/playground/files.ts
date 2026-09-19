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
  const [inView, setInView] = useState(true);

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
function generatedEntry(item: BuiltRegistryItem, files: SandboxFiles): string {
  const componentFile = Object.keys(files).find(
    (path) => path.endsWith(".tsx") && !path.startsWith("/lib/"),
  );

  if (componentFile) {
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
  }

  // 1. Themes & Design Systems (CSS token sets) - Unique per theme
  if (item.category === "themes" || item.category === "design-systems" || Object.keys(files).some((p) => p.endsWith(".css"))) {
    if (item.name === "editorial-oxide") {
      return `import * as React from "react";

export default function EditorialOxideSpecimen() {
  return (
    <div className="w-full h-full min-h-[16rem] p-6 flex flex-col justify-between bg-[#fcfbf7] text-[#1c1917] font-serif select-none border border-[#e7e5e4]">
      <div className="flex items-center justify-between border-b border-[#c84b31]/30 pb-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#c84b31] font-bold">EDITORIAL OXIDE</span>
        <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-[#c84b31]/10 text-[#c84b31] uppercase font-semibold">WARM CLAY</span>
      </div>
      <div className="my-2">
        <h3 className="font-serif text-2xl italic font-bold tracking-tight text-[#1c1917]">Warm Editorial Type</h3>
        <p className="font-sans text-xs text-[#78716c] line-clamp-2 mt-1 leading-relaxed">Bookplate layout with terracotta accents and antique paper tone.</p>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-[#e7e5e4]">
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 rounded bg-[#c84b31] text-white text-[11px] font-sans font-bold shadow-xs">Action</button>
          <button className="px-3 py-1.5 rounded border border-[#c84b31]/40 text-[#c84b31] text-[11px] font-sans">Outline</button>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded-full bg-[#c84b31] shadow-xs" title="Oxide" />
          <span className="w-4 h-4 rounded-full bg-[#78716c] shadow-xs" title="Graphite" />
          <span className="w-4 h-4 rounded-full bg-[#fcfbf7] border border-[#d6d3d1] shadow-xs" title="Paper" />
        </div>
      </div>
    </div>
  );
}
`;
    }

    if (item.name === "industrial-mono") {
      return `import * as React from "react";

export default function IndustrialMonoSpecimen() {
  return (
    <div className="w-full h-full min-h-[16rem] p-6 flex flex-col justify-between bg-[#0b0c10] text-[#e0e2ec] font-mono select-none border border-[#f59e0b]/30">
      <div className="flex items-center justify-between border-b border-[#20232d] pb-3">
        <span className="text-[10px] uppercase tracking-widest text-[#f59e0b] font-bold">[ INDUSTRIAL MONO ]</span>
        <span className="text-[9px] px-2 py-0.5 bg-[#f59e0b]/20 text-[#f59e0b] font-bold">REV 2.4</span>
      </div>
      <div className="my-2">
        <h3 className="text-lg font-bold tracking-wider text-white uppercase font-mono">&gt; MACH_SYSTEM_SPEC</h3>
        <p className="text-[10px] text-[#9ca3af] line-clamp-2 mt-1">High-density technical typography with safety amber accents.</p>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-[#20232d]">
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 bg-[#f59e0b] text-black text-[10px] font-bold uppercase tracking-wider">EXECUTE</button>
          <button className="px-3 py-1.5 border border-[#374151] text-[#e0e2ec] text-[10px]">HALT</button>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[9px] text-[#f59e0b]">
          <span>● ONLINE</span>
        </div>
      </div>
    </div>
  );
}
`;
    }

    if (item.name === "swiss-editorial") {
      return `import * as React from "react";

export default function SwissEditorialSpecimen() {
  return (
    <div className="w-full h-full min-h-[16rem] p-6 flex flex-col justify-between bg-white text-black font-sans select-none border-l-4 border-[#e11d48] shadow-sm">
      <div className="flex items-center justify-between border-b border-black/15 pb-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#e11d48] font-bold">SWISS EDITORIAL</span>
        <span className="font-mono text-[9px] px-2 py-0.5 bg-black text-white font-bold uppercase">HELVETICA GRID</span>
      </div>
      <div className="my-2">
        <h3 className="text-2xl font-black tracking-tighter text-black uppercase">Rational Grid</h3>
        <p className="text-xs text-neutral-600 line-clamp-2 mt-1 font-medium">Asymmetric typography rooted in the International Typographic Style.</p>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-black/15">
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 bg-black text-white text-[11px] font-bold tracking-tight">EXPLORE</button>
          <button className="px-3 py-1.5 border border-black text-black text-[11px] font-bold">INDEX</button>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3.5 h-3.5 bg-[#e11d48]" />
          <span className="w-3.5 h-3.5 bg-black" />
          <span className="w-3.5 h-3.5 bg-neutral-300" />
        </div>
      </div>
    </div>
  );
}
`;
    }

    if (item.name === "industrial-archive") {
      return `import * as React from "react";

export default function IndustrialArchiveSpecimen() {
  return (
    <div className="w-full h-full min-h-[16rem] p-6 flex flex-col justify-between bg-[#070e1b] text-[#cbd5e1] font-mono select-none border border-[#0284c7]/40">
      <div className="flex items-center justify-between border-b border-[#1e293b] pb-3">
        <span className="text-[10px] uppercase tracking-widest text-[#38bdf8] font-bold">ARCHIVE // BLUEPRINT</span>
        <span className="text-[9px] px-2 py-0.5 bg-[#0284c7]/20 text-[#38bdf8] font-bold">SPEC-0948</span>
      </div>
      <div className="my-2">
        <h3 className="text-xl font-bold tracking-tight text-white font-sans">Technical Blueprint</h3>
        <p className="text-[10px] text-[#94a3b8] line-clamp-2 mt-1">Deep blueprint slate palette with precision drafting guides.</p>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-[#1e293b]">
        <button className="px-3 py-1.5 rounded bg-[#0284c7] text-white text-[10px] font-bold">RETRIEVE FILE</button>
        <span className="text-[9px] text-[#38bdf8] font-mono">SECTOR: 07-A</span>
      </div>
    </div>
  );
}
`;
    }

    if (item.name === "swiss-ledger") {
      return `import * as React from "react";

export default function SwissLedgerSpecimen() {
  return (
    <div className="w-full h-full min-h-[16rem] p-6 flex flex-col justify-between bg-[#f4f6f4] text-[#132a13] font-mono select-none border border-[#31572c]/30">
      <div className="flex items-center justify-between border-b border-[#31572c]/20 pb-3">
        <span className="text-[10px] uppercase tracking-widest text-[#31572c] font-bold">SWISS LEDGER</span>
        <span className="text-[9px] px-2 py-0.5 rounded bg-[#31572c]/15 text-[#31572c] font-bold">BAL: OK</span>
      </div>
      <div className="my-2 font-mono">
        <h3 className="text-xl font-bold tracking-tight text-[#132a13]">ACCOUNT 0402</h3>
        <div className="mt-2 text-[10px] text-[#4f772d] space-y-0.5">
          <div className="flex justify-between"><span>CREDIT RATIO:</span><span className="font-bold">94.8%</span></div>
          <div className="flex justify-between"><span>TABULAR FIGURES:</span><span className="font-bold">ACTIVE</span></div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-[#31572c]/20">
        <button className="px-3 py-1 rounded bg-[#31572c] text-white text-[10px] font-bold">RECONCILE</button>
        <span className="text-[9px] text-[#4f772d]">0.00 CHF</span>
      </div>
    </div>
  );
}
`;
    }

    return `import * as React from "react";

export default function ThemeSpecimen() {
  return (
    <div className="w-full h-full min-h-[16rem] p-6 flex flex-col justify-between bg-paper text-ink font-sans select-none">
      <div className="flex items-center justify-between border-b border-line pb-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-oxide font-bold">${item.title}</span>
        <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-ink/5 text-graphite uppercase font-semibold">THEME TOKENS</span>
      </div>
      <div className="my-3">
        <h3 className="font-display text-2xl font-bold tracking-tight text-ink">${item.title}</h3>
        <p className="text-xs text-graphite line-clamp-2 mt-1 leading-relaxed">${item.description}</p>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-line">
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 rounded bg-ink text-paper text-[11px] font-mono font-bold uppercase shadow-sm">Primary</button>
          <button className="px-3 py-1.5 rounded border border-line text-ink text-[11px] font-mono">Outline</button>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded-full bg-oxide shadow-xs" title="Oxide" />
          <span className="w-4 h-4 rounded-full bg-graphite shadow-xs" title="Graphite" />
          <span className="w-4 h-4 rounded-full bg-paper border border-line shadow-xs" title="Paper" />
        </div>
      </div>
    </div>
  );
}
`;
  }

  // 2. AI Directives & Prompts - Unique per directive
  if (item.category === "ai" || item.type.includes("ai")) {
    if (item.name === "anti-slop") {
      return `import * as React from "react";

export default function AntiSlopDirective() {
  const [active, setActive] = React.useState(false);
  return (
    <div className="w-full h-full min-h-[16rem] p-6 flex flex-col justify-between bg-[#0d0909] text-white select-none rounded-xl border border-red-900/60">
      <div className="flex items-center justify-between border-b border-red-950 pb-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-red-400 font-bold">🚫 ANTI-SLOP</span>
        <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-red-500/20 text-red-300 font-bold">STRICT RULES</span>
      </div>
      <div className="my-2">
        <h3 className="font-sans text-lg font-bold text-white tracking-tight">Zero-Hallucination Guard</h3>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <span className="px-2 py-0.5 rounded bg-red-950 text-red-300 text-[9px] font-mono">No buzzwords</span>
          <span className="px-2 py-0.5 rounded bg-red-950 text-red-300 text-[9px] font-mono">No filler code</span>
          <span className="px-2 py-0.5 rounded bg-red-950 text-red-300 text-[9px] font-mono">Deterministic</span>
        </div>
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-red-950">
        <span className="font-mono text-[9px] text-zinc-500">FILTER STATUS: ACTIVE</span>
        <button
          onClick={() => setActive(!active)}
          className="px-3 py-1 rounded bg-red-600 hover:bg-red-500 text-[9px] font-mono text-white font-bold transition-all shadow-xs"
        >
          {active ? "FILTER ACTIVE" : "APPLY FILTER"}
        </button>
      </div>
    </div>
  );
}
`;
    }

    if (item.name === "audit-ui") {
      return `import * as React from "react";

export default function AuditUiDirective() {
  const [checked, setChecked] = React.useState([true, true, true]);
  const toggle = (i) => {
    const next = [...checked];
    next[i] = !next[i];
    setChecked(next);
  };
  return (
    <div className="w-full h-full min-h-[16rem] p-6 flex flex-col justify-between bg-[#08121e] text-white select-none rounded-xl border border-sky-900/60">
      <div className="flex items-center justify-between border-b border-sky-950 pb-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-sky-400 font-bold">🔍 AUDIT UI</span>
        <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold">SCORE: 98/100</span>
      </div>
      <div className="my-2 space-y-1">
        {["A11y ARIA semantics verified", "Contrast ratio AAA minimum", "Interactive keyboard trap check"].map((txt, idx) => (
          <div key={idx} onClick={() => toggle(idx)} className="flex items-center gap-2 cursor-pointer text-[10px] font-mono text-slate-300">
            <span className={checked[idx] ? "text-emerald-400" : "text-slate-600"}>{checked[idx] ? "✓" : "○"}</span>
            <span className={checked[idx] ? "text-slate-200" : "line-through text-slate-500"}>{txt}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-sky-950">
        <span className="font-mono text-[9px] text-sky-400 font-semibold">ALL CHECKS PASSING</span>
        <span className="font-mono text-[9px] text-slate-500">WCAG 2.2</span>
      </div>
    </div>
  );
}
`;
    }

    if (item.name === "compose-page") {
      return `import * as React from "react";

export default function ComposePageDirective() {
  const [step, setStep] = React.useState(0);
  const blocks = ["Hero Section", "Features Grid", "Social Proof", "CTA Dock"];
  return (
    <div className="w-full h-full min-h-[16rem] p-6 flex flex-col justify-between bg-[#110f1d] text-white select-none rounded-xl border border-purple-900/60">
      <div className="flex items-center justify-between border-b border-purple-950 pb-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-purple-400 font-bold">📐 COMPOSE PAGE</span>
        <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">SECTION DOCK</span>
      </div>
      <div className="my-2 grid grid-cols-2 gap-1.5">
        {blocks.map((b, i) => (
          <div
            key={b}
            onClick={() => setStep(i)}
            className={"p-2 rounded border text-[10px] font-mono cursor-pointer transition-all " + (step === i ? "border-purple-400 bg-purple-900/40 text-white font-bold" : "border-purple-950/60 bg-black/30 text-purple-300")}
          >
            {i + 1}. {b}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-purple-950">
        <span className="font-mono text-[9px] text-purple-400">ACTIVE: {blocks[step]}</span>
        <button onClick={() => setStep((step + 1) % blocks.length)} className="px-2.5 py-1 rounded bg-purple-700 text-[9px] font-mono text-white font-bold">NEXT</button>
      </div>
    </div>
  );
}
`;
    }

    if (item.name === "editorial-rules") {
      return `import * as React from "react";

export default function EditorialRulesDirective() {
  return (
    <div className="w-full h-full min-h-[16rem] p-6 flex flex-col justify-between bg-[#14120e] text-[#f5ebd7] select-none rounded-xl border border-amber-900/50">
      <div className="flex items-center justify-between border-b border-amber-950 pb-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-amber-400 font-bold">📜 EDITORIAL RULES</span>
        <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">TYPOGRAPHY</span>
      </div>
      <div className="my-2">
        <h3 className="font-serif text-xl italic font-bold text-amber-100 tracking-tight">Instrument Serif &amp; Inter</h3>
        <div className="mt-2 text-[10px] font-mono text-amber-300/80 space-y-0.5">
          <div>Scale: Major Third (1.250)</div>
          <div>Tracking: Display (-0.02em) · Mono (+0.14em)</div>
          <div>Leading: Tight (1.1) · Editorial (1.6)</div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-amber-950">
        <span className="font-mono text-[9px] text-amber-500">SPECIMEN #01</span>
        <span className="font-mono text-[9px] text-amber-400 font-bold">ENFORCED</span>
      </div>
    </div>
  );
}
`;
    }

    if (item.name === "hero-prompt") {
      return `import * as React from "react";

export default function HeroPromptDirective() {
  const [variant, setVariant] = React.useState(0);
  const headlines = [
    "World-Class Creative Visual Engine",
    "Interfaces Should Have A Fingerprint",
    "Engineered Motion For Design Systems"
  ];
  return (
    <div className="w-full h-full min-h-[16rem] p-6 flex flex-col justify-between bg-[#081a14] text-white select-none rounded-xl border border-emerald-900/60">
      <div className="flex items-center justify-between border-b border-emerald-950 pb-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400 font-bold">✨ HERO PROMPT</span>
        <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">HERO DIRECTIVE</span>
      </div>
      <div className="my-2">
        <h3 className="font-sans text-base font-bold text-emerald-100 leading-snug tracking-tight">{headlines[variant]}</h3>
        <p className="font-mono text-[9px] text-emerald-400/70 mt-1">High-converting above-the-fold headline &amp; CTA architecture.</p>
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-emerald-950">
        <button
          onClick={() => setVariant((variant + 1) % headlines.length)}
          className="px-3 py-1 rounded bg-emerald-700 hover:bg-emerald-600 text-[9px] font-mono text-white font-bold transition-all shadow-xs"
        >
          CYCLE HEADLINE
        </button>
        <span className="font-mono text-[9px] text-emerald-400">{variant + 1} / 3</span>
      </div>
    </div>
  );
}
`;
    }

    if (item.name === "ui-designer") {
      return `import * as React from "react";

export default function UiDesignerDirective() {
  const [palette, setPalette] = React.useState("#6366f1");
  return (
    <div className="w-full h-full min-h-[16rem] p-6 flex flex-col justify-between bg-[#0f0e17] text-white select-none rounded-xl border border-indigo-900/60">
      <div className="flex items-center justify-between border-b border-indigo-950 pb-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-indigo-400 font-bold">🎨 UI DESIGNER</span>
        <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">SYSTEM PROMPT</span>
      </div>
      <div className="my-2">
        <h3 className="font-sans text-base font-bold text-white tracking-tight">Design Token Generator</h3>
        <div className="mt-2 flex items-center gap-2">
          {["#6366f1", "#ec4899", "#10b981", "#f59e0b"].map((col) => (
            <button
              key={col}
              onClick={() => setPalette(col)}
              style={{ background: col }}
              className={"w-5 h-5 rounded-full transition-transform " + (palette === col ? "scale-125 ring-2 ring-white" : "")}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-indigo-950">
        <span className="font-mono text-[9px] text-indigo-400">PRIMARY: {palette}</span>
        <span className="font-mono text-[9px] text-slate-500">AUTONOMOUS UI</span>
      </div>
    </div>
  );
}
`;
    }

    return `import * as React from "react";

export default function AiDirectiveSpecimen() {
  const [copied, setCopied] = React.useState(false);
  return (
    <div className="w-full h-full min-h-[16rem] p-6 flex flex-col justify-between bg-[#0b0e17] text-white select-none rounded-xl border border-slate-800">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-amber-400 font-bold">⚡ AI DIRECTIVE</span>
        <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-semibold uppercase">SYSTEM PROMPT</span>
      </div>
      <div className="my-2">
        <h3 className="font-display text-xl font-bold text-white tracking-tight">${item.title}</h3>
        <p className="font-mono text-[10px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">${item.description}</p>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-slate-800">
        <span className="font-mono text-[9px] text-slate-500">FORMAT: MARKDOWN RULES</span>
        <button
          onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }}
          className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[9px] font-mono text-cyan-400 uppercase font-bold transition-colors"
        >
          {copied ? "COPIED" : "COPY PROMPT"}
        </button>
      </div>
    </div>
  );
}
`;
  }

  // 3. Hooks and Utilities
  if (item.name === "cn") {
    return `import * as React from "react";
import { cn } from "./lib/cn.js";

export default function CnDemo() {
  const [active, setActive] = React.useState(false);
  const result = cn("px-4 py-2 font-mono text-xs rounded transition-all", active ? "bg-oxide text-white shadow-lg" : "bg-surface border border-line text-ink");
  return (
    <div className="p-6 flex flex-col items-center justify-center gap-3 select-none">
      <button onClick={() => setActive(!active)} className={result}>
        Toggle State ({active ? "Active" : "Inactive"})
      </button>
      <code className="font-mono text-[10px] text-graphite max-w-[280px] truncate">{result}</code>
    </div>
  );
}
`;
  }

  if (item.name === "use-in-view") {
    return `import * as React from "react";
import { useInView } from "./hooks/use-in-view.js";

export default function UseInViewDemo() {
  const { ref, inView } = useInView({ threshold: 0.5 });
  return (
    <div className="p-6 flex flex-col items-center justify-center select-none">
      <div ref={ref} className="p-4 rounded-xl border border-line bg-paper text-center shadow-md">
        <span className="font-mono text-[9px] text-oxide font-bold uppercase">HOOK: USE-IN-VIEW</span>
        <h4 className="font-display font-bold text-sm text-ink mt-1">Status: {inView ? "● In Viewport" : "○ Out of View"}</h4>
      </div>
    </div>
  );
}
`;
  }

  if (item.name === "use-reduced-motion") {
    return `import * as React from "react";
import { useReducedMotion } from "./hooks/use-reduced-motion.js";

export default function UseReducedMotionDemo() {
  const reduced = useReducedMotion();
  return (
    <div className="p-6 flex flex-col items-center justify-center select-none">
      <div className="p-4 rounded-xl border border-line bg-paper text-center shadow-md">
        <span className="font-mono text-[9px] text-oxide font-bold uppercase">HOOK: REDUCED MOTION</span>
        <h4 className="font-display font-bold text-sm text-ink mt-1">Reduced Motion: {reduced ? "Enforced" : "Natural"}</h4>
      </div>
    </div>
  );
}
`;
  }

  if (item.name === "use-canvas-loop") {
    return `import * as React from "react";
import { useCanvasLoop } from "./hooks/use-canvas-loop.js";

export default function UseCanvasLoopDemo() {
  const canvasRef = useCanvasLoop((ctx, w, h, time) => {
    ctx.fillStyle = "#07090f";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "#ba442c";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, 25 + Math.sin(time * 0.003) * 10, 0, Math.PI * 2);
    ctx.stroke();
  });
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#07090f] overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full object-cover" />
    </div>
  );
}
`;
  }

  // 4. Universal Fallback
  return `import * as React from "react";

export default function GenericSpecimen() {
  return (
    <div className="w-full h-full p-6 flex flex-col justify-between bg-paper text-ink select-none">
      <span className="font-mono text-[9px] uppercase tracking-widest text-oxide font-bold">${item.category} · ${item.type}</span>
      <h3 className="font-display text-xl font-bold tracking-tight">${item.title}</h3>
      <p className="text-xs text-graphite line-clamp-2">${item.description}</p>
    </div>
  );
}
`;
}


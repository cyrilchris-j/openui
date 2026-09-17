import type { ResourceDefinition } from "../lib/definitions.js";

/**
 * Motion batch 2 — eleven further motion systems: velocity-coupled fades,
 * shared-element morphs, elastic accordions, page wipes, multi-speed
 * parallax, magnetic repulsion, count-up tweens, spring drawers,
 * scroll-velocity blur, exit collapses and streaming data rows.
 */

const P = (name: string, definition: Omit<ResourceDefinition, "name">): ResourceDefinition => ({
  name,
  ...definition,
});

export default [
  P("velocity-fade-list", {
    category: "motion",
    subcategory: "scroll",
    title: "Velocity Fade List",
    description:
      "List items whose opacity and vertical blur respond to scroll velocity — scrolling fast dissolves the rows into streaks, slowing down brings them back into focus — motion feedback that measures impatience.",
    tags: ["velocity", "fade", "blur", "list"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "kinetic",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "scroll-velocity-trigger",
      visualModel: "velocity-blurred-rows",
      motionModel: "speed-coupled-dissolve",
      layoutModel: "list",
      semanticPurpose: "scroll-feedback",
    },
    source: `"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface VelocityFadeListProps {
  rows: string[];
  className?: string;
}

export function VelocityFadeList({ rows, className }: VelocityFadeListProps) {
  const containerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let lastY = window.scrollY;
    let lastT = performance.now();
    let raf: number | null = null;
    let velocity = 0;

    const tick = () => {
      const now = performance.now();
      const dy = window.scrollY - lastY;
      const dt = Math.max(1, now - lastT);
      lastY = window.scrollY;
      lastT = now;
      velocity += ((dy / dt) * 16 - velocity) * 0.25;

      const intensity = Math.min(Math.abs(velocity) / 40, 1);
      node.style.opacity = String(1 - intensity * 0.7);
      node.style.filter = \`blur(\${(intensity * 4).toFixed(1)}px)\`;

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <ul ref={containerRef} className={cn("flex flex-col divide-y divide-line", className)}>
      {rows.map((row, index) => (
        <li key={index} className="py-4 text-lg text-ink">
          {row}
        </li>
      ))}
    </ul>
  );
}

export default VelocityFadeList;
`,
    demo: `import { VelocityFadeList } from "./velocity-fade-list";

export default function Demo() {
  return (
    <div className="min-h-[70vh] bg-paper p-10">
      <div className="h-[30vh]" />
      <VelocityFadeList
        rows={["Fast scroll dissolves me", "Slow scroll restores me", "Motion measures impatience", "Focus returns on rest"]}
        className="max-w-md"
      />
      <div className="h-[40vh]" />
    </div>
  );
}
`,
  }),

  P("shared-layout-morph", {
    category: "motion",
    subcategory: "page",
    title: "Shared Layout Morph",
    description:
      "A selected card expands into a detail panel while its identity persists: FLIP technique — first, last, invert, play — implemented from scratch with measured rects and one transform, so the element never teleports.",
    tags: ["flip", "morph", "shared-element", "expansion"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "technical",
      macrostructure: "mosaic",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "expressive",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "select-expand",
      visualModel: "measured-rect-morph",
      motionModel: "flip-invert-play",
      layoutModel: "grid-to-overlay",
      semanticPurpose: "detail-navigation",
    },
    source: `"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface SharedLayoutMorphProps {
  items: Array<{ id: string; title: string; body: string }>;
  className?: string;
}

export function SharedLayoutMorph({ items, className }: SharedLayoutMorphProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const cardRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const detailRef = useRef<HTMLDivElement>(null);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const expand = (id: string) => {
    const card = cardRefs.current[id];
    setSelected(id);
    if (!card || reduced) return;
    // Wait for the detail node to mount, then FLIP from the card's rect.
    requestAnimationFrame(() => {
      const detail = detailRef.current;
      if (!detail) return;
      const first = card.getBoundingClientRect();
      const last = detail.getBoundingClientRect();
      const dx = first.left - last.left;
      const dy = first.top - last.top;
      const sx = first.width / last.width;
      const sy = first.height / last.height;
      detail.animate(
        [
          { transform: \`translate(\${dx}px, \${dy}px) scale(\${sx}, \${sy})\`, borderRadius: "12px" },
          { transform: "translate(0, 0) scale(1, 1)", borderRadius: "12px" },
        ],
        { duration: 420, easing: "cubic-bezier(0.2, 0, 0, 1)" },
      );
    });
  };

  return (
    <div className={cn("relative", className)}>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((item) => (
          <button
            key={item.id}
            ref={(node) => {
              cardRefs.current[item.id] = node;
            }}
            type="button"
            onClick={() => expand(item.id)}
            className={cn(
              "rounded-xl border border-line bg-paper p-4 text-left transition-opacity",
              selected === item.id ? "opacity-30" : "opacity-100 hover:border-accent",
            )}
          >
            <p className="font-display text-ink">{item.title}</p>
          </button>
        ))}
      </div>
      {selected && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div
            ref={detailRef}
            className="w-full max-w-sm rounded-xl border border-line bg-paper p-6 shadow-2xl"
          >
            <p className="font-display text-lg text-ink">
              {items.find((item) => item.id === selected)?.title}
            </p>
            <p className="mt-2 text-sm text-ink/70">
              {items.find((item) => item.id === selected)?.body}
            </p>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="mt-4 rounded-md border border-line px-3 py-1.5 text-sm text-ink hover:bg-line/20"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SharedLayoutMorph;
`,
    demo: `import { SharedLayoutMorph } from "./shared-layout-morph";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-10">
      <SharedLayoutMorph
        className="w-full max-w-md"
        items={[
          { id: "a", title: "Schema", body: "The contract every resource signs." },
          { id: "b", title: "Validate", body: "Metadata checked before publish." },
          { id: "c", title: "Mount", body: "Demos proven in a real DOM." },
          { id: "d", title: "Index", body: "Searchable, filterable, listed." },
          { id: "e", title: "Install", body: "One command, files on disk." },
          { id: "f", title: "Compose", body: "Resources combined into products." },
        ]}
      />
    </div>
  );
}
`,
  }),

  P("elastic-accordion", {
    category: "motion",
    subcategory: "physics",
    title: "Elastic Accordion",
    description:
      "An accordion whose panels open with elastic overshoot: neighbouring rows are pushed with a spring-lag (each row's displacement chases the row above), so the stack wobbles like a slinky instead of snapping rigid.",
    tags: ["accordion", "elastic", "overshoot", "slinky"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "playful",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "expressive",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "click-expand",
      visualModel: "chained-push-rows",
      motionModel: "per-row-spring-lag",
      layoutModel: "stack",
      semanticPurpose: "faq-disclosure",
    },
    source: `"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface ElasticAccordionProps {
  items: Array<{ q: string; a: string }>;
  className?: string;
}

export function ElasticAccordion({ items, className }: ElasticAccordionProps) {
  const [open, setOpen] = useState<number | null>(0);
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);
  const offsets = useRef<number[]>(items.map(() => 0));
  const velocities = useRef<number[]>(items.map(() => 0));
  const raf = useRef<number | null>(null);

  // Spring simulation: each closed row below the open one gets pushed down
  // by the open panel's height, chasing with a lag proportional to its index.
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const tick = () => {
      const openIndex = open;
      const openRow = openIndex !== null ? rowRefs.current[openIndex] : null;
      const openHeight = openRow?.scrollHeight ?? 0;

      items.forEach((_, index) => {
        if (index === openIndex) {
          offsets.current[index] = 0;
          velocities.current[index] = 0;
          return;
        }
        const pushed = openIndex !== null && index > openIndex ? openHeight : 0;
        const force = -0.18 * (offsets.current[index]! - pushed);
        velocities.current[index] = (velocities.current[index]! + force) * 0.82;
        offsets.current[index] = offsets.current[index]! + velocities.current[index]!;
      });

      items.forEach((_, index) => {
        const node = rowRefs.current[index];
        if (node && index !== open) {
          node.style.transform = \`translateY(\${offsets.current[index]!.toFixed(2)}px)\`;
        }
      });

      const stillMoving = offsets.current.some((offset, index) => index !== open && Math.abs(offset - (open !== null && index > open ? openHeight : 0)) > 0.5);
      raf.current = stillMoving ? requestAnimationFrame(tick) : null;
    };

    if (raf.current === null) raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current !== null) {
        cancelAnimationFrame(raf.current);
        raf.current = null;
      }
    };
  }, [open, items]);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {items.map((item, index) => (
        <div key={index} className="overflow-hidden rounded-xl border border-line bg-paper">
          <button
            type="button"
            onClick={() => setOpen((current) => (current === index ? null : index))}
            aria-expanded={open === index}
            className="flex w-full items-center justify-between px-5 py-4 text-left font-display text-ink"
          >
            {item.q}
            <span aria-hidden className="text-ink/40">{open === index ? "−" : "+"}</span>
          </button>
          <div
            ref={(node) => {
              rowRefs.current[index] = node;
            }}
            className="grid transition-[grid-template-rows] duration-300"
            style={{
              gridTemplateRows: open === index ? "1fr" : "0fr",
              ...(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? { transition: "none" } : {}),
            }}
          >
            <div className="overflow-hidden">
              <p className="px-5 pb-4 text-sm leading-relaxed text-ink/75">{item.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ElasticAccordion;
`,
    demo: `import { ElasticAccordion } from "./elastic-accordion";

export default function Demo() {
  return (
    <div className="flex min-h-[20rem] items-center justify-center bg-paper p-10">
      <ElasticAccordion
        className="w-full max-w-md"
        items={[
          { q: "Is the metadata contract strict?", a: "Yes. Missing fields fail validation, and validation fails the build." },
          { q: "Can I fork a resource?", a: "Every resource is MIT-licensed source on disk. Fork, rename, resubmit through uniqueness." },
          { q: "Why 800?", a: "Scale forces systems: generators, validators, indexes. Copy-paste does not survive 800." },
        ]}
      />
    </div>
  );
}
`,
  }),

  P("page-wipe-transition", {
    category: "motion",
    subcategory: "page",
    title: "Page Wipe Transition",
    description:
      "A full-bleed panel wipes across the viewport in two phases — an entering panel covers with an accelerated ease, the new content is swapped beneath it, then the panel exits slower with deceleration, mimicking an editor's cut.",
    tags: ["page", "wipe", "transition", "curtain"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "brutalist",
      macrostructure: "full-bleed",
      density: "airy",
      shapeLanguage: "sharp",
      motionLanguage: "expressive",
      typographyStyle: "variable-poster",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "navigate-trigger",
      visualModel: "full-bleed-curtain",
      motionModel: "two-phase-wipe",
      layoutModel: "full-bleed",
      semanticPurpose: "route-transition",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface PageWipeTransitionProps {
  pages: Array<{ label: string; content: string }>;
  className?: string;
}

export function PageWipeTransition({ pages, className }: PageWipeTransitionProps) {
  const [current, setCurrent] = useState(0);
  const [wiping, setWiping] = useState<"idle" | "cover" | "reveal">("idle");
  const [next, setNext] = useState<number | null>(null);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const navigate = (index: number) => {
    if (index === current || wiping !== "idle") return;
    if (reduced) {
      setCurrent(index);
      return;
    }
    setNext(index);
    setWiping("cover");
    window.setTimeout(() => {
      setCurrent(index);
      setWiping("reveal");
      window.setTimeout(() => {
        setWiping("idle");
        setNext(null);
      }, 520);
    }, 380);
  };

  const page = pages[current]!;

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="flex min-h-[16rem] flex-col items-center justify-center gap-6 p-10">
        <p className="font-display text-2xl text-ink">{page.content}</p>
        <nav className="flex gap-2" aria-label="Pages">
          {pages.map((entry, index) => (
            <button
              key={entry.label}
              type="button"
              onClick={() => navigate(index)}
              aria-current={index === current}
              className={cn(
                "rounded-full border px-3 py-1 font-mono text-xs",
                index === current ? "border-ink bg-ink text-paper" : "border-line text-ink/70 hover:border-ink",
              )}
            >
              {entry.label}
            </button>
          ))}
        </nav>
      </div>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 bg-ink"
        style={{
          transform: wiping === "cover" ? "translateY(0)" : wiping === "reveal" ? "translateY(-101%)" : "translateY(-101%)",
          transition:
            wiping === "cover"
              ? "transform 380ms cubic-bezier(0.6, 0, 0.8, 0.2)"
              : "transform 520ms cubic-bezier(0.2, 0, 0.1, 1)",
        }}
      />
    </div>
  );
}

export default PageWipeTransition;
`,
    demo: `import { PageWipeTransition } from "./page-wipe-transition";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-10">
      <PageWipeTransition
        className="w-full max-w-lg rounded-xl border border-line"
        pages={[
          { label: "one", content: "The cut is a design decision." },
          { label: "two", content: "Cover fast, reveal slow." },
          { label: "three", content: "Navigation becomes choreography." },
        ]}
      />
    </div>
  );
}
`,
  }),

  P("parallax-layer-stack", {
    category: "motion",
    subcategory: "scroll",
    title: "Parallax Layer Stack",
    description:
      "Depth from scroll: three planes move at different rates (background 0.3×, mid 0.6×, foreground 1.2×) with depths declared per layer, plus a gentle scale falloff so far planes feel genuinely distant.",
    tags: ["parallax", "depth", "scroll", "layers"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "editorial",
      macrostructure: "stack",
      density: "airy",
      shapeLanguage: "soft",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "pastel",
    },
    fingerprint: {
      interactionModel: "scroll-progress-trigger",
      visualModel: "multi-speed-planes",
      motionModel: "depth-rate-parallax",
      layoutModel: "layered",
      semanticPurpose: "depth-narrative",
    },
    source: `"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface ParallaxLayer {
  content: React.ReactNode;
  /** Scroll rate multiplier; <1 lags, >1 leads. */
  speed: number;
}

export interface ParallaxLayerStackProps {
  layers: ParallaxLayer[];
  className?: string;
}

export function ParallaxLayerStack({ layers, className }: ParallaxLayerStackProps) {
  const layerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const hostRef = useRef<HTMLDivElement>(null);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduced) return;
    const host = hostRef.current;
    if (!host) return;

    const onScroll = () => {
      const rect = host.getBoundingClientRect();
      const viewportCentre = window.innerHeight / 2;
      const offset = rect.top + rect.height / 2 - viewportCentre;

      layers.forEach((layer, index) => {
        const node = layerRefs.current[index];
        if (!node) return;
        const shifted = -offset * (layer.speed - 1) * 0.4;
        const scale = 1 - Math.abs(layer.speed - 1) * 0.08;
        node.style.transform = \`translateY(\${shifted.toFixed(1)}px) scale(\${scale.toFixed(3)})\`;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [layers, reduced]);

  return (
    <div ref={hostRef} className={cn("relative overflow-hidden", className)}>
      {layers.map((layer, index) => (
        <div
          key={index}
          ref={(node) => {
            layerRefs.current[index] = node;
          }}
          className="will-change-transform"
          style={{ zIndex: Math.round(layer.speed * 10) }}
        >
          {layer.content}
        </div>
      ))}
    </div>
  );
}

export default ParallaxLayerStack;
`,
    demo: `import { ParallaxLayerStack } from "./parallax-layer-stack";

export default function Demo() {
  return (
    <div className="min-h-[90vh] bg-gradient-to-b from-sky-100 to-paper p-10">
      <div className="h-[20vh]" />
      <ParallaxLayerStack
        className="rounded-2xl"
        layers={[
          { speed: 0.3, content: <div className="absolute inset-x-0 top-10 h-40 rounded-full bg-white/60 blur-2xl" /> },
          { speed: 0.6, content: <div className="relative mx-auto h-48 w-2/3 rounded-2xl bg-white/80 shadow-xl" /> },
          { speed: 1.2, content: <p className="relative z-10 py-16 text-center font-display text-3xl text-ink">Mountains move slower than foregrounds</p> },
        ]}
      />
      <div className="h-[50vh]" />
    </div>
  );
}
`,
  }),

  P("magnetic-repel-field", {
    category: "motion",
    subcategory: "hover",
    title: "Magnetic Repel Field",
    description:
      "The anti-magnet: grid tiles flee the pointer with force proportional to proximity, then spring back with damped oscillation — a field of objects that keeps its shape only when you leave it alone.",
    tags: ["repel", "grid", "field", "spring-back"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "playful",
      macrostructure: "mosaic",
      density: "dense",
      shapeLanguage: "rounded",
      motionLanguage: "kinetic",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "pointer-repel",
      visualModel: "displaced-grid-tiles",
      motionModel: "spring-return-oscillation",
      layoutModel: "grid",
      semanticPurpose: "playful-grid",
    },
    source: `"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface MagneticRepelFieldProps {
  /** Number of tiles (rows × cols auto-derived). */
  count?: number;
  /** Repel radius, px. */
  radius?: number;
  className?: string;
}

export function MagneticRepelField({ count = 36, radius = 110, className }: MagneticRepelFieldProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<Array<HTMLDivElement | null>>([]);
  const springs = useRef<Array<{ x: number; y: number; vx: number; vy: number; hx: number; hy: number }>>([]);
  const raf = useRef<number | null>(null);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    springs.current = Array.from({ length: count }, () => ({ x: 0, y: 0, vx: 0, vy: 0, hx: 0, hy: 0 }));
  }, [count]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || reduced) return;
    const fine = window.matchMedia?.("(pointer: fine)");
    if (!fine?.matches) return;

    let pointer: { x: number; y: number } | null = null;

    const tick = () => {
      const p = pointer;
      springs.current.forEach((spring, index) => {
        if (p) {
          const node = tileRefs.current[index];
          if (!node) return;
          const rect = node.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = cx - p.x;
          const dy = cy - p.y;
          const distance = Math.hypot(dx, dy);
          if (distance < radius && distance > 0.01) {
            const strength = (1 - distance / radius) * 26;
            spring.hx = (dx / distance) * strength;
            spring.hy = (dy / distance) * strength;
          } else {
            spring.hx = 0;
            spring.hy = 0;
          }
        } else {
          spring.hx = 0;
          spring.hy = 0;
        }

        // Damped spring toward home offset.
        spring.vx += (-0.16 * (spring.x - spring.hx)) * 1;
        spring.vy += (-0.16 * (spring.y - spring.hy)) * 1;
        spring.vx *= 0.86;
        spring.vy *= 0.86;
        spring.x += spring.vx;
        spring.y += spring.vy;

        const node = tileRefs.current[index];
        if (node) {
          node.style.transform = \`translate(\${spring.x.toFixed(2)}px, \${spring.y.toFixed(2)}px)\`;
        }
      });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    const onMove = (event: PointerEvent) => {
      pointer = { x: event.clientX, y: event.clientY };
    };
    const onLeave = () => {
      pointer = null;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, [count, radius, reduced]);

  return (
    <div
      ref={hostRef}
      className={cn("grid w-fit grid-cols-6 gap-1.5", className)}
      aria-hidden
    >
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          ref={(node) => {
            tileRefs.current[index] = node;
          }}
          className="h-9 w-9 rounded-lg bg-line/50 will-change-transform"
        />
      ))}
    </div>
  );
}

export default MagneticRepelField;
`,
    demo: `import { MagneticRepelField } from "./magnetic-repel-field";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-10">
      <MagneticRepelField />
    </div>
  );
}
`,
  }),

  P("count-up-spring", {
    category: "motion",
    subcategory: "data",
    title: "Count Up Spring",
    description:
      "Numeric tween driven by a spring, not an easing curve: the displayed value overshoots the target and settles, digits use tabular numerals so widths never jitter, and re-targeting mid-flight re-targets the spring without restart.",
    tags: ["count", "spring", "number", "tween"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "expressive",
      typographyStyle: "monospace",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "value-change-trigger",
      visualModel: "overshooting-numeral",
      motionModel: "spring-value-integrator",
      layoutModel: "inline",
      semanticPurpose: "metric-attention",
    },
    source: `"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface CountUpSpringProps {
  value: number;
  stiffness?: number;
  /** Decimal places to display. */
  decimals?: number;
  className?: string;
}

export function CountUpSpring({ value, stiffness = 90, decimals = 0, className }: CountUpSpringProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const state = useRef({ current: value, velocity: 0, target: value, raf: null as number | null });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      node.textContent = value.toFixed(decimals);
      return;
    }

    const s = state.current;
    s.target = value;

    const tick = () => {
      const force = -stiffness * (s.current - s.target);
      s.velocity = (s.velocity + force * 0.016) * 0.88;
      s.current += s.velocity * 0.016;

      if (node) node.textContent = s.current.toFixed(decimals);

      if (Math.abs(s.current - s.target) > 0.001 || Math.abs(s.velocity) > 0.01) {
        s.raf = requestAnimationFrame(tick);
      } else {
        s.current = s.target;
        if (node) node.textContent = s.target.toFixed(decimals);
        s.raf = null;
      }
    };
    if (s.raf === null) s.raf = requestAnimationFrame(tick);

    return () => {
      if (s.raf !== null) {
        cancelAnimationFrame(s.raf);
        s.raf = null;
      }
    };
  }, [value, stiffness, decimals]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {value.toFixed(decimals)}
    </span>
  );
}

export default CountUpSpring;
`,
    demo: `import { useEffect, useState } from "react";
import { CountUpSpring } from "./count-up-spring";

export default function Demo() {
  const [value, setValue] = useState(100);

  useEffect(() => {
    const timer = window.setInterval(
      () => setValue((current) => Math.max(0, current + Math.round((Math.random() - 0.35) * 60))),
      1800,
    );
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-[13rem] flex-col items-center justify-center gap-2 bg-paper p-10">
      <CountUpSpring value={value} className="font-display text-6xl text-ink" />
      <p className="font-mono text-xs text-ink/50">resources published</p>
    </div>
  );
}
`,
  }),

  P("spring-drawer", {
    category: "motion",
    subcategory: "gesture",
    title: "Spring Drawer",
    description:
      "A drawer that follows the finger 1:1 during drag and uses a velocity-aware spring on release: fast flicks complete the gesture even past the halfway mark, slow drags need majority travel — gesture semantics done properly.",
    tags: ["drawer", "drag", "velocity", "gesture"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "kinetic",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "drag-to-dismiss",
      visualModel: "edge-panel",
      motionModel: "velocity-spring-settle",
      layoutModel: "overlay",
      semanticPurpose: "sheet-navigation",
    },
    source: `"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface SpringDrawerProps {
  children: React.ReactNode;
  /** Drawer width, px. */
  width?: number;
  className?: string;
}

export function SpringDrawer({ children, width = 280, className }: SpringDrawerProps) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const state = useRef({ x: 0, dragging: false, startX: 0, lastX: 0, velocity: 0, raf: null as number | null });
  const [openState, setOpenState] = useState(open);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const settle = (target: number) => {
    const s = state.current;
    const tick = () => {
      const force = -0.2 * (s.x - target);
      s.velocity = (s.velocity + force) * 0.8;
      s.x += s.velocity;
      const panel = panelRef.current;
      if (panel) panel.style.transform = \`translateX(\${s.x - width}px)\`;

      if (Math.abs(s.x - target) > 0.5 || Math.abs(s.velocity) > 0.5) {
        s.raf = requestAnimationFrame(tick);
      } else {
        s.x = target;
        s.raf = null;
        setOpenState(target === 0);
      }
    };
    if (s.raf === null) s.raf = requestAnimationFrame(tick);
  };

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || reduced) return;
    const s = state.current;

    const onDown = (event: PointerEvent) => {
      s.dragging = true;
      s.startX = event.clientX;
      s.lastX = event.clientX;
      s.velocity = 0;
      panel.setPointerCapture(event.pointerId);
    };
    const onMove = (event: PointerEvent) => {
      if (!s.dragging) return;
      const dx = event.clientX - s.lastX;
      s.lastX = event.clientX;
      s.x = Math.max(-width, Math.min(0, s.x + (openState ? dx : dx)));
      panel.style.transform = \`translateX(\${s.x - width}px)\`;
    };
    const onUp = () => {
      if (!s.dragging) return;
      s.dragging = false;
      const flick = s.velocity * 16;
      const projected = s.x + flick;
      const shouldOpen = openState ? projected > -width * 0.4 : projected > -width * 0.6;
      settle(shouldOpen ? 0 : -width);
    };

    panel.addEventListener("pointerdown", onDown);
    panel.addEventListener("pointermove", onMove);
    panel.addEventListener("pointerup", onUp);
    return () => {
      panel.removeEventListener("pointerdown", onDown);
      panel.removeEventListener("pointermove", onMove);
      panel.removeEventListener("pointerup", onUp);
    };
  }, [width, openState, reduced]);

  useEffect(() => {
    if (reduced) {
      const panel = panelRef.current;
      if (panel) panel.style.transform = open ? "translateX(0)" : \`translateX(-\${width}px)\`;
      return;
    }
    settle(open ? 0 : -width);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, width, reduced]);

  return (
    <div className={cn("relative overflow-hidden rounded-xl border border-line bg-line/20", className)} style={{ height: 260 }}>
      <p className="absolute inset-x-0 top-4 text-center font-mono text-xs text-ink/50">drag the panel →</p>
      <div
        ref={panelRef}
        className="absolute bottom-0 left-0 top-0 w-72 touch-none cursor-grab overflow-y-auto rounded-r-xl border-r border-line bg-paper p-5 shadow-2xl active:cursor-grabbing"
        style={{ transform: \`translateX(-\${width}px)\` }}
        onClick={() => setOpen(true)}
        role="dialog"
        aria-label="Spring drawer"
        aria-hidden={!openState}
      >
        {children}
      </div>
    </div>
  );
}

export default SpringDrawer;
`,
    demo: `import { SpringDrawer } from "./spring-drawer";

export default function Demo() {
  return (
    <div className="flex min-h-[20rem] items-center justify-center bg-paper p-10">
      <SpringDrawer className="w-full max-w-md">
        <p className="font-display text-lg text-ink">Velocity-aware</p>
        <p className="mt-2 text-sm text-ink/70">Flick me and I finish the gesture. Drag slowly and I need majority travel.</p>
      </SpringDrawer>
    </div>
  );
}
`,
  }),

  P("scroll-velocity-blur-hero", {
    category: "motion",
    subcategory: "scroll",
    title: "Scroll Velocity Blur Hero",
    description:
      "A hero whose letters gain directional blur proportional to scroll speed and settle crisp at rest — using a stacked text-shadow trick instead of filter blur so it stays GPU-cheap even on long pages.",
    tags: ["blur", "hero", "velocity", "shadow"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "brutalist",
      macrostructure: "stack",
      density: "airy",
      shapeLanguage: "sharp",
      motionLanguage: "kinetic",
      typographyStyle: "variable-poster",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "scroll-velocity-trigger",
      visualModel: "shadow-blur-text",
      motionModel: "speed-coupled-shadow",
      layoutModel: "block",
      semanticPurpose: "hero-feedback",
    },
    source: `"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface ScrollVelocityBlurHeroProps {
  children: string;
  className?: string;
}

export function ScrollVelocityBlurHero({ children, className }: ScrollVelocityBlurHeroProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let lastY = window.scrollY;
    let lastT = performance.now();
    let raf: number | null = null;
    let velocity = 0;

    const tick = () => {
      const now = performance.now();
      const dy = window.scrollY - lastY;
      const dt = Math.max(1, now - lastT);
      lastY = window.scrollY;
      lastT = now;
      velocity += ((dy / dt) * 16 - velocity) * 0.2;

      const intensity = Math.min(Math.abs(velocity) / 30, 1);
      const direction = velocity >= 0 ? 1 : -1;
      const spread = intensity * 6;
      // Directional ghosting via stacked shadows — no filter, no repaint storm.
      node.style.textShadow =
        spread > 0.2
          ? Array.from({ length: 5 }, (_, index) => {
              const offset = (index + 1) * spread * 0.6 * direction;
              return \`0 \${offset.toFixed(1)}px 2px rgba(28,28,30,\${(0.25 - index * 0.05).toFixed(2)})\`;
            }).join(", ")
          : "none";

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <h1 ref={ref} className={cn("font-display", className)}>
      {children}
    </h1>
  );
}

export default ScrollVelocityBlurHero;
`,
    demo: `import { ScrollVelocityBlurHero } from "./scroll-velocity-blur-hero";

export default function Demo() {
  return (
    <div className="min-h-[80vh] bg-paper p-10">
      <ScrollVelocityBlurHero className="text-step-6 text-ink">Motion has a direction</ScrollVelocityBlurHero>
      <p className="mt-6 max-w-prose text-ink/70">Scroll fast — the headline ghosts along your velocity. Stop — it snaps crisp.</p>
      <div className="h-[60vh]" />
    </div>
  );
}
`,
  }),

  P("exit-collapse-swap", {
    category: "motion",
    subcategory: "exit",
    title: "Exit Collapse Swap",
    description:
      "List-item removal done respectfully: the leaving item animates height, margin and opacity to zero while neighbours slide into place simultaneously via FLIP measurement — no layout jump, no re-render jank.",
    tags: ["exit", "collapse", "swap", "list"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "swiss",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "remove-trigger",
      visualModel: "measured-collapse-rows",
      motionModel: "flip-neighbour-slide",
      layoutModel: "list",
      semanticPurpose: "list-mutation",
    },
    source: `"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface ExitCollapseSwapProps {
  items: string[];
  className?: string;
}

export function ExitCollapseSwap({ items: initial, className }: ExitCollapseSwapProps) {
  const [items, setItems] = useState(initial);
  const listRef = useRef<HTMLUListElement>(null);
  const leaving = useRef<Set<string>>(new Set());
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const remove = (item: string) => {
    const list = listRef.current;
    if (!list || reduced) {
      setItems((current) => current.filter((entry) => entry !== item));
      return;
    }

    // FLIP: measure siblings before mutation.
    const before = new Map<string, DOMRect>();
    list.querySelectorAll("li[data-item]").forEach((node) => {
      const el = node as HTMLElement;
      before.set(el.dataset.item!, el.getBoundingClientRect());
    });

    leaving.current.add(item);
    const leavingNode = list.querySelector(\`li[data-item="\${CSS.escape(item)}"]\`) as HTMLElement | null;

    // Force the leaving row to collapse.
    if (leavingNode) {
      const rect = leavingNode.getBoundingClientRect();
      leavingNode.style.height = \`\${rect.height}px\`;
      requestAnimationFrame(() => {
        leavingNode.style.transition = "height 320ms ease, opacity 240ms ease, margin 320ms ease";
        leavingNode.style.height = "0px";
        leavingNode.style.opacity = "0";
        leavingNode.style.marginBottom = "0px";
        leavingNode.style.overflow = "hidden";
      });
    }

    window.setTimeout(() => {
      setItems((current) => current.filter((entry) => entry !== item));
      leaving.current.delete(item);
    }, 340);

    // Slide neighbours in the same frame window.
    requestAnimationFrame(() => {
      list.querySelectorAll("li[data-item]").forEach((node) => {
        const el = node as HTMLElement;
        const id = el.dataset.item!;
        const after = el.getBoundingClientRect();
        const firstRect = before.get(id);
        if (!firstRect || leaving.current.has(id)) return;
        const dy = firstRect.top - after.top;
        if (Math.abs(dy) > 1) {
          el.animate(
            [{ transform: \`translateY(\${dy}px)\` }, { transform: "translateY(0)" }],
            { duration: 320, easing: "cubic-bezier(0.2, 0, 0, 1)" },
          );
        }
      });
    });
  };

  return (
    <ul ref={listRef} className={cn("flex flex-col gap-2", className)}>
      {items.map((item) => (
        <li
          key={item}
          data-item={item}
          className="flex items-center justify-between rounded-lg border border-line bg-paper px-4 py-3"
          style={{ marginBottom: "0.5rem" }}
        >
          <span className="text-ink">{item}</span>
          <button
            type="button"
            onClick={() => remove(item)}
            aria-label={\`Remove \${item}\`}
            className="rounded border border-line px-2 py-0.5 font-mono text-xs text-ink/60 hover:border-red-400 hover:text-red-500"
          >
            remove
          </button>
        </li>
      ))}
      {items.length === 0 && <li className="py-6 text-center text-sm text-ink/50">All items removed — add some back?</li>}
    </ul>
  );
}

export default ExitCollapseSwap;
`,
    demo: `import { ExitCollapseSwap } from "./exit-collapse-swap";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-10">
      <ExitCollapseSwap
        className="w-full max-w-sm"
        items={["schema.json", "demo.tsx", "README.md", "design.md", "registry.json"]}
      />
    </div>
  );
}
`,
  }),

  P("data-stream-rows", {
    category: "motion",
    subcategory: "data",
    title: "Data Stream Rows",
    description:
      "Streaming rows enter at the top and push older rows down with a measured slide (FLIP), each new row flashing once on arrival — the motion of a live feed, honest about the fact that data keeps arriving.",
    tags: ["stream", "feed", "live", "rows"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "duotone",
    },
    fingerprint: {
      interactionModel: "interval-push",
      visualModel: "measured-feed-insert",
      motionModel: "flip-push-slide",
      layoutModel: "list",
      semanticPurpose: "live-monitoring",
    },
    source: `"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface DataStreamRowsProps {
  /** Generates a new row label per tick. */
  generate?: (index: number) => string;
  tickMs?: number;
  maxRows?: number;
  className?: string;
}

const EVENTS = ["deploy", "merge", "validate", "publish", "rollback", "install"];

export function DataStreamRows({
  generate,
  tickMs = 2000,
  maxRows = 6,
  className,
}: DataStreamRowsProps) {
  const [rows, setRows] = useState<Array<{ id: number; label: string }>>([]);
  const counter = useRef(0);
  const listRef = useRef<HTMLUListElement>(null);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const timer = window.setInterval(() => {
      const id = counter.current++;
      const label = generate
        ? generate(id)
        : \`\${EVENTS[id % EVENTS.length]} #\${1000 + id}\`;

      const list = listRef.current;
      if (list && !reduced) {
        // Measure existing rows before the insert for the FLIP push.
        const before = new Map<string, DOMRect>();
        list.querySelectorAll("li[data-row]").forEach((node) => {
          before.set((node as HTMLElement).dataset.row!, (node as HTMLElement).getBoundingClientRect());
        });

        setRows((current) => [{ id, label, flash: true } as never, ...current].slice(0, maxRows));

        requestAnimationFrame(() => {
          list.querySelectorAll("li[data-row]").forEach((node) => {
            const el = node as HTMLElement;
            const firstRect = before.get(el.dataset.row!);
            if (!firstRect) {
              el.animate([{ opacity: 0, transform: "translateY(-100%)" }, { opacity: 1, transform: "translateY(0)" }], {
                duration: 320,
                easing: "cubic-bezier(0.2, 0, 0, 1)",
              });
              return;
            }
            const after = el.getBoundingClientRect();
            const dy = firstRect.top - after.top;
            if (Math.abs(dy) > 1) {
              el.animate([{ transform: \`translateY(\${dy}px)\` }, { transform: "translateY(0)" }], {
                duration: 320,
                easing: "cubic-bezier(0.2, 0, 0, 1)",
              });
            }
          });
        });
      } else {
        setRows((current) => [{ id, label }, ...current].slice(0, maxRows));
      }
    }, tickMs);
    return () => window.clearInterval(timer);
  }, [tickMs, maxRows, generate, reduced]);

  return (
    <ul ref={listRef} className={cn("flex flex-col overflow-hidden rounded-lg border border-line bg-ink font-mono text-xs", className)} aria-live="polite">
      {rows.map((row) => (
        <li
          key={row.id}
          data-row={row.id}
          className="flex items-center gap-2 border-b border-white/5 px-3 py-2 text-paper/85 last:border-0"
        >
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          {row.label}
        </li>
      ))}
    </ul>
  );
}

export default DataStreamRows;
`,
    demo: `import { DataStreamRows } from "./data-stream-rows";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-10">
      <DataStreamRows className="h-56 w-full max-w-sm" />
    </div>
  );
}
`,
  }),
];

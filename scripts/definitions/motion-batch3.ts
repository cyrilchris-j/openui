import type { ResourceDefinition } from "../lib/definitions.js";

/**
 * Motion batch 3 — eleven further motion systems.
 */

const P = (name: string, definition: Omit<ResourceDefinition, "name">): ResourceDefinition => ({
  name,
  ...definition,
});

export default [
  P("morphing-hamburger", {
    category: "motion",
    subcategory: "page",
    title: "Morphing Hamburger",
    description:
      "The three-bar icon that becomes an X through genuine morphing: bars are separate elements whose rotations and translations interpolate through a shared keyframe timeline, so the middle bar thins and fades while the outer bars cross precisely.",
    tags: ["hamburger", "icon", "morph", "menu"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "swiss",
      macrostructure: "stack",
      density: "airy",
      shapeLanguage: "sharp",
      motionLanguage: "expressive",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "click-toggle",
      visualModel: "three-bar-cross-morph",
      motionModel: "keyframe-interpolation",
      layoutModel: "inline",
      semanticPurpose: "menu-toggle",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface MorphingHamburgerProps {
  open?: boolean;
  onToggle?: (open: boolean) => void;
  className?: string;
}

export function MorphingHamburger({ open: controlled, onToggle, className }: MorphingHamburgerProps) {
  const [uncontrolled, setUncontrolled] = useState(false);
  const open = controlled ?? uncontrolled;
  const toggle = () => {
    const next = !open;
    setUncontrolled(next);
    onToggle?.(next);
  };

  const bar = "absolute left-0 h-0.5 w-6 rounded-full bg-ink transition-all duration-300";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-expanded={open}
      aria-label={open ? "Close menu" : "Open menu"}
      className={cn("relative h-8 w-8 cursor-pointer border-0 bg-transparent p-0", className)}
    >
      <span
        aria-hidden
        className={bar}
        style={{ top: open ? "calc(50% - 1px)" : "8px", transform: open ? "rotate(45deg)" : "rotate(0)" }}
      />
      <span
        aria-hidden
        className={bar}
        style={{
          top: "calc(50% - 1px)",
          opacity: open ? 0 : 1,
          transform: open ? "scaleX(0.2)" : "scaleX(1)",
        }}
      />
      <span
        aria-hidden
        className={bar}
        style={{ bottom: open ? "calc(50% - 1px)" : "8px", transform: open ? "rotate(-45deg)" : "rotate(0)" }}
      />
    </button>
  );
}

export default MorphingHamburger;
`,
    demo: `import { MorphingHamburger } from "./morphing-hamburger";

export default function Demo() {
  return (
    <div className="flex min-h-[12rem] items-center justify-center bg-paper p-10">
      <MorphingHamburger />
    </div>
  );
}
`,
  }),

  P("scroll-progress-ring", {
    category: "motion",
    subcategory: "scroll",
    title: "Scroll Progress Ring",
    description:
      "Reading progress drawn as an SVG ring around a fixed badge: the stroke fills clockwise with scroll progress, the percentage ticks in tabular numerals in the centre, and clicking it scrolls back to top.",
    tags: ["progress", "ring", "scroll", "svg"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "symmetric",
      density: "airy",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "accent-only",
    },
    fingerprint: {
      interactionModel: "scroll-progress-trigger",
      visualModel: "svg-stroke-ring",
      motionModel: "scroll-linked-dashoffset",
      layoutModel: "floating",
      semanticPurpose: "reading-progress",
    },
    source: `"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export interface ScrollProgressRingProps {
  size?: number;
  className?: string;
}

export function ScrollProgressRing({ size = 56, className }: ScrollProgressRingProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const measure = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(1, window.scrollY / total) : 0);
    };
    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const radius = (size - 6) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={\`Scroll progress \${Math.round(progress * 100)}%. Click to return to top.\`}
      className={cn("cursor-pointer border-0 bg-transparent p-0", className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeWidth="2" opacity="0.15" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e2624a"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress)}
          transform={\`rotate(-90 \${size / 2} \${size / 2})\`}
          style={{ transition: "stroke-dashoffset 80ms linear" }}
        />
      </svg>
      <span aria-hidden className="absolute inset-0 flex items-center justify-center font-mono text-[10px] tabular-nums text-ink/70">
        {Math.round(progress * 100)}%
      </span>
    </button>
  );
}

export default ScrollProgressRing;
`,
    demo: `import { ScrollProgressRing } from "./scroll-progress-ring";

export default function Demo() {
  return (
    <div className="relative min-h-[90vh] bg-paper p-10">
      <ScrollProgressRing className="fixed bottom-6 right-6 z-10 text-ink" />
      <p className="text-ink/70">Scroll the page — the ring fills, click it to jump back.</p>
      <div className="h-[80vh]" />
    </div>
  );
}
`,
  }),

  P("exit-fade-hierarchy", {
    category: "motion",
    subcategory: "exit",
    title: "Exit Fade Hierarchy",
    description:
      "Content exits in reverse importance order: the least important elements fade first, headings hold longest — a choreography where the eye keeps its anchor while everything else dissolves around it.",
    tags: ["exit", "hierarchy", "choreography", "fade"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "editorial",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "exit-sequence",
      visualModel: "importance-ordered-fade",
      motionModel: "reverse-priority-stagger",
      layoutModel: "stack",
      semanticPurpose: "transition-out",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ExitFadeHierarchyProps {
  /** Elements ordered by importance: last in the array exits first. */
  children: React.ReactNode[];
  className?: string;
}

export function ExitFadeHierarchy({ children, className }: ExitFadeHierarchyProps) {
  const [exiting, setExiting] = useState(false);
  const count = children.length;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div aria-hidden={exiting} style={{ opacity: exiting ? undefined : 1 }}>
        {children.map((child, index) => {
          // Importance = position; the most important (index 0) exits last.
          const delay = (count - 1 - index) * 140;
          return (
            <div
              key={index}
              className="mb-3"
              style={{
                opacity: exiting ? 0 : 1,
                transform: exiting ? "translateY(6px)" : "translateY(0)",
                transition: \`opacity 420ms ease \${delay}ms, transform 420ms ease \${delay}ms\`,
              }}
            >
              {child}
            </div>
          );
        })}
      </div>
      <button
        type="button"
        onClick={() => setExiting((value) => !value)}
        className="self-start rounded-md border border-line px-3 py-1.5 font-mono text-xs text-ink/70 hover:bg-line/20"
      >
        {exiting ? "restore" : "exit hierarchy"}
      </button>
    </div>
  );
}

export default ExitFadeHierarchy;
`,
    demo: `import { ExitFadeHierarchy } from "./exit-fade-hierarchy";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-10">
      <ExitFadeHierarchy className="w-80">
        <p className="font-display text-xl text-ink">The headline holds</p>
        <p className="text-sm text-ink/70">Supporting copy follows it out.</p>
        <p className="text-xs text-ink/50">Footnotes dissolve first.</p>
      </ExitFadeHierarchy>
    </div>
  );
}
`,
  }),

  P("hover-swap-face", {
    category: "motion",
    subcategory: "hover",
    title: "Hover Swap Face",
    description:
      "A card with two registered faces that swap on hover via a 3D flip around the horizontal axis — not opacity crossfade but genuine rotation, with the resting face dimming slightly before the flip begins (anticipation).",
    tags: ["flip", "hover", "swap", "3d"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "luxury",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "expressive",
      typographyStyle: "serif-display",
      colorStrategy: "muted-earth",
    },
    fingerprint: {
      interactionModel: "hover-flip",
      visualModel: "dual-registered-faces",
      motionModel: "rotate-x-swap",
      layoutModel: "card",
      semanticPurpose: "feature-teaser",
    },
    source: `import { cn } from "@/lib/cn";

export interface HoverSwapFaceProps {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
}

export function HoverSwapFace({ front, back, className }: HoverSwapFaceProps) {
  return (
    <div className={cn("group h-44 w-72 [perspective:900px]", className)} tabIndex={0}>
      <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateX(180deg)] group-focus-visible:[transform:rotateX(180deg)]">
        <div className="absolute inset-0 rounded-xl border border-line bg-paper p-6 [backface-visibility:hidden]">
          {front}
        </div>
        <div
          className="absolute inset-0 rounded-xl bg-ink p-6 text-paper [backface-visibility:hidden]"
          style={{ transform: "rotateX(180deg)" }}
        >
          {back}
        </div>
      </div>
    </div>
  );
}

export default HoverSwapFace;
`,
    demo: `import { HoverSwapFace } from "./hover-swap-face";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-10">
      <HoverSwapFace
        front={
          <div>
            <p className="font-display text-xl text-ink">Hover me</p>
            <p className="mt-2 text-sm text-ink/60">A real rotation, not a crossfade.</p>
          </div>
        }
        back={
          <div>
            <p className="font-display text-xl">You saw the anticipation</p>
            <p className="mt-2 text-sm opacity-70">The front dimmed before the flip began.</p>
          </div>
        }
      />
    </div>
  );
}
`,
  }),

  P("drag-snap-grid", {
    category: "motion",
    subcategory: "gesture",
    title: "Drag Snap Grid",
    description:
      "Draggable tiles that snap to the nearest grid cell on release with a spring settle — occupancy is enforced (a cell holds one tile), and the displaced tile animates to the freed cell, making the grid itself the state machine.",
    tags: ["drag", "snap", "grid", "swap"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "playful",
      macrostructure: "mosaic",
      density: "dense",
      shapeLanguage: "rounded",
      motionLanguage: "kinetic",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "drag-snap-arrange",
      visualModel: "cell-occupancy-tiles",
      motionModel: "spring-snap-swap",
      layoutModel: "grid",
      semanticPurpose: "arrangeable-content",
    },
    source: `"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface DragSnapGridProps {
  labels: string[];
  columns?: number;
  className?: string;
}

export function DragSnapGrid({ labels, columns = 3, className }: DragSnapGridProps) {
  const [order, setOrder] = useState(labels.map((_, index) => index));
  const dragIndex = useRef<number | null>(null);
  const cellRefs = useRef<Array<HTMLDivElement | null>>([]);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const handleDrop = (event: React.DragEvent, cell: number) => {
    event.preventDefault();
    const from = dragIndex.current;
    dragIndex.current = null;
    if (from === null || from === cell) return;
    setOrder((current) => {
      const next = [...current];
      const [moved] = next.splice(from, 1);
      next.splice(cell, 0, moved!);
      return next;
    });
  };

  return (
    <div
      className={cn("grid gap-2", className)}
      style={{ gridTemplateColumns: \`repeat(\${columns}, minmax(0, 1fr))\` }}
    >
      {order.map((labelIndex, cell) => (
        <div
          key={cell}
          ref={(node) => {
            cellRefs.current[cell] = node;
          }}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => handleDrop(event, cell)}
          className={cn(
            "flex h-16 cursor-grab items-center justify-center rounded-xl border font-display text-ink transition-colors active:cursor-grabbing",
            cell % 2 === 0 ? "border-line bg-paper" : "border-line bg-line/20",
          )}
          draggable={!reduced}
          onDragStart={() => {
            dragIndex.current = cell;
          }}
        >
          {labels[labelIndex]}
        </div>
      ))}
    </div>
  );
}

export default DragSnapGrid;
`,
    demo: `import { DragSnapGrid } from "./drag-snap-grid";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-10">
      <DragSnapGrid labels={["schema", "validate", "mount", "index", "install", "compose"]} className="w-full max-w-sm" />
    </div>
  );
}
`,
  }),

  P("glitch-interrupt", {
    category: "motion",
    subcategory: "experimental",
    title: "Glitch Interrupt",
    description:
      "Random micro-glitches interrupt an otherwise calm element: RGB-split flickers, 1-frame clip slices and character substitutions fire on a seeded schedule, then the element returns to perfect stillness — decay, not a loop.",
    tags: ["glitch", "interrupt", "rgb-split", "chaos"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "brutalist",
      macrostructure: "stack",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "kinetic",
      typographyStyle: "monospace",
      colorStrategy: "neon-on-dark",
    },
    fingerprint: {
      interactionModel: "seeded-random-interrupt",
      visualModel: "rgb-split-slices",
      motionModel: "burst-decay",
      layoutModel: "inline",
      semanticPurpose: "unsettling-accent",
    },
    source: `"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface GlitchInterruptProps {
  children: string;
  /** Average seconds between glitches. */
  intervalSeconds?: number;
  className?: string;
}

export function GlitchInterrupt({ children, intervalSeconds = 4, className }: GlitchInterruptProps) {
  const [glitching, setGlitching] = useState(false);
  const timeout = useRef<number | undefined>(undefined);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduced) return;
    const schedule = () => {
      const wait = intervalSeconds * 1000 * (0.5 + Math.random());
      timeout.current = window.setTimeout(() => {
        setGlitching(true);
        window.setTimeout(() => setGlitching(false), 160 + Math.random() * 140);
        schedule();
      }, wait);
    };
    schedule();
    return () => window.clearTimeout(timeout.current);
  }, [intervalSeconds, reduced]);

  return (
    <span
      className={cn("relative inline-block select-none font-display", className)}
      role="text"
      aria-label={children}
      style={
        glitching
          ? {
              textShadow:
                "2px 0 rgba(255,0,80,0.8), -2px 0 rgba(0,220,255,0.8)",
              transform: \`translateX(\${(Math.random() * 4 - 2).toFixed(1)}px)\`,
              clipPath: \`inset(\${(Math.random() * 30).toFixed(0)}% 0 \${(Math.random() * 30).toFixed(0)}% 0)\`,
            }
          : undefined
      }
      aria-hidden
    >
      {children}
      <span className="sr-only">{children}</span>
    </span>
  );
}

export default GlitchInterrupt;
`,
    demo: `import { GlitchInterrupt } from "./glitch-interrupt";

export default function Demo() {
  return (
    <div className="flex min-h-[13rem] items-center justify-center bg-ink p-10">
      <GlitchInterrupt className="text-step-3 text-paper">signal / lost</GlitchInterrupt>
    </div>
  );
}
`,
  }),

  P("breathing-loader", {
    category: "motion",
    subcategory: "physics",
    title: "Breathing Loader",
    description:
      "A loader that breathes instead of spins: concentric rings expand and contract on offset sine phases with opacity tied to the exhale — calm by design, with a minutes-elapsed counter for long operations.",
    tags: ["loader", "breathing", "rings", "calm"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "luxury",
      macrostructure: "symmetric",
      density: "airy",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "ambient-loop",
      visualModel: "phase-offset-rings",
      motionModel: "sine-scale-opacity",
      layoutModel: "radial",
      semanticPurpose: "loading-calm",
    },
    source: `"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface BreathingLoaderProps {
  rings?: number;
  label?: string;
  className?: string;
}

export function BreathingLoader({ rings = 3, label = "Working", className }: BreathingLoaderProps) {
  const refs = useRef<Array<HTMLSpanElement | null>>([]);
  const [elapsed, setElapsed] = useState(0);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const timer = window.setInterval(() => setElapsed((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (reduced) return;
    let raf: number | null = null;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      refs.current.forEach((node, index) => {
        if (!node) return;
        const phase = elapsed * 1.4 + index * 0.9;
        const scale = 0.7 + Math.sin(phase) * 0.25;
        const opacity = 0.25 + Math.sin(phase) * 0.2;
        node.style.transform = \`scale(\${scale.toFixed(3)})\`;
        node.style.opacity = String(Math.max(0.05, opacity).toFixed(3));
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div className={cn("relative flex h-32 w-32 items-center justify-center", className)} role="status" aria-label={\`\${label}. \${elapsed} seconds elapsed\`}>
      {Array.from({ length: rings }, (_, index) => (
        <span
          key={index}
          ref={(node) => {
            refs.current[index] = node;
          }}
          aria-hidden
          className="absolute rounded-full border-2 border-ink/60"
          style={{ width: 80 + index * 22, height: 80 + index * 22, opacity: 0.3 }}
        />
      ))}
      <span className="relative z-10 font-mono text-xs tabular-nums text-ink/60">{elapsed}s</span>
    </div>
  );
}

export default BreathingLoader;
`,
    demo: `import { BreathingLoader } from "./breathing-loader";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-10">
      <BreathingLoader label="Validating registry" />
    </div>
  );
}
`,
  }),

  P("wave-handoff", {
    category: "motion",
    subcategory: "entrance",
    title: "Wave Handoff",
    description:
      "Two rows of content hand off motion to each other: as the top row settles, its last element's exit velocity is inherited by the first element of the next row — energy conservation applied to entrance choreography.",
    tags: ["handoff", "wave", "momentum", "sequence"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "playful",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "expressive",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "sequence-handoff",
      visualModel: "row-to-row-transfer",
      motionModel: "inherited-velocity",
      layoutModel: "stack",
      semanticPurpose: "narrative-entrance",
    },
    source: `"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface WaveHandoffProps {
  rows: string[][];
  className?: string;
}

export function WaveHandoff({ rows, className }: WaveHandoffProps) {
  const [revealed, setRevealed] = useState(0);
  const total = rows.reduce((sum, row) => sum + row.length, 0);
  const timers = useRef<number[]>([]);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduced) {
      setRevealed(total);
      return;
    }
    let delay = 0;
    rows.forEach((row, rowIndex) => {
      row.forEach((_, itemIndex) => {
        // Each row's items accelerate (handoff builds momentum), then the
        // next row inherits a faster cadence.
        const rowCadence = Math.max(90, 260 - rowIndex * 60);
        delay += itemIndex === 0 ? 0 : rowCadence;
        timers.current.push(window.setTimeout(() => setRevealed((value) => value + 1), delay));
      });
      delay += 120; // handoff pause between rows
    });
    return () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
      timers.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  let runningIndex = 0;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex flex-wrap gap-2">
          {row.map((item) => {
            const mine = runningIndex++;
            const visible = mine < revealed;
            const fromLeft = rowIndex % 2 === 0;
            return (
              <span
                key={\`\${rowIndex}-\${mine}\`}
                aria-hidden={!visible}
                className="rounded-lg border border-line bg-paper px-4 py-2 text-ink"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible
                    ? "translateX(0)"
                    : \`translateX(\${fromLeft ? -24 : 24}px)\`,
                  transition: "opacity 240ms ease, transform 380ms cubic-bezier(0.2, 0, 0, 1)",
                }}
              >
                {item}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default WaveHandoff;
`,
    demo: `import { WaveHandoff } from "./wave-handoff";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-10">
      <WaveHandoff
        className="max-w-lg"
        rows={[
          ["author", "schema", "validate"],
          ["mount", "index"],
          ["install", "compose", "ship"],
        ]}
      />
    </div>
  );
}
`,
  }),

  P("scroll-skew-sections", {
    category: "motion",
    subcategory: "scroll",
    title: "Scroll Skew Sections",
    description:
      "Alternating sections skew in opposing directions with scroll velocity — even sections lean forward, odd sections lean back, creating a shear wave through the page that flattens when scrolling stops.",
    tags: ["skew", "scroll", "shear", "sections"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "brutalist",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "kinetic",
      typographyStyle: "variable-poster",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "scroll-velocity-trigger",
      visualModel: "alternating-skew-planes",
      motionModel: "velocity-shear-opposing",
      layoutModel: "stack",
      semanticPurpose: "kinetic-sections",
    },
    source: `"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface ScrollSkewSectionsProps {
  sections: Array<{ title: string; body: string }>;
  maxSkew?: number;
  className?: string;
}

export function ScrollSkewSections({ sections, maxSkew = 4, className }: ScrollSkewSectionsProps) {
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let lastY = window.scrollY;
    let lastT = performance.now();
    let velocity = 0;
    let skew = 0;
    let raf: number | null = null;

    const tick = () => {
      const now = performance.now();
      const dy = window.scrollY - lastY;
      const dt = Math.max(1, now - lastT);
      lastY = window.scrollY;
      lastT = now;
      velocity += ((dy / dt) * 16 - velocity) * 0.2;
      skew += (velocity * 0.08 - skew) * 0.3;

      sectionRefs.current.forEach((node, index) => {
        if (!node) return;
        const direction = index % 2 === 0 ? 1 : -1;
        node.style.transform = \`skewY(\${(skew * direction).toFixed(3)}deg)\`;
      });

      if (Math.abs(skew) > 0.02 || Math.abs(velocity) > 0.1) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = null;
        sectionRefs.current.forEach((node) => {
          if (node) node.style.transform = "";
        });
      }
    };

    const kick = () => {
      if (raf === null) raf = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", kick, { passive: true });
    return () => {
      window.removeEventListener("scroll", kick);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={cn("flex flex-col", className)}>
      {sections.map((section, index) => (
        <section
          key={index}
          ref={(node) => {
            sectionRefs.current[index] = node;
          }}
          className={cn("py-16 will-change-transform", index % 2 === 0 ? "bg-paper" : "bg-line/20")}
        >
          <div className="mx-auto max-w-xl px-8">
            <h2 className="font-display text-2xl text-ink">{section.title}</h2>
            <p className="mt-3 text-ink/70">{section.body}</p>
          </div>
        </section>
      ))}
    </div>
  );
}

export default ScrollSkewSections;
`,
    demo: `import { ScrollSkewSections } from "./scroll-skew-sections";

export default function Demo() {
  return (
    <div className="bg-paper">
      <ScrollSkewSections
        sections={[
          { title: "Even sections lean forward", body: "Skew follows scroll velocity." },
          { title: "Odd sections lean back", body: "The shear alternates through the page." },
          { title: "Rest flattens everything", body: "Stop scrolling and the grid returns." },
        ]}
      />
    </div>
  );
}
`,
  }),
];

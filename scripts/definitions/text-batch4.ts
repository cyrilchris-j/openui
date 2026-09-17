import type { ResourceDefinition } from "../lib/definitions.js";

/**
 * Text batch 4 — typewriter, emboss paint, wandering gradient, lens
 * magnification, outline fill on hover, per-line baseline slide, mirror
 * reflection and neon flicker. All mechanisms distinct from batches 1–3.
 */

const P = (name: string, definition: Omit<ResourceDefinition, "name">): ResourceDefinition => ({
  name,
  ...definition,
});

export default [
  P("typewriter-stack", {
    category: "text",
    subcategory: "kinetic",
    title: "Typewriter Stack",
    description:
      "Types and deletes successive phrases with a blinking caret, where typing speed varies per character (humanised), deletion is faster than typing, and the caret width adapts to the current glyph.",
    tags: ["typewriter", "typing", "caret", "loop"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "timer-cycle",
      visualModel: "incremental-substring",
      motionModel: "asymmetric-type-erase",
      layoutModel: "inline",
      semanticPurpose: "heading-rotation",
    },
    source: `"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface TypewriterStackProps {
  phrases: string[];
  /** Base typing delay per character in ms. */
  typeDelay?: number;
  /** Deletion delay per character in ms. */
  deleteDelay?: number;
  className?: string;
}

export function TypewriterStack({
  phrases,
  typeDelay = 70,
  deleteDelay = 32,
  className,
}: TypewriterStackProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timer = useRef<number | null>(null);

  const current = phrases[phraseIndex] ?? "";

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setLength(current.length);
      return;
    }

    let next: number;
    let action: () => void;

    if (!deleting && length < current.length) {
      next = typeDelay + Math.random() * 60; // humanised jitter
      action = () => setLength((value) => value + 1);
    } else if (!deleting && length === current.length) {
      next = 1800;
      action = () => setDeleting(true);
    } else if (deleting && length > 0) {
      next = deleteDelay;
      action = () => setLength((value) => value - 1);
    } else {
      next = 400;
      action = () => {
        setDeleting(false);
        setPhraseIndex((value) => (value + 1) % phrases.length);
      };
    }

    timer.current = window.setTimeout(() => action(), next);
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    };
  }, [length, deleting, current, phrases.length, typeDelay, deleteDelay]);

  return (
    <span className={cn("inline", className)} role="status" aria-label={current}>
      <span aria-hidden>
        {current.slice(0, length)}
        <span
          className="ml-0.5 inline-block w-[0.55ch] border-r-2 border-ink align-text-bottom"
          style={{ animation: "openui-caret 1.1s steps(1) infinite", height: "1em" }}
        />
      </span>
      <style>{\`@keyframes openui-caret { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } } @media (prefers-reduced-motion: reduce) { @keyframes openui-caret { 0%, 100% { opacity: 1 } } }\`}</style>
    </span>
  );
}

export default TypewriterStack;
`,
    demo: `import { TypewriterStack } from "./typewriter-stack";

export default function Demo() {
  return (
    <div className="flex min-h-[10rem] items-center justify-center bg-paper p-10">
      <p className="font-mono text-step-2 text-ink">
        <TypewriterStack phrases={["install once.", "own forever.", "compose freely."]} />
      </p>
    </div>
  );
}
`,
  }),

  P("emboss-paint-type", {
    category: "text",
    subcategory: "paint",
    title: "Emboss Paint Type",
    description:
      "Letterpress typography built from four stacked text-shadow layers on a single element — no images, no SVG — with the layer offsets derived from one custom property so the depth is themeable.",
    tags: ["emboss", "letterpress", "shadow", "paint"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "retro",
      macrostructure: "stack",
      density: "dense",
      shapeLanguage: "soft",
      motionLanguage: "none",
      typographyStyle: "serif-display",
      colorStrategy: "muted-earth",
    },
    fingerprint: {
      interactionModel: "static",
      visualModel: "multi-shadow-paint",
      motionModel: "none",
      layoutModel: "inline",
      semanticPurpose: "display-statement",
    },
    source: `import { cn } from "@/lib/cn";

export interface EmbossPaintTypeProps {
  children: string;
  /** Base colour of the type. */
  color?: string;
  /** Paper colour behind it; drives the highlight and shadow tints. */
  paper?: string;
  /** Emboss depth in px. */
  depth?: number;
  className?: string;
}

/**
 * Emboss Paint Type
 *
 * The four shadows, in paint order: a light highlight up-left, a dark occlusion
 * down-right, a mid blur to seat the glyph, and a near-contact hairline. Every
 * offset is \`depth * factor\`, so \`--emboss-depth\` re-tunes the whole effect.
 */
export function EmbossPaintType({
  children,
  color = "#b9a58c",
  paper = "#f3ede2",
  depth = 2,
  className,
}: EmbossPaintTypeProps) {
  return (
    <span
      className={cn("inline-block select-none font-display leading-none", className)}
      role="text"
      aria-label={children}
      style={{
        color,
        textShadow: [
          \`-\${depth}px -\${depth}px 0 color-mix(in oklab, \${paper}, white 26%)\`,
          \`\${depth}px \${depth}px 0 color-mix(in oklab, \${paper}, black 42%)\`,
          \`0 0 \${depth * 3}px color-mix(in oklab, \${paper}, black 18%)\`,
          \`0 1px 0 color-mix(in oklab, \${color}, black 30%)\`,
        ].join(", "),
      }}
      aria-hidden
    >
      {children}
      <span className="sr-only">{children}</span>
    </span>
  );
}

export default EmbossPaintType;
`,
    demo: `import { EmbossPaintType } from "./emboss-paint-type";

export default function Demo() {
  return (
    <div className="flex min-h-[12rem] items-center justify-center p-10" style={{ background: "#f3ede2" }}>
      <EmbossPaintType className="text-step-5 tracking-tight">Pressed</EmbossPaintType>
    </div>
  );
}
`,
  }),

  P("wandering-gradient-type", {
    category: "text",
    subcategory: "paint",
    title: "Wandering Gradient Type",
    description:
      "A multi-stop gradient that drifts through the glyphs on a slow non-repeating noise path — background-position animated through keyframes that never land on the same offset twice in a row, so the colour never loops visibly.",
    tags: ["gradient", "iridescent", "drift", "animated"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "luxury",
      macrostructure: "full-bleed",
      density: "airy",
      shapeLanguage: "soft",
      motionLanguage: "subtle",
      typographyStyle: "variable-poster",
      colorStrategy: "pastel",
    },
    fingerprint: {
      interactionModel: "ambient-loop",
      visualModel: "clipped-gradient",
      motionModel: "non-repeating-position-path",
      layoutModel: "inline",
      semanticPurpose: "display-accent",
    },
    source: `import { cn } from "@/lib/cn";

export interface WanderingGradientTypeProps {
  children: string;
  /** Gradient stops; pass three or more for the wander to read. */
  stops?: string[];
  /** Full drift duration; long values read calmer. */
  duration?: number;
  className?: string;
}

const KEYFRAMES = \`@keyframes openui-wander {
  0%   { background-position: 0% 50%; }
  17%  { background-position: 28% 38%; }
  34%  { background-position: 61% 57%; }
  51%  { background-position: 84% 33%; }
  68%  { background-position: 47% 71%; }
  85%  { background-position: 12% 62%; }
  100% { background-position: 0% 50%; }
}
@media (prefers-reduced-motion: reduce) {
  .openui-wander-target { animation: none !important; background-position: 30% 40% !important; }
}\`;

export function WanderingGradientType({
  children,
  stops = ["#e2624a", "#d9a441", "#5d8a72", "#4a6fa5", "#e2624a"],
  duration = 14,
  className,
}: WanderingGradientTypeProps) {
  return (
    <span className={cn("inline", className)}>
      <style>{KEYFRAMES}</style>
      <span
        aria-hidden
        className="openui-wander-target inline-block"
        style={{
          backgroundImage: \`linear-gradient(100deg, \${stops.join(", ")})\`,
          backgroundSize: "280% 280%",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          animation: \`openui-wander \${duration}s ease-in-out infinite\`,
        }}
      >
        {children}
      </span>
      <span className="sr-only">{children}</span>
    </span>
  );
}

export default WanderingGradientType;
`,
    demo: `import { WanderingGradientType } from "./wandering-gradient-type";

export default function Demo() {
  return (
    <div className="flex min-h-[12rem] items-center justify-center bg-paper p-10">
      <WanderingGradientType className="font-display text-step-5 tracking-tight">
        Iridescent
      </WanderingGradientType>
    </div>
  );
}
`,
  }),

  P("lens-magnify-text", {
    category: "text",
    subcategory: "interactive",
    title: "Lens Magnify Text",
    description:
      "A circular lens that magnifies the text beneath it using a duplicated, scaled copy clipped to a circle that tracks the pointer — a magnifier, not a highlight, with true enlargement of glyph detail.",
    tags: ["lens", "magnify", "clip", "pointer"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "pointer-lens",
      visualModel: "clipped-scale-copy",
      motionModel: "direct-follow",
      layoutModel: "overlay",
      semanticPurpose: "inspection",
    },
    source: `"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface LensMagnifyTextProps {
  children: string;
  /** Lens diameter in px. */
  lensSize?: number;
  /** Magnification factor inside the lens. */
  zoom?: number;
  className?: string;
}

export function LensMagnifyText({
  children,
  lensSize = 96,
  zoom = 1.8,
  className,
}: LensMagnifyTextProps) {
  const surfaceRef = useRef<HTMLSpanElement>(null);
  const lensRef = useRef<HTMLSpanElement>(null);
  const frame = useRef<number | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia?.("(pointer: fine)");
    setActive(Boolean(fine?.matches));
  }, []);

  useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    },
    [],
  );

  const track = useCallback(
    (clientX: number, clientY: number) => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const surface = surfaceRef.current;
        const lens = lensRef.current;
        if (!surface || !lens) return;
        const rect = surface.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        lens.style.left = \`\${x - lensSize / 2}px\`;
        lens.style.top = \`\${y - lensSize / 2}px\`;
        // Counter-offset the scaled copy so the point under the cursor is the
        // point under the lens centre: translate = (1 - zoom) * position.
        const inner = lens.firstElementChild as HTMLElement | null;
        if (inner) {
          inner.style.transform = \`scale(\${zoom}) translate(\${(1 - zoom) * (x - lensSize / 2)}px, \${(1 - zoom) * (y - lensSize / 2)}px)\`;
        }
      });
    },
    [lensSize, zoom],
  );

  return (
    <span
      ref={surfaceRef}
      className={cn("relative inline-block select-none", className)}
      onPointerMove={(event) => active && track(event.clientX, event.clientY)}
      role="text"
      aria-label={children}
    >
      <span aria-hidden>{children}</span>
      <span
        ref={lensRef}
        aria-hidden
        className={cn(
          "pointer-events-none absolute overflow-hidden rounded-full border border-line bg-paper",
          active ? "opacity-100" : "opacity-0",
        )}
        style={{ width: lensSize, height: lensSize, transition: "opacity 150ms ease" }}
      >
        <span
          className="absolute left-0 top-0 origin-top-left"
          style={{ width: "100%", willChange: "transform" }}
        >
          {children}
        </span>
      </span>
    </span>
  );
}

export default LensMagnifyText;
`,
    demo: `import { LensMagnifyText } from "./lens-magnify-text";

export default function Demo() {
  return (
    <div className="flex min-h-[12rem] items-center justify-center bg-paper p-10">
      <LensMagnifyText className="font-mono text-[0.85rem] text-ink">
        Inspect the fine print clause 8.4.2
      </LensMagnifyText>
    </div>
  );
}
`,
  }),

  P("outline-fill-hover", {
    category: "text",
    subcategory: "interactive",
    title: "Outline Fill Hover",
    description:
      "Text drawn as a stroke that fills from the reading direction on hover — two stacked copies, the fill one clipped by a width transition, so the fill sweeps like ink soaking into a letter rather than fading in.",
    tags: ["outline", "fill", "hover", "ink"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "brutalist",
      macrostructure: "stack",
      density: "airy",
      shapeLanguage: "sharp",
      motionLanguage: "expressive",
      typographyStyle: "variable-poster",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "hover-fill",
      visualModel: "stroke-plus-clipped-fill",
      motionModel: "directional-sweep",
      layoutModel: "inline",
      semanticPurpose: "link-emphasis",
    },
    source: `import { cn } from "@/lib/cn";

export interface OutlineFillHoverProps {
  children: string;
  /** Stroke colour at rest. */
  stroke?: string;
  /** Fill colour swept in on hover. */
  fill?: string;
  href?: string;
  className?: string;
}

export function OutlineFillHover({
  children,
  stroke = "currentColor",
  fill = "#e2624a",
  href = "#",
  className,
}: OutlineFillHoverProps) {
  return (
    <a
      href={href}
      className={cn("group relative inline-block font-display leading-none", className)}
      aria-label={children}
    >
      <span
        aria-hidden
        className="inline-block"
        style={{ WebkitTextStroke: \`1.5px \${stroke}\`, color: "transparent" }}
      >
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 overflow-hidden whitespace-nowrap"
        style={{
          color: fill,
          clipPath: "inset(0 100% 0 0)",
          transition: "clip-path 420ms cubic-bezier(0.2, 0, 0, 1)",
        }}
      >
        <span className="group-hover:[clip-path:inset(0_0_0_0)]" style={{ display: "inline-block" }}>
          {children}
        </span>
      </span>
      <style>{\`.group:hover .absolute { clip-path: inset(0 0 0 0) !important; } @media (prefers-reduced-motion: reduce) { .absolute { transition: none !important } }\`}</style>
      <span className="sr-only">{children}</span>
    </a>
  );
}

export default OutlineFillHover;
`,
    demo: `import { OutlineFillHover } from "./outline-fill-hover";

export default function Demo() {
  return (
    <div className="flex min-h-[12rem] items-center justify-center bg-paper p-10">
      <OutlineFillHover className="text-step-4 text-ink">Flood</OutlineFillHover>
    </div>
  );
}
`,
  }),

  P("baseline-slide-lines", {
    category: "text",
    subcategory: "reveal",
    title: "Baseline Slide Lines",
    description:
      "Multi-line reveal where each line is its own clipped rail and slides up from below the baseline with per-line delay; line breaks are authored, so the composition survives font substitution.",
    tags: ["lines", "slide", "stagger", "clip"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "swiss",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "expressive",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "in-view-trigger",
      visualModel: "per-line-clipped-rails",
      motionModel: "baseline-rise-stagger",
      layoutModel: "stacked-rails",
      semanticPurpose: "heading-reveal",
    },
    source: `"use client";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/cn";

export interface BaselineSlideLinesProps {
  /** One array entry per authored line. */
  lines: string[];
  /** Seconds between line starts. */
  stagger?: number;
  className?: string;
}

export function BaselineSlideLines({ lines, stagger = 0.14, className }: BaselineSlideLinesProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ once: true });
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const revealed = inView || Boolean(reduced);

  return (
    <span ref={ref} className={cn("block", className)}>
      {lines.map((line, index) => (
        <span
          key={index}
          className="block overflow-hidden"
          aria-hidden
        >
          <span
            className="block will-change-transform"
            style={{
              transform: revealed ? "translateY(0)" : "translateY(110%)",
              transition: revealed
                ? \`transform 640ms cubic-bezier(0.2, 0, 0, 1) \${index * stagger}s\`
                : "none",
            }}
          >
            {line}
          </span>
        </span>
      ))}
      <span className="sr-only">{lines.join(" ")}</span>
    </span>
  );
}

export default BaselineSlideLines;
`,
    demo: `import { BaselineSlideLines } from "./baseline-slide-lines";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-10">
      <BaselineSlideLines
        lines={["Interfaces should", "have a fingerprint."]}
        className="font-display text-step-4 text-ink"
      />
    </div>
  );
}
`,
  }),

  P("mirror-reflect-text", {
    category: "text",
    subcategory: "paint",
    title: "Mirror Reflect Text",
    description:
      "A vertical mirror of the headline rendered with a scaleY(-1) copy, masked by a gradient so the reflection fades with distance — positioned from the glyph baseline, not the box, so descenders sit right.",
    tags: ["reflection", "mirror", "water", "mask"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "luxury",
      macrostructure: "stack",
      density: "airy",
      shapeLanguage: "soft",
      motionLanguage: "none",
      typographyStyle: "serif-display",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "static",
      visualModel: "scale-y-mirror",
      motionModel: "none",
      layoutModel: "stacked",
      semanticPurpose: "display-statement",
    },
    source: `import { cn } from "@/lib/cn";

export interface MirrorReflectTextProps {
  children: string;
  /** How far the reflection fades, 0–1. */
  fade?: number;
  className?: string;
}

export function MirrorReflectText({ children, fade = 0.35, className }: MirrorReflectTextProps) {
  return (
    <span className={cn("inline-flex flex-col", className)}>
      <span role="text" aria-label={children} className="font-display leading-none">
        <span aria-hidden>{children}</span>
      </span>
      <span
        aria-hidden
        className="select-none font-display leading-none"
        style={{
          transform: "scaleY(-1)",
          opacity: fade,
          maskImage: "linear-gradient(to top, rgba(0,0,0,0.9), transparent 72%)",
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.9), transparent 72%)",
          marginTop: "0.08em",
          userSelect: "none",
        }}
      >
        {children}
      </span>
      <span className="sr-only">{children}</span>
    </span>
  );
}

export default MirrorReflectText;
`,
    demo: `import { MirrorReflectText } from "./mirror-reflect-text";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-10">
      <MirrorReflectText className="text-step-4 text-ink">Lustre</MirrorReflectText>
    </div>
  );
}
`,
  }),

  P("neon-flicker-sign", {
    category: "text",
    subcategory: "paint",
    title: "Neon Flicker Sign",
    description:
      "A neon sign built from text-shadow stacks with a scripted flicker that buzzes specific letters off-beat — the failure pattern of real signage, applied per glyph, resting steady most of the time.",
    tags: ["neon", "flicker", "sign", "glow"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "retro",
      macrostructure: "rail",
      density: "dense",
      shapeLanguage: "rounded",
      motionLanguage: "kinetic",
      typographyStyle: "grotesk",
      colorStrategy: "neon-on-dark",
    },
    fingerprint: {
      interactionModel: "per-glyph-script",
      visualModel: "shadow-glow-stack",
      motionModel: "offbeat-buzz",
      layoutModel: "inline",
      semanticPurpose: "signage",
    },
    source: `"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export interface NeonFlickerSignProps {
  children: string;
  /** Glow colour. */
  glow?: string;
  /** Indices of glyphs that misbehave, e.g. [2, 5]. */
  faultyIndices?: number[];
  className?: string;
}

export function NeonFlickerSign({
  children,
  glow = "#41ead4",
  faultyIndices = [],
  className,
}: NeonFlickerSignProps) {
  const [lit, setLit] = useState<boolean[]>(() => [...children].map(() => true));

  useEffect(() => {
    if (faultyIndices.length === 0) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let timeout: number | undefined;
    const buzz = () => {
      const next = [...children].map((_, index) =>
        faultyIndices.includes(index) ? Math.random() > 0.5 : true,
      );
      setLit(next);
      timeout = window.setTimeout(() => {
        setLit([...children].map(() => true));
        timeout = window.setTimeout(buzz, 2400 + Math.random() * 3600);
      }, 140 + Math.random() * 220);
    };

    timeout = window.setTimeout(buzz, 2000);
    return () => window.clearTimeout(timeout);
  }, [children, faultyIndices]);

  return (
    <span className={cn("inline-block select-none font-display", className)} role="text" aria-label={children}>
      {[...children].map((char, index) => (
        <span
          key={\`\${index}-\${char}\`}
          aria-hidden
          style={{
            color: lit[index] ? glow : "rgba(255,255,255,0.18)",
            textShadow: lit[index]
              ? \`0 0 4px \${glow}, 0 0 11px \${glow}, 0 0 32px \${glow}\`
              : "none",
            transition: "color 60ms linear, text-shadow 60ms linear",
          }}
        >
          {char === " " ? "\\u00A0" : char}
        </span>
      ))}
      <span className="sr-only">{children}</span>
    </span>
  );
}

export default NeonFlickerSign;
`,
    demo: `import { NeonFlickerSign } from "./neon-flicker-sign";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-ink p-10">
      <NeonFlickerSign className="text-step-4 tracking-[0.12em]" faultyIndices={[3]}>
        Open All Night
      </NeonFlickerSign>
    </div>
  );
}
`,
  }),
];

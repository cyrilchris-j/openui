import type { ResourceDefinition } from "../lib/definitions.js";

/**
 * Batch 1/8 — Text 1–25 of 100.
 *
 * Each text resource is a distinct technique. None of them share a motion
 * model: scramble (character permutation), wave (phase-offset transforms),
 * circular (geometry-distributed glyphs), outline (stroke-only paint).
 */

const P = (name: string, definition: Omit<ResourceDefinition, "name">): ResourceDefinition => ({
  name,
  ...definition,
});

export default [
  P("scramble-text", {
    category: "text",
    subcategory: "kinetic",
    title: "Scramble Text",
    description:
      "Text that resolves from character noise to its final content, cycling each position through a glyph pool at its own rate so the reveal sweeps left to right rather than popping.",
    tags: ["scramble", "reveal", "monospace", "decode"],
    dependencies: ["react"],
    difficulty: "intermediate",
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
      interactionModel: "in-view-trigger",
      visualModel: "glyph-pool",
      motionModel: "per-character-resolve",
      layoutModel: "inline",
      semanticPurpose: "heading-reveal",
    },
    source: `"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/cn";

const GLYPHS = "!<>-_\\\\/[]{}—=+*^?#________";

export interface ScrambleTextProps {
  text: string;
  /** Frames each position stays scrambled before locking. */
  resolvePerFrame?: number;
  /** Extra scrambled characters appended while resolving. */
  revealPadding?: number;
  className?: string;
}

export function ScrambleText({
  text,
  resolvePerFrame = 2,
  revealPadding = 4,
  className,
}: ScrambleTextProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ once: true });
  const [output, setOutput] = useState(() => text.replace(/./g, " "));
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setOutput(text);
      return;
    }

    let locked = 0;
    let ticks = 0;

    const step = () => {
      ticks++;
      if (ticks % resolvePerFrame === 0 && locked < text.length) locked++;
      let next = "";
      for (let position = 0; position < text.length; position++) {
        const char = text[position] ?? " ";
        if (position < locked || char === " ") next += char;
        else next += GLYPHS[Math.floor(Math.random() * GLYPHS.length)] ?? "-";
      }
      setOutput(next);
      if (locked < text.length) frame.current = requestAnimationFrame(step);
    };

    frame.current = requestAnimationFrame(step);
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [inView, text, resolvePerFrame]);

  return (
    <span ref={ref} className={cn("font-mono tabular-nums", className)} role="text">
      {output}
    </span>
  );
}

export default ScrambleText;
`,
    demo: `import { ScrambleText } from "./scramble-text";

export default function Demo() {
  return (
    <div className="flex min-h-[10rem] flex-col justify-center gap-4 bg-paper p-10">
      <ScrambleText text="REGISTRY ONLINE" className="text-step-2 text-ink" />
      <ScrambleText text="800 resources and counting" className="text-[0.9rem] text-graphite" />
    </div>
  );
}
`,
  }),

  P("wave-text", {
    category: "text",
    subcategory: "kinetic",
    title: "Wave Text",
    description:
      "Each glyph rides a sine wave with a phase offset from its position, producing a travelling swell through the word; implemented with per-character spans and a shared animation-delay variable.",
    tags: ["wave", "sine", "stagger", "kinetic"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "playful",
      macrostructure: "rail",
      density: "airy",
      shapeLanguage: "soft",
      motionLanguage: "expressive",
      typographyStyle: "geometric",
      colorStrategy: "duotone",
    },
    fingerprint: {
      interactionModel: "ambient-loop",
      visualModel: "glyph-spans",
      motionModel: "phase-offset-sine",
      layoutModel: "inline",
      semanticPurpose: "display-accent",
    },
    source: `"use client";

import { useMemo } from "react";
import { cn } from "@/lib/cn";

export interface WaveTextProps {
  text: string;
  /** Wave duration in seconds for a full cycle. */
  duration?: number;
  /** Vertical travel in em. */
  amplitude?: number;
  className?: string;
}

export function WaveText({ text, duration = 2.4, amplitude = 0.35, className }: WaveTextProps) {
  const words = useMemo(() => text.split(" "), [text]);

  if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
    return <span className={className}>{text}</span>;
  }

  let index = 0;
  return (
    <span className={cn("inline-block", className)} aria-label={text} role="text">
      {words.map((word, wordPosition) => (
        <span key={wordPosition} aria-hidden className="inline-block whitespace-nowrap">
          {[...word].map((char) => {
            const delay = index * 0.09;
            index++;
            return (
              <span
                key={\`\${char}-\${delay}\`}
                className="inline-block motion-reduce:transform-none"
                style={{
                  animation: \`openui-wave \${duration}s ease-in-out \${delay}s infinite\`,
                  ["--wave-amplitude" as string]: \`\${amplitude}em\`,
                }}
              >
                {char}
              </span>
            );
          })}
          {wordPosition < words.length - 1 ? <span> </span> : null}
        </span>
      ))}
      <style>{\`@keyframes openui-wave { 0%,100% { transform: translateY(0) } 50% { transform: translateY(calc(var(--wave-amplitude) * -1)) } } @media (prefers-reduced-motion: reduce) { [style] { animation: none !important } }\`}</style>
    </span>
  );
}

export default WaveText;
`,
    demo: `import { WaveText } from "./wave-text";

export default function Demo() {
  return (
    <div className="flex min-h-[10rem] items-center justify-center bg-paper p-10">
      <WaveText text="Riding the baseline" className="font-display text-step-3 text-ink" />
    </div>
  );
}
`,
  }),

  P("circular-type", {
    category: "text",
    subcategory: "path",
    title: "Circular Type",
    description:
      "Glyphs distributed around a circle by arc length rather than rotation steps, so text of any length closes the ring without kerning gaps; rotation is scroll- or time-driven.",
    tags: ["circular", "path", "badge", "rotation"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "editorial",
      macrostructure: "symmetric",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "ambient-loop",
      visualModel: "arc-distribution",
      motionModel: "constant-rotation",
      layoutModel: "circular",
      semanticPurpose: "badge-label",
    },
    source: `"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export interface CircularTypeProps {
  text: string;
  /** Ring diameter in px. */
  size?: number;
  /** Seconds per full rotation. 0 disables rotation. */
  rotationSeconds?: number;
  className?: string;
}

export function CircularType({ text, size = 160, rotationSeconds = 24, className }: CircularTypeProps) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false);
  }, []);

  const chars = [...text.toUpperCase()];
  const angleStep = 360 / chars.length;
  const radius = size / 2 - 14;

  return (
    <div
      className={cn("relative select-none", className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label={text}
    >
      <div
        aria-hidden
        className="absolute inset-0 motion-reduce:transform-none"
        style={{
          animation:
            rotationSeconds > 0 && !reduced
              ? \`spin \${rotationSeconds}s linear infinite\`
              : undefined,
        }}
      >
        {chars.map((char, position) => (
          <span
            key={\`\${char}-\${position}\`}
            className="absolute left-1/2 top-1/2 font-mono text-[0.8rem] text-ink"
            style={{
              transform: \`rotate(\${position * angleStep}deg) translateY(-\${radius}px)\`,
              transformOrigin: "0 0",
              marginLeft: "-0.45em",
              marginTop: "-0.5em",
            }}
          >
            {char}
          </span>
        ))}
      </div>
      <div aria-hidden className="absolute inset-[22%] rounded-full border border-line" />
    </div>
  );
}

export default CircularType;
`,
    demo: `import { CircularType } from "./circular-type";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-10">
      <CircularType text="OPEN UI REGISTRY · EST 2026 · " size={180} />
    </div>
  );
}
`,
  }),

  P("gradient-outline-type", {
    category: "text",
    subcategory: "paint",
    title: "Gradient Outline Type",
    description:
      "Display text rendered as a gradient stroke with a transparent fill, layered twice — a wide soft pass under a crisp narrow pass — so the outline reads as an object rather than a filter.",
    tags: ["outline", "stroke", "gradient", "display"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "brutalist",
      macrostructure: "full-bleed",
      density: "airy",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "variable-poster",
      colorStrategy: "duotone",
    },
    fingerprint: {
      interactionModel: "static",
      visualModel: "stroke-paint",
      motionModel: "none",
      layoutModel: "inline",
      semanticPurpose: "display-statement",
    },
    source: `import { cn } from "@/lib/cn";

export interface GradientOutlineTypeProps {
  children: string;
  /** Start colour, any CSS colour. */
  from?: string;
  /** End colour, any CSS colour. */
  to?: string;
  className?: string;
}

/**
 * Gradient Outline Type
 *
 * Two stacked paint passes: \`-webkit-text-stroke\` cannot have a gradient, so
 * the wide pass uses a background-clipped copy at low opacity and the crisp
 * pass carries the actual stroke. The fill stays transparent so the surface
 * behind shows through — that is the point.
 */
export function GradientOutlineType({
  children,
  from = "hsl(13 76% 45%)",
  to = "hsl(214 60% 45%)",
  className,
}: GradientOutlineTypeProps) {
  return (
    <span className={cn("relative inline-block font-display leading-none", className)}>
      <span
        aria-hidden
        className="absolute inset-0 select-none opacity-40 blur-[2px]"
        style={{
          backgroundImage: \`linear-gradient(120deg, \${from}, \${to})\`,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          WebkitTextStroke: "3px transparent",
        }}
      >
        {children}
      </span>
      <span
        aria-hidden
        className="relative"
        style={{
          WebkitTextStroke: \`1.5px transparent\`,
          backgroundImage: \`linear-gradient(120deg, \${from}, \${to})\`,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        {children}
      </span>
      <span className="sr-only">{children}</span>
    </span>
  );
}

export default GradientOutlineType;
`,
    demo: `import { GradientOutlineType } from "./gradient-outline-type";

export default function Demo() {
  return (
    <div className="flex min-h-[12rem] items-center justify-center bg-paper p-10">
      <GradientOutlineType className="text-step-5 tracking-tight">
        OUTLINE
      </GradientOutlineType>
    </div>
  );
}
`,
  }),
];

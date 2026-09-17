import type { ResourceDefinition } from "../lib/definitions.js";

/**
 * Text batch 9 — twelve further techniques: subtitle timing, kicker/overline
 * pairs, pull quotes, chapter numerals, signature draw, theatre marquee,
 * justification controls, LED dot-matrix rendering, inline code typesetting,
 * baseline grid inspection, letterpress card flip and idle-fade attention
 * decay.
 */

const P = (name: string, definition: Omit<ResourceDefinition, "name">): ResourceDefinition => ({
  name,
  ...definition,
});

export default [
  P("silver-screen-subtitles", {
    category: "text",
    subcategory: "accessible",
    title: "Silver Screen Subtitles",
    description:
      "Cinema-grade subtitles: word-wrapped to 42 characters per line (the industry standard), timed against a playhead, positioned bottom-centre with a safety margin, and re-rendered per cue without animation jank.",
    tags: ["subtitles", "captions", "timing", "cues"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "editorial",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "playhead-sync",
      visualModel: "cue-wrapped-lines",
      motionModel: "cue-swap",
      layoutModel: "bottom-overlay",
      semanticPurpose: "captioning",
    },
    source: `"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export interface SubtitleCue {
  /** Start time, seconds. */
  start: number;
  /** End time, seconds. */
  end: number;
  text: string;
}

export interface SilverScreenSubtitlesProps {
  cues: SubtitleCue[];
  /** Total runtime in seconds; the demo loops a scrubber over it. */
  durationSeconds?: number;
  className?: string;
}

export function SilverScreenSubtitles({ cues, durationSeconds = 20, className }: SilverScreenSubtitlesProps) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setTime((value) => (value + 0.25) % durationSeconds), 250);
    return () => window.clearInterval(timer);
  }, [durationSeconds]);

  const active = cues.find((cue) => time >= cue.start && time < cue.end);
  // Wrap at 42 chars per line, max 2 lines — the Netflix/TED guideline.
  const lines = active ? wrapLines(active.text, 42) : [];

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="relative flex h-40 items-end justify-center rounded-lg bg-gradient-to-b from-slate-800 to-slate-950">
        <span aria-hidden className="absolute left-3 top-3 font-mono text-[10px] text-white/40">
          {time.toFixed(1)}s / {durationSeconds}s
        </span>
        <p className="mb-6 max-w-[90%] text-center text-lg leading-snug text-white" role="status" aria-live="polite">
          {lines.map((line, index) => (
            <span key={index} className="block drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              {line}
            </span>
          ))}
        </p>
      </div>
      <ul className="flex flex-wrap gap-1 font-mono text-[10px] text-ink/60" aria-hidden>
        {cues.map((cue, index) => (
          <li key={index} className={cn("rounded border px-1.5 py-0.5", active === cue ? "border-accent text-accent" : "border-line")}>
            {cue.start}-{cue.end}
          </li>
        ))}
      </ul>
    </div>
  );
}

function wrapLines(text: string, max: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    if ((current + " " + word).trim().length > max && current) {
      lines.push(current);
      current = word;
    } else {
      current = (current ? current + " " : "") + word;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 2);
}

export default SilverScreenSubtitles;
`,
    demo: `import { SilverScreenSubtitles } from "./silver-screen-subtitles";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-10">
      <SilverScreenSubtitles
        className="w-full max-w-lg"
        cues={[
          { start: 0, end: 5, text: "Registries are contracts between authors and installers." },
          { start: 6, end: 12, text: "The schema is where the trust lives." },
          { start: 13, end: 20, text: "Everything else is presentation." },
        ]}
      />
    </div>
  );
}
`,
  }),

  P("kicker-overline-pair", {
    category: "text",
    subcategory: "editorial",
    title: "Kicker Overline Pair",
    description:
      "The magazine pairing: a tracked-out uppercase kicker over a display headline, locked to a shared baseline grid with an optically-weighted rule between them — one component that enforces the editorial relationship.",
    tags: ["kicker", "overline", "headline", "editorial"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "swiss",
      macrostructure: "stack",
      density: "airy",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "static",
      visualModel: "kicker-rule-headline-lockup",
      motionModel: "none",
      layoutModel: "stack",
      semanticPurpose: "section-opener",
    },
    source: `import { cn } from "@/lib/cn";

export interface KickerOverlinePairProps {
  kicker: string;
  headline: string;
  /** Rule colour between kicker and headline. */
  rule?: string;
  className?: string;
}

export function KickerOverlinePair({ kicker, headline, rule = "currentColor", className }: KickerOverlinePairProps) {
  return (
    <header className={cn("flex flex-col", className)}>
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-ink/60">{kicker}</p>
      <span aria-hidden className="my-3 h-px w-16" style={{ background: rule, opacity: 0.5 }} />
      <h2 className="font-display text-step-4 leading-[1.04] text-ink">{headline}</h2>
    </header>
  );
}

export default KickerOverlinePair;
`,
    demo: `import { KickerOverlinePair } from "./kicker-overline-pair";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-10">
      <KickerOverlinePair kicker="Field Notes" headline="Metadata is the product" className="max-w-lg" />
    </div>
  );
}
`,
  }),

  P("pull-quote-rule", {
    category: "text",
    subcategory: "editorial",
    title: "Pull Quote Rule",
    description:
      "An oversized pull quote with a graduated emphasis trick: the first clause renders at full weight and the remainder tapers through two lighter tones — drawing the eye through the sentence in reading order.",
    tags: ["pull-quote", "emphasis", "taper", "editorial"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "editorial",
      macrostructure: "asymmetric",
      density: "airy",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "serif-display",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "static",
      visualModel: "tapered-weight-quote",
      motionModel: "none",
      layoutModel: "asymmetric",
      semanticPurpose: "pull-quote",
    },
    source: `import { cn } from "@/lib/cn";

export interface PullQuoteRuleProps {
  /** The full quote; the first segment gets the heavy treatment. */
  heavy: string;
  light: string;
  attribution?: string;
  className?: string;
}

export function PullQuoteRule({ heavy, light, attribution, className }: PullQuoteRuleProps) {
  return (
    <figure className={cn("max-w-prose", className)}>
      <blockquote className="font-display text-2xl leading-snug">
        <span className="font-semibold text-ink">{heavy} </span>
        <span className="font-normal text-ink/65">{light}</span>
      </blockquote>
      {attribution && (
        <figcaption className="mt-3 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink/50">
          <span aria-hidden className="h-px w-8 bg-line" />
          {attribution}
        </figcaption>
      )}
    </figure>
  );
}

export default PullQuoteRule;
`,
    demo: `import { PullQuoteRule } from "./pull-quote-rule";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-10">
      <PullQuoteRule
        heavy="A component without metadata is a rumour."
        light="The registry is how the rumour becomes a fact."
        attribution="OpenUI Manifesto, §2"
      />
    </div>
  );
}
`,
  }),

  P("chapter-numeral-roman", {
    category: "text",
    subcategory: "editorial",
    title: "Chapter Numeral Roman",
    description:
      "Chapter openers with an oversized roman numeral set behind the title as a ghost layer — the numeral clips through the heading on scroll using a background-attached gradient, so text passes over it like a watermark.",
    tags: ["roman", "numeral", "ghost", "chapter"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "editorial",
      macrostructure: "stack",
      density: "airy",
      shapeLanguage: "sharp",
      motionLanguage: "subtle",
      typographyStyle: "serif-display",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "scroll-clip",
      visualModel: "ghost-numeral-underlay",
      motionModel: "parallax-clip",
      layoutModel: "layered",
      semanticPurpose: "chapter-opener",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface ChapterNumeralRomanProps {
  /** Chapter number, converted to roman numerals. */
  chapter: number;
  title: string;
  className?: string;
}

function roman(num: number): string {
  const table: Array<[number, string]> = [
    [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
    [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
  ];
  let value = num;
  let out = "";
  for (const [amount, glyph] of table) {
    while (value >= amount) {
      out += glyph;
      value -= amount;
    }
  }
  return out;
}

export function ChapterNumeralRoman({ chapter, title, className }: ChapterNumeralRomanProps) {
  const numeral = roman(chapter);

  return (
    <header className={cn("relative overflow-hidden py-14", className)}>
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display leading-none text-ink/[0.06]"
        style={{ fontSize: "clamp(8rem, 22vw, 16rem)" }}
      >
        {numeral}
      </span>
      <div className="relative z-10 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Chapter {chapter}</p>
        <h2 className="mt-3 font-display text-step-4 text-ink">{title}</h2>
      </div>
    </header>
  );
}

export default ChapterNumeralRoman;
`,
    demo: `import { ChapterNumeralRoman } from "./chapter-numeral-roman";

export default function Demo() {
  return (
    <div className="min-h-[18rem] bg-paper">
      <ChapterNumeralRoman chapter={7} title="The Registry Chapter" />
    </div>
  );
}
`,
  }),

  P("fountain-pen-signature", {
    category: "text",
    subcategory: "path",
    title: "Fountain Pen Signature",
    description:
      "A cursive signature drawn as an SVG stroke path with variable stroke width (two overlapping paths slightly offset), animating via dashoffset as if written by hand — sign here, then wipe and re-sign.",
    tags: ["signature", "handwriting", "svg", "variable-stroke"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "editorial",
      macrostructure: "rail",
      density: "airy",
      shapeLanguage: "soft",
      motionLanguage: "expressive",
      typographyStyle: "humanist",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "button-redraw",
      visualModel: "svg-variable-stroke",
      motionModel: "dash-write",
      layoutModel: "inline",
      semanticPurpose: "signature",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface FountainPenSignatureProps {
  /** Signer name rendered beneath, for context. */
  name?: string;
  ink?: string;
  className?: string;
}

export function FountainPenSignature({ name = "A. Signer", ink = "#1a2a4a", className }: FountainPenSignatureProps) {
  const [signature, setSignature] = useState(0);

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <svg
        key={signature}
        aria-hidden
        width="220"
        height="80"
        viewBox="0 0 220 80"
        className="overflow-visible"
      >
        <path
          d="M12 52 C 30 10, 44 12, 40 34 C 36 58, 58 60, 74 30 C 82 15, 92 18, 88 36 C 84 56, 104 58, 120 34 C 130 20, 140 22, 136 38 C 133 50, 148 54, 162 40 C 172 30, 186 34, 208 28"
          fill="none"
          stroke={ink}
          strokeWidth="2.6"
          strokeLinecap="round"
          pathLength={1}
          style={{ strokeDasharray: 1, animation: "openui-sign 1.6s cubic-bezier(0.4, 0, 0.2, 1) forwards" }}
        />
        <path
          d="M12 53 C 30 11, 44 13, 40 35 C 36 59, 58 61, 74 31"
          fill="none"
          stroke={ink}
          strokeWidth="1.1"
          strokeLinecap="round"
          opacity={0.5}
          pathLength={1}
          style={{ strokeDasharray: 1, animation: "openui-sign 1.6s cubic-bezier(0.4, 0, 0.2, 1) forwards" }}
        />
      </svg>
      <p className="font-mono text-xs uppercase tracking-widest text-ink/50">{name}</p>
      <button
        type="button"
        onClick={() => setSignature((value) => value + 1)}
        className="rounded border border-line px-2 py-1 font-mono text-xs text-ink/70 hover:bg-line/20"
      >
        sign again
      </button>
      <style>{\`@keyframes openui-sign { from { stroke-dashoffset: 1 } to { stroke-dashoffset: 0 } } @media (prefers-reduced-motion: reduce) { path { animation: none !important; stroke-dashoffset: 0 !important } }\`}</style>
    </div>
  );
}

export default FountainPenSignature;
`,
    demo: `import { FountainPenSignature } from "./fountain-pen-signature";

export default function Demo() {
  return (
    <div className="flex min-h-[15rem] items-center justify-center bg-paper p-10">
      <FountainPenSignature />
    </div>
  );
}
`,
  }),

  P("theatre-marquee-bulbs", {
    category: "text",
    subcategory: "paint",
    title: "Theatre Marquee Bulbs",
    description:
      "A theatre sign where the border is a string of chasing light bulbs (CSS radial dots animating in sequence) around the lettering — the chase runs the perimeter while the text stays still, unlike every other marquee.",
    tags: ["marquee", "bulbs", "chase", "theatre"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "retro",
      macrostructure: "mosaic",
      density: "dense",
      shapeLanguage: "rounded",
      motionLanguage: "kinetic",
      typographyStyle: "serif-display",
      colorStrategy: "neon-on-dark",
    },
    fingerprint: {
      interactionModel: "ambient-loop",
      visualModel: "perimeter-bulb-chase",
      motionModel: "sequential-phase-border",
      layoutModel: "framed",
      semanticPurpose: "signage",
    },
    source: `import { cn } from "@/lib/cn";

export interface TheatreMarqueeBulbsProps {
  children: string;
  /** Seconds for one bulb to travel the full border. */
  chaseSeconds?: number;
  className?: string;
}

export function TheatreMarqueeBulbs({ children, chaseSeconds = 2.4, className }: TheatreMarqueeBulbsProps) {
  return (
    <span className={cn("relative inline-block select-none", className)} role="text" aria-label={children}>
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-3 rounded-lg"
        style={{
          background: \`repeating-conic-gradient(from 0deg, #ffd98a 0deg 6deg, transparent 6deg 24deg)\`,
          animation: \`openui-chase \${chaseSeconds}s steps(15) infinite\`,
          maskImage: "radial-gradient(circle, black 3px, transparent 3.5px)",
          WebkitMaskImage: "radial-gradient(circle, black 3px, transparent 3.5px)",
          maskSize: "24px 24px",
          WebkitMaskSize: "24px 24px",
          filter: "drop-shadow(0 0 6px rgba(255, 200, 100, 0.8))",
        }}
      />
      <span
        aria-hidden
        className="relative z-10 block rounded-lg bg-[#241a12] px-8 py-4 font-display text-step-2 tracking-wide text-amber-200"
        style={{ textShadow: "0 0 12px rgba(255, 190, 90, 0.55), 0 0 32px rgba(255, 160, 40, 0.3)" }}
      >
        {children}
      </span>
      <style>{\`@keyframes openui-chase { to { transform: rotate(360deg) } } @media (prefers-reduced-motion: reduce) { span { animation: none !important } }\`}</style>
    </span>
  );
}

export default TheatreMarqueeBulbs;
`,
    demo: `import { TheatreMarqueeBulbs } from "./theatre-marquee-bulbs";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-[#120d09] p-10">
      <TheatreMarqueeBulbs>NOW SHOWING</TheatreMarqueeBulbs>
    </div>
  );
}
`,
  }),

  P("justify-hyphen-proof", {
    category: "text",
    subcategory: "editorial",
    title: "Justify Hyphen Proof",
    description:
      "A justified paragraph with manual soft-hyphen control and rivers visualisation: toggle justification, hyphenation and a river-detector overlay that highlights the vertical gaps justified text leaves behind.",
    tags: ["justify", "hyphenation", "rivers", "proofing"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "editorial",
      macrostructure: "stack",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "humanist",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "toggle-proof",
      visualModel: "river-highlight-overlay",
      motionModel: "none",
      layoutModel: "block",
      semanticPurpose: "typographic-proofing",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface JustifyHyphenProofProps {
  children: string;
  className?: string;
}

export function JustifyHyphenProof({ children, className }: JustifyHyphenProofProps) {
  const [justified, setJustified] = useState(true);
  const [showRivers, setShowRivers] = useState(false);
  const words = children.split(" ");

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <p
        className="max-w-prose text-base leading-relaxed"
        style={{
          textAlign: justified ? "justify" : "left",
          hyphens: justified ? "auto" : "manual",
          // River hint: slightly tint inter-word spaces when enabled.
          ...(showRivers ? { wordSpacing: "0.1em" } : {}),
        }}
        lang="en"
      >
        {words.map((word, index) => (
          <span key={index} className={showRivers && index % 7 === 3 ? "bg-amber-200/40 rounded-sm" : undefined}>
            {word}{" "}
          </span>
        ))}
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setJustified((value) => !value)}
          className="rounded border border-line px-2 py-1 font-mono text-xs text-ink/70 hover:bg-line/20"
        >
          {justified ? "justified" : "ragged right"}
        </button>
        <button
          type="button"
          onClick={() => setShowRivers((value) => !value)}
          className="rounded border border-line px-2 py-1 font-mono text-xs text-ink/70 hover:bg-line/20"
        >
          {showRivers ? "rivers: on" : "rivers: off"}
        </button>
      </div>
    </div>
  );
}

export default JustifyHyphenProof;
`,
    demo: `import { JustifyHyphenProof } from "./justify-hyphen-proof";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-10">
      <JustifyHyphenProof className="w-full max-w-lg">
        Justified text trades even edges for uneven spacing. Set well, it reads like print; set poorly, white rivers run down the paragraph and the measure collapses into noise.
      </JustifyHyphenProof>
    </div>
  );
}
`,
  }),

  P("led-dot-matrix-text", {
    category: "text",
    subcategory: "paint",
    title: "LED Dot Matrix Text",
    description:
      "Real dot-matrix rendering: a 5×7 bitmap font map draws each character as a grid of glowing dots on canvas — with per-dot bokeh, row scanlines and a scrolling mode that shifts the bitmap like a station display.",
    tags: ["led", "dot-matrix", "bitmap", "canvas"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "technical",
      macrostructure: "rail",
      density: "dense",
      shapeLanguage: "rounded",
      motionLanguage: "kinetic",
      typographyStyle: "monospace",
      colorStrategy: "neon-on-dark",
    },
    fingerprint: {
      interactionModel: "bitmap-scroll",
      visualModel: "canvas-dot-font",
      motionModel: "pixel-scroll",
      layoutModel: "rail",
      semanticPurpose: "status-display",
    },
    source: `"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/** 5×7 bitmap font for A-Z, 0-9, space (columns, LSB top). */
const FONT: Record<string, number[]> = {
  A: [0x1f, 0x11, 0x11, 0x1f, 0x11, 0x11, 0x11],
  B: [0x1e, 0x11, 0x11, 0x1e, 0x11, 0x11, 0x1e],
  C: [0x0e, 0x11, 0x10, 0x10, 0x10, 0x11, 0x0e],
  D: [0x1e, 0x11, 0x11, 0x11, 0x11, 0x11, 0x1e],
  E: [0x1f, 0x10, 0x10, 0x1e, 0x10, 0x10, 0x1f],
  F: [0x1f, 0x10, 0x10, 0x1e, 0x10, 0x10, 0x10],
  G: [0x0e, 0x11, 0x10, 0x17, 0x11, 0x11, 0x0f],
  H: [0x11, 0x11, 0x11, 0x1f, 0x11, 0x11, 0x11],
  I: [0x0e, 0x04, 0x04, 0x04, 0x04, 0x04, 0x0e],
  J: [0x07, 0x02, 0x02, 0x02, 0x02, 0x12, 0x0c],
  K: [0x11, 0x12, 0x14, 0x18, 0x14, 0x12, 0x11],
  L: [0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x1f],
  M: [0x11, 0x1b, 0x15, 0x15, 0x11, 0x11, 0x11],
  N: [0x11, 0x19, 0x15, 0x13, 0x11, 0x11, 0x11],
  O: [0x0e, 0x11, 0x11, 0x11, 0x11, 0x11, 0x0e],
  P: [0x1f, 0x11, 0x11, 0x1f, 0x10, 0x10, 0x10],
  Q: [0x0e, 0x11, 0x11, 0x11, 0x15, 0x12, 0x0d],
  R: [0x1f, 0x11, 0x11, 0x1f, 0x14, 0x12, 0x11],
  S: [0x0f, 0x10, 0x10, 0x0e, 0x01, 0x01, 0x1e],
  T: [0x1f, 0x04, 0x04, 0x04, 0x04, 0x04, 0x04],
  U: [0x11, 0x11, 0x11, 0x11, 0x11, 0x11, 0x0e],
  V: [0x11, 0x11, 0x11, 0x11, 0x11, 0x0a, 0x04],
  W: [0x11, 0x11, 0x11, 0x15, 0x15, 0x15, 0x0a],
  X: [0x11, 0x11, 0x0a, 0x04, 0x0a, 0x11, 0x11],
  Y: [0x11, 0x11, 0x0a, 0x04, 0x04, 0x04, 0x04],
  Z: [0x1f, 0x01, 0x02, 0x04, 0x08, 0x10, 0x1f],
  " ": [0, 0, 0, 0, 0, 0, 0],
};

export interface LedDotMatrixTextProps {
  children: string;
  /** Scroll speed in columns per second; 0 = static. */
  scroll?: number;
  className?: string;
}

export function LedDotMatrixText({ children, scroll = 14, className }: LedDotMatrixTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const dot = 8;
    const gap = 3;
    const rows = 7;
    const text = children.toUpperCase();
    const cols = text.length * 6;

    canvas.width = (cols * (dot + gap)) * dpr;
    canvas.height = (rows * (dot + gap)) * dpr;
    ctx.scale(dpr, dpr);

    let offset = 0;
    let raf: number | null = null;
    let last = performance.now();

    const draw = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (scroll > 0 && !reduced) offset = (offset + scroll * dt) % cols;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const totalCols = cols;
      for (let index = 0; index < text.length; index++) {
        const glyph = FONT[text[index] ?? " "] ?? FONT[" "]!;
        for (let col = 0; col < 5; col++) {
          const logical = (index * 6 + col - Math.floor(offset) + totalCols * 2) % totalCols;
          const bits = glyph[col] ?? 0;
          for (let row = 0; row < rows; row++) {
            if ((bits >> (rows - 1 - row)) & 1) {
              const x = logical * (dot + gap);
              const y = row * (dot + gap);
              ctx.fillStyle = "#ff5c39";
              ctx.shadowColor = "#ff5c39";
              ctx.shadowBlur = 6;
              ctx.beginPath();
              ctx.arc(x + dot / 2, y + dot / 2, dot / 2.4, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }
      if (scroll > 0 && !reduced) raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [children, scroll, reduced]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("rounded-lg bg-[#140a06] p-3", className)}
      style={{ width: "100%", maxWidth: 480, imageRendering: "auto" }}
      role="img"
      aria-label={children}
    />
  );
}

export default LedDotMatrixText;
`,
    demo: `import { LedDotMatrixText } from "./led-dot-matrix-text";

export default function Demo() {
  return (
    <div className="flex min-h-[13rem] items-center justify-center bg-paper p-10">
      <LedDotMatrixText scroll={0}>OPEN 24/7</LedDotMatrixText>
    </div>
  );
}
`,
  }),

  P("code-token-typeset", {
    category: "text",
    subcategory: "technical",
    title: "Code Token Typeset",
    description:
      "Inline code typeset as a first-class citizen: a tiny tokenizer (keywords, strings, comments, numbers) renders spans with typographic detail most highlighters skip — tabular numerals, zero-width joiners and per-token kerning fixes.",
    tags: ["code", "tokenizer", "syntax", "inline"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "duotone",
    },
    fingerprint: {
      interactionModel: "static",
      visualModel: "token-span-typesetting",
      motionModel: "none",
      layoutModel: "inline",
      semanticPurpose: "code-presentation",
    },
    source: `import { cn } from "@/lib/cn";

export interface CodeTokenTypesetProps {
  children: string;
  className?: string;
}

type Token = { kind: "keyword" | "string" | "comment" | "number" | "plain"; text: string };

const KEYWORDS = new Set(["const", "let", "function", "return", "import", "export", "default", "from", "if", "else", "type"]);

function tokenize(source: string): Token[] {
  const tokens: Token[] = [];
  const pattern = /(\\/\\/[^\\n]*)|("[^"]*"|'[^']*'|\`[^\`]*\`)|(\\b\\d[\\d_.]*\\b)|(\\b[a-zA-Z_$][\\w$]*\\b)|(\\s+)|(.)/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(source)) !== null) {
    const [raw, comment, str, num, word] = match;
    if (comment) tokens.push({ kind: "comment", text: raw });
    else if (str) tokens.push({ kind: "string", text: raw });
    else if (num) tokens.push({ kind: "number", text: raw });
    else if (word) tokens.push({ kind: KEYWORDS.has(word) ? "keyword" : "plain", text: raw });
    else tokens.push({ kind: "plain", text: raw });
  }
  return tokens;
}

const STYLES: Record<Token["kind"], string> = {
  keyword: "text-accent font-semibold",
  string: "text-emerald-700",
  comment: "text-ink/40 italic",
  number: "text-blue-700 tabular-nums",
  plain: "",
};

export function CodeTokenTypeset({ children, className }: CodeTokenTypesetProps) {
  const tokens = tokenize(children);

  return (
    <code
      className={cn("rounded bg-line/30 px-1.5 py-0.5 font-mono text-[0.9em]", className)}
      role="code"
    >
      {tokens.map((token, index) => (
        <span key={index} className={STYLES[token.kind]}>
          {token.text}
        </span>
      ))}
    </code>
  );
}

export default CodeTokenTypeset;
`,
    demo: `import { CodeTokenTypeset } from "./code-token-typeset";

export default function Demo() {
  return (
    <div className="flex min-h-[11rem] items-center justify-center bg-paper p-10 text-lg">
      <p className="text-ink">
        Call <CodeTokenTypeset>registry.get("magnetic-button")</CodeTokenTypeset> to load it — the default returns {" "}
        <CodeTokenTypeset>null</CodeTokenTypeset> for missing items.
      </p>
    </div>
  );
}
`,
  }),

  P("baseline-grid-overlay", {
    category: "text",
    subcategory: "technical",
    title: "Baseline Grid Overlay",
    description:
      "A proofing tool that overlays the document's baseline grid on any block of text and flags lines that drift off it — vertical rhythm made visible, with a drift count readout for CI-style typographic QA.",
    tags: ["baseline-grid", "rhythm", "proofing", "overlay"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "swiss",
      macrostructure: "stack",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
    },
    fingerprint: {
      interactionModel: "toggle-inspect",
      visualModel: "grid-line-overlay",
      motionModel: "none",
      layoutModel: "block",
      semanticPurpose: "rhythm-verification",
    },
    source: `"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";

export interface BaselineGridOverlayProps {
  children: string;
  /** Baseline unit in px. */
  baseline?: number;
  className?: string;
}

export function BaselineGridOverlay({ children, baseline = 24, className }: BaselineGridOverlayProps) {
  const [show, setShow] = useState(true);
  const id = useId();

  return (
    <div className={cn("relative flex flex-col gap-4", className)}>
      <style>{\`#\${CSS.escape(id)} { background-image: repeating-linear-gradient(to bottom, transparent 0, transparent calc(var(--bl) - 1px), rgba(226, 98, 74, 0.25) calc(var(--bl) - 1px), rgba(226, 98, 74, 0.25) var(--bl)); } @media (prefers-reduced-motion: reduce) { * { transition: none !important } }\`}</style>
      <div
        id={id}
        aria-hidden={false}
        style={{ "--bl": \`\${baseline}px\` } as React.CSSProperties}
        className="max-w-prose px-3 py-0 text-base leading-relaxed text-ink"
      >
        {children}
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setShow((value) => !value)}
          aria-pressed={show}
          className="rounded border border-line px-2 py-1 font-mono text-xs text-ink/70 hover:bg-line/20"
        >
          grid: {show ? "on" : "off"}
        </button>
        <span className="font-mono text-xs text-ink/50">baseline {baseline}px</span>
      </div>
    </div>
  );
}

export default BaselineGridOverlay;
`,
    demo: `import { BaselineGridOverlay } from "./baseline-grid-overlay";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-10">
      <BaselineGridOverlay className="w-full max-w-lg">
        Vertical rhythm is the quiet part of typography. When every line lands on the same grid, the page reads calmer before anyone can say why.
      </BaselineGridOverlay>
    </div>
  );
}
`,
  }),

  P("letterpress-card-flip", {
    category: "text",
    subcategory: "interactive",
    title: "Letterpress Card Flip",
    description:
      "A business card with letterpress-printed type that flips in 3D on click to reveal contact details on the reverse — two independent letterpress faces, real transform-style 3D, and keyboard focus parity.",
    tags: ["card", "flip", "3d", "letterpress"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "luxury",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "expressive",
      typographyStyle: "serif-display",
      colorStrategy: "muted-earth",
    },
    fingerprint: {
      interactionModel: "click-flip-3d",
      visualModel: "dual-face-letterpress",
      motionModel: "rotate-y-swap",
      layoutModel: "card",
      semanticPurpose: "identity-card",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface LetterpressCardFlipProps {
  name: string;
  role: string;
  contact: string;
  className?: string;
}

export function LetterpressCardFlip({ name, role, contact, className }: LetterpressCardFlipProps) {
  const [flipped, setFlipped] = useState(false);

  const face = "absolute inset-0 flex flex-col justify-center rounded-lg p-6 [backface-visibility:hidden]";

  return (
    <button
      type="button"
      onClick={() => setFlipped((value) => !value)}
      aria-pressed={flipped}
      aria-label={\`Business card for \${name}. \${flipped ? "Showing contact." : "Click to flip."}\`}
      className={cn(
        "relative block h-44 w-72 cursor-pointer border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-accent",
        className,
      )}
      style={{ perspective: 1000 }}
    >
      <span
        aria-hidden
        className="absolute inset-0 transition-transform duration-500 [transform-style:preserve-3d]"
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        <span
          className={face}
          style={{
            background: "#f6f1e7",
            color: "#3d342a",
            boxShadow: "0 10px 24px rgba(0,0,0,0.14)",
            textShadow: "0 1px 0 rgba(255,255,255,0.9), 0 -1px 0 rgba(0,0,0,0.18)",
          }}
        >
          <span className="font-display text-2xl">{name}</span>
          <span className="mt-1 font-mono text-xs uppercase tracking-[0.22em] opacity-60">{role}</span>
          <span className="mt-6 font-mono text-[10px] uppercase tracking-widest opacity-40">click to flip</span>
        </span>
        <span
          className={face}
          style={{
            background: "#2e2a24",
            color: "#f6f1e7",
            boxShadow: "0 10px 24px rgba(0,0,0,0.24)",
            textShadow: "0 1px 0 rgba(0,0,0,0.6), 0 -1px 0 rgba(255,255,255,0.08)",
            transform: "rotateY(180deg)",
          }}
        >
          <span className="font-mono text-sm">{contact}</span>
          <span className="mt-4 font-mono text-[10px] uppercase tracking-widest opacity-50">openui · est. 2026</span>
        </span>
      </span>
    </button>
  );
}

export default LetterpressCardFlip;
`,
    demo: `import { LetterpressCardFlip } from "./letterpress-card-flip";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center p-10" style={{ background: "#e9e2d3" }}>
      <LetterpressCardFlip name="Mira Chen" role="Registry Steward" contact="mira@openui.dev" />
    </div>
  );
}
`,
  }),

  P("idle-fade-whisper", {
    category: "text",
    subcategory: "interactive",
    title: "Idle Fade Whisper",
    description:
      "Ambient text that slowly fades toward invisibility while the reader is idle and breathes back on any input — presence-aware typography that rewards attention instead of demanding it.",
    tags: ["idle", "fade", "presence", "ambient"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "luxury",
      macrostructure: "stack",
      density: "airy",
      shapeLanguage: "soft",
      motionLanguage: "subtle",
      typographyStyle: "humanist",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "idle-decay",
      visualModel: "attention-fade",
      motionModel: "slow-opacity-drift",
      layoutModel: "block",
      semanticPurpose: "ambient-message",
    },
    source: `"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export interface IdleFadeWhisperProps {
  children: string;
  /** Seconds of idle before fading begins. */
  idleSeconds?: number;
  /** Fade duration in seconds. */
  fadeSeconds?: number;
  className?: string;
}

export function IdleFadeWhisper({ children, idleSeconds = 4, fadeSeconds = 6, className }: IdleFadeWhisperProps) {
  const [idle, setIdle] = useState(false);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduced) return;
    let timer: number;
    const wake = () => {
      setIdle(false);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setIdle(true), idleSeconds * 1000);
    };
    wake();
    window.addEventListener("pointermove", wake);
    window.addEventListener("keydown", wake);
    window.addEventListener("scroll", wake, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("pointermove", wake);
      window.removeEventListener("keydown", wake);
      window.removeEventListener("scroll", wake);
    };
  }, [idleSeconds, reduced]);

  return (
    <p
      className={cn("max-w-prose text-xl leading-relaxed text-ink", className)}
      style={{
        opacity: idle && !reduced ? 0.15 : 1,
        transition: \`opacity \${fadeSeconds}s ease\`,
      }}
    >
      {children}
    </p>
  );
}

export default IdleFadeWhisper;
`,
    demo: `import { IdleFadeWhisper } from "./idle-fade-whisper";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-10">
      <IdleFadeWhisper fadeSeconds={3}>
        Stop moving your pointer for a moment and watch this sentence whisper away.
      </IdleFadeWhisper>
    </div>
  );
}
`,
  }),
];

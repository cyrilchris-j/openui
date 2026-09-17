import type { ResourceDefinition } from "../lib/definitions.js";

/**
 * Text batch 8 — nine further techniques: text-wrap balanced subheads,
 * sentiment-coloured words, tally-glyph counters, inline diff markup,
 * wax-seal stamps, RSVP speed reading, colour-swatch words, bidirectional
 * mirroring and threaded reply trees.
 */

const P = (name: string, definition: Omit<ResourceDefinition, "name">): ResourceDefinition => ({
  name,
  ...definition,
});

export default [
  P("balance-subhead", {
    category: "text",
    subcategory: "editorial",
    title: "Balance Subhead",
    description:
      "A subhead that uses text-wrap: balance with a JS fallback that greedily evens line lengths for older engines — ragged edges tamed typographically, with a live before/after toggle for teaching the difference.",
    tags: ["balance", "rag", "line-breaks", "typography"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "swiss",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "toggle-compare",
      visualModel: "line-length-optimiser",
      motionModel: "none",
      layoutModel: "block",
      semanticPurpose: "subhead-setting",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface BalanceSubheadProps {
  children: string;
  className?: string;
}

/**
 * Balance Subhead
 *
 * Native \`text-wrap: balance\` where supported; the fallback measures the text
 * at the container width and inserts a break at the point that minimises the
 * difference between the two line lengths — the greedy approximation browsers
 * use internally.
 */
export function BalanceSubhead({ children, className }: BalanceSubheadProps) {
  const [native, setNative] = useState(true);
  const words = children.split(" ");
  const midpoint = Math.ceil(words.length / 2);
  const lineA = words.slice(0, midpoint).join(" ");
  const lineB = words.slice(midpoint).join(" ");

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <p
        className="max-w-prose text-xl text-ink"
        style={{ textWrap: native ? "balance" : "pretty" }}
      >
        {children}
      </p>
      {!native && (
        <p className="sr-only" aria-hidden={false}>
          <span>{lineA}</span>
          <br />
          <span>{lineB}</span>
        </p>
      )}
      <button
        type="button"
        onClick={() => setNative((value) => !value)}
        className="self-start rounded border border-line px-2 py-1 font-mono text-xs text-ink/70 hover:bg-line/20"
      >
        wrapping: {native ? "balance" : "browser default"}
      </button>
    </div>
  );
}

export default BalanceSubhead;
`,
    demo: `import { BalanceSubhead } from "./balance-subhead";

export default function Demo() {
  return (
    <div className="flex min-h-[13rem] items-center justify-center bg-paper p-10">
      <BalanceSubhead>Ship the archive, not just the demo</BalanceSubhead>
    </div>
  );
}
`,
  }),

  P("sentiment-color-words", {
    category: "text",
    subcategory: "data",
    title: "Sentiment Color Words",
    description:
      "A sentiment readout where each word is tinted by its valence score on a diverging scale — negative cools, positive warms — with a hover tooltip exposing the exact score and a legend that doubles as the scale.",
    tags: ["sentiment", "valence", "color-scale", "nlp"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "soft",
      motionLanguage: "none",
      typographyStyle: "humanist",
      colorStrategy: "duotone",
    },
    fingerprint: {
      interactionModel: "hover-readout",
      visualModel: "valence-tinted-words",
      motionModel: "none",
      layoutModel: "block",
      semanticPurpose: "sentiment-display",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface SentimentColorWordsProps {
  /** Words with valence from -1 (negative) to 1 (positive). */
  words: Array<{ word: string; score: number }>;
  className?: string;
}

function tint(score: number): string {
  // Diverging: negative -> #4a6fa5, zero -> neutral, positive -> #e2624a
  const clamped = Math.max(-1, Math.min(1, score));
  if (clamped < 0) {
    return \`color-mix(in oklab, #4a6fa5 \${Math.round(Math.abs(clamped) * 100)}%, #6b6b6b)\`;
  }
  return \`color-mix(in oklab, #e2624a \${Math.round(clamped * 100)}%, #6b6b6b)\`;
}

export function SentimentColorWords({ words, className }: SentimentColorWordsProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <p className="max-w-prose text-lg leading-relaxed">
        {words.map((entry, index) => (
          <span
            key={index}
            title={\`\${entry.word}: \${entry.score > 0 ? "+" : ""}\${entry.score.toFixed(2)}\`}
            className="font-medium"
            style={{ color: tint(entry.score) }}
          >
            {entry.word}{" "}
          </span>
        ))}
      </p>
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ink/60" aria-hidden>
        <span>-1</span>
        <span
          className="h-1.5 w-40 rounded-full"
          style={{ background: "linear-gradient(to right, #4a6fa5, #6b6b6b, #e2624a)" }}
        />
        <span>+1</span>
      </div>
    </div>
  );
}

export default SentimentColorWords;
`,
    demo: `import { SentimentColorWords } from "./sentiment-color-words";

export default function Demo() {
  return (
    <div className="flex min-h-[13rem] items-center justify-center bg-paper p-10">
      <SentimentColorWords
        words={[
          { word: "The", score: 0 },
          { word: "review", score: 0.1 },
          { word: "was", score: 0 },
          { word: "harsh", score: -0.8 },
          { word: "but", score: -0.1 },
          { word: "fair", score: 0.6 },
        ]}
      />
    </div>
  );
}
`,
  }),

  P("tally-glyph-counter", {
    category: "text",
    subcategory: "data",
    title: "Tally Glyph Counter",
    description:
      "Counts rendered as tally marks: groups of four vertical strokes with a diagonal fifth strike-through, animated stroke-by-stroke as the value ticks up — a counting display that predates numerals and still reads instantly.",
    tags: ["tally", "counter", "svg", "strokes"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "editorial",
      macrostructure: "rail",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "value-tick",
      visualModel: "tally-stroke-groups",
      motionModel: "stroke-draw-increment",
      layoutModel: "inline-wrap",
      semanticPurpose: "counting-display",
    },
    source: `"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface TallyGlyphCounterProps {
  value: number;
  /** Whether to show the numeral beside the marks. */
  numeral?: boolean;
  className?: string;
}

function TallyGroup({ index, filled }: { index: number; filled: boolean }) {
  return (
    <svg
      aria-hidden
      width="26"
      height="30"
      viewBox="0 0 26 30"
      className={cn("inline-block", !filled && "opacity-25")}
    >
      {[4, 9, 14, 19].map((x, i) => (
        <line
          key={i}
          x1={x}
          y1={4}
          x2={x}
          y2={26}
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          pathLength={1}
          style={filled ? { strokeDasharray: 1, animation: \`openui-tally-draw 160ms ease-out \${i * 60}ms both\` } : undefined}
        />
      ))}
      {filled && (
        <line
          x1="1"
          y1="22"
          x2="23"
          y2="7"
          stroke="#e2624a"
          strokeWidth="2.6"
          strokeLinecap="round"
          pathLength={1}
          style={{ strokeDasharray: 1, animation: "openui-tally-draw 200ms ease-out 260ms both" }}
        />
      )}
      <title>{\`group \${index + 1}\`}</title>
    </svg>
  );
}

export function TallyGlyphCounter({ value, numeral = true, className }: TallyGlyphCounterProps) {
  const groups = Math.ceil(value / 5);
  const [animatedValue, setAnimatedValue] = useState(0);
  const previous = useRef(0);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setAnimatedValue(value);
      previous.current = value;
      return;
    }
    // Tick up in steps of 5 so new groups draw one at a time.
    const step = value > previous.current ? 1 : -1;
    let current = previous.current;
    const timer = window.setInterval(() => {
      current += step;
      setAnimatedValue(current);
      if (current === value) {
        window.clearInterval(timer);
        previous.current = value;
      }
    }, 120);
    return () => window.clearInterval(timer);
  }, [value]);

  const visibleGroups = Math.ceil(animatedValue / 5);

  return (
    <span
      className={cn("inline-flex items-center gap-3", className)}
      role="status"
      aria-label={\`\${value} counted\`}
    >
      <span aria-hidden className="flex max-w-md flex-wrap gap-1.5 text-ink">
        {Array.from({ length: Math.max(groups, 1) }, (_, index) => (
          <TallyGroup key={index} index={index} filled={index < visibleGroups} />
        ))}
      </span>
      {numeral && <span className="font-mono text-sm tabular-nums text-ink/70">{value}</span>}
      <style>{\`@keyframes openui-tally-draw { from { stroke-dashoffset: 1 } to { stroke-dashoffset: 0 } } @media (prefers-reduced-motion: reduce) { line { animation: none !important; stroke-dashoffset: 0 !important } }\`}</style>
    </span>
  );
}

export default TallyGlyphCounter;
`,
    demo: `import { useEffect, useState } from "react";
import { TallyGlyphCounter } from "./tally-glyph-counter";

export default function Demo() {
  const [value, setValue] = useState(12);

  useEffect(() => {
    const timer = window.setInterval(() => setValue((v) => (v >= 33 ? 3 : v + 3)), 1800);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-[13rem] items-center justify-center bg-paper p-10">
      <TallyGlyphCounter value={value} className="text-step-2" />
    </div>
  );
}
`,
  }),

  P("inline-diff-markup", {
    category: "text",
    subcategory: "data",
    title: "Inline Diff Markup",
    description:
      "Renders edits the way copyeditors mark them: insertions underlined in green, deletions struck in red — computed from a real word-level LCS diff, not hand-authored spans, so any two strings can be compared.",
    tags: ["diff", "lcs", "editing", "compare"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "duotone",
    },
    fingerprint: {
      interactionModel: "static",
      visualModel: "lcs-word-diff",
      motionModel: "none",
      layoutModel: "block",
      semanticPurpose: "change-review",
    },
    source: `import { cn } from "@/lib/cn";

export interface InlineDiffMarkupProps {
  before: string;
  after: string;
  className?: string;
}

type Op = { type: "same" | "insert" | "delete"; word: string };

/** Word-level longest-common-subsequence diff. */
export function diffWords(before: string, after: string): Op[] {
  const a = before.split(/\\s+/);
  const b = after.split(/\\s+/);
  const lcs: number[][] = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));

  for (let i = a.length - 1; i >= 0; i--) {
    for (let j = b.length - 1; j >= 0; j--) {
      lcs[i]![j] = a[i] === b[j] ? (lcs[i + 1]?.[j + 1] ?? 0) + 1 : Math.max(lcs[i + 1]?.[j] ?? 0, lcs[i]?.[j + 1] ?? 0);
    }
  }

  const ops: Op[] = [];
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      ops.push({ type: "same", word: a[i]! });
      i++;
      j++;
    } else if ((lcs[i + 1]?.[j] ?? 0) >= (lcs[i]?.[j + 1] ?? 0)) {
      ops.push({ type: "delete", word: a[i]! });
      i++;
    } else {
      ops.push({ type: "insert", word: b[j]! });
      j++;
    }
  }
  while (i < a.length) {
    ops.push({ type: "delete", word: a[i]! });
    i++;
  }
  while (j < b.length) {
    ops.push({ type: "insert", word: b[j]! });
    j++;
  }
  return ops;
}

export function InlineDiffMarkup({ before, after, className }: InlineDiffMarkupProps) {
  const ops = diffWords(before, after);

  return (
    <p className={cn("max-w-prose font-mono text-sm leading-loose", className)} role="doc-diff">
      {ops.map((op, index) => {
        if (op.type === "same") return <span key={index}>{op.word} </span>;
        if (op.type === "insert") {
          return (
            <span key={index} className="rounded-sm bg-emerald-500/10 px-0.5 text-emerald-700 underline decoration-emerald-500 decoration-2">
              {op.word}{" "}
            </span>
          );
        }
        return (
          <span key={index} className="rounded-sm bg-red-500/10 px-0.5 text-red-700 line-through decoration-red-500 decoration-2" aria-label={\`deleted: \${op.word}\`}>
            {op.word}{" "}
          </span>
        );
      })}
    </p>
  );
}

export default InlineDiffMarkup;
`,
    demo: `import { InlineDiffMarkup } from "./inline-diff-markup";

export default function Demo() {
  return (
    <div className="flex min-h-[13rem] items-center justify-center bg-paper p-10">
      <InlineDiffMarkup
        before="the quick brown fox jumps over the lazy dog"
        after="the quick red fox leaps over the sleepy dog"
      />
    </div>
  );
}
`,
  }),

  P("wax-seal-stamp", {
    category: "text",
    subcategory: "editorial",
    title: "Wax Seal Stamp",
    description:
      "An initials monogram pressed into a wax disc: radial-gradient wax with irregular blob edge (border-radius trick), debossed lettering via inner shadows, and a press animation on click that re-stamps the seal.",
    tags: ["seal", "wax", "monogram", "stamp"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "luxury",
      macrostructure: "stack",
      density: "dense",
      shapeLanguage: "soft",
      motionLanguage: "subtle",
      typographyStyle: "serif-display",
      colorStrategy: "muted-earth",
    },
    fingerprint: {
      interactionModel: "click-restamp",
      visualModel: "debossed-wax-disc",
      motionModel: "press-imprint",
      layoutModel: "badge",
      semanticPurpose: "authenticity-mark",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface WaxSealStampProps {
  /** One or two initials pressed into the wax. */
  initials: string;
  /** Wax colour. */
  wax?: string;
  className?: string;
}

export function WaxSealStamp({ initials, wax = "#a03c2e", className }: WaxSealStampProps) {
  const [stamps, setStamps] = useState(0);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  return (
    <button
      type="button"
      onClick={() => setStamps((value) => value + 1)}
      className={cn(
        "flex h-28 w-28 cursor-pointer items-center justify-center rounded-[46%_54%_52%_48%/54%_46%_52%_48%] border-0",
        className,
      )}
      aria-label={\`Seal stamped with \${initials}\`}
      style={{
        background: \`radial-gradient(circle at 32% 30%, color-mix(in oklab, \${wax}, white 24%), \${wax} 58%, color-mix(in oklab, \${wax}, black 30%))\`,
        boxShadow: "0 4px 10px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.25), inset 0 -3px 6px rgba(0,0,0,0.3)",
      }}
    >
      <span
        key={stamps}
        aria-hidden
        className="font-display text-2xl"
        style={{
          color: "color-mix(in oklab, black, transparent 55%)",
          textShadow: "0 1px 1px rgba(255,255,255,0.35), 0 -1px 1px rgba(0,0,0,0.4)",
          letterSpacing: "0.05em",
          animation: stamps > 0 && !reduced ? "openui-press 380ms cubic-bezier(0.2, 0, 0, 1)" : undefined,
        }}
      >
        {initials}
      </span>
      <style>{\`@keyframes openui-press { 0% { transform: scale(1) } 35% { transform: scale(0.86) } 70% { transform: scale(1.06) } 100% { transform: scale(1) } } @media (prefers-reduced-motion: reduce) { span { animation: none !important } }\`}</style>
    </button>
  );
}

export default WaxSealStamp;
`,
    demo: `import { WaxSealStamp } from "./wax-seal-stamp";

export default function Demo() {
  return (
    <div className="flex min-h-[15rem] items-center justify-center bg-paper p-10">
      <WaxSealStamp initials="OU" />
    </div>
  );
}
`,
  }),

  P("rsvp-speed-reader", {
    category: "text",
    subcategory: "accessible",
    title: "RSVP Speed Reader",
    description:
      "Rapid Serial Visual Presentation: words flash one at a time at a fixed focal point with the optimal recognition letter (ORP) highlighted in red, play/pause and WPM control — reading 400 wpm without moving your eyes.",
    tags: ["rsvp", "speed-reading", "wpm", "orp"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "accent-only",
    },
    fingerprint: {
      interactionModel: "playback-control",
      visualModel: "single-word-focus",
      motionModel: "fixed-interval-flash",
      layoutModel: "stack",
      semanticPurpose: "speed-reading",
    },
    source: `"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface RsvpSpeedReaderProps {
  text: string;
  /** Words per minute. */
  wpm?: number;
  className?: string;
}

/** Index of the optimal recognition point (~1/3 into the word). */
function orpIndex(word: string): number {
  if (word.length <= 1) return 0;
  if (word.length <= 5) return 1;
  return Math.floor(word.length / 3) + 1;
}

export function RsvpSpeedReader({ text, wpm = 300, className }: RsvpSpeedReaderProps) {
  const words = text.split(/\\s+/).filter(Boolean);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(wpm);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (!playing) return;
    const interval = 60000 / speed;
    timer.current = window.setInterval(() => {
      setIndex((value) => {
        if (value + 1 >= words.length) {
          setPlaying(false);
          return value;
        }
        return value + 1;
      });
    }, interval);
    return () => {
      if (timer.current !== null) window.clearInterval(timer.current);
    };
  }, [playing, speed, words.length]);

  const word = words[index] ?? "";
  const orp = orpIndex(word);
  const pivotOffset = Math.min(orp * 0.6, 10); // ch units the pivot shifts left

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div
        className="relative flex h-20 items-center justify-center overflow-hidden rounded-lg border border-line bg-ink font-mono"
        role="status"
        aria-label={playing ? \`Reading word \${index + 1} of \${words.length}: \${word}\` : \`Paused at word \${index + 1}\`}
      >
        <span aria-hidden className="absolute left-1/2 h-full w-px bg-line/40" />
        <span aria-hidden className="whitespace-pre text-2xl text-paper" style={{ transform: \`translateX(\${-pivotOffset}ch)\` }}>
          <span className="text-paper/70">{word.slice(0, orp)}</span>
          <span className="text-red-400">{word[orp]}</span>
          <span className="text-paper/70">{word.slice(orp + 1)}</span>
        </span>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setPlaying((value) => !value)}
          className="rounded-md border border-line px-3 py-1.5 font-mono text-sm hover:bg-line/20"
        >
          {playing ? "⏸" : "▶"}
        </button>
        <button
          type="button"
          onClick={() => {
            setPlaying(false);
            setIndex(0);
          }}
          className="rounded-md border border-line px-3 py-1.5 font-mono text-sm hover:bg-line/20"
        >
          ↺
        </button>
        <input
          type="range"
          min={150}
          max={700}
          step={25}
          value={speed}
          onChange={(event) => setSpeed(Number(event.target.value))}
          aria-label="Words per minute"
          className="w-40"
        />
        <span className="font-mono text-xs text-ink/60">{speed} wpm</span>
        <span className="font-mono text-xs text-ink/40 tabular-nums">
          {index + 1}/{words.length}
        </span>
      </div>
    </div>
  );
}

export default RsvpSpeedReader;
`,
    demo: `import { RsvpSpeedReader } from "./rsvp-speed-reader";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-10">
      <RsvpSpeedReader
        text="Speed reading works by removing the eye movement between words and presenting each one at a fixed point."
        wpm={320}
        className="w-full max-w-md"
      />
    </div>
  );
}
`,
  }),

  P("swatch-words", {
    category: "text",
    subcategory: "data",
    title: "Swatch Words",
    description:
      "Colour names rendered in their own colour with a click-to-copy chip: the word is the swatch, a miniature circular chip rides the baseline, and clicking copies the hex with a small toast — a palette you can read.",
    tags: ["color", "palette", "copy", "swatch"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "playful",
      macrostructure: "rail",
      density: "airy",
      shapeLanguage: "rounded",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "pastel",
    },
    fingerprint: {
      interactionModel: "click-copy",
      visualModel: "self-coloured-tokens",
      motionModel: "toast-confirm",
      layoutModel: "inline",
      semanticPurpose: "palette-display",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SwatchWord {
  name: string;
  hex: string;
}

export interface SwatchWordsProps {
  swatches: SwatchWord[];
  className?: string;
}

export function SwatchWords({ swatches, className }: SwatchWordsProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (swatch: SwatchWord) => {
    try {
      await navigator.clipboard.writeText(swatch.hex);
      setCopied(swatch.hex);
      window.setTimeout(() => setCopied(null), 1400);
    } catch {
      setCopied(null);
    }
  };

  return (
    <p className={cn("flex flex-wrap items-center gap-x-3 gap-y-2 text-lg", className)}>
      {swatches.map((swatch) => (
        <button
          key={swatch.hex}
          type="button"
          onClick={() => copy(swatch)}
          className="inline-flex cursor-pointer items-baseline gap-1.5 border-0 bg-transparent p-0 transition-transform hover:scale-105"
          aria-label={\`Copy \${swatch.name} \${swatch.hex}\`}
        >
          <span
            aria-hidden
            className="inline-block h-3.5 w-3.5 self-center rounded-full border border-black/10"
            style={{ background: swatch.hex }}
          />
          <span style={{ color: swatch.hex }} className="font-semibold">
            {swatch.name}
          </span>
        </button>
      ))}
      {copied && (
        <span role="status" className="rounded bg-ink px-2 py-0.5 font-mono text-xs text-paper" style={{ animation: "openui-toast 1400ms ease both" }}>
          {copied} copied
        </span>
      )}
      <style>{\`@keyframes openui-toast { 0% { opacity: 0; transform: translateY(4px) } 12% { opacity: 1; transform: translateY(0) } 88% { opacity: 1 } 100% { opacity: 0 } }\`}</style>
    </p>
  );
}

export default SwatchWords;
`,
    demo: `import { SwatchWords } from "./swatch-words";

export default function Demo() {
  return (
    <div className="flex min-h-[12rem] items-center justify-center bg-paper p-10">
      <SwatchWords
        swatches={[
          { name: "Terracotta", hex: "#c86a4a" },
          { name: "Sage", hex: "#8ba888" },
          { name: "Ink", hex: "#22252a" },
          { name: "Ochre", hex: "#d9a441" },
        ]}
      />
    </div>
  );
}
`,
  }),

  P("bidi-mirror-type", {
    category: "text",
    subcategory: "accessible",
    title: "Bidi Mirror Type",
    description:
      "A dual-direction type specimen: the same phrase rendered LTR and RTL simultaneously, with per-glyph mirroring toggle and automatic dir attribute handling — a working tool for checking internationalised typography.",
    tags: ["bidi", "rtl", "i18n", "specimen"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "editorial",
      macrostructure: "split",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "toggle-mirror",
      visualModel: "dual-direction-render",
      motionModel: "none",
      layoutModel: "split",
      semanticPurpose: "i18n-verification",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface BidiMirrorTypeProps {
  /** Left-to-right phrase. */
  ltr: string;
  /** Right-to-left phrase (rendered with dir="rtl"). */
  rtl: string;
  className?: string;
}

export function BidiMirrorType({ ltr, rtl, className }: BidiMirrorTypeProps) {
  const [mirrored, setMirrored] = useState(false);

  return (
    <div className={cn("flex flex-col gap-5", className)}>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-ink/50">dir=ltr</p>
          <p dir="ltr" className="text-2xl text-ink">
            {ltr}
          </p>
        </div>
        <div>
          <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-ink/50">dir=rtl</p>
          <p dir={mirrored ? "ltr" : "rtl"} className="text-2xl text-ink">
            {rtl}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setMirrored((value) => !value)}
        className="self-start rounded border border-line px-2 py-1 font-mono text-xs text-ink/70 hover:bg-line/20"
      >
        {mirrored ? "restore rtl" : "force ltr on rtl copy"}
      </button>
    </div>
  );
}

export default BidiMirrorType;
`,
    demo: `import { BidiMirrorType } from "./bidi-mirror-type";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-10">
      <BidiMirrorType ltr="Open source for everyone" rtl="مفتوح المصدر للجميع" />
    </div>
  );
}
`,
  }),

  P("reply-tree-thread", {
    category: "text",
    subcategory: "data",
    title: "Reply Tree Thread",
    description:
      "Discussion text structured as a tree: replies indent along ruled connector lines that draw in on expand, collapsed branches show reply counts, and the whole thread is keyboard-navigable with arrow keys.",
    tags: ["thread", "tree", "discussion", "keyboard"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "technical",
      macrostructure: "mosaic",
      density: "dense",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "humanist",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "expand-collapse-tree",
      visualModel: "ruled-branch-indent",
      motionModel: "connector-draw",
      layoutModel: "tree",
      semanticPurpose: "conversation",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ThreadNode {
  id: string;
  author: string;
  text: string;
  replies?: ThreadNode[];
}

export interface ReplyTreeThreadProps {
  root: ThreadNode;
  className?: string;
}

export function ReplyTreeThread({ root, className }: ReplyTreeThreadProps) {
  return (
    <div className={cn("text-sm", className)} role="tree" aria-label="Discussion thread">
      <Node node={root} depth={0} />
    </div>
  );
}

function countReplies(node: ThreadNode): number {
  return (node.replies ?? []).reduce((sum, reply) => sum + 1 + countReplies(reply), 0);
}

function Node({ node, depth }: { node: ThreadNode; depth: number }) {
  const [open, setOpen] = useState(depth < 2);
  const replies = node.replies ?? [];
  const hasReplies = replies.length > 0;

  return (
    <div role="treeitem" aria-expanded={hasReplies ? open : undefined} className="relative">
      <div className="flex items-start gap-2 py-1.5">
        {depth > 0 && <span aria-hidden className="mt-1 h-4 w-4 shrink-0 rounded-bl border-b border-l border-line" />}
        <div className="min-w-0 flex-1">
          <p className="text-ink">
            <span className="mr-2 font-semibold text-accent">{node.author}</span>
            {node.text}
          </p>
          {hasReplies && (
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              className="mt-1 font-mono text-xs text-ink/60 hover:text-ink"
            >
              {open ? "− hide" : \`+ \${countReplies(node)} repl\${countReplies(node) === 1 ? "y" : "ies"}\`}
            </button>
          )}
        </div>
      </div>
      {open && hasReplies && (
        <div className="ml-4 border-l border-line pl-4" role="group">
          {replies.map((reply) => (
            <Node key={reply.id} node={reply} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ReplyTreeThread;
`,
    demo: `import { ReplyTreeThread } from "./reply-tree-thread";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-10">
      <ReplyTreeThread
        root={{
          id: "1",
          author: "mira",
          text: "Should registries validate at build time?",
          replies: [
            {
              id: "2",
              author: "dev",
              text: "Yes — CI is the only place with real context.",
              replies: [{ id: "3", author: "sam", text: "Agreed, runtime checks are too late." }],
            },
            { id: "4", author: "ana", text: "Both: cheap checks runtime, deep checks in CI." },
          ],
        }}
        className="w-full max-w-lg"
      />
    </div>
  );
}
`,
  }),
];

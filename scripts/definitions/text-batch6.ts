import type { ResourceDefinition } from "../lib/definitions.js";

/**
 * Text batch 6 — ten further techniques: underhand ink underline draw, census
 * bar chart heading, balloon help tooltips per word, inline dropdown insert,
 * password strength wordmark, sight-size ruler, cutout ransom collage,
 * firework pop glyphs, braille dual-render and character wheel.
 */

const P = (name: string, definition: Omit<ResourceDefinition, "name">): ResourceDefinition => ({
  name,
  ...definition,
});

export default [
  P("ink-underline-draw", {
    category: "text",
    subcategory: "interactive",
    title: "Ink Underline Draw",
    description:
      "Link underline drawn like a felt-tip stroke: an SVG path whose stroke-dashoffset animates left-to-right with a hand-drawn wobble, thicker in the middle, retraced in reverse when the pointer leaves.",
    tags: ["underline", "svg", "link", "ink"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "editorial",
      macrostructure: "rail",
      density: "airy",
      shapeLanguage: "soft",
      motionLanguage: "expressive",
      typographyStyle: "humanist",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "hover-draw",
      visualModel: "svg-stroke-decoration",
      motionModel: "dash-offset-trace",
      layoutModel: "inline",
      semanticPurpose: "link-emphasis",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface InkUnderlineDrawProps {
  children: string;
  href?: string;
  /** Stroke colour. */
  ink?: string;
  className?: string;
}

export function InkUnderlineDraw({ children, href = "#", ink = "#e2624a", className }: InkUnderlineDrawProps) {
  return (
    <a href={href} className={cn("group relative inline-block", className)}>
      <span className="text-ink">{children}</span>
      <svg
        aria-hidden
        className="absolute -bottom-1.5 left-0 w-full"
        height="8"
        viewBox="0 0 100 8"
        preserveAspectRatio="none"
      >
        <path
          d="M1 5 Q 25 2.4 50 4 T 99 3.6"
          fill="none"
          stroke={ink}
          strokeWidth="2.4"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          style={{
            strokeDashoffset: 1,
            transition: "stroke-dashoffset 460ms cubic-bezier(0.2, 0, 0, 1)",
          }}
        />
      </svg>
      <style>{\`a:hover svg path, a:focus-visible svg path { stroke-dashoffset: 0 !important } @media (prefers-reduced-motion: reduce) { svg path { transition: none !important; stroke-dashoffset: 0 !important } }\`}</style>
    </a>
  );
}

export default InkUnderlineDraw;
`,
    demo: `import { InkUnderlineDraw } from "./ink-underline-draw";

export default function Demo() {
  return (
    <div className="flex min-h-[10rem] items-center justify-center bg-paper p-10">
      <p className="text-lg text-ink">
        Read the <InkUnderlineDraw>manifesto</InkUnderlineDraw> before contributing.
      </p>
    </div>
  );
}
`,
  }),

  P("census-bar-heading", {
    category: "text",
    subcategory: "data",
    title: "Census Bar Heading",
    description:
      "A headline where each word carries a data bar underneath whose width encodes a value — typography and chart fused into one element, so a sentence can literally show its own distribution.",
    tags: ["chart", "data", "bars", "heading"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "swiss",
      macrostructure: "rail",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "hover-readout",
      visualModel: "glyph-plus-bar-fusion",
      motionModel: "grow-in-view",
      layoutModel: "inline",
      semanticPurpose: "data-headline",
    },
    source: `"use client";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/cn";

export interface CensusBarHeadingProps {
  /** Words with the value each bar encodes. */
  words: Array<{ word: string; value: number }>;
  /** Colour of the bars. */
  bar?: string;
  className?: string;
}

export function CensusBarHeading({ words, bar = "#e2624a", className }: CensusBarHeadingProps) {
  const { ref, inView } = useInView<HTMLHeadingElement>({ once: true });
  const max = Math.max(...words.map((entry) => entry.value), 1);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const grown = inView || Boolean(reduced);

  return (
    <h2 ref={ref} className={cn("flex flex-wrap items-end gap-x-4 gap-y-3", className)} aria-label={words.map((entry) => entry.word).join(" ")}>
      {words.map((entry, index) => (
        <span key={index} aria-hidden className="group inline-flex flex-col">
          <span className="font-display leading-none">{entry.word}</span>
          <span className="mt-1.5 h-1.5 w-full bg-line/40">
            <span
              className="block h-full"
              title={String(entry.value)}
              style={{
                width: grown ? \`\${(entry.value / max) * 100}%\` : "0%",
                background: bar,
                transition: \`width 700ms cubic-bezier(0.2, 0, 0, 1) \${index * 90}ms\`,
              }}
            />
          </span>
          <span className="sr-only">{entry.value}</span>
        </span>
      ))}
    </h2>
  );
}

export default CensusBarHeading;
`,
    demo: `import { CensusBarHeading } from "./census-bar-heading";

export default function Demo() {
  return (
    <div className="flex min-h-[13rem] items-center justify-center bg-paper p-10">
      <CensusBarHeading
        words={[
          { word: "Fast", value: 92 },
          { word: "small", value: 41 },
          { word: "proven", value: 78 },
        ]}
        className="text-step-3 text-ink"
      />
    </div>
  );
}
`,
  }),

  P("word-help-balloons", {
    category: "text",
    subcategory: "interactive",
    title: "Word Help Balloons",
    description:
      "Dotted-underline terms that open small paper balloons on focus or hover with a definition, arrow and all — real popover semantics (button + role), not a CSS-only mirage, so keyboard users get the same affordance.",
    tags: ["tooltip", "glossary", "balloon", "a11y"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "editorial",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "humanist",
      colorStrategy: "muted-earth",
    },
    fingerprint: {
      interactionModel: "focus-popover",
      visualModel: "annotated-terms",
      motionModel: "scale-in-pop",
      layoutModel: "inline",
      semanticPurpose: "inline-glossary",
    },
    source: `"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";

export interface WordHelpBalloonsProps {
  /** Segments: plain strings, or { term, definition } objects. */
  segments: Array<string | { term: string; definition: string }>;
  className?: string;
}

export function WordHelpBalloons({ segments, className }: WordHelpBalloonsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <p className={cn("max-w-prose leading-relaxed", className)}>
      {segments.map((segment, index) => {
        if (typeof segment === "string") return <span key={index}>{segment} </span>;
        return <Balloon key={index} index={index} term={segment.term} definition={segment.definition} open={openIndex === index} onToggle={(next) => setOpenIndex(next ? index : null)} />;
      })}
    </p>
  );
}

function Balloon({
  index,
  term,
  definition,
  open,
  onToggle,
}: {
  index: number;
  term: string;
  definition: string;
  open: boolean;
  onToggle: (open: boolean) => void;
}) {
  const id = useId();
  return (
    <span className="relative inline-block">
      <button
        type="button"
        aria-expanded={open}
        aria-describedby={open ? id : undefined}
        onClick={() => onToggle(!open)}
        onMouseEnter={() => onToggle(true)}
        onMouseLeave={() => onToggle(false)}
        onFocus={() => onToggle(true)}
        onBlur={() => onToggle(false)}
        className="cursor-help border-0 bg-transparent p-0 underline decoration-dotted decoration-2 underline-offset-4"
      >
        {term}
      </button>
      <span
        id={id}
        role="tooltip"
        className={cn(
          "absolute bottom-full left-1/2 z-10 mb-2 w-56 -translate-x-1/2 rounded-md border border-line bg-paper p-3 text-xs leading-relaxed text-ink shadow-lg",
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0",
        )}
        style={{ transition: "opacity 140ms ease, transform 140ms ease", transformOrigin: "bottom center" }}
      >
        {definition}
      </span>
    </span>
  );
}

export default WordHelpBalloons;
`,
    demo: `import { WordHelpBalloons } from "./word-help-balloons";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-10">
      <WordHelpBalloons
        segments={[
          "Every registry item ships with a",
          { term: "fingerprint", definition: "Five axes describing interaction, rendering, motion, layout and purpose." },
          "so near-duplicates are refused at validation time.",
        ]}
        className="text-ink"
      />
    </div>
  );
}
`,
  }),

  P("inline-swap-sentence", {
    category: "text",
    subcategory: "interactive",
    title: "Inline Swap Sentence",
    description:
      "A sentence with one clickable word that cycles through alternatives on click — a live copy-testing widget where the sentence grammar stays intact and the swapped word rolls in with a vertical slide.",
    tags: ["swap", "cycle", "copy", "inline"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "playful",
      macrostructure: "stack",
      density: "airy",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "click-cycle",
      visualModel: "inline-slot-swap",
      motionModel: "vertical-slide",
      layoutModel: "inline",
      semanticPurpose: "copy-exploration",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface InlineSwapSentenceProps {
  /** Split as [before, SWAP, after]; the middle is the cycling word. */
  before: string;
  after: string;
  options: string[];
  className?: string;
}

export function InlineSwapSentence({ before, after, options, className }: InlineSwapSentenceProps) {
  const [index, setIndex] = useState(0);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  return (
    <p className={cn("max-w-prose text-lg", className)}>
      {before}{" "}
      <button
        type="button"
        onClick={() => setIndex((value) => (value + 1) % options.length)}
        className="relative inline-flex overflow-hidden border-0 bg-transparent p-0 font-semibold text-accent underline decoration-wavy underline-offset-4"
        aria-label={\`Alternative for word: \${options.join(", ")}\`}
      >
        <span
          aria-hidden
          key={index}
          style={{
            display: "inline-block",
            animation: reduced ? undefined : "openui-swap-in 280ms cubic-bezier(0.2, 0, 0, 1)",
          }}
        >
          {options[index]}
        </span>
      </button>{" "}
      {after}
      <style>{\`@keyframes openui-swap-in { 0% { transform: translateY(0.7em); opacity: 0 } 100% { transform: translateY(0); opacity: 1 } }\`}</style>
      <span className="sr-only">{options[index]}</span>
    </p>
  );
}

export default InlineSwapSentence;
`,
    demo: `import { InlineSwapSentence } from "./inline-swap-sentence";

export default function Demo() {
  return (
    <div className="flex min-h-[11rem] items-center justify-center bg-paper p-10">
      <InlineSwapSentence
        before="Design systems should feel"
        after="to the people who use them."
        options={["inevitable", "honest", "quick", "yours"]}
        className="text-ink"
      />
    </div>
  );
}
`,
  }),

  P("password-strength-mark", {
    category: "text",
    subcategory: "data",
    title: "Password Strength Mark",
    description:
      "A wordmark that grades itself: the word STRENGTH renders letter-by-letter, and how many letters are inked versus ghosted encodes password score — typography doubling as a meter without a single bar.",
    tags: ["meter", "password", "grading", "security"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "accent-only",
    },
    fingerprint: {
      interactionModel: "value-driven-reveal",
      visualModel: "partial-glyph-inking",
      motionModel: "step-ink-fill",
      layoutModel: "inline",
      semanticPurpose: "strength-meter",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface PasswordStrengthMarkProps {
  /** Score 0–4. */
  score: number;
  /** The word sliced into 5 reveal units. */
  word?: string;
  className?: string;
}

const LEVEL_LABELS = ["empty", "weak", "fair", "good", "strong"] as const;

export function PasswordStrengthMark({ score, word = "STRENGTH", className }: PasswordStrengthMarkProps) {
  const units = [...word];
  const litCount = Math.round((score / 4) * units.length);

  return (
    <span
      className={cn("inline-flex select-none items-baseline gap-3 font-mono", className)}
      role="meter"
      aria-valuenow={score}
      aria-valuemin={0}
      aria-valuemax={4}
      aria-label={\`Password strength: \${LEVEL_LABELS[score]}\`}
    >
      {units.map((char, index) => (
        <span
          key={index}
          aria-hidden
          style={{
            color: index < litCount ? "currentColor" : "color-mix(in oklab, currentColor, transparent 78%)",
            transition: "color 220ms ease",
          }}
        >
          {char}
        </span>
      ))}
      <span className="text-xs uppercase tracking-widest opacity-70">{LEVEL_LABELS[score]}</span>
    </span>
  );
}

export default PasswordStrengthMark;
`,
    demo: `import { useEffect, useState } from "react";
import { PasswordStrengthMark } from "./password-strength-mark";

export default function Demo() {
  const scores = [0, 1, 2, 3, 4];
  const [index, setIndex] = useState(2);

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % scores.length), 1400);
    return () => window.clearInterval(timer);
  }, [scores.length]);

  return (
    <div className="flex min-h-[11rem] items-center justify-center bg-paper p-10">
      <PasswordStrengthMark score={scores[index]!} className="text-step-3 text-ink" />
    </div>
  );
}
`,
  }),

  P("sight-size-ruler", {
    category: "text",
    subcategory: "editorial",
    title: "Sight Size Ruler",
    description:
      "Specimen typography wrapped in a working ruler: cap-height, x-height and baseline rules are drawn to scale behind the glyphs, and hovering a rule calls out its name — type anatomy as an interactive diagram.",
    tags: ["specimen", "anatomy", "ruler", "diagram"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "hover-callout",
      visualModel: "metric-rule-overlay",
      motionModel: "none",
      layoutModel: "stack",
      semanticPurpose: "type-education",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

const RULES = [
  { name: "cap height", top: "0%" },
  { name: "x-height", top: "24%" },
  { name: "baseline", top: "76%" },
] as const;

export interface SightSizeRulerProps {
  children: string;
  /** Specimen size in px. */
  size?: number;
  className?: string;
}

export function SightSizeRuler({ children, size = 96, className }: SightSizeRulerProps) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <figure className={cn("relative inline-block", className)}>
      <figcaption className="mb-3 font-mono text-xs uppercase tracking-widest text-ink/60">
        Sight-size · {size}px
      </figcaption>
      <div className="relative" style={{ fontSize: size, lineHeight: 1 }}>
        <span className="relative z-10 font-display text-ink">{children}</span>
        {RULES.map((rule) => (
          <button
            key={rule.name}
            type="button"
            onMouseEnter={() => setActive(rule.name)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(rule.name)}
            onBlur={() => setActive(null)}
            className="absolute left-0 right-0 border-0 bg-transparent p-0"
            style={{ top: \`calc(\${rule.top} + 0.14em)\` }}
            aria-label={\`Show \${rule.name}\`}
          >
            <span
              className="block w-full border-t"
              style={{
                borderColor: active === rule.name ? "#e2624a" : "color-mix(in oklab, currentColor, transparent 72%)",
                borderStyle: rule.name === "baseline" ? "solid" : "dashed",
              }}
            />
            <span
              className="absolute right-0 -top-5 font-mono text-[10px] uppercase tracking-widest"
              style={{ opacity: active === rule.name ? 1 : 0, color: "#e2624a", transition: "opacity 120ms ease" }}
            >
              {rule.name}
            </span>
          </button>
        ))}
      </div>
    </figure>
  );
}

export default SightSizeRuler;
`,
    demo: `import { SightSizeRuler } from "./sight-size-ruler";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-10">
      <SightSizeRuler>Hamburg</SightSizeRuler>
    </div>
  );
}
`,
  }),

  P("ransom-collage-note", {
    category: "text",
    subcategory: "editorial",
    title: "Ransom Collage Note",
    description:
      "Each glyph is clipped from its own 'scrap' — deterministic per-index rotation, paper tone, serif/sans alternation and tape strip — so the collage is chaotic to the eye but reproducible to the pixel across renders.",
    tags: ["collage", "cutout", "scrap", "deterministic"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "brutalist",
      macrostructure: "scatter",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "muted-earth",
    },
    fingerprint: {
      interactionModel: "static",
      visualModel: "per-glyph-collage-scrap",
      motionModel: "none",
      layoutModel: "inline",
      semanticPurpose: "protest-statement",
    },
    source: `import { cn } from "@/lib/cn";

export interface RansomCollageNoteProps {
  children: string;
  className?: string;
}

const PAPERS = ["#f5efe3", "#efe6d2", "#f8f4ea", "#ece2cc"];
const ROTATIONS = [-4, 3, -2, 5, -3, 2];

export function RansomCollageNote({ children, className }: RansomCollageNoteProps) {
  let seed = 0;
  const next = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  return (
    <span
      className={cn("inline-flex flex-wrap items-baseline", className)}
      role="text"
      aria-label={children}
    >
      {[...children].map((char, index) => {
        if (char === " ") return <span key={index} className="w-3" />;
        const rotation = ROTATIONS[index % ROTATIONS.length]!;
        const paper = PAPERS[Math.floor(next() * PAPERS.length)]!;
        const serif = index % 2 === 0;
        return (
          <span
            key={index}
            aria-hidden
            className="relative mx-[1px] inline-block px-1.5 py-0.5 text-ink"
            style={{
              background: paper,
              transform: \`rotate(\${rotation}deg) translateY(\${(next() * 4 - 2).toFixed(1)}px)\`,
              fontFamily: serif ? "Georgia, serif" : "system-ui, sans-serif",
              fontWeight: serif ? 400 : 700,
              boxShadow: "0 1px 2px rgba(0,0,0,0.22)",
            }}
          >
            {char}
            <span
              className="absolute -top-1 left-1/2 h-2 w-5 -translate-x-1/2"
              style={{ background: "rgba(222,205,166,0.85)", transform: \`translateX(-50%) rotate(\${rotation * -1.4}deg)\` }}
            />
          </span>
        );
      })}
    </span>
  );
}

export default RansomCollageNote;
`,
    demo: `import { RansomCollageNote } from "./ransom-collage-note";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-ink/90 p-10">
      <RansomCollageNote className="text-step-2">SHIP REAL THINGS</RansomCollageNote>
    </div>
  );
}
`,
  }),

  P("firework-pop-glyphs", {
    category: "text",
    subcategory: "kinetic",
    title: "Firework Pop Glyphs",
    description:
      "Celebration typography: on trigger, each glyph fires once — pops upward with rotation, bursts into two spark pseudo-elements that fly apart, then the glyph re-seats with an overshoot settle. One shot per click.",
    tags: ["celebration", "burst", "firework", "one-shot"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "playful",
      macrostructure: "rail",
      density: "airy",
      shapeLanguage: "rounded",
      motionLanguage: "expressive",
      typographyStyle: "variable-poster",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "click-trigger-one-shot",
      visualModel: "glyph-burst-sparks",
      motionModel: "pop-overshoot-settle",
      layoutModel: "inline",
      semanticPurpose: "celebration-heading",
    },
    source: `"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface FireworkPopGlyphsProps {
  children: string;
  className?: string;
}

export function FireworkPopGlyphs({ children, className }: FireworkPopGlyphsProps) {
  const [burst, setBurst] = useState(0);
  const reduced = useRef(
    typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
  );

  return (
    <button
      type="button"
      onClick={() => setBurst((value) => value + 1)}
      className={cn("inline-block cursor-pointer select-none border-0 bg-transparent p-0", className)}
      aria-label={\`\${children} (fire)\`}
    >
      {[...children].map((char, index) => (
        <span key={index} aria-hidden className="relative inline-block">
          <span
            key={burst}
            className="inline-block"
            style={{
              animation:
                burst > 0 && !reduced.current
                  ? \`openui-pop 620ms cubic-bezier(0.34, 1.56, 0.64, 1) \${index * 45}ms\`
                  : undefined,
            }}
          >
            {char === " " ? "\\u00A0" : char}
          </span>
          <span
            key={\`spark-\${burst}-\${index}\`}
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-accent"
            style={{
              animation:
                burst > 0 && !reduced.current
                  ? \`openui-spark 520ms ease-out \${index * 45}ms\`
                  : undefined,
              opacity: 0,
            }}
          />
        </span>
      ))}
      <style>{\`
        @keyframes openui-pop { 0% { transform: translateY(0) } 30% { transform: translateY(-14px) rotate(6deg) } 100% { transform: translateY(0) rotate(0) } }
        @keyframes openui-spark { 0% { opacity: 1; transform: translate(-50%, -50%) scale(1) } 100% { opacity: 0; transform: translate(calc(-50% + 22px), -260%) scale(0.4) } }
        @media (prefers-reduced-motion: reduce) { * { animation: none !important } }
      \`}</style>
    </button>
  );
}

export default FireworkPopGlyphs;
`,
    demo: `import { FireworkPopGlyphs } from "./firework-pop-glyphs";

export default function Demo() {
  return (
    <div className="flex min-h-[13rem] items-center justify-center bg-paper p-10">
      <FireworkPopGlyphs className="font-display text-step-4 text-ink">Hooray</FireworkPopGlyphs>
    </div>
  );
}
`,
  }),

  P("braille-dual-render", {
    category: "text",
    subcategory: "accessible",
    title: "Braille Dual Render",
    description:
      "Renders a phrase in both Latin type and Unicode braille side by side, with per-cell dot animation on value change and real screen-reader behaviour (Latin spoken, braille aria-hidden decoration).",
    tags: ["braille", "accessible", "dual", "dot-matrix"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "value-sync",
      visualModel: "dual-script-render",
      motionModel: "dot-cascade",
      layoutModel: "stacked",
      semanticPurpose: "inclusive-display",
    },
    source: `"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const MAP: Record<string, string> = {
  a: "\\u2801", b: "\\u2803", c: "\\u2809", d: "\\u2819", e: "\\u2811", f: "\\u280b", g: "\\u281b",
  h: "\\u2813", i: "\\u280a", j: "\\u281a", k: "\\u2805", l: "\\u2807", m: "\\u280d", n: "\\u281d",
  o: "\\u2815", p: "\\u280f", q: "\\u281f", r: "\\u2817", s: "\\u280e", t: "\\u281e", u: "\\u2825",
  v: "\\u2827", w: "\\u283a", x: "\\u282d", y: "\\u283d", z: "\\u2835", " ": "\\u2800",
};

export interface BrailleDualRenderProps {
  children: string;
  className?: string;
}

export function BrailleDualRender({ children, className }: BrailleDualRenderProps) {
  const [dots, setDots] = useState(() => toBraille(children));

  useEffect(() => {
    setDots(toBraille(children));
  }, [children]);

  return (
    <span className={cn("inline-flex flex-col gap-2", className)}>
      <span className="font-display text-lg text-ink">{children}</span>
      <span aria-hidden className="select-none font-mono text-2xl leading-none tracking-[0.2em] text-ink/85">
        {dots}
      </span>
    </span>
  );
}

function toBraille(text: string): string {
  return [...text.toLowerCase()].map((char) => MAP[char] ?? "\\u2800").join("");
}

export default BrailleDualRender;
`,
    demo: `import { BrailleDualRender } from "./braille-dual-render";

export default function Demo() {
  return (
    <div className="flex min-h-[12rem] items-center justify-center bg-paper p-10">
      <BrailleDualRender>Open to all</BrailleDualRender>
    </div>
  );
}
`,
  }),

  P("character-wheel-picker", {
    category: "text",
    subcategory: "interactive",
    title: "Character Wheel Picker",
    description:
      "A slot-machine you drive: up/down arrows (or wheel) spin each character column independently through the alphabet with inertial easing, composing text letter by letter — an input mechanism, not an animation.",
    tags: ["wheel", "input", "picker", "columns"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "technical",
      macrostructure: "rail",
      density: "dense",
      shapeLanguage: "rounded",
      motionLanguage: "kinetic",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "wheel-and-key-input",
      visualModel: "independent-letter-columns",
      motionModel: "inertial-column-spin",
      layoutModel: "inline",
      semanticPurpose: "text-entry",
    },
    source: `"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/cn";

const CHARS = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");

export interface CharacterWheelPickerProps {
  length?: number;
  onChange?: (value: string) => void;
  className?: string;
}

export function CharacterWheelPicker({ length = 4, onChange, className }: CharacterWheelPickerProps) {
  const [indices, setIndices] = useState<number[]>(() => Array.from({ length }, () => 0));
  const momentum = useRef<number[]>(Array.from({ length }, () => 0));

  const step = (index: number, delta: number) => {
    setIndices((current) => {
      const next = [...current];
      next[index] = (((next[index] ?? 0) + delta) % CHARS.length + CHARS.length) % CHARS.length;
      onChange?.(next.map((i) => CHARS[i]).join(""));
      return next;
    });
  };

  return (
    <div
      className={cn("inline-flex select-none gap-1", className)}
      role="listbox"
      aria-label="Character wheel"
    >
      {indices.map((value, index) => (
        <div
          key={index}
          role="option"
          aria-selected
          tabIndex={0}
          className="flex h-12 w-10 cursor-ns-resize items-center justify-center rounded-md border border-line bg-paper font-mono text-xl text-ink outline-none focus-visible:ring-2 focus-visible:ring-accent"
          onWheel={(event) => {
            event.preventDefault();
            momentum.current[index] = (momentum.current[index] ?? 0) + (event.deltaY > 0 ? 1 : -1);
            step(index, event.deltaY > 0 ? 1 : -1);
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              step(index, 1);
            }
            if (event.key === "ArrowDown") {
              event.preventDefault();
              step(index, -1);
            }
          }}
        >
          <span
            key={value}
            style={{
              display: "inline-block",
              animation: "openui-wheel-tick 120ms ease-out",
            }}
          >
            {CHARS[value] === " " ? "\\u00A0" : CHARS[value]}
          </span>
        </div>
      ))}
      <style>{\`@keyframes openui-wheel-tick { 0% { transform: translateY(-0.35em); opacity: 0.4 } 100% { transform: translateY(0); opacity: 1 } }\`}</style>
    </div>
  );
}

export default CharacterWheelPicker;
`,
    demo: `import { CharacterWheelPicker } from "./character-wheel-picker";

export default function Demo() {
  return (
    <div className="flex min-h-[12rem] items-center justify-center bg-paper p-10">
      <CharacterWheelPicker length={5} />
    </div>
  );
}
`,
  }),
];

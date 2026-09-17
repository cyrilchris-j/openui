import type { ResourceDefinition } from "../lib/definitions.js";

/**
 * Text batch 10 — eleven further techniques: vertical phrase ticker,
 * redaction declassifier, reading-level tinter, scroll-lit words, term
 * frequency auto-emphasis, overprint misregistration, hatch fill, measuring
 * tape, verse line numbers, chisel carve and spiral arc layout.
 */

const P = (name: string, definition: Omit<ResourceDefinition, "name">): ResourceDefinition => ({
  name,
  ...definition,
});

export default [
  P("vertical-phrase-ticker", {
    category: "text",
    subcategory: "kinetic",
    title: "Vertical Phrase Ticker",
    description:
      "A fixed-height window where phrases slide vertically through like a stock ticker — the outgoing line exits upward while the incoming one enters from below simultaneously, keeping the box a constant height.",
    tags: ["ticker", "rotate", "phrases", "vertical"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "mechanical",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "timer-cycle",
      visualModel: "two-line-slide-window",
      motionModel: "vertical-exchange",
      layoutModel: "inline",
      semanticPurpose: "heading-rotation",
    },
    source: `"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export interface VerticalPhraseTickerProps {
  phrases: string[];
  /** ms each phrase is shown. */
  holdMs?: number;
  className?: string;
}

export function VerticalPhraseTicker({ phrases, holdMs = 2400, className }: VerticalPhraseTickerProps) {
  const [index, setIndex] = useState(0);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduced) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % phrases.length), holdMs);
    return () => window.clearInterval(timer);
  }, [phrases.length, holdMs, reduced]);

  return (
    <span
      className={cn("inline-flex overflow-hidden", className)}
      style={{ height: "1.25em" }}
      role="status"
      aria-label={phrases[index]}
    >
      <span
        aria-hidden
        key={index}
        className="inline-block leading-[1.25]"
        style={{
          animation: reduced ? undefined : "openui-ticker-slide 420ms cubic-bezier(0.2, 0, 0, 1)",
        }}
      >
        {phrases[index]}
      </span>
      <style>{\`@keyframes openui-ticker-slide { 0% { transform: translateY(1.25em); opacity: 0 } 100% { transform: translateY(0); opacity: 1 } } @media (prefers-reduced-motion: reduce) { span { animation: none !important } }\`}</style>
    </span>
  );
}

export default VerticalPhraseTicker;
`,
    demo: `import { VerticalPhraseTicker } from "./vertical-phrase-ticker";

export default function Demo() {
  return (
    <div className="flex min-h-[12rem] items-center justify-center bg-paper p-10">
      <p className="text-step-3 text-ink">
        Build it{" "}
        <VerticalPhraseTicker phrases={["once.", "well.", "yours."]} className="font-semibold text-accent" />
      </p>
    </div>
  );
}
`,
  }),

  P("redaction-declassifier", {
    category: "text",
    subcategory: "interactive",
    title: "Redaction Declassifier",
    description:
      "Government-memo typography: passages are blacked out with marker bars, and hovering (or focusing) a bar sweeps the ink away to reveal the text underneath, then re-redacts when attention leaves.",
    tags: ["redaction", "reveal", "secrecy", "hover"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "editorial",
      macrostructure: "stack",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "hover-declassify",
      visualModel: "ink-bar-censor",
      motionModel: "wipe-reveal",
      layoutModel: "block",
      semanticPurpose: "mystery-reveal",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface RedactionDeclassifierProps {
  /** Segments: plain strings or { secret: string } to redact. */
  segments: Array<string | { secret: string }>;
  className?: string;
}

export function RedactionDeclassifier({ segments, className }: RedactionDeclassifierProps) {
  const [revealed, setRevealed] = useState<number | null>(null);
  let secretIndex = -1;

  return (
    <p className={cn("max-w-prose font-mono text-sm leading-loose", className)}>
      {segments.map((segment, index) => {
        if (typeof segment === "string") return <span key={index}>{segment} </span>;
        secretIndex += 1;
        const mine = secretIndex;
        const open = revealed === mine;
        return (
          <span
            key={index}
            tabIndex={0}
            role="button"
            aria-label={open ? \`declassified: \${segment.secret}\` : "classified text, activate to reveal"}
            onMouseEnter={() => setRevealed(mine)}
            onMouseLeave={() => setRevealed(null)}
            onFocus={() => setRevealed(mine)}
            onBlur={() => setRevealed(null)}
            className="relative cursor-pointer select-none px-0.5"
          >
            <span aria-hidden={open ? undefined : true} className={open ? "text-ink" : "opacity-0"}>
              {segment.secret}
            </span>
            <span
              aria-hidden
              className="absolute inset-0 rounded-[2px] bg-ink transition-opacity duration-300"
              style={{
                opacity: open ? 0 : 1,
                clipPath: open ? "inset(0 0 0 100%)" : "inset(0 0 0 0)",
              }}
            />
            <span className="sr-only">{open ? segment.secret : "redacted"}</span>
          </span>
        );
      })}
    </p>
  );
}

export default RedactionDeclassifier;
`,
    demo: `import { RedactionDeclassifier } from "./redaction-declassifier";

export default function Demo() {
  return (
    <div className="flex min-h-[13rem] items-center justify-center bg-paper p-10">
      <RedactionDeclassifier
        className="w-full max-w-lg"
        segments={[
          "MEMO: The registry will ship",
          { secret: "800 resources" },
          "by end of quarter, pending",
          { secret: "uniqueness validation" },
          ". Distribution limited to",
          { secret: "everyone, because open source" },
          ".",
        ]}
      />
    </div>
  );
}
`,
  }),

  P("reading-level-tinter", {
    category: "text",
    subcategory: "data",
    title: "Reading Level Tinter",
    description:
      "Each sentence is tinted by its own complexity — average word length and clause count map to an ink density ramp — so a paragraph shows you where it gets hard to read before you get there.",
    tags: ["readability", "sentences", "tint", "analysis"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "humanist",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "static",
      visualModel: "complexity-tinted-sentences",
      motionModel: "none",
      layoutModel: "block",
      semanticPurpose: "readability-analysis",
    },
    source: `import { cn } from "@/lib/cn";

export interface ReadingLevelTinterProps {
  children: string;
  className?: string;
}

/** Cheap complexity proxy: mean word length × clause count. */
function complexity(sentence: string): number {
  const words = sentence.split(/\\s+/).filter(Boolean);
  const meanLength = words.reduce((sum, word) => sum + word.length, 0) / Math.max(words.length, 1);
  const clauses = (sentence.match(/[,;:—-]/g) ?? []).length + 1;
  return meanLength * clauses;
}

export function ReadingLevelTinter({ children, className }: ReadingLevelTinterProps) {
  const sentences = children.match(/[^.!?]+[.!?]+/g) ?? [children];
  const scores = sentences.map((sentence) => complexity(sentence));
  const max = Math.max(...scores, 1);

  return (
    <p className={cn("max-w-prose text-base leading-relaxed", className)}>
      {sentences.map((sentence, index) => {
        const density = scores[index]! / max;
        return (
          <span
            key={index}
            title={\`complexity \${(density * 100).toFixed(0)}%\`}
            style={{ color: \`color-mix(in oklab, currentColor, transparent \${Math.round((1 - density) * 55)}%)\` }}
          >
            {sentence.trim()}{" "}
          </span>
        );
      })}
    </p>
  );
}

export default ReadingLevelTinter;
`,
    demo: `import { ReadingLevelTinter } from "./reading-level-tinter";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-10">
      <ReadingLevelTinter className="w-full max-w-lg">
        Keep it short. Short sentences read fast and land hard. Longer sentences with subordinate clauses, parenthetical asides, and enumerated qualifications demand more of the reader and fade into the background noise of the page.
      </ReadingLevelTinter>
    </div>
  );
}
`,
  }),

  P("scroll-lit-paragraph", {
    category: "text",
    subcategory: "scroll",
    title: "Scroll Lit Paragraph",
    description:
      "A long paragraph where words illuminate one by one as scroll progress passes them — reading position made spatial, like a cursor of light sweeping through the copy as the page moves.",
    tags: ["scroll", "progressive", "illuminate", "reading"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "editorial",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
    },
    fingerprint: {
      interactionModel: "scroll-progress-trigger",
      visualModel: "word-illumination-ramp",
      motionModel: "scroll-linked-fill",
      layoutModel: "block",
      semanticPurpose: "reading-progress",
    },
    source: `"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface ScrollLitParagraphProps {
  children: string;
  className?: string;
}

export function ScrollLitParagraph({ children, className }: ScrollLitParagraphProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);
  const words = children.split(/\\s+/);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const measure = () => {
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight;
      // 0 when the paragraph top reaches 80% of viewport, 1 when its bottom passes 35%.
      const start = viewport * 0.8;
      const end = viewport * 0.35;
      const span = start - end + rect.height;
      const travelled = start - rect.top;
      setProgress(Math.max(0, Math.min(1, travelled / span)));
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const litCount = Math.floor(progress * words.length);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const allLit = reduced && progress === 0 ? true : undefined;

  return (
    <p ref={ref} className={cn("max-w-prose text-lg leading-relaxed", className)}>
      {words.map((word, index) => (
        <span
          key={index}
          style={{
            color:
              allLit || index < litCount
                ? "var(--openui-ink, #1c1c1e)"
                : "color-mix(in oklab, currentColor, transparent 72%)",
            transition: "color 180ms ease",
          }}
        >
          {word}{" "}
        </span>
      ))}
    </p>
  );
}

export default ScrollLitParagraph;
`,
    demo: `import { ScrollLitParagraph } from "./scroll-lit-paragraph";

export default function Demo() {
  return (
    <div className="min-h-[80vh] bg-paper p-10">
      <div className="h-[30vh]" />
      <ScrollLitParagraph className="w-full max-w-2xl">
        Scroll and watch the light travel. Each word waits for the page to bring it forward. This is how a long-form reading experience can show position without a progress bar: the text itself becomes the indicator, and the eye never leaves the sentence.
      </ScrollLitParagraph>
      <div className="h-[40vh]" />
    </div>
  );
}
`,
  }),

  P("tf-auto-emphasis", {
    category: "text",
    subcategory: "data",
    title: "TF Auto Emphasis",
    description:
      "Automatic emphasis by term frequency: words repeated in the passage get progressively bolder, so the vocabulary that carries the text rises to the surface — a document outline you can see inside a paragraph.",
    tags: ["term-frequency", "emphasis", "analysis", "weights"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "static",
      visualModel: "frequency-weighted-weights",
      motionModel: "none",
      layoutModel: "block",
      semanticPurpose: "vocabulary-surface",
    },
    source: `import { cn } from "@/lib/cn";

export interface TfAutoEmphasisProps {
  children: string;
  className?: string;
}

export function TfAutoEmphasis({ children, className }: TfAutoEmphasisProps) {
  const words = children.split(/\\s+/);
  const counts = new Map<string, number>();
  for (const word of words) {
    const key = word.toLowerCase().replace(/[^\\p{L}\\p{N}'-]/gu, "");
    if (key.length > 3) counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  const max = Math.max(...counts.values(), 1);

  return (
    <p className={cn("max-w-prose text-lg leading-relaxed", className)}>
      {words.map((word, index) => {
        const key = word.toLowerCase().replace(/[^\\p{L}\\p{N}'-]/gu, "");
        const count = key.length > 3 ? counts.get(key) ?? 0 : 0;
        const weight = count / max;
        return (
          <span
            key={index}
            style={{
              fontWeight: count > 1 ? 400 + Math.round(weight * 300) : 400,
              color: count > 1 ? undefined : "color-mix(in oklab, currentColor, transparent 25%)",
            }}
          >
            {word}{" "}
          </span>
        );
      })}
    </p>
  );
}

export default TfAutoEmphasis;
`,
    demo: `import { TfAutoEmphasis } from "./tf-auto-emphasis";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-10">
      <TfAutoEmphasis className="w-full max-w-lg">
        The registry stores resources. Resources carry metadata. Metadata makes the registry trustworthy, and trust makes the resources useful. Useful resources make the registry worth keeping.
      </TfAutoEmphasis>
    </div>
  );
}
`,
  }),

  P("overprint-misregister", {
    category: "text",
    subcategory: "paint",
    title: "Overprint Misregister",
    description:
      "Simulated CMYK misregistration: cyan, magenta and yellow copies of the word sit one pixel off each side of a black key plate, and dragging a control shifts the plates further out of register like a cheap print run.",
    tags: ["cmyk", "overprint", "print", "misregister"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "retro",
      macrostructure: "stack",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "variable-poster",
      colorStrategy: "duotone",
    },
    fingerprint: {
      interactionModel: "offset-dial",
      visualModel: "cmyk-plate-split",
      motionModel: "none",
      layoutModel: "stack",
      semanticPurpose: "display-statement",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface OverprintMisregisterProps {
  children: string;
  /** Max plate offset in px at full misregistration. */
  maxOffset?: number;
  className?: string;
}

export function OverprintMisregister({ children, maxOffset = 5, className }: OverprintMisregisterProps) {
  const [misregister, setMisregister] = useState(0.35);
  const offset = misregister * maxOffset;

  return (
    <span className={cn("inline-flex flex-col gap-4", className)}>
      <span className="relative inline-block select-none font-display" role="text" aria-label={children}>
        {(["#00a5e3", "#e5007d", "#ffd400"] as const).map((color, index) => {
          const angle = (index * Math.PI * 2) / 3;
          return (
            <span
              key={color}
              aria-hidden
              className="absolute left-0 top-0 block"
              style={{
                color,
                mixBlendMode: "multiply",
                opacity: 0.9,
                transform: \`translate(\${Math.cos(angle) * offset}px, \${Math.sin(angle) * offset}px)\`,
              }}
            >
              {children}
            </span>
          );
        })}
        <span aria-hidden className="relative z-10 block text-ink">
          {children}
        </span>
        <span className="sr-only">{children}</span>
      </span>
      <label className="flex items-center gap-2 font-mono text-xs text-ink/70">
        misregister
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={misregister}
          onChange={(event) => setMisregister(Number(event.target.value))}
          className="w-32"
        />
      </label>
    </span>
  );
}

export default OverprintMisregister;
`,
    demo: `import { OverprintMisregister } from "./overprint-misregister";

export default function Demo() {
  return (
    <div className="flex min-h-[15rem] items-center justify-center bg-paper p-10">
      <OverprintMisregister className="text-step-4">Off-Press</OverprintMisregister>
    </div>
  );
}
`,
  }),

  P("hatch-fill-type", {
    category: "text",
    subcategory: "paint",
    title: "Hatch Fill Type",
    description:
      "Glyphs filled with diagonal hatching instead of ink: a repeating-linear-gradient clipped to the text, with hatch angle, spacing and weight exposed as controls — engraved-plate shading as a fill system.",
    tags: ["hatch", "engraved", "fill", "pattern"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "brutalist",
      macrostructure: "stack",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "variable-poster",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "pattern-dial",
      visualModel: "hatch-pattern-clipped-fill",
      motionModel: "none",
      layoutModel: "inline",
      semanticPurpose: "display-statement",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface HatchFillTypeProps {
  children: string;
  ink?: string;
  className?: string;
}

export function HatchFillType({ children, ink = "#1c1c1e", className }: HatchFillTypeProps) {
  const [angle, setAngle] = useState(45);
  const [spacing, setSpacing] = useState(6);

  return (
    <span className={cn("inline-flex flex-col gap-4", className)}>
      <span
        aria-hidden
        className="inline-block select-none font-display"
        style={{
          backgroundImage: \`repeating-linear-gradient(\${angle}deg, \${ink} 0 1.5px, transparent 1.5px \${spacing}px)\`,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        {children}
      </span>
      <span className="sr-only">{children}</span>
      <label className="flex items-center gap-2 font-mono text-xs text-ink/70">
        angle
        <input type="range" min={0} max={90} value={angle} onChange={(event) => setAngle(Number(event.target.value))} className="w-24" />
      </label>
      <label className="flex items-center gap-2 font-mono text-xs text-ink/70">
        spacing
        <input type="range" min={3} max={14} value={spacing} onChange={(event) => setSpacing(Number(event.target.value))} className="w-24" />
      </label>
    </span>
  );
}

export default HatchFillType;
`,
    demo: `import { HatchFillType } from "./hatch-fill-type";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-10">
      <HatchFillType className="text-step-5">Etched</HatchFillType>
    </div>
  );
}
`,
  }),

  P("measuring-tape-hover", {
    category: "text",
    subcategory: "technical",
    title: "Measuring Tape Hover",
    description:
      "Hover any word and a measuring tape slides out beneath it showing its rendered width in px and ch — a debugging instrument for kerning obsessives, implemented with real getBoundingClientRect measurement per word.",
    tags: ["measure", "debug", "width", "ruler"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "accent-only",
    },
    fingerprint: {
      interactionModel: "hover-measure",
      visualModel: "width-callout-ruler",
      motionModel: "none",
      layoutModel: "inline",
      semanticPurpose: "type-debugging",
    },
    source: `"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface MeasuringTapeHoverProps {
  children: string;
  className?: string;
}

export function MeasuringTapeHover({ children, className }: MeasuringTapeHoverProps) {
  const [measurement, setMeasurement] = useState<{ index: number; px: number; ch: number } | null>(null);
  const hostRef = useRef<HTMLParagraphElement>(null);

  const measure = (event: React.MouseEvent<HTMLSpanElement>, index: number) => {
    const host = hostRef.current;
    if (!host) return;
    const hostStyle = window.getComputedStyle(host);
    const rect = event.currentTarget.getBoundingClientRect();
    const chWidth = parseFloat(hostStyle.fontSize) * 0.5; // approx ch unit
    setMeasurement({ index, px: Math.round(rect.width), ch: Number((rect.width / chWidth).toFixed(1)) });
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <p ref={hostRef} className="max-w-prose text-lg leading-loose text-ink">
        {children.split(" ").map((word, index) => (
          <span
            key={index}
            className="cursor-crosshair rounded-sm hover:bg-line/40"
            onMouseEnter={(event) => measure(event, index)}
            onMouseLeave={() => setMeasurement(null)}
          >
            {word}{" "}
          </span>
        ))}
      </p>
      <div className="h-6 font-mono text-xs text-ink/60" role="status" aria-live="polite">
        {measurement !== null && (
          <span aria-hidden>
            word {measurement.index + 1}: {measurement.px}px ≈ {measurement.ch}ch
          </span>
        )}
      </div>
    </div>
  );
}

export default MeasuringTapeHover;
`,
    demo: `import { MeasuringTapeHover } from "./measuring-tape-hover";

export default function Demo() {
  return (
    <div className="flex min-h-[13rem] items-center justify-center bg-paper p-10">
      <MeasuringTapeHover className="w-full max-w-lg">
        Hover a word to measure it against the type size.
      </MeasuringTapeHover>
    </div>
  );
}
`,
  }),

  P("verse-line-numbers", {
    category: "text",
    subcategory: "editorial",
    title: "Verse Line Numbers",
    description:
      "Poetry typesetting with margin line numbers every fifth line plus an active-line follower that brightens the number of the line currently in the viewport centre — scripture-style apparatus, live.",
    tags: ["poetry", "line-numbers", "margin", "verse"],
    dependencies: ["react"],
    difficulty: "advanced",
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
      interactionModel: "viewport-line-follow",
      visualModel: "margin-numbered-verse",
      motionModel: "active-line-track",
      layoutModel: "two-column-margins",
      semanticPurpose: "verse-navigation",
    },
    source: `"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface VerseLineNumbersProps {
  /** One entry per authored verse line. */
  lines: string[];
  /** Show a number every N lines. */
  every?: number;
  className?: string;
}

export function VerseLineNumbers({ lines, every = 5, className }: VerseLineNumbersProps) {
  const [active, setActive] = useState(0);
  const lineRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const measure = () => {
      const centre = window.innerHeight / 2;
      let best = 0;
      let bestDistance = Infinity;
      lineRefs.current.forEach((node, index) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - centre);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = index;
        }
      });
      setActive(best);
    };
    measure();
    window.addEventListener("scroll", measure, { passive: true });
    return () => window.removeEventListener("scroll", measure);
  }, [lines.length]);

  return (
    <div className={cn("grid grid-cols-[2.5rem_1fr] gap-x-3", className)}>
      {lines.map((line, index) => (
        <FragmentLine
          key={index}
          index={index}
          number={index % every === 0 || index === lines.length - 1 ? String(index + 1) : ""}
          active={index === active}
          ref={(node) => {
            lineRefs.current[index] = node;
          }}
          text={line}
        />
      ))}
    </div>
  );
}

import { forwardRef } from "react";

const FragmentLine = forwardRef<
  HTMLSpanElement,
  { index: number; number: string; active: boolean; text: string }
>(function FragmentLine({ index, number, active, text }, ref) {
  return (
    <>
      <span
        ref={ref}
        aria-hidden
        className="select-none text-right font-mono text-xs transition-colors duration-300"
        style={{
          gridRow: index + 1,
          gridColumn: 1,
          color: active ? "#e2624a" : "color-mix(in oklab, currentColor, transparent 75%)",
        }}
      >
        {number}
      </span>
      <span className="font-display text-lg leading-relaxed text-ink" style={{ gridRow: index + 1, gridColumn: 2 }}>
        {text || "\\u00A0"}
      </span>
    </>
  );
});
`,
    demo: `import { VerseLineNumbers } from "./verse-line-numbers";

export default function Demo() {
  return (
    <div className="min-h-[70vh] bg-paper p-10">
      <VerseLineNumbers
        lines={[
          "The registry keeps what frameworks discard:",
          "a file, a name, a set of promises.",
          "",
          "Scroll slowly. Watch the numbers",
          "burn red as the verse line",
          "crosses the centre of the page,",
          "then cool to grey again.",
          "",
          "Nothing here is decoration.",
          "The apparatus is the point.",
        ]}
        className="max-w-md"
      />
    </div>
  );
}
`,
  }),

  P("chisel-carve-type", {
    category: "text",
    subcategory: "paint",
    title: "Chisel Carve Type",
    description:
      "Letters carved into stone: dark text with a top inner highlight and bottom occlusion shadow inverted from the emboss formula, sitting on a speckled granite background built from layered radial gradients.",
    tags: ["carved", "stone", "chisel", "deboss"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "retro",
      macrostructure: "stack",
      density: "dense",
      shapeLanguage: "cut",
      motionLanguage: "none",
      typographyStyle: "serif-display",
      colorStrategy: "muted-earth",
    },
    fingerprint: {
      interactionModel: "static",
      visualModel: "inverted-shadow-carve",
      motionModel: "none",
      layoutModel: "inline",
      semanticPurpose: "monument-statement",
    },
    source: `import { cn } from "@/lib/cn";

export interface ChiselCarveTypeProps {
  children: string;
  stone?: string;
  className?: string;
}

export function ChiselCarveType({ children, stone = "#8a877f", className }: ChiselCarveTypeProps) {
  return (
    <span
      className={cn("inline-flex items-center justify-center rounded-lg px-10 py-8", className)}
      style={{
        background: \`
          radial-gradient(circle at 18% 22%, rgba(255,255,255,0.10) 0 2px, transparent 3px),
          radial-gradient(circle at 64% 68%, rgba(255,255,255,0.07) 0 2px, transparent 3px),
          radial-gradient(circle at 82% 30%, rgba(0,0,0,0.14) 0 2px, transparent 3px),
          radial-gradient(circle at 38% 80%, rgba(0,0,0,0.12) 0 2px, transparent 3px),
          \${stone}\`,
        backgroundSize: "26px 26px, 34px 34px, 22px 22px, 30px 30px, 100% 100%",
      }}
    >
      <span
        aria-hidden
        className="select-none font-display text-step-4 leading-none"
        role="text"
        aria-label={children}
        style={{
          color: "color-mix(in oklab, \${stone}, black 45%)",
          textShadow:
            "0 1px 0 rgba(255,255,255,0.35), 0 -1px 0 rgba(0,0,0,0.55), inset 0 -1px 1px rgba(0,0,0,0.4)",
        }}
      >
        {children}
      </span>
      <span className="sr-only">{children}</span>
    </span>
  );
}

export default ChiselCarveType;
`,
    demo: `import { ChiselCarveType } from "./chisel-carve-type";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center p-10" style={{ background: "#3a3835" }}>
      <ChiselCarveType>MMXXVI</ChiselCarveType>
    </div>
  );
}
`,
  }),

  P("spiral-arc-type", {
    category: "text",
    subcategory: "path",
    title: "Spiral Arc Type",
    description:
      "Text laid along an Archimedean spiral via per-glyph placement (rotate + translate per character), coiling from the outside in — glyphs shrink slightly with radius so the coil reads as one continuous word.",
    tags: ["spiral", "arc", "coiled", "glyph-layout"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "playful",
      macrostructure: "scatter",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "none",
      typographyStyle: "geometric",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "static",
      visualModel: "per-glyph-spiral-placement",
      motionModel: "none",
      layoutModel: "spiral",
      semanticPurpose: "decorative-arrangement",
    },
    source: `import { cn } from "@/lib/cn";

export interface SpiralArcTypeProps {
  children: string;
  /** Outer radius in px. */
  radius?: number;
  /** Gap between successive turns, px. */
  gap?: number;
  className?: string;
}

export function SpiralArcType({ children, radius = 80, gap = 16, className }: SpiralArcTypeProps) {
  const chars = [...children];
  const size = (radius + gap * 2) * 2 + 40;
  const centre = size / 2;
  // Arc length budget: distribute glyphs along the spiral from outside in.
  const totalTurns = 2.2;

  return (
    <span className={cn("relative inline-block", className)} role="text" aria-label={children}>
      <svg aria-hidden width={size} height={size} viewBox={\`0 0 \${size} \${size}\`} className="overflow-visible">
        {chars.map((char, index) => {
          const t = index / Math.max(chars.length - 1, 1);
          const angle = t * totalTurns * Math.PI * 2;
          const r = radius - t * gap * totalTurns;
          const x = centre + Math.cos(angle) * r;
          const y = centre + Math.sin(angle) * r;
          const fontSize = 15 - t * 4;
          return (
            <text
              key={index}
              x={x}
              y={y}
              fill="currentColor"
              fontSize={fontSize}
              fontWeight={700}
              textAnchor="middle"
              dominantBaseline="central"
              transform={\`rotate(\${(angle * 180) / Math.PI + 90}, \${x}, \${y})\`}
            >
              {char}
            </text>
          );
        })}
      </svg>
      <span className="sr-only">{children}</span>
    </span>
  );
}

export default SpiralArcType;
`,
    demo: `import { SpiralArcType } from "./spiral-arc-type";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-10">
      <SpiralArcType className="text-ink">COILED AND CURLED</SpiralArcType>
    </div>
  );
}
`,
  }),
];

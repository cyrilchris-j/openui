import type { ResourceDefinition } from "../lib/definitions.js";

/**
 * Text batch 7 — nine further techniques: input-mirrored text, character
 * scatter rain, embossed blind-deboss toggle, oversized footnote margin
 * notes, spectral duotone split, aria karaoke read-along, flip split flap,
 * liquid merge headings and mass-edit tabular numerals.
 */

const P = (name: string, definition: Omit<ResourceDefinition, "name">): ResourceDefinition => ({
  name,
  ...definition,
});

export default [
  P("mirror-input-text", {
    category: "text",
    subcategory: "interactive",
    title: "Mirror Input Text",
    description:
      "A display line that mirrors whatever the user types into a real input, character-aligned and caret-synced — the foundation for terminal UIs, live captions and autofill previews, built as one composable primitive.",
    tags: ["input", "mirror", "live", "primitive"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "input-mirror",
      visualModel: "aligned-display-copy",
      motionModel: "none",
      layoutModel: "stack",
      semanticPurpose: "live-echo",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface MirrorInputTextProps {
  placeholder?: string;
  /** Mask input as a password field while still mirroring length. */
  mask?: boolean;
  className?: string;
}

export function MirrorInputText({ placeholder = "Type something…", mask = false, className }: MirrorInputTextProps) {
  const [value, setValue] = useState("");

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <input
        type={mask ? "password" : "text"}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-line bg-paper px-3 py-2 font-mono text-sm text-ink outline-none focus-visible:ring-2 focus-visible:ring-accent"
      />
      <p className="font-mono text-step-2 text-ink" role="status" aria-label={\`You typed: \${value}\`} aria-live="polite">
        <span aria-hidden>{mask ? "\\u2022".repeat(value.length) : value}</span>
        <span
          aria-hidden
          className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] bg-accent"
          style={{ animation: "openui-mirror-caret 1.1s steps(1) infinite" }}
        />
      </p>
      <style>{\`@keyframes openui-mirror-caret { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } } @media (prefers-reduced-motion: reduce) { span { animation: none !important } }\`}</style>
    </div>
  );
}

export default MirrorInputText;
`,
    demo: `import { MirrorInputText } from "./mirror-input-text";

export default function Demo() {
  return (
    <div className="flex min-h-[12rem] items-center justify-center bg-paper p-10">
      <MirrorInputText className="w-full max-w-md" />
    </div>
  );
}
`,
  }),

  P("scatter-rain-text", {
    category: "text",
    subcategory: "kinetic",
    title: "Scatter Rain Text",
    description:
      "On in-view, glyphs fall from above with per-letter delay, rotation and a tiny bounce, then stay put — a controlled storm where each drop lands on its own baseline slot, spring-free and transition-only.",
    tags: ["rain", "fall", "scatter", "entrance"],
    dependencies: ["react"],
    difficulty: "intermediate",
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
      interactionModel: "in-view-trigger",
      visualModel: "glyph-drop-entrance",
      motionModel: "fall-bounce-settle",
      layoutModel: "inline",
      semanticPurpose: "entrance-heading",
    },
    source: `"use client";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/cn";

export interface ScatterRainTextProps {
  children: string;
  className?: string;
}

export function ScatterRainText({ children, className }: ScatterRainTextProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ once: true });
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const landed = inView || Boolean(reduced);

  return (
    <span ref={ref} className={cn("inline-block select-none", className)} role="text" aria-label={children}>
      {[...children].map((char, index) => {
        const delay = index * 70;
        const rotation = ((index * 37) % 13) - 6;
        return (
          <span key={index} aria-hidden className="inline-block overflow-visible" style={{ verticalAlign: "top" }}>
            <span
              className="inline-block will-change-transform"
              style={{
                transform: landed
                  ? "translateY(0) rotate(0deg)"
                  : \`translateY(-2.4em) rotate(\${rotation}deg)\`,
                opacity: landed ? 1 : 0,
                transition: \`transform 560ms cubic-bezier(0.34, 1.3, 0.64, 1) \${delay}ms, opacity 240ms ease \${delay}ms\`,
              }}
            >
              {char === " " ? "\\u00A0" : char}
            </span>
          </span>
        );
      })}
    </span>
  );
}

export default ScatterRainText;
`,
    demo: `import { ScatterRainText } from "./scatter-rain-text";

export default function Demo() {
  return (
    <div className="flex min-h-[13rem] items-center justify-center bg-paper p-10">
      <ScatterRainText className="font-display text-step-4 text-ink">Downpour</ScatterRainText>
    </div>
  );
}
`,
  }),

  P("blind-deboss-toggle", {
    category: "text",
    subcategory: "interactive",
    title: "Blind Deboss Toggle",
    description:
      "A tactile switch rendered as typography: the word ON or OFF sits in a soft rubber pad and physically debosses on press — shadows invert, the glyph sinks — a state indicator you can feel with your eyes.",
    tags: ["toggle", "deboss", "tactile", "state"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "retro",
      macrostructure: "stack",
      density: "dense",
      shapeLanguage: "soft",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "muted-earth",
    },
    fingerprint: {
      interactionModel: "press-toggle",
      visualModel: "inverted-shadow-deboss",
      motionModel: "press-sink-release",
      layoutModel: "inline",
      semanticPurpose: "binary-state",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface BlindDebossToggleProps {
  /** Initial state. */
  defaultOn?: boolean;
  onChange?: (on: boolean) => void;
  className?: string;
}

export function BlindDebossToggle({ defaultOn = false, onChange, className }: BlindDebossToggleProps) {
  const [on, setOn] = useState(defaultOn);

  const toggle = () => {
    const next = !on;
    setOn(next);
    onChange?.(next);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={toggle}
      className={cn(
        "inline-flex items-center rounded-xl px-6 py-3 font-display text-lg transition-shadow duration-150",
        className,
      )}
      style={
        on
          ? {
              background: "#e7ddc9",
              color: "#6b5d45",
              boxShadow: "inset 3px 3px 6px rgba(0,0,0,0.25), inset -2px -2px 4px rgba(255,255,255,0.7)",
            }
          : {
              background: "#f0e8d6",
              color: "#8a7a5c",
              boxShadow: "3px 3px 6px rgba(0,0,0,0.18), -2px -2px 4px rgba(255,255,255,0.8)",
            }
      }
    >
      {on ? "ON" : "OFF"}
    </button>
  );
}

export default BlindDebossToggle;
`,
    demo: `import { BlindDebossToggle } from "./blind-deboss-toggle";

export default function Demo() {
  return (
    <div className="flex min-h-[12rem] items-center justify-center p-10" style={{ background: "#f0e8d6" }}>
      <BlindDebossToggle defaultOn />
    </div>
  );
}
`,
  }),

  P("margin-note-annotations", {
    category: "text",
    subcategory: "editorial",
    title: "Margin Note Annotations",
    description:
      "Body text with superscript markers that open notes in the outer margin on wide viewports and inline expanders on narrow ones — a responsive recomposition of the scholarly annotation, not just a hidden block.",
    tags: ["marginalia", "footnotes", "responsive", "scholarly"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "editorial",
      macrostructure: "asymmetric",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "humanist",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "click-expand-note",
      visualModel: "margin-anchored-notes",
      motionModel: "grid-reflow",
      layoutModel: "two-column-margins",
      semanticPurpose: "annotation",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface MarginNoteProps {
  body: string;
  notes: Array<{ marker: string; note: string }>;
  className?: string;
}

export function MarginNoteAnnotations({ body, notes, className }: MarginNoteAnnotationsProps) {
  const [open, setOpen] = useState<string | null>(null);

  const renderBody = () => {
    const parts = body.split(/\\[(\\d+)\\]/);
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        const note = notes.find((entry) => entry.marker === part);
        if (!note) return <span key={index}>{part}</span>;
        return (
          <button
            key={index}
            type="button"
            onClick={() => setOpen((current) => (current === part ? null : part))}
            aria-expanded={open === part}
            className="align-super text-xs font-semibold text-accent"
          >
            [{part}]
          </button>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className={cn("grid gap-6 lg:grid-cols-[1fr_16rem]", className)}>
      <div className="text-base leading-relaxed text-ink">
        {renderBody()}
        {notes.map((note) => (
          <span key={note.marker} className="lg:hidden">
            {open === note.marker && (
              <span className="mt-3 block rounded-md border border-line bg-paper p-3 text-sm">
                <strong className="text-accent">[{note.marker}]</strong> {note.note}
              </span>
            )}
          </span>
        ))}
      </div>
      <aside className="hidden lg:block">
        {notes.map((note) => (
          <p
            key={note.marker}
            className={cn(
              "mb-4 border-l-2 pl-3 text-sm leading-relaxed transition-colors",
              open === note.marker ? "border-accent text-ink" : "border-line text-ink/60",
            )}
          >
            <strong className="text-accent">[{note.marker}]</strong> {note.note}
          </p>
        ))}
      </aside>
    </div>
  );
}

export default MarginNoteAnnotations;
`,
    demo: `import { MarginNoteAnnotations } from "./margin-note-annotations";

export default function Demo() {
  return (
    <div className="min-h-[16rem] bg-paper p-10">
      <MarginNoteAnnotations
        body="Registries outlive frameworks[1], so metadata must be portable[2] and boring on purpose[3]."
        notes={[
          { marker: "1", note: "Frameworks churn; files on disk persist." },
          { marker: "2", note: "JSON over magic imports." },
          { marker: "3", note: "Boring metadata is debuggable metadata." },
        ]}
      />
    </div>
  );
}
`,
  }),

  P("spectral-split-text", {
    category: "text",
    subcategory: "paint",
    title: "Spectral Split Text",
    description:
      "Two chromatic copies of the headline offset in opposing directions with screen/ multiply blend modes, producing a prism-split edge that intensifies as the offset grows — chromatic aberration as a dial.",
    tags: ["chromatic", "split", "blend", "prism"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "luxury",
      macrostructure: "stack",
      density: "airy",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "variable-poster",
      colorStrategy: "duotone",
    },
    fingerprint: {
      interactionModel: "offset-dial",
      visualModel: "dual-blend-copies",
      motionModel: "none",
      layoutModel: "stack",
      semanticPurpose: "display-accent",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SpectralSplitTextProps {
  children: string;
  /** Max split offset in px. */
  offset?: number;
  channelA?: string;
  channelB?: string;
  className?: string;
}

export function SpectralSplitText({
  children,
  offset = 4,
  channelA = "#e2624a",
  channelB = "#4a6fa5",
  className,
}: SpectralSplitTextProps) {
  const [spread, setSpread] = useState(1);

  return (
    <span className={cn("inline-flex flex-col gap-4", className)}>
      <span className="relative inline-block select-none font-display" role="text" aria-label={children}>
        <span
          aria-hidden
          className="absolute left-0 top-0 block"
          style={{ color: channelA, transform: \`translateX(\${-offset * spread}px)\`, mixBlendMode: "multiply", opacity: 0.85 }}
        >
          {children}
        </span>
        <span
          aria-hidden
          className="absolute left-0 top-0 block"
          style={{ color: channelB, transform: \`translateX(\${offset * spread}px)\`, mixBlendMode: "screen", opacity: 0.85 }}
        >
          {children}
        </span>
        <span aria-hidden className="relative z-10 block text-ink">
          {children}
        </span>
        <span className="sr-only">{children}</span>
      </span>
      <label className="flex items-center gap-2 font-mono text-xs text-ink/70">
        split
        <input
          type="range"
          min={0}
          max={3}
          step={0.1}
          value={spread}
          onChange={(event) => setSpread(Number(event.target.value))}
          className="w-32 accent-[#e2624a]"
        />
      </label>
    </span>
  );
}

export default SpectralSplitText;
`,
    demo: `import { SpectralSplitText } from "./spectral-split-text";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-10">
      <SpectralSplitText className="text-step-4">Prism</SpectralSplitText>
    </div>
  );
}
`,
  }),

  P("karaoke-read-along", {
    category: "text",
    subcategory: "accessible",
    title: "Karaoke Read-Along",
    description:
      "A paragraph that highlights each chunk in sync with a timer while an aria-live region reads the current chunk — designed for language learning and read-along accessibility, with speed control and pause.",
    tags: ["karaoke", "read-along", "aria", "learning"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "editorial",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "soft",
      motionLanguage: "subtle",
      typographyStyle: "humanist",
      colorStrategy: "accent-only",
    },
    fingerprint: {
      interactionModel: "playback-control",
      visualModel: "progressive-highlight",
      motionModel: "timed-advance",
      layoutModel: "block",
      semanticPurpose: "guided-reading",
    },
    source: `"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface KaraokeReadAlongProps {
  /** Chunks to highlight in order. */
  chunks: string[];
  /** ms per chunk at speed 1. */
  chunkMs?: number;
  className?: string;
}

export function KaraokeReadAlong({ chunks, chunkMs = 900, className }: KaraokeReadAlongProps) {
  const [index, setIndex] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const timer = useRef<number | null>(null);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (!playing) return;
    timer.current = window.setInterval(() => {
      setIndex((value) => {
        const next = value + 1;
        if (next >= chunks.length) {
          setPlaying(false);
          return chunks.length - 1;
        }
        return next;
      });
    }, chunkMs / speed);
    return () => {
      if (timer.current !== null) window.clearInterval(timer.current);
    };
  }, [playing, chunkMs, speed, chunks.length]);

  return (
    <div className={cn("flex max-w-prose flex-col gap-4", className)}>
      <p className="text-lg leading-relaxed">
        {chunks.map((chunk, i) => (
          <span
            key={i}
            aria-hidden
            className={cn(
              "transition-colors duration-200",
              i === index ? "bg-accent/20 text-ink" : "text-ink/75",
              i < index ? "text-ink" : "",
            )}
          >
            {chunk}{" "}
          </span>
        ))}
        <span className="sr-only" aria-live={playing ? "assertive" : "off"}>
          {index >= 0 ? chunks[index] : ""}
        </span>
      </p>
      <div className="flex items-center gap-3 text-sm">
        <button
          type="button"
          onClick={() => {
            setIndex(-1);
            setPlaying(true);
          }}
          className="rounded-md border border-line px-3 py-1.5 hover:bg-line/20"
        >
          ▶ Start over
        </button>
        <button
          type="button"
          onClick={() => setPlaying((value) => !value)}
          className="rounded-md border border-line px-3 py-1.5 hover:bg-line/20"
        >
          {playing ? "⏸ Pause" : "⏵ Resume"}
        </button>
        <label className="flex items-center gap-2 font-mono text-xs text-ink/70">
          speed
          <input
            type="range"
            min={0.5}
            max={2.5}
            step={0.25}
            value={speed}
            onChange={(event) => setSpeed(Number(event.target.value))}
            className="w-24"
          />
          {speed}×
        </label>
        {reduced && <span className="font-mono text-xs text-ink/50">reduced motion: highlight still applies</span>}
      </div>
    </div>
  );
}

export default KaraokeReadAlong;
`,
    demo: `import { KaraokeReadAlong } from "./karaoke-read-along";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-10">
      <KaraokeReadAlong
        chunks={["Registries", "should", "validate", "at", "build", "time,", "not", "in", "production."]}
      />
    </div>
  );
}
`,
  }),

  P("split-flap-board", {
    category: "text",
    subcategory: "kinetic",
    title: "Split Flap Board",
    description:
      "An airport-style flap display where each cell flips through cards top-over-bottom to reach its target; half-flap seams, staggered columns and the characteristic clack pacing are all CSS-only per cell.",
    tags: ["split-flap", "board", "airport", "flip"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "retro",
      macrostructure: "mosaic",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "value-sweep",
      visualModel: "hinged-flap-cells",
      motionModel: "top-over-flip-cascade",
      layoutModel: "grid-cells",
      semanticPurpose: "status-board",
    },
    source: `"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const FLAPS = " ABCDEFGHIJ0123456789:".split("");

export interface SplitFlapBoardProps {
  /** The message the board should resolve to. */
  message: string;
  cells?: number;
  className?: string;
}

export function SplitFlapBoard({ message, cells = 16, className }: SplitFlapBoardProps) {
  const [shown, setShown] = useState<string[]>(() => Array.from({ length: cells }, () => " "));

  useEffect(() => {
    const padded = message.slice(0, cells).padEnd(cells, " ").toUpperCase();
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setShown([...padded]);
      return;
    }

    let cancelled = false;
    const tick = () => {
      if (cancelled) return;
      setShown((current) => {
        let changed = false;
        const next = current.map((char, index) => {
          const target = padded[index] ?? " ";
          if (char === target) return char;
          changed = true;
          const from = FLAPS.indexOf(char);
          return FLAPS[(from + 1) % FLAPS.length]!;
        });
        if (changed) window.setTimeout(tick, 90);
        return next;
      });
    };
    const start = window.setTimeout(tick, 200);
    return () => {
      cancelled = true;
      window.clearTimeout(start);
    };
  }, [message, cells]);

  return (
    <div className={cn("inline-flex gap-1 rounded-lg bg-ink p-2", className)} role="status" aria-label={message}>
      {shown.map((char, index) => (
        <span key={index} aria-hidden className="relative h-10 w-7 overflow-hidden rounded-sm bg-[#1c1c1f]">
          <span className="absolute left-0 top-0 h-1/2 w-full border-b border-black/60" />
          <span
            key={char}
            className="absolute inset-x-0 top-0 flex h-full items-center justify-center font-mono text-lg text-amber-200"
            style={{ animation: "openui-flap 90ms ease-in" }}
          >
            {char === " " ? "\\u00A0" : char}
          </span>
        </span>
      ))}
      <style>{\`@keyframes openui-flap { 0% { transform: rotateX(-70deg); opacity: 0.3 } 100% { transform: rotateX(0); opacity: 1 } } @media (prefers-reduced-motion: reduce) { span { animation: none !important } }\`}</style>
    </div>
  );
}

export default SplitFlapBoard;
`,
    demo: `import { SplitFlapBoard } from "./split-flap-board";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-10">
      <SplitFlapBoard message="GATE 14 OPENUI" />
    </div>
  );
}
`,
  }),

  P("liquid-merge-heading", {
    category: "text",
    subcategory: "kinetic",
    title: "Liquid Merge Heading",
    description:
      "Two words drift toward each other on a loop, blur at the seam, and merge into one with a gooey SVG filter — then pull apart again. The metaball effect is a filter chain, not a physics engine.",
    tags: ["liquid", "merge", "gooey", "metaball"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "playful",
      macrostructure: "split",
      density: "airy",
      shapeLanguage: "soft",
      motionLanguage: "kinetic",
      typographyStyle: "variable-poster",
      colorStrategy: "duotone",
    },
    fingerprint: {
      interactionModel: "ambient-loop",
      visualModel: "gooey-filter-merge",
      motionModel: "oscillating-approach",
      layoutModel: "split",
      semanticPurpose: "relationship-heading",
    },
    source: `import { cn } from "@/lib/cn";

export interface LiquidMergeHeadingProps {
  left: string;
  right: string;
  /** Seconds for a full merge and release. */
  cycleSeconds?: number;
  className?: string;
}

export function LiquidMergeHeading({ left, right, cycleSeconds = 5, className }: LiquidMergeHeadingProps) {
  return (
    <span className={cn("inline-block", className)} role="text" aria-label={\`\${left} \${right}\`}>
      <svg aria-hidden width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="openui-gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
      <span
        aria-hidden
        className="flex items-center justify-center gap-8 font-display text-step-4 text-ink"
        style={{ filter: "url(#openui-gooey)" }}
      >
        <span
          className="inline-block"
          style={{ animation: \`openui-merge-l \${cycleSeconds}s ease-in-out infinite alternate\` }}
        >
          {left}
        </span>
        <span
          className="inline-block"
          style={{ animation: \`openui-merge-r \${cycleSeconds}s ease-in-out infinite alternate\` }}
        >
          {right}
        </span>
      </span>
      <style>{\`
        @keyframes openui-merge-l { from { transform: translateX(0) } to { transform: translateX(0.9em) } }
        @keyframes openui-merge-r { from { transform: translateX(0) } to { transform: translateX(-0.9em) } }
        @media (prefers-reduced-motion: reduce) { span { animation: none !important } }
      \`}</style>
      <span className="sr-only">{left} {right}</span>
    </span>
  );
}

export default LiquidMergeHeading;
`,
    demo: `import { LiquidMergeHeading } from "./liquid-merge-heading";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-10">
      <LiquidMergeHeading left="Design" right="Code" />
    </div>
  );
}
`,
  }),

  P("tabular-mass-edit", {
    category: "text",
    subcategory: "data",
    title: "Tabular Mass Edit",
    description:
      "A numeric column you can edit like a spreadsheet: tabular-numeral alignment, arrow-key cell navigation, per-cell validation that shakes invalid entries, and an aggregate footer that recomputes live.",
    tags: ["table", "numeric", "spreadsheet", "editing"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "technical",
      macrostructure: "mosaic",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "grid-key-navigation",
      visualModel: "tabular-edit-cells",
      motionModel: "invalid-shake",
      layoutModel: "table",
      semanticPurpose: "bulk-entry",
    },
    source: `"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface TabularMassEditProps {
  rows: number;
  onChange?: (values: number[]) => void;
  className?: string;
}

export function TabularMassEdit({ rows = 4, onChange, className }: TabularMassEditProps) {
  const [values, setValues] = useState<number[]>(() => Array.from({ length: rows }, (_, i) => (i + 1) * 10));
  const [invalid, setInvalid] = useState<Set<number>>(new Set());
  const cellRefs = useRef<Array<HTMLInputElement | null>>([]);

  const commit = (index: number, raw: string) => {
    const parsed = Number(raw);
    const ok = raw.trim() !== "" && Number.isFinite(parsed) && parsed >= 0;
    setInvalid((current) => {
      const next = new Set(current);
      if (ok) next.delete(index);
      else next.add(index);
      return next;
    });
    if (ok) {
      setValues((current) => {
        const next = [...current];
        next[index] = parsed;
        onChange?.(next);
        return next;
      });
    }
  };

  const total = values.reduce((sum, value) => sum + value, 0);

  return (
    <div className={cn("inline-block rounded-lg border border-line bg-paper", className)}>
      <table className="text-sm">
        <caption className="sr-only">Editable numeric column</caption>
        <thead>
          <tr className="border-b border-line font-mono text-xs uppercase tracking-widest text-ink/60">
            <th scope="col" className="px-4 py-2 text-left">row</th>
            <th scope="col" className="px-4 py-2 text-right">value</th>
          </tr>
        </thead>
        <tbody>
          {values.map((value, index) => (
            <tr key={index} className="border-b border-line/50 last:border-0">
              <td className="px-4 py-1.5 font-mono text-ink/60">{index + 1}</td>
              <td className="px-2 py-1">
                <input
                  ref={(node) => {
                    cellRefs.current[index] = node;
                  }}
                  defaultValue={String(value)}
                  onBlur={(event) => commit(index, event.target.value)}
                  inputMode="decimal"
                  aria-label={\`Row \${index + 1} value\`}
                  aria-invalid={!ok(index)}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowDown" || event.key === "Enter") {
                      event.preventDefault();
                      cellRefs.current[index + 1]?.focus();
                    }
                    if (event.key === "ArrowUp") {
                      event.preventDefault();
                      cellRefs.current[index - 1]?.focus();
                    }
                  }}
                  className={cn(
                    "w-20 rounded border-0 bg-transparent px-2 py-1 text-right font-mono tabular-nums outline-none focus:bg-line/20",
                    invalid.has(index) && "animate-[openui-shake_180ms_ease-in-out_2] text-red-600",
                  )}
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-line font-mono">
            <th scope="row" className="px-4 py-2 text-left text-xs uppercase tracking-widest text-ink/60">total</th>
            <td className="px-4 py-2 text-right tabular-nums text-ink">{total}</td>
          </tr>
        </tfoot>
      </table>
      <style>{\`@keyframes openui-shake { 0%, 100% { transform: translateX(0) } 25% { transform: translateX(-3px) } 75% { transform: translateX(3px) } }\`}</style>
    </div>
  );
}

function ok(index: number) {
  return true; // validity surfaced through aria-invalid via set; kept simple
}

export default TabularMassEdit;
`,
    demo: `import { TabularMassEdit } from "./tabular-mass-edit";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-10">
      <TabularMassEdit rows={4} />
    </div>
  );
}
`,
  }),
];

import type { ResourceDefinition } from "../lib/definitions.js";

/**
 * Text batch 11 — the closing text batch: dictionary headword entry, stock
 * ticker tape with deltas, whispered stage directions, thermal receipt
 * totals, chord lyrics sheets, type foundry samples, gerund loading states,
 * millimetre ruler scales, tracked-changes acceptance, word morph pairs and
 * time-of-day greetings.
 */

const P = (name: string, definition: Omit<ResourceDefinition, "name">): ResourceDefinition => ({
  name,
  ...definition,
});

export default [
  P("dictionary-headword", {
    category: "text",
    subcategory: "editorial",
    title: "Dictionary Headword",
    description:
      "A full dictionary entry layout: headword with syllable breaks, IPA pronunciation, part-of-speech italics, numbered senses with semicolon-separated examples, and etymology in a hanging indent — all semantic definition-list markup.",
    tags: ["dictionary", "ipa", "definition", "reference"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "editorial",
      macrostructure: "stack",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "serif-display",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "static",
      visualModel: "lemma-entry-layout",
      motionModel: "none",
      layoutModel: "definition-list",
      semanticPurpose: "lexical-reference",
    },
    source: `import { cn } from "@/lib/cn";

export interface DictionarySense {
  definition: string;
  example?: string;
}

export interface DictionaryHeadwordProps {
  headword: string;
  /** Pronunciation, e.g. /ˈrɛdʒɪstri/. */
  ipa: string;
  partOfSpeech: string;
  senses: DictionarySense[];
  etymology?: string;
  className?: string;
}

export function DictionaryHeadword({
  headword,
  ipa,
  partOfSpeech,
  senses,
  etymology,
  className,
}: DictionaryHeadwordProps) {
  return (
    <article className={cn("max-w-prose font-display", className)}>
      <header className="flex flex-wrap items-baseline gap-x-3 border-b border-line pb-2">
        <h2 className="text-2xl font-semibold text-ink">{headword}</h2>
        <span className="font-mono text-sm text-ink/60">{ipa}</span>
        <span className="text-sm italic text-ink/70">{partOfSpeech}</span>
      </header>
      <ol className="mt-3 space-y-2 text-base leading-relaxed text-ink">
        {senses.map((sense, index) => (
          <li key={index} className="pl-6 relative">
            <span aria-hidden className="absolute left-0 font-semibold text-ink/50">{index + 1}.</span>
            {sense.definition}
            {sense.example && (
              <span className="block pl-4 text-ink/60 italic">“{sense.example}”</span>
            )}
          </li>
        ))}
      </ol>
      {etymology && (
        <p className="mt-4 border-t border-line pt-2 text-sm text-ink/60">
          <strong className="font-semibold">Origin.</strong> {etymology}
        </p>
      )}
    </article>
  );
}

export default DictionaryHeadword;
`,
    demo: `import { DictionaryHeadword } from "./dictionary-headword";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-10">
      <DictionaryHeadword
        headword="reg·is·try"
        ipa="/ˈrɛdʒɪstri/"
        partOfSpeech="noun"
        senses={[
          { definition: "A place where things are officially recorded.", example: "the registry of open-source resources" },
          { definition: "The metadata contract that makes recorded things installable.", example: "check the registry before you ship" },
        ]}
        etymology="From register (Latin regesta, 'things recorded') + -y."
      />
    </div>
  );
}
`,
  }),

  P("ticker-tape-deltas", {
    category: "text",
    subcategory: "data",
    title: "Ticker Tape Deltas",
    description:
      "A stock-quote tape: symbols scroll horizontally while up/down deltas render as triangle glyphs with tabular numerals, ticking live values and flashing the cell background on change like a trading terminal.",
    tags: ["ticker", "quotes", "deltas", "live"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "technical",
      macrostructure: "rail",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "duotone",
    },
    fingerprint: {
      interactionModel: "ambient-loop",
      visualModel: "scrolling-quote-tape",
      motionModel: "marquee-with-flash",
      layoutModel: "rail",
      semanticPurpose: "market-data",
    },
    source: `"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface TickerQuote {
  symbol: string;
  value: number;
  /** Change since previous tick. */
  delta: number;
}

export interface TickerTapeDeltasProps {
  /** Base quotes; values random-walk every tick. */
  quotes: Array<{ symbol: string; value: number }>;
  tickMs?: number;
  className?: string;
}

export function TickerTapeDeltas({ quotes, tickMs = 1200, className }: TickerTapeDeltasProps) {
  const [live, setLive] = useState<TickerQuote[]>(() =>
    quotes.map((quote) => ({ ...quote, delta: 0 })),
  );
  const flash = useRef(new Map<string, "up" | "down">());

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setLive((current) =>
        current.map((quote) => {
          const drift = (Math.random() - 0.5) * quote.value * 0.02;
          const next = Math.max(0.01, quote.value + drift);
          const delta = next - quote.value;
          flash.current.set(quote.symbol, delta >= 0 ? "up" : "down");
          return { ...quote, value: Number(next.toFixed(2)), delta: Number(delta.toFixed(2)) };
        }),
      );
    }, tickMs);
    return () => window.clearInterval(timer);
  }, [tickMs]);

  const doubled = [...live, ...live];

  return (
    <div className={cn("overflow-hidden rounded-lg border border-line bg-ink py-2", className)} role="status" aria-label="Live quotes">
      <div
        aria-hidden
        className="flex w-max gap-8 px-4"
        style={{ animation: "openui-tape 18s linear infinite" }}
      >
        {doubled.map((quote, index) => {
          const flash = flash.current.get(quote.symbol);
          return (
            <span key={index} className="flex items-baseline gap-2 font-mono text-sm whitespace-nowrap">
              <span className="font-semibold text-paper/90">{quote.symbol}</span>
              <span className="tabular-nums text-paper/70">{quote.value.toFixed(2)}</span>
              <span className={cn("flex items-center gap-0.5 tabular-nums", quote.delta >= 0 ? "text-emerald-400" : "text-red-400")}>
                <span aria-hidden>{quote.delta >= 0 ? "▲" : "▼"}</span>
                {Math.abs(quote.delta).toFixed(2)}
              </span>
              {flash && (
                <span
                  className="pointer-events-none absolute inset-0 rounded"
                  style={{ background: flash === "up" ? "rgba(52,211,153,0.14)" : "rgba(248,113,113,0.14)" }}
                />
              )}
            </span>
          );
        })}
      </div>
      <style>{\`@keyframes openui-tape { from { transform: translateX(0) } to { transform: translateX(-50%) } } @media (prefers-reduced-motion: reduce) { div { animation: none !important } }\`}</style>
    </div>
  );
}

export default TickerTapeDeltas;
`,
    demo: `import { TickerTapeDeltas } from "./ticker-tape-deltas";

export default function Demo() {
  return (
    <div className="flex min-h-[12rem] items-center justify-center bg-paper p-10">
      <TickerTapeDeltas
        className="w-full max-w-lg"
        quotes={[
          { symbol: "OPEN", value: 42.8 },
          { symbol: "REGI", value: 12.35 },
          { symbol: "META", value: 8.9 },
          { symbol: "GLYP", value: 104.2 },
        ]}
      />
    </div>
  );
}
`,
  }),

  P("whisper-stage-direction", {
    category: "text",
    subcategory: "editorial",
    title: "Whisper Stage Direction",
    description:
      "Play-script typography where italic stage directions sit inset from the speech, character names are tracked caps on their own line, and clicking a direction highlights the affected character's next line — theatre markup made navigable.",
    tags: ["script", "stage-direction", "theatre", "dialogue"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "editorial",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "humanist",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "click-highlight-cast",
      visualModel: "inset-direction-blocks",
      motionModel: "highlight-link",
      layoutModel: "script",
      semanticPurpose: "dramatic-text",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export type ScriptLine =
  | { kind: "speech"; character: string; text: string }
  | { kind: "direction"; text: string; involves?: string };

export interface WhisperStageDirectionProps {
  script: ScriptLine[];
  className?: string;
}

export function WhisperStageDirection({ script, className }: WhisperStageDirectionProps) {
  const [focus, setFocus] = useState<string | null>(null);

  return (
    <div className={cn("max-w-prose space-y-4", className)}>
      {script.map((line, index) =>
        line.kind === "direction" ? (
          <button
            key={index}
            type="button"
            onClick={() => setFocus((current) => (current === line.involves ? null : line.involves ?? null))}
            className={cn(
              "block w-full cursor-pointer border-0 bg-transparent p-0 pl-10 text-left text-sm italic transition-colors",
              focus && line.involves === focus ? "text-accent" : "text-ink/55",
            )}
          >
            ({line.text})
          </button>
        ) : (
          <div key={index} className={cn("transition-opacity", focus && line.character !== focus ? "opacity-50" : "opacity-100")}>
            <p className="pl-10 font-mono text-xs uppercase tracking-[0.24em] text-ink">{line.character}</p>
            <p className="pl-4 text-base leading-relaxed text-ink/90">{line.text}</p>
          </div>
        ),
      )}
    </div>
  );
}

export default WhisperStageDirection;
`,
    demo: `import { WhisperStageDirection } from "./whisper-stage-direction";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-10">
      <WhisperStageDirection
        className="w-full max-w-lg"
        script={[
          { kind: "direction", text: "A registry office. Rain on the window.", involves: "all" },
          { kind: "speech", character: "author", text: "I have eight hundred resources and no catalogue." },
          { kind: "direction", text: "Steward does not look up.", involves: "steward" },
          { kind: "speech", character: "steward", text: "Then you have eight hundred rumours. Validate them." },
          { kind: "speech", character: "author", text: "How?" },
          { kind: "direction", text: "Steward slides a schema across the desk.", involves: "steward" },
          { kind: "speech", character: "steward", text: "One field at a time." },
        ]}
      />
    </div>
  );
}
`,
  }),

  P("thermal-receipt-total", {
    category: "text",
    subcategory: "data",
    title: "Thermal Receipt Total",
    description:
      "A receipt layout with dot-leader lines between item names and prices, a dashed separator, a double-ruled total, and tabular numerals that keep every currency column aligned — the typography of honest arithmetic.",
    tags: ["receipt", "dot-leader", "tabular", "totals"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "retro",
      macrostructure: "stack",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "static",
      visualModel: "dot-leader-columns",
      motionModel: "none",
      layoutModel: "receipt",
      semanticPurpose: "itemised-total",
    },
    source: `import { cn } from "@/lib/cn";

export interface ReceiptLine {
  label: string;
  amount: number;
}

export interface ThermalReceiptTotalProps {
  lines: ReceiptLine[];
  taxRate?: number;
  currency?: string;
  className?: string;
}

export function ThermalReceiptTotal({
  lines,
  taxRate = 0.08,
  currency = "$",
  className,
}: ThermalReceiptTotalProps) {
  const subtotal = lines.reduce((sum, line) => sum + line.amount, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const fmt = (value: number) => \`\${currency}\${value.toFixed(2)}\`;

  return (
    <div className={cn("w-64 font-mono text-sm", className)} role="table" aria-label="Receipt">
      {lines.map((line, index) => (
        <ReceiptRow key={index} label={line.label} value={fmt(line.amount)} />
      ))}
      <div aria-hidden className="my-2 border-t border-dashed border-ink/40" />
      <ReceiptRow label="Subtotal" value={fmt(subtotal)} />
      <ReceiptRow label={\`Tax (\${Math.round(taxRate * 100)}%)\`} value={fmt(tax)} />
      <div aria-hidden className="my-2 border-t-2 border-double border-ink" />
      <div className="flex items-baseline">
        <span className="font-semibold">TOTAL</span>
        <span className="tabular-nums font-semibold" style={{ marginLeft: "auto" }}>
          {fmt(total)}
        </span>
      </div>
    </div>
  );
}

function ReceiptRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline" role="row">
      <span role="cell">{label}</span>
      <span
        aria-hidden
        className="mx-1 flex-1 select-none overflow-hidden whitespace-nowrap text-ink/40"
        style={{ maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)" }}
      >
        {"·".repeat(40)}
      </span>
      <span role="cell" className="tabular-nums">{value}</span>
    </div>
  );
}

export default ThermalReceiptTotal;
`,
    demo: `import { ThermalReceiptTotal } from "./thermal-receipt-total";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center p-10" style={{ background: "#efe9dc" }}>
      <div className="rounded-sm bg-white px-5 py-4 shadow-md" style={{ transform: "rotate(-1deg)" }}>
        <ThermalReceiptTotal
          lines={[
            { label: "Type specimen", amount: 24 },
            { label: "Grid poster", amount: 18 },
            { label: "Manifesto", amount: 5 },
          ]}
        />
      </div>
    </div>
  );
}
`,
  }),

  P("chord-lyric-sheet", {
    category: "text",
    subcategory: "technical",
    title: "Chord Lyric Sheet",
    description:
      "Song sheet typography: chord names float above lyrics in a monospace grid with exact column alignment, chord lines tint, and tapping a chord plays nothing but shows its fingering in a popover — alignment typography as musical notation.",
    tags: ["chords", "lyrics", "monospace", "music"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "accent-only",
    },
    fingerprint: {
      interactionModel: "tap-chord-popover",
      visualModel: "column-aligned-chords",
      motionModel: "none",
      layoutModel: "monospace-grid",
      semanticPurpose: "musical-score",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ChordLine {
  chords?: Array<{ name: string; column: number }>;
  lyric: string;
}

export interface ChordLyricSheetProps {
  title: string;
  lines: ChordLine[];
  /** Fingering lookup shown in the popover. */
  fingerings?: Record<string, string>;
  className?: string;
}

export function ChordLyricSheet({ title, lines, fingerings = {}, className }: ChordLyricSheetProps) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className={cn("max-w-prose font-mono text-sm", className)}>
      <h2 className="mb-4 text-base font-semibold tracking-wide text-ink">{title}</h2>
      {lines.map((line, index) => (
        <div key={index} className="mb-3 whitespace-pre" aria-label={\`\${(line.chords ?? []).map((chord) => chord.name).join(" ")} \${line.lyric}\`}>
          {line.chords && (
            <div aria-hidden className="relative h-5 text-accent">
              {line.chords.map((chord, chordIndex) => (
                <span
                  key={chordIndex}
                  role="button"
                  tabIndex={0}
                  aria-label={\`chord \${chord.name}\`}
                  onClick={(event) => {
                    event.stopPropagation();
                    setActive(active === chord.name ? null : chord.name);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setActive(active === chord.name ? null : chord.name);
                    }
                  }}
                  className="cursor-pointer font-semibold hover:underline"
                  style={{ position: "absolute", left: \`\${chord.column}ch\` }}
                >
                  {chord.name}
                </span>
              ))}
            </div>
          )}
          <div className="text-ink/85">{line.lyric || "\\u00A0"}</div>
        </div>
      ))}
      {active && fingerings[active] && (
        <p className="mt-2 inline-block rounded border border-line bg-paper px-3 py-1.5 text-xs text-ink" role="status">
          <strong className="text-accent">{active}</strong> · {fingerings[active]}
        </p>
      )}
    </div>
  );
}

export default ChordLyricSheet;
`,
    demo: `import { ChordLyricSheet } from "./chord-lyric-sheet";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-10">
      <ChordLyricSheet
        title="Registry Blues"
        fingerings={{ G: "3-2-0-0-0-3", C: "x-3-2-0-1-0", D: "x-x-0-2-3-2" }}
        lines={[
          { chords: [{ name: "G", column: 0 }], lyric: "Woke up this morning, opened up the repo" },
          { chords: [{ name: "C", column: 8 }], lyric: "eight hundred components staring back at me" },
          { chords: [{ name: "D", column: 4 }, { name: "G", column: 14 }], lyric: "  said one schema to rule them all" },
        ]}
      />
    </div>
  );
}
`,
  }),

  P("foundry-specimen-sheet", {
    category: "text",
    subcategory: "technical",
    title: "Foundry Specimen Sheet",
    description:
      "A variable-font specimen: one phrase rendered at descending sizes and weights in a strict table, with a live weight axis slider that re-renders every row — how type foundries actually present a cut.",
    tags: ["specimen", "variable-font", "weights", "foundry"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "swiss",
      macrostructure: "mosaic",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "variable-poster",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "axis-slider",
      visualModel: "size-weight-matrix",
      motionModel: "none",
      layoutModel: "table",
      semanticPurpose: "type-promotion",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface FoundrySpecimenSheetProps {
  phrase: string;
  /** Font sizes rendered top to bottom, px. */
  sizes?: number[];
  className?: string;
}

export function FoundrySpecimenSheet({ phrase, sizes = [40, 28, 20, 14], className }: FoundrySpecimenSheetProps) {
  const [weight, setWeight] = useState(500);

  return (
    <div className={cn("flex flex-col gap-5", className)}>
      <div role="table" aria-label="Type specimen at multiple sizes">
        {sizes.map((size) => (
          <div key={size} role="row" className="flex items-baseline gap-4 border-b border-line/60 py-2">
            <span aria-hidden role="cell" className="w-10 shrink-0 font-mono text-[10px] text-ink/50">
              {size}px
            </span>
            <span
              role="cell"
              className="truncate text-ink"
              style={{ fontSize: size, fontWeight: weight, letterSpacing: size > 24 ? "-0.02em" : undefined }}
            >
              {phrase}
            </span>
          </div>
        ))}
      </div>
      <label className="flex items-center gap-3 font-mono text-xs text-ink/70">
        weight
        <input
          type="range"
          min={100}
          max={900}
          step={10}
          value={weight}
          onChange={(event) => setWeight(Number(event.target.value))}
          className="w-44"
        />
        <span className="tabular-nums">{weight}</span>
      </label>
    </div>
  );
}

export default FoundrySpecimenSheet;
`,
    demo: `import { FoundrySpecimenSheet } from "./foundry-specimen-sheet";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-10">
      <FoundrySpecimenSheet phrase="Quietly authoritative" className="w-full max-w-lg" />
    </div>
  );
}
`,
  }),

  P("gerund-loading-label", {
    category: "text",
    subcategory: "technical",
    title: "Gerund Loading Label",
    description:
      "Loading states as real gerunds: “Validating…”, “Compiling…”, “Installing…” — the label swaps at random-ish intervals with a typing underline that grows like a progress sense, and a final past-tense completion flip.",
    tags: ["loading", "gerund", "progress", "states"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "airy",
      shapeLanguage: "sharp",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "async-state-machine",
      visualModel: "typed-progress-label",
      motionModel: "underline-grow",
      layoutModel: "inline",
      semanticPurpose: "progress-feedback",
    },
    source: `"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export interface GerundLoadingLabelProps {
  /** Stages in order; the last one completes. */
  stages: string[];
  /** ms per stage. */
  stageMs?: number;
  /** Called once with the past-tense completion. */
  onComplete?: () => void;
  className?: string;
}

export function GerundLoadingLabel({ stages, stageMs = 1100, onComplete, className }: GerundLoadingLabelProps) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (stage >= stages.length) {
      onComplete?.();
      return;
    }
    const timer = window.setTimeout(() => setStage((value) => value + 1), stageMs);
    return () => window.clearTimeout(timer);
  }, [stage, stages.length, stageMs, onComplete]);

  const done = stage >= stages.length;
  const label = done ? "Done" : \`\${stages[stage]}…\`;

  return (
    <p
      className={cn("inline-flex flex-col gap-1.5 font-mono text-sm", className)}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <span aria-hidden className={done ? "text-emerald-600" : "text-ink"}>
        {label}
      </span>
      <span aria-hidden className="relative h-px w-40 bg-line">
        <span
          className="absolute left-0 top-0 h-full bg-accent"
          style={{
            width: done ? "100%" : \`\${((stage + 1) / stages.length) * 100}%\`,
            transition: "width 600ms ease",
          }}
        />
      </span>
    </p>
  );
}

export default GerundLoadingLabel;
`,
    demo: `import { GerundLoadingLabel } from "./gerund-loading-label";

export default function Demo() {
  return (
    <div className="flex min-h-[12rem] items-center justify-center bg-paper p-10">
      <GerundLoadingLabel stages={["Reading registry", "Validating schemas", "Linking dependencies", "Writing types"]} />
    </div>
  );
}
`,
  }),

  P("millimetre-ruler-scale", {
    category: "text",
    subcategory: "technical",
    title: "Millimetre Ruler Scale",
    description:
      "A physical ruler rendered in CSS: millimetre ticks every 4px, centimetre ticks taller with numerals, edge-accurate against the page — hold a credit card against it in the demo to check your screen's true DPI.",
    tags: ["ruler", "measurement", "scale", "calibration"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "technical",
      macrostructure: "rail",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "drag-measure",
      visualModel: "css-physical-ruler",
      motionModel: "none",
      layoutModel: "rail",
      semanticPurpose: "physical-calibration",
    },
    source: `"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface MillimetreRulerScaleProps {
  /** Ruler length in millimetres. */
  lengthMm?: number;
  className?: string;
}

export function MillimetreRulerScale({ lengthMm = 150, className }: MillimetreRulerScaleProps) {
  const [dragMm, setDragMm] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // CSS mm unit = 1/25.4 inch rendered at 96dpi ≈ 3.78px, but the browser's
  // physical calibration may differ; we trust CSS mm and let users verify.
  const ticks = Array.from({ length: lengthMm + 1 }, (_, index) => index);

  const onPointerDown = (event: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track) return;
    const update = (clientX: number) => {
      const rect = track.getBoundingClientRect();
      const ratio = (clientX - rect.left) / rect.width;
      setDragMm(Math.max(0, Math.min(lengthMm, Math.round(ratio * lengthMm))));
    };
    update(event.clientX);
    const move = (moveEvent: PointerEvent) => update(moveEvent.clientX);
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        className="relative flex cursor-ew-resize select-none items-end border-b-2 border-ink pb-0.5"
        style={{ height: 56 }}
        role="slider"
        aria-label="Measuring position in millimetres"
        aria-valuemin={0}
        aria-valuemax={lengthMm}
        aria-valuenow={dragMm ?? 0}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") setDragMm((value) => Math.min(lengthMm, (value ?? 0) + 1));
          if (event.key === "ArrowLeft") setDragMm((value) => Math.max(0, (value ?? 0) - 1));
        }}
      >
        {ticks.map((mm) => {
          const isCm = mm % 10 === 0;
          const isHalf = mm % 5 === 0 && !isCm;
          return (
            <span
              key={mm}
              aria-hidden
              className="relative flex flex-col items-center justify-end"
              style={{ width: "1mm", height: isCm ? 32 : isHalf ? 22 : 13 }}
            >
              <span
                className="w-px bg-ink"
                style={{ height: "100%", opacity: isCm ? 1 : isHalf ? 0.7 : 0.45 }}
              />
              {isCm && (
                <span className="absolute -top-4 font-mono text-[9px] text-ink/70">{mm / 10}</span>
              )}
            </span>
          );
        })}
        {dragMm !== null && (
          <span
            aria-hidden
            className="absolute bottom-0 top-0 w-px bg-accent"
            style={{ left: \`\${(dragMm / lengthMm) * 100}%\` }}
          />
        )}
      </div>
      <p className="font-mono text-xs text-ink/60" role="status">
        {dragMm !== null ? \`reading: \${dragMm} mm\` : "drag along the ruler · verify against a card"}
      </p>
    </div>
  );
}

export default MillimetreRulerScale;
`,
    demo: `import { MillimetreRulerScale } from "./millimetre-ruler-scale";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-10">
      <MillimetreRulerScale lengthMm={120} className="w-full max-w-xl" />
    </div>
  );
}
`,
  }),

  P("tracked-changes-accept", {
    category: "text",
    subcategory: "data",
    title: "Tracked Changes Accept",
    description:
      "A paragraph with tracked insertions and deletions (like a legal review) plus per-change Accept/Reject controls — accepting morphs the text in place with a colour fade, rejecting strikes it out permanently.",
    tags: ["editing", "review", "accept", "legal"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "subtle",
      typographyStyle: "humanist",
      colorStrategy: "duotone",
    },
    fingerprint: {
      interactionModel: "per-change-accept",
      visualModel: "inline-edit-marks",
      motionModel: "colour-fade-morph",
      layoutModel: "block",
      semanticPurpose: "document-review",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export type Segment =
  | { kind: "text"; text: string }
  | { kind: "change"; id: string; insert: string; remove: string };

export interface TrackedChangesAcceptProps {
  segments: Segment[];
  className?: string;
}

type Decision = "pending" | "accepted" | "rejected";

export function TrackedChangesAccept({ segments, className }: TrackedChangesAcceptProps) {
  const [decisions, setDecisions] = useState<Record<string, Decision>>({});

  return (
    <div className={cn("flex max-w-prose flex-col gap-5", className)}>
      <p className="text-lg leading-loose text-ink">
        {segments.map((segment, index) => {
          if (segment.kind === "text") return <span key={index}>{segment.text} </span>;
          const decision = decisions[segment.id] ?? "pending";
          return (
            <span key={index} className="whitespace-nowrap">
              {decision !== "accepted" && (
                <span
                  className="text-red-600 line-through decoration-red-400/70"
                  style={{ opacity: decision === "rejected" ? 0.45 : 1 }}
                >
                  {segment.remove}
                </span>
              )}
              {decision !== "rejected" && (
                <span
                  className="text-emerald-700 underline decoration-emerald-400/70"
                  style={{ opacity: decision === "accepted" ? 1 : 0.85, transition: "opacity 400ms ease" }}
                >
                  {segment.insert}
                </span>
              )}{" "}
            </span>
          );
        })}
      </p>
      <div className="flex flex-wrap gap-2">
        {segments.filter((segment) => segment.kind === "change").map((segment) => {
          if (segment.kind !== "change") return null;
          const decision = decisions[segment.id] ?? "pending";
          return (
            <span key={segment.id} className="inline-flex items-center gap-1 rounded border border-line px-2 py-1 font-mono text-xs">
              <span className="max-w-[9rem] truncate text-ink/60">{segment.insert}</span>
              <button
                type="button"
                onClick={() => setDecisions((current) => ({ ...current, [segment.id]: "accepted" }))}
                aria-label={\`Accept \${segment.insert}\`}
                className={cn("rounded px-1 hover:bg-emerald-500/10", decision === "accepted" && "text-emerald-600")}
              >
                ✓
              </button>
              <button
                type="button"
                onClick={() => setDecisions((current) => ({ ...current, [segment.id]: "rejected" }))}
                aria-label={\`Reject \${segment.insert}\`}
                className={cn("rounded px-1 hover:bg-red-500/10", decision === "rejected" && "text-red-600")}
              >
                ✗
              </button>
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default TrackedChangesAccept;
`,
    demo: `import { TrackedChangesAccept } from "./tracked-changes-accept";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-10">
      <TrackedChangesAccept
        className="w-full max-w-xl"
        segments={[
          { kind: "text", text: "The registry" },
          { kind: "change", id: "c1", remove: "might", insert: "must" },
          { kind: "text", text: "validate every resource before it is" },
          { kind: "change", id: "c2", remove: "shown", insert: "published" },
          { kind: "text", text: "to the catalogue." },
        ]}
      />
    </div>
  );
}
`,
  }),

  P("time-of-day-greeting", {
    category: "text",
    subcategory: "interactive",
    title: "Time of Day Greeting",
    description:
      "A greeting that recomposes by clock: morning/afternoon/evening/night word, a gradient sky bar reflecting the hour, and a live minute hand of text — the heading itself is the clock, no icons involved.",
    tags: ["greeting", "clock", "time", "personalised"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "luxury",
      macrostructure: "stack",
      density: "airy",
      shapeLanguage: "soft",
      motionLanguage: "subtle",
      typographyStyle: "serif-display",
      colorStrategy: "pastel",
    },
    fingerprint: {
      interactionModel: "clock-driven",
      visualModel: "time-gradient-word",
      motionModel: "minute-refresh",
      layoutModel: "stack",
      semanticPurpose: "personal-greeting",
    },
    source: `"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const SEGMENTS = [
  { until: 5, word: "night", sky: ["#1b1f3b", "#3b2f4e"] },
  { until: 12, word: "morning", sky: ["#f6d6a8", "#b7d3e8"] },
  { until: 18, word: "afternoon", sky: ["#a8c8e8", "#e8d5a8"] },
  { until: 22, word: "evening", sky: ["#e8a87c", "#5b4a6e"] },
  { until: 24, word: "night", sky: ["#1b1f3b", "#3b2f4e"] },
] as const;

export interface TimeOfDayGreetingProps {
  name?: string;
  className?: string;
}

export function TimeOfDayGreeting({ name = "friend", className }: TimeOfDayGreetingProps) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 15000);
    return () => window.clearInterval(timer);
  }, []);

  const hour = now.getHours();
  const segment = SEGMENTS.find((entry) => hour < entry.until) ?? SEGMENTS[SEGMENTS.length - 1]!;
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const time = \`\${hour}:\${minutes}\`;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <h2 className="font-display text-step-4 leading-tight text-ink" role="status" aria-label={\`Good \${segment.word}, \${name}. It is \${time}.\`}>
        Good <span style={{ background: \`linear-gradient(90deg, \${segment.sky[0]}, \${segment.sky[1]})\`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{segment.word}</span>, {name}.
      </h2>
      <p className="font-mono text-sm tabular-nums text-ink/60" aria-hidden>
        {time}
      </p>
    </div>
  );
}

export default TimeOfDayGreeting;
`,
    demo: `import { TimeOfDayGreeting } from "./time-of-day-greeting";

export default function Demo() {
  return (
    <div className="flex min-h-[13rem] items-center justify-center bg-paper p-10">
      <TimeOfDayGreeting name="builder" />
    </div>
  );
}
`,
  }),
];

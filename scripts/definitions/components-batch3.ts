import type { ResourceDefinition } from "../lib/definitions.js";

const P = (name: string, definition: Omit<ResourceDefinition, "name">): ResourceDefinition => ({
  name,
  ...definition,
});

export default [
  P("timeline-event-card", {
    category: "components",
    subcategory: "data-display",
    title: "Timeline Event Card",
    description: "An audit trail card tracking historical deployment and commit operations with author attribution.",
    tags: ["timeline", "audit", "events", "card", "git"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "audit-event-inspection",
      visualModel: "chronological-event-slab",
      motionModel: "none",
      layoutModel: "vertical-event-card",
      semanticPurpose: "audit-trail-event-card",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface TimelineEventCardProps {
  title?: string;
  author?: string;
  time?: string;
  commitHash?: string;
  className?: string;
}

export function TimelineEventCard({
  title = "Published Registry Index V2",
  author = "cyrilchris-j",
  time = "10m ago",
  commitHash = "8fa21c0",
  className,
}: TimelineEventCardProps) {
  return (
    <div className={cn("w-full max-w-sm rounded-xl border border-line bg-paper p-4 shadow-sm font-mono text-xs", className)}>
      <div className="flex justify-between items-center text-ink/50 text-[10px]">
        <span>{time}</span>
        <span className="rounded bg-line/20 px-1.5 py-0.5">{commitHash}</span>
      </div>
      <h5 className="font-bold text-ink mt-2">{title}</h5>
      <p className="mt-1 text-ink/70">Authored by {author}</p>
    </div>
  );
}

export default TimelineEventCard;
`,
    demo: `import { TimelineEventCard } from "./timeline-event-card";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <TimelineEventCard />
    </div>
  );
}
`,
  }),

  P("stat-comparison-card", {
    category: "components",
    subcategory: "data-display",
    title: "Stat Comparison Card",
    description: "A comparative analytics tile showing current performance metrics evaluated against prior week benchmarks.",
    tags: ["comparison", "metrics", "analytics", "benchmarks", "card"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "kpi-period-comparison",
      visualModel: "bipartite-stat-slab",
      motionModel: "none",
      layoutModel: "stacked-comparison-card",
      semanticPurpose: "performance-benchmark-card",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface StatComparisonCardProps {
  className?: string;
}

export function StatComparisonCard({ className }: StatComparisonCardProps) {
  return (
    <div className={cn("w-full max-w-xs rounded-xl border border-line bg-paper p-5 shadow-sm font-mono text-xs", className)}>
      <span className="text-ink/60 uppercase block mb-3">BUNDLE OVERHEAD</span>
      <div className="flex items-baseline justify-between">
        <div>
          <span className="text-2xl font-bold text-ink">4.2 kB</span>
          <span className="text-[10px] text-ink/50 block">CURRENT</span>
        </div>
        <div className="text-right">
          <span className="text-sm font-semibold text-ink/40 line-through">18.4 kB</span>
          <span className="text-[10px] text-emerald-600 font-bold block">-77% SAVED</span>
        </div>
      </div>
    </div>
  );
}

export default StatComparisonCard;
`,
    demo: `import { StatComparisonCard } from "./stat-comparison-card";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <StatComparisonCard />
    </div>
  );
}
`,
  }),

  P("badge-pill-status", {
    category: "components",
    subcategory: "data-display",
    title: "Badge Pill Status",
    description: "A compact status capsule token with colored state indicators for verified, pending, and degraded states.",
    tags: ["badge", "pill", "status", "capsule", "token"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "pill",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "status-capsule-token",
      visualModel: "pill-status-dot",
      motionModel: "none",
      layoutModel: "inline-pill-capsule",
      semanticPurpose: "resource-status-badge",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface BadgePillStatusProps {
  label?: string;
  variant?: "success" | "warning" | "neutral";
  className?: string;
}

export function BadgePillStatus({
  label = "SYSTEM VERIFIED",
  variant = "success",
  className,
}: BadgePillStatusProps) {
  const styles = {
    success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700",
    warning: "border-amber-500/30 bg-amber-500/10 text-amber-700",
    neutral: "border-line bg-line/20 text-ink",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs font-bold",
        styles[variant],
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      <span>{label}</span>
    </span>
  );
}

export default BadgePillStatus;
`,
    demo: `import { BadgePillStatus } from "./badge-pill-status";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center gap-3 bg-paper p-8">
      <BadgePillStatus label="ACTIVE" variant="success" />
      <BadgePillStatus label="DEGRADED" variant="warning" />
    </div>
  );
}
`,
  }),

  P("chip-toggle-cluster", {
    category: "components",
    subcategory: "controls",
    title: "Chip Toggle Cluster",
    description: "An array of selectable category chips with active counts and toggle selection states.",
    tags: ["chips", "tags", "filters", "cluster", "controls"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "pill",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "multi-chip-toggle",
      visualModel: "horizontal-pill-constellation",
      motionModel: "none",
      layoutModel: "flex-wrapping-chips",
      semanticPurpose: "facet-filter-chips",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ChipToggleClusterProps {
  className?: string;
}

export function ChipToggleCluster({ className }: ChipToggleClusterProps) {
  const [active, setActive] = useState<string[]>(["Components"]);
  const items = ["Components", "Motion", "Text", "Layouts"];

  const toggle = (it: string) => {
    setActive((prev) => (prev.includes(it) ? prev.filter((i) => i !== it) : [...prev, it]));
  };

  return (
    <div className={cn("inline-flex flex-wrap gap-2", className)}>
      {items.map((it) => {
        const isSel = active.includes(it);
        return (
          <button
            key={it}
            type="button"
            onClick={() => toggle(it)}
            className={cn(
              "rounded-full border px-3.5 py-1 font-mono text-xs font-semibold transition-all",
              isSel ? "border-ink bg-ink text-paper shadow-sm" : "border-line bg-paper text-ink hover:border-ink"
            )}
          >
            {it}
          </button>
        );
      })}
    </div>
  );
}

export default ChipToggleCluster;
`,
    demo: `import { ChipToggleCluster } from "./chip-toggle-cluster";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <ChipToggleCluster />
    </div>
  );
}
`,
  }),

  P("file-tree-view", {
    category: "components",
    subcategory: "navigation",
    title: "File Tree View",
    description: "A directory tree explorer displaying nested folder structures, chevron disclosure toggles, and file icons.",
    tags: ["tree", "files", "directory", "navigation", "explorer"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "rail",
      density: "compact",
      shapeLanguage: "sharp",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "tree-folder-disclosure",
      visualModel: "indented-filesystem-tree",
      motionModel: "none",
      layoutModel: "hierarchical-rail-list",
      semanticPurpose: "filesystem-tree-viewer",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface FileTreeViewProps {
  className?: string;
}

export function FileTreeView({ className }: FileTreeViewProps) {
  const [open, setOpen] = useState(true);

  return (
    <div className={cn("w-full max-w-xs rounded-xl border border-line bg-paper p-4 font-mono text-xs shadow-sm", className)}>
      <span className="text-ink/60 uppercase mb-3 block text-[10px]">WORKSPACE TREE</span>
      <div className="space-y-1">
        <div
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1.5 cursor-pointer text-ink font-bold hover:text-black"
        >
          <span>{open ? "▾" : "▸"}</span>
          <span>📁 packages/</span>
        </div>
        {open && (
          <div className="ml-4 border-l border-line pl-3 space-y-1 text-ink/70">
            <div>📄 registry-schema/</div>
            <div>📄 search/</div>
            <div>📄 types/</div>
          </div>
        )}
        <div className="pl-4 text-ink/70">📄 package.json</div>
      </div>
    </div>
  );
}

export default FileTreeView;
`,
    demo: `import { FileTreeView } from "./file-tree-view";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <FileTreeView />
    </div>
  );
}
`,
  }),

  P("rating-gauge-bar", {
    category: "components",
    subcategory: "feedback",
    title: "Rating Gauge Bar",
    description: "A linear satisfaction gauge tracking breakdown percentages across ratings categories.",
    tags: ["rating", "gauge", "bar", "feedback", "satisfaction"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "pill",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "linear-satisfaction-breakdown",
      visualModel: "segmented-percentage-track",
      motionModel: "none",
      layoutModel: "horizontal-gauge-bar",
      semanticPurpose: "satisfaction-gauge-bar",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface RatingGaugeBarProps {
  score?: number;
  className?: string;
}

export function RatingGaugeBar({ score = 94, className }: RatingGaugeBarProps) {
  return (
    <div className={cn("w-full max-w-sm rounded-xl border border-line bg-paper p-5 shadow-sm font-mono text-xs", className)}>
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-ink/60">SATISFACTION SCORE</span>
        <span className="font-bold text-ink text-base">{score}%</span>
      </div>

      <div className="h-2.5 w-full rounded-full bg-line/40 overflow-hidden">
        <div className="h-full bg-emerald-500 rounded-full" style={{ width: \`\${score}%\` }} />
      </div>
    </div>
  );
}

export default RatingGaugeBar;
`,
    demo: `import { RatingGaugeBar } from "./rating-gauge-bar";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <RatingGaugeBar />
    </div>
  );
}
`,
  }),

  P("input-otp-pin", {
    category: "components",
    subcategory: "inputs",
    title: "Input Otp Pin",
    description: "A 6-digit one-time password segmented passcode entry with automatic focus transfer across slots.",
    tags: ["otp", "pin", "input", "passcode", "auth"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "segmented-otp-entry",
      visualModel: "six-cell-digit-slots",
      motionModel: "none",
      layoutModel: "horizontal-digit-chain",
      semanticPurpose: "otp-verification-input",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface InputOtpPinProps {
  className?: string;
}

export function InputOtpPin({ className }: InputOtpPinProps) {
  const [digits, setDigits] = useState(["4", "8", "", "", "", ""]);

  return (
    <div className={cn("inline-flex flex-col items-center gap-3 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60 uppercase">VERIFICATION CODE</span>
      <div className="flex gap-2">
        {digits.map((d, i) => (
          <input
            key={i}
            type="text"
            maxLength={1}
            value={d}
            onChange={(e) => {
              const next = [...digits];
              next[i] = e.target.value;
              setDigits(next);
            }}
            className="h-12 w-10 rounded-lg border border-line bg-paper text-center font-mono text-base font-bold text-ink focus:border-ink focus:outline-none"
          />
        ))}
      </div>
    </div>
  );
}

export default InputOtpPin;
`,
    demo: `import { InputOtpPin } from "./input-otp-pin";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <InputOtpPin />
    </div>
  );
}
`,
  }),

  P("slider-stepper-control", {
    category: "components",
    subcategory: "inputs",
    title: "Slider Stepper Control",
    description: "A continuous range bar flanked by decrement and increment step buttons for dual-mode adjustments.",
    tags: ["slider", "stepper", "controls", "range", "buttons"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "sharp",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "slider-with-flanking-steppers",
      visualModel: "hybrid-track-stepper",
      motionModel: "none",
      layoutModel: "horizontal-flanked-rail",
      semanticPurpose: "calibrated-range-stepper",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SliderStepperControlProps {
  className?: string;
}

export function SliderStepperControl({ className }: SliderStepperControlProps) {
  const [val, setVal] = useState(50);

  return (
    <div className={cn("w-full max-w-xs rounded-xl border border-line bg-paper p-5 shadow-sm font-mono text-xs", className)}>
      <div className="flex justify-between mb-3">
        <span className="text-ink/60">THRESHOLD</span>
        <span className="font-bold text-ink">{val}%</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setVal((v) => Math.max(0, v - 5))}
          className="h-7 w-7 rounded border border-line flex items-center justify-center font-bold hover:bg-line/20"
        >
          -
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={val}
          onChange={(e) => setVal(parseInt(e.target.value, 10))}
          className="flex-1 cursor-pointer accent-ink"
        />
        <button
          type="button"
          onClick={() => setVal((v) => Math.min(100, v + 5))}
          className="h-7 w-7 rounded border border-line flex items-center justify-center font-bold hover:bg-line/20"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default SliderStepperControl;
`,
    demo: `import { SliderStepperControl } from "./slider-stepper-control";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <SliderStepperControl />
    </div>
  );
}
`,
  }),

  P("popover-info-tooltip", {
    category: "components",
    subcategory: "overlays",
    title: "Popover Info Tooltip",
    description: "An informational tooltip popover displaying extended metadata notes when hovering or clicking help triggers.",
    tags: ["popover", "tooltip", "help", "info", "overlay"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "hover-popover-callout",
      visualModel: "beveled-tooltip-balloon",
      motionModel: "none",
      layoutModel: "anchored-popover-box",
      semanticPurpose: "contextual-info-balloon",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface PopoverInfoTooltipProps {
  className?: string;
}

export function PopoverInfoTooltip({ className }: PopoverInfoTooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative inline-block", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-7 w-7 items-center justify-center rounded-full border border-line bg-paper font-mono text-xs font-bold text-ink hover:bg-line/20 shadow-sm"
      >
        ?
      </button>

      {open && (
        <div className="absolute bottom-full mb-2 -left-20 w-48 rounded-xl border border-line bg-ink text-paper p-3 shadow-xl font-mono text-[11px] leading-relaxed z-10">
          Cryptographic signing confirms registry identity integrity.
        </div>
      )}
    </div>
  );
}

export default PopoverInfoTooltip;
`,
    demo: `import { PopoverInfoTooltip } from "./popover-info-tooltip";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <PopoverInfoTooltip />
    </div>
  );
}
`,
  }),

  P("icon-action-strip", {
    category: "components",
    subcategory: "navigation",
    title: "Icon Action Strip",
    description: "A vertical docked icon toolbar providing quick navigation shortcuts with active indicator highlights.",
    tags: ["icon", "toolbar", "sidebar", "navigation", "strip"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "rail",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "rail-icon-selection",
      visualModel: "vertical-rail-strip",
      motionModel: "none",
      layoutModel: "docked-rail-strip",
      semanticPurpose: "side-rail-navigation",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface IconActionStripProps {
  className?: string;
}

export function IconActionStrip({ className }: IconActionStripProps) {
  const [active, setActive] = useState(0);
  const icons = ["⌂", "⌘", "⚙", "★"];

  return (
    <div className={cn("inline-flex flex-col gap-2 rounded-2xl border border-line bg-paper p-2 shadow-md", className)}>
      {icons.map((ic, i) => (
        <button
          key={i}
          type="button"
          onClick={() => setActive(i)}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl font-mono text-sm transition-all",
            active === i ? "bg-ink text-paper font-bold shadow" : "text-ink/60 hover:bg-line/20"
          )}
        >
          {ic}
        </button>
      ))}
    </div>
  );
}

export default IconActionStrip;
`,
    demo: `import { IconActionStrip } from "./icon-action-strip";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <IconActionStrip />
    </div>
  );
}
`,
  }),

  P("progress-circle-ring", {
    category: "components",
    subcategory: "feedback",
    title: "Progress Circle Ring",
    description: "An SVG circular percentage progress meter with stroke dash-offset visualization and centered value readout.",
    tags: ["progress", "circle", "svg", "ring", "percentage"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "pill",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "static-circle-gauge",
      visualModel: "circumferential-ring-meter",
      motionModel: "none",
      layoutModel: "centered-circular-box",
      semanticPurpose: "circular-capacity-gauge",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface ProgressCircleRingProps {
  percent?: number;
  className?: string;
}

export function ProgressCircleRing({ percent = 82, className }: ProgressCircleRingProps) {
  const radius = 40;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (percent / 100) * circ;

  return (
    <div className={cn("relative flex h-28 w-28 items-center justify-center", className)}>
      <svg className="h-full w-full rotate-[-90deg]">
        <circle cx="56" cy="56" r={radius} stroke="currentColor" strokeWidth="8" fill="transparent" className="text-line" />
        <circle
          cx="56"
          cy="56"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-ink"
        />
      </svg>
      <span className="absolute font-mono text-sm font-bold text-ink">{percent}%</span>
    </div>
  );
}

export default ProgressCircleRing;
`,
    demo: `import { ProgressCircleRing } from "./progress-circle-ring";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <ProgressCircleRing percent={82} />
    </div>
  );
}
`,
  }),

  P("accordion-chevron-list", {
    category: "components",
    subcategory: "data-display",
    title: "Accordion Chevron List",
    description: "A vertical list of stacked question and answer disclosures with animated chevron indicators.",
    tags: ["accordion", "faq", "disclosure", "chevron", "list"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "accordion-chevron-toggle",
      visualModel: "stacked-ruled-disclosures",
      motionModel: "stepwise-content-expansion",
      layoutModel: "vertical-accordion-flow",
      semanticPurpose: "faq-disclosure-stack",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface AccordionChevronListProps {
  className?: string;
}

export function AccordionChevronList({ className }: AccordionChevronListProps) {
  const [open, setOpen] = useState<number | null>(0);
  const items = [
    { q: "Is OpenUI fully typed?", a: "Yes, every resource carries strict TypeScript interfaces." },
    { q: "How are components installed?", a: "Via the openui CLI copying zero-dependency source." },
  ];

  return (
    <div className={cn("w-full max-w-md rounded-xl border border-line bg-paper p-4 shadow-sm divide-y divide-line", className)}>
      {items.map((item, idx) => {
        const isOpen = open === idx;
        return (
          <div key={item.q} className="py-3">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : idx)}
              className="flex w-full items-center justify-between font-display text-sm font-bold text-ink"
            >
              <span>{item.q}</span>
              <span className="font-mono text-xs">{isOpen ? "▲" : "▼"}</span>
            </button>
            {isOpen && <p className="mt-2 text-xs leading-relaxed text-ink/70 font-mono">{item.a}</p>}
          </div>
        );
      })}
    </div>
  );
}

export default AccordionChevronList;
`,
    demo: `import { AccordionChevronList } from "./accordion-chevron-list";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <AccordionChevronList />
    </div>
  );
}
`,
  }),

  P("badge-tag-strip", {
    category: "components",
    subcategory: "data-display",
    title: "Badge Tag Strip",
    description: "A collection of metadata chips displaying category taxonomy tags with color category coding.",
    tags: ["tags", "badges", "taxonomy", "metadata", "chips"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "pill",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "passive-metadata-tags",
      visualModel: "linear-taxonomy-pills",
      motionModel: "none",
      layoutModel: "horizontal-tag-strip",
      semanticPurpose: "taxonomy-metadata-strip",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface BadgeTagStripProps {
  tags?: string[];
  className?: string;
}

export function BadgeTagStrip({
  tags = ["TypeScript", "React 19", "Tailwind", "Design DNA"],
  className,
}: BadgeTagStripProps) {
  return (
    <div className={cn("inline-flex flex-wrap gap-1.5", className)}>
      {tags.map((t) => (
        <span
          key={t}
          className="rounded-full border border-line bg-line/10 px-3 py-0.5 font-mono text-[10px] font-semibold text-ink"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

export default BadgeTagStrip;
`,
    demo: `import { BadgeTagStrip } from "./badge-tag-strip";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <BadgeTagStrip />
    </div>
  );
}
`,
  }),

  P("combobox-autocomplete", {
    category: "components",
    subcategory: "inputs",
    title: "Combobox Autocomplete",
    description: "A searchable dropdown select combining a text input field with filtered option suggestions.",
    tags: ["combobox", "autocomplete", "dropdown", "search", "select"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "autocomplete-filter-select",
      visualModel: "combobox-anchor-dropdown",
      motionModel: "none",
      layoutModel: "stacked-combobox-field",
      semanticPurpose: "autocomplete-search-field",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ComboboxAutocompleteProps {
  className?: string;
}

export function ComboboxAutocomplete({ className }: ComboboxAutocompleteProps) {
  const [val, setVal] = useState("");
  const [open, setOpen] = useState(false);
  const options = ["components", "text", "motion", "interactions", "backgrounds", "layouts"];

  const filtered = options.filter((o) => o.toLowerCase().includes(val.toLowerCase()));

  return (
    <div className={cn("relative w-full max-w-xs font-mono text-xs", className)}>
      <input
        type="text"
        value={val}
        onChange={(e) => {
          setVal(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder="Select category..."
        className="w-full rounded-xl border border-line bg-paper p-2.5 outline-none focus:border-ink shadow-sm"
      />

      {open && filtered.length > 0 && (
        <div className="absolute top-full mt-1.5 inset-x-0 rounded-xl border border-line bg-paper p-1.5 shadow-xl z-20 space-y-1">
          {filtered.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                setVal(opt);
                setOpen(false);
              }}
              className="px-3 py-1.5 rounded hover:bg-line/20 cursor-pointer text-ink"
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ComboboxAutocomplete;
`,
    demo: `import { ComboboxAutocomplete } from "./combobox-autocomplete";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <ComboboxAutocomplete />
    </div>
  );
}
`,
  }),

  P("toggle-switch-card", {
    category: "components",
    subcategory: "controls",
    title: "Toggle Switch Card",
    description: "A settings tile row containing descriptive label copy paired with a boolean toggle switch.",
    tags: ["toggle", "switch", "settings", "tile", "controls"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "setting-tile-toggle",
      visualModel: "setting-row-chassis",
      motionModel: "lateral-switch-slide",
      layoutModel: "horizontal-setting-tile",
      semanticPurpose: "preference-toggle-card",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ToggleSwitchCardProps {
  title?: string;
  description?: string;
  className?: string;
}

export function ToggleSwitchCard({
  title = "Telemetry Broadcast",
  description = "Share anonymous build performance metrics",
  className,
}: ToggleSwitchCardProps) {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className={cn("flex w-full max-w-sm items-center justify-between rounded-xl border border-line bg-paper p-4 shadow-sm", className)}>
      <div className="pr-4">
        <h5 className="font-display text-sm font-bold text-ink">{title}</h5>
        <p className="mt-0.5 font-mono text-[10px] text-ink/60">{description}</p>
      </div>

      <div
        onClick={() => setEnabled((e) => !e)}
        className={cn(
          "relative h-6 w-11 cursor-pointer rounded-full border border-line p-0.5 transition-colors",
          enabled ? "bg-ink" : "bg-line/20"
        )}
      >
        <div
          className={cn(
            "h-5 w-5 rounded-full bg-paper shadow-sm transition-transform duration-200",
            enabled ? "translate-x-5" : "translate-x-0"
          )}
        />
      </div>
    </div>
  );
}

export default ToggleSwitchCard;
`,
    demo: `import { ToggleSwitchCard } from "./toggle-switch-card";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <ToggleSwitchCard />
    </div>
  );
}
`,
  }),

  P("radio-group-card", {
    category: "components",
    subcategory: "inputs",
    title: "Radio Group Card",
    description: "A tiered choice selector displaying options as selectable cards with checkmark status.",
    tags: ["radio", "cards", "selection", "plans", "tier"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "stack",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "card-radio-selection",
      visualModel: "selectable-tier-cards",
      motionModel: "none",
      layoutModel: "stacked-radio-deck",
      semanticPurpose: "pricing-tier-selector",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface RadioGroupCardProps {
  className?: string;
}

export function RadioGroupCard({ className }: RadioGroupCardProps) {
  const [selected, setSelected] = useState("pro");
  const tiers = [
    { id: "starter", title: "Starter Spec", price: "Free" },
    { id: "pro", title: "Enterprise Registry", price: "$29/mo" },
  ];

  return (
    <div className={cn("w-full max-w-sm space-y-2 font-mono text-xs", className)}>
      {tiers.map((t) => {
        const isSel = selected === t.id;
        return (
          <div
            key={t.id}
            onClick={() => setSelected(t.id)}
            className={cn(
              "flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all",
              isSel ? "border-ink bg-line/10 shadow-sm" : "border-line bg-paper hover:border-ink/60"
            )}
          >
            <div>
              <span className="font-bold text-ink">{t.title}</span>
              <span className="text-ink/60 block text-[10px] mt-0.5">{t.price}</span>
            </div>
            <div className={cn("h-4 w-4 rounded-full border flex items-center justify-center", isSel ? "border-ink bg-ink" : "border-line")}>
              {isSel && <div className="h-1.5 w-1.5 rounded-full bg-paper" />}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RadioGroupCard;
`,
    demo: `import { RadioGroupCard } from "./radio-group-card";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <RadioGroupCard />
    </div>
  );
}
`,
  }),

  P("breadcrumbs-slash-trail", {
    category: "components",
    subcategory: "navigation",
    title: "Breadcrumbs Slash Trail",
    description: "An accessible trail of hierarchy waypoints separated by slash delimiters indicating current route depth.",
    tags: ["breadcrumbs", "navigation", "trail", "slash", "hierarchy"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "hierarchical-wayfinding",
      visualModel: "slash-separated-trail",
      motionModel: "none",
      layoutModel: "horizontal-inline-trail",
      semanticPurpose: "route-breadcrumb-trail",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface BreadcrumbsSlashTrailProps {
  items?: string[];
  className?: string;
}

export function BreadcrumbsSlashTrail({
  items = ["Registry", "Components", "Breadcrumbs"],
  className,
}: BreadcrumbsSlashTrailProps) {
  return (
    <nav className={cn("flex items-center gap-2 font-mono text-xs", className)}>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <div key={item} className="flex items-center gap-2">
            <span className={cn(isLast ? "font-bold text-ink" : "text-ink/60 hover:text-ink cursor-pointer")}>
              {item}
            </span>
            {!isLast && <span className="text-ink/40">/</span>}
          </div>
        );
      })}
    </nav>
  );
}

export default BreadcrumbsSlashTrail;
`,
    demo: `import { BreadcrumbsSlashTrail } from "./breadcrumbs-slash-trail";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <BreadcrumbsSlashTrail />
    </div>
  );
}
`,
  }),

  P("stat-sparkline-tile", {
    category: "components",
    subcategory: "data-display",
    title: "Stat Sparkline Tile",
    description: "A compact analytics KPI tile paired with an inline SVG sparkline graph visualizing 7-day trendlines.",
    tags: ["sparkline", "chart", "metrics", "kpi", "analytics"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "kpi-sparkline-inspection",
      visualModel: "trendline-metric-card",
      motionModel: "none",
      layoutModel: "metric-tile-with-sparkline",
      semanticPurpose: "sparkline-trend-tile",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface StatSparklineTileProps {
  className?: string;
}

export function StatSparklineTile({ className }: StatSparklineTileProps) {
  return (
    <div className={cn("w-full max-w-xs rounded-xl border border-line bg-paper p-5 shadow-sm font-mono text-xs", className)}>
      <span className="text-ink/60 uppercase text-[10px]">THROUGHPUT TREND</span>
      <div className="flex items-end justify-between mt-2">
        <span className="text-2xl font-bold text-ink">99.98%</span>
        <svg className="h-6 w-20 overflow-visible text-emerald-600">
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            points="0,20 15,14 30,18 45,8 60,10 75,4 90,2"
          />
        </svg>
      </div>
    </div>
  );
}

export default StatSparklineTile;
`,
    demo: `import { StatSparklineTile } from "./stat-sparkline-tile";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <StatSparklineTile />
    </div>
  );
}
`,
  }),

  P("toast-notification-card", {
    category: "components",
    subcategory: "feedback",
    title: "Toast Notification Card",
    description: "A self-contained alert toast banner displaying action state, timestamp, and instant dismiss button.",
    tags: ["toast", "notification", "alert", "feedback", "card"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "mechanical",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "dismissible-toast-alert",
      visualModel: "pill-toast-banner",
      motionModel: "none",
      layoutModel: "compact-toast-card",
      semanticPurpose: "transient-toast-notice",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ToastNotificationCardProps {
  message?: string;
  className?: string;
}

export function ToastNotificationCard({
  message = "Registry package index rebuilt successfully.",
  className,
}: ToastNotificationCardProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className={cn("flex w-full max-w-sm items-center justify-between rounded-xl border border-line bg-paper p-4 shadow-lg font-mono text-xs", className)}>
      <div className="flex items-center gap-2 text-ink">
        <span className="text-emerald-600 font-bold">✓</span>
        <span>{message}</span>
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="text-ink/40 hover:text-ink ml-3 font-bold"
      >
        ✕
      </button>
    </div>
  );
}

export default ToastNotificationCard;
`,
    demo: `import { ToastNotificationCard } from "./toast-notification-card";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <ToastNotificationCard />
    </div>
  );
}
`,
  }),

  P("floating-dock-bar", {
    category: "components",
    subcategory: "navigation",
    title: "Floating Dock Bar",
    description: "An elevated floating application launcher shelf with icon buttons, tooltips, and blur backdrop.",
    tags: ["dock", "floating", "launcher", "navigation", "shelf"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "pill",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "floating-dock-navigation",
      visualModel: "capsule-dock-shelf",
      motionModel: "none",
      layoutModel: "floating-bottom-dock",
      semanticPurpose: "app-launcher-dock-bar",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface FloatingDockBarProps {
  className?: string;
}

export function FloatingDockBar({ className }: FloatingDockBarProps) {
  const [active, setActive] = useState(0);
  const items = ["Home", "Components", "Docs", "Settings"];

  return (
    <div className={cn("inline-flex items-center gap-1.5 rounded-full border border-line bg-paper/90 p-2 shadow-xl backdrop-blur font-mono text-xs", className)}>
      {items.map((item, idx) => (
        <button
          key={item}
          type="button"
          onClick={() => setActive(idx)}
          className={cn(
            "rounded-full px-3.5 py-1.5 transition-all font-semibold",
            active === idx ? "bg-ink text-paper shadow-sm" : "text-ink/60 hover:text-ink"
          )}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default FloatingDockBar;
`,
    demo: `import { FloatingDockBar } from "./floating-dock-bar";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <FloatingDockBar />
    </div>
  );
}
`,
  }),

  P("segmented-tabs-card", {
    category: "components",
    subcategory: "navigation",
    title: "Segmented Tabs Card",
    description: "A surface container featuring segmented tabs integrated directly into the header boundary.",
    tags: ["tabs", "card", "segmented", "header", "views"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "card-header-tab-switch",
      visualModel: "tabbed-header-card",
      motionModel: "none",
      layoutModel: "stacked-tabbed-card",
      semanticPurpose: "multi-view-panel-card",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SegmentedTabsCardProps {
  className?: string;
}

export function SegmentedTabsCard({ className }: SegmentedTabsCardProps) {
  const [tab, setTab] = useState(0);
  const tabs = ["Metrics", "Logs"];

  return (
    <div className={cn("w-full max-w-sm rounded-xl border border-line bg-paper shadow-sm overflow-hidden font-mono text-xs", className)}>
      <div className="flex justify-between items-center p-3 border-b border-line bg-line/10">
        <span className="font-bold text-ink uppercase">PANEL VIEW</span>
        <div className="flex rounded-lg border border-line bg-paper p-0.5">
          {tabs.map((t, idx) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(idx)}
              className={cn("px-2.5 py-0.5 rounded text-[11px] font-semibold", tab === idx && "bg-ink text-paper")}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 text-ink/70">
        {tab === 0 ? "Throughput: 4,200 req/sec | Latency: 12ms" : "02:14:09 [INFO] Cluster sync verified."}
      </div>
    </div>
  );
}

export default SegmentedTabsCard;
`,
    demo: `import { SegmentedTabsCard } from "./segmented-tabs-card";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <SegmentedTabsCard />
    </div>
  );
}
`,
  }),

  P("avatar-collaborator-stack", {
    category: "components",
    subcategory: "data-display",
    title: "Avatar Collaborator Stack",
    description: "An overlapping circle avatar deck showing initials of active editors on a shared workspace canvas.",
    tags: ["avatars", "collaborators", "stack", "presence", "deck"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "pill",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
    },
    fingerprint: {
      interactionModel: "presence-collaborator-stack",
      visualModel: "overlapping-initials-discs",
      motionModel: "none",
      layoutModel: "horizontal-avatar-chain",
      semanticPurpose: "canvas-collaborator-stack",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface AvatarCollaboratorStackProps {
  names?: string[];
  className?: string;
}

export function AvatarCollaboratorStack({
  names = ["Elena", "Sora", "Marcus", "Kaelen"],
  className,
}: AvatarCollaboratorStackProps) {
  return (
    <div className={cn("inline-flex items-center -space-x-2", className)}>
      {names.map((n) => (
        <div
          key={n}
          className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-paper bg-ink font-mono text-xs font-bold text-paper shadow-sm"
        >
          {n[0]}
        </div>
      ))}
    </div>
  );
}

export default AvatarCollaboratorStack;
`,
    demo: `import { AvatarCollaboratorStack } from "./avatar-collaborator-stack";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <AvatarCollaboratorStack />
    </div>
  );
}
`,
  }),

  P("code-diff-viewer", {
    category: "components",
    subcategory: "data-display",
    title: "Code Diff Viewer",
    description: "A line-by-line syntax diff viewer formatting added and deleted lines with green and red gutter tags.",
    tags: ["diff", "code", "git", "syntax", "viewer"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "compact",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "line-diff-inspection",
      visualModel: "gutter-tagged-diff-block",
      motionModel: "none",
      layoutModel: "tabular-diff-terminal",
      semanticPurpose: "code-diff-inspector",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface CodeDiffViewerProps {
  className?: string;
}

export function CodeDiffViewer({ className }: CodeDiffViewerProps) {
  const lines = [
    { type: "del", text: "- const registry = fetchRegistrySync();" },
    { type: "add", text: "+ const registry = await fetchRegistry();" },
    { type: "same", text: "  return validate(registry);" },
  ];

  return (
    <div className={cn("w-full max-w-sm rounded-xl border border-line bg-paper p-4 font-mono text-xs shadow-sm space-y-1", className)}>
      {lines.map((l, idx) => (
        <div
          key={idx}
          className={cn(
            "p-1 rounded",
            l.type === "del" && "bg-red-500/10 text-red-600",
            l.type === "add" && "bg-emerald-500/10 text-emerald-600",
            l.type === "same" && "text-ink/60"
          )}
        >
          {l.text}
        </div>
      ))}
    </div>
  );
}

export default CodeDiffViewer;
`,
    demo: `import { CodeDiffViewer } from "./code-diff-viewer";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <CodeDiffViewer />
    </div>
  );
}
`,
  }),
];

import type { ResourceDefinition } from "../lib/definitions.js";

const P = (name: string, definition: Omit<ResourceDefinition, "name">): ResourceDefinition => ({
  name,
  ...definition,
});

export default [
  P("metric-stat-card", {
    category: "components",
    subcategory: "data-display",
    title: "Metric Stat Card",
    description: "A KPI scorecard tile featuring large numeric metrics, percentage delta badges, and contextual timeframe labels.",
    tags: ["metric", "kpi", "stat", "card", "dashboard"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "passive-kpi-inspection",
      visualModel: "bordered-kpi-card",
      motionModel: "none",
      layoutModel: "kpi-metric-tile",
      semanticPurpose: "dashboard-metric-tile",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface MetricStatCardProps {
  label?: string;
  value?: string;
  change?: string;
  positive?: boolean;
  className?: string;
}

export function MetricStatCard({
  label = "Monthly Active Queries",
  value = "1,842,900",
  change = "+14.2%",
  positive = true,
  className,
}: MetricStatCardProps) {
  return (
    <div className={cn("w-full max-w-xs rounded-xl border border-line bg-paper p-5 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60 uppercase">{label}</span>
      <div className="mt-2 flex items-baseline justify-between">
        <span className="font-mono text-2xl font-bold text-ink">{value}</span>
        <span
          className={cn(
            "rounded px-2 py-0.5 font-mono text-xs font-semibold",
            positive ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"
          )}
        >
          {change}
        </span>
      </div>
      <p className="mt-3 font-mono text-[10px] text-ink/40">vs. previous 30-day baseline</p>
    </div>
  );
}

export default MetricStatCard;
`,
    demo: `import { MetricStatCard } from "./metric-stat-card";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <MetricStatCard />
    </div>
  );
}
`,
  }),

  P("avatar-badge-group", {
    category: "components",
    subcategory: "data-display",
    title: "Avatar Badge Group",
    description: "A compact overlapping avatar stack with live online presence status dots and overflow collaborator count.",
    tags: ["avatar", "group", "collaborators", "stack", "presence"],
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
      interactionModel: "avatar-cluster-inspection",
      visualModel: "overlapping-avatar-rings",
      motionModel: "micro-avatar-hover-lift",
      layoutModel: "horizontal-avatar-chain",
      semanticPurpose: "team-presence-cluster",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface AvatarBadgeGroupProps {
  users?: { name: string; online: boolean }[];
  className?: string;
}

export function AvatarBadgeGroup({
  users = [
    { name: "Linus", online: true },
    { name: "Ada", online: true },
    { name: "Grace", online: false },
  ],
  className,
}: AvatarBadgeGroupProps) {
  return (
    <div className={cn("inline-flex items-center", className)}>
      <div className="flex -space-x-2">
        {users.map((u) => (
          <div key={u.name} className="relative group">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-paper bg-ink text-xs font-bold text-paper shadow-sm">
              {u.name[0]}
            </div>
            {u.online && (
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-paper bg-emerald-500" />
            )}
          </div>
        ))}
      </div>
      <span className="ml-3 font-mono text-xs text-ink/60">+4 contributors</span>
    </div>
  );
}

export default AvatarBadgeGroup;
`,
    demo: `import { AvatarBadgeGroup } from "./avatar-badge-group";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <AvatarBadgeGroup />
    </div>
  );
}
`,
  }),

  P("command-menu-bar", {
    category: "components",
    subcategory: "navigation",
    title: "Command Menu Bar",
    description: "A compact horizontal action ribbon containing tool buttons, key shortcuts, and divider rules.",
    tags: ["toolbar", "menu", "command", "buttons", "shortcuts"],
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
      interactionModel: "toolbar-action-invocation",
      visualModel: "divided-toolbar-rack",
      motionModel: "none",
      layoutModel: "horizontal-toolbar-strip",
      semanticPurpose: "document-tool-ribbon",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface CommandMenuBarProps {
  className?: string;
}

export function CommandMenuBar({ className }: CommandMenuBarProps) {
  const actions = [
    { label: "Cut", key: "⌘X" },
    { label: "Copy", key: "⌘C" },
    { label: "Paste", key: "⌘V" },
    { label: "Format", key: "⌥F" },
  ];

  return (
    <div className={cn("inline-flex items-center gap-1 rounded-xl border border-line bg-paper p-1.5 shadow-sm", className)}>
      {actions.map((act) => (
        <button
          key={act.label}
          type="button"
          className="flex items-center gap-2 rounded-lg px-3 py-1.5 font-mono text-xs text-ink hover:bg-line/20 transition-colors"
        >
          <span>{act.label}</span>
          <span className="rounded bg-line/30 px-1 py-0.5 text-[9px] text-ink/50">{act.key}</span>
        </button>
      ))}
    </div>
  );
}

export default CommandMenuBar;
`,
    demo: `import { CommandMenuBar } from "./command-menu-bar";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <CommandMenuBar />
    </div>
  );
}
`,
  }),

  P("stepped-progress-rail", {
    category: "components",
    subcategory: "feedback",
    title: "Stepped Progress Rail",
    description: "A segmented workflow milestone indicator showing current execution step and completed checkpoints.",
    tags: ["progress", "rail", "stepped", "milestones", "workflow"],
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
      interactionModel: "step-station-milestones",
      visualModel: "segmented-station-rail",
      motionModel: "step-indicator-advance",
      layoutModel: "horizontal-progress-rail",
      semanticPurpose: "workflow-phase-indicator",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface SteppedProgressRailProps {
  currentStep?: number;
  totalSteps?: number;
  className?: string;
}

export function SteppedProgressRail({
  currentStep = 3,
  totalSteps = 5,
  className,
}: SteppedProgressRailProps) {
  return (
    <div className={cn("w-full max-w-sm rounded-xl border border-line bg-paper p-5 shadow-sm", className)}>
      <div className="flex justify-between font-mono text-xs text-ink/60 mb-3">
        <span>DEPLOY STAGES</span>
        <span className="font-bold text-ink">STEP {currentStep}/{totalSteps}</span>
      </div>

      <div className="flex gap-1.5">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-2 flex-1 rounded-full transition-all duration-300",
              i < currentStep ? "bg-ink" : "bg-line/40"
            )}
          />
        ))}
      </div>
    </div>
  );
}

export default SteppedProgressRail;
`,
    demo: `import { SteppedProgressRail } from "./stepped-progress-rail";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <SteppedProgressRail />
    </div>
  );
}
`,
  }),

  P("search-filter-input", {
    category: "components",
    subcategory: "inputs",
    title: "Search Filter Input",
    description: "An input field with search magnifying glass prefix, clear button, and keyboard shortcut badge affordance.",
    tags: ["search", "input", "filter", "keyboard", "affordance"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "input-field-query-entry",
      visualModel: "prefixed-search-chassis",
      motionModel: "none",
      layoutModel: "horizontal-input-bar",
      semanticPurpose: "search-query-field",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SearchFilterInputProps {
  placeholder?: string;
  className?: string;
}

export function SearchFilterInput({
  placeholder = "Filter resources...",
  className,
}: SearchFilterInputProps) {
  const [val, setVal] = useState("");

  return (
    <div className={cn("relative flex items-center w-full max-w-sm", className)}>
      <span className="absolute left-3 text-ink/40 font-mono text-xs">🔍</span>
      <input
        type="text"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-line bg-paper py-2.5 pl-9 pr-12 font-mono text-xs text-ink placeholder:text-ink/40 focus:border-ink focus:outline-none shadow-sm"
      />
      {val ? (
        <button
          type="button"
          onClick={() => setVal("")}
          className="absolute right-3 font-mono text-xs text-ink/50 hover:text-ink"
        >
          ✕
        </button>
      ) : (
        <span className="absolute right-3 rounded border border-line px-1.5 py-0.5 font-mono text-[9px] text-ink/40">
          /
        </span>
      )}
    </div>
  );
}

export default SearchFilterInput;
`,
    demo: `import { SearchFilterInput } from "./search-filter-input";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <SearchFilterInput />
    </div>
  );
}
`,
  }),

  P("rating-star-group", {
    category: "components",
    subcategory: "inputs",
    title: "Rating Star Group",
    description: "An accessible rating group displaying star glyphs with locked status and numeric feedback score.",
    tags: ["rating", "stars", "review", "score", "feedback"],
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
      interactionModel: "star-rating-scoring",
      visualModel: "five-star-glyph-chain",
      motionModel: "glyph-highlight-step",
      layoutModel: "horizontal-star-group",
      semanticPurpose: "review-star-group",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface RatingStarGroupProps {
  initialRating?: number;
  className?: string;
}

export function RatingStarGroup({ initialRating = 4, className }: RatingStarGroupProps) {
  const [rating, setRating] = useState(initialRating);

  return (
    <div className={cn("inline-flex items-center gap-3 rounded-xl border border-line bg-paper p-3 shadow-sm", className)}>
      <div className="flex gap-1 text-ink">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="text-lg transition-transform active:scale-90"
          >
            {star <= rating ? "★" : "☆"}
          </button>
        ))}
      </div>
      <span className="font-mono text-xs font-bold text-ink">{rating}.0 / 5.0</span>
    </div>
  );
}

export default RatingStarGroup;
`,
    demo: `import { RatingStarGroup } from "./rating-star-group";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <RatingStarGroup />
    </div>
  );
}
`,
  }),

  P("keycap-badge", {
    category: "components",
    subcategory: "data-display",
    title: "Keycap Badge",
    description: "A mechanical keycap badge styled with bottom beveled edge shadows to simulate physical mechanical keyboard caps.",
    tags: ["keycap", "keyboard", "badge", "shortcut", "3d"],
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
      interactionModel: "keycap-badge-press",
      visualModel: "beveled-keycap-slab",
      motionModel: "tactile-depression",
      layoutModel: "inline-keycap-badge",
      semanticPurpose: "hotkey-keycap-indicator",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface KeycapBadgeProps {
  keyLabel?: string;
  className?: string;
}

export function KeycapBadge({ keyLabel = "ESC", className }: KeycapBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded border border-line bg-paper px-2.5 py-1 font-mono text-xs font-bold text-ink shadow-[0_3px_0_0_rgba(0,0,0,0.15)] active:translate-y-0.5 active:shadow-none select-none",
        className
      )}
    >
      {keyLabel}
    </span>
  );
}

export default KeycapBadge;
`,
    demo: `import { KeycapBadge } from "./keycap-badge";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center gap-2 bg-paper p-8">
      <KeycapBadge keyLabel="⌘" />
      <KeycapBadge keyLabel="K" />
    </div>
  );
}
`,
  }),

  P("expandable-data-row", {
    category: "components",
    subcategory: "data-display",
    title: "Expandable Data Row",
    description: "A ledger row that expands on click to reveal detailed JSON payload keys and network latency metrics.",
    tags: ["row", "expandable", "data", "table", "ledger"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "compact",
      shapeLanguage: "sharp",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "row-disclosure-toggle",
      visualModel: "ruled-ledger-row",
      motionModel: "stepwise-accordion-open",
      layoutModel: "stacked-data-row",
      semanticPurpose: "data-payload-inspector",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ExpandableDataRowProps {
  id?: string;
  status?: string;
  latency?: string;
  className?: string;
}

export function ExpandableDataRow({
  id = "REQ_80912_AF",
  status = "200 OK",
  latency = "24ms",
  className,
}: ExpandableDataRowProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("w-full max-w-md rounded-xl border border-line bg-paper overflow-hidden shadow-sm", className)}>
      <div
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-line/10 transition-colors font-mono text-xs"
      >
        <span className="font-bold text-ink">{id}</span>
        <div className="flex items-center gap-3">
          <span className="text-emerald-600 font-semibold">{status}</span>
          <span className="text-ink/50">{latency}</span>
          <span>{open ? "▲" : "▼"}</span>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-line/10 p-4 font-mono text-[11px] text-ink/70 space-y-1">
          <div>content-type: application/json</div>
          <div>cache-control: public, max-age=31536000, immutable</div>
          <div>x-openui-worker-id: worker-fra-09</div>
        </div>
      )}
    </div>
  );
}

export default ExpandableDataRow;
`,
    demo: `import { ExpandableDataRow } from "./expandable-data-row";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <ExpandableDataRow />
    </div>
  );
}
`,
  }),

  P("segmented-pill-toggle", {
    category: "components",
    subcategory: "controls",
    title: "Segmented Pill Toggle",
    description: "A dual-state pill toggle with active selection highlight, sliding thumb transition, and tactile feedback.",
    tags: ["toggle", "pill", "switch", "binary", "controls"],
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
      interactionModel: "segmented-toggle-choice",
      visualModel: "bordered-pill-switch",
      motionModel: "lateral-thumb-slide",
      layoutModel: "inline-pill-switch",
      semanticPurpose: "binary-mode-selector",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SegmentedPillToggleProps {
  leftLabel?: string;
  rightLabel?: string;
  className?: string;
}

export function SegmentedPillToggle({
  leftLabel = "Light",
  rightLabel = "Dark",
  className,
}: SegmentedPillToggleProps) {
  const [selected, setSelected] = useState<"left" | "right">("left");

  return (
    <div className={cn("inline-flex rounded-full border border-line bg-line/20 p-1", className)}>
      <button
        type="button"
        onClick={() => setSelected("left")}
        className={cn(
          "rounded-full px-4 py-1.5 font-mono text-xs font-bold transition-all",
          selected === "left" ? "bg-ink text-paper shadow-sm" : "text-ink/60 hover:text-ink"
        )}
      >
        {leftLabel}
      </button>
      <button
        type="button"
        onClick={() => setSelected("right")}
        className={cn(
          "rounded-full px-4 py-1.5 font-mono text-xs font-bold transition-all",
          selected === "right" ? "bg-ink text-paper shadow-sm" : "text-ink/60 hover:text-ink"
        )}
      >
        {rightLabel}
      </button>
    </div>
  );
}

export default SegmentedPillToggle;
`,
    demo: `import { SegmentedPillToggle } from "./segmented-pill-toggle";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <SegmentedPillToggle />
    </div>
  );
}
`,
  }),

  P("dropdown-action-menu", {
    category: "components",
    subcategory: "navigation",
    title: "Dropdown Action Menu",
    description: "A contextual action menu container providing options with icons, danger states, and divider lines.",
    tags: ["dropdown", "menu", "actions", "popover", "context"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "stack",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "mechanical",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "dropdown-popover-selection",
      visualModel: "bordered-menu-surface",
      motionModel: "popover-appearance-fade",
      layoutModel: "dropdown-action-stack",
      semanticPurpose: "popover-action-menu",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface DropdownActionMenuProps {
  className?: string;
}

export function DropdownActionMenu({ className }: DropdownActionMenuProps) {
  const [open, setOpen] = useState(true);

  return (
    <div className={cn("relative inline-block text-left", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="rounded-lg border border-line bg-paper px-4 py-2 font-mono text-xs font-bold text-ink shadow-sm hover:bg-line/20"
      >
        Options ▾
      </button>

      {open && (
        <div className="mt-2 w-48 rounded-xl border border-line bg-paper p-1.5 shadow-xl font-mono text-xs divide-y divide-line">
          <div className="py-1">
            <div className="px-3 py-1.5 hover:bg-line/20 rounded cursor-pointer text-ink">Edit Spec</div>
            <div className="px-3 py-1.5 hover:bg-line/20 rounded cursor-pointer text-ink">Duplicate</div>
          </div>
          <div className="py-1">
            <div className="px-3 py-1.5 hover:bg-red-500/10 text-red-600 rounded cursor-pointer font-bold">
              Delete Resource
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DropdownActionMenu;
`,
    demo: `import { DropdownActionMenu } from "./dropdown-action-menu";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <DropdownActionMenu />
    </div>
  );
}
`,
  }),

  P("banner-alert-box", {
    category: "components",
    subcategory: "feedback",
    title: "Banner Alert Box",
    description: "A system warning alert banner with contextual icon, status description, and dismissal button.",
    tags: ["alert", "banner", "warning", "notification", "feedback"],
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
      interactionModel: "dismissible-alert-inspection",
      visualModel: "bordered-alert-callout",
      motionModel: "none",
      layoutModel: "full-width-alert-banner",
      semanticPurpose: "system-status-alert",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface BannerAlertBoxProps {
  title?: string;
  description?: string;
  className?: string;
}

export function BannerAlertBox({
  title = "Registry Validation Warning",
  description = "4 legacy definitions require explicit subcategory assignment before compiling.",
  className,
}: BannerAlertBoxProps) {
  const [closed, setClosed] = useState(false);
  if (closed) return null;

  return (
    <div className={cn("flex w-full max-w-md items-start justify-between rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 font-mono text-xs", className)}>
      <div>
        <h5 className="font-bold text-amber-800">⚠️ {title}</h5>
        <p className="mt-1 text-amber-900/80 leading-relaxed">{description}</p>
      </div>
      <button
        type="button"
        onClick={() => setClosed(true)}
        className="text-amber-800 hover:text-black ml-3 font-bold"
      >
        ✕
      </button>
    </div>
  );
}

export default BannerAlertBox;
`,
    demo: `import { BannerAlertBox } from "./banner-alert-box";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <BannerAlertBox />
    </div>
  );
}
`,
  }),

  P("pagination-stepper", {
    category: "components",
    subcategory: "navigation",
    title: "Pagination Stepper",
    description: "A page navigation stepper bar with previous/next buttons and active numeric page pill.",
    tags: ["pagination", "stepper", "pages", "navigation", "table"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "page-index-advancement",
      visualModel: "stepped-pagination-bar",
      motionModel: "stepwise-page-increment",
      layoutModel: "horizontal-pagination-cluster",
      semanticPurpose: "table-page-navigator",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface PaginationStepperProps {
  totalPages?: number;
  className?: string;
}

export function PaginationStepper({ totalPages = 8, className }: PaginationStepperProps) {
  const [page, setPage] = useState(1);

  return (
    <div className={cn("inline-flex items-center gap-2 rounded-xl border border-line bg-paper p-2 shadow-sm font-mono text-xs", className)}>
      <button
        type="button"
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        disabled={page === 1}
        className="rounded px-2.5 py-1 border border-line hover:bg-line/20 disabled:opacity-30"
      >
        Prev
      </button>

      <span className="px-3 font-bold text-ink">
        {page} / {totalPages}
      </span>

      <button
        type="button"
        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        disabled={page === totalPages}
        className="rounded px-2.5 py-1 border border-line hover:bg-line/20 disabled:opacity-30"
      >
        Next
      </button>
    </div>
  );
}

export default PaginationStepper;
`,
    demo: `import { PaginationStepper } from "./pagination-stepper";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <PaginationStepper />
    </div>
  );
}
`,
  }),

  P("color-swatch-picker", {
    category: "components",
    subcategory: "inputs",
    title: "Color Swatch Picker",
    description: "A compact matrix palette picker allowing color tone selection with checkmark indicators.",
    tags: ["color", "picker", "palette", "swatches", "tokens"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "swatch-selection-click",
      visualModel: "tessellated-color-chips",
      motionModel: "none",
      layoutModel: "grid-swatch-array",
      semanticPurpose: "theme-color-selector",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ColorSwatchPickerProps {
  className?: string;
}

export function ColorSwatchPicker({ className }: ColorSwatchPickerProps) {
  const colors = ["#000000", "#4f46e5", "#0ea5e9", "#10b981", "#f59e0b", "#ef4444"];
  const [active, setActive] = useState(colors[0]);

  return (
    <div className={cn("inline-flex flex-col gap-3 rounded-xl border border-line bg-paper p-4 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60">THEME TONE: {active}</span>
      <div className="flex gap-2">
        {colors.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 shadow-sm transition-transform active:scale-90"
            style={{ backgroundColor: c }}
          >
            {active === c && <span className="text-white text-xs font-bold">✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ColorSwatchPicker;
`,
    demo: `import { ColorSwatchPicker } from "./color-swatch-picker";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <ColorSwatchPicker />
    </div>
  );
}
`,
  }),

  P("slider-numeric-input", {
    category: "components",
    subcategory: "inputs",
    title: "Slider Numeric Input",
    description: "A range control synchronized with a numeric text input field for both analog and exact discrete entry.",
    tags: ["slider", "numeric", "input", "range", "synchronized"],
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
      interactionModel: "synchronized-slider-numeric",
      visualModel: "dual-input-calibrated-chassis",
      motionModel: "instantaneous-value-sync",
      layoutModel: "horizontal-synchronized-pair",
      semanticPurpose: "dual-entry-numeric-slider",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SliderNumericInputProps {
  className?: string;
}

export function SliderNumericInput({ className }: SliderNumericInputProps) {
  const [val, setVal] = useState(48);

  return (
    <div className={cn("w-full max-w-xs rounded-xl border border-line bg-paper p-5 shadow-sm font-mono text-xs", className)}>
      <div className="flex justify-between items-center mb-3">
        <span className="text-ink/60">MEMORY LIMIT</span>
        <div className="flex items-center gap-1">
          <input
            type="number"
            value={val}
            onChange={(e) => setVal(parseInt(e.target.value, 10) || 0)}
            className="w-12 rounded border border-line p-1 text-center font-bold text-ink"
          />
          <span>MB</span>
        </div>
      </div>

      <input
        type="range"
        min="16"
        max="128"
        value={val}
        onChange={(e) => setVal(parseInt(e.target.value, 10))}
        className="w-full cursor-pointer accent-ink"
      />
    </div>
  );
}

export default SliderNumericInput;
`,
    demo: `import { SliderNumericInput } from "./slider-numeric-input";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <SliderNumericInput />
    </div>
  );
}
`,
  }),

  P("status-beacon-badge", {
    category: "components",
    subcategory: "feedback",
    title: "Status Beacon Badge",
    description: "An operational status badge pill featuring an animated pulsing radar dot and uptime latency telemetry.",
    tags: ["beacon", "badge", "status", "uptime", "radar"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "pill",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "accent-only",
    },
    fingerprint: {
      interactionModel: "telemetry-beacon-inspection",
      visualModel: "pulsing-radar-pill",
      motionModel: "annular-ping-oscillation",
      layoutModel: "compact-inline-beacon",
      semanticPurpose: "system-health-beacon",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface StatusBeaconBadgeProps {
  label?: string;
  status?: "healthy" | "degraded" | "down";
  className?: string;
}

export function StatusBeaconBadge({
  label = "API Cluster Live",
  status = "healthy",
  className,
}: StatusBeaconBadgeProps) {
  const colorMap = {
    healthy: "bg-emerald-500",
    degraded: "bg-amber-500",
    down: "bg-red-500",
  };

  return (
    <div className={cn("inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1.5 font-mono text-xs font-bold text-ink shadow-sm", className)}>
      <span className="relative flex h-2.5 w-2.5">
        <span className={cn("absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping", colorMap[status])} />
        <span className={cn("relative inline-flex h-2.5 w-2.5 rounded-full", colorMap[status])} />
      </span>
      <span>{label}</span>
    </div>
  );
}

export default StatusBeaconBadge;
`,
    demo: `import { StatusBeaconBadge } from "./status-beacon-badge";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <StatusBeaconBadge />
    </div>
  );
}
`,
  }),

  P("collapsible-section-card", {
    category: "components",
    subcategory: "cards",
    title: "Collapsible Section Card",
    description: "A surface card featuring a top disclosure header with an animated chevron toggle to collapse body contents.",
    tags: ["card", "collapsible", "disclosure", "accordion", "section"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "mechanical",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "card-chevron-disclosure",
      visualModel: "bordered-collapsible-chassis",
      motionModel: "stepwise-body-collapse",
      layoutModel: "stacked-section-card",
      semanticPurpose: "collapsible-content-card",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface CollapsibleSectionCardProps {
  title?: string;
  className?: string;
}

export function CollapsibleSectionCard({
  title = "Security & Access Policies",
  className,
}: CollapsibleSectionCardProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={cn("w-full max-w-sm rounded-xl border border-line bg-paper overflow-hidden shadow-sm", className)}>
      <div
        onClick={() => setCollapsed((c) => !c)}
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-line/10 transition-colors font-display text-sm font-bold text-ink"
      >
        <span>{title}</span>
        <span className="font-mono text-xs">{collapsed ? "▼" : "▲"}</span>
      </div>

      {!collapsed && (
        <div className="border-t border-line p-4 font-mono text-xs text-ink/70 leading-relaxed">
          Cryptographic token signing enforced across all edge worker requests. Mutual TLS enabled on upstream endpoints.
        </div>
      )}
    </div>
  );
}

export default CollapsibleSectionCard;
`,
    demo: `import { CollapsibleSectionCard } from "./collapsible-section-card";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <CollapsibleSectionCard />
    </div>
  );
}
`,
  }),

  P("tab-pill-strip", {
    category: "components",
    subcategory: "navigation",
    title: "Tab Pill Strip",
    description: "A compact navigation tab pill strip with sliding background selection highlights.",
    tags: ["tabs", "navigation", "pills", "strip", "views"],
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
      interactionModel: "tab-strip-view-switch",
      visualModel: "pill-tab-array",
      motionModel: "none",
      layoutModel: "horizontal-pill-strip",
      semanticPurpose: "view-navigation-strip",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface TabPillStripProps {
  tabs?: string[];
  className?: string;
}

export function TabPillStrip({
  tabs = ["Endpoints", "Schemas", "Security", "Logs"],
  className,
}: TabPillStripProps) {
  const [active, setActive] = useState(0);

  return (
    <div className={cn("inline-flex gap-1.5 rounded-full border border-line bg-paper p-1.5 shadow-sm", className)}>
      {tabs.map((tab, idx) => (
        <button
          key={tab}
          type="button"
          onClick={() => setActive(idx)}
          className={cn(
            "rounded-full px-4 py-1.5 font-mono text-xs font-semibold transition-all",
            active === idx ? "bg-ink text-paper shadow-sm" : "text-ink/60 hover:text-ink"
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default TabPillStrip;
`,
    demo: `import { TabPillStrip } from "./tab-pill-strip";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <TabPillStrip />
    </div>
  );
}
`,
  }),

  P("numeric-counter-stepper", {
    category: "components",
    subcategory: "controls",
    title: "Numeric Counter Stepper",
    description: "A compact integer quantity incrementer with plus/minus buttons and direct text input entry.",
    tags: ["stepper", "counter", "quantity", "controls", "numeric"],
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
      interactionModel: "stepper-quantity-increment",
      visualModel: "tripartite-stepper-box",
      motionModel: "none",
      layoutModel: "inline-stepper-cluster",
      semanticPurpose: "quantity-stepper-control",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface NumericCounterStepperProps {
  initial?: number;
  className?: string;
}

export function NumericCounterStepper({ initial = 1, className }: NumericCounterStepperProps) {
  const [val, setVal] = useState(initial);

  return (
    <div className={cn("inline-flex items-center rounded-lg border border-line bg-paper overflow-hidden shadow-sm font-mono text-xs", className)}>
      <button
        type="button"
        onClick={() => setVal((v) => Math.max(0, v - 1))}
        className="h-8 w-8 hover:bg-line/20 font-bold border-r border-line flex items-center justify-center"
      >
        -
      </button>
      <span className="w-12 text-center font-bold text-ink">{val}</span>
      <button
        type="button"
        onClick={() => setVal((v) => v + 1)}
        className="h-8 w-8 hover:bg-line/20 font-bold border-l border-line flex items-center justify-center"
      >
        +
      </button>
    </div>
  );
}

export default NumericCounterStepper;
`,
    demo: `import { NumericCounterStepper } from "./numeric-counter-stepper";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <NumericCounterStepper />
    </div>
  );
}
`,
  }),

  P("badge-notification-counter", {
    category: "components",
    subcategory: "data-display",
    title: "Badge Notification Counter",
    description: "A compact count badge pill capping high values with plus suffixes for unread notifications.",
    tags: ["badge", "counter", "notifications", "pill", "unread"],
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
      interactionModel: "notification-count-badge",
      visualModel: "circular-badge-pill",
      motionModel: "none",
      layoutModel: "inline-badge-callout",
      semanticPurpose: "unread-notification-badge",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface BadgeNotificationCounterProps {
  count?: number;
  max?: number;
  className?: string;
}

export function BadgeNotificationCounter({
  count = 28,
  max = 99,
  className,
}: BadgeNotificationCounterProps) {
  const display = count > max ? \`\${max}+\` : count;

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-red-500 px-2 py-0.5 font-mono text-[10px] font-bold text-white shadow-sm",
        className
      )}
    >
      {display}
    </span>
  );
}

export default BadgeNotificationCounter;
`,
    demo: `import { BadgeNotificationCounter } from "./badge-notification-counter";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center gap-4 bg-paper p-8">
      <span className="font-mono text-xs text-ink">Alerts</span>
      <BadgeNotificationCounter count={142} />
    </div>
  );
}
`,
  }),

  P("code-snippet-box", {
    category: "components",
    subcategory: "data-display",
    title: "Code Snippet Box",
    description: "A terminal code block container providing syntax presentation, command copy action, and verified toast state.",
    tags: ["code", "snippet", "copy", "terminal", "box"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "compact",
      shapeLanguage: "sharp",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "code-clipboard-copy",
      visualModel: "dark-terminal-block",
      motionModel: "none",
      layoutModel: "terminal-snippet-box",
      semanticPurpose: "command-snippet-display",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface CodeSnippetBoxProps {
  code?: string;
  className?: string;
}

export function CodeSnippetBox({
  code = "pnpm add @openui/registry-schema",
  className,
}: CodeSnippetBoxProps) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={cn("flex w-full max-w-sm items-center justify-between rounded-xl border border-line bg-ink text-paper p-3 font-mono text-xs shadow-md", className)}>
      <span className="truncate pr-3">{code}</span>
      <button
        type="button"
        onClick={copy}
        className="rounded bg-paper/20 px-2 py-1 text-[10px] font-bold hover:bg-paper/30 transition-colors"
      >
        {copied ? "COPIED" : "COPY"}
      </button>
    </div>
  );
}

export default CodeSnippetBox;
`,
    demo: `import { CodeSnippetBox } from "./code-snippet-box";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <CodeSnippetBox />
    </div>
  );
}
`,
  }),

  P("tag-input-field", {
    category: "components",
    subcategory: "inputs",
    title: "Tag Input Field",
    description: "An input container creating removable keyword tag pills upon enter key press or comma delimiter.",
    tags: ["tags", "input", "chips", "pills", "keywords"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "tag-creation-entry",
      visualModel: "pill-chip-input-tray",
      motionModel: "none",
      layoutModel: "horizontal-tag-field",
      semanticPurpose: "keyword-tag-creator",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface TagInputFieldProps {
  className?: string;
}

export function TagInputField({ className }: TagInputFieldProps) {
  const [tags, setTags] = useState(["React", "Motion"]);
  const [input, setInput] = useState("");

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      if (!tags.includes(input.trim())) {
        setTags([...tags, input.trim()]);
      }
      setInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags((t) => t.filter((i) => i !== tag));
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-2 rounded-xl border border-line bg-paper p-2.5 shadow-sm w-full max-w-sm font-mono text-xs", className)}>
      {tags.map((t) => (
        <span key={t} className="flex items-center gap-1 rounded bg-line/20 px-2 py-0.5 text-ink">
          {t}
          <button type="button" onClick={() => removeTag(t)} className="opacity-50 hover:opacity-100">
            ✕
          </button>
        </span>
      ))}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={addTag}
        placeholder="Add tag..."
        className="flex-1 bg-transparent outline-none placeholder:text-ink/40 text-xs min-w-[5rem]"
      />
    </div>
  );
}

export default TagInputField;
`,
    demo: `import { TagInputField } from "./tag-input-field";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <TagInputField />
    </div>
  );
}
`,
  }),

  P("action-sheet-dialog", {
    category: "components",
    subcategory: "overlays",
    title: "Action Sheet Dialog",
    description: "A bottom action sheet confirmation overlay displaying a list of options with a separate cancel button.",
    tags: ["action-sheet", "dialog", "modal", "options", "overlay"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "stack",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "mechanical",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "action-sheet-modal-selection",
      visualModel: "docked-action-options",
      motionModel: "none",
      layoutModel: "centered-action-sheet",
      semanticPurpose: "confirmation-action-sheet",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ActionSheetDialogProps {
  className?: string;
}

export function ActionSheetDialog({ className }: ActionSheetDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("inline-flex flex-col items-center gap-3", className)}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg border border-line bg-ink px-4 py-2 font-mono text-xs text-paper shadow"
      >
        Show Action Sheet
      </button>

      {open && (
        <div className="w-64 rounded-xl border border-line bg-paper p-3 shadow-xl space-y-1 font-mono text-xs">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-full text-left rounded p-2 hover:bg-line/20 text-ink"
          >
            Archive File
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-full text-left rounded p-2 hover:bg-red-500/10 text-red-600 font-bold"
          >
            Permanent Delete
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-full text-center border-t border-line pt-2 text-ink/50 hover:text-ink"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default ActionSheetDialog;
`,
    demo: `import { ActionSheetDialog } from "./action-sheet-dialog";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <ActionSheetDialog />
    </div>
  );
}
`,
  }),

  P("split-button-dropdown", {
    category: "components",
    subcategory: "controls",
    title: "Split Button Dropdown",
    description: "A composite action button with a primary click surface and a distinct chevron dropdown trigger for secondary variants.",
    tags: ["split-button", "button", "dropdown", "actions", "controls"],
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
      interactionModel: "split-action-dropdown",
      visualModel: "bipartite-action-capsule",
      motionModel: "none",
      layoutModel: "horizontal-split-button",
      semanticPurpose: "dual-action-split-button",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SplitButtonDropdownProps {
  className?: string;
}

export function SplitButtonDropdown({ className }: SplitButtonDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative inline-flex rounded-lg border border-line bg-paper shadow-sm font-mono text-xs", className)}>
      <button
        type="button"
        className="px-4 py-2 font-bold text-ink hover:bg-line/20 rounded-l-lg"
      >
        Deploy Branch
      </button>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="border-l border-line px-2 hover:bg-line/20 rounded-r-lg"
      >
        ▾
      </button>

      {open && (
        <div className="absolute top-full mt-1 right-0 w-44 rounded-xl border border-line bg-paper p-1.5 shadow-xl space-y-1 z-10">
          <div className="px-3 py-1.5 hover:bg-line/20 rounded cursor-pointer">Deploy to Staging</div>
          <div className="px-3 py-1.5 hover:bg-line/20 rounded cursor-pointer">Deploy with Rebuild</div>
        </div>
      )}
    </div>
  );
}

export default SplitButtonDropdown;
`,
    demo: `import { SplitButtonDropdown } from "./split-button-dropdown";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <SplitButtonDropdown />
    </div>
  );
}
`,
  }),
];

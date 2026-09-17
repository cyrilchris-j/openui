import type { ResourceDefinition } from "../lib/definitions.js";

const P = (name: string, definition: Omit<ResourceDefinition, "name">): ResourceDefinition => ({
  name,
  ...definition,
});

export default [
  P("segmented-filter-bar", {
    category: "components",
    subcategory: "controls",
    title: "Segmented Filter Bar",
    description: "A compact segmented bar with active item pill indicator for filtering catalog tables.",
    tags: ["filter", "segmented", "controls", "table", "bar"],
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
      interactionModel: "segmented-filter-selection",
      visualModel: "pill-filter-track",
      motionModel: "none",
      layoutModel: "horizontal-pill-rail",
      semanticPurpose: "table-filter-bar",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SegmentedFilterBarProps {
  options?: string[];
  className?: string;
}

export function SegmentedFilterBar({
  options = ["All", "Active", "Archived"],
  className,
}: SegmentedFilterBarProps) {
  const [selected, setSelected] = useState(0);

  return (
    <div className={cn("inline-flex rounded-full border border-line bg-line/20 p-1 font-mono text-xs", className)}>
      {options.map((opt, i) => (
        <button
          key={opt}
          type="button"
          onClick={() => setSelected(i)}
          className={cn(
            "rounded-full px-3.5 py-1 transition-all font-semibold",
            selected === i ? "bg-ink text-paper shadow-sm" : "text-ink/60 hover:text-ink"
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default SegmentedFilterBar;
`,
    demo: `import { SegmentedFilterBar } from "./segmented-filter-bar";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <SegmentedFilterBar />
    </div>
  );
}
`,
  }),

  P("stat-counter-badge", {
    category: "components",
    subcategory: "data-display",
    title: "Stat Counter Badge",
    description: "A metric badge displaying live numerical count with delta arrow indicator.",
    tags: ["stat", "counter", "badge", "metrics", "kpi"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "pill",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "kpi-counter-display",
      visualModel: "numeric-pill-badge",
      motionModel: "none",
      layoutModel: "inline-stat-badge",
      semanticPurpose: "metric-counter-badge",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface StatCounterBadgeProps {
  label?: string;
  count?: number;
  delta?: string;
  className?: string;
}

export function StatCounterBadge({
  label = "Requests",
  count = 9412,
  delta = "+8%",
  className,
}: StatCounterBadgeProps) {
  return (
    <div className={cn("inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1 font-mono text-xs shadow-sm", className)}>
      <span className="text-ink/60">{label}:</span>
      <span className="font-bold text-ink">{count.toLocaleString()}</span>
      <span className="text-[10px] text-emerald-600 font-bold">{delta}</span>
    </div>
  );
}

export default StatCounterBadge;
`,
    demo: `import { StatCounterBadge } from "./stat-counter-badge";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <StatCounterBadge />
    </div>
  );
}
`,
  }),

  P("command-search-pill", {
    category: "components",
    subcategory: "inputs",
    title: "Command Search Pill",
    description: "A search trigger pill showing search icon, placeholder text, and keyboard shortcut badge affordance.",
    tags: ["search", "pill", "command", "trigger", "shortcut"],
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
      interactionModel: "search-modal-trigger",
      visualModel: "pill-search-trigger",
      motionModel: "none",
      layoutModel: "compact-search-capsule",
      semanticPurpose: "search-trigger-pill",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface CommandSearchPillProps {
  placeholder?: string;
  className?: string;
}

export function CommandSearchPill({
  placeholder = "Search resources...",
  className,
}: CommandSearchPillProps) {
  return (
    <div className={cn("flex items-center justify-between rounded-full border border-line bg-paper px-4 py-2 w-64 shadow-sm cursor-pointer hover:border-ink transition-colors font-mono text-xs", className)}>
      <div className="flex items-center gap-2 text-ink/60">
        <span>🔍</span>
        <span>{placeholder}</span>
      </div>
      <span className="rounded bg-line/30 px-1.5 py-0.5 text-[9px] text-ink/50 font-bold">⌘K</span>
    </div>
  );
}

export default CommandSearchPill;
`,
    demo: `import { CommandSearchPill } from "./command-search-pill";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <CommandSearchPill />
    </div>
  );
}
`,
  }),

  P("stepped-timeline-rail", {
    category: "components",
    subcategory: "data-display",
    title: "Stepped Timeline Rail",
    description: "A vertical progress timeline connecting milestone nodes with status descriptions.",
    tags: ["timeline", "rail", "milestones", "vertical", "progress"],
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
      interactionModel: "vertical-timeline-inspection",
      visualModel: "connected-milestone-rail",
      motionModel: "none",
      layoutModel: "vertical-rail-stepper",
      semanticPurpose: "vertical-timeline-display",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface SteppedTimelineRailProps {
  className?: string;
}

export function SteppedTimelineRail({ className }: SteppedTimelineRailProps) {
  const steps = [
    { title: "Init Workspace", done: true },
    { title: "Validate Schemas", done: true },
    { title: "Compile Registry", done: false },
  ];

  return (
    <div className={cn("w-full max-w-xs font-mono text-xs space-y-3", className)}>
      {steps.map((s, idx) => (
        <div key={s.title} className="flex items-center gap-3">
          <div className={cn("h-6 w-6 rounded-full border flex items-center justify-center text-[10px] font-bold", s.done ? "border-ink bg-ink text-paper" : "border-line text-ink/40")}>
            {idx + 1}
          </div>
          <span className={cn(s.done ? "font-bold text-ink" : "text-ink/50")}>{s.title}</span>
        </div>
      ))}
    </div>
  );
}

export default SteppedTimelineRail;
`,
    demo: `import { SteppedTimelineRail } from "./stepped-timeline-rail";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <SteppedTimelineRail />
    </div>
  );
}
`,
  }),

  P("avatar-profile-card", {
    category: "components",
    subcategory: "cards",
    title: "Avatar Profile Card",
    description: "A user summary card featuring round avatar image, verified badge, and operational role attribution.",
    tags: ["avatar", "profile", "card", "author", "user"],
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
      interactionModel: "user-profile-inspection",
      visualModel: "bordered-profile-card",
      motionModel: "none",
      layoutModel: "compact-user-card",
      semanticPurpose: "user-profile-summary-card",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface AvatarProfileCardProps {
  name?: string;
  role?: string;
  handle?: string;
  className?: string;
}

export function AvatarProfileCard({
  name = "Marcus Vance",
  role = "Core Architecture Lead",
  handle = "@mvance",
  className,
}: AvatarProfileCardProps) {
  return (
    <div className={cn("flex w-full max-w-xs items-center gap-3.5 rounded-xl border border-line bg-paper p-4 shadow-sm", className)}>
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-ink font-mono text-sm font-bold text-paper shadow">
        {name[0]}
      </div>
      <div>
        <h5 className="font-display text-sm font-bold text-ink leading-none">{name}</h5>
        <p className="mt-1 font-mono text-[10px] text-ink/60">{role}</p>
        <span className="font-mono text-[9px] text-ink/40">{handle}</span>
      </div>
    </div>
  );
}

export default AvatarProfileCard;
`,
    demo: `import { AvatarProfileCard } from "./avatar-profile-card";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <AvatarProfileCard />
    </div>
  );
}
`,
  }),

  P("rating-feedback-scale", {
    category: "components",
    subcategory: "inputs",
    title: "Rating Feedback Scale",
    description: "A 1-10 net promoter score rating scale with clickable score tiles and hover highlights.",
    tags: ["rating", "nps", "scale", "feedback", "score"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "sharp",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "ten-point-scale-selection",
      visualModel: "numbered-tile-row",
      motionModel: "none",
      layoutModel: "horizontal-scale-array",
      semanticPurpose: "nps-feedback-selector",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface RatingFeedbackScaleProps {
  className?: string;
}

export function RatingFeedbackScale({ className }: RatingFeedbackScaleProps) {
  const [score, setScore] = useState(8);

  return (
    <div className={cn("inline-flex flex-col gap-2 rounded-xl border border-line bg-paper p-4 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60">SATISFACTION: {score}/10</span>
      <div className="flex gap-1">
        {Array.from({ length: 10 }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setScore(i + 1)}
            className={cn(
              "h-8 w-8 rounded border font-mono text-xs font-bold transition-colors",
              score === i + 1 ? "border-ink bg-ink text-paper" : "border-line text-ink hover:bg-line/20"
            )}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default RatingFeedbackScale;
`,
    demo: `import { RatingFeedbackScale } from "./rating-feedback-scale";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <RatingFeedbackScale />
    </div>
  );
}
`,
  }),

  P("keycap-shortcut-row", {
    category: "components",
    subcategory: "data-display",
    title: "Keycap Shortcut Row",
    description: "A reference list row showing keyboard keys and description text for cheat sheets.",
    tags: ["shortcuts", "keyboard", "keycap", "cheatsheet", "hotkey"],
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
      interactionModel: "passive-shortcut-reference",
      visualModel: "ruled-hotkey-table",
      motionModel: "none",
      layoutModel: "horizontal-shortcut-row",
      semanticPurpose: "keyboard-cheatsheet-row",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface KeycapShortcutRowProps {
  action?: string;
  shortcut?: string[];
  className?: string;
}

export function KeycapShortcutRow({
  action = "Rebuild Registry Index",
  shortcut = ["⌘", "⇧", "R"],
  className,
}: KeycapShortcutRowProps) {
  return (
    <div className={cn("flex w-full max-w-sm items-center justify-between rounded-xl border border-line bg-paper p-3 font-mono text-xs", className)}>
      <span className="text-ink font-semibold">{action}</span>
      <div className="flex gap-1">
        {shortcut.map((k) => (
          <span key={k} className="rounded border border-line bg-line/10 px-2 py-0.5 font-bold text-ink">
            {k}
          </span>
        ))}
      </div>
    </div>
  );
}

export default KeycapShortcutRow;
`,
    demo: `import { KeycapShortcutRow } from "./keycap-shortcut-row";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <KeycapShortcutRow />
    </div>
  );
}
`,
  }),

  P("expandable-log-tile", {
    category: "components",
    subcategory: "data-display",
    title: "Expandable Log Tile",
    description: "A telemetry log row expanding stack trace payloads on click.",
    tags: ["log", "telemetry", "expandable", "trace", "terminal"],
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
      interactionModel: "log-trace-disclosure",
      visualModel: "dark-terminal-row",
      motionModel: "none",
      layoutModel: "stacked-log-tile",
      semanticPurpose: "log-event-tile",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ExpandableLogTileProps {
  className?: string;
}

export function ExpandableLogTile({ className }: ExpandableLogTileProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("w-full max-w-md rounded-xl border border-line bg-paper overflow-hidden font-mono text-xs shadow-sm", className)}>
      <div
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between p-3.5 cursor-pointer hover:bg-line/10"
      >
        <span className="text-emerald-600 font-bold">[INFO] 200 OK</span>
        <span className="text-ink/60">GET /r/components/button.json</span>
        <span>{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <div className="border-t border-line bg-ink text-paper p-3 text-[10px] space-y-0.5">
          <div>timestamp: 2026-09-17T23:59:00Z</div>
          <div>latency: 18ms</div>
          <div>region: fra1</div>
        </div>
      )}
    </div>
  );
}

export default ExpandableLogTile;
`,
    demo: `import { ExpandableLogTile } from "./expandable-log-tile";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <ExpandableLogTile />
    </div>
  );
}
`,
  }),

  P("segmented-view-switcher", {
    category: "components",
    subcategory: "controls",
    title: "Segmented View Switcher",
    description: "An icon view switcher toggling presentation between grid, list, and compact modes.",
    tags: ["views", "switcher", "grid", "list", "controls"],
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
      interactionModel: "icon-view-selection",
      visualModel: "tri-state-view-switch",
      motionModel: "none",
      layoutModel: "inline-switcher-cluster",
      semanticPurpose: "layout-mode-selector",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SegmentedViewSwitcherProps {
  className?: string;
}

export function SegmentedViewSwitcher({ className }: SegmentedViewSwitcherProps) {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className={cn("inline-flex rounded-lg border border-line bg-paper p-1 shadow-sm font-mono text-xs", className)}>
      <button
        type="button"
        onClick={() => setView("grid")}
        className={cn("px-3 py-1 rounded font-bold transition-all", view === "grid" ? "bg-ink text-paper" : "text-ink/60")}
      >
        Grid
      </button>
      <button
        type="button"
        onClick={() => setView("list")}
        className={cn("px-3 py-1 rounded font-bold transition-all", view === "list" ? "bg-ink text-paper" : "text-ink/60")}
      >
        List
      </button>
    </div>
  );
}

export default SegmentedViewSwitcher;
`,
    demo: `import { SegmentedViewSwitcher } from "./segmented-view-switcher";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <SegmentedViewSwitcher />
    </div>
  );
}
`,
  }),

  P("dropdown-filter-menu", {
    category: "components",
    subcategory: "navigation",
    title: "Dropdown Filter Menu",
    description: "A dropdown menu allowing single selection filter criteria with checkmark state.",
    tags: ["dropdown", "filter", "select", "menu", "controls"],
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
      interactionModel: "dropdown-filter-select",
      visualModel: "popover-filter-menu",
      motionModel: "none",
      layoutModel: "dropdown-filter-stack",
      semanticPurpose: "catalog-filter-dropdown",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface DropdownFilterMenuProps {
  className?: string;
}

export function DropdownFilterMenu({ className }: DropdownFilterMenuProps) {
  const [selected, setSelected] = useState("All Categories");
  const [open, setOpen] = useState(false);
  const options = ["All Categories", "Components", "Motion", "Interactions"];

  return (
    <div className={cn("relative inline-block font-mono text-xs", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="rounded-lg border border-line bg-paper px-4 py-2 font-bold text-ink shadow-sm"
      >
        {selected} ▾
      </button>

      {open && (
        <div className="absolute top-full mt-1.5 w-44 rounded-xl border border-line bg-paper p-1.5 shadow-xl z-20 space-y-1">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                setSelected(opt);
                setOpen(false);
              }}
              className="flex justify-between px-3 py-1.5 rounded hover:bg-line/20 cursor-pointer"
            >
              <span>{opt}</span>
              {selected === opt && <span>✓</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownFilterMenu;
`,
    demo: `import { DropdownFilterMenu } from "./dropdown-filter-menu";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <DropdownFilterMenu />
    </div>
  );
}
`,
  }),

  P("banner-notice-strip", {
    category: "components",
    subcategory: "feedback",
    title: "Banner Notice Strip",
    description: "An informational full-width banner notice with action CTA button and dismiss trigger.",
    tags: ["banner", "notice", "announcement", "cta", "feedback"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "full-bleed",
      density: "compact",
      shapeLanguage: "sharp",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "announcement-banner-cta",
      visualModel: "full-width-notice-strip",
      motionModel: "none",
      layoutModel: "horizontal-banner-ribbon",
      semanticPurpose: "announcement-banner-ribbon",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface BannerNoticeStripProps {
  message?: string;
  className?: string;
}

export function BannerNoticeStrip({
  message = "OpenUI 800 Master Catalog expansion currently compiling.",
  className,
}: BannerNoticeStripProps) {
  return (
    <div className={cn("flex w-full items-center justify-between rounded-lg border border-line bg-line/10 px-4 py-2.5 font-mono text-xs shadow-sm", className)}>
      <span className="text-ink font-semibold">📢 {message}</span>
      <button type="button" className="rounded bg-ink px-3 py-1 font-bold text-paper text-[10px]">
        Learn More
      </button>
    </div>
  );
}

export default BannerNoticeStrip;
`,
    demo: `import { BannerNoticeStrip } from "./banner-notice-strip";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <BannerNoticeStrip />
    </div>
  );
}
`,
  }),

  P("pagination-dot-bar", {
    category: "components",
    subcategory: "navigation",
    title: "Pagination Dot Bar",
    description: "Carousel pagination indicator with an elongated active capsule dot reflecting view index.",
    tags: ["pagination", "dots", "carousel", "indicators", "navigation"],
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
      interactionModel: "pagination-dot-selection",
      visualModel: "beaded-dot-row",
      motionModel: "none",
      layoutModel: "horizontal-dot-chain",
      semanticPurpose: "carousel-dot-indicator",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface PaginationDotBarProps {
  total?: number;
  className?: string;
}

export function PaginationDotBar({ total = 4, className }: PaginationDotBarProps) {
  const [active, setActive] = useState(0);

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => setActive(i)}
          className={cn(
            "h-2 rounded-full transition-all duration-200",
            active === i ? "w-6 bg-ink" : "w-2 bg-line hover:bg-ink/50"
          )}
        />
      ))}
    </div>
  );
}

export default PaginationDotBar;
`,
    demo: `import { PaginationDotBar } from "./pagination-dot-bar";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <PaginationDotBar />
    </div>
  );
}
`,
  }),

  P("color-palette-strip", {
    category: "components",
    subcategory: "data-display",
    title: "Color Palette Strip",
    description: "A continuous color tone preview strip showing primary, secondary, and accent theme tokens.",
    tags: ["colors", "palette", "tokens", "preview", "strip"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "passive-color-strip",
      visualModel: "gradient-token-strip",
      motionModel: "none",
      layoutModel: "horizontal-palette-strip",
      semanticPurpose: "color-theme-token-strip",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface ColorPaletteStripProps {
  className?: string;
}

export function ColorPaletteStrip({ className }: ColorPaletteStripProps) {
  const colors = ["#000000", "#4B5563", "#9CA3AF", "#E5E7EB"];

  return (
    <div className={cn("flex w-full max-w-xs overflow-hidden rounded-xl border border-line shadow-sm", className)}>
      {colors.map((c) => (
        <div key={c} className="h-10 flex-1 flex items-center justify-center" style={{ backgroundColor: c }}>
          <span className="font-mono text-[9px] text-white/80">{c.slice(1)}</span>
        </div>
      ))}
    </div>
  );
}

export default ColorPaletteStrip;
`,
    demo: `import { ColorPaletteStrip } from "./color-palette-strip";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <ColorPaletteStrip />
    </div>
  );
}
`,
  }),

  P("slider-gain-control", {
    category: "components",
    subcategory: "inputs",
    title: "Slider Gain Control",
    description: "A precision gain control slider with dB calibrated notches and decibel label outputs.",
    tags: ["slider", "gain", "audio", "calibrated", "controls"],
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
      interactionModel: "calibrated-gain-slider",
      visualModel: "db-metered-track",
      motionModel: "none",
      layoutModel: "horizontal-calibrated-gauge",
      semanticPurpose: "audio-gain-control-bar",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SliderGainControlProps {
  className?: string;
}

export function SliderGainControl({ className }: SliderGainControlProps) {
  const [db, setDb] = useState(0);

  return (
    <div className={cn("w-full max-w-xs rounded-xl border border-line bg-paper p-5 shadow-sm font-mono text-xs", className)}>
      <div className="flex justify-between mb-3">
        <span className="text-ink/60">OUTPUT GAIN</span>
        <span className="font-bold text-ink">{db > 0 ? \`+\${db} dB\` : \`\${db} dB\`}</span>
      </div>

      <input
        type="range"
        min="-12"
        max="12"
        value={db}
        onChange={(e) => setDb(parseInt(e.target.value, 10))}
        className="w-full cursor-pointer accent-ink"
      />
    </div>
  );
}

export default SliderGainControl;
`,
    demo: `import { SliderGainControl } from "./slider-gain-control";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <SliderGainControl />
    </div>
  );
}
`,
  }),

  P("status-telemetry-dot", {
    category: "components",
    subcategory: "data-display",
    title: "Status Telemetry Dot",
    description: "A compact status dot badge with pulsing concentric halo for system observability.",
    tags: ["dot", "status", "telemetry", "halo", "health"],
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
      interactionModel: "telemetry-dot-ping",
      visualModel: "concentric-halo-dot",
      motionModel: "none",
      layoutModel: "inline-telemetry-dot",
      semanticPurpose: "observability-status-dot",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface StatusTelemetryDotProps {
  label?: string;
  className?: string;
}

export function StatusTelemetryDot({
  label = "Cluster Operational",
  className,
}: StatusTelemetryDotProps) {
  return (
    <div className={cn("inline-flex items-center gap-2 font-mono text-xs font-bold text-ink", className)}>
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <span>{label}</span>
    </div>
  );
}

export default StatusTelemetryDot;
`,
    demo: `import { StatusTelemetryDot } from "./status-telemetry-dot";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <StatusTelemetryDot />
    </div>
  );
}
`,
  }),

  P("collapsible-details-card", {
    category: "components",
    subcategory: "cards",
    title: "Collapsible Details Card",
    description: "A metadata specification tile with expandable details pane.",
    tags: ["card", "details", "collapsible", "metadata", "spec"],
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
      interactionModel: "details-card-expansion",
      visualModel: "bordered-metadata-card",
      motionModel: "none",
      layoutModel: "stacked-details-slab",
      semanticPurpose: "specification-details-card",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface CollapsibleDetailsCardProps {
  className?: string;
}

export function CollapsibleDetailsCard({ className }: CollapsibleDetailsCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("w-full max-w-xs rounded-xl border border-line bg-paper p-4 shadow-sm font-mono text-xs", className)}>
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setOpen((o) => !o)}>
        <span className="font-bold text-ink">Package Artifacts</span>
        <span>{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <div className="mt-3 border-t border-line pt-2 text-[10px] text-ink/70 space-y-1">
          <div>• index.js (1.4 kB)</div>
          <div>• index.d.ts (820 B)</div>
        </div>
      )}
    </div>
  );
}

export default CollapsibleDetailsCard;
`,
    demo: `import { CollapsibleDetailsCard } from "./collapsible-details-card";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <CollapsibleDetailsCard />
    </div>
  );
}
`,
  }),

  P("tab-underline-strip", {
    category: "components",
    subcategory: "navigation",
    title: "Tab Underline Strip",
    description: "A tab bar displaying underlined selection border styles below active option.",
    tags: ["tabs", "underline", "navigation", "views", "strip"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "sharp",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "underline-tab-selection",
      visualModel: "ruled-underline-track",
      motionModel: "none",
      layoutModel: "horizontal-underline-tabs",
      semanticPurpose: "underline-tab-bar",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface TabUnderlineStripProps {
  className?: string;
}

export function TabUnderlineStrip({ className }: TabUnderlineStripProps) {
  const [active, setActive] = useState(0);
  const tabs = ["Overview", "Code", "Reviews"];

  return (
    <div className={cn("flex border-b border-line font-mono text-xs", className)}>
      {tabs.map((t, idx) => (
        <button
          key={t}
          type="button"
          onClick={() => setActive(idx)}
          className={cn(
            "px-4 py-2 border-b-2 font-semibold transition-colors",
            active === idx ? "border-ink text-ink" : "border-transparent text-ink/60 hover:text-ink"
          )}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

export default TabUnderlineStrip;
`,
    demo: `import { TabUnderlineStrip } from "./tab-underline-strip";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <TabUnderlineStrip />
    </div>
  );
}
`,
  }),

  P("numeric-spinner-input", {
    category: "components",
    subcategory: "controls",
    title: "Numeric Spinner Input",
    description: "A text field with integrated stepper chevron buttons for integer increments.",
    tags: ["spinner", "input", "stepper", "controls", "numeric"],
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
      interactionModel: "spinner-stepper-entry",
      visualModel: "chevron-stepper-box",
      motionModel: "none",
      layoutModel: "compact-spinner-input",
      semanticPurpose: "numeric-spinner-field",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface NumericSpinnerInputProps {
  className?: string;
}

export function NumericSpinnerInput({ className }: NumericSpinnerInputProps) {
  const [val, setVal] = useState(10);

  return (
    <div className={cn("inline-flex items-center rounded-lg border border-line bg-paper p-1 shadow-sm font-mono text-xs", className)}>
      <span className="px-3 font-bold text-ink">{val}</span>
      <div className="flex flex-col border-l border-line pl-1">
        <button type="button" onClick={() => setVal((v) => v + 1)} className="px-1 hover:bg-line/20">
          ▲
        </button>
        <button type="button" onClick={() => setVal((v) => Math.max(0, v - 1))} className="px-1 hover:bg-line/20">
          ▼
        </button>
      </div>
    </div>
  );
}

export default NumericSpinnerInput;
`,
    demo: `import { NumericSpinnerInput } from "./numeric-spinner-input";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <NumericSpinnerInput />
    </div>
  );
}
`,
  }),

  P("badge-tag-cloud", {
    category: "components",
    subcategory: "data-display",
    title: "Badge Tag Cloud",
    description: "A wrapping cloud of metadata badge chips providing taxonomy labels.",
    tags: ["tags", "cloud", "badges", "chips", "taxonomy"],
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
      interactionModel: "passive-tag-cloud",
      visualModel: "wrapping-pill-matrix",
      motionModel: "none",
      layoutModel: "flex-wrapping-cloud",
      semanticPurpose: "taxonomy-cloud-display",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface BadgeTagCloudProps {
  className?: string;
}

export function BadgeTagCloud({ className }: BadgeTagCloudProps) {
  const tags = ["TypeScript", "Next.js", "Vite", "React 19", "Tailwind", "CSS"];

  return (
    <div className={cn("flex flex-wrap gap-1.5 max-w-xs", className)}>
      {tags.map((t) => (
        <span key={t} className="rounded-full border border-line bg-paper px-2.5 py-0.5 font-mono text-[10px] text-ink">
          {t}
        </span>
      ))}
    </div>
  );
}

export default BadgeTagCloud;
`,
    demo: `import { BadgeTagCloud } from "./badge-tag-cloud";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <BadgeTagCloud />
    </div>
  );
}
`,
  }),

  P("code-terminal-block", {
    category: "components",
    subcategory: "data-display",
    title: "Code Terminal Block",
    description: "A dark terminal console output box displaying terminal prompt and executed output lines.",
    tags: ["terminal", "code", "console", "prompt", "output"],
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
      interactionModel: "passive-terminal-log",
      visualModel: "dark-console-chassis",
      motionModel: "none",
      layoutModel: "terminal-console-block",
      semanticPurpose: "console-log-display",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface CodeTerminalBlockProps {
  command?: string;
  output?: string;
  className?: string;
}

export function CodeTerminalBlock({
  command = "openui add metric-stat-card",
  output = "✓ Materialized 5 files to registry/default/components/metric-stat-card",
  className,
}: CodeTerminalBlockProps) {
  return (
    <div className={cn("w-full max-w-md rounded-xl border border-line bg-ink text-paper p-4 font-mono text-xs shadow-md space-y-2", className)}>
      <div className="flex items-center gap-2">
        <span className="text-emerald-400 font-bold">$</span>
        <span>{command}</span>
      </div>
      <div className="text-paper/60 text-[11px] leading-relaxed">{output}</div>
    </div>
  );
}

export default CodeTerminalBlock;
`,
    demo: `import { CodeTerminalBlock } from "./code-terminal-block";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <CodeTerminalBlock />
    </div>
  );
}
`,
  }),

  P("tag-filter-group", {
    category: "components",
    subcategory: "controls",
    title: "Tag Filter Group",
    description: "A multi-tag filter group providing active badge highlights on toggle.",
    tags: ["tags", "filters", "group", "controls", "pills"],
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
      interactionModel: "tag-group-filtering",
      visualModel: "compact-tag-pills",
      motionModel: "none",
      layoutModel: "horizontal-tag-group",
      semanticPurpose: "catalog-tag-filter",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface TagFilterGroupProps {
  className?: string;
}

export function TagFilterGroup({ className }: TagFilterGroupProps) {
  const [selected, setSelected] = useState<string>("All");
  const tags = ["All", "Core", "Ecosystem", "Plugins"];

  return (
    <div className={cn("inline-flex gap-2 font-mono text-xs", className)}>
      {tags.map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => setSelected(t)}
          className={cn(
            "rounded-full border px-3 py-1 font-semibold transition-all",
            selected === t ? "border-ink bg-ink text-paper" : "border-line bg-paper text-ink hover:border-ink"
          )}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

export default TagFilterGroup;
`,
    demo: `import { TagFilterGroup } from "./tag-filter-group";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <TagFilterGroup />
    </div>
  );
}
`,
  }),

  P("action-sheet-popover", {
    category: "components",
    subcategory: "overlays",
    title: "Action Sheet Popover",
    description: "A popover action menu with icons and destructive confirmation button.",
    tags: ["action-sheet", "popover", "menu", "destructive", "overlay"],
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
      interactionModel: "popover-action-menu-choice",
      visualModel: "bordered-action-box",
      motionModel: "none",
      layoutModel: "anchored-action-popover",
      semanticPurpose: "action-popover-sheet",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ActionSheetPopoverProps {
  className?: string;
}

export function ActionSheetPopover({ className }: ActionSheetPopoverProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative inline-block font-mono text-xs", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="rounded-lg border border-line bg-paper px-4 py-2 font-bold text-ink shadow-sm hover:bg-line/20"
      >
        Actions ▾
      </button>

      {open && (
        <div className="absolute top-full mt-1.5 w-44 rounded-xl border border-line bg-paper p-1.5 shadow-xl z-20 space-y-1">
          <div className="px-3 py-1.5 hover:bg-line/20 rounded cursor-pointer text-ink">Inspect Item</div>
          <div className="px-3 py-1.5 hover:bg-line/20 rounded cursor-pointer text-ink">Export Bundle</div>
          <div className="border-t border-line my-1" />
          <div className="px-3 py-1.5 hover:bg-red-500/10 text-red-600 font-bold rounded cursor-pointer">
            Archive Item
          </div>
        </div>
      )}
    </div>
  );
}

export default ActionSheetPopover;
`,
    demo: `import { ActionSheetPopover } from "./action-sheet-popover";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <ActionSheetPopover />
    </div>
  );
}
`,
  }),
];

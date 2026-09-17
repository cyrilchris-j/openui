import type { ResourceDefinition } from "../lib/definitions.js";

const P = (name: string, definition: Omit<ResourceDefinition, "name">): ResourceDefinition => ({
  name,
  ...definition,
});

export default [
  P("split-editor-diff-viewer", {
    category: "layouts",
    subcategory: "splits",
    title: "Split Editor Diff Viewer",
    description: "Side-by-side code diff viewer layout with line number gutters and addition/deletion styling.",
    tags: ["diff", "git", "editor", "code", "split"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "split",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "diff-line-gutter-inspection",
      visualModel: "dual-pane-diff-viewer",
      motionModel: "none",
      layoutModel: "side-by-side-code-diff",
      semanticPurpose: "code-diff-inspection-stage",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface SplitEditorDiffViewerProps extends React.HTMLAttributes<HTMLDivElement> {
  original?: React.ReactNode;
  modified?: React.ReactNode;
}

export function SplitEditorDiffViewer({ original, modified, className, ...props }: SplitEditorDiffViewerProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 w-full border border-line rounded-xl overflow-hidden font-mono text-xs bg-paper", className)} {...props}>
      <div className="p-4 border-b md:border-b-0 md:border-r border-line bg-red-500/5">{original}</div>
      <div className="p-4 bg-emerald-500/5">{modified}</div>
    </div>
  );
}
`,
    demo: `"use client";

import { SplitEditorDiffViewer } from "./split-editor-diff-viewer";

export default function SplitEditorDiffViewerDemo() {
  return (
    <SplitEditorDiffViewer
      original={<div>- const version = "0.9.4";</div>}
      modified={<div>+ const version = "1.0.0";</div>}
    />
  );
}
`,
  }),

  P("two-column-help-center", {
    category: "layouts",
    subcategory: "shells",
    title: "Two Column Help Center",
    description: "Knowledge base layout with categorical help directories on left and popular FAQ articles on right.",
    tags: ["help", "knowledgebase", "faq", "support", "shell"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "split",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "knowledgebase-category-navigation",
      visualModel: "category-aside-and-article-rack",
      motionModel: "none",
      layoutModel: "two-column-help-shell",
      semanticPurpose: "help-center-portal-layout",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface TwoColumnHelpCenterProps extends React.HTMLAttributes<HTMLDivElement> {
  categories?: React.ReactNode;
  articles?: React.ReactNode;
}

export function TwoColumnHelpCenter({ categories, articles, className, ...props }: TwoColumnHelpCenterProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-12 gap-8 max-w-5xl mx-auto p-6 font-sans items-start", className)} {...props}>
      <aside className="md:col-span-4 space-y-2">{categories}</aside>
      <main className="md:col-span-8 space-y-4">{articles}</main>
    </div>
  );
}
`,
    demo: `"use client";

import { TwoColumnHelpCenter } from "./two-column-help-center";

export default function TwoColumnHelpCenterDemo() {
  return (
    <TwoColumnHelpCenter
      categories={
        <div className="text-xs space-y-1">
          <div className="font-bold mb-2">Help Topics</div>
          <div className="p-2 rounded bg-accent/15 text-accent font-semibold">Account & API Keys</div>
          <div className="p-2 rounded text-ink/70">CLI & Automation</div>
        </div>
      }
      articles={
        <div className="space-y-3">
          <div className="p-4 rounded-xl border border-line bg-paper text-xs">
            <h4 className="font-bold text-ink">How to generate registry bundles</h4>
            <p className="text-ink/60 mt-1">Detailed guide to building JSON artifacts.</p>
          </div>
        </div>
      }
    />
  );
}
`,
  }),

  P("stacked-notification-center", {
    category: "layouts",
    subcategory: "stacks",
    title: "Stacked Notification Center",
    description: "Chronological notification feed with filter tabs and mark-all-read action header.",
    tags: ["notifications", "feed", "alerts", "inbox", "stack"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "stack",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "notification-inbox-scroll",
      visualModel: "stacked-alert-cards",
      motionModel: "none",
      layoutModel: "single-column-inbox-stack",
      semanticPurpose: "notification-center-layout",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface StackedNotificationCenterProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  children?: React.ReactNode;
}

export function StackedNotificationCenter({ header, children, className, ...props }: StackedNotificationCenterProps) {
  return (
    <div className={cn("max-w-md mx-auto p-4 rounded-2xl border border-line bg-paper font-sans text-xs shadow-sm space-y-3", className)} {...props}>
      {header && <div className="flex items-center justify-between pb-2 border-b border-line">{header}</div>}
      <div className="space-y-2">{children}</div>
    </div>
  );
}
`,
    demo: `"use client";

import { StackedNotificationCenter } from "./stacked-notification-center";

export default function StackedNotificationCenterDemo() {
  return (
    <StackedNotificationCenter
      header={
        <>
          <span className="font-bold text-ink">Inbox (2)</span>
          <button type="button" className="text-[11px] text-accent font-mono">Mark read</button>
        </>
      }
    >
      <div className="p-3 rounded-lg border border-line bg-surface/30">
        <span className="font-bold">Catalog Verified</span>
        <p className="text-ink/60 mt-0.5">800 of 800 items verified with zero errors.</p>
      </div>
    </StackedNotificationCenter>
  );
}
`,
  }),

  P("bento-metrics-dashboard", {
    category: "layouts",
    subcategory: "grids",
    title: "Bento Metrics Dashboard",
    description: "Analytics bento box layout coordinating charts, tables, KPIs, and regional status panels.",
    tags: ["bento", "metrics", "analytics", "dashboard", "cards"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "mosaic",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "bento-telemetry-scan",
      visualModel: "modular-metric-tiles",
      motionModel: "none",
      layoutModel: "mosaic-telemetry-matrix",
      semanticPurpose: "bento-analytics-matrix",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface BentoMetricsDashboardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function BentoMetricsDashboard({ children, className, ...props }: BentoMetricsDashboardProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-3 max-w-5xl mx-auto p-4 font-mono text-xs", className)} {...props}>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { BentoMetricsDashboard } from "./bento-metrics-dashboard";

export default function BentoMetricsDashboardDemo() {
  return (
    <BentoMetricsDashboard>
      <div className="md:col-span-2 p-4 rounded-xl border border-line bg-surface/30">
        <span className="text-ink/60">Primary Throughput</span>
        <div className="text-lg font-bold text-ink mt-1">1.2 TB / day</div>
      </div>
      <div className="p-4 rounded-xl border border-line bg-surface/30">
        <span className="text-ink/60">Node Latency</span>
        <div className="text-lg font-bold text-accent mt-1">14ms</div>
      </div>
    </BentoMetricsDashboard>
  );
}
`,
  }),

  P("hero-diagonal-gallery", {
    category: "layouts",
    subcategory: "grids",
    title: "Hero Diagonal Gallery",
    description: "Skewed ribbon of rotated image cards drifting diagonally behind landing hero typography.",
    tags: ["hero", "diagonal", "gallery", "ribbon", "skew"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "luxury",
      macrostructure: "split",
      density: "airy",
      shapeLanguage: "rounded",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "diagonal-ribbon-hero",
      visualModel: "skewed-image-stream-hero",
      motionModel: "none",
      layoutModel: "skewed-strip-underlay",
      semanticPurpose: "cinematic-diagonal-hero",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface HeroDiagonalGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  headline?: React.ReactNode;
  children?: React.ReactNode;
}

export function HeroDiagonalGallery({ headline, children, className, ...props }: HeroDiagonalGalleryProps) {
  return (
    <div className={cn("relative min-h-[360px] w-full rounded-2xl border border-line bg-paper overflow-hidden p-8 flex items-center font-sans", className)} {...props}>
      <div className="max-w-md z-10">{headline}</div>
      <div className="absolute right-0 top-0 bottom-0 w-1/2 flex gap-4 -rotate-12 translate-x-12 opacity-40 pointer-events-none">
        {children}
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { HeroDiagonalGallery } from "./hero-diagonal-gallery";

export default function HeroDiagonalGalleryDemo() {
  return (
    <HeroDiagonalGallery
      headline={
        <div className="space-y-2">
          <h1 className="text-xl font-bold text-ink">Modern Component Architecture</h1>
          <p className="text-xs text-ink/70">800 unique resources categorized into 8 domains.</p>
        </div>
      }
    >
      <div className="w-32 h-64 rounded-xl border border-line bg-surface/80 shrink-0" />
      <div className="w-32 h-64 rounded-xl border border-line bg-surface/80 shrink-0" />
    </HeroDiagonalGallery>
  );
}
`,
  }),

  P("split-recipe-card", {
    category: "layouts",
    subcategory: "splits",
    title: "Split Recipe Card",
    description: "Culinary recipe layout: ingredients checklist on left and sequential preparation instructions on right.",
    tags: ["recipe", "ingredients", "culinary", "split", "checklist"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "editorial",
      macrostructure: "split",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "none",
      typographyStyle: "serif-display",
      colorStrategy: "muted-earth",
    },
    fingerprint: {
      interactionModel: "culinary-recipe-steps",
      visualModel: "ingredient-and-directions-split",
      motionModel: "none",
      layoutModel: "two-column-recipe-grid",
      semanticPurpose: "recipe-instruction-card",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface SplitRecipeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  ingredients?: React.ReactNode;
  instructions?: React.ReactNode;
}

export function SplitRecipeCard({ ingredients, instructions, className, ...props }: SplitRecipeCardProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-12 gap-6 max-w-4xl mx-auto p-6 rounded-2xl border border-line bg-paper font-serif shadow-sm", className)} {...props}>
      <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-line pb-4 md:pb-0 md:pr-4">{ingredients}</div>
      <div className="md:col-span-8 space-y-4">{instructions}</div>
    </div>
  );
}
`,
    demo: `"use client";

import { SplitRecipeCard } from "./split-recipe-card";

export default function SplitRecipeCardDemo() {
  return (
    <SplitRecipeCard
      ingredients={
        <div className="text-xs space-y-1">
          <div className="font-bold mb-2">Ingredients</div>
          <div>• 100 Components</div>
          <div>• 100 Text Presets</div>
          <div>• 100 Motion Models</div>
        </div>
      }
      instructions={
        <div>
          <h3 className="text-sm font-bold text-ink mb-1">Preparation</h3>
          <p className="text-xs text-ink/70 leading-relaxed">Combine closed design DNA enums with behavioral fingerprints.</p>
        </div>
      }
    />
  );
}
`,
  }),

  P("multi-pane-chat-layout", {
    category: "layouts",
    subcategory: "shells",
    title: "Multi Pane Chat Layout",
    description: "Messaging shell: left conversation channel list, central message log, and right participant roster.",
    tags: ["chat", "messaging", "triptych", "channels", "shell"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "rail",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "chat-channel-communication",
      visualModel: "three-pane-chat-workspace",
      motionModel: "none",
      layoutModel: "channels-messages-members-grid",
      semanticPurpose: "team-chat-workspace",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface MultiPaneChatLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  channels?: React.ReactNode;
  messages?: React.ReactNode;
  members?: React.ReactNode;
}

export function MultiPaneChatLayout({ channels, messages, members, className, ...props }: MultiPaneChatLayoutProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-12 min-h-[380px] w-full border border-line rounded-2xl overflow-hidden font-sans text-xs", className)} {...props}>
      <div className="md:col-span-3 border-r border-line p-3 bg-surface/30 hidden md:block">{channels}</div>
      <div className="md:col-span-6 p-4 flex flex-col justify-between bg-paper">{messages}</div>
      <div className="md:col-span-3 border-l border-line p-3 bg-surface/20 hidden lg:block">{members}</div>
    </div>
  );
}
`,
    demo: `"use client";

import { MultiPaneChatLayout } from "./multi-pane-chat-layout";

export default function MultiPaneChatLayoutDemo() {
  return (
    <MultiPaneChatLayout
      channels={<div className="font-mono"># general<br /># engineering<br /># design-dna</div>}
      messages={<div className="space-y-2"><div className="p-2 rounded bg-surface/50">Hey team, registry validation is green!</div></div>}
      members={<div className="font-mono text-ink/60">Members (4)</div>}
    />
  );
}
`,
  }),

  P("stepper-journey-map", {
    category: "layouts",
    subcategory: "grids",
    title: "Stepper Journey Map",
    description: "Horizontal service blueprint journey map aligning user persona stages with system reactions.",
    tags: ["journey", "blueprint", "ux", "stepper", "persona"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "rail",
      density: "compact",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "journey-blueprint-inspection",
      visualModel: "horizontal-journey-grid",
      motionModel: "none",
      layoutModel: "horizontal-stage-matrix",
      semanticPurpose: "ux-service-blueprint",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface StepperJourneyMapProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function StepperJourneyMap({ children, className, ...props }: StepperJourneyMapProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-4 gap-4 p-4 max-w-5xl mx-auto font-sans text-xs", className)} {...props}>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { StepperJourneyMap } from "./stepper-journey-map";

export default function StepperJourneyMapDemo() {
  return (
    <StepperJourneyMap>
      {["Discover", "Evaluate", "Install", "Automate"].map((stage, i) => (
        <div key={stage} className="p-4 rounded-xl border border-line bg-paper space-y-1">
          <div className="font-mono text-[10px] text-accent font-bold">Stage 0{i + 1}</div>
          <div className="font-bold text-ink">{stage}</div>
          <p className="text-[11px] text-ink/60">Touchpoint interactions and state telemetry.</p>
        </div>
      ))}
    </StepperJourneyMap>
  );
}
`,
  }),

  P("split-terms-agreement", {
    category: "layouts",
    subcategory: "splits",
    title: "Split Terms Agreement",
    description: "Legal consent layout: scrollable terms of service text on left with consent checkbox action box on right.",
    tags: ["terms", "legal", "consent", "agreement", "split"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "editorial",
      macrostructure: "split",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "none",
      typographyStyle: "serif-display",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "legal-consent-review",
      visualModel: "scrollable-terms-and-consent",
      motionModel: "none",
      layoutModel: "side-by-side-terms-agreement",
      semanticPurpose: "terms-agreement-dialog",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface SplitTermsAgreementProps extends React.HTMLAttributes<HTMLDivElement> {
  terms?: React.ReactNode;
  consent?: React.ReactNode;
}

export function SplitTermsAgreement({ terms, consent, className, ...props }: SplitTermsAgreementProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-12 gap-6 max-w-4xl mx-auto p-6 rounded-2xl border border-line bg-paper font-sans text-xs items-start shadow-sm", className)} {...props}>
      <div className="md:col-span-8 h-48 overflow-y-auto pr-4 space-y-2 border-r border-line">{terms}</div>
      <div className="md:col-span-4 space-y-4">{consent}</div>
    </div>
  );
}
`,
    demo: `"use client";

import { SplitTermsAgreement } from "./split-terms-agreement";

export default function SplitTermsAgreementDemo() {
  return (
    <SplitTermsAgreement
      terms={
        <div className="text-ink/80 leading-relaxed font-serif">
          <h4 className="font-bold text-sm mb-1">OpenUI Open Source License</h4>
          <p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files to deal in the Software without restriction.</p>
        </div>
      }
      consent={
        <div>
          <button type="button" className="w-full py-2 rounded bg-accent text-white font-mono">I Agree</button>
        </div>
      }
    />
  );
}
`,
  }),

  P("panoramic-hero-banner", {
    category: "layouts",
    subcategory: "shells",
    title: "Panoramic Hero Banner",
    description: "Ultra-wide 21:9 cinematic aspect ratio hero banner layout with centered title card overlay.",
    tags: ["panoramic", "hero", "cinematic", "banner", "aspect"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "luxury",
      macrostructure: "full-bleed",
      density: "airy",
      shapeLanguage: "rounded",
      motionLanguage: "none",
      typographyStyle: "serif-display",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "panoramic-banner-view",
      visualModel: "twenty-one-nine-aspect-hero",
      motionModel: "none",
      layoutModel: "panoramic-overlay-banner",
      semanticPurpose: "cinematic-hero-presentation",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface PanoramicHeroBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  overlay?: React.ReactNode;
  children?: React.ReactNode;
}

export function PanoramicHeroBanner({ overlay, children, className, ...props }: PanoramicHeroBannerProps) {
  return (
    <div className={cn("relative w-full aspect-[21/9] min-h-[240px] rounded-3xl border border-line bg-surface/50 overflow-hidden flex items-center justify-center p-8 font-sans", className)} {...props}>
      <div className="absolute inset-0 flex items-center justify-center -z-10">{children}</div>
      {overlay && <div className="p-6 rounded-2xl border border-line bg-paper/90 backdrop-blur-md shadow-xl max-w-md text-center">{overlay}</div>}
    </div>
  );
}
`,
    demo: `"use client";

import { PanoramicHeroBanner } from "./panoramic-hero-banner";

export default function PanoramicHeroBannerDemo() {
  return (
    <PanoramicHeroBanner
      overlay={
        <div>
          <h1 className="text-base font-bold font-serif text-ink">Cinematic Registry</h1>
          <p className="text-xs text-ink/60 mt-1">Panoramic presentation format.</p>
        </div>
      }
    />
  );
}
`,
  }),

  P("radial-menu-overlay", {
    category: "layouts",
    subcategory: "shells",
    title: "Radial Menu Overlay",
    description: "Fullscreen spatial layout with circular radial pie menu actions clustered around central anchor.",
    tags: ["radial", "pie-menu", "spatial", "dial", "overlay"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "full-bleed",
      density: "airy",
      shapeLanguage: "pill",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "pie-menu-selection",
      visualModel: "circular-radial-action-dial",
      motionModel: "none",
      layoutModel: "center-radial-cluster",
      semanticPurpose: "radial-quick-dial-stage",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface RadialMenuOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  center?: React.ReactNode;
  items?: React.ReactNode[];
}

export function RadialMenuOverlay({ center, items = [], className, ...props }: RadialMenuOverlayProps) {
  return (
    <div className={cn("relative w-full h-80 rounded-2xl border border-line bg-paper overflow-hidden flex items-center justify-center font-mono text-xs", className)} {...props}>
      <div className="w-16 h-16 rounded-full border border-line bg-accent text-white flex items-center justify-center font-bold z-10">{center}</div>
      {items.map((item, idx) => {
        const angle = (idx / items.length) * Math.PI * 2;
        const x = Math.cos(angle) * 80;
        const y = Math.sin(angle) * 80;
        return (
          <div key={idx} className="absolute z-10" style={{ transform: \`translate(\${x}px, \${y}px)\` }}>
            {item}
          </div>
        );
      })}
    </div>
  );
}
`,
    demo: `"use client";

import { RadialMenuOverlay } from "./radial-menu-overlay";

export default function RadialMenuOverlayDemo() {
  return (
    <RadialMenuOverlay
      center="HUB"
      items={[
        <div key="1" className="p-2 rounded-full border border-line bg-paper shadow text-[10px]">Edit</div>,
        <div key="2" className="p-2 rounded-full border border-line bg-paper shadow text-[10px]">Copy</div>,
        <div key="3" className="p-2 rounded-full border border-line bg-paper shadow text-[10px]">Share</div>,
        <div key="4" className="p-2 rounded-full border border-line bg-paper shadow text-[10px]">Delete</div>,
      ]}
    />
  );
}
`,
  }),

  P("split-spec-comparator", {
    category: "layouts",
    subcategory: "splits",
    title: "Split Spec Comparator",
    description: "Side-by-side benchmark comparison matrix evaluating framework speed, payload size, and memory usage.",
    tags: ["benchmarks", "comparator", "matrix", "split", "specs"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "benchmark-side-by-side-inspection",
      visualModel: "dual-column-spec-table",
      motionModel: "none",
      layoutModel: "side-by-side-benchmark-grid",
      semanticPurpose: "benchmark-comparison-table",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface SplitSpecComparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  itemA?: React.ReactNode;
  itemB?: React.ReactNode;
}

export function SplitSpecComparator({ itemA, itemB, className, ...props }: SplitSpecComparatorProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto p-4 font-mono text-xs", className)} {...props}>
      <div className="p-4 rounded-xl border border-line bg-surface/30 space-y-2">{itemA}</div>
      <div className="p-4 rounded-xl border border-line bg-surface/30 space-y-2">{itemB}</div>
    </div>
  );
}
`,
    demo: `"use client";

import { SplitSpecComparator } from "./split-spec-comparator";

export default function SplitSpecComparatorDemo() {
  return (
    <SplitSpecComparator
      itemA={<div><span className="font-bold">Framework Alpha</span><br />Bundle: 120 KB<br />Hydration: 42ms</div>}
      itemB={<div><span className="font-bold text-accent">OpenUI Core</span><br />Bundle: 14 KB<br />Hydration: 1.2ms</div>}
    />
  );
}
`,
  }),

  P("two-column-profile-feed", {
    category: "layouts",
    subcategory: "splits",
    title: "Two Column Profile Feed",
    description: "Social profile view with sticky user bio credentials on left and chronological post stream on right.",
    tags: ["profile", "feed", "social", "stream", "split"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "split",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "profile-bio-and-stream-scroll",
      visualModel: "sticky-bio-and-activity-stream",
      motionModel: "none",
      layoutModel: "asymmetric-profile-grid",
      semanticPurpose: "user-profile-and-activity-layout",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface TwoColumnProfileFeedProps extends React.HTMLAttributes<HTMLDivElement> {
  bio?: React.ReactNode;
  children?: React.ReactNode;
}

export function TwoColumnProfileFeed({ bio, children, className, ...props }: TwoColumnProfileFeedProps) {
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto p-6 font-sans items-start", className)} {...props}>
      <aside className="lg:col-span-4 lg:sticky lg:top-6 p-6 rounded-2xl border border-line bg-surface/30">{bio}</aside>
      <main className="lg:col-span-8 space-y-4">{children}</main>
    </div>
  );
}
`,
    demo: `"use client";

import { TwoColumnProfileFeed } from "./two-column-profile-feed";

export default function TwoColumnProfileFeedDemo() {
  return (
    <TwoColumnProfileFeed
      bio={
        <div>
          <h3 className="text-sm font-bold text-ink">Cyril Chris</h3>
          <p className="text-xs text-ink/60 mt-1">Lead Design Systems Architect</p>
        </div>
      }
    >
      <div className="p-4 rounded-xl border border-line bg-paper text-xs">Activity update from architect.</div>
    </TwoColumnProfileFeed>
  );
}
`,
  }),

  P("compact-widget-dock", {
    category: "layouts",
    subcategory: "shells",
    title: "Compact Widget Dock",
    description: "Four-column compact widget bar docked to the bottom of the active viewport.",
    tags: ["dock", "widgets", "telemetry", "bottom", "bar"],
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
      interactionModel: "viewport-bottom-dock-scan",
      visualModel: "four-slot-widget-dock",
      motionModel: "none",
      layoutModel: "horizontal-bottom-dock",
      semanticPurpose: "bottom-pinned-widget-rack",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface CompactWidgetDockProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function CompactWidgetDock({ children, className, ...props }: CompactWidgetDockProps) {
  return (
    <div className={cn("grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 rounded-2xl border border-line bg-paper/90 backdrop-blur-md shadow-lg max-w-3xl mx-auto font-mono text-xs", className)} {...props}>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { CompactWidgetDock } from "./compact-widget-dock";

export default function CompactWidgetDockDemo() {
  return (
    <CompactWidgetDock>
      {["RAM: 42%", "CPU: 18%", "NET: 80Mbps", "TEMP: 38°C"].map((w) => (
        <div key={w} className="p-2 rounded bg-surface/50 text-center font-bold text-ink">
          {w}
        </div>
      ))}
    </CompactWidgetDock>
  );
}
`,
  }),

  P("infinite-scroll-masonry", {
    category: "layouts",
    subcategory: "grids",
    title: "Infinite Scroll Masonry",
    description: "Responsive multi-column image masonry grid with loading indicator spinner at the foot.",
    tags: ["masonry", "infinite-scroll", "gallery", "waterfall", "grid"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "scatter",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "infinite-scroll-masonry",
      visualModel: "waterfall-image-columns",
      motionModel: "none",
      layoutModel: "css-columns-infinite",
      semanticPurpose: "infinite-image-masonry",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface InfiniteScrollMasonryProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function InfiniteScrollMasonry({ children, className, ...props }: InfiniteScrollMasonryProps) {
  return (
    <div className={cn("columns-2 sm:columns-3 gap-3 p-4 max-w-4xl mx-auto space-y-3", className)} {...props}>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { InfiniteScrollMasonry } from "./infinite-scroll-masonry";

export default function InfiniteScrollMasonryDemo() {
  return (
    <InfiniteScrollMasonry>
      {[40, 24, 32, 48, 28, 36].map((h, i) => (
        <div key={i} className={cn("p-4 rounded-xl border border-line bg-surface/30 break-inside-avoid text-xs font-mono", \`h-\${h}\`)}>
          Card #{i + 1}
        </div>
      ))}
    </InfiniteScrollMasonry>
  );
}
`,
  }),

  P("split-search-filter-map", {
    category: "layouts",
    subcategory: "shells",
    title: "Split Search Filter Map",
    description: "Airbnb-style discovery layout: facet filters on left, scrollable entity cards in center, interactive map on right.",
    tags: ["search", "map", "discovery", "airbnb", "triptych"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "split",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "triptych-search-discovery",
      visualModel: "filter-cards-map-triptych",
      motionModel: "none",
      layoutModel: "three-column-discovery-shell",
      semanticPurpose: "location-discovery-search",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface SplitSearchFilterMapProps extends React.HTMLAttributes<HTMLDivElement> {
  filters?: React.ReactNode;
  results?: React.ReactNode;
  map?: React.ReactNode;
}

export function SplitSearchFilterMap({ filters, results, map, className, ...props }: SplitSearchFilterMapProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-12 min-h-[380px] w-full border border-line rounded-2xl overflow-hidden font-sans text-xs", className)} {...props}>
      <aside className="md:col-span-3 border-r border-line p-3 bg-surface/20 hidden md:block">{filters}</aside>
      <main className="md:col-span-5 p-4 overflow-y-auto space-y-3 bg-paper">{results}</main>
      <div className="md:col-span-4 bg-surface/40 p-4 hidden lg:flex items-center justify-center border-l border-line">{map}</div>
    </div>
  );
}
`,
    demo: `"use client";

import { SplitSearchFilterMap } from "./split-search-filter-map";

export default function SplitSearchFilterMapDemo() {
  return (
    <SplitSearchFilterMap
      filters={<div>Filter Facets</div>}
      results={<div className="p-3 rounded-lg border border-line bg-surface/30">Listing Item A</div>}
      map={<div className="font-mono text-ink/60">Spatial Map</div>}
    />
  );
}
`,
  }),

  P("editorial-chapter-opener", {
    category: "layouts",
    subcategory: "reading",
    title: "Editorial Chapter Opener",
    description: "Book chapter opening spread featuring oversized Roman numeral, ornamental drop cap, and dual columns.",
    tags: ["book", "chapter", "editorial", "prose", "dropcap"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "editorial",
      macrostructure: "asymmetric",
      density: "airy",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "serif-display",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "chapter-opening-reading",
      visualModel: "numeral-and-dropcap-opener",
      motionModel: "none",
      layoutModel: "book-chapter-spread",
      semanticPurpose: "book-chapter-title-spread",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface EditorialChapterOpenerProps extends React.HTMLAttributes<HTMLDivElement> {
  numeral?: string;
  title?: string;
  children?: React.ReactNode;
}

export function EditorialChapterOpener({
  numeral = "IV",
  title = "The Architecture of Clean Interfaces",
  children,
  className,
  ...props
}: EditorialChapterOpenerProps) {
  return (
    <div className={cn("max-w-4xl mx-auto p-8 font-serif text-ink space-y-8", className)} {...props}>
      <div className="border-b-2 border-ink pb-6">
        <div className="text-4xl font-bold font-mono text-accent">{numeral}</div>
        <h1 className="text-2xl font-bold mt-2">{title}</h1>
      </div>
      <div className="columns-1 md:columns-2 gap-8 text-sm leading-relaxed text-ink/90 space-y-4">
        {children}
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { EditorialChapterOpener } from "./editorial-chapter-opener";

export default function EditorialChapterOpenerDemo() {
  return (
    <EditorialChapterOpener>
      <p>Interfaces should not be generic copies. When every component carries an explicit architectural signature, design systems scale with integrity.</p>
    </EditorialChapterOpener>
  );
}
`,
  }),

  P("split-feature-checklist", {
    category: "layouts",
    subcategory: "splits",
    title: "Split Feature Checklist",
    description: "Marketing conversion split: high-level elevator pitch on left and checkmarked deliverable list on right.",
    tags: ["checklist", "features", "conversion", "marketing", "split"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "split",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "feature-checklist-scan",
      visualModel: "pitch-and-checklist-halves",
      motionModel: "none",
      layoutModel: "side-by-side-checklist",
      semanticPurpose: "conversion-feature-checklist",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface SplitFeatureChecklistProps extends React.HTMLAttributes<HTMLDivElement> {
  pitch?: React.ReactNode;
  checks?: string[];
}

export function SplitFeatureChecklist({
  pitch,
  checks = [
    "Zero external UI framework dependencies",
    "Verified against closed design DNA types",
    "Pre-computed behavioural fingerprints",
  ],
  className,
  ...props
}: SplitFeatureChecklistProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto p-6 font-sans items-center", className)} {...props}>
      <div>{pitch}</div>
      <ul className="space-y-3 font-mono text-xs">
        {checks.map((c) => (
          <li key={c} className="flex items-center gap-2 text-ink/80">
            <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center font-bold text-[10px]">✓</span>
            <span>{c}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
`,
    demo: `"use client";

import { SplitFeatureChecklist } from "./split-feature-checklist";

export default function SplitFeatureChecklistDemo() {
  return (
    <SplitFeatureChecklist
      pitch={
        <div>
          <h3 className="text-lg font-bold text-ink">Built for Speed and Rigor</h3>
          <p className="text-xs text-ink/60 mt-1">Autonomous registry infrastructure.</p>
        </div>
      }
    />
  );
}
`,
  }),

  P("three-tier-pricing-table", {
    category: "layouts",
    subcategory: "grids",
    title: "Three Tier Pricing Table",
    description: "Comparative SaaS pricing table layout with vertical plan columns and horizontal feature checkmark rows.",
    tags: ["pricing", "table", "tiers", "subscription", "plans"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "three-tier-plan-matrix",
      visualModel: "columnar-pricing-table",
      motionModel: "none",
      layoutModel: "tabular-plan-columns",
      semanticPurpose: "subscription-plan-matrix",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface ThreeTierPricingTableProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function ThreeTierPricingTable({ children, className, ...props }: ThreeTierPricingTableProps) {
  return (
    <div className={cn("max-w-4xl mx-auto border border-line rounded-2xl overflow-hidden font-sans text-xs bg-paper", className)} {...props}>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { ThreeTierPricingTable } from "./three-tier-pricing-table";

export default function ThreeTierPricingTableDemo() {
  return (
    <ThreeTierPricingTable>
      <div className="grid grid-cols-4 p-4 border-b border-line font-bold font-mono">
        <span>Plan</span>
        <span className="text-center">Free</span>
        <span className="text-center text-accent">Pro</span>
        <span className="text-center">Team</span>
      </div>
      <div className="grid grid-cols-4 p-4 border-b border-line/50">
        <span>Monthly Cost</span>
        <span className="text-center font-mono">$0</span>
        <span className="text-center font-mono font-bold text-accent">$29</span>
        <span className="text-center font-mono">$99</span>
      </div>
    </ThreeTierPricingTable>
  );
}
`,
  }),

  P("split-dashboard-analytics", {
    category: "layouts",
    subcategory: "splits",
    title: "Split Dashboard Analytics",
    description: "Live operational telemetry layout with large timeseries chart area on left and realtime log stream on right.",
    tags: ["analytics", "dashboard", "telemetry", "split", "logs"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "split",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "analytics-chart-and-log-split",
      visualModel: "timeseries-and-log-ticker",
      motionModel: "none",
      layoutModel: "side-by-side-analytics-split",
      semanticPurpose: "telemetry-analytics-workbench",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface SplitDashboardAnalyticsProps extends React.HTMLAttributes<HTMLDivElement> {
  chart?: React.ReactNode;
  logs?: React.ReactNode;
}

export function SplitDashboardAnalytics({ chart, logs, className, ...props }: SplitDashboardAnalyticsProps) {
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-12 gap-4 max-w-5xl mx-auto p-4 font-mono text-xs", className)} {...props}>
      <div className="lg:col-span-8 p-4 rounded-xl border border-line bg-surface/30 min-h-[260px] flex items-center justify-center">{chart}</div>
      <div className="lg:col-span-4 p-4 rounded-xl border border-line bg-surface/30 space-y-2">{logs}</div>
    </div>
  );
}
`,
    demo: `"use client";

import { SplitDashboardAnalytics } from "./split-dashboard-analytics";

export default function SplitDashboardAnalyticsDemo() {
  return (
    <SplitDashboardAnalytics
      chart={<div>Timeseries Telemetry Graph</div>}
      logs={<div>[12:04] Deployment Sync Complete<br />[12:03] Healthcheck 200 OK</div>}
    />
  );
}
`,
  }),

  P("two-tier-navbar-brand", {
    category: "layouts",
    subcategory: "shells",
    title: "Two Tier Navbar Brand",
    description: "Two-level navigation header with persistent top utility strip and main navigation bar below.",
    tags: ["navbar", "brand", "header", "navigation", "shell"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "stack",
      density: "compact",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "two-tier-navbar-navigation",
      visualModel: "double-decker-navbar",
      motionModel: "none",
      layoutModel: "stacked-navbar-rows",
      semanticPurpose: "global-branding-navbar",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface TwoTierNavbarBrandProps extends React.HTMLAttributes<HTMLDivElement> {
  topStrip?: React.ReactNode;
  mainNav?: React.ReactNode;
  children?: React.ReactNode;
}

export function TwoTierNavbarBrand({ topStrip, mainNav, children, className, ...props }: TwoTierNavbarBrandProps) {
  return (
    <div className={cn("w-full border border-line rounded-xl overflow-hidden font-sans bg-paper", className)} {...props}>
      <div className="p-2 bg-surface/50 border-b border-line flex justify-between px-6 text-[11px] font-mono text-ink/60">{topStrip}</div>
      <header className="p-4 border-b border-line flex items-center justify-between px-6">{mainNav}</header>
      <main className="p-6">{children}</main>
    </div>
  );
}
`,
    demo: `"use client";

import { TwoTierNavbarBrand } from "./two-tier-navbar-brand";

export default function TwoTierNavbarBrandDemo() {
  return (
    <TwoTierNavbarBrand
      topStrip={<span>Status: Operational • Global CDN Edge</span>}
      mainNav={<span className="font-bold text-sm">OPENUI REGISTRY</span>}
    >
      <div className="text-xs text-ink/70">Main content area below double-decker navbar.</div>
    </TwoTierNavbarBrand>
  );
}
`,
  }),

  P("multi-column-glossary-index", {
    category: "layouts",
    subcategory: "grids",
    title: "Multi Column Glossary Index",
    description: "Three-column alphabetical glossary layout with letter jump anchors and definition cards.",
    tags: ["glossary", "alphabetical", "index", "columns", "definitions"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "editorial",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "serif-display",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "glossary-alphabetical-scan",
      visualModel: "three-column-letter-matrix",
      motionModel: "none",
      layoutModel: "three-column-glossary-grid",
      semanticPurpose: "alphabetical-glossary-index",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface MultiColumnGlossaryIndexProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function MultiColumnGlossaryIndex({ children, className, ...props }: MultiColumnGlossaryIndexProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto p-6 font-serif text-xs", className)} {...props}>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { MultiColumnGlossaryIndex } from "./multi-column-glossary-index";

export default function MultiColumnGlossaryIndexDemo() {
  return (
    <MultiColumnGlossaryIndex>
      <div className="space-y-2">
        <div className="text-lg font-bold font-mono text-accent">A</div>
        <div className="p-2.5 rounded border border-line bg-paper"><strong>Axonometric</strong>: 3D projection without perspective convergence.</div>
      </div>
      <div className="space-y-2">
        <div className="text-lg font-bold font-mono text-accent">B</div>
        <div className="p-2.5 rounded border border-line bg-paper"><strong>Bento Grid</strong>: Modular rectangular container matrix.</div>
      </div>
      <div className="space-y-2">
        <div className="text-lg font-bold font-mono text-accent">C</div>
        <div className="p-2.5 rounded border border-line bg-paper"><strong>Closed Schema</strong>: Strict compile-time type validation.</div>
      </div>
    </MultiColumnGlossaryIndex>
  );
}
`,
  }),

  P("stacked-feature-cards", {
    category: "layouts",
    subcategory: "stacks",
    title: "Stacked Feature Cards",
    description: "Vertical sequence of large alternating marketing feature showcase cards.",
    tags: ["feature", "cards", "alternating", "marketing", "stack"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "alternating-feature-card-scroll",
      visualModel: "stacked-wide-feature-cards",
      motionModel: "none",
      layoutModel: "single-column-feature-deck",
      semanticPurpose: "product-feature-stack",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface StackedFeatureCardsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function StackedFeatureCards({ children, className, ...props }: StackedFeatureCardsProps) {
  return (
    <div className={cn("space-y-8 max-w-4xl mx-auto p-4 font-sans", className)} {...props}>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { StackedFeatureCards } from "./stacked-feature-cards";

export default function StackedFeatureCardsDemo() {
  return (
    <StackedFeatureCards>
      <div className="p-8 rounded-3xl border border-line bg-surface/30">
        <h3 className="text-base font-bold text-ink">Feature Card 01</h3>
        <p className="text-xs text-ink/60 mt-1">Autonomous registration pipeline.</p>
      </div>
    </StackedFeatureCards>
  );
}
`,
  }),

  P("split-login-card", {
    category: "layouts",
    subcategory: "splits",
    title: "Split Login Card",
    description: "Contained authentication card with left branded illustration and right social/email form.",
    tags: ["login", "auth", "card", "split", "modal"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "split",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "contained-auth-split",
      visualModel: "compact-split-auth-card",
      motionModel: "none",
      layoutModel: "contained-two-column-card",
      semanticPurpose: "login-card-container",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface SplitLoginCardProps extends React.HTMLAttributes<HTMLDivElement> {
  graphic?: React.ReactNode;
  form?: React.ReactNode;
}

export function SplitLoginCard({ graphic, form, className, ...props }: SplitLoginCardProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 max-w-xl mx-auto rounded-3xl border border-line bg-paper overflow-hidden font-sans shadow-lg", className)} {...props}>
      <div className="p-6 bg-surface/50 border-b md:border-b-0 md:border-r border-line flex items-center justify-center">{graphic}</div>
      <div className="p-6 space-y-3">{form}</div>
    </div>
  );
}
`,
    demo: `"use client";

import { SplitLoginCard } from "./split-login-card";

export default function SplitLoginCardDemo() {
  return (
    <SplitLoginCard
      graphic={<div className="font-mono text-xs font-bold text-accent">OpenUI Core</div>}
      form={
        <div>
          <h3 className="text-sm font-bold text-ink mb-1">Sign In</h3>
          <input type="text" placeholder="Username" className="w-full px-3 py-1.5 rounded border border-line text-xs bg-paper mb-2" />
          <button type="button" className="w-full py-1.5 rounded bg-accent text-white font-mono text-xs">Enter</button>
        </div>
      }
    />
  );
}
`,
  }),
];

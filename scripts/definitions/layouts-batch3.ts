import type { ResourceDefinition } from "../lib/definitions.js";

const P = (name: string, definition: Omit<ResourceDefinition, "name">): ResourceDefinition => ({
  name,
  ...definition,
});

export default [
  P("split-scroll-feature-showcase", {
    category: "layouts",
    subcategory: "splits",
    title: "Split Scroll Feature Showcase",
    description: "Marketing feature showcase with sticky illustrative canvas on left and sequential scrolling feature steps on right.",
    tags: ["feature", "showcase", "sticky", "scroll", "split"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "split",
      density: "airy",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "sticky-graphic-scroll-steps",
      visualModel: "pin-on-scroll-showcase",
      motionModel: "none",
      layoutModel: "side-by-side-feature-scroll",
      semanticPurpose: "feature-walkthrough-split",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface SplitScrollFeatureShowcaseProps extends React.HTMLAttributes<HTMLDivElement> {
  canvas?: React.ReactNode;
  children?: React.ReactNode;
}

export function SplitScrollFeatureShowcase({ canvas, children, className, ...props }: SplitScrollFeatureShowcaseProps) {
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto p-6 font-sans items-start", className)} {...props}>
      <div className="lg:sticky lg:top-8 h-64 lg:h-80 rounded-2xl border border-line bg-surface/40 flex items-center justify-center p-6">{canvas}</div>
      <div className="space-y-12 py-6">{children}</div>
    </div>
  );
}
`,
    demo: `"use client";

import { SplitScrollFeatureShowcase } from "./split-scroll-feature-showcase";

export default function SplitScrollFeatureShowcaseDemo() {
  return (
    <SplitScrollFeatureShowcase canvas={<div className="font-mono text-xs font-bold text-accent">Feature Graphic Stage</div>}>
      <div className="space-y-2">
        <h3 className="text-base font-bold text-ink">01. Autonomous Discovery</h3>
        <p className="text-xs text-ink/60">Components automatically self-register without manual barrel manifests.</p>
      </div>
      <div className="space-y-2">
        <h3 className="text-base font-bold text-ink">02. Closed Schema Verification</h3>
        <p className="text-xs text-ink/60">Every component enforces strict TypeScript contract compliance.</p>
      </div>
    </SplitScrollFeatureShowcase>
  );
}
`,
  }),

  P("metric-kpi-scoreboard", {
    category: "layouts",
    subcategory: "grids",
    title: "Metric KPI Scoreboard",
    description: "High-impact executive scoreboard banner displaying primary business KPIs across a single horizontal strip.",
    tags: ["kpi", "scoreboard", "metrics", "executive", "banner"],
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
      interactionModel: "executive-scoreboard-scan",
      visualModel: "single-strip-kpi-scoreboard",
      motionModel: "none",
      layoutModel: "horizontal-metric-strip",
      semanticPurpose: "executive-telemetry-banner",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface MetricKPIScoreboardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function MetricKPIScoreboard({ children, className, ...props }: MetricKPIScoreboardProps) {
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl border border-line bg-surface/30 max-w-5xl mx-auto font-mono text-xs", className)} {...props}>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { MetricKPIScoreboard } from "./metric-kpi-scoreboard";

export default function MetricKPIScoreboardDemo() {
  return (
    <MetricKPIScoreboard>
      <div><span className="text-ink/60">ARR</span><div className="text-lg font-bold text-ink mt-1">$4.2M</div></div>
      <div><span className="text-ink/60">Active Users</span><div className="text-lg font-bold text-ink mt-1">128.4K</div></div>
      <div><span className="text-ink/60">Retention</span><div className="text-lg font-bold text-accent mt-1">94.8%</div></div>
      <div><span className="text-ink/60">NPS Score</span><div className="text-lg font-bold text-emerald-600 mt-1">+72</div></div>
    </MetricKPIScoreboard>
  );
}
`,
  }),

  P("interactive-node-graph-layout", {
    category: "layouts",
    subcategory: "shells",
    title: "Interactive Node Graph Layout",
    description: "Full-bleed spatial node graph workflow stage with top tool strip and floating canvas controls.",
    tags: ["node", "graph", "workflow", "canvas", "spatial"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "full-bleed",
      density: "airy",
      shapeLanguage: "rounded",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "node-graph-canvas-stage",
      visualModel: "graph-stage-with-controls",
      motionModel: "none",
      layoutModel: "canvas-with-floating-controls",
      semanticPurpose: "visual-programming-stage",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface InteractiveNodeGraphLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  toolbar?: React.ReactNode;
  children?: React.ReactNode;
}

export function InteractiveNodeGraphLayout({ toolbar, children, className, ...props }: InteractiveNodeGraphLayoutProps) {
  return (
    <div className={cn("relative w-full h-80 rounded-2xl border border-line bg-surface/20 overflow-hidden font-mono text-xs", className)} {...props}>
      {toolbar && <div className="absolute top-3 left-3 z-10 p-1.5 rounded-lg border border-line bg-paper/90 shadow-sm flex items-center gap-2">{toolbar}</div>}
      <div className="absolute inset-0 flex items-center justify-center -z-10">{children}</div>
    </div>
  );
}
`,
    demo: `"use client";

import { InteractiveNodeGraphLayout } from "./interactive-node-graph-layout";

export default function InteractiveNodeGraphLayoutDemo() {
  return (
    <InteractiveNodeGraphLayout toolbar={<span>+ Add Node | 🔍 100%</span>}>
      <div className="text-ink/40">Directed Acyclic Graph Canvas</div>
    </InteractiveNodeGraphLayout>
  );
}
`,
  }),

  P("two-column-specs-sheet", {
    category: "layouts",
    subcategory: "grids",
    title: "Two Column Specs Sheet",
    description: "Clean specification layout for hardware or software documentation with bold key/value grid.",
    tags: ["specs", "hardware", "table", "technical", "sheet"],
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
      interactionModel: "technical-spec-lookup",
      visualModel: "two-column-key-value-sheet",
      motionModel: "none",
      layoutModel: "tabular-key-value-grid",
      semanticPurpose: "hardware-specification-sheet",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface TwoColumnSpecsSheetProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  specs?: Array<{ key: string; value: string }>;
}

export function TwoColumnSpecsSheet({
  title = "Technical Specifications",
  specs = [
    { key: "Architecture", value: "x86_64 / ARM64 Unified" },
    { key: "Memory Bandwidth", value: "800 GB/s LPDDR5X" },
    { key: "Thermal Design", value: "35W Passive Radiator" },
  ],
  className,
  ...props
}: TwoColumnSpecsSheetProps) {
  return (
    <div className={cn("max-w-xl mx-auto p-6 rounded-2xl border border-line bg-paper font-mono text-xs shadow-sm", className)} {...props}>
      <div className="font-bold text-sm text-ink mb-4 pb-2 border-b border-line">{title}</div>
      <dl className="divide-y divide-line/60">
        {specs.map((s) => (
          <div key={s.key} className="grid grid-cols-2 py-2">
            <dt className="text-ink/60">{s.key}</dt>
            <dd className="font-semibold text-ink text-right">{s.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
`,
    demo: `"use client";

import { TwoColumnSpecsSheet } from "./two-column-specs-sheet";

export default function TwoColumnSpecsSheetDemo() {
  return <TwoColumnSpecsSheet />;
}
`,
  }),

  P("split-hero-diagonal", {
    category: "layouts",
    subcategory: "splits",
    title: "Split Hero Diagonal",
    description: "Modern landing hero section with angled diagonal polygon dividing the typography from visual canvas.",
    tags: ["hero", "diagonal", "split", "landing", "polygon"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "brutalist",
      macrostructure: "split",
      density: "airy",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "diagonal-split-hero",
      visualModel: "angled-diagonal-halves",
      motionModel: "none",
      layoutModel: "diagonal-polygon-split",
      semanticPurpose: "dynamic-hero-banner",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface SplitHeroDiagonalProps extends React.HTMLAttributes<HTMLDivElement> {
  headline?: React.ReactNode;
  visual?: React.ReactNode;
}

export function SplitHeroDiagonal({ headline, visual, className, ...props }: SplitHeroDiagonalProps) {
  return (
    <div className={cn("relative grid grid-cols-1 lg:grid-cols-2 min-h-[360px] w-full overflow-hidden rounded-2xl border border-line font-sans", className)} {...props}>
      <div className="p-8 flex items-center bg-paper z-10">{headline}</div>
      <div className="p-8 flex items-center justify-center bg-surface/50 [clip-path:polygon(15%_0,100%_0,100%_100%,0%_100%)]">{visual}</div>
    </div>
  );
}
`,
    demo: `"use client";

import { SplitHeroDiagonal } from "./split-hero-diagonal";

export default function SplitHeroDiagonalDemo() {
  return (
    <SplitHeroDiagonal
      headline={
        <div className="space-y-2">
          <h1 className="text-xl font-bold text-ink">Autonomous Design Ecology</h1>
          <p className="text-xs text-ink/70">800 unique verified items with behavioral fingerprints.</p>
        </div>
      }
      visual={<div className="font-mono text-xs text-accent font-bold">Diagonal Visual Plane</div>}
    />
  );
}
`,
  }),

  P("multi-column-directory-list", {
    category: "layouts",
    subcategory: "grids",
    title: "Multi Column Directory List",
    description: "Four-column directory index for organizing extensive rosters of components, tags, or API endpoints.",
    tags: ["directory", "index", "columns", "tags", "roster"],
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
      interactionModel: "directory-index-lookup",
      visualModel: "four-column-directory-matrix",
      motionModel: "none",
      layoutModel: "multi-column-index-grid",
      semanticPurpose: "directory-index-display",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface MultiColumnDirectoryListProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function MultiColumnDirectoryList({ children, className, ...props }: MultiColumnDirectoryListProps) {
  return (
    <div className={cn("grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto p-4 font-mono text-xs", className)} {...props}>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { MultiColumnDirectoryList } from "./multi-column-directory-list";

export default function MultiColumnDirectoryListDemo() {
  return (
    <MultiColumnDirectoryList>
      {["Components", "Text", "Motion", "Interactions", "Backgrounds", "Layouts", "Sections", "Blocks"].map((c) => (
        <div key={c} className="p-2.5 rounded border border-line bg-surface/30">
          <div className="font-bold text-ink">{c}</div>
          <div className="text-[10px] text-ink/60 mt-0.5">100 Items (100%)</div>
        </div>
      ))}
    </MultiColumnDirectoryList>
  );
}
`,
  }),

  P("stacked-timeline-stream", {
    category: "layouts",
    subcategory: "stacks",
    title: "Stacked Timeline Stream",
    description: "Single-column vertical activity feed with avatar indicators and connecting timeline guides.",
    tags: ["timeline", "activity", "stream", "feed", "stack"],
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
      interactionModel: "activity-stream-scroll",
      visualModel: "vertical-timeline-wire",
      motionModel: "none",
      layoutModel: "single-column-timeline-stack",
      semanticPurpose: "activity-audit-stream",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface StackedTimelineStreamProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function StackedTimelineStream({ children, className, ...props }: StackedTimelineStreamProps) {
  return (
    <div className={cn("max-w-md mx-auto p-4 space-y-4 font-sans text-xs", className)} {...props}>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { StackedTimelineStream } from "./stacked-timeline-stream";

export default function StackedTimelineStreamDemo() {
  return (
    <StackedTimelineStream>
      <div className="flex gap-3 items-start">
        <div className="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-[10px] font-bold">AG</div>
        <div className="flex-1 p-3 rounded-lg border border-line bg-surface/30">
          <div className="font-semibold text-ink">Built 100 Backgrounds</div>
          <div className="text-[10px] text-ink/50 mt-0.5 font-mono">2 mins ago</div>
        </div>
      </div>
    </StackedTimelineStream>
  );
}
`,
  }),

  P("sticky-tab-bar-layout", {
    category: "layouts",
    subcategory: "shells",
    title: "Sticky Tab Bar Layout",
    description: "Scrollable view layout featuring a horizontal tab strip that sticks cleanly to the top viewport edge.",
    tags: ["tabs", "sticky", "navigation", "scroll", "shell"],
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
      interactionModel: "sticky-tab-bar-scroll",
      visualModel: "pinned-horizontal-tab-rail",
      motionModel: "none",
      layoutModel: "tab-pinned-viewport",
      semanticPurpose: "tabbed-content-viewport",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface StickyTabBarLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs?: React.ReactNode;
  children?: React.ReactNode;
}

export function StickyTabBarLayout({ tabs, children, className, ...props }: StickyTabBarLayoutProps) {
  return (
    <div className={cn("max-w-3xl mx-auto p-4 font-sans", className)} {...props}>
      <div className="sticky top-2 z-20 py-2 mb-4 bg-paper/90 backdrop-blur-md border-b border-line flex gap-4 text-xs font-mono">
        {tabs}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
`,
    demo: `"use client";

import { StickyTabBarLayout } from "./sticky-tab-bar-layout";

export default function StickyTabBarLayoutDemo() {
  return (
    <StickyTabBarLayout
      tabs={
        <>
          <span className="font-bold text-accent">Design Tokens</span>
          <span className="text-ink/60">Source AST</span>
          <span className="text-ink/60">Documentation</span>
        </>
      }
    >
      <div className="p-4 rounded-xl border border-line bg-surface/30 text-xs">Section panel content viewport.</div>
    </StickyTabBarLayout>
  );
}
`,
  }),

  P("three-column-social-dashboard", {
    category: "layouts",
    subcategory: "shells",
    title: "Three Column Social Dashboard",
    description: "Three-tier social dashboard layout: user mini profile on left, central stream, and right suggestions.",
    tags: ["social", "dashboard", "three-column", "community", "stream"],
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
      interactionModel: "three-column-social-feed",
      visualModel: "profile-feed-suggestions-triptych",
      motionModel: "none",
      layoutModel: "three-column-social-layout",
      semanticPurpose: "community-feed-dashboard",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface ThreeColumnSocialDashboardProps extends React.HTMLAttributes<HTMLDivElement> {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

export function ThreeColumnSocialDashboard({ left, center, right, className, ...props }: ThreeColumnSocialDashboardProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-12 gap-4 max-w-5xl mx-auto p-4 font-sans items-start", className)} {...props}>
      <div className="md:col-span-3 hidden md:block">{left}</div>
      <div className="md:col-span-6 space-y-4">{center}</div>
      <div className="md:col-span-3 hidden lg:block">{right}</div>
    </div>
  );
}
`,
    demo: `"use client";

import { ThreeColumnSocialDashboard } from "./three-column-social-dashboard";

export default function ThreeColumnSocialDashboardDemo() {
  return (
    <ThreeColumnSocialDashboard
      left={<div className="p-4 rounded-xl border border-line bg-surface/30 text-xs">User Profile</div>}
      center={<div className="p-4 rounded-xl border border-line bg-paper text-xs">Chronological Social Stream</div>}
      right={<div className="p-4 rounded-xl border border-line bg-surface/30 text-xs">Trending Topics</div>}
    />
  );
}
`,
  }),

  P("split-code-documentation", {
    category: "layouts",
    subcategory: "splits",
    title: "Split Code Documentation",
    description: "Stripe-style API documentation layout with prose documentation on left and companion code examples on right.",
    tags: ["api", "docs", "code", "split", "developer"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "split",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "prose-and-code-dual-scroll",
      visualModel: "stripe-style-api-docs",
      motionModel: "none",
      layoutModel: "side-by-side-doc-halves",
      semanticPurpose: "api-reference-layout",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface SplitCodeDocumentationProps extends React.HTMLAttributes<HTMLDivElement> {
  prose?: React.ReactNode;
  code?: React.ReactNode;
}

export function SplitCodeDocumentation({ prose, code, className, ...props }: SplitCodeDocumentationProps) {
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-2 min-h-[360px] w-full border border-line rounded-xl overflow-hidden font-sans", className)} {...props}>
      <div className="p-6 bg-paper space-y-3">{prose}</div>
      <div className="p-6 bg-slate-950 text-white font-mono text-xs overflow-x-auto">{code}</div>
    </div>
  );
}
`,
    demo: `"use client";

import { SplitCodeDocumentation } from "./split-code-documentation";

export default function SplitCodeDocumentationDemo() {
  return (
    <SplitCodeDocumentation
      prose={
        <div>
          <h3 className="text-sm font-bold text-ink">Fetch Registry Item</h3>
          <p className="text-xs text-ink/60 mt-1">Retrieves JSON manifest and source payload.</p>
        </div>
      }
      code={<div>curl -s https://openui.design/r/holy-grail-layout.json</div>}
    />
  );
}
`,
  }),

  P("bento-portfolio-grid", {
    category: "layouts",
    subcategory: "grids",
    title: "Bento Portfolio Grid",
    description: "Creative designer portfolio bento grid with case study cover, live metric pill, and bio card.",
    tags: ["portfolio", "bento", "designer", "case-study", "showcase"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "luxury",
      macrostructure: "mosaic",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "none",
      typographyStyle: "serif-display",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "portfolio-bento-inspection",
      visualModel: "asymmetric-portfolio-mosaic",
      motionModel: "none",
      layoutModel: "mosaic-bento-cells",
      semanticPurpose: "designer-portfolio-mosaic",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface BentoPortfolioGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function BentoPortfolioGrid({ children, className, ...props }: BentoPortfolioGridProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto p-4 font-sans", className)} {...props}>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { BentoPortfolioGrid } from "./bento-portfolio-grid";

export default function BentoPortfolioGridDemo() {
  return (
    <BentoPortfolioGrid>
      <div className="md:col-span-2 p-6 rounded-2xl border border-line bg-surface/40">
        <h3 className="text-sm font-bold font-serif text-ink">Autonomous Design Ecosystem</h3>
        <p className="text-xs text-ink/60 mt-1">Featured architecture study.</p>
      </div>
      <div className="p-6 rounded-2xl border border-line bg-surface/30">
        <h4 className="text-xs font-bold text-ink">Design Lead</h4>
        <p className="text-xs text-ink/60 mt-1">Elena Rostova</p>
      </div>
    </BentoPortfolioGrid>
  );
}
`,
  }),

  P("carousel-hero-stage", {
    category: "layouts",
    subcategory: "shells",
    title: "Carousel Hero Stage",
    description: "Full-width hero carousel stage with slide track viewport, chevron triggers, and progress indicators.",
    tags: ["carousel", "hero", "slider", "stage", "banner"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "stack",
      density: "airy",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "hero-carousel-pagination",
      visualModel: "wide-carousel-banner",
      motionModel: "none",
      layoutModel: "banner-with-navigation-dots",
      semanticPurpose: "rotational-hero-stage",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface CarouselHeroStageProps extends React.HTMLAttributes<HTMLDivElement> {
  controls?: React.ReactNode;
  children?: React.ReactNode;
}

export function CarouselHeroStage({ controls, children, className, ...props }: CarouselHeroStageProps) {
  return (
    <div className={cn("relative w-full h-72 rounded-3xl border border-line bg-surface/30 overflow-hidden flex flex-col justify-between p-8 font-sans", className)} {...props}>
      <div className="flex-1 flex items-center justify-center">{children}</div>
      {controls && <div className="flex justify-center">{controls}</div>}
    </div>
  );
}
`,
    demo: `"use client";

import { CarouselHeroStage } from "./carousel-hero-stage";

export default function CarouselHeroStageDemo() {
  return (
    <CarouselHeroStage controls={<div className="font-mono text-xs text-accent">● ○ ○</div>}>
      <div className="text-center">
        <h2 className="text-lg font-bold text-ink">Featured Release: 800 Resource Master Catalogue</h2>
        <p className="text-xs text-ink/60 mt-1">Zero placeholders • Complete standalone React components</p>
      </div>
    </CarouselHeroStage>
  );
}
`,
  }),

  P("split-checkout-summary", {
    category: "layouts",
    subcategory: "splits",
    title: "Split Checkout Summary",
    description: "Ecommerce checkout layout with customer details/shipping on left and order ledger summary on right.",
    tags: ["checkout", "cart", "summary", "ecommerce", "split"],
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
      interactionModel: "checkout-order-summary-split",
      visualModel: "shipping-and-order-summary",
      motionModel: "none",
      layoutModel: "side-by-side-checkout-grid",
      semanticPurpose: "checkout-order-review",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface SplitCheckoutSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  form?: React.ReactNode;
  summary?: React.ReactNode;
}

export function SplitCheckoutSummary({ form, summary, className, ...props }: SplitCheckoutSummaryProps) {
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto p-6 font-sans items-start", className)} {...props}>
      <div className="lg:col-span-7 space-y-4">{form}</div>
      <div className="lg:col-span-5 p-6 rounded-2xl border border-line bg-surface/30 space-y-4">{summary}</div>
    </div>
  );
}
`,
    demo: `"use client";

import { SplitCheckoutSummary } from "./split-checkout-summary";

export default function SplitCheckoutSummaryDemo() {
  return (
    <SplitCheckoutSummary
      form={
        <div>
          <h3 className="text-sm font-bold text-ink mb-2">Shipping Information</h3>
          <input type="text" placeholder="Street Address" className="w-full px-3 py-2 rounded-lg border border-line bg-paper text-xs" />
        </div>
      }
      summary={
        <div className="text-xs">
          <div className="font-bold text-ink mb-2">Order Summary</div>
          <div className="flex justify-between py-1 text-ink/70"><span>Components Pack</span><span>$49.00</span></div>
          <div className="flex justify-between py-1 text-ink/70"><span>Taxes</span><span>$4.90</span></div>
          <div className="flex justify-between pt-2 border-t border-line font-bold text-ink"><span>Total</span><span>$53.90</span></div>
        </div>
      }
    />
  );
}
`,
  }),

  P("masonry-photo-wall", {
    category: "layouts",
    subcategory: "grids",
    title: "Masonry Photo Wall",
    description: "Seamless zero-gutter photo grid with dense visual interlocking image apertures.",
    tags: ["photo", "wall", "masonry", "seamless", "gallery"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "mosaic",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "dense-photowall-mosaic",
      visualModel: "seamless-photo-tessellation",
      motionModel: "none",
      layoutModel: "zero-gutter-masonry",
      semanticPurpose: "immersive-photo-wall",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface MasonryPhotoWallProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function MasonryPhotoWall({ children, className, ...props }: MasonryPhotoWallProps) {
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-4 max-w-5xl mx-auto rounded-2xl overflow-hidden border border-line", className)} {...props}>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { MasonryPhotoWall } from "./masonry-photo-wall";

export default function MasonryPhotoWallDemo() {
  return (
    <MasonryPhotoWall>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="h-32 bg-surface/40 border border-line/40 flex items-center justify-center font-mono text-[11px] text-ink/50">
          Photo #{i + 1}
        </div>
      ))}
    </MasonryPhotoWall>
  );
}
`,
  }),

  P("multi-step-form-rail", {
    category: "layouts",
    subcategory: "shells",
    title: "Multi Step Form Rail",
    description: "Vertical step checklist rail on left with active form step inputs on right.",
    tags: ["stepper", "form", "rail", "checklist", "steps"],
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
      interactionModel: "vertical-rail-stepper-form",
      visualModel: "step-rail-and-input-stage",
      motionModel: "none",
      layoutModel: "two-column-wizard-rail",
      semanticPurpose: "complex-wizard-workflow",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface MultiStepFormRailProps extends React.HTMLAttributes<HTMLDivElement> {
  rail?: React.ReactNode;
  children?: React.ReactNode;
}

export function MultiStepFormRail({ rail, children, className, ...props }: MultiStepFormRailProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-12 gap-6 max-w-4xl mx-auto p-6 font-sans items-start", className)} {...props}>
      <aside className="md:col-span-4 border-r border-line p-4 space-y-2">{rail}</aside>
      <main className="md:col-span-8 p-4">{children}</main>
    </div>
  );
}
`,
    demo: `"use client";

import { MultiStepFormRail } from "./multi-step-form-rail";

export default function MultiStepFormRailDemo() {
  return (
    <MultiStepFormRail
      rail={
        <div className="text-xs space-y-2">
          <div className="font-bold text-accent">1. Project Basics ✓</div>
          <div className="font-semibold text-ink">2. Design DNA Specs</div>
          <div className="text-ink/50">3. Verification Pipeline</div>
        </div>
      }
    >
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-ink">Configure Design DNA</h3>
        <p className="text-xs text-ink/60">Choose closed enums for typography, density, and macrostructure.</p>
      </div>
    </MultiStepFormRail>
  );
}
`,
  }),

  P("split-comparison-slider", {
    category: "layouts",
    subcategory: "splits",
    title: "Split Comparison Slider",
    description: "Before-and-after visual comparison framework with center boundary line.",
    tags: ["comparison", "slider", "before-after", "split", "interactive"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "split",
      density: "airy",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "before-after-divider",
      visualModel: "dual-layer-comparison-stage",
      motionModel: "none",
      layoutModel: "center-split-comparison",
      semanticPurpose: "visual-regression-inspection",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface SplitComparisonSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  before?: React.ReactNode;
  after?: React.ReactNode;
}

export function SplitComparisonSlider({ before, after, className, ...props }: SplitComparisonSliderProps) {
  return (
    <div className={cn("grid grid-cols-2 h-64 max-w-2xl mx-auto rounded-2xl overflow-hidden border border-line relative font-mono text-xs", className)} {...props}>
      <div className="bg-surface/50 p-4 flex items-center justify-center border-r border-accent">{before}</div>
      <div className="bg-paper p-4 flex items-center justify-center">{after}</div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center font-bold text-[10px]">
        ⟷
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { SplitComparisonSlider } from "./split-comparison-slider";

export default function SplitComparisonSliderDemo() {
  return (
    <SplitComparisonSlider
      before={<div>Raw CSS (Uncurated)</div>}
      after={<div>OpenUI Token Registry</div>}
    />
  );
}
`,
  }),

  P("header-banner-announcement", {
    category: "layouts",
    subcategory: "shells",
    title: "Header Banner Announcement",
    description: "Dismissable high-visibility notice banner pinned directly above the primary site navigation header.",
    tags: ["banner", "announcement", "notice", "header", "shell"],
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
      interactionModel: "top-announcement-dismissal",
      visualModel: "stacked-banner-and-navbar",
      motionModel: "none",
      layoutModel: "banner-above-navbar-stack",
      semanticPurpose: "global-announcement-shell",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface HeaderBannerAnnouncementProps extends React.HTMLAttributes<HTMLDivElement> {
  banner?: React.ReactNode;
  navbar?: React.ReactNode;
  children?: React.ReactNode;
}

export function HeaderBannerAnnouncement({
  banner,
  navbar,
  children,
  className,
  ...props
}: HeaderBannerAnnouncementProps) {
  return (
    <div className={cn("w-full border border-line rounded-xl overflow-hidden bg-paper font-sans", className)} {...props}>
      {banner && <div className="p-2 bg-accent text-white text-center text-xs font-mono font-semibold">{banner}</div>}
      {navbar && <div className="p-4 border-b border-line flex items-center justify-between">{navbar}</div>}
      <main className="p-6">{children}</main>
    </div>
  );
}
`,
    demo: `"use client";

import { HeaderBannerAnnouncement } from "./header-banner-announcement";

export default function HeaderBannerAnnouncementDemo() {
  return (
    <HeaderBannerAnnouncement
      banner={<span>🚀 OpenUI v1.0.0 is officially released! 800 working resources live.</span>}
      navbar={<span className="font-bold text-sm">OPENUI</span>}
    >
      <div className="text-xs text-ink/70">Main page hero content under header.</div>
    </HeaderBannerAnnouncement>
  );
}
`,
  }),

  P("command-center-hud", {
    category: "layouts",
    subcategory: "grids",
    title: "Command Center HUD",
    description: "Cyberpunk operational network operations center (NOC) HUD with six synchronized telemetry widgets.",
    tags: ["hud", "noc", "cyberpunk", "telemetry", "devops"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "mosaic",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "neon-on-dark",
    },
    fingerprint: {
      interactionModel: "noc-multi-tile-monitoring",
      visualModel: "six-cell-hud-cluster",
      motionModel: "none",
      layoutModel: "six-widget-hud-matrix",
      semanticPurpose: "network-operations-hud",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface CommandCenterHUDProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function CommandCenterHUD({ children, className, ...props }: CommandCenterHUDProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-3 p-4 max-w-5xl mx-auto font-mono text-xs bg-slate-950 text-emerald-400 rounded-2xl border border-emerald-500/30", className)} {...props}>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { CommandCenterHUD } from "./command-center-hud";

export default function CommandCenterHUDDemo() {
  return (
    <CommandCenterHUD>
      {["Core CPU", "Memory Bus", "Network I/O", "Edge Ping", "Worker Pods", "Security Gate"].map((h) => (
        <div key={h} className="p-3 rounded border border-emerald-500/20 bg-black/60">
          <div className="text-emerald-500/60 text-[10px] uppercase font-bold">{h}</div>
          <div className="text-sm font-bold text-emerald-400 mt-1">NOMINAL [OK]</div>
        </div>
      ))}
    </CommandCenterHUD>
  );
}
`,
  }),

  P("card-deck-tabs", {
    category: "layouts",
    subcategory: "stacks",
    title: "Card Deck Tabs",
    description: "Tabbed container layout where tab triggers swap between neatly stacked card sheets.",
    tags: ["tabs", "deck", "sheets", "stack", "cards"],
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
      interactionModel: "tab-card-deck-swapping",
      visualModel: "stacked-tab-panels",
      motionModel: "none",
      layoutModel: "stacked-tab-sheet",
      semanticPurpose: "tabbed-card-workbench",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface CardDeckTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs?: React.ReactNode;
  children?: React.ReactNode;
}

export function CardDeckTabs({ tabs, children, className, ...props }: CardDeckTabsProps) {
  return (
    <div className={cn("max-w-xl mx-auto font-sans text-xs", className)} {...props}>
      <div className="flex gap-2 mb-2 px-2">{tabs}</div>
      <div className="p-6 rounded-2xl border border-line bg-paper shadow-sm">{children}</div>
    </div>
  );
}
`,
    demo: `"use client";

import { CardDeckTabs } from "./card-deck-tabs";

export default function CardDeckTabsDemo() {
  return (
    <CardDeckTabs
      tabs={
        <>
          <button type="button" className="px-3 py-1 rounded-t-lg bg-paper border-t border-x border-line font-bold text-accent">Active Tab</button>
          <button type="button" className="px-3 py-1 text-ink/60">Alternate Tab</button>
        </>
      }
    >
      <div className="text-ink/80">Swappable card sheet viewport contents.</div>
    </CardDeckTabs>
  );
}
`,
  }),

  P("split-reading-dictionary", {
    category: "layouts",
    subcategory: "reading",
    title: "Split Reading Dictionary",
    description: "Glossary lookup layout: alphabetical term list on left and comprehensive term definition on right.",
    tags: ["dictionary", "glossary", "terms", "split", "lookup"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "editorial",
      macrostructure: "split",
      density: "compact",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "serif-display",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "glossary-term-selection",
      visualModel: "dictionary-term-and-definition",
      motionModel: "none",
      layoutModel: "two-column-glossary-split",
      semanticPurpose: "glossary-lookup-layout",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface SplitReadingDictionaryProps extends React.HTMLAttributes<HTMLDivElement> {
  terms?: React.ReactNode;
  definition?: React.ReactNode;
}

export function SplitReadingDictionary({ terms, definition, className, ...props }: SplitReadingDictionaryProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-12 min-h-[320px] w-full border border-line rounded-xl overflow-hidden font-serif", className)} {...props}>
      <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-line p-4 bg-surface/30 space-y-2">{terms}</div>
      <div className="md:col-span-8 p-6 bg-paper">{definition}</div>
    </div>
  );
}
`,
    demo: `"use client";

import { SplitReadingDictionary } from "./split-reading-dictionary";

export default function SplitReadingDictionaryDemo() {
  return (
    <SplitReadingDictionary
      terms={
        <div className="text-xs space-y-1">
          <div className="font-bold text-accent">Macrostructure</div>
          <div className="text-ink/70">Motion Language</div>
          <div className="text-ink/70">Density Matrix</div>
        </div>
      }
      definition={
        <div>
          <h3 className="text-lg font-bold text-ink">Macrostructure</h3>
          <p className="text-xs text-ink/70 mt-1 leading-relaxed">
            The fundamental architectural topology of an interface (e.g. split, stack, mosaic, rail, full-bleed).
          </p>
        </div>
      }
    />
  );
}
`,
  }),

  P("editorial-pullquote-spread", {
    category: "layouts",
    subcategory: "reading",
    title: "Editorial Pullquote Spread",
    description: "Magazine layout with oversized highlighted pullquote spanning across multi-column article prose.",
    tags: ["editorial", "pullquote", "spread", "magazine", "serif"],
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
      interactionModel: "editorial-pullquote-reading",
      visualModel: "oversized-pullquote-banner",
      motionModel: "none",
      layoutModel: "pullquote-spanning-columns",
      semanticPurpose: "editorial-feature-article",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface EditorialPullquoteSpreadProps extends React.HTMLAttributes<HTMLDivElement> {
  quote?: string;
  children?: React.ReactNode;
}

export function EditorialPullquoteSpread({
  quote = "“Interfaces should have a fingerprint; code without character is merely arithmetic.”",
  children,
  className,
  ...props
}: EditorialPullquoteSpreadProps) {
  return (
    <article className={cn("max-w-4xl mx-auto p-8 font-serif text-ink space-y-8", className)} {...props}>
      <blockquote className="text-2xl lg:text-3xl font-bold leading-tight text-accent border-y-2 border-accent py-6 my-8 text-center">
        {quote}
      </blockquote>
      <div className="columns-1 md:columns-2 gap-8 text-sm leading-relaxed text-ink/80 space-y-4">
        {children}
      </div>
    </article>
  );
}
`,
    demo: `"use client";

import { EditorialPullquoteSpread } from "./editorial-pullquote-spread";

export default function EditorialPullquoteSpreadDemo() {
  return (
    <EditorialPullquoteSpread>
      <p>True craftsmanship in digital systems is the disciplined harmony between rigorous schema invariants and expressive design autonomy.</p>
      <p>When every component is verified against closed types and unique fingerprints, scale ceases to be a liability.</p>
    </EditorialPullquoteSpread>
  );
}
`,
  }),

  P("media-gallery-lightbox", {
    category: "layouts",
    subcategory: "grids",
    title: "Media Gallery Lightbox",
    description: "Image thumbnail grid with prominent central focal preview card.",
    tags: ["gallery", "lightbox", "thumbnails", "media", "preview"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "luxury",
      macrostructure: "mosaic",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "gallery-thumbnail-inspection",
      visualModel: "lightbox-preview-stage",
      motionModel: "none",
      layoutModel: "grid-with-feature-viewport",
      semanticPurpose: "media-showcase-gallery",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface MediaGalleryLightboxProps extends React.HTMLAttributes<HTMLDivElement> {
  feature?: React.ReactNode;
  children?: React.ReactNode;
}

export function MediaGalleryLightbox({ feature, children, className, ...props }: MediaGalleryLightboxProps) {
  return (
    <div className={cn("max-w-4xl mx-auto p-4 space-y-4 font-sans", className)} {...props}>
      <div className="h-64 rounded-2xl border border-line bg-surface/40 flex items-center justify-center font-mono text-xs">{feature}</div>
      <div className="grid grid-cols-4 gap-3">{children}</div>
    </div>
  );
}
`,
    demo: `"use client";

import { MediaGalleryLightbox } from "./media-gallery-lightbox";

export default function MediaGalleryLightboxDemo() {
  return (
    <MediaGalleryLightbox feature={<span>Featured Image Viewport</span>}>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-16 rounded-lg border border-line bg-surface/30 flex items-center justify-center text-xs font-mono">
          #{i}
        </div>
      ))}
    </MediaGalleryLightbox>
  );
}
`,
  }),

  P("interactive-map-split", {
    category: "layouts",
    subcategory: "splits",
    title: "Interactive Map Split",
    description: "Dual-pane directory layout with sticky map visualizer on right and scrollable facility cards on left.",
    tags: ["map", "location", "directory", "split", "cards"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "split",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "location-card-map-sync",
      visualModel: "sticky-map-with-card-stream",
      motionModel: "none",
      layoutModel: "side-by-side-map-split",
      semanticPurpose: "location-directory-map",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface InteractiveMapSplitProps extends React.HTMLAttributes<HTMLDivElement> {
  map?: React.ReactNode;
  children?: React.ReactNode;
}

export function InteractiveMapSplit({ map, children, className, ...props }: InteractiveMapSplitProps) {
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-12 min-h-[360px] w-full border border-line rounded-2xl overflow-hidden font-sans", className)} {...props}>
      <div className="lg:col-span-5 p-4 overflow-y-auto space-y-3 bg-paper">{children}</div>
      <div className="lg:col-span-7 bg-surface/40 p-6 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-line">{map}</div>
    </div>
  );
}
`,
    demo: `"use client";

import { InteractiveMapSplit } from "./interactive-map-split";

export default function InteractiveMapSplitDemo() {
  return (
    <InteractiveMapSplit map={<div className="font-mono text-xs text-ink/60">Cartographic Geographic Map Viewport</div>}>
      <div className="p-3 rounded-xl border border-line bg-surface/30 text-xs">
        <div className="font-bold">US-East Datacenter</div>
        <div className="text-ink/60 mt-0.5">Virginia, USA • 14 Nodes</div>
      </div>
      <div className="p-3 rounded-xl border border-line bg-surface/30 text-xs">
        <div className="font-bold">EU-Central Datacenter</div>
        <div className="text-ink/60 mt-0.5">Frankfurt, Germany • 28 Nodes</div>
      </div>
    </InteractiveMapSplit>
  );
}
`,
  }),

  P("two-tier-footer-matrix", {
    category: "layouts",
    subcategory: "shells",
    title: "Two Tier Footer Matrix",
    description: "Enterprise site footer with comprehensive multi-column link directory and bottom copyright/status bar.",
    tags: ["footer", "sitemap", "links", "matrix", "shell"],
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
      interactionModel: "sitemap-link-navigation",
      visualModel: "two-tier-link-matrix-footer",
      motionModel: "none",
      layoutModel: "columnar-footer-matrix",
      semanticPurpose: "global-sitemap-footer",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface TwoTierFooterMatrixProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: React.ReactNode;
  legal?: React.ReactNode;
}

export function TwoTierFooterMatrix({ columns, legal, className, ...props }: TwoTierFooterMatrixProps) {
  return (
    <footer className={cn("w-full border-t border-line bg-paper text-ink font-sans", className)} {...props}>
      <div className="max-w-5xl mx-auto p-8 border-b border-line/60 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs">{columns}</div>
      <div className="max-w-5xl mx-auto px-8 py-4 flex flex-col sm:flex-row justify-between text-[11px] text-ink/60 font-mono">{legal}</div>
    </footer>
  );
}
`,
    demo: `"use client";

import { TwoTierFooterMatrix } from "./two-tier-footer-matrix";

export default function TwoTierFooterMatrixDemo() {
  return (
    <TwoTierFooterMatrix
      columns={
        <>
          <div><span className="font-bold">Ecosystem</span><div className="mt-2 space-y-1 text-ink/60"><div>Components</div><div>Motion</div></div></div>
          <div><span className="font-bold">Resources</span><div className="mt-2 space-y-1 text-ink/60"><div>Documentation</div><div>Fingerprints</div></div></div>
          <div><span className="font-bold">Community</span><div className="mt-2 space-y-1 text-ink/60"><div>GitHub</div><div>Discussions</div></div></div>
          <div><span className="font-bold">Status</span><div className="mt-2 text-emerald-600 font-mono">100% Operational</div></div>
        </>
      }
      legal={
        <>
          <span>© 2026 OpenUI Project. All rights reserved.</span>
          <span>MIT License • Verified Registry</span>
        </>
      }
    />
  );
}
`,
  }),

  P("split-pricing-calculator", {
    category: "layouts",
    subcategory: "splits",
    title: "Split Pricing Calculator",
    description: "Interactive billing estimator: range slider inputs on left with dynamic calculated total breakdown on right.",
    tags: ["pricing", "calculator", "slider", "estimator", "split"],
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
      interactionModel: "interactive-cost-estimation",
      visualModel: "slider-and-cost-receipt",
      motionModel: "none",
      layoutModel: "side-by-side-calculator",
      semanticPurpose: "pricing-estimation-workbench",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface SplitPricingCalculatorProps extends React.HTMLAttributes<HTMLDivElement> {
  controls?: React.ReactNode;
  receipt?: React.ReactNode;
}

export function SplitPricingCalculator({ controls, receipt, className, ...props }: SplitPricingCalculatorProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto p-6 rounded-2xl border border-line bg-paper font-sans shadow-sm", className)} {...props}>
      <div className="space-y-4">{controls}</div>
      <div className="p-6 rounded-xl border border-line bg-surface/30 font-mono text-xs space-y-3">{receipt}</div>
    </div>
  );
}
`,
    demo: `"use client";

import { SplitPricingCalculator } from "./split-pricing-calculator";

export default function SplitPricingCalculatorDemo() {
  return (
    <SplitPricingCalculator
      controls={
        <div>
          <h3 className="text-sm font-bold text-ink">Estimate Cloud Compute</h3>
          <p className="text-xs text-ink/60 mt-1">Adjust server instances and storage quotas.</p>
        </div>
      }
      receipt={
        <div>
          <div className="text-ink/60">Estimated Monthly Total</div>
          <div className="text-2xl font-bold text-accent mt-1">$142.50</div>
        </div>
      }
    />
  );
}
`,
  }),
];

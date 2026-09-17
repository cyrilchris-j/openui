import type { ResourceDefinition } from "../lib/definitions.js";

const P = (name: string, definition: Omit<ResourceDefinition, "name">): ResourceDefinition => ({
  name,
  ...definition,
});

export default [
  P("holy-grail-layout", {
    category: "layouts",
    subcategory: "shells",
    title: "Holy Grail Layout",
    description: "Classic five-region web shell with header, persistent navigation sidebar, main content, contextual aside, and footer.",
    tags: ["layout", "holygrail", "shell", "sidebar", "grid"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "swiss",
      macrostructure: "split",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "responsive-five-box-shell",
      visualModel: "holy-grail-wireframe",
      motionModel: "none",
      layoutModel: "five-region-grid",
      semanticPurpose: "application-root-shell",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface HolyGrailLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  nav?: React.ReactNode;
  main?: React.ReactNode;
  aside?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

export function HolyGrailLayout({
  header,
  nav,
  main,
  aside,
  footer,
  children,
  className,
  ...props
}: HolyGrailLayoutProps) {
  return (
    <div className={cn("min-h-screen flex flex-col bg-paper text-ink font-sans", className)} {...props}>
      {header && <header className="border-b border-line p-4 shrink-0 bg-surface/50">{header}</header>}
      <div className="flex-1 flex flex-col md:flex-row">
        {nav && <nav className="w-full md:w-56 border-b md:border-b-0 md:border-r border-line p-4 shrink-0 bg-surface/20">{nav}</nav>}
        <main className="flex-1 p-6 min-w-0">{main || children}</main>
        {aside && <aside className="w-full md:w-64 border-t md:border-t-0 md:border-l border-line p-4 shrink-0 bg-surface/20">{aside}</aside>}
      </div>
      {footer && <footer className="border-t border-line p-4 shrink-0 bg-surface/50 text-xs text-ink/60">{footer}</footer>}
    </div>
  );
}
`,
    demo: `"use client";

import { HolyGrailLayout } from "./holy-grail-layout";

export default function HolyGrailLayoutDemo() {
  return (
    <div className="w-full border border-line rounded-xl overflow-hidden shadow-sm">
      <HolyGrailLayout
        header={<div className="font-mono text-xs font-bold">Header System Bar</div>}
        nav={<div className="font-mono text-xs text-ink/70">Navigation Drawer</div>}
        main={
          <div>
            <h2 className="text-sm font-bold text-ink mb-1">Primary Article Viewport</h2>
            <p className="text-xs text-ink/60">Fluid responsive central layout column.</p>
          </div>
        }
        aside={<div className="font-mono text-xs text-ink/70">Context Aside</div>}
        footer={<div className="font-mono text-xs">Footer Navigation & Copyright</div>}
      />
    </div>
  );
}
`,
  }),

  P("dashboard-shell-layout", {
    category: "layouts",
    subcategory: "shells",
    title: "Dashboard Shell Layout",
    description: "Modern web application dashboard framework with collapsible sidebar, top command bar, and fluid widget grid.",
    tags: ["dashboard", "admin", "shell", "sidebar", "workspace"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "rail",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "collapsible-sidebar-workspace",
      visualModel: "dashboard-app-shell",
      motionModel: "none",
      layoutModel: "sidebar-and-canvas-stack",
      semanticPurpose: "dashboard-application-shell",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface DashboardShellLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  sidebar?: React.ReactNode;
  topbar?: React.ReactNode;
  children?: React.ReactNode;
}

export function DashboardShellLayout({
  sidebar,
  topbar,
  children,
  className,
  ...props
}: DashboardShellLayoutProps) {
  return (
    <div className={cn("min-h-[400px] flex bg-paper text-ink font-sans w-full", className)} {...props}>
      {sidebar && <aside className="w-60 border-r border-line p-4 shrink-0 bg-surface/30 hidden sm:block">{sidebar}</aside>}
      <div className="flex-1 flex flex-col min-w-0">
        {topbar && <header className="h-14 border-b border-line px-4 flex items-center shrink-0 bg-surface/20">{topbar}</header>}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { DashboardShellLayout } from "./dashboard-shell-layout";

export default function DashboardShellLayoutDemo() {
  return (
    <div className="w-full border border-line rounded-xl overflow-hidden shadow-sm">
      <DashboardShellLayout
        sidebar={
          <div className="space-y-3 font-mono text-xs">
            <div className="font-bold text-accent">OPENUI ADMIN</div>
            <div className="text-ink/60">Overview</div>
            <div className="text-ink/60">Telemetry</div>
            <div className="text-ink/60">Registry Items</div>
          </div>
        }
        topbar={<div className="font-mono text-xs text-ink/70">Search commands or endpoints... (⌘K)</div>}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border border-line bg-surface/40">
            <div className="text-xs font-mono text-ink/60">API Latency</div>
            <div className="text-xl font-bold font-mono text-ink mt-1">24ms</div>
          </div>
          <div className="p-4 rounded-lg border border-line bg-surface/40">
            <div className="text-xs font-mono text-ink/60">Active Agents</div>
            <div className="text-xl font-bold font-mono text-ink mt-1">1,248</div>
          </div>
        </div>
      </DashboardShellLayout>
    </div>
  );
}
`,
  }),

  P("editorial-magazine-grid", {
    category: "layouts",
    subcategory: "grids",
    title: "Editorial Magazine Grid",
    description: "Swiss editorial typography grid with hero lede column, multi-column prose flow, and pull-quote sidebars.",
    tags: ["editorial", "magazine", "swiss", "prose", "typography"],
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
      interactionModel: "passive-magazine-columns",
      visualModel: "asymmetric-editorial-columns",
      motionModel: "none",
      layoutModel: "asymmetric-grid-flow",
      semanticPurpose: "longform-editorial-reading",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface EditorialMagazineGridProps extends React.HTMLAttributes<HTMLDivElement> {
  headline?: React.ReactNode;
  lede?: React.ReactNode;
  story?: React.ReactNode;
  aside?: React.ReactNode;
}

export function EditorialMagazineGrid({
  headline,
  lede,
  story,
  aside,
  className,
  ...props
}: EditorialMagazineGridProps) {
  return (
    <article className={cn("max-w-5xl mx-auto p-6 bg-paper text-ink font-sans", className)} {...props}>
      {headline && <div className="border-b-2 border-ink pb-6 mb-8 font-serif">{headline}</div>}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {lede && <div className="lg:col-span-4 text-base font-serif leading-relaxed text-ink/80 border-l-2 border-accent pl-4">{lede}</div>}
        {story && <div className="lg:col-span-5 text-sm leading-relaxed text-ink/90 font-serif space-y-4">{story}</div>}
        {aside && <aside className="lg:col-span-3 text-xs font-mono text-ink/60 border-t lg:border-t-0 lg:border-l border-line pt-4 lg:pt-0 lg:pl-6">{aside}</aside>}
      </div>
    </article>
  );
}
`,
    demo: `"use client";

import { EditorialMagazineGrid } from "./editorial-magazine-grid";

export default function EditorialMagazineGridDemo() {
  return (
    <div className="w-full border border-line rounded-xl overflow-hidden shadow-sm">
      <EditorialMagazineGrid
        headline={<h1 className="text-2xl font-bold tracking-tight">The Geometry of Autonomous Design Systems</h1>}
        lede={<p>Standardization enables velocity, but rigid homogenization drains character. Here is the framework for procedural divergence.</p>}
        story={
          <p>Every interface should have a fingerprint. When components are authored as pure algebraic compositions rather than ad-hoc templates, consistency arises organically without sacrificing visual delight.</p>
        }
        aside={<div>PUBLISHED IN VOL. 04<br />CURATED BY OPENUI REGISTRY</div>}
      />
    </div>
  );
}
`,
  }),

  P("bento-modular-grid", {
    category: "layouts",
    subcategory: "grids",
    title: "Bento Modular Grid",
    description: "Bento box modular 12-column dashboard layout with dynamic cell spans and harmonic cell paddings.",
    tags: ["bento", "grid", "modular", "cards", "dashboard"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "mosaic",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "bento-modular-tiling",
      visualModel: "asymmetric-tile-mosaic",
      motionModel: "none",
      layoutModel: "twelve-column-mosaic",
      semanticPurpose: "feature-showcase-mosaic",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface BentoModularGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function BentoModularGrid({ children, className, ...props }: BentoModularGridProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto p-4 font-sans", className)} {...props}>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { BentoModularGrid } from "./bento-modular-grid";

export default function BentoModularGridDemo() {
  return (
    <BentoModularGrid>
      <div className="md:col-span-2 p-6 rounded-2xl border border-line bg-surface/30">
        <h3 className="text-sm font-bold text-ink">Primary Metric Hub</h3>
        <p className="text-xs text-ink/60 mt-1">Wide spanning bento card for complex visualizations.</p>
      </div>
      <div className="p-6 rounded-2xl border border-line bg-surface/30">
        <h3 className="text-sm font-bold text-ink">Status Beacon</h3>
        <p className="text-xs text-ink/60 mt-1">Single column status card.</p>
      </div>
      <div className="p-6 rounded-2xl border border-line bg-surface/30">
        <h3 className="text-sm font-bold text-ink">Action Panel</h3>
        <p className="text-xs text-ink/60 mt-1">Secondary interaction card.</p>
      </div>
      <div className="md:col-span-2 p-6 rounded-2xl border border-line bg-surface/30">
        <h3 className="text-sm font-bold text-ink">Telemetry Stream</h3>
        <p className="text-xs text-ink/60 mt-1">Double column bottom card.</p>
      </div>
    </BentoModularGrid>
  );
}
`,
  }),

  P("documentation-triptych", {
    category: "layouts",
    subcategory: "shells",
    title: "Documentation Triptych",
    description: "Three-pane technical documentation layout: directory tree sidebar, main article, and table of contents rail.",
    tags: ["docs", "documentation", "triptych", "toc", "sidebar"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "rail",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "three-pane-doc-navigation",
      visualModel: "triptych-doc-wireframe",
      motionModel: "none",
      layoutModel: "three-column-split",
      semanticPurpose: "documentation-site-shell",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface DocumentationTriptychProps extends React.HTMLAttributes<HTMLDivElement> {
  sidebar?: React.ReactNode;
  content?: React.ReactNode;
  toc?: React.ReactNode;
  children?: React.ReactNode;
}

export function DocumentationTriptych({
  sidebar,
  content,
  toc,
  children,
  className,
  ...props
}: DocumentationTriptychProps) {
  return (
    <div className={cn("min-h-[400px] flex w-full bg-paper text-ink font-sans", className)} {...props}>
      {sidebar && <nav className="w-56 border-r border-line p-4 shrink-0 hidden md:block">{sidebar}</nav>}
      <article className="flex-1 p-8 max-w-3xl min-w-0">{content || children}</article>
      {toc && <aside className="w-56 border-l border-line p-4 shrink-0 hidden lg:block text-xs font-mono">{toc}</aside>}
    </div>
  );
}
`,
    demo: `"use client";

import { DocumentationTriptych } from "./documentation-triptych";

export default function DocumentationTriptychDemo() {
  return (
    <div className="w-full border border-line rounded-xl overflow-hidden shadow-sm">
      <DocumentationTriptych
        sidebar={
          <div className="space-y-2 text-xs font-mono text-ink/70">
            <div className="font-bold text-ink">Getting Started</div>
            <div>Installation</div>
            <div>Architecture</div>
            <div>Registry API</div>
          </div>
        }
        content={
          <div>
            <h1 className="text-xl font-bold text-ink mb-2">Registry Architecture</h1>
            <p className="text-xs text-ink/70 leading-relaxed">
              OpenUI registers self-contained resources with distinct behavioral fingerprints, strict TypeScript definitions, and reproducible demos.
            </p>
          </div>
        }
        toc={
          <div className="space-y-1 text-ink/60">
            <div className="font-semibold text-ink uppercase mb-2">On This Page</div>
            <div className="text-accent">Overview</div>
            <div>Fingerprinting</div>
            <div>Validation</div>
          </div>
        }
      />
    </div>
  );
}
`,
  }),

  P("masonry-column-flow", {
    category: "layouts",
    subcategory: "grids",
    title: "Masonry Column Flow",
    description: "Pinterest-style cascading multi-column masonry pin-board layout with variable height item cards.",
    tags: ["masonry", "pinboard", "columns", "cards", "flow"],
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
      interactionModel: "cascading-pinboard-scroll",
      visualModel: "variable-height-masonry",
      motionModel: "none",
      layoutModel: "css-columns-waterfall",
      semanticPurpose: "masonry-pinboard-gallery",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface MasonryColumnFlowProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function MasonryColumnFlow({ children, className, ...props }: MasonryColumnFlowProps) {
  return (
    <div className={cn("columns-1 sm:columns-2 lg:columns-3 gap-4 p-4 max-w-5xl mx-auto space-y-4", className)} {...props}>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { MasonryColumnFlow } from "./masonry-column-flow";

export default function MasonryColumnFlowDemo() {
  const heights = ["h-32", "h-48", "h-40", "h-56", "h-36", "h-44"];
  return (
    <MasonryColumnFlow>
      {heights.map((h, i) => (
        <div
          key={i}
          className={cn("p-4 rounded-xl border border-line bg-surface/30 break-inside-avoid flex flex-col justify-between", h)}
        >
          <span className="font-mono text-xs font-bold text-ink">Tile #{i + 1}</span>
          <span className="text-[11px] text-ink/60 font-sans">Variable height masonry card container.</span>
        </div>
      ))}
    </MasonryColumnFlow>
  );
}
`,
  }),

  P("split-screen-billboard", {
    category: "layouts",
    subcategory: "splits",
    title: "Split Screen Billboard",
    description: "Full-viewport 50/50 split layout with sticky visual showcase on left and scrollable narrative on right.",
    tags: ["split", "billboard", "sticky", "showcase", "viewport"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "split",
      density: "airy",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "sticky-billboard-split",
      visualModel: "half-screen-sticky-stage",
      motionModel: "none",
      layoutModel: "dual-viewport-halves",
      semanticPurpose: "product-showcase-split",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface SplitScreenBillboardProps extends React.HTMLAttributes<HTMLDivElement> {
  visual?: React.ReactNode;
  narrative?: React.ReactNode;
  children?: React.ReactNode;
}

export function SplitScreenBillboard({
  visual,
  narrative,
  children,
  className,
  ...props
}: SplitScreenBillboardProps) {
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-2 min-h-[400px] w-full bg-paper text-ink font-sans", className)} {...props}>
      <div className="lg:sticky lg:top-0 h-72 lg:h-auto border-b lg:border-b-0 lg:border-r border-line p-8 flex items-center justify-center bg-surface/30">
        {visual}
      </div>
      <div className="p-8 space-y-6 overflow-y-auto">
        {narrative || children}
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { SplitScreenBillboard } from "./split-screen-billboard";

export default function SplitScreenBillboardDemo() {
  return (
    <div className="w-full border border-line rounded-xl overflow-hidden shadow-sm">
      <SplitScreenBillboard
        visual={<div className="font-mono text-sm font-bold text-accent">Interactive Visual Canvas</div>}
        narrative={
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-ink">Product Specification</h2>
            <p className="text-xs text-ink/70 leading-relaxed">
              The left half remains pinned in the viewport while the reader traverses sequential specification milestones.
            </p>
            <div className="p-4 rounded-lg bg-surface border border-line text-xs font-mono">
              Milestone 1: Zero runtime dependencies
            </div>
            <div className="p-4 rounded-lg bg-surface border border-line text-xs font-mono">
              Milestone 2: Sub-millisecond hydration
            </div>
          </div>
        }
      />
    </div>
  );
}
`,
  }),

  P("sticky-sidebar-flow", {
    category: "layouts",
    subcategory: "splits",
    title: "Sticky Sidebar Flow",
    description: "Main content column flanked by a sticky utility sidebar that remains anchored while scrolling.",
    tags: ["sticky", "sidebar", "layout", "flow", "scroll"],
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
      interactionModel: "pinned-sidebar-scroll",
      visualModel: "sticky-rail-split",
      motionModel: "none",
      layoutModel: "asymmetric-two-column",
      semanticPurpose: "article-with-sticky-tools",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface StickySidebarFlowProps extends React.HTMLAttributes<HTMLDivElement> {
  sidebar?: React.ReactNode;
  children?: React.ReactNode;
}

export function StickySidebarFlow({ sidebar, children, className, ...props }: StickySidebarFlowProps) {
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto p-6 font-sans items-start", className)} {...props}>
      <div className="lg:col-span-8 min-w-0">{children}</div>
      {sidebar && <aside className="lg:col-span-4 lg:sticky lg:top-6 space-y-4">{sidebar}</aside>}
    </div>
  );
}
`,
    demo: `"use client";

import { StickySidebarFlow } from "./sticky-sidebar-flow";

export default function StickySidebarFlowDemo() {
  return (
    <StickySidebarFlow
      sidebar={
        <div className="p-4 rounded-xl border border-line bg-surface/40 font-mono text-xs">
          <div className="font-bold mb-2">Quick Actions</div>
          <button type="button" className="w-full py-1.5 px-3 rounded bg-accent text-white font-semibold text-xs">
            Export Bundle
          </button>
        </div>
      }
    >
      <div className="space-y-3">
        <h2 className="text-base font-bold text-ink">Longform Document Flow</h2>
        <p className="text-xs text-ink/70 leading-relaxed">
          The main column flows naturally while the companion aside is held statically in view by native CSS sticky positioning.
        </p>
      </div>
    </StickySidebarFlow>
  );
}
`,
  }),

  P("centered-reading-prose", {
    category: "layouts",
    subcategory: "reading",
    title: "Centered Reading Prose",
    description: "Narrow-measure centered typography layout optimized for distraction-free longform reading.",
    tags: ["prose", "reading", "centered", "typography", "editorial"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "editorial",
      macrostructure: "stack",
      density: "airy",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "serif-display",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "passive-focused-reading",
      visualModel: "narrow-measure-prose-strip",
      motionModel: "none",
      layoutModel: "centered-single-column",
      semanticPurpose: "distraction-free-reading",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface CenteredReadingProseProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function CenteredReadingProse({ children, className, ...props }: CenteredReadingProseProps) {
  return (
    <div className={cn("max-w-2xl mx-auto px-6 py-12 font-serif text-ink text-base leading-relaxed space-y-6", className)} {...props}>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { CenteredReadingProse } from "./centered-reading-prose";

export default function CenteredReadingProseDemo() {
  return (
    <CenteredReadingProse>
      <h1 className="text-2xl font-bold tracking-tight text-ink font-serif">On the Architecture of Clean Web APIs</h1>
      <p className="text-ink/80 text-sm">
        Simplicity is not the lack of clutter, that’s a consequence of simplicity. Simplicity somehow essentially describes the purpose and place of an object and product.
      </p>
      <p className="text-ink/80 text-sm">
        When an API is crafted with distinct boundary contracts, maintaining and evolving systems over time becomes an act of deliberate refinement.
      </p>
    </CenteredReadingProse>
  );
}
`,
  }),

  P("two-tier-header-shell", {
    category: "layouts",
    subcategory: "shells",
    title: "Two Tier Header Shell",
    description: "Double-decker top header with global utility brand bar above and contextual navigation tabs below.",
    tags: ["header", "twotier", "shell", "tabs", "navigation"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "double-decker-navigation",
      visualModel: "stacked-topbar-header",
      motionModel: "none",
      layoutModel: "top-tier-header-stack",
      semanticPurpose: "multi-tier-app-header",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface TwoTierHeaderShellProps extends React.HTMLAttributes<HTMLDivElement> {
  brand?: React.ReactNode;
  utilities?: React.ReactNode;
  tabs?: React.ReactNode;
  children?: React.ReactNode;
}

export function TwoTierHeaderShell({
  brand,
  utilities,
  tabs,
  children,
  className,
  ...props
}: TwoTierHeaderShellProps) {
  return (
    <div className={cn("min-h-[360px] flex flex-col w-full bg-paper text-ink font-sans", className)} {...props}>
      <header className="border-b border-line shrink-0 bg-surface/30">
        <div className="flex items-center justify-between px-6 py-3 border-b border-line/60">
          <div className="font-bold text-sm">{brand}</div>
          <div className="flex items-center gap-2">{utilities}</div>
        </div>
        <div className="px-6 py-2 flex items-center gap-4 text-xs font-mono">{tabs}</div>
      </header>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
`,
    demo: `"use client";

import { TwoTierHeaderShell } from "./two-tier-header-shell";

export default function TwoTierHeaderShellDemo() {
  return (
    <div className="w-full border border-line rounded-xl overflow-hidden shadow-sm">
      <TwoTierHeaderShell
        brand={<span>OPENUI CONSOLE</span>}
        utilities={<span className="text-xs font-mono text-ink/60">User: developer@openui.org</span>}
        tabs={
          <>
            <span className="text-accent font-semibold border-b-2 border-accent pb-1">Deployments</span>
            <span className="text-ink/60">Analytics</span>
            <span className="text-ink/60">Settings</span>
          </>
        }
      >
        <div className="p-4 rounded-lg bg-surface/30 border border-line text-xs font-mono">
          Tier 2 sub-navigation active viewport.
        </div>
      </TwoTierHeaderShell>
    </div>
  );
}
`,
  }),

  P("rail-dock-workspace", {
    category: "layouts",
    subcategory: "shells",
    title: "Rail Dock Workspace",
    description: "Slim icon navigation rail, secondary tool drawer, and central canvas workspace (IDE shell).",
    tags: ["rail", "dock", "ide", "workspace", "shell"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "rail",
      density: "compact",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "icon-rail-and-drawer-workspace",
      visualModel: "ide-three-tier-shell",
      motionModel: "none",
      layoutModel: "side-rail-and-stage",
      semanticPurpose: "ide-workspace-layout",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface RailDockWorkspaceProps extends React.HTMLAttributes<HTMLDivElement> {
  rail?: React.ReactNode;
  drawer?: React.ReactNode;
  children?: React.ReactNode;
}

export function RailDockWorkspace({ rail, drawer, children, className, ...props }: RailDockWorkspaceProps) {
  return (
    <div className={cn("min-h-[380px] flex w-full bg-paper text-ink font-sans", className)} {...props}>
      {rail && <div className="w-12 border-r border-line flex flex-col items-center py-3 gap-3 shrink-0 bg-surface/40">{rail}</div>}
      {drawer && <div className="w-52 border-r border-line p-3 shrink-0 bg-surface/20 hidden sm:block">{drawer}</div>}
      <main className="flex-1 p-6 min-w-0">{children}</main>
    </div>
  );
}
`,
    demo: `"use client";

import { RailDockWorkspace } from "./rail-dock-workspace";

export default function RailDockWorkspaceDemo() {
  return (
    <div className="w-full border border-line rounded-xl overflow-hidden shadow-sm">
      <RailDockWorkspace
        rail={
          <div className="space-y-3 font-mono text-xs text-ink/70">
            <div>📁</div>
            <div>🔍</div>
            <div>⚡</div>
          </div>
        }
        drawer={<div className="font-mono text-xs text-ink/70">Files & Modules</div>}
      >
        <div className="font-mono text-xs text-ink/60">Primary Editor Stage</div>
      </RailDockWorkspace>
    </div>
  );
}
`,
  }),

  P("fullscreen-canvas-overlay", {
    category: "layouts",
    subcategory: "shells",
    title: "Fullscreen Canvas Overlay",
    description: "Full-viewport interactive graphic canvas with floating HUD panels pinned to four corners.",
    tags: ["hud", "canvas", "fullscreen", "overlay", "viewport"],
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
      interactionModel: "corner-hud-over-canvas",
      visualModel: "four-corner-hud-stage",
      motionModel: "none",
      layoutModel: "absolute-pinned-corners",
      semanticPurpose: "canvas-hud-workspace",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface FullscreenCanvasOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  topLeft?: React.ReactNode;
  topRight?: React.ReactNode;
  bottomLeft?: React.ReactNode;
  bottomRight?: React.ReactNode;
  children?: React.ReactNode;
}

export function FullscreenCanvasOverlay({
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  children,
  className,
  ...props
}: FullscreenCanvasOverlayProps) {
  return (
    <div className={cn("relative w-full h-80 bg-paper text-ink overflow-hidden border border-line rounded-xl", className)} {...props}>
      <div className="absolute inset-0 flex items-center justify-center -z-10">{children}</div>
      {topLeft && <div className="absolute top-3 left-3 z-10">{topLeft}</div>}
      {topRight && <div className="absolute top-3 right-3 z-10">{topRight}</div>}
      {bottomLeft && <div className="absolute bottom-3 left-3 z-10">{bottomLeft}</div>}
      {bottomRight && <div className="absolute bottom-3 right-3 z-10">{bottomRight}</div>}
    </div>
  );
}
`,
    demo: `"use client";

import { FullscreenCanvasOverlay } from "./fullscreen-canvas-overlay";

export default function FullscreenCanvasOverlayDemo() {
  return (
    <FullscreenCanvasOverlay
      topLeft={<div className="px-2.5 py-1 rounded bg-paper/90 border border-line font-mono text-[10px]">FPS: 60.0</div>}
      topRight={<div className="px-2.5 py-1 rounded bg-paper/90 border border-line font-mono text-[10px]">Zoom: 100%</div>}
      bottomLeft={<div className="px-2.5 py-1 rounded bg-paper/90 border border-line font-mono text-[10px]">Coordinates: (0, 0)</div>}
      bottomRight={<div className="px-2.5 py-1 rounded bg-paper/90 border border-line font-mono text-[10px]">Layers: 4</div>}
    >
      <div className="font-mono text-xs text-ink/40">3D WebGL / Canvas Stage</div>
    </FullscreenCanvasOverlay>
  );
}
`,
  }),

  P("horizontal-strip-reel", {
    category: "layouts",
    subcategory: "grids",
    title: "Horizontal Strip Reel",
    description: "Horizontal snap-scrolling card strip with peek margins and smooth momentum scrolling.",
    tags: ["reel", "carousel", "horizontal", "snap", "cards"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "rail",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "horizontal-momentum-scroll",
      visualModel: "snap-card-strip-reel",
      motionModel: "none",
      layoutModel: "horizontal-card-strip",
      semanticPurpose: "horizontal-media-gallery",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface HorizontalStripReelProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function HorizontalStripReel({ children, className, ...props }: HorizontalStripReelProps) {
  return (
    <div className={cn("flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory px-4 scrollbar-none", className)} {...props}>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { HorizontalStripReel } from "./horizontal-strip-reel";

export default function HorizontalStripReelDemo() {
  return (
    <HorizontalStripReel>
      {[1, 2, 3, 4, 5].map((item) => (
        <div
          key={item}
          className="w-64 shrink-0 snap-start p-6 rounded-2xl border border-line bg-surface/40 flex flex-col justify-between h-40"
        >
          <div className="font-mono text-xs font-bold text-ink">Slide {item}</div>
          <p className="text-xs text-ink/60 font-sans">Smooth momentum horizontal card container.</p>
        </div>
      ))}
    </HorizontalStripReel>
  );
}
`,
  }),

  P("master-detail-split", {
    category: "layouts",
    subcategory: "splits",
    title: "Master Detail Split",
    description: "Side-by-side master/detail split with entity list on left and selected record preview on right.",
    tags: ["master-detail", "split", "records", "list", "preview"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "split",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "master-detail-list-inspection",
      visualModel: "dual-pane-record-preview",
      motionModel: "none",
      layoutModel: "two-column-split",
      semanticPurpose: "record-detail-workbench",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface MasterDetailSplitProps extends React.HTMLAttributes<HTMLDivElement> {
  master?: React.ReactNode;
  detail?: React.ReactNode;
}

export function MasterDetailSplit({ master, detail, className, ...props }: MasterDetailSplitProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-12 min-h-[360px] w-full border border-line rounded-xl overflow-hidden font-sans", className)} {...props}>
      <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-line p-3 bg-surface/20">{master}</div>
      <div className="md:col-span-8 p-6 bg-paper">{detail}</div>
    </div>
  );
}
`,
    demo: `"use client";

import { MasterDetailSplit } from "./master-detail-split";

export default function MasterDetailSplitDemo() {
  return (
    <MasterDetailSplit
      master={
        <div className="space-y-1 text-xs">
          <div className="p-2 rounded bg-accent/15 text-accent font-semibold">Incident #1042 — Auth Spike</div>
          <div className="p-2 rounded text-ink/70 hover:bg-surface">Incident #1041 — DB Replica Lag</div>
          <div className="p-2 rounded text-ink/70 hover:bg-surface">Incident #1040 — Edge Cache Miss</div>
        </div>
      }
      detail={
        <div>
          <h3 className="text-sm font-bold text-ink">Incident #1042: Authentication Anomaly</h3>
          <p className="text-xs text-ink/60 mt-1">Severity: High • Region: US-East-1 • Resolved</p>
        </div>
      }
    />
  );
}
`,
  }),

  P("stacked-card-deck", {
    category: "layouts",
    subcategory: "stacks",
    title: "Stacked Card Deck",
    description: "Vertical stacked card sequence where headers stick cleanly on top of one another during scroll.",
    tags: ["deck", "cards", "sticky", "stack", "scroll"],
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
      interactionModel: "stacking-sticky-card-scroll",
      visualModel: "overlapping-card-deck",
      motionModel: "none",
      layoutModel: "vertical-stacked-cards",
      semanticPurpose: "stacked-story-deck",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface StackedCardDeckProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function StackedCardDeck({ children, className, ...props }: StackedCardDeckProps) {
  return (
    <div className={cn("space-y-6 max-w-2xl mx-auto p-4 font-sans", className)} {...props}>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { StackedCardDeck } from "./stacked-card-deck";

export default function StackedCardDeckDemo() {
  return (
    <StackedCardDeck>
      {[1, 2, 3].map((card) => (
        <div key={card} className="p-6 rounded-2xl border border-line bg-paper shadow-sm">
          <div className="font-mono text-xs font-bold text-accent mb-1">Layer 0{card}</div>
          <h3 className="text-sm font-bold text-ink">Procedural Composition Card</h3>
          <p className="text-xs text-ink/60 mt-1">Self-contained card block with responsive bounds.</p>
        </div>
      ))}
    </StackedCardDeck>
  );
}
`,
  }),

  P("bottom-sheet-mobile-shell", {
    category: "layouts",
    subcategory: "shells",
    title: "Bottom Sheet Mobile Shell",
    description: "Mobile-optimized viewport shell with top navigation bar and sliding bottom sheet drawer.",
    tags: ["mobile", "bottom-sheet", "drawer", "shell", "phone"],
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
      interactionModel: "mobile-bottom-sheet-tray",
      visualModel: "handheld-viewport-shell",
      motionModel: "none",
      layoutModel: "mobile-frame-stack",
      semanticPurpose: "handheld-mobile-shell",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface BottomSheetMobileShellProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  sheet?: React.ReactNode;
  children?: React.ReactNode;
}

export function BottomSheetMobileShell({
  header,
  sheet,
  children,
  className,
  ...props
}: BottomSheetMobileShellProps) {
  return (
    <div className={cn("max-w-xs mx-auto h-[480px] border border-line rounded-3xl overflow-hidden flex flex-col relative bg-paper text-ink font-sans shadow-lg", className)} {...props}>
      {header && <div className="p-3 border-b border-line shrink-0 bg-surface/30 font-bold text-xs">{header}</div>}
      <div className="flex-1 p-4 overflow-y-auto">{children}</div>
      {sheet && (
        <div className="border-t border-line p-4 rounded-t-2xl bg-surface/90 backdrop-blur-md shadow-md shrink-0">
          <div className="w-8 h-1 bg-line rounded-full mx-auto mb-3" />
          {sheet}
        </div>
      )}
    </div>
  );
}
`,
    demo: `"use client";

import { BottomSheetMobileShell } from "./bottom-sheet-mobile-shell";

export default function BottomSheetMobileShellDemo() {
  return (
    <BottomSheetMobileShell
      header={<span>App Viewport</span>}
      sheet={
        <div className="space-y-1 text-xs">
          <div className="font-bold">Active Drawer</div>
          <div className="text-ink/60">Swipe down to dismiss tray</div>
        </div>
      }
    >
      <p className="text-xs text-ink/70">Main mobile viewport stream content.</p>
    </BottomSheetMobileShell>
  );
}
`,
  }),

  P("multi-column-kanban-board", {
    category: "layouts",
    subcategory: "grids",
    title: "Multi Column Kanban Board",
    description: "Horizontal scrolling kanban workspace with responsive column rails and card racks.",
    tags: ["kanban", "board", "columns", "workflow", "cards"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "rail",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "kanban-column-horizontal-flow",
      visualModel: "multi-column-workflow-board",
      motionModel: "none",
      layoutModel: "horizontal-column-rack",
      semanticPurpose: "project-kanban-stage",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface MultiColumnKanbanBoardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function MultiColumnKanbanBoard({ children, className, ...props }: MultiColumnKanbanBoardProps) {
  return (
    <div className={cn("flex gap-4 overflow-x-auto p-4 min-h-[380px] w-full font-sans bg-surface/20 rounded-xl border border-line", className)} {...props}>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { MultiColumnKanbanBoard } from "./multi-column-kanban-board";

export default function MultiColumnKanbanBoardDemo() {
  return (
    <MultiColumnKanbanBoard>
      {["Backlog", "In Review", "Done"].map((col) => (
        <div key={col} className="w-64 shrink-0 rounded-xl border border-line bg-paper p-3 flex flex-col gap-2">
          <div className="font-mono text-xs font-bold text-ink">{col}</div>
          <div className="p-2.5 rounded-lg border border-line bg-surface/40 text-xs">Sample Card A</div>
          <div className="p-2.5 rounded-lg border border-line bg-surface/40 text-xs">Sample Card B</div>
        </div>
      ))}
    </MultiColumnKanbanBoard>
  );
}
`,
  }),

  P("pan-and-zoom-stage", {
    category: "layouts",
    subcategory: "shells",
    title: "Pan and Zoom Stage",
    description: "Infinite 2D spatial canvas layout with corner mini-map locator viewport radar.",
    tags: ["canvas", "spatial", "pan", "zoom", "minimap"],
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
      interactionModel: "spatial-canvas-minimap",
      visualModel: "infinite-stage-with-locator",
      motionModel: "none",
      layoutModel: "canvas-with-anchored-radar",
      semanticPurpose: "spatial-node-canvas",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface PanAndZoomStageProps extends React.HTMLAttributes<HTMLDivElement> {
  minimap?: React.ReactNode;
  children?: React.ReactNode;
}

export function PanAndZoomStage({ minimap, children, className, ...props }: PanAndZoomStageProps) {
  return (
    <div className={cn("relative w-full h-80 bg-paper text-ink overflow-hidden border border-line rounded-xl", className)} {...props}>
      <div className="absolute inset-0 flex items-center justify-center -z-10">{children}</div>
      {minimap && <div className="absolute bottom-3 right-3 p-1.5 rounded-lg border border-line bg-paper/90 shadow-md">{minimap}</div>}
    </div>
  );
}
`,
    demo: `"use client";

import { PanAndZoomStage } from "./pan-and-zoom-stage";

export default function PanAndZoomStageDemo() {
  return (
    <PanAndZoomStage
      minimap={
        <div className="w-24 h-16 bg-surface/80 rounded border border-line/50 flex items-center justify-center font-mono text-[9px] text-ink/60">
          Mini-map
        </div>
      }
    >
      <div className="font-mono text-xs text-ink/50">Spatial Canvas Infinite Stage</div>
    </PanAndZoomStage>
  );
}
`,
  }),

  P("stepper-wizard-shell", {
    category: "layouts",
    subcategory: "shells",
    title: "Stepper Wizard Shell",
    description: "Structured multi-step form container with fixed top stepper rail and centered form card.",
    tags: ["stepper", "wizard", "forms", "shell", "steps"],
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
      interactionModel: "wizard-step-progression",
      visualModel: "stepper-rail-form-card",
      motionModel: "none",
      layoutModel: "centered-wizard-stack",
      semanticPurpose: "multi-step-form-shell",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface StepperWizardShellProps extends React.HTMLAttributes<HTMLDivElement> {
  stepper?: React.ReactNode;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

export function StepperWizardShell({ stepper, actions, children, className, ...props }: StepperWizardShellProps) {
  return (
    <div className={cn("max-w-md mx-auto p-6 rounded-2xl border border-line bg-paper text-ink font-sans shadow-sm", className)} {...props}>
      {stepper && <div className="mb-6">{stepper}</div>}
      <div className="mb-6">{children}</div>
      {actions && <div className="pt-4 border-t border-line flex items-center justify-between">{actions}</div>}
    </div>
  );
}
`,
    demo: `"use client";

import { StepperWizardShell } from "./stepper-wizard-shell";

export default function StepperWizardShellDemo() {
  return (
    <StepperWizardShell
      stepper={<div className="font-mono text-xs text-accent font-semibold">Step 2 of 4 — Organization Credentials</div>}
      actions={<button type="button" className="px-3 py-1.5 rounded bg-accent text-white font-mono text-xs">Continue</button>}
    >
      <div className="text-xs text-ink/70">Wizard form step fields and inputs.</div>
    </StepperWizardShell>
  );
}
`,
  }),

  P("split-preview-editor", {
    category: "layouts",
    subcategory: "splits",
    title: "Split Preview Editor",
    description: "Two-column side-by-side interactive playground with code editor on left and live preview on right.",
    tags: ["playground", "editor", "preview", "split", "code"],
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
      interactionModel: "split-code-and-preview",
      visualModel: "code-preview-dual-pane",
      motionModel: "none",
      layoutModel: "side-by-side-halves",
      semanticPurpose: "interactive-code-playground",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface SplitPreviewEditorProps extends React.HTMLAttributes<HTMLDivElement> {
  editor?: React.ReactNode;
  preview?: React.ReactNode;
}

export function SplitPreviewEditor({ editor, preview, className, ...props }: SplitPreviewEditorProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 min-h-[360px] w-full border border-line rounded-xl overflow-hidden font-sans", className)} {...props}>
      <div className="p-4 border-b md:border-b-0 md:border-r border-line bg-surface/40 font-mono text-xs">{editor}</div>
      <div className="p-4 bg-paper flex items-center justify-center">{preview}</div>
    </div>
  );
}
`,
    demo: `"use client";

import { SplitPreviewEditor } from "./split-preview-editor";

export default function SplitPreviewEditorDemo() {
  return (
    <SplitPreviewEditor
      editor={<div>const Button = () =&gt; &lt;button&gt;Click Me&lt;/button&gt;;</div>}
      preview={<button type="button" className="px-4 py-2 rounded bg-accent text-white font-sans text-xs">Click Me</button>}
    />
  );
}
`,
  }),

  P("isometric-shelf-grid", {
    category: "layouts",
    subcategory: "grids",
    title: "Isometric Shelf Grid",
    description: "Angled 3D isometric display shelf layout showcasing product cards or 3D assets.",
    tags: ["isometric", "shelf", "showcase", "cards", "3d"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "mosaic",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "isometric-shelf-presentation",
      visualModel: "angled-showcase-tier",
      motionModel: "none",
      layoutModel: "isometric-shelf-matrix",
      semanticPurpose: "isometric-product-display",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface IsometricShelfGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function IsometricShelfGrid({ children, className, ...props }: IsometricShelfGridProps) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto p-6 font-sans [perspective:600px]", className)} {...props}>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { IsometricShelfGrid } from "./isometric-shelf-grid";

export default function IsometricShelfGridDemo() {
  return (
    <IsometricShelfGrid>
      {[1, 2, 3].map((s) => (
        <div key={s} className="p-6 rounded-xl border border-line bg-surface/50 shadow-md [transform:rotateX(10deg)_rotateY(-5deg)]">
          <div className="font-mono text-xs font-bold text-accent">Artifact #{s}</div>
          <p className="text-xs text-ink/60 mt-1">Isometric showcase shelf display card.</p>
        </div>
      ))}
    </IsometricShelfGrid>
  );
}
`,
  }),

  P("golden-ratio-split", {
    category: "layouts",
    subcategory: "splits",
    title: "Golden Ratio Split",
    description: "Proportional layout based on the classic 1.618 golden ratio for natural visual balance.",
    tags: ["golden-ratio", "fibonacci", "split", "editorial", "balance"],
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
      interactionModel: "golden-ratio-balance",
      visualModel: "phi-proportional-split",
      motionModel: "none",
      layoutModel: "phi-two-column-split",
      semanticPurpose: "harmonic-golden-split",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface GoldenRatioSplitProps extends React.HTMLAttributes<HTMLDivElement> {
  major?: React.ReactNode;
  minor?: React.ReactNode;
}

export function GoldenRatioSplit({ major, minor, className, ...props }: GoldenRatioSplitProps) {
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-[1.618fr_1fr] gap-8 max-w-5xl mx-auto p-6 font-sans items-start", className)} {...props}>
      <div className="min-w-0">{major}</div>
      <div className="border-t lg:border-t-0 lg:border-l border-line pt-6 lg:pt-0 lg:pl-8">{minor}</div>
    </div>
  );
}
`,
    demo: `"use client";

import { GoldenRatioSplit } from "./golden-ratio-split";

export default function GoldenRatioSplitDemo() {
  return (
    <GoldenRatioSplit
      major={
        <div>
          <h2 className="text-xl font-bold font-serif text-ink mb-2">Major Sector (61.8%)</h2>
          <p className="text-xs text-ink/70 leading-relaxed">
            The primary quadrant anchors the dominant narrative flow, adhering mathematically to the divine proportion.
          </p>
        </div>
      }
      minor={
        <div>
          <h3 className="text-sm font-bold font-mono text-accent mb-2">Minor Sector (38.2%)</h3>
          <p className="text-xs text-ink/60">Complementary contextual aside harmonically aligned.</p>
        </div>
      }
    />
  );
}
`,
  }),

  P("dual-panel-comparator", {
    category: "layouts",
    subcategory: "splits",
    title: "Dual Panel Comparator",
    description: "Side-by-side comparison layout for diffs, AB variants, or before-and-after evaluations.",
    tags: ["comparator", "diff", "comparison", "dual-panel", "split"],
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
      interactionModel: "side-by-side-comparison",
      visualModel: "symmetric-dual-panel",
      motionModel: "none",
      layoutModel: "two-column-comparator",
      semanticPurpose: "entity-comparison-view",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface DualPanelComparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  leftTitle?: string;
  rightTitle?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export function DualPanelComparator({
  leftTitle = "Variant A",
  rightTitle = "Variant B",
  left,
  right,
  className,
  ...props
}: DualPanelComparatorProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto p-4 font-sans", className)} {...props}>
      <div className="p-4 rounded-xl border border-line bg-surface/30">
        <div className="font-mono text-xs font-bold text-ink mb-2 pb-2 border-b border-line">{leftTitle}</div>
        {left}
      </div>
      <div className="p-4 rounded-xl border border-line bg-surface/30">
        <div className="font-mono text-xs font-bold text-ink mb-2 pb-2 border-b border-line">{rightTitle}</div>
        {right}
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { DualPanelComparator } from "./dual-panel-comparator";

export default function DualPanelComparatorDemo() {
  return (
    <DualPanelComparator
      leftTitle="Original Specification"
      rightTitle="Optimized Bundle"
      left={<div className="text-xs font-mono text-ink/70">Payload: 240 KB • Latency: 120ms</div>}
      right={<div className="text-xs font-mono text-emerald-600 font-semibold">Payload: 42 KB • Latency: 18ms</div>}
    />
  );
}
`,
  }),

  P("feed-stream-layout", {
    category: "layouts",
    subcategory: "shells",
    title: "Feed Stream Layout",
    description: "Three-column social feed layout with central chronological stream flanked by navigation and trends.",
    tags: ["feed", "stream", "social", "timeline", "shell"],
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
      interactionModel: "social-stream-timeline",
      visualModel: "central-feed-flanked-rails",
      motionModel: "none",
      layoutModel: "three-column-feed-grid",
      semanticPurpose: "chronological-stream-shell",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface FeedStreamLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  nav?: React.ReactNode;
  feed?: React.ReactNode;
  aside?: React.ReactNode;
}

export function FeedStreamLayout({ nav, feed, aside, className, ...props }: FeedStreamLayoutProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-12 gap-6 max-w-6xl mx-auto p-4 font-sans items-start", className)} {...props}>
      {nav && <nav className="md:col-span-3 border-r border-line p-3 hidden md:block">{nav}</nav>}
      <main className="md:col-span-6 space-y-4">{feed}</main>
      {aside && <aside className="md:col-span-3 border-l border-line p-3 hidden lg:block">{aside}</aside>}
    </div>
  );
}
`,
    demo: `"use client";

import { FeedStreamLayout } from "./feed-stream-layout";

export default function FeedStreamLayoutDemo() {
  return (
    <FeedStreamLayout
      nav={<div className="font-mono text-xs text-ink/70">Feed Channels</div>}
      feed={
        <div className="space-y-3">
          <div className="p-4 rounded-xl border border-line bg-paper text-xs">Update #1 from Agent Node</div>
          <div className="p-4 rounded-xl border border-line bg-paper text-xs">Update #2 from Agent Node</div>
        </div>
      }
      aside={<div className="font-mono text-xs text-ink/70">Trending Topics</div>}
    />
  );
}
`,
  }),

  P("mosaic-gallery-grid", {
    category: "layouts",
    subcategory: "grids",
    title: "Mosaic Gallery Grid",
    description: "Staggered geometric visual gallery grid with varied aspect ratio image apertures and hover zoom bounds.",
    tags: ["mosaic", "gallery", "grid", "images", "apertures"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "luxury",
      macrostructure: "mosaic",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "serif-display",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "mosaic-aperture-presentation",
      visualModel: "staggered-aspect-mosaic",
      motionModel: "none",
      layoutModel: "mosaic-tile-matrix",
      semanticPurpose: "visual-gallery-mosaic",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface MosaicGalleryGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function MosaicGalleryGrid({ children, className, ...props }: MosaicGalleryGridProps) {
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto p-4 font-sans", className)} {...props}>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { MosaicGalleryGrid } from "./mosaic-gallery-grid";

export default function MosaicGalleryGridDemo() {
  return (
    <MosaicGalleryGrid>
      <div className="col-span-2 row-span-2 h-64 rounded-xl border border-line bg-surface/50 flex items-center justify-center font-mono text-xs">
        Feature Image 2x2
      </div>
      <div className="h-30 rounded-xl border border-line bg-surface/30 flex items-center justify-center font-mono text-xs">
        Tile 1x1
      </div>
      <div className="h-30 rounded-xl border border-line bg-surface/30 flex items-center justify-center font-mono text-xs">
        Tile 1x1
      </div>
      <div className="col-span-2 h-30 rounded-xl border border-line bg-surface/40 flex items-center justify-center font-mono text-xs">
        Panoramic Tile 2x1
      </div>
    </MosaicGalleryGrid>
  );
}
`,
  }),
];

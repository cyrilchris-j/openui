import type { ResourceDefinition } from "../lib/definitions.js";

const P = (name: string, definition: Omit<ResourceDefinition, "name">): ResourceDefinition => ({
  name,
  ...definition,
});

export default [
  P("split-action-dialog", {
    category: "layouts",
    subcategory: "splits",
    title: "Split Action Dialog",
    description: "Two-column modal dialog shell with brand illustration on left and action form on right.",
    tags: ["dialog", "modal", "split", "shell", "actions"],
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
      interactionModel: "split-dialog-interaction",
      visualModel: "dual-column-modal",
      motionModel: "none",
      layoutModel: "side-by-side-dialog",
      semanticPurpose: "dialog-action-shell",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface SplitActionDialogProps extends React.HTMLAttributes<HTMLDivElement> {
  visual?: React.ReactNode;
  content?: React.ReactNode;
}

export function SplitActionDialog({ visual, content, className, ...props }: SplitActionDialogProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 max-w-xl mx-auto rounded-2xl border border-line bg-paper overflow-hidden shadow-xl font-sans", className)} {...props}>
      <div className="p-6 bg-surface/50 border-b md:border-b-0 md:border-r border-line flex items-center justify-center">{visual}</div>
      <div className="p-6 flex flex-col justify-between space-y-4">{content}</div>
    </div>
  );
}
`,
    demo: `"use client";

import { SplitActionDialog } from "./split-action-dialog";

export default function SplitActionDialogDemo() {
  return (
    <SplitActionDialog
      visual={<div className="font-mono text-xs text-accent font-bold">Graphic Asset</div>}
      content={
        <div>
          <h3 className="text-sm font-bold text-ink mb-1">Confirm Deployment</h3>
          <p className="text-xs text-ink/60 mb-4">Promote release candidate v2.4.0 to production edge.</p>
          <button type="button" className="w-full py-1.5 rounded bg-accent text-white font-mono text-xs">Authorize</button>
        </div>
      }
    />
  );
}
`,
  }),

  P("app-settings-rail", {
    category: "layouts",
    subcategory: "shells",
    title: "App Settings Rail",
    description: "Categorical vertical navigation rail on left with scrollable configuration sections on right.",
    tags: ["settings", "rail", "preferences", "config", "shell"],
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
      interactionModel: "settings-category-rail",
      visualModel: "left-category-nav-rail",
      motionModel: "none",
      layoutModel: "rail-and-content-pane",
      semanticPurpose: "application-settings-shell",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface AppSettingsRailProps extends React.HTMLAttributes<HTMLDivElement> {
  nav?: React.ReactNode;
  children?: React.ReactNode;
}

export function AppSettingsRail({ nav, children, className, ...props }: AppSettingsRailProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-12 gap-6 max-w-4xl mx-auto p-4 font-sans items-start", className)} {...props}>
      {nav && <nav className="md:col-span-4 border-r border-line p-3 space-y-1">{nav}</nav>}
      <main className="md:col-span-8 p-3 space-y-6">{children}</main>
    </div>
  );
}
`,
    demo: `"use client";

import { AppSettingsRail } from "./app-settings-rail";

export default function AppSettingsRailDemo() {
  return (
    <AppSettingsRail
      nav={
        <div className="text-xs space-y-1">
          <div className="p-2 rounded bg-accent/15 text-accent font-semibold">General</div>
          <div className="p-2 rounded text-ink/70 hover:bg-surface">Team Members</div>
          <div className="p-2 rounded text-ink/70 hover:bg-surface">API Credentials</div>
        </div>
      }
    >
      <div>
        <h3 className="text-sm font-bold text-ink mb-1">Organization Profile</h3>
        <p className="text-xs text-ink/60 mb-3">Manage public workspace presence and security tokens.</p>
        <div className="p-3 rounded-lg border border-line bg-surface/30 text-xs font-mono">Workspace: openui-core</div>
      </div>
    </AppSettingsRail>
  );
}
`,
  }),

  P("card-grid-auto-fit", {
    category: "layouts",
    subcategory: "grids",
    title: "Card Grid Auto Fit",
    description: "Responsive auto-fitting CSS grid layout that dynamically adjusts column counts based on minimum card width.",
    tags: ["grid", "autofit", "responsive", "cards", "modular"],
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
      interactionModel: "fluid-autofit-wrapping",
      visualModel: "auto-fit-card-matrix",
      motionModel: "none",
      layoutModel: "css-grid-autofit",
      semanticPurpose: "responsive-entity-grid",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface CardGridAutoFitProps extends React.HTMLAttributes<HTMLDivElement> {
  minWidth?: number;
  children?: React.ReactNode;
}

export function CardGridAutoFit({ minWidth = 240, children, className, ...props }: CardGridAutoFitProps) {
  return (
    <div
      className={cn("grid gap-4 p-4 max-w-5xl mx-auto font-sans", className)}
      style={{ gridTemplateColumns: \`repeat(auto-fit, minmax(\${minWidth}px, 1fr))\` }}
      {...props}
    >
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { CardGridAutoFit } from "./card-grid-auto-fit";

export default function CardGridAutoFitDemo() {
  return (
    <CardGridAutoFit>
      {[1, 2, 3, 4].map((id) => (
        <div key={id} className="p-4 rounded-xl border border-line bg-surface/40">
          <div className="font-mono text-xs font-bold text-ink">Entity #{id}</div>
          <p className="text-xs text-ink/60 mt-1">Auto-fitting fluid grid cell.</p>
        </div>
      ))}
    </CardGridAutoFit>
  );
}
`,
  }),

  P("split-reading-notes", {
    category: "layouts",
    subcategory: "reading",
    title: "Split Reading Notes",
    description: "Edward Tufte-style margin notes layout with annotations aligned adjacent to corresponding prose paragraphs.",
    tags: ["tufte", "margin", "notes", "reading", "prose"],
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
      interactionModel: "marginal-annotation-reading",
      visualModel: "side-margin-sidenotes",
      motionModel: "none",
      layoutModel: "prose-with-marginalia",
      semanticPurpose: "scholarly-reading-layout",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface SplitReadingNotesProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function SplitReadingNotes({ children, className, ...props }: SplitReadingNotesProps) {
  return (
    <article className={cn("max-w-4xl mx-auto p-6 font-serif text-ink space-y-8", className)} {...props}>
      {children}
    </article>
  );
}
`,
    demo: `"use client";

import { SplitReadingNotes } from "./split-reading-notes";

export default function SplitReadingNotesDemo() {
  return (
    <SplitReadingNotes>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        <div className="md:col-span-8 text-sm leading-relaxed text-ink/90">
          The fundamental purpose of marginalia is to enrich the primary narrative without interrupting the reader’s cognitive rhythm.
        </div>
        <aside className="md:col-span-4 text-xs font-mono text-ink/60 border-l border-line pl-3">
          Note 1: Refer to Edward Tufte’s Beautiful Evidence (2006) for seminal guidelines.
        </aside>
      </div>
    </SplitReadingNotes>
  );
}
`,
  }),

  P("pinned-header-sticky-footer", {
    category: "layouts",
    subcategory: "shells",
    title: "Pinned Header Sticky Footer",
    description: "Viewport application framework with fixed header on top, central scroll area, and bottom action bar.",
    tags: ["sticky", "footer", "header", "shell", "viewport"],
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
      interactionModel: "pinned-header-footer-scroll",
      visualModel: "framed-viewport-shell",
      motionModel: "none",
      layoutModel: "top-middle-bottom-stack",
      semanticPurpose: "viewport-bounded-application-shell",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface PinnedHeaderStickyFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

export function PinnedHeaderStickyFooter({
  header,
  footer,
  children,
  className,
  ...props
}: PinnedHeaderStickyFooterProps) {
  return (
    <div className={cn("h-80 flex flex-col w-full border border-line rounded-xl overflow-hidden bg-paper text-ink font-sans", className)} {...props}>
      {header && <header className="p-3 border-b border-line bg-surface/30 shrink-0 font-bold text-xs">{header}</header>}
      <main className="flex-1 p-4 overflow-y-auto">{children}</main>
      {footer && <footer className="p-3 border-t border-line bg-surface/30 shrink-0 flex items-center justify-between text-xs">{footer}</footer>}
    </div>
  );
}
`,
    demo: `"use client";

import { PinnedHeaderStickyFooter } from "./pinned-header-sticky-footer";

export default function PinnedHeaderStickyFooterDemo() {
  return (
    <PinnedHeaderStickyFooter
      header={<span>Process Pipeline</span>}
      footer={<span className="font-mono text-ink/60">Status: Running (4/4 complete)</span>}
    >
      <div className="space-y-2 text-xs">
        <p>Step 1: Ingest JSON Schema ✓</p>
        <p>Step 2: Validate Uniqueness Fingerprints ✓</p>
        <p>Step 3: Compile TypeScript AST Definitions ✓</p>
        <p>Step 4: Package Output Registry ✓</p>
      </div>
    </PinnedHeaderStickyFooter>
  );
}
`,
  }),

  P("compact-inspector-pane", {
    category: "layouts",
    subcategory: "shells",
    title: "Compact Inspector Pane",
    description: "CAD/3D modeling application layout: scene tree on left, canvas in center, and property inspector on right.",
    tags: ["inspector", "cad", "3d", "tools", "properties"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "split",
      density: "compact",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "cad-three-pane-inspector",
      visualModel: "scene-viewport-property-triptych",
      motionModel: "none",
      layoutModel: "three-column-workbench",
      semanticPurpose: "3d-editor-workbench",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface CompactInspectorPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  sceneTree?: React.ReactNode;
  viewport?: React.ReactNode;
  inspector?: React.ReactNode;
}

export function CompactInspectorPane({
  sceneTree,
  viewport,
  inspector,
  className,
  ...props
}: CompactInspectorPaneProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-12 min-h-[360px] w-full border border-line rounded-xl overflow-hidden font-mono text-xs", className)} {...props}>
      <div className="md:col-span-3 border-r border-line p-3 bg-surface/30 hidden md:block">{sceneTree}</div>
      <div className="md:col-span-6 p-4 flex items-center justify-center bg-paper">{viewport}</div>
      <div className="md:col-span-3 border-l border-line p-3 bg-surface/30 hidden lg:block">{inspector}</div>
    </div>
  );
}
`,
    demo: `"use client";

import { CompactInspectorPane } from "./compact-inspector-pane";

export default function CompactInspectorPaneDemo() {
  return (
    <CompactInspectorPane
      sceneTree={<div>Root Node<br />└ Camera<br />└ Mesh #1</div>}
      viewport={<div className="text-ink/40">3D Interactive Viewport</div>}
      inspector={<div>Transform<br />X: 0.00<br />Y: 1.50<br />Z: -4.20</div>}
    />
  );
}
`,
  }),

  P("two-column-form-matrix", {
    category: "layouts",
    subcategory: "splits",
    title: "Two Column Form Matrix",
    description: "Enterprise form layout with instructional labels on left and matching input groups on right.",
    tags: ["forms", "two-column", "matrix", "enterprise", "inputs"],
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
      interactionModel: "instructional-label-field-pair",
      visualModel: "enterprise-form-matrix",
      motionModel: "none",
      layoutModel: "two-column-form-grid",
      semanticPurpose: "enterprise-configuration-form",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface TwoColumnFormMatrixProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function TwoColumnFormMatrix({ children, className, ...props }: TwoColumnFormMatrixProps) {
  return (
    <div className={cn("divide-y divide-line max-w-4xl mx-auto p-4 font-sans", className)} {...props}>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { TwoColumnFormMatrix } from "./two-column-form-matrix";

export default function TwoColumnFormMatrixDemo() {
  return (
    <TwoColumnFormMatrix>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-4 items-start">
        <div className="md:col-span-4">
          <h4 className="text-xs font-bold text-ink">Public Identifier</h4>
          <p className="text-[11px] text-ink/60">This name will appear on published registry packages.</p>
        </div>
        <div className="md:col-span-8">
          <input type="text" defaultValue="@openui/registry" className="w-full px-3 py-1.5 rounded border border-line text-xs font-mono bg-paper" />
        </div>
      </div>
    </TwoColumnFormMatrix>
  );
}
`,
  }),

  P("media-player-theater", {
    category: "layouts",
    subcategory: "shells",
    title: "Media Player Theater",
    description: "Cinema 16:9 media viewport above with playlist queue and comments below.",
    tags: ["theater", "media", "video", "cinema", "player"],
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
      interactionModel: "theater-viewport-below-queue",
      visualModel: "cinema-stage-with-queue",
      motionModel: "none",
      layoutModel: "stacked-media-layout",
      semanticPurpose: "cinema-media-playback",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface MediaPlayerTheaterProps extends React.HTMLAttributes<HTMLDivElement> {
  screen?: React.ReactNode;
  playlist?: React.ReactNode;
  children?: React.ReactNode;
}

export function MediaPlayerTheater({ screen, playlist, children, className, ...props }: MediaPlayerTheaterProps) {
  return (
    <div className={cn("max-w-4xl mx-auto p-4 space-y-4 font-sans", className)} {...props}>
      <div className="aspect-video w-full rounded-2xl bg-black border border-line flex items-center justify-center overflow-hidden">
        {screen}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        <div className="md:col-span-8 space-y-4">{children}</div>
        {playlist && <aside className="md:col-span-4 p-4 rounded-xl border border-line bg-surface/30">{playlist}</aside>}
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { MediaPlayerTheater } from "./media-player-theater";

export default function MediaPlayerTheaterDemo() {
  return (
    <MediaPlayerTheater
      screen={<div className="font-mono text-xs text-white/60">16:9 Cinema Playback Viewport</div>}
      playlist={<div className="font-mono text-xs text-ink/70">Next: Lecture 02 — Motion Physics</div>}
    >
      <h2 className="text-base font-bold text-ink">Lecture 01: The Calculus of Visual Balance</h2>
      <p className="text-xs text-ink/60">Prof. Elena Rostova • Stanford Design Laboratory</p>
    </MediaPlayerTheater>
  );
}
`,
  }),

  P("split-invoice-ledger", {
    category: "layouts",
    subcategory: "splits",
    title: "Split Invoice Ledger",
    description: "Two-panel accounting billing invoice with client metadata on left and line-item totals on right.",
    tags: ["invoice", "ledger", "billing", "split", "accounting"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "editorial",
      macrostructure: "split",
      density: "compact",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "invoice-ledger-inspection",
      visualModel: "dual-column-invoice-sheet",
      motionModel: "none",
      layoutModel: "side-by-side-invoice-split",
      semanticPurpose: "accounting-invoice-display",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface SplitInvoiceLedgerProps extends React.HTMLAttributes<HTMLDivElement> {
  clientInfo?: React.ReactNode;
  lineItems?: React.ReactNode;
}

export function SplitInvoiceLedger({ clientInfo, lineItems, className, ...props }: SplitInvoiceLedgerProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-12 gap-6 max-w-4xl mx-auto p-6 rounded-2xl border border-line bg-paper font-mono text-xs shadow-sm", className)} {...props}>
      <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-line pb-4 md:pb-0 md:pr-6 space-y-3">{clientInfo}</div>
      <div className="md:col-span-8 space-y-4">{lineItems}</div>
    </div>
  );
}
`,
    demo: `"use client";

import { SplitInvoiceLedger } from "./split-invoice-ledger";

export default function SplitInvoiceLedgerDemo() {
  return (
    <SplitInvoiceLedger
      clientInfo={
        <div>
          <div className="font-bold text-ink mb-1">INVOICE #08492</div>
          <div className="text-ink/60">Client: DeepMind Core</div>
          <div className="text-ink/60">Date: 2026-09-18</div>
        </div>
      }
      lineItems={
        <div>
          <div className="flex justify-between border-b border-line pb-2 font-bold">
            <span>Item Description</span>
            <span>Amount</span>
          </div>
          <div className="flex justify-between py-2 text-ink/80 border-b border-line/50">
            <span>Registry Automation Infrastructure</span>
            <span>$12,500.00</span>
          </div>
        </div>
      }
    />
  );
}
`,
  }),

  P("timeline-milestone-rail", {
    category: "layouts",
    subcategory: "stacks",
    title: "Timeline Milestone Rail",
    description: "Vertical chronological timeline spine with alternating milestone event cards.",
    tags: ["timeline", "milestone", "spine", "chronological", "rail"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "rail",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "chronological-spine-scroll",
      visualModel: "central-spine-timeline",
      motionModel: "none",
      layoutModel: "alternating-timeline-spine",
      semanticPurpose: "roadmap-milestone-timeline",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface TimelineMilestoneRailProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function TimelineMilestoneRail({ children, className, ...props }: TimelineMilestoneRailProps) {
  return (
    <div className={cn("relative max-w-2xl mx-auto p-4 space-y-6 font-sans before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-line", className)} {...props}>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { TimelineMilestoneRail } from "./timeline-milestone-rail";

export default function TimelineMilestoneRailDemo() {
  return (
    <TimelineMilestoneRail>
      {[1, 2].map((m) => (
        <div key={m} className="relative pl-8">
          <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-accent -translate-x-1/2" />
          <div className="p-4 rounded-xl border border-line bg-paper text-xs">
            <div className="font-mono font-bold text-accent">Milestone 0{m}</div>
            <div className="text-ink font-semibold mt-0.5">800 Real Working Resources Deployed</div>
          </div>
        </div>
      ))}
    </TimelineMilestoneRail>
  );
}
`,
  }),

  P("hero-showcase-split", {
    category: "layouts",
    subcategory: "splits",
    title: "Hero Showcase Split",
    description: "Marketing landing hero section with compelling value proposition on left and dynamic graphic showcase on right.",
    tags: ["hero", "marketing", "split", "landing", "showcase"],
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
      interactionModel: "hero-value-prop-inspection",
      visualModel: "split-landing-hero",
      motionModel: "none",
      layoutModel: "side-by-side-hero-banner",
      semanticPurpose: "landing-page-hero-split",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface HeroShowcaseSplitProps extends React.HTMLAttributes<HTMLDivElement> {
  headline?: React.ReactNode;
  visual?: React.ReactNode;
}

export function HeroShowcaseSplit({ headline, visual, className, ...props }: HeroShowcaseSplitProps) {
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto p-8 items-center font-sans", className)} {...props}>
      <div className="space-y-4">{headline}</div>
      <div className="p-8 rounded-3xl border border-line bg-surface/40 flex items-center justify-center">{visual}</div>
    </div>
  );
}
`,
    demo: `"use client";

import { HeroShowcaseSplit } from "./hero-showcase-split";

export default function HeroShowcaseSplitDemo() {
  return (
    <HeroShowcaseSplit
      headline={
        <>
          <h1 className="text-2xl font-bold text-ink tracking-tight">Design Registry for Autonomous Engineering</h1>
          <p className="text-xs text-ink/70 leading-relaxed">800 unique, installable components with architectural fingerprints.</p>
        </>
      }
      visual={<div className="font-mono text-xs text-accent font-bold">Interactive Component Node</div>}
    />
  );
}
`,
  }),

  P("tiled-stat-matrix", {
    category: "layouts",
    subcategory: "grids",
    title: "Tiled Stat Matrix",
    description: "Four-column metric telemetry dashboard grid with uniform gutters and responsive wrapping.",
    tags: ["stats", "matrix", "telemetry", "kpi", "dashboard"],
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
      interactionModel: "stat-tile-telemetry-scan",
      visualModel: "four-column-kpi-rack",
      motionModel: "none",
      layoutModel: "symmetric-four-tile-grid",
      semanticPurpose: "kpi-metric-matrix",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface TiledStatMatrixProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function TiledStatMatrix({ children, className, ...props }: TiledStatMatrixProps) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto p-4 font-sans", className)} {...props}>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { TiledStatMatrix } from "./tiled-stat-matrix";

export default function TiledStatMatrixDemo() {
  const metrics = [
    { label: "Active Nodes", val: "1,048" },
    { label: "Uptime", val: "99.99%" },
    { label: "Throughput", val: "4.8 GB/s" },
    { label: "Error Rate", val: "0.001%" },
  ];

  return (
    <TiledStatMatrix>
      {metrics.map((m) => (
        <div key={m.label} className="p-4 rounded-xl border border-line bg-surface/30">
          <div className="text-[11px] font-mono text-ink/60">{m.label}</div>
          <div className="text-xl font-bold font-mono text-ink mt-1">{m.val}</div>
        </div>
      ))}
    </TiledStatMatrix>
  );
}
`,
  }),

  P("calendar-month-grid", {
    category: "layouts",
    subcategory: "grids",
    title: "Calendar Month Grid",
    description: "Seven-column calendar monthly schedule matrix with weekday header row and date cells.",
    tags: ["calendar", "schedule", "month", "grid", "planner"],
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
      interactionModel: "monthly-calendar-cell-inspection",
      visualModel: "seven-column-day-matrix",
      motionModel: "none",
      layoutModel: "seven-column-calendar-grid",
      semanticPurpose: "monthly-schedule-matrix",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface CalendarMonthGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function CalendarMonthGrid({ children, className, ...props }: CalendarMonthGridProps) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className={cn("max-w-2xl mx-auto border border-line rounded-xl overflow-hidden font-mono text-xs", className)} {...props}>
      <div className="grid grid-cols-7 border-b border-line bg-surface/40 text-center font-bold py-2">
        {days.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 divide-x divide-y divide-line/60 bg-paper">{children}</div>
    </div>
  );
}
`,
    demo: `"use client";

import { CalendarMonthGrid } from "./calendar-month-grid";

export default function CalendarMonthGridDemo() {
  return (
    <CalendarMonthGrid>
      {Array.from({ length: 14 }).map((_, i) => (
        <div key={i} className="h-16 p-1.5 flex flex-col justify-between text-[11px]">
          <span className="font-semibold text-ink/70">{i + 1}</span>
          {i === 3 && <span className="text-[9px] bg-accent/20 text-accent rounded px-1 truncate">Release</span>}
        </div>
      ))}
    </CalendarMonthGrid>
  );
}
`,
  }),

  P("split-auth-layout", {
    category: "layouts",
    subcategory: "splits",
    title: "Split Auth Layout",
    description: "Authentication layout with graphic mural banner on one side and clean authentication dialog on the other.",
    tags: ["auth", "login", "signup", "split", "shell"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "split",
      density: "airy",
      shapeLanguage: "rounded",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "authentication-flow-split",
      visualModel: "mural-and-auth-form",
      motionModel: "none",
      layoutModel: "side-by-side-auth-halves",
      semanticPurpose: "authentication-screen-shell",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface SplitAuthLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  mural?: React.ReactNode;
  form?: React.ReactNode;
}

export function SplitAuthLayout({ mural, form, className, ...props }: SplitAuthLayoutProps) {
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-2 min-h-[380px] w-full border border-line rounded-2xl overflow-hidden font-sans", className)} {...props}>
      <div className="p-8 bg-surface/50 border-b lg:border-b-0 lg:border-r border-line flex items-center justify-center">{mural}</div>
      <div className="p-8 flex items-center justify-center bg-paper">{form}</div>
    </div>
  );
}
`,
    demo: `"use client";

import { SplitAuthLayout } from "./split-auth-layout";

export default function SplitAuthLayoutDemo() {
  return (
    <SplitAuthLayout
      mural={<div className="font-mono text-xs text-ink/60">OpenUI Design Ecosystem</div>}
      form={
        <div className="w-full max-w-xs space-y-3">
          <div className="text-sm font-bold text-ink">Welcome back</div>
          <input type="email" placeholder="name@company.com" className="w-full px-3 py-1.5 rounded border border-line text-xs font-mono bg-paper" />
          <button type="button" className="w-full py-1.5 rounded bg-accent text-white font-mono text-xs">Sign In</button>
        </div>
      }
    />
  );
}
`,
  }),

  P("faq-accordion-stack", {
    category: "layouts",
    subcategory: "stacks",
    title: "FAQ Accordion Stack",
    description: "Centered frequently asked questions layout with tidy stacked disclosure containers.",
    tags: ["faq", "accordion", "disclosure", "stack", "support"],
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
      interactionModel: "faq-disclosure-stack",
      visualModel: "stacked-question-panels",
      motionModel: "none",
      layoutModel: "single-column-faq-stack",
      semanticPurpose: "faq-disclosure-layout",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface FAQAccordionStackProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function FAQAccordionStack({ children, className, ...props }: FAQAccordionStackProps) {
  return (
    <div className={cn("max-w-2xl mx-auto p-6 space-y-3 font-sans", className)} {...props}>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { FAQAccordionStack } from "./faq-accordion-stack";

export default function FAQAccordionStackDemo() {
  return (
    <FAQAccordionStack>
      <div className="p-4 rounded-xl border border-line bg-paper">
        <div className="font-bold text-xs text-ink">Are components copy-paste friendly?</div>
        <p className="text-xs text-ink/60 mt-1">Yes, all components are standalone and zero-dependency.</p>
      </div>
      <div className="p-4 rounded-xl border border-line bg-paper">
        <div className="font-bold text-xs text-ink">Can I customize design tokens?</div>
        <p className="text-xs text-ink/60 mt-1">OpenUI provides full CSS custom property token mappings.</p>
      </div>
    </FAQAccordionStack>
  );
}
`,
  }),

  P("feature-matrix-table", {
    category: "layouts",
    subcategory: "grids",
    title: "Feature Matrix Table",
    description: "Structured comparison grid contrasting product features across Starter, Pro, and Enterprise tiers.",
    tags: ["pricing", "matrix", "comparison", "table", "tiers"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "pricing-tier-comparison",
      visualModel: "feature-check-matrix",
      motionModel: "none",
      layoutModel: "tabular-feature-grid",
      semanticPurpose: "plan-comparison-matrix",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface FeatureMatrixTableProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function FeatureMatrixTable({ children, className, ...props }: FeatureMatrixTableProps) {
  return (
    <div className={cn("max-w-3xl mx-auto border border-line rounded-xl overflow-hidden font-sans text-xs bg-paper", className)} {...props}>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { FeatureMatrixTable } from "./feature-matrix-table";

export default function FeatureMatrixTableDemo() {
  return (
    <FeatureMatrixTable>
      <div className="grid grid-cols-4 p-3 border-b border-line bg-surface/30 font-bold font-mono text-[11px]">
        <span>Feature</span>
        <span className="text-center">Community</span>
        <span className="text-center text-accent">Pro</span>
        <span className="text-center">Enterprise</span>
      </div>
      <div className="grid grid-cols-4 p-3 border-b border-line/60">
        <span className="font-medium">800 Registry Components</span>
        <span className="text-center">✓</span>
        <span className="text-center text-accent font-bold">✓</span>
        <span className="text-center">✓</span>
      </div>
    </FeatureMatrixTable>
  );
}
`,
  }),

  P("search-results-grid", {
    category: "layouts",
    subcategory: "shells",
    title: "Search Results Grid",
    description: "Search interface with filter aside on left and responsive results card grid on right.",
    tags: ["search", "results", "filter", "facet", "shell"],
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
      interactionModel: "faceted-search-inspection",
      visualModel: "filter-aside-and-card-results",
      motionModel: "none",
      layoutModel: "aside-and-results-grid",
      semanticPurpose: "search-results-viewport",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface SearchResultsGridProps extends React.HTMLAttributes<HTMLDivElement> {
  filters?: React.ReactNode;
  children?: React.ReactNode;
}

export function SearchResultsGrid({ filters, children, className, ...props }: SearchResultsGridProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-12 gap-6 max-w-5xl mx-auto p-4 font-sans items-start", className)} {...props}>
      {filters && <aside className="md:col-span-3 p-3 rounded-xl border border-line bg-surface/30 space-y-2">{filters}</aside>}
      <main className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</main>
    </div>
  );
}
`,
    demo: `"use client";

import { SearchResultsGrid } from "./search-results-grid";

export default function SearchResultsGridDemo() {
  return (
    <SearchResultsGrid
      filters={
        <div className="text-xs space-y-1">
          <div className="font-bold mb-2">Category</div>
          <div>Components (100)</div>
          <div>Backgrounds (100)</div>
        </div>
      }
    >
      <div className="p-4 rounded-xl border border-line bg-paper text-xs">Result Item A</div>
      <div className="p-4 rounded-xl border border-line bg-paper text-xs">Result Item B</div>
    </SearchResultsGrid>
  );
}
`,
  }),

  P("profile-header-tabs", {
    category: "layouts",
    subcategory: "shells",
    title: "Profile Header Tabs",
    description: "User account profile layout with wide panoramic banner, overlapping avatar badge, and content tabs.",
    tags: ["profile", "banner", "avatar", "tabs", "account"],
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
      interactionModel: "profile-banner-tab-navigation",
      visualModel: "panoramic-banner-profile",
      motionModel: "none",
      layoutModel: "banner-avatar-tab-stack",
      semanticPurpose: "user-profile-shell",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface ProfileHeaderTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  banner?: React.ReactNode;
  avatar?: React.ReactNode;
  info?: React.ReactNode;
  tabs?: React.ReactNode;
  children?: React.ReactNode;
}

export function ProfileHeaderTabs({
  banner,
  avatar,
  info,
  tabs,
  children,
  className,
  ...props
}: ProfileHeaderTabsProps) {
  return (
    <div className={cn("max-w-4xl mx-auto rounded-2xl border border-line overflow-hidden bg-paper font-sans", className)} {...props}>
      <div className="h-32 bg-surface/60 border-b border-line">{banner}</div>
      <div className="px-6 pb-4">
        <div className="flex items-end justify-between -mt-10 mb-3">
          <div className="w-20 h-20 rounded-full border-4 border-paper bg-accent text-white flex items-center justify-center font-bold text-lg">
            {avatar}
          </div>
          <div>{info}</div>
        </div>
        <div className="border-b border-line pb-2 flex gap-4 text-xs font-mono">{tabs}</div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
`,
    demo: `"use client";

import { ProfileHeaderTabs } from "./profile-header-tabs";

export default function ProfileHeaderTabsDemo() {
  return (
    <ProfileHeaderTabs
      avatar="AG"
      info={<button type="button" className="px-3 py-1.5 rounded bg-accent text-white text-xs font-mono">Edit Profile</button>}
      tabs={
        <>
          <span className="font-bold text-accent">Repositories</span>
          <span className="text-ink/60">Contributions</span>
        </>
      }
    >
      <div className="text-xs text-ink/70">Public code repositories and active design tokens.</div>
    </ProfileHeaderTabs>
  );
}
`,
  }),

  P("terminal-split-view", {
    category: "layouts",
    subcategory: "splits",
    title: "Terminal Split View",
    description: "Side-by-side dual console panes for monitoring concurrent build logs and server output.",
    tags: ["terminal", "console", "logs", "split", "developer"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "split",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "neon-on-dark",
    },
    fingerprint: {
      interactionModel: "dual-terminal-monitoring",
      visualModel: "split-console-panes",
      motionModel: "none",
      layoutModel: "side-by-side-terminal",
      semanticPurpose: "dual-terminal-console",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface TerminalSplitViewProps extends React.HTMLAttributes<HTMLDivElement> {
  paneA?: React.ReactNode;
  paneB?: React.ReactNode;
}

export function TerminalSplitView({ paneA, paneB, className, ...props }: TerminalSplitViewProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 min-h-[300px] w-full border border-line rounded-xl overflow-hidden bg-slate-950 text-white font-mono text-xs", className)} {...props}>
      <div className="p-3 border-b md:border-b-0 md:border-r border-white/10 overflow-y-auto">{paneA}</div>
      <div className="p-3 overflow-y-auto">{paneB}</div>
    </div>
  );
}
`,
    demo: `"use client";

import { TerminalSplitView } from "./terminal-split-view";

export default function TerminalSplitViewDemo() {
  return (
    <TerminalSplitView
      paneA={<div>[Server] Listening on http://localhost:5173</div>}
      paneB={<div>[Watcher] 800 modules compiled in 14ms</div>}
    />
  );
}
`,
  }),

  P("multi-tier-pricing-grid", {
    category: "layouts",
    subcategory: "grids",
    title: "Multi Tier Pricing Grid",
    description: "Three-tier pricing card layout featuring prominent central highlight for the recommended tier.",
    tags: ["pricing", "tiers", "subscription", "cards", "highlight"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "plan-tier-selection",
      visualModel: "three-tier-card-cluster",
      motionModel: "none",
      layoutModel: "three-column-pricing-grid",
      semanticPurpose: "subscription-pricing-display",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface MultiTierPricingGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function MultiTierPricingGrid({ children, className, ...props }: MultiTierPricingGridProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto p-4 font-sans items-center", className)} {...props}>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { MultiTierPricingGrid } from "./multi-tier-pricing-grid";

export default function MultiTierPricingGridDemo() {
  return (
    <MultiTierPricingGrid>
      <div className="p-6 rounded-2xl border border-line bg-paper text-xs">
        <h3 className="font-bold text-sm mb-1">Starter</h3>
        <p className="text-xl font-bold font-mono my-2">$0</p>
      </div>
      <div className="p-6 rounded-2xl border-2 border-accent bg-paper shadow-lg text-xs">
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent text-white uppercase font-bold">Recommended</span>
        <h3 className="font-bold text-sm mt-2 mb-1">Pro Architect</h3>
        <p className="text-xl font-bold font-mono my-2">$29<span className="text-xs font-normal">/mo</span></p>
      </div>
      <div className="p-6 rounded-2xl border border-line bg-paper text-xs">
        <h3 className="font-bold text-sm mb-1">Enterprise</h3>
        <p className="text-xl font-bold font-mono my-2">Custom</p>
      </div>
    </MultiTierPricingGrid>
  );
}
`,
  }),

  P("contact-support-split", {
    category: "layouts",
    subcategory: "splits",
    title: "Contact Support Split",
    description: "Support contact layout with office headquarters location and dispatch inquiry form side-by-side.",
    tags: ["contact", "support", "inquiry", "split", "form"],
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
      interactionModel: "contact-dispatch-inquiry",
      visualModel: "office-info-and-support-form",
      motionModel: "none",
      layoutModel: "side-by-side-contact-halves",
      semanticPurpose: "support-contact-shell",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface ContactSupportSplitProps extends React.HTMLAttributes<HTMLDivElement> {
  info?: React.ReactNode;
  form?: React.ReactNode;
}

export function ContactSupportSplit({ info, form, className, ...props }: ContactSupportSplitProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto p-6 font-sans items-start", className)} {...props}>
      <div className="space-y-4">{info}</div>
      <div className="p-6 rounded-2xl border border-line bg-surface/30">{form}</div>
    </div>
  );
}
`,
    demo: `"use client";

import { ContactSupportSplit } from "./contact-support-split";

export default function ContactSupportSplitDemo() {
  return (
    <ContactSupportSplit
      info={
        <div>
          <h2 className="text-lg font-bold text-ink">Connect with Architecture Lead</h2>
          <p className="text-xs text-ink/60 mt-1">Direct inquiries to the OpenUI core systems team.</p>
        </div>
      }
      form={
        <div className="space-y-3 text-xs">
          <input type="text" placeholder="Your Name" className="w-full px-3 py-1.5 rounded border border-line bg-paper" />
          <textarea rows={3} placeholder="Message" className="w-full px-3 py-1.5 rounded border border-line bg-paper resize-none" />
          <button type="button" className="w-full py-1.5 rounded bg-accent text-white font-mono">Send</button>
        </div>
      }
    />
  );
}
`,
  }),

  P("ecommerce-product-stage", {
    category: "layouts",
    subcategory: "splits",
    title: "Ecommerce Product Stage",
    description: "Product detail stage with vertical image thumbnail rack, central visualizer, and checkout panel.",
    tags: ["ecommerce", "product", "store", "thumbnails", "checkout"],
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
      interactionModel: "product-gallery-and-buy-box",
      visualModel: "thumbnail-stage-and-actions",
      motionModel: "none",
      layoutModel: "three-tier-product-stage",
      semanticPurpose: "ecommerce-product-detail-layout",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface EcommerceProductStageProps extends React.HTMLAttributes<HTMLDivElement> {
  gallery?: React.ReactNode;
  details?: React.ReactNode;
}

export function EcommerceProductStage({ gallery, details, className, ...props }: EcommerceProductStageProps) {
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto p-6 font-sans items-start", className)} {...props}>
      <div className="lg:col-span-7">{gallery}</div>
      <div className="lg:col-span-5 space-y-4">{details}</div>
    </div>
  );
}
`,
    demo: `"use client";

import { EcommerceProductStage } from "./ecommerce-product-stage";

export default function EcommerceProductStageDemo() {
  return (
    <EcommerceProductStage
      gallery={<div className="aspect-square w-full rounded-2xl border border-line bg-surface/40 flex items-center justify-center font-mono text-xs">Product Viewport</div>}
      details={
        <div>
          <h1 className="text-xl font-bold text-ink">Modular Mechanical Keyboard</h1>
          <p className="text-base font-bold font-mono text-accent my-2">$189.00</p>
          <button type="button" className="w-full py-2 rounded-xl bg-accent text-white font-mono text-xs font-bold">Add to Cart</button>
        </div>
      }
    />
  );
}
`,
  }),

  P("onboarding-flow-shell", {
    category: "layouts",
    subcategory: "shells",
    title: "Onboarding Flow Shell",
    description: "Centered welcoming user onboarding dialog container with step dots indicator and forward controls.",
    tags: ["onboarding", "walkthrough", "modal", "shell", "steps"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "stack",
      density: "airy",
      shapeLanguage: "rounded",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "onboarding-step-modal",
      visualModel: "centered-welcome-card",
      motionModel: "none",
      layoutModel: "centered-dialog-frame",
      semanticPurpose: "first-run-onboarding-shell",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface OnboardingFlowShellProps extends React.HTMLAttributes<HTMLDivElement> {
  stepIndicator?: React.ReactNode;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

export function OnboardingFlowShell({
  stepIndicator,
  actions,
  children,
  className,
  ...props
}: OnboardingFlowShellProps) {
  return (
    <div className={cn("max-w-md mx-auto p-8 rounded-3xl border border-line bg-paper text-ink font-sans shadow-xl text-center space-y-6", className)} {...props}>
      <div className="flex justify-center">{stepIndicator}</div>
      <div>{children}</div>
      <div className="pt-4 border-t border-line">{actions}</div>
    </div>
  );
}
`,
    demo: `"use client";

import { OnboardingFlowShell } from "./onboarding-flow-shell";

export default function OnboardingFlowShellDemo() {
  return (
    <OnboardingFlowShell
      stepIndicator={<div className="font-mono text-xs text-accent">● ○ ○</div>}
      actions={<button type="button" className="w-full py-2 rounded-xl bg-accent text-white font-mono text-xs font-bold">Next</button>}
    >
      <h3 className="text-base font-bold text-ink">Welcome to OpenUI</h3>
      <p className="text-xs text-ink/60 mt-1">Autonomous interface registration built for speed.</p>
    </OnboardingFlowShell>
  );
}
`,
  }),

  P("multi-panel-dock", {
    category: "layouts",
    subcategory: "shells",
    title: "Multi Panel Dock",
    description: "IDE layout with main coding editor above and collapsible developer console drawer docked below.",
    tags: ["dock", "console", "terminal", "ide", "panels"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "dockable-console-drawer",
      visualModel: "editor-with-bottom-dock",
      motionModel: "none",
      layoutModel: "vertical-dock-split",
      semanticPurpose: "docked-developer-console",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface MultiPanelDockProps extends React.HTMLAttributes<HTMLDivElement> {
  editor?: React.ReactNode;
  dock?: React.ReactNode;
}

export function MultiPanelDock({ editor, dock, className, ...props }: MultiPanelDockProps) {
  return (
    <div className={cn("h-80 flex flex-col w-full border border-line rounded-xl overflow-hidden font-mono text-xs", className)} {...props}>
      <div className="flex-1 p-4 bg-paper overflow-y-auto">{editor}</div>
      <div className="h-28 border-t border-line p-3 bg-surface/40 shrink-0 overflow-y-auto">{dock}</div>
    </div>
  );
}
`,
    demo: `"use client";

import { MultiPanelDock } from "./multi-panel-dock";

export default function MultiPanelDockDemo() {
  return (
    <MultiPanelDock
      editor={<div>// Active file: index.tsx</div>}
      dock={<div>Output: 0 errors, ready in 12ms</div>}
    />
  );
}
`,
  }),

  P("hero-callout-grid", {
    category: "layouts",
    subcategory: "grids",
    title: "Hero Callout Grid",
    description: "Three-card callout feature layout with elevated centerpiece highlighting the premier value proposition.",
    tags: ["hero", "callout", "grid", "features", "highlight"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "callout-feature-inspection",
      visualModel: "elevated-center-triptych",
      motionModel: "none",
      layoutModel: "three-card-callout-matrix",
      semanticPurpose: "feature-callout-rack",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface HeroCalloutGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function HeroCalloutGrid({ children, className, ...props }: HeroCalloutGridProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto p-4 font-sans items-center", className)} {...props}>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { HeroCalloutGrid } from "./hero-callout-grid";

export default function HeroCalloutGridDemo() {
  return (
    <HeroCalloutGrid>
      <div className="p-6 rounded-2xl border border-line bg-surface/30 text-xs">Feature A</div>
      <div className="p-8 rounded-2xl border-2 border-accent bg-paper shadow-md text-xs">Featured Hub</div>
      <div className="p-6 rounded-2xl border border-line bg-surface/30 text-xs">Feature C</div>
    </HeroCalloutGrid>
  );
}
`,
  }),
];

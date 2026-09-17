import type { ResourceDefinition } from "../lib/definitions.js";

const P = (name: string, definition: Omit<ResourceDefinition, "name">): ResourceDefinition => ({
  name,
  ...definition,
});

export default [
  P("interactive-terminal-playground", {
    category: "sections",
    title: "Interactive Terminal Playground",
    description: "An embedded simulated developer terminal executing commands like help, inspect, and test with live output.",
    difficulty: "advanced",
    subcategory: "developer",
    fingerprint: {
      interactionModel: "interactive-terminal-playground-interaction",
      visualModel: "interactive-terminal-playground-visual",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "interactive-terminal-playground-section",
    },
    tags: ["terminal", "playground", "cli", "interactive", "developer"],
    dependencies: [],
    dna: {
      macrostructure: "stack",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
      shapeLanguage: "sharp",
      density: "compact",
      genre: "technical",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function InteractiveTerminalPlayground({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [history, setHistory] = React.useState<string[]>([
    "OpenUI v2.4.0 Interactive Playground",
    "Type 'help' to inspect available simulation commands.",
  ]);
  const [input, setInput] = React.useState("");

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    let output = "";
    switch (cmd) {
      case "help":
        output = "Available commands: 'catalog', 'status', 'fingerprint', 'clear'";
        break;
      case "catalog":
        output = "Catalog tally: components (100), text (100), motion (100), interactions (100), backgrounds (100), layouts (100), sections (100), blocks (100). Total: 800.";
        break;
      case "status":
        output = "All 800 registry manifests verified. 0 missing metadata, 0 TypeScript errors.";
        break;
      case "fingerprint":
        output = "Deterministic schema fingerprint verified: 100% unique across all 800 entries.";
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      default:
        output = \`Command not recognized: '\${cmd}'. Type 'help' for options.\`;
    }

    setHistory((prev) => [...prev, \`$ \${input}\`, output]);
    setInput("");
  };

  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-4xl mx-auto", className)} {...props}>
      <div className="bg-neutral-950 text-neutral-100 rounded-xl border border-neutral-800 p-4 font-mono text-xs shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </div>
          <span className="text-neutral-500 text-[10px]">openui-shell ~ zsh</span>
        </div>

        <div className="mt-3 space-y-1 max-h-60 overflow-y-auto">
          {history.map((line, idx) => (
            <div key={idx} className={line.startsWith("$") ? "text-emerald-400 font-bold" : "text-neutral-300"}>
              {line}
            </div>
          ))}
        </div>

        <form onSubmit={handleCommand} className="mt-3 pt-2 border-t border-neutral-800 flex items-center gap-2">
          <span className="text-emerald-400 font-bold">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="type 'catalog', 'status' or 'help'..."
            className="flex-1 bg-transparent text-neutral-100 focus:outline-none text-xs"
          />
        </form>
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { InteractiveTerminalPlayground } from "./interactive-terminal-playground";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] flex items-center justify-center p-4 bg-neutral-900">
      <InteractiveTerminalPlayground />
    </div>
  );
}
`,
  }),

  P("product-feature-matrix", {
    category: "sections",
    title: "Product Feature Matrix",
    description: "A comprehensive checklist matrix detailing features across Free, Team, and Enterprise deployment tiers.",
    difficulty: "intermediate",
    subcategory: "pricing",
    fingerprint: {
      interactionModel: "product-feature-matrix-interaction",
      visualModel: "product-feature-matrix-visual",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "product-feature-matrix-section",
    },
    tags: ["matrix", "features", "plans", "pricing", "table"],
    dependencies: [],
    dna: {
      macrostructure: "stack",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
      shapeLanguage: "sharp",
      density: "compact",
      genre: "swiss",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface MatrixRow {
  name: string;
  starter: boolean | string;
  pro: boolean | string;
  enterprise: boolean | string;
}

export interface ProductFeatureMatrixProps extends React.HTMLAttributes<HTMLElement> {
  rows?: MatrixRow[];
}

const DEFAULT_ROWS: MatrixRow[] = [
  { name: "Full 800 Catalog Access", starter: true, pro: true, enterprise: true },
  { name: "CLI Generator Tooling", starter: true, pro: true, enterprise: true },
  { name: "Zero-bundle CSS Engine", starter: true, pro: true, enterprise: true },
  { name: "Private Air-gapped Mirror", starter: false, pro: true, enterprise: true },
  { name: "Dedicated Slack Support", starter: false, pro: "Business Hours", enterprise: "24/7/365 Dedicated" },
  { name: "Custom SSO & SAML Provisioning", starter: false, pro: false, enterprise: true },
  { name: "Custom Component Audits", starter: false, pro: false, enterprise: "Quarterly Review" },
];

export function ProductFeatureMatrix({
  rows = DEFAULT_ROWS,
  className,
  ...props
}: ProductFeatureMatrixProps) {
  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-5xl mx-auto", className)} {...props}>
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Feature Matrix by Plan
        </h2>
        <p className="text-xs text-neutral-500 mt-2">
          Compare core capabilities and SLA guarantees across all plan tiers.
        </p>
      </div>

      <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden bg-white dark:bg-neutral-950">
        <div className="grid grid-cols-12 bg-neutral-50 dark:bg-neutral-900 p-4 font-mono text-xs font-bold border-b border-neutral-200 dark:border-neutral-800">
          <div className="col-span-6 text-neutral-500 uppercase">Capability</div>
          <div className="col-span-2 text-center text-neutral-600 dark:text-neutral-400">Starter</div>
          <div className="col-span-2 text-center text-emerald-600 dark:text-emerald-400">Pro</div>
          <div className="col-span-2 text-center text-neutral-900 dark:text-neutral-100">Enterprise</div>
        </div>

        <div className="divide-y divide-neutral-100 dark:divide-neutral-800 text-xs">
          {rows.map((row, idx) => (
            <div key={idx} className="grid grid-cols-12 p-3.5 items-center">
              <div className="col-span-6 font-medium text-neutral-800 dark:text-neutral-200">
                {row.name}
              </div>
              <div className="col-span-2 text-center text-neutral-500">
                {typeof row.starter === "boolean" ? (row.starter ? "✓" : "—") : row.starter}
              </div>
              <div className="col-span-2 text-center font-semibold text-emerald-600 dark:text-emerald-400">
                {typeof row.pro === "boolean" ? (row.pro ? "✓" : "—") : row.pro}
              </div>
              <div className="col-span-2 text-center font-bold text-neutral-900 dark:text-neutral-100">
                {typeof row.enterprise === "boolean" ? (row.enterprise ? "✓" : "—") : row.enterprise}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { ProductFeatureMatrix } from "./product-feature-matrix";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] flex items-center justify-center p-4 bg-neutral-100 dark:bg-neutral-900/40">
      <ProductFeatureMatrix />
    </div>
  );
}
`,
  }),

  P("customer-testimonial-spotlight", {
    category: "sections",
    title: "Customer Testimonial Spotlight",
    description: "A focused executive testimonial spotlight highlighting quote, corporate logo, and verified impact metrics.",
    difficulty: "starter",
    subcategory: "testimonials",
    fingerprint: {
      interactionModel: "customer-testimonial-spotlight-interaction",
      visualModel: "customer-testimonial-spotlight-visual",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "customer-testimonial-spotlight-section",
    },
    tags: ["testimonial", "spotlight", "quote", "social-proof", "customer"],
    dependencies: [],
    dna: {
      macrostructure: "stack",
      motionLanguage: "none",
      typographyStyle: "serif-display",
      colorStrategy: "muted-earth",
      shapeLanguage: "soft",
      density: "airy",
      genre: "editorial",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface CustomerTestimonialSpotlightProps extends React.HTMLAttributes<HTMLElement> {
  quote?: string;
  author?: string;
  role?: string;
  company?: string;
}

export function CustomerTestimonialSpotlight({
  quote = "OpenUI completely removed our design debt. We went from fragmented ad-hoc design systems to a unified, verified registry that engineers love importing directly.",
  author = "Dr. Aris Thorne",
  role = "Head of Software Architecture",
  company = "Vanguard Genomics",
  className,
  ...props
}: CustomerTestimonialSpotlightProps) {
  return (
    <section className={cn("w-full py-20 px-4 md:px-8 max-w-4xl mx-auto text-center", className)} {...props}>
      <span className="text-4xl text-neutral-300 dark:text-neutral-700 font-serif select-none">“</span>
      <blockquote className="text-xl md:text-2xl font-serif italic text-neutral-800 dark:text-neutral-200 leading-relaxed -mt-4">
        {quote}
      </blockquote>
      <div className="mt-8">
        <div className="text-sm font-serif font-bold text-neutral-900 dark:text-neutral-100">
          {author}
        </div>
        <div className="text-xs font-mono text-neutral-500 mt-1">
          {role}, <span className="text-neutral-700 dark:text-neutral-300 font-semibold">{company}</span>
        </div>
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { CustomerTestimonialSpotlight } from "./customer-testimonial-spotlight";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] flex items-center justify-center p-4 bg-stone-50 dark:bg-neutral-950">
      <CustomerTestimonialSpotlight />
    </div>
  );
}
`,
  }),

  P("press-release-banner", {
    category: "sections",
    title: "Press Release Banner",
    description: "An announcement strip with news badge, press headline, read link, and dismiss action.",
    difficulty: "starter",
    subcategory: "announcements",
    fingerprint: {
      interactionModel: "press-release-banner-interaction",
      visualModel: "press-release-banner-visual",
      motionModel: "subtle",
      layoutModel: "full-bleed-layout",
      semanticPurpose: "press-release-banner-section",
    },
    tags: ["banner", "press", "announcement", "news", "cta"],
    dependencies: [],
    dna: {
      macrostructure: "full-bleed",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
      shapeLanguage: "rounded",
      density: "compact",
      genre: "minimal",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface PressReleaseBannerProps extends React.HTMLAttributes<HTMLElement> {
  tag?: string;
  message?: string;
  actionText?: string;
}

export function PressReleaseBanner({
  tag = "ANNOUNCEMENT",
  message = "OpenUI announces completion of 800 certified open-source resources with automated verification.",
  actionText = "Read the release →",
  className,
  ...props
}: PressReleaseBannerProps) {
  const [visible, setVisible] = React.useState(true);

  if (!visible) return null;

  return (
    <section
      className={cn(
        "w-full bg-neutral-900 text-white py-3 px-4 md:px-8 border-b border-neutral-800",
        className
      )}
      {...props}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3 overflow-hidden">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500 text-black shrink-0">
            {tag}
          </span>
          <span className="truncate text-neutral-300 font-medium">
            {message}
          </span>
          <a href="#press" className="text-emerald-400 font-semibold hover:underline shrink-0 hidden sm:inline">
            {actionText}
          </a>
        </div>
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="text-neutral-400 hover:text-white text-sm shrink-0"
          aria-label="Dismiss banner"
        >
          ✕
        </button>
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { PressReleaseBanner } from "./press-release-banner";

export default function Demo() {
  return (
    <div className="w-full bg-neutral-950 min-h-[150px] flex items-center justify-center">
      <PressReleaseBanner />
    </div>
  );
}
`,
  }),

  P("community-forum-digest", {
    category: "sections",
    title: "Community Forum Digest",
    description: "A snapshot of top community forum threads with author avatars, response counts, and upvotes.",
    difficulty: "intermediate",
    subcategory: "community",
    fingerprint: {
      interactionModel: "community-forum-digest-interaction",
      visualModel: "community-forum-digest-visual",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "community-forum-digest-section",
    },
    tags: ["community", "forum", "threads", "discussions", "social"],
    dependencies: [],
    dna: {
      macrostructure: "stack",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
      shapeLanguage: "rounded",
      density: "medium",
      genre: "minimal",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface ForumThread {
  id: string;
  title: string;
  author: string;
  category: string;
  replies: number;
  likes: number;
}

export interface CommunityForumDigestProps extends React.HTMLAttributes<HTMLElement> {
  threads?: ForumThread[];
}

const DEFAULT_THREADS: ForumThread[] = [
  { id: "t1", title: "How we migrated 40 micro-frontends to OpenUI zero-dependency components", author: "marcus_v", category: "Architecture", replies: 28, likes: 142 },
  { id: "t2", title: "RFC: Adding deterministic CSS color token math to design.md generator", author: "elena_design", category: "RFC", replies: 44, likes: 210 },
  { id: "t3", title: "Showcase: Real-time telemetry dashboard using layouts/grid-bento", author: "devon_codes", category: "Showcase", replies: 19, likes: 98 },
];

export function CommunityForumDigest({
  threads = DEFAULT_THREADS,
  className,
  ...props
}: CommunityForumDigestProps) {
  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-4xl mx-auto", className)} {...props}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold">
            Community Discussions
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-1">
            Trending on OpenUI Forum
          </h2>
        </div>
        <button
          type="button"
          className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-emerald-500"
        >
          View All Discussions →
        </button>
      </div>

      <div className="space-y-3">
        {threads.map((thread) => (
          <div
            key={thread.id}
            className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                  {thread.category}
                </span>
                <span className="text-xs text-neutral-400">by @{thread.author}</span>
              </div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mt-1">
                {thread.title}
              </h3>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-neutral-500 shrink-0">
              <div>💬 {thread.replies}</div>
              <div>▲ {thread.likes}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { CommunityForumDigest } from "./community-forum-digest";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900/40">
      <CommunityForumDigest />
    </div>
  );
}
`,
  }),

  P("executive-leadership-roster", {
    category: "sections",
    title: "Executive Leadership Roster",
    description: "An organizational leadership card display showcasing founder portraits, credentials, and social links.",
    difficulty: "starter",
    subcategory: "team",
    fingerprint: {
      interactionModel: "executive-leadership-roster-interaction",
      visualModel: "executive-leadership-roster-visual",
      motionModel: "subtle",
      layoutModel: "mosaic-layout",
      semanticPurpose: "executive-leadership-roster-section",
    },
    tags: ["team", "leadership", "executives", "founders", "roster"],
    dependencies: [],
    dna: {
      macrostructure: "mosaic",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
      shapeLanguage: "rounded",
      density: "medium",
      genre: "minimal",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface Leader {
  name: string;
  role: string;
  bio: string;
  avatarLetter: string;
}

export interface ExecutiveLeadershipRosterProps extends React.HTMLAttributes<HTMLElement> {
  leaders?: Leader[];
}

const DEFAULT_LEADERS: Leader[] = [
  { name: "Cyril Chris", role: "Principal Architect", bio: "Former distributed systems engineer building zero-dependency web infrastructure.", avatarLetter: "C" },
  { name: "Elena Rostova", role: "Lead Design Systems", bio: "Pioneered automated mathematical token contracts and accessible UI primitives.", avatarLetter: "E" },
  { name: "Marcus Vance", role: "Verification & Rigor", bio: "Specialized in compiler validation, property testing, and deterministic schemas.", avatarLetter: "M" },
];

export function ExecutiveLeadershipRoster({
  leaders = DEFAULT_LEADERS,
  className,
  ...props
}: ExecutiveLeadershipRosterProps) {
  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-5xl mx-auto", className)} {...props}>
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold">
          Leadership Team
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-1">
          Guiding OpenUI's architectural standard
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {leaders.map((leader) => (
          <div
            key={leader.name}
            className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 flex flex-col justify-between text-center"
          >
            <div>
              <div className="h-16 w-16 mx-auto rounded-full bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 flex items-center justify-center text-xl font-bold mb-4">
                {leader.avatarLetter}
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                {leader.name}
              </h3>
              <div className="text-xs font-mono text-neutral-500 mt-0.5">
                {leader.role}
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-3 leading-relaxed">
                {leader.bio}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { ExecutiveLeadershipRoster } from "./executive-leadership-roster";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900/50">
      <ExecutiveLeadershipRoster />
    </div>
  );
}
`,
  }),

  P("developer-sandbox-preview", {
    category: "sections",
    title: "Developer Sandbox Preview",
    description: "An interactive code previewer section with tabbed code and live view toggles.",
    difficulty: "intermediate",
    subcategory: "developer",
    fingerprint: {
      interactionModel: "developer-sandbox-preview-interaction",
      visualModel: "developer-sandbox-preview-visual",
      motionModel: "subtle",
      layoutModel: "split-layout",
      semanticPurpose: "developer-sandbox-preview-section",
    },
    tags: ["sandbox", "preview", "code", "interactive", "developer"],
    dependencies: [],
    dna: {
      macrostructure: "split",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "accent-only",
      shapeLanguage: "rounded",
      density: "medium",
      genre: "technical",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function DeveloperSandboxPreview({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [view, setView] = React.useState<"preview" | "code">("preview");

  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-5xl mx-auto", className)} {...props}>
      <div className="border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden bg-white dark:bg-neutral-950 shadow-sm">
        <div className="flex items-center justify-between p-3 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
          <span className="text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300">
            SplitHeadlineHero.tsx
          </span>
          <div className="flex items-center gap-1 font-mono text-xs">
            <button
              type="button"
              onClick={() => setView("preview")}
              className={cn(
                "px-3 py-1 rounded text-xs transition-colors",
                view === "preview" ? "bg-white dark:bg-neutral-800 font-bold shadow-xs" : "text-neutral-400"
              )}
            >
              Live Preview
            </button>
            <button
              type="button"
              onClick={() => setView("code")}
              className={cn(
                "px-3 py-1 rounded text-xs transition-colors",
                view === "code" ? "bg-white dark:bg-neutral-800 font-bold shadow-xs" : "text-neutral-400"
              )}
            >
              React Code
            </button>
          </div>
        </div>

        <div className="p-6">
          {view === "preview" ? (
            <div className="h-48 flex flex-col items-center justify-center text-center bg-neutral-100 dark:bg-neutral-900/60 rounded-xl p-4">
              <h4 className="text-lg font-bold text-neutral-900 dark:text-white">Next Generation Interfaces</h4>
              <p className="text-xs text-neutral-500 mt-1 max-w-md">Interactive preview render executing in client sandbox</p>
              <button type="button" className="mt-4 px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold">
                Action Trigger
              </button>
            </div>
          ) : (
            <pre className="text-xs font-mono overflow-x-auto p-4 bg-neutral-950 text-neutral-100 rounded-xl">
              {\`export function SplitHeadlineHero({ title, cta }) {
  return (
    <section className="py-12 flex items-center justify-between">
      <h1>{title}</h1>
      <button>{cta}</button>
    </section>
  );
}\`}
            </pre>
          )}
        </div>
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { DeveloperSandboxPreview } from "./developer-sandbox-preview";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] flex items-center justify-center p-4 bg-neutral-100 dark:bg-neutral-900">
      <DeveloperSandboxPreview />
    </div>
  );
}
`,
  }),

  P("security-audit-trail-stream", {
    category: "sections",
    title: "Security Audit Trail Stream",
    description: "An immutable telemetry log stream tracking access controls, key rotations, and compliance checks.",
    difficulty: "intermediate",
    subcategory: "security",
    fingerprint: {
      interactionModel: "security-audit-trail-stream-interaction",
      visualModel: "security-audit-trail-stream-visual",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "security-audit-trail-stream-section",
    },
    tags: ["security", "audit", "stream", "telemetry", "logs"],
    dependencies: [],
    dna: {
      macrostructure: "stack",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
      shapeLanguage: "sharp",
      density: "dense",
      genre: "technical",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface AuditEvent {
  timestamp: string;
  actor: string;
  action: string;
  sha: string;
}

export interface SecurityAuditTrailStreamProps extends React.HTMLAttributes<HTMLElement> {
  events?: AuditEvent[];
}

const DEFAULT_EVENTS: AuditEvent[] = [
  { timestamp: "18:42:19 UTC", actor: "deploy-bot@prod", action: "DEPLOY_REGISTRY_V2.4", sha: "8f7a9d2" },
  { timestamp: "18:35:04 UTC", actor: "cyrilchris", action: "APPROVE_PULL_REQUEST_800", sha: "3c4e1b0" },
  { timestamp: "17:12:51 UTC", actor: "kms-system", action: "ROTATE_HARDWARE_M_TLS_CERTS", sha: "e9f02a4" },
  { timestamp: "15:08:12 UTC", actor: "auditor@soc2", action: "TAMPER_PROOF_CHECKSUM_PASS", sha: "01bc93f" },
];

export function SecurityAuditTrailStream({
  events = DEFAULT_EVENTS,
  className,
  ...props
}: SecurityAuditTrailStreamProps) {
  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-5xl mx-auto", className)} {...props}>
      <div className="bg-neutral-950 text-neutral-100 border border-neutral-800 rounded-xl p-5 font-mono text-xs">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold uppercase tracking-wider text-white">Live Audit Log Feed</span>
          </div>
          <span className="text-[10px] text-neutral-500">Tamper-Evident SHA-256 Ledger</span>
        </div>

        <div className="divide-y divide-neutral-900 mt-2">
          {events.map((e, idx) => (
            <div key={idx} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="text-neutral-500 text-[11px]">{e.timestamp}</span>
                <span className="text-emerald-400 font-bold">{e.actor}</span>
                <span className="text-neutral-200">{e.action}</span>
              </div>
              <span className="text-neutral-500 text-[10px] font-mono">sha:{e.sha}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { SecurityAuditTrailStream } from "./security-audit-trail-stream";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] flex items-center justify-center p-4 bg-neutral-950">
      <SecurityAuditTrailStream />
    </div>
  );
}
`,
  }),

  P("cloud-infrastructure-map", {
    category: "sections",
    title: "Cloud Infrastructure Map",
    description: "A geographical edge location matrix displaying active points of presence, latency pings, and redundancy.",
    difficulty: "starter",
    subcategory: "infrastructure",
    fingerprint: {
      interactionModel: "cloud-infrastructure-map-interaction",
      visualModel: "cloud-infrastructure-map-visual",
      motionModel: "subtle",
      layoutModel: "mosaic-layout",
      semanticPurpose: "cloud-infrastructure-map-section",
    },
    tags: ["cloud", "map", "edge", "latency", "infrastructure"],
    dependencies: [],
    dna: {
      macrostructure: "mosaic",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "accent-only",
      shapeLanguage: "rounded",
      density: "compact",
      genre: "technical",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface RegionPoP {
  city: string;
  region: string;
  ping: string;
}

export interface CloudInfrastructureMapProps extends React.HTMLAttributes<HTMLElement> {
  regions?: RegionPoP[];
}

const DEFAULT_POPS: RegionPoP[] = [
  { city: "San Francisco", region: "us-west-1", ping: "2ms" },
  { city: "Frankfurt", region: "eu-central-1", ping: "4ms" },
  { city: "Tokyo", region: "ap-northeast-1", ping: "6ms" },
  { city: "Singapore", region: "ap-southeast-1", ping: "5ms" },
  { city: "London", region: "eu-west-2", ping: "3ms" },
  { city: "Sydney", region: "ap-southeast-2", ping: "8ms" },
];

export function CloudInfrastructureMap({
  regions = DEFAULT_POPS,
  className,
  ...props
}: CloudInfrastructureMapProps) {
  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-5xl mx-auto", className)} {...props}>
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold">
          Global Backbone
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-1">
          Deploy within 10ms of your users
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {regions.map((pop) => (
          <div
            key={pop.region}
            className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 font-mono"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100">{pop.city}</span>
              <span className="text-xs text-emerald-500 font-bold">{pop.ping}</span>
            </div>
            <div className="text-[11px] text-neutral-400 mt-1">{pop.region}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { CloudInfrastructureMap } from "./cloud-infrastructure-map";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900/40">
      <CloudInfrastructureMap />
    </div>
  );
}
`,
  }),

  P("changelog-timeline-compact", {
    category: "sections",
    title: "Changelog Timeline Compact",
    description: "A streamlined vertical timeline for minor releases, dependency bumps, and rapid fixes.",
    difficulty: "starter",
    subcategory: "changelog",
    fingerprint: {
      interactionModel: "changelog-timeline-compact-interaction",
      visualModel: "changelog-timeline-compact-visual",
      motionModel: "subtle",
      layoutModel: "rail-layout",
      semanticPurpose: "changelog-timeline-compact-section",
    },
    tags: ["changelog", "timeline", "compact", "releases", "minimal"],
    dependencies: [],
    dna: {
      macrostructure: "rail",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
      shapeLanguage: "sharp",
      density: "dense",
      genre: "minimal",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface CompactRelease {
  version: string;
  date: string;
  summary: string;
}

export interface ChangelogTimelineCompactProps extends React.HTMLAttributes<HTMLElement> {
  releases?: CompactRelease[];
}

const DEFAULT_RELEASES: CompactRelease[] = [
  { version: "v2.4.1", date: "Today", summary: "Patched slot property collision on HTMLDivElement wrappers." },
  { version: "v2.4.0", date: "Yesterday", summary: "Added full 800-resource automated verification pipeline." },
  { version: "v2.3.9", date: "Sep 12", summary: "Added air-gapped registry bundle tarball export command." },
];

export function ChangelogTimelineCompact({
  releases = DEFAULT_RELEASES,
  className,
  ...props
}: ChangelogTimelineCompactProps) {
  return (
    <section className={cn("w-full py-12 px-4 max-w-2xl mx-auto", className)} {...props}>
      <h3 className="text-sm font-mono uppercase tracking-widest text-neutral-400 font-bold mb-6">
        Recent Builds
      </h3>
      <div className="border-l border-neutral-200 dark:border-neutral-800 pl-4 space-y-6">
        {releases.map((r) => (
          <div key={r.version} className="relative">
            <div className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-neutral-900 dark:bg-neutral-100" />
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-mono font-bold text-neutral-900 dark:text-neutral-100">{r.version}</span>
              <span className="text-[10px] font-mono text-neutral-400">{r.date}</span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">{r.summary}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { ChangelogTimelineCompact } from "./changelog-timeline-compact";

export default function Demo() {
  return (
    <div className="w-full min-h-[250px] flex items-center justify-center p-4 bg-white dark:bg-neutral-950">
      <ChangelogTimelineCompact />
    </div>
  );
}
`,
  }),

  P("interactive-pricing-slider", {
    category: "sections",
    title: "Interactive Pricing Slider",
    description: "A continuous slider calculating monthly cost based on active user seats with automated volume discount tiers.",
    difficulty: "intermediate",
    subcategory: "pricing",
    fingerprint: {
      interactionModel: "interactive-pricing-slider-interaction",
      visualModel: "interactive-pricing-slider-visual",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "interactive-pricing-slider-section",
    },
    tags: ["pricing", "slider", "seats", "calculator", "billing"],
    dependencies: [],
    dna: {
      macrostructure: "stack",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
      shapeLanguage: "rounded",
      density: "medium",
      genre: "minimal",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function InteractivePricingSlider({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [seats, setSeats] = React.useState(15);

  const pricePerSeat = seats > 50 ? 12 : seats > 20 ? 15 : 19;
  const total = seats * pricePerSeat;

  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-xl mx-auto text-center", className)} {...props}>
      <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold">
        Seat Volume
      </span>
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-1">
        Pay as your engineering squad grows
      </h2>

      <div className="mt-8 p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm">
        <div className="flex justify-between items-baseline">
          <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Active Team Seats</span>
          <span className="text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-100">{seats} seats</span>
        </div>

        <input
          type="range"
          min="1"
          max="100"
          value={seats}
          onChange={(e) => setSeats(Number(e.target.value))}
          className="w-full mt-4 accent-emerald-500 cursor-pointer"
        />

        <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800 flex items-baseline justify-between">
          <div className="text-left">
            <div className="text-xs text-neutral-400">Total Billed Monthly</div>
            <div className="text-3xl font-extrabold text-neutral-900 dark:text-neutral-100">\${total}/mo</div>
          </div>
          <button
            type="button"
            className="px-4 py-2 rounded-lg bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 text-xs font-semibold"
          >
            Start Free Trial
          </button>
        </div>
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { InteractivePricingSlider } from "./interactive-pricing-slider";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900/40">
      <InteractivePricingSlider />
    </div>
  );
}
`,
  }),

  P("customer-logo-ticker", {
    category: "sections",
    title: "Customer Logo Ticker",
    description: "An animated corporate brand marquee strip showcasing enterprise adopters and venture partners.",
    difficulty: "starter",
    subcategory: "social-proof",
    fingerprint: {
      interactionModel: "customer-logo-ticker-interaction",
      visualModel: "customer-logo-ticker-visual",
      motionModel: "subtle",
      layoutModel: "full-bleed-layout",
      semanticPurpose: "customer-logo-ticker-section",
    },
    tags: ["logos", "marquee", "ticker", "brands", "social-proof"],
    dependencies: [],
    dna: {
      macrostructure: "full-bleed",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
      shapeLanguage: "sharp",
      density: "compact",
      genre: "minimal",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

const BRANDS = ["ACME CLOUD", "VORTEX LABS", "SYNAPSE AI", "HYPERSCALE", "NEXUS SYSTEMS", "AERO PROTOCOL"];

export function CustomerLogoTicker({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("w-full py-8 border-y border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden", className)} {...props}>
      <div className="text-center text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-4 font-semibold">
        Powering interface infrastructure at
      </div>
      <div className="flex items-center justify-around gap-8 max-w-5xl mx-auto px-4 text-xs font-mono font-bold text-neutral-400 dark:text-neutral-600">
        {BRANDS.map((b) => (
          <span key={b} className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors cursor-default">
            {b}
          </span>
        ))}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { CustomerLogoTicker } from "./customer-logo-ticker";

export default function Demo() {
  return (
    <div className="w-full bg-neutral-50 dark:bg-neutral-950 min-h-[150px] flex items-center justify-center">
      <CustomerLogoTicker />
    </div>
  );
}
`,
  }),

  P("developer-cli-cheatsheet", {
    category: "sections",
    title: "Developer CLI Cheatsheet",
    description: "A reference card mapping key CLI subcommands, options, and environmental variables.",
    difficulty: "starter",
    subcategory: "developer",
    fingerprint: {
      interactionModel: "developer-cli-cheatsheet-interaction",
      visualModel: "developer-cli-cheatsheet-visual",
      motionModel: "subtle",
      layoutModel: "mosaic-layout",
      semanticPurpose: "developer-cli-cheatsheet-section",
    },
    tags: ["cli", "cheatsheet", "terminal", "commands", "developer"],
    dependencies: [],
    dna: {
      macrostructure: "mosaic",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "accent-only",
      shapeLanguage: "sharp",
      density: "dense",
      genre: "technical",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function DeveloperCLICommandsCheatsheet({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const commands = [
    { cmd: "openui add <name>", desc: "Materialize item into local project src/" },
    { cmd: "openui diff <name>", desc: "Inspect local overrides vs upstream registry" },
    { cmd: "openui validate", desc: "Verify Design DNA invariants and TypeScript contracts" },
    { cmd: "openui sync", desc: "Pull latest security patches and bugfixes" },
  ];

  return (
    <section className={cn("w-full py-16 px-4 max-w-4xl mx-auto font-mono", className)} {...props}>
      <h3 className="text-xs uppercase tracking-widest text-emerald-500 font-bold mb-4">
        Command Syntax
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {commands.map((c) => (
          <div key={c.cmd} className="p-3.5 rounded bg-neutral-900 border border-neutral-800 text-xs">
            <div className="text-emerald-400 font-bold">$ {c.cmd}</div>
            <div className="text-neutral-400 text-[11px] mt-1">{c.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { DeveloperCLICommandsCheatsheet } from "./developer-cli-cheatsheet";

export default function Demo() {
  return (
    <div className="w-full min-h-[250px] flex items-center justify-center p-4 bg-neutral-950">
      <DeveloperCLICommandsCheatsheet />
    </div>
  );
}
`,
  }),

  P("support-sla-guarantee", {
    category: "sections",
    title: "Support SLA Guarantee",
    description: "An operational commitment banner detailing response times, ticket severity levels, and on-call escalation.",
    difficulty: "starter",
    subcategory: "support",
    fingerprint: {
      interactionModel: "support-sla-guarantee-interaction",
      visualModel: "support-sla-guarantee-visual",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "support-sla-guarantee-section",
    },
    tags: ["support", "sla", "guarantee", "uptime", "enterprise"],
    dependencies: [],
    dna: {
      macrostructure: "stack",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
      shapeLanguage: "sharp",
      density: "compact",
      genre: "industrial",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function SupportSLAGuarantee({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("w-full py-16 px-4 max-w-5xl mx-auto", className)} {...props}>
      <div className="border border-neutral-300 dark:border-neutral-800 rounded-xl p-6 bg-white dark:bg-neutral-950">
        <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
          Enterprise SLA Commitments
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 text-xs">
          <div>
            <span className="font-bold text-neutral-900 dark:text-neutral-100">P0 (Critical Outage)</span>
            <div className="text-neutral-500 mt-1">Under 15 minutes guaranteed response with warm page escalation.</div>
          </div>
          <div>
            <span className="font-bold text-neutral-900 dark:text-neutral-100">P1 (Degraded Performance)</span>
            <div className="text-neutral-500 mt-1">Under 1 hour guaranteed technical review with senior engineer.</div>
          </div>
          <div>
            <span className="font-bold text-neutral-900 dark:text-neutral-100">Scheduled Maintenance</span>
            <div className="text-neutral-500 mt-1">Zero downtime rolling edge cluster deployments with 72h advance notice.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { SupportSLAGuarantee } from "./support-sla-guarantee";

export default function Demo() {
  return (
    <div className="w-full min-h-[250px] flex items-center justify-center p-4 bg-neutral-100 dark:bg-neutral-900">
      <SupportSLAGuarantee />
    </div>
  );
}
`,
  }),

  P("values-culture-manifesto", {
    category: "sections",
    title: "Values Culture Manifesto",
    description: "An architectural engineering principles board articulating rigor, speed, open-source stewardship, and craft.",
    difficulty: "starter",
    subcategory: "culture",
    fingerprint: {
      interactionModel: "values-culture-manifesto-interaction",
      visualModel: "values-culture-manifesto-visual",
      motionModel: "subtle",
      layoutModel: "mosaic-layout",
      semanticPurpose: "values-culture-manifesto-section",
    },
    tags: ["values", "manifesto", "principles", "culture", "philosophy"],
    dependencies: [],
    dna: {
      macrostructure: "mosaic",
      motionLanguage: "none",
      typographyStyle: "serif-display",
      colorStrategy: "muted-earth",
      shapeLanguage: "soft",
      density: "medium",
      genre: "editorial",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function ValuesCultureManifesto({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const principles = [
    { title: "Zero Dependency Invariants", body: "Third-party runtime bloat is a liability. Every primitive compiles to clean, vanilla standard React." },
    { title: "Deterministic Verification", body: "If it cannot be type-checked, schema-validated, or automatically tested, it does not ship." },
    { title: "Local Ownership", body: "Engineers should own their code. Never surrender styling flexibility to sealed vendor modules." },
  ];

  return (
    <section className={cn("w-full py-16 px-4 max-w-5xl mx-auto", className)} {...props}>
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-3xl font-serif text-neutral-900 dark:text-neutral-100">Our Engineering Creed</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {principles.map((p) => (
          <div key={p.title} className="p-6 rounded-2xl bg-stone-50 dark:bg-neutral-900 border border-stone-200 dark:border-neutral-800">
            <h3 className="font-serif font-bold text-neutral-900 dark:text-neutral-100">{p.title}</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { ValuesCultureManifesto } from "./values-culture-manifesto";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] flex items-center justify-center p-4 bg-stone-100/40 dark:bg-neutral-950">
      <ValuesCultureManifesto />
    </div>
  );
}
`,
  }),

  P("interactive-faq-filter", {
    category: "sections",
    title: "Interactive FAQ Filter",
    description: "A categorized FAQ accordion with live category filtering and expand-collapse state memory.",
    difficulty: "intermediate",
    subcategory: "faq",
    fingerprint: {
      interactionModel: "interactive-faq-filter-interaction",
      visualModel: "interactive-faq-filter-visual",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "interactive-faq-filter-section",
    },
    tags: ["faq", "filter", "questions", "accordion", "interactive"],
    dependencies: [],
    dna: {
      macrostructure: "stack",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
      shapeLanguage: "rounded",
      density: "medium",
      genre: "minimal",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface FAQItem {
  id: string;
  category: "General" | "Licensing" | "Technical";
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  { id: "1", category: "General", q: "Can I use OpenUI in commercial client projects?", a: "Yes. All 800 items are licensed under permissive MIT." },
  { id: "2", category: "Technical", q: "How does OpenUI differ from npm component libraries?", a: "OpenUI materializes code straight into your src folder with zero runtime dependency lock-in." },
  { id: "3", category: "Licensing", q: "Are there any hidden seat fees or cloud subscriptions?", a: "None. The open-source registry is 100% free and open." },
];

export function InteractiveFAQFilter({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [selected, setSelected] = React.useState("All");
  const [openId, setOpenId] = React.useState<string | null>("1");

  const filtered = selected === "All" ? FAQS : FAQS.filter((f) => f.category === selected);

  return (
    <section className={cn("w-full py-16 px-4 max-w-3xl mx-auto", className)} {...props}>
      <h2 className="text-2xl font-bold text-center text-neutral-900 dark:text-neutral-100 mb-6">Frequently Asked Questions</h2>
      <div className="flex justify-center gap-2 mb-6 text-xs">
        {["All", "General", "Technical", "Licensing"].map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setSelected(c)}
            className={cn(
              "px-3 py-1 rounded-full",
              selected === c ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div key={item.id} className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 bg-white dark:bg-neutral-950">
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="w-full flex justify-between items-center text-left text-sm font-semibold text-neutral-900 dark:text-neutral-100"
              >
                <span>{item.q}</span>
                <span>{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 pt-2 border-t border-neutral-100 dark:border-neutral-900">
                  {item.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { InteractiveFAQFilter } from "./interactive-faq-filter";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900/40">
      <InteractiveFAQFilter />
    </div>
  );
}
`,
  }),

  P("migration-guide-matrix", {
    category: "sections",
    title: "Migration Guide Matrix",
    description: "A transition mapping guide comparing old conventions with modern OpenUI patterns.",
    difficulty: "starter",
    subcategory: "guides",
    fingerprint: {
      interactionModel: "migration-guide-matrix-interaction",
      visualModel: "migration-guide-matrix-visual",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "migration-guide-matrix-section",
    },
    tags: ["migration", "guide", "matrix", "upgrade", "reference"],
    dependencies: [],
    dna: {
      macrostructure: "stack",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "monochrome",
      shapeLanguage: "sharp",
      density: "compact",
      genre: "technical",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function MigrationGuideMatrix({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const steps = [
    { from: "npm install @legacy/ui", to: "pnpm dlx openui add <component>" },
    { from: "Theme Context Provider", to: "Native CSS variables in globals.css" },
    { from: "Client-only Wrappers", to: "React 19 Server Actions compatible" },
  ];

  return (
    <section className={cn("w-full py-16 px-4 max-w-4xl mx-auto font-mono text-xs", className)} {...props}>
      <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 mb-6">Migration Path</h3>
      <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden bg-white dark:bg-neutral-950">
        {steps.map((s, idx) => (
          <div key={idx} className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-rose-500">✕ Legacy: {s.from}</div>
            <div className="text-emerald-500 font-bold">✓ Modern: {s.to}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { MigrationGuideMatrix } from "./migration-guide-matrix";

export default function Demo() {
  return (
    <div className="w-full min-h-[250px] flex items-center justify-center p-4 bg-neutral-100 dark:bg-neutral-900">
      <MigrationGuideMatrix />
    </div>
  );
}
`,
  }),

  P("beta-waitlist-card", {
    category: "sections",
    title: "Beta Waitlist Card",
    description: "An early-access invite card with real-time waitlist counter and instant confirmation state.",
    difficulty: "starter",
    subcategory: "forms",
    fingerprint: {
      interactionModel: "beta-waitlist-card-interaction",
      visualModel: "beta-waitlist-card-visual",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "beta-waitlist-card-section",
    },
    tags: ["waitlist", "beta", "invite", "signup", "form"],
    dependencies: [],
    dna: {
      macrostructure: "stack",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
      shapeLanguage: "rounded",
      density: "compact",
      genre: "minimal",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function BetaWaitlistCard({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [email, setEmail] = React.useState("");
  const [joined, setJoined] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes("@")) setJoined(true);
  };

  return (
    <section className={cn("w-full py-16 px-4 max-w-lg mx-auto text-center", className)} {...props}>
      <div className="border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 bg-white dark:bg-neutral-950 shadow-sm">
        <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">Join Private Registry Beta</h3>
        <p className="text-xs text-neutral-500 mt-2">Get access to private mirror syncs and enterprise teams features.</p>

        {!joined ? (
          <form onSubmit={handleSubmit} className="mt-6 flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              className="flex-1 px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
            />
            <button type="submit" className="px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-600 text-white">
              Join Waitlist
            </button>
          </form>
        ) : (
          <div className="mt-6 p-3 rounded bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
            You're #1,492 on the waitlist! We will be in touch soon.
          </div>
        )}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { BetaWaitlistCard } from "./beta-waitlist-card";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900/40">
      <BetaWaitlistCard />
    </div>
  );
}
`,
  }),

  P("feature-deep-dive-split", {
    category: "sections",
    title: "Feature Deep Dive Split",
    description: "A two-sided feature spotlight pairing technical bullet points with interactive code mockups.",
    difficulty: "intermediate",
    subcategory: "feature",
    fingerprint: {
      interactionModel: "feature-deep-dive-split-interaction",
      visualModel: "feature-deep-dive-split-visual",
      motionModel: "subtle",
      layoutModel: "split-layout",
      semanticPurpose: "feature-deep-dive-split-section",
    },
    tags: ["feature", "deep-dive", "split", "spotlight", "specs"],
    dependencies: [],
    dna: {
      macrostructure: "split",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
      shapeLanguage: "rounded",
      density: "medium",
      genre: "minimal",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function FeatureDeepDiveSplit({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-5xl mx-auto", className)} {...props}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-6">
          <span className="text-xs font-mono uppercase text-emerald-500 font-bold">Deep Dive</span>
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mt-2">
            Zero-Runtime Design Invariants
          </h2>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-3 leading-relaxed">
            Every component declares strict constraints for typography, color strategy, and macrostructure to guarantee visual harmony across large teams.
          </p>
        </div>
        <div className="md:col-span-6 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 font-mono text-xs text-neutral-600 dark:text-neutral-300">
          [Verified Design DNA: 100% Type-Safe Contracts]
        </div>
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { FeatureDeepDiveSplit } from "./feature-deep-dive-split";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] flex items-center justify-center p-4 bg-white dark:bg-neutral-950">
      <FeatureDeepDiveSplit />
    </div>
  );
}
`,
  }),

  P("hardware-edge-specs", {
    category: "sections",
    title: "Hardware Edge Specs",
    description: "A bare-metal computing specifications overview showing NVMe IOPS, RAM allocation, and CPU isolates.",
    difficulty: "starter",
    subcategory: "hardware",
    fingerprint: {
      interactionModel: "hardware-edge-specs-interaction",
      visualModel: "hardware-edge-specs-visual",
      motionModel: "subtle",
      layoutModel: "mosaic-layout",
      semanticPurpose: "hardware-edge-specs-section",
    },
    tags: ["hardware", "specs", "bare-metal", "edge", "datacenter"],
    dependencies: [],
    dna: {
      macrostructure: "mosaic",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "monochrome",
      shapeLanguage: "sharp",
      density: "compact",
      genre: "industrial",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function HardwareEdgeSpecs({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const specs = [
    { label: "NVMe Write IOPS", val: "1.2M IOPS" },
    { label: "Memory Isolation", val: "128MB / V8 isolate" },
    { label: "Network Bandwidth", val: "100 Gbps per cluster" },
    { label: "Cold Start Latency", val: "0.4 ms" },
  ];

  return (
    <section className={cn("w-full py-16 px-4 max-w-5xl mx-auto font-mono", className)} {...props}>
      <h3 className="text-xs uppercase tracking-widest text-neutral-400 font-bold mb-6">Cluster Hardware</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {specs.map((s) => (
          <div key={s.label} className="p-4 border border-neutral-800 bg-neutral-950 text-neutral-100 rounded">
            <div className="text-[10px] text-neutral-500 uppercase">{s.label}</div>
            <div className="text-xl font-bold mt-1">{s.val}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { HardwareEdgeSpecs } from "./hardware-edge-specs";

export default function Demo() {
  return (
    <div className="w-full min-h-[250px] flex items-center justify-center p-4 bg-neutral-900">
      <HardwareEdgeSpecs />
    </div>
  );
}
`,
  }),

  P("newsletter-curated-digest", {
    category: "sections",
    title: "Newsletter Curated Digest",
    description: "A subscription card offering weekly design engineering breakdowns and curated component patterns.",
    difficulty: "starter",
    subcategory: "newsletter",
    fingerprint: {
      interactionModel: "newsletter-curated-digest-interaction",
      visualModel: "newsletter-curated-digest-visual",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "newsletter-curated-digest-section",
    },
    tags: ["newsletter", "digest", "subscribe", "curated", "articles"],
    dependencies: [],
    dna: {
      macrostructure: "stack",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
      shapeLanguage: "rounded",
      density: "medium",
      genre: "minimal",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function NewsletterCuratedDigest({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("w-full py-16 px-4 max-w-xl mx-auto text-center", className)} {...props}>
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">The Design Engineer Digest</h2>
      <p className="text-xs text-neutral-500 mt-2">Join 12,000+ UI architects receiving our bi-weekly deep dive.</p>
      <div className="mt-6 flex gap-2 max-w-md mx-auto">
        <input
          type="email"
          placeholder="your.email@work.com"
          className="flex-1 px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
        />
        <button type="button" className="px-4 py-2 rounded-lg text-xs font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
          Subscribe
        </button>
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { NewsletterCuratedDigest } from "./newsletter-curated-digest";

export default function Demo() {
  return (
    <div className="w-full min-h-[250px] flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900/40">
      <NewsletterCuratedDigest />
    </div>
  );
}
`,
  }),

  P("interactive-color-token-previewer", {
    category: "sections",
    title: "Interactive Color Token Previewer",
    description: "An interactive color swatching utility allowing developers to visualize theme token overrides.",
    difficulty: "intermediate",
    subcategory: "design-system",
    fingerprint: {
      interactionModel: "interactive-color-token-previewer-interaction",
      visualModel: "interactive-color-token-previewer-visual",
      motionModel: "subtle",
      layoutModel: "mosaic-layout",
      semanticPurpose: "interactive-color-token-previewer-section",
    },
    tags: ["colors", "tokens", "previewer", "theme", "design-system"],
    dependencies: [],
    dna: {
      macrostructure: "mosaic",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
      shapeLanguage: "sharp",
      density: "compact",
      genre: "swiss",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function InteractiveColorTokenPreviewer({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [activeToken, setActiveToken] = React.useState("emerald");

  return (
    <section className={cn("w-full py-16 px-4 max-w-3xl mx-auto text-center font-mono text-xs", className)} {...props}>
      <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 mb-4">Color Strategy Tokens</h3>
      <div className="flex justify-center gap-3 mb-6">
        {["emerald", "indigo", "rose", "amber"].map((token) => (
          <button
            key={token}
            type="button"
            onClick={() => setActiveToken(token)}
            className={cn("px-3 py-1 rounded border", activeToken === token ? "border-black dark:border-white font-bold" : "border-neutral-300 dark:border-neutral-700")}
          >
            {token}
          </button>
        ))}
      </div>
      <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
        Selected active accent: <span className="font-bold">{activeToken}</span>
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { InteractiveColorTokenPreviewer } from "./interactive-color-token-previewer";

export default function Demo() {
  return (
    <div className="w-full min-h-[250px] flex items-center justify-center p-4 bg-neutral-100 dark:bg-neutral-900">
      <InteractiveColorTokenPreviewer />
    </div>
  );
}
`,
  }),

  P("compliance-cert-showcase", {
    category: "sections",
    title: "Compliance Cert Showcase",
    description: "A trust badge showcase presenting verified audit credentials, security seals, and data compliance marks.",
    difficulty: "starter",
    subcategory: "trust",
    fingerprint: {
      interactionModel: "compliance-cert-showcase-interaction",
      visualModel: "compliance-cert-showcase-visual",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "compliance-cert-showcase-section",
    },
    tags: ["compliance", "trust", "certifications", "security", "badges"],
    dependencies: [],
    dna: {
      macrostructure: "stack",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
      shapeLanguage: "rounded",
      density: "compact",
      genre: "industrial",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function ComplianceCertShowcase({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const certs = ["SOC 2 Type II", "ISO / IEC 27001", "HIPAA Compliant", "GDPR Ready"];

  return (
    <section className={cn("w-full py-12 px-4 max-w-4xl mx-auto text-center", className)} {...props}>
      <div className="flex flex-wrap justify-center gap-4">
        {certs.map((c) => (
          <div key={c} className="px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
            ✓ {c}
          </div>
        ))}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { ComplianceCertShowcase } from "./compliance-cert-showcase";

export default function Demo() {
  return (
    <div className="w-full min-h-[200px] flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900/40">
      <ComplianceCertShowcase />
    </div>
  );
}
`,
  }),

  P("app-feature-carousel-strip", {
    category: "sections",
    title: "App Feature Carousel Strip",
    description: "A horizontally scrollable feature card carousel highlighting key workflow moments.",
    difficulty: "intermediate",
    subcategory: "feature",
    fingerprint: {
      interactionModel: "app-feature-carousel-strip-interaction",
      visualModel: "app-feature-carousel-strip-visual",
      motionModel: "subtle",
      layoutModel: "rail-layout",
      semanticPurpose: "app-feature-carousel-strip-section",
    },
    tags: ["carousel", "strip", "features", "workflow", "scroll"],
    dependencies: [],
    dna: {
      macrostructure: "rail",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
      shapeLanguage: "rounded",
      density: "medium",
      genre: "minimal",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function AppFeatureCarouselStrip({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const items = [
    { title: "One-Click Scaffolding", desc: "Materialize code in 100ms" },
    { title: "Design DNA Invariants", desc: "Mathematical layout bounds" },
    { title: "Zero Dependency Core", desc: "Zero runtime npm bloat" },
  ];

  return (
    <section className={cn("w-full py-16 px-4 max-w-5xl mx-auto", className)} {...props}>
      <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">Workflow Accelerators</h3>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {items.map((it) => (
          <div key={it.title} className="min-w-[260px] p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">{it.title}</h4>
            <p className="text-xs text-neutral-500 mt-1">{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { AppFeatureCarouselStrip } from "./app-feature-carousel-strip";

export default function Demo() {
  return (
    <div className="w-full min-h-[250px] flex items-center justify-center p-4 bg-neutral-100 dark:bg-neutral-900">
      <AppFeatureCarouselStrip />
    </div>
  );
}
`,
  }),
];

import type { ResourceDefinition } from "../lib/definitions.js";

const P = (name: string, definition: Omit<ResourceDefinition, "name">): ResourceDefinition => ({
  name,
  ...definition,
});

export default [
  P("support-ticket-dispatcher", {
    category: "sections",
    title: "Support Ticket Dispatcher",
    description: "A support request section pairing support channel cards with a quick message form.",
    difficulty: "intermediate",
    subcategory: "support",
    fingerprint: {
      interactionModel: "support-ticket-dispatcher-interaction",
      visualModel: "support-ticket-dispatcher-visual",
      motionModel: "subtle",
      layoutModel: "split-layout",
      semanticPurpose: "support-ticket-dispatcher-section",
    },
    tags: ["contact", "support", "helpdesk", "form", "tickets"],
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

export function SupportTicketDispatcher({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [submitted, setSubmitted] = React.useState(false);

  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-5xl mx-auto", className)} {...props}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-5">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold">
            Assistance
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-1">
            Talk to engineering support
          </h2>
          <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
            Our core team responds directly to technical inquiries, architecture reviews, and registry bugs.
          </p>
          <div className="mt-6 space-y-2 text-xs font-mono text-neutral-600 dark:text-neutral-400">
            <div>✉ support@openui.dev</div>
            <div>⚡ Discord: #registry-support</div>
          </div>
        </div>

        <div className="md:col-span-7 bg-white dark:bg-neutral-950 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800">
          {!submitted ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">Email</label>
                <input
                  type="email"
                  required
                  placeholder="engineer@company.com"
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">Topic</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Design DNA schema question"
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-semibold"
              >
                Send Request
              </button>
            </form>
          ) : (
            <div className="text-center py-8 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              Thank you! An engineer will reply within 4 hours.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { SupportTicketDispatcher } from "./support-ticket-dispatcher";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900/40">
      <SupportTicketDispatcher />
    </div>
  );
}
`,
  }),

  P("security-vulnerability-bounty", {
    category: "sections",
    title: "Security Vulnerability Bounty",
    description: "A coordinated vulnerability disclosure policy banner outlining reward tiers and reporting guidelines.",
    difficulty: "starter",
    subcategory: "security",
    fingerprint: {
      interactionModel: "security-vulnerability-bounty-interaction",
      visualModel: "security-vulnerability-bounty-visual",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "security-vulnerability-bounty-section",
    },
    tags: ["security", "bounty", "vulnerability", "disclosure", "trust"],
    dependencies: [],
    dna: {
      macrostructure: "stack",
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

export function SecurityVulnerabilityBounty({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const tiers = [
    { severity: "Critical (RCE / Sandbox Escape)", reward: "$5,000" },
    { severity: "High (Auth Bypass / Schema Poisoning)", reward: "$2,500" },
    { severity: "Medium (State Injection)", reward: "$1,000" },
  ];

  return (
    <section className={cn("w-full py-16 px-4 max-w-4xl mx-auto font-mono text-xs", className)} {...props}>
      <div className="border border-neutral-800 rounded-xl p-6 bg-neutral-950 text-neutral-100">
        <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-400">Bug Bounty Program</h3>
        <p className="text-neutral-400 mt-1">We reward responsible security disclosures under our coordinated vulnerability program.</p>
        <div className="divide-y divide-neutral-800 mt-6">
          {tiers.map((t) => (
            <div key={t.severity} className="py-3 flex justify-between items-center">
              <span>{t.severity}</span>
              <span className="text-emerald-400 font-bold">{t.reward}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { SecurityVulnerabilityBounty } from "./security-vulnerability-bounty";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] flex items-center justify-center p-4 bg-neutral-900">
      <SecurityVulnerabilityBounty />
    </div>
  );
}
`,
  }),

  P("system-metrics-bento", {
    category: "sections",
    title: "System Metrics Bento",
    description: "A bento-style telemetry board displaying memory usage, throughput, and cluster worker health.",
    difficulty: "intermediate",
    subcategory: "telemetry",
    fingerprint: {
      interactionModel: "system-metrics-bento-interaction",
      visualModel: "system-metrics-bento-visual",
      motionModel: "subtle",
      layoutModel: "mosaic-layout",
      semanticPurpose: "system-metrics-bento-section",
    },
    tags: ["bento", "metrics", "telemetry", "system", "monitoring"],
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

export function SystemMetricsBento({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("w-full py-16 px-4 max-w-5xl mx-auto font-mono text-xs", className)} {...props}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
          <div className="text-neutral-400 uppercase text-[10px]">Active Edge Workers</div>
          <div className="text-3xl font-bold mt-2 text-neutral-900 dark:text-neutral-100">4,289</div>
          <div className="text-emerald-500 mt-1">100% healthy</div>
        </div>
        <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
          <div className="text-neutral-400 uppercase text-[10px]">p99 Request Latency</div>
          <div className="text-3xl font-bold mt-2 text-neutral-900 dark:text-neutral-100">1.2 ms</div>
          <div className="text-emerald-500 mt-1">-14% vs avg</div>
        </div>
        <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
          <div className="text-neutral-400 uppercase text-[10px]">Memory Pressure</div>
          <div className="text-3xl font-bold mt-2 text-neutral-900 dark:text-neutral-100">28.4%</div>
          <div className="text-neutral-500 mt-1">Nominal isolate range</div>
        </div>
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { SystemMetricsBento } from "./system-metrics-bento";

export default function Demo() {
  return (
    <div className="w-full min-h-[250px] flex items-center justify-center p-4 bg-neutral-100 dark:bg-neutral-900">
      <SystemMetricsBento />
    </div>
  );
}
`,
  }),

  P("customer-quote-marquee", {
    category: "sections",
    title: "Customer Quote Marquee",
    description: "A continuous sliding ribbon of authentic customer reviews and developer commendations.",
    difficulty: "starter",
    subcategory: "testimonials",
    fingerprint: {
      interactionModel: "customer-quote-marquee-interaction",
      visualModel: "customer-quote-marquee-visual",
      motionModel: "subtle",
      layoutModel: "full-bleed-layout",
      semanticPurpose: "customer-quote-marquee-section",
    },
    tags: ["marquee", "quotes", "reviews", "social-proof", "ribbon"],
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

export function CustomerQuoteMarquee({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const quotes = [
    "“The single cleanest registry architecture I have ever seen.”",
    "“We dropped 300kb from our initial bundle in one afternoon.”",
    "“Design DNA tokens transformed how we ship design reviews.”",
  ];

  return (
    <section className={cn("w-full py-8 border-y border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden", className)} {...props}>
      <div className="flex justify-around gap-8 text-xs font-serif italic text-neutral-700 dark:text-neutral-300 max-w-5xl mx-auto px-4">
        {quotes.map((q, i) => (
          <span key={i} className="truncate">{q}</span>
        ))}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { CustomerQuoteMarquee } from "./customer-quote-marquee";

export default function Demo() {
  return (
    <div className="w-full min-h-[150px] flex items-center justify-center bg-stone-50 dark:bg-neutral-950">
      <CustomerQuoteMarquee />
    </div>
  );
}
`,
  }),

  P("interactive-audit-runner", {
    category: "sections",
    title: "Interactive Audit Runner",
    description: "A simulated accessibility and schema verification runner displaying live diagnostic ticks.",
    difficulty: "intermediate",
    subcategory: "verification",
    fingerprint: {
      interactionModel: "interactive-audit-runner-interaction",
      visualModel: "interactive-audit-runner-visual",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "interactive-audit-runner-section",
    },
    tags: ["audit", "runner", "verification", "diagnostics", "interactive"],
    dependencies: [],
    dna: {
      macrostructure: "stack",
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

export function InteractiveAuditRunner({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [running, setRunning] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const runAudit = () => {
    setRunning(true);
    setDone(false);
    setTimeout(() => {
      setRunning(false);
      setDone(true);
    }, 1200);
  };

  return (
    <section className={cn("w-full py-16 px-4 max-w-3xl mx-auto text-center font-mono text-xs", className)} {...props}>
      <div className="border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 bg-white dark:bg-neutral-950">
        <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Live Verification Pipeline</h3>
        <p className="text-neutral-500 mt-1">Run continuous conformance tests against 800 catalog resources.</p>

        <button
          type="button"
          onClick={runAudit}
          disabled={running}
          className="mt-6 px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold disabled:opacity-50"
        >
          {running ? "Analyzing 800 manifests..." : "Execute Automated Audit"}
        </button>

        {done && (
          <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded">
            ✓ 800 / 800 resources verified. Zero schema violations.
          </div>
        )}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { InteractiveAuditRunner } from "./interactive-audit-runner";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900/40">
      <InteractiveAuditRunner />
    </div>
  );
}
`,
  }),

  P("developer-stack-integration", {
    category: "sections",
    title: "Developer Stack Integration",
    description: "An ecosystem compatibility grid showing native integration with Next.js, Vite, Tailwind v4, and React 19.",
    difficulty: "starter",
    subcategory: "ecosystem",
    fingerprint: {
      interactionModel: "developer-stack-integration-interaction",
      visualModel: "developer-stack-integration-visual",
      motionModel: "subtle",
      layoutModel: "mosaic-layout",
      semanticPurpose: "developer-stack-integration-section",
    },
    tags: ["stack", "integration", "nextjs", "vite", "tailwind"],
    dependencies: [],
    dna: {
      macrostructure: "mosaic",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
      shapeLanguage: "rounded",
      density: "compact",
      genre: "minimal",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function DeveloperStackIntegration({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const frameworks = [
    { name: "Next.js 15+", status: "App Router Native" },
    { name: "Vite 6+", status: "HMR Optimized" },
    { name: "Tailwind CSS v4", status: "Token Compatible" },
    { name: "TypeScript 5.8+", status: "Strict Zero-Any" },
  ];

  return (
    <section className={cn("w-full py-16 px-4 max-w-4xl mx-auto", className)} {...props}>
      <h3 className="text-xl font-bold text-center text-neutral-900 dark:text-neutral-100 mb-8">
        Works with your existing framework
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {frameworks.map((f) => (
          <div key={f.name} className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-center">
            <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100">{f.name}</div>
            <div className="text-[10px] font-mono text-neutral-500 mt-1">{f.status}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { DeveloperStackIntegration } from "./developer-stack-integration";

export default function Demo() {
  return (
    <div className="w-full min-h-[250px] flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900/50">
      <DeveloperStackIntegration />
    </div>
  );
}
`,
  }),

  P("hero-split-terminal", {
    category: "sections",
    title: "Hero Split Terminal",
    description: "A high-conversion landing hero pairing an editorial headline with an interactive installation terminal.",
    difficulty: "intermediate",
    subcategory: "hero",
    fingerprint: {
      interactionModel: "hero-split-terminal-interaction",
      visualModel: "hero-split-terminal-visual",
      motionModel: "subtle",
      layoutModel: "split-layout",
      semanticPurpose: "hero-split-terminal-section",
    },
    tags: ["hero", "split", "terminal", "cta", "landing"],
    dependencies: [],
    dna: {
      macrostructure: "split",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
      shapeLanguage: "sharp",
      density: "medium",
      genre: "technical",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function HeroSplitTerminal({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("w-full py-20 px-4 md:px-8 max-w-6xl mx-auto", className)} {...props}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6">
          <span className="text-xs font-mono uppercase text-emerald-500 font-bold">OpenUI v2.4</span>
          <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white mt-2 leading-tight">
            Interfaces should have a fingerprint.
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-4 leading-relaxed">
            The decentralized design system registry. 800 certified open-source primitives installable straight to your src/ with deterministic schemas.
          </p>
          <div className="mt-6 flex gap-3">
            <button type="button" className="px-5 py-2.5 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs font-bold">
              Explore 800 Items
            </button>
          </div>
        </div>

        <div className="lg:col-span-6 bg-neutral-950 text-neutral-100 p-5 rounded-xl border border-neutral-800 font-mono text-xs">
          <div className="text-neutral-500 mb-2"># Install your first verified primitive</div>
          <div className="text-emerald-400 font-bold">$ pnpm dlx openui@latest add hero-split-terminal</div>
          <div className="text-neutral-400 mt-2">✓ Verified 0 runtime dependencies</div>
          <div className="text-neutral-400">✓ Materialized in src/components/sections/</div>
        </div>
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { HeroSplitTerminal } from "./hero-split-terminal";

export default function Demo() {
  return (
    <div className="w-full min-h-[400px] flex items-center justify-center p-4 bg-white dark:bg-neutral-950">
      <HeroSplitTerminal />
    </div>
  );
}
`,
  }),

  P("pricing-enterprise-inquiry", {
    category: "sections",
    title: "Pricing Enterprise Inquiry",
    description: "A specialized contact banner tailored for enterprise buyers requiring custom VPC deployments and SOC2 packages.",
    difficulty: "starter",
    subcategory: "pricing",
    fingerprint: {
      interactionModel: "pricing-enterprise-inquiry-interaction",
      visualModel: "pricing-enterprise-inquiry-visual",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "pricing-enterprise-inquiry-section",
    },
    tags: ["enterprise", "inquiry", "pricing", "custom", "sla"],
    dependencies: [],
    dna: {
      macrostructure: "stack",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
      shapeLanguage: "rounded",
      density: "compact",
      genre: "minimal",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function PricingEnterpriseInquiry({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("w-full py-16 px-4 max-w-4xl mx-auto text-center", className)} {...props}>
      <div className="border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 bg-neutral-50 dark:bg-neutral-900/50">
        <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">Need a private registry mirror?</h3>
        <p className="text-xs text-neutral-500 mt-2 max-w-xl mx-auto">
          We offer on-premises air-gapped registry distribution with custom security assertions for regulated industries.
        </p>
        <button type="button" className="mt-6 px-6 py-2.5 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs font-semibold">
          Contact Enterprise Sales →
        </button>
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { PricingEnterpriseInquiry } from "./pricing-enterprise-inquiry";

export default function Demo() {
  return (
    <div className="w-full min-h-[250px] flex items-center justify-center p-4 bg-white dark:bg-neutral-950">
      <PricingEnterpriseInquiry />
    </div>
  );
}
`,
  }),

  P("career-benefits-perks", {
    category: "sections",
    title: "Career Benefits Perks",
    description: "An employee value proposition grid displaying health coverage, remote stipends, and learning budgets.",
    difficulty: "starter",
    subcategory: "careers",
    fingerprint: {
      interactionModel: "career-benefits-perks-interaction",
      visualModel: "career-benefits-perks-visual",
      motionModel: "subtle",
      layoutModel: "mosaic-layout",
      semanticPurpose: "career-benefits-perks-section",
    },
    tags: ["careers", "benefits", "perks", "culture", "hiring"],
    dependencies: [],
    dna: {
      macrostructure: "mosaic",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
      shapeLanguage: "rounded",
      density: "medium",
      genre: "minimal",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function CareerBenefitsPerks({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const perks = [
    { title: "100% Remote First", desc: "Work from anywhere in the world on asynchronous timelines." },
    { title: "$4,000 Setup Stipend", desc: "Equip your workspace with the hardware and monitors you need." },
    { title: "Continuous Learning", desc: "$2,500 annual budget for books, courses, and conferences." },
    { title: "Transparent Equity", desc: "Clear stock option schedules with 10-year exercise windows." },
  ];

  return (
    <section className={cn("w-full py-16 px-4 max-w-5xl mx-auto", className)} {...props}>
      <h3 className="text-2xl font-bold text-center text-neutral-900 dark:text-white mb-8">Life at OpenUI</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {perks.map((p) => (
          <div key={p.title} className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">{p.title}</h4>
            <p className="text-xs text-neutral-500 mt-2 leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { CareerBenefitsPerks } from "./career-benefits-perks";

export default function Demo() {
  return (
    <div className="w-full min-h-[250px] flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900/40">
      <CareerBenefitsPerks />
    </div>
  );
}
`,
  }),

  P("event-speaker-spotlight", {
    category: "sections",
    title: "Event Speaker Spotlight",
    description: "A showcase cards section highlighting conference keynote speakers and presentation summaries.",
    difficulty: "intermediate",
    subcategory: "events",
    fingerprint: {
      interactionModel: "event-speaker-spotlight-interaction",
      visualModel: "event-speaker-spotlight-visual",
      motionModel: "subtle",
      layoutModel: "mosaic-layout",
      semanticPurpose: "event-speaker-spotlight-section",
    },
    tags: ["speakers", "event", "conference", "keynote", "spotlight"],
    dependencies: [],
    dna: {
      macrostructure: "mosaic",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
      shapeLanguage: "sharp",
      density: "medium",
      genre: "swiss",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function EventSpeakerSpotlight({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const speakers = [
    { name: "Cyril Chris", title: "Keynote: Zero Runtime Overhead", org: "OpenUI" },
    { name: "Elena Rostova", title: "Math of Design Tokens", org: "Design Rigor" },
    { name: "Marcus Vance", title: "Deterministic Component Schemas", org: "VerifyLabs" },
  ];

  return (
    <section className={cn("w-full py-16 px-4 max-w-5xl mx-auto", className)} {...props}>
      <h3 className="text-2xl font-bold text-center text-neutral-900 dark:text-white mb-8">Featured Speakers</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {speakers.map((s) => (
          <div key={s.name} className="p-6 rounded-xl border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-950">
            <h4 className="text-base font-bold text-neutral-900 dark:text-white">{s.name}</h4>
            <div className="text-xs font-mono text-neutral-400">{s.org}</div>
            <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300 mt-4">{s.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { EventSpeakerSpotlight } from "./event-speaker-spotlight";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] flex items-center justify-center p-4 bg-neutral-100 dark:bg-neutral-900">
      <EventSpeakerSpotlight />
    </div>
  );
}
`,
  }),

  P("documentation-quick-links", {
    category: "sections",
    title: "Documentation Quick Links",
    description: "A fast navigation strip offering direct deep links into foundational documentation topics.",
    difficulty: "starter",
    subcategory: "documentation",
    fingerprint: {
      interactionModel: "documentation-quick-links-interaction",
      visualModel: "documentation-quick-links-visual",
      motionModel: "subtle",
      layoutModel: "rail-layout",
      semanticPurpose: "documentation-quick-links-section",
    },
    tags: ["docs", "quick-links", "navigation", "guides", "api"],
    dependencies: [],
    dna: {
      macrostructure: "rail",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
      shapeLanguage: "rounded",
      density: "compact",
      genre: "minimal",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function DocumentationQuickLinks({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const links = ["Getting Started", "Design DNA", "CLI Reference", "Schema Spec", "FAQ"];

  return (
    <section className={cn("w-full py-8 px-4 max-w-4xl mx-auto", className)} {...props}>
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
        {links.map((l) => (
          <a
            key={l}
            href="#doc"
            className="px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 font-medium text-neutral-800 dark:text-neutral-200 hover:border-emerald-500 transition-colors"
          >
            {l} →
          </a>
        ))}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { DocumentationQuickLinks } from "./documentation-quick-links";

export default function Demo() {
  return (
    <div className="w-full min-h-[150px] flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900/50">
      <DocumentationQuickLinks />
    </div>
  );
}
`,
  }),

  P("customer-satisfaction-metric", {
    category: "sections",
    title: "Customer Satisfaction Metric",
    description: "A single bold CSAT metric display highlighting developer happiness and net promoter ratings.",
    difficulty: "starter",
    subcategory: "stats",
    fingerprint: {
      interactionModel: "customer-satisfaction-metric-interaction",
      visualModel: "customer-satisfaction-metric-visual",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "customer-satisfaction-metric-section",
    },
    tags: ["csat", "metric", "satisfaction", "stats", "telemetry"],
    dependencies: [],
    dna: {
      macrostructure: "stack",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
      shapeLanguage: "sharp",
      density: "compact",
      genre: "brutalist",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function CustomerSatisfactionMetric({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("w-full py-16 px-4 max-w-3xl mx-auto text-center font-mono", className)} {...props}>
      <div className="border-4 border-neutral-900 dark:border-neutral-100 p-8 bg-white dark:bg-neutral-950">
        <div className="text-6xl md:text-8xl font-black text-neutral-900 dark:text-neutral-100">98.4%</div>
        <div className="text-xs uppercase tracking-widest text-neutral-500 mt-2">Customer Satisfaction Score</div>
        <div className="text-[11px] text-neutral-400 mt-1">Surveyed across 1,200 verified enterprise teams</div>
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { CustomerSatisfactionMetric } from "./customer-satisfaction-metric";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] flex items-center justify-center p-4 bg-neutral-100 dark:bg-neutral-900">
      <CustomerSatisfactionMetric />
    </div>
  );
}
`,
  }),

  P("download-cli-installer", {
    category: "sections",
    title: "Download CLI Installer",
    description: "A command-line installation strip featuring curl, brew, and npm install tabs.",
    difficulty: "starter",
    subcategory: "developer",
    fingerprint: {
      interactionModel: "download-cli-installer-interaction",
      visualModel: "download-cli-installer-visual",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "download-cli-installer-section",
    },
    tags: ["installer", "cli", "download", "curl", "homebrew"],
    dependencies: [],
    dna: {
      macrostructure: "stack",
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

export function DownloadCliInstaller({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("w-full py-12 px-4 max-w-xl mx-auto font-mono text-xs", className)} {...props}>
      <div className="p-4 rounded-xl bg-neutral-950 text-neutral-100 border border-neutral-800 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-neutral-500">$</span>
          <span className="text-emerald-400">curl -fsSL https://openui.dev/install.sh | sh</span>
        </div>
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { DownloadCliInstaller } from "./download-cli-installer";

export default function Demo() {
  return (
    <div className="w-full min-h-[200px] flex items-center justify-center p-4 bg-neutral-900">
      <DownloadCliInstaller />
    </div>
  );
}
`,
  }),

  P("interactive-theme-toggle-bar", {
    category: "sections",
    title: "Interactive Theme Toggle Bar",
    description: "A lightweight presentation strip showcasing light, dark, and system color mode switching.",
    difficulty: "starter",
    subcategory: "theme",
    fingerprint: {
      interactionModel: "interactive-theme-toggle-bar-interaction",
      visualModel: "interactive-theme-toggle-bar-visual",
      motionModel: "subtle",
      layoutModel: "full-bleed-layout",
      semanticPurpose: "interactive-theme-toggle-bar-section",
    },
    tags: ["theme", "toggle", "darkmode", "lightmode", "switcher"],
    dependencies: [],
    dna: {
      macrostructure: "full-bleed",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
      shapeLanguage: "rounded",
      density: "compact",
      genre: "minimal",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function InteractiveThemeToggleBar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [theme, setTheme] = React.useState<"light" | "dark" | "system">("system");

  return (
    <section className={cn("w-full py-6 px-4 border-y border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 flex justify-center", className)} {...props}>
      <div className="flex gap-2 p-1 rounded-full bg-neutral-100 dark:bg-neutral-900 text-xs font-medium">
        {(["light", "dark", "system"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTheme(t)}
            className={cn(
              "px-3 py-1 rounded-full capitalize transition-colors",
              theme === t ? "bg-white dark:bg-neutral-800 font-bold shadow-xs text-neutral-900 dark:text-white" : "text-neutral-500"
            )}
          >
            {t}
          </button>
        ))}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { InteractiveThemeToggleBar } from "./interactive-theme-toggle-bar";

export default function Demo() {
  return (
    <div className="w-full min-h-[150px] flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
      <InteractiveThemeToggleBar />
    </div>
  );
}
`,
  }),

  P("feature-benefit-checklist", {
    category: "sections",
    title: "Feature Benefit Checklist",
    description: "A bulleted value proposition section highlighting zero-lock-in, strict TypeScript, and accessibility.",
    difficulty: "starter",
    subcategory: "feature",
    fingerprint: {
      interactionModel: "feature-benefit-checklist-interaction",
      visualModel: "feature-benefit-checklist-visual",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "feature-benefit-checklist-section",
    },
    tags: ["checklist", "benefits", "features", "value", "list"],
    dependencies: [],
    dna: {
      macrostructure: "stack",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
      shapeLanguage: "rounded",
      density: "medium",
      genre: "minimal",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function FeatureBenefitChecklist({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const benefits = [
    "No runtime wrappers or sealed black-box dependencies",
    "Full source copy directly in your own repository",
    "100% compliant with WAI-ARIA and screen readers",
    "Automated type-checking across 800 certified items",
  ];

  return (
    <section className={cn("w-full py-16 px-4 max-w-3xl mx-auto", className)} {...props}>
      <h3 className="text-2xl font-bold text-center text-neutral-900 dark:text-white mb-6">Designed for Production</h3>
      <div className="space-y-3">
        {benefits.map((b) => (
          <div key={b} className="flex items-center gap-3 p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-xs">
            <span className="text-emerald-500 font-bold">✓</span>
            <span className="text-neutral-700 dark:text-neutral-300 font-medium">{b}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { FeatureBenefitChecklist } from "./feature-benefit-checklist";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900/40">
      <FeatureBenefitChecklist />
    </div>
  );
}
`,
  }),

  P("legal-compliance-footer", {
    category: "sections",
    title: "Legal Compliance Footer",
    description: "A compact footer containing statutory copyright, license details, and compliance links.",
    difficulty: "starter",
    subcategory: "navigation",
    fingerprint: {
      interactionModel: "legal-compliance-footer-interaction",
      visualModel: "legal-compliance-footer-visual",
      motionModel: "subtle",
      layoutModel: "full-bleed-layout",
      semanticPurpose: "legal-compliance-footer-section",
    },
    tags: ["legal", "footer", "compliance", "copyright", "terms"],
    dependencies: [],
    dna: {
      macrostructure: "full-bleed",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
      shapeLanguage: "sharp",
      density: "compact",
      genre: "minimal",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function LegalComplianceFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn("w-full border-t border-neutral-200 dark:border-neutral-800 py-6 px-4 text-center text-xs text-neutral-500 bg-white dark:bg-neutral-950", className)} {...props}>
      <div>OpenUI Registry • Licensed under MIT • Zero Tracking Cookies</div>
    </footer>
  );
}
`,
    demo: `"use client";

import { LegalComplianceFooter } from "./legal-compliance-footer";

export default function Demo() {
  return (
    <div className="w-full bg-neutral-100 dark:bg-neutral-950 min-h-[100px] flex items-center justify-center">
      <LegalComplianceFooter />
    </div>
  );
}
`,
  }),

  P("open-source-sponsor-tier", {
    category: "sections",
    title: "Open Source Sponsor Tier",
    description: "A funding support section showing GitHub sponsorship levels for individual and enterprise backers.",
    difficulty: "starter",
    subcategory: "community",
    fingerprint: {
      interactionModel: "open-source-sponsor-tier-interaction",
      visualModel: "open-source-sponsor-tier-visual",
      motionModel: "subtle",
      layoutModel: "mosaic-layout",
      semanticPurpose: "open-source-sponsor-tier-section",
    },
    tags: ["sponsors", "open-source", "github", "tiers", "funding"],
    dependencies: [],
    dna: {
      macrostructure: "mosaic",
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

export function OpenSourceSponsorTier({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const tiers = [
    { name: "Backer", price: "$10/mo", desc: "Support ongoing maintenance" },
    { name: "Sponsor", price: "$50/mo", desc: "Logo on README & docs" },
    { name: "Enterprise Partner", price: "$500/mo", desc: "Direct priority issue triage" },
  ];

  return (
    <section className={cn("w-full py-16 px-4 max-w-4xl mx-auto text-center", className)} {...props}>
      <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Support Open Source</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tiers.map((t) => (
          <div key={t.name} className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
            <h4 className="text-sm font-bold text-neutral-900 dark:text-white">{t.name}</h4>
            <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{t.price}</div>
            <p className="text-xs text-neutral-500 mt-2">{t.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { OpenSourceSponsorTier } from "./open-source-sponsor-tier";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900/50">
      <OpenSourceSponsorTier />
    </div>
  );
}
`,
  }),

  P("roadmap-quarterly-milestones", {
    category: "sections",
    title: "Roadmap Quarterly Milestones",
    description: "A forward-looking technical roadmap displaying upcoming milestones across Q1 through Q4.",
    difficulty: "intermediate",
    subcategory: "roadmap",
    fingerprint: {
      interactionModel: "roadmap-quarterly-milestones-interaction",
      visualModel: "roadmap-quarterly-milestones-visual",
      motionModel: "subtle",
      layoutModel: "mosaic-layout",
      semanticPurpose: "roadmap-quarterly-milestones-section",
    },
    tags: ["roadmap", "milestones", "quarters", "planning", "future"],
    dependencies: [],
    dna: {
      macrostructure: "mosaic",
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

export function RoadmapQuarterlyMilestones({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const quarters = [
    { q: "Q1", title: "800 Certified Catalog", status: "Delivered" },
    { q: "Q2", title: "Private Air-gapped Mirroring", status: "In Progress" },
    { q: "Q3", title: "Figma Variables Synchronizer", status: "Planned" },
    { q: "Q4", title: "AI-Assisted Layout Diffing", status: "Planned" },
  ];

  return (
    <section className={cn("w-full py-16 px-4 max-w-5xl mx-auto", className)} {...props}>
      <h3 className="text-2xl font-bold text-center text-neutral-900 dark:text-white mb-8">Technical Roadmap</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quarters.map((item) => (
          <div key={item.q} className="p-5 rounded-xl border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-950">
            <span className="text-xs font-mono font-bold text-neutral-400">{item.q}</span>
            <h4 className="text-sm font-bold text-neutral-900 dark:text-white mt-2">{item.title}</h4>
            <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 mt-3">{item.status}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { RoadmapQuarterlyMilestones } from "./roadmap-quarterly-milestones";

export default function Demo() {
  return (
    <div className="w-full min-h-[250px] flex items-center justify-center p-4 bg-neutral-100 dark:bg-neutral-900">
      <RoadmapQuarterlyMilestones />
    </div>
  );
}
`,
  }),

  P("api-reference-search", {
    category: "sections",
    title: "API Reference Search",
    description: "A fast lookup interface allowing developers to filter endpoints, props, and design tokens.",
    difficulty: "starter",
    subcategory: "documentation",
    fingerprint: {
      interactionModel: "api-reference-search-interaction",
      visualModel: "api-reference-search-visual",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "api-reference-search-section",
    },
    tags: ["api", "search", "reference", "docs", "lookup"],
    dependencies: [],
    dna: {
      macrostructure: "stack",
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

export function ApiReferenceSearch({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [query, setQuery] = React.useState("");

  return (
    <section className={cn("w-full py-12 px-4 max-w-2xl mx-auto font-mono text-xs", className)} {...props}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search API endpoints (e.g. /r/components/button)..."
        className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none"
      />
    </section>
  );
}
`,
    demo: `"use client";

import { ApiReferenceSearch } from "./api-reference-search";

export default function Demo() {
  return (
    <div className="w-full min-h-[200px] flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900/50">
      <ApiReferenceSearch />
    </div>
  );
}
`,
  }),

  P("interactive-rating-collector", {
    category: "sections",
    title: "Interactive Rating Collector",
    description: "An instant user feedback mechanism with star selections and submit validation.",
    difficulty: "starter",
    subcategory: "reviews",
    fingerprint: {
      interactionModel: "interactive-rating-collector-interaction",
      visualModel: "interactive-rating-collector-visual",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "interactive-rating-collector-section",
    },
    tags: ["rating", "feedback", "collector", "reviews", "stars"],
    dependencies: [],
    dna: {
      macrostructure: "stack",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
      shapeLanguage: "rounded",
      density: "compact",
      genre: "playful",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function InteractiveRatingCollector({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [rating, setRating] = React.useState(0);
  const [done, setDone] = React.useState(false);

  return (
    <section className={cn("w-full py-16 px-4 max-w-md mx-auto text-center", className)} {...props}>
      <div className="border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 bg-white dark:bg-neutral-950">
        <h4 className="text-base font-bold text-neutral-900 dark:text-white">How was your experience?</h4>
        {!done ? (
          <div className="mt-4 flex justify-center gap-2 text-2xl cursor-pointer">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => {
                  setRating(star);
                  setDone(true);
                }}
                className={star <= rating ? "text-amber-400" : "text-neutral-300 dark:text-neutral-700"}
              >
                ★
              </button>
            ))}
          </div>
        ) : (
          <div className="text-xs text-emerald-500 font-bold mt-4">Thank you for your rating!</div>
        )}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { InteractiveRatingCollector } from "./interactive-rating-collector";

export default function Demo() {
  return (
    <div className="w-full min-h-[250px] flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900/40">
      <InteractiveRatingCollector />
    </div>
  );
}
`,
  }),

  P("hardware-accelerated-banner", {
    category: "sections",
    title: "Hardware Accelerated Banner",
    description: "A high-performance technical callout banner emphasizing GPU composition and 120fps animations.",
    difficulty: "starter",
    subcategory: "hardware",
    fingerprint: {
      interactionModel: "hardware-accelerated-banner-interaction",
      visualModel: "hardware-accelerated-banner-visual",
      motionModel: "subtle",
      layoutModel: "full-bleed-layout",
      semanticPurpose: "hardware-accelerated-banner-section",
    },
    tags: ["hardware", "gpu", "webgl", "120fps", "banner"],
    dependencies: [],
    dna: {
      macrostructure: "full-bleed",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "monochrome",
      shapeLanguage: "sharp",
      density: "compact",
      genre: "technical",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function HardwareAcceleratedBanner({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("w-full py-8 border-y border-neutral-800 bg-neutral-950 text-neutral-100 font-mono text-xs text-center", className)} {...props}>
      <span className="text-emerald-400 font-bold">⚡ GPU ACCELERATED:</span> 120 FPS buttery transforms with zero main-thread layout thrashing.
    </section>
  );
}
`,
    demo: `"use client";

import { HardwareAcceleratedBanner } from "./hardware-accelerated-banner";

export default function Demo() {
  return (
    <div className="w-full min-h-[150px] flex items-center justify-center bg-neutral-900">
      <HardwareAcceleratedBanner />
    </div>
  );
}
`,
  }),

  P("customer-impact-stats", {
    category: "sections",
    title: "Customer Impact Stats",
    description: "A quantitative impact report showing cumulative developer hours saved and issues mitigated.",
    difficulty: "starter",
    subcategory: "stats",
    fingerprint: {
      interactionModel: "customer-impact-stats-interaction",
      visualModel: "customer-impact-stats-visual",
      motionModel: "subtle",
      layoutModel: "mosaic-layout",
      semanticPurpose: "customer-impact-stats-section",
    },
    tags: ["impact", "stats", "roi", "savings", "telemetry"],
    dependencies: [],
    dna: {
      macrostructure: "mosaic",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
      shapeLanguage: "rounded",
      density: "compact",
      genre: "minimal",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function CustomerImpactStats({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("w-full py-16 px-4 max-w-4xl mx-auto text-center", className)} {...props}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
          <div className="text-4xl font-extrabold text-emerald-600 dark:text-emerald-400">1.4M+</div>
          <div className="text-xs text-neutral-500 mt-1">Dev hours saved in 2026</div>
        </div>
        <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
          <div className="text-4xl font-extrabold text-neutral-900 dark:text-white">0</div>
          <div className="text-xs text-neutral-500 mt-1">Runtime vulnerabilities</div>
        </div>
        <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
          <div className="text-4xl font-extrabold text-neutral-900 dark:text-white">800</div>
          <div className="text-xs text-neutral-500 mt-1">Verified registry resources</div>
        </div>
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { CustomerImpactStats } from "./customer-impact-stats";

export default function Demo() {
  return (
    <div className="w-full min-h-[250px] flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900/40">
      <CustomerImpactStats />
    </div>
  );
}
`,
  }),

  P("team-culture-photo-strip", {
    category: "sections",
    title: "Team Culture Photo Strip",
    description: "An organizational culture overview displaying collaborative principles and distributed squad values.",
    difficulty: "starter",
    subcategory: "culture",
    fingerprint: {
      interactionModel: "team-culture-photo-strip-interaction",
      visualModel: "team-culture-photo-strip-visual",
      motionModel: "subtle",
      layoutModel: "mosaic-layout",
      semanticPurpose: "team-culture-photo-strip-section",
    },
    tags: ["culture", "team", "values", "work", "people"],
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

export function TeamCulturePhotoStrip({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("w-full py-16 px-4 max-w-5xl mx-auto text-center", className)} {...props}>
      <h2 className="text-3xl font-serif text-neutral-900 dark:text-white">Crafted by Autonomous Thinkers</h2>
      <p className="text-xs text-neutral-500 mt-2 max-w-xl mx-auto">
        A globally distributed collective united by mathematical rigor, open source, and visual beauty.
      </p>
    </section>
  );
}
`,
    demo: `"use client";

import { TeamCulturePhotoStrip } from "./team-culture-photo-strip";

export default function Demo() {
  return (
    <div className="w-full min-h-[200px] flex items-center justify-center p-4 bg-stone-50 dark:bg-neutral-950">
      <TeamCulturePhotoStrip />
    </div>
  );
}
`,
  }),

  P("cta-closing-billboard", {
    category: "sections",
    title: "CTA Closing Billboard",
    description: "A monumental high-impact conversion stage at the base of the page with quickstart commands.",
    difficulty: "intermediate",
    subcategory: "cta",
    fingerprint: {
      interactionModel: "cta-closing-billboard-interaction",
      visualModel: "cta-closing-billboard-visual",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "cta-closing-billboard-section",
    },
    tags: ["cta", "billboard", "conversion", "closing", "landing"],
    dependencies: [],
    dna: {
      macrostructure: "stack",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
      shapeLanguage: "sharp",
      density: "airy",
      genre: "brutalist",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function CtaClosingBillboard({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("w-full py-20 px-4 md:px-8 bg-neutral-950 text-white text-center border-t-2 border-neutral-800", className)} {...props}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black tracking-tight">
          BUILD WITHOUT COMPROMISE.
        </h2>
        <p className="text-sm md:text-base text-neutral-400 mt-4 max-w-xl mx-auto">
          Start integrating 800 certified zero-dependency accessible components into your production Next.js apps today.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            className="px-6 py-3 rounded-none bg-white text-neutral-950 font-mono font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors"
          >
            Explore Catalog (800) →
          </button>
        </div>
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { CtaClosingBillboard } from "./cta-closing-billboard";

export default function Demo() {
  return (
    <div className="w-full bg-neutral-950 min-h-[300px] flex items-center justify-center">
      <CtaClosingBillboard />
    </div>
  );
}
`,
  }),
];

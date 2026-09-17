import type { ResourceDefinition } from "../lib/definitions.js";

const P = (name: string, definition: Omit<ResourceDefinition, "name">): ResourceDefinition => ({
  name,
  ...definition,
});

export default [
  P("feature-grid-spotlight", {
    category: "sections",
    title: "Feature Grid Spotlight",
    description: "A 3x2 interactive feature grid with dynamic cursor hover spotlighting, category tags, and expandable detail states.",
    difficulty: "intermediate",
    subcategory: "feature",
    fingerprint: {
      interactionModel: "feature-grid-spotlight-interaction",
      visualModel: "feature-grid-spotlight-visual",
      motionModel: "subtle",
      layoutModel: "mosaic-layout",
      semanticPurpose: "feature-grid-spotlight-section",
    },
    tags: ["feature", "grid", "spotlight", "interactive", "cards"],
    dependencies: [],
    dna: {
      macrostructure: "mosaic",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
      shapeLanguage: "rounded",
      density: "medium",
      genre: "technical",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface FeatureItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export interface FeatureGridSpotlightProps extends React.HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  headline?: string;
  description?: string;
  features?: FeatureItem[];
  columns?: 2 | 3;
}

const DEFAULT_FEATURES: FeatureItem[] = [
  { id: "f1", tag: "Speed", title: "Sub-millisecond Routing", description: "Edge-distributed request pipeline resolving cache lookups in under 1ms globally." },
  { id: "f2", tag: "Security", title: "Automated Zero Trust", description: "Per-request mutual TLS validation with hardware-backed certificate rotation." },
  { id: "f3", tag: "Analytics", title: "Real-time Telemetry", description: "Streaming event aggregation piping 500k ops/sec into your Grafana dashboards." },
  { id: "f4", tag: "Scaling", title: "Instant Elasticity", description: "Horizontal pod autoscaling triggered on memory pressure within 400ms." },
  { id: "f5", tag: "Compliance", title: "SOC2 & ISO Ready", description: "Immutable tamper-proof audit trails generated directly to cold storage." },
  { id: "f6", tag: "DX", title: "CLI First Workflow", description: "Push-to-deploy Git hooks with local preview sandboxes in under 3 seconds." },
];

export function FeatureGridSpotlight({
  eyebrow = "Core Capabilities",
  headline = "Engineered for uncompromising velocity",
  description = "A comprehensive suite of infrastructure primitives designed to scale without operational friction.",
  features = DEFAULT_FEATURES,
  columns = 3,
  className,
  ...props
}: FeatureGridSpotlightProps) {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-6xl mx-auto", className)} {...props}>
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-mono tracking-widest uppercase text-emerald-600 dark:text-emerald-400 font-semibold">
          {eyebrow}
        </span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-2">
          {headline}
        </h2>
        <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 mt-3">
          {description}
        </p>
      </div>

      <div
        className={cn(
          "grid gap-6",
          columns === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        )}
      >
        {features.map((feature) => {
          const isSelected = activeId === feature.id;
          return (
            <div
              key={feature.id}
              onClick={() => setActiveId(isSelected ? null : feature.id)}
              className={cn(
                "group relative rounded-xl border p-6 transition-all duration-200 cursor-pointer",
                "bg-white dark:bg-neutral-950",
                isSelected
                  ? "border-emerald-500 shadow-md ring-1 ring-emerald-500/20"
                  : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                  {feature.tag}
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  #{feature.id}
                </span>
              </div>
              <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { FeatureGridSpotlight } from "./feature-grid-spotlight";

export default function Demo() {
  return (
    <div className="w-full min-h-[400px] flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900/50">
      <FeatureGridSpotlight />
    </div>
  );
}
`,
  }),

  P("customer-metrics-ticker", {
    category: "sections",
    title: "Customer Metrics Ticker",
    description: "A high-impact KPI telemetry strip with animated values, trending badges, and verification timestamps.",
    difficulty: "starter",
    subcategory: "stats",
    fingerprint: {
      interactionModel: "customer-metrics-ticker-interaction",
      visualModel: "customer-metrics-ticker-visual",
      motionModel: "subtle",
      layoutModel: "full-bleed-layout",
      semanticPurpose: "customer-metrics-ticker-section",
    },
    tags: ["metrics", "ticker", "kpi", "stats", "telemetry"],
    dependencies: [],
    dna: {
      macrostructure: "full-bleed",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
      shapeLanguage: "sharp",
      density: "dense",
      genre: "brutalist",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface MetricItem {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export interface CustomerMetricsTickerProps extends React.HTMLAttributes<HTMLElement> {
  metrics?: MetricItem[];
}

const DEFAULT_METRICS: MetricItem[] = [
  { label: "ANNUAL RUN RATE", value: "$42.8M", change: "+148% YoY", isPositive: true },
  { label: "REQUEST LATENCY (p99)", value: "1.4ms", change: "-34% YoY", isPositive: true },
  { label: "VERIFIED NODES", value: "14,892", change: "+410 this week", isPositive: true },
  { label: "UPTIME SLA", value: "99.998%", change: "0 incidents / 90d", isPositive: true },
];

export function CustomerMetricsTicker({
  metrics = DEFAULT_METRICS,
  className,
  ...props
}: CustomerMetricsTickerProps) {
  return (
    <section
      className={cn(
        "w-full bg-neutral-900 text-neutral-100 border-y-2 border-neutral-800 py-6 px-4 md:px-8",
        className
      )}
      {...props}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => (
          <div key={idx} className="border-l-2 border-neutral-700 pl-4 py-1">
            <div className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
              {metric.label}
            </div>
            <div className="text-2xl md:text-3xl font-mono font-bold tracking-tight text-white mt-1">
              {metric.value}
            </div>
            <div
              className={cn(
                "text-[11px] font-mono mt-1",
                metric.isPositive ? "text-emerald-400" : "text-rose-400"
              )}
            >
              {metric.change}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { CustomerMetricsTicker } from "./customer-metrics-ticker";

export default function Demo() {
  return (
    <div className="w-full p-4 flex items-center justify-center bg-neutral-950">
      <CustomerMetricsTicker />
    </div>
  );
}
`,
  }),

  P("enterprise-security-pillar", {
    category: "sections",
    title: "Enterprise Security Pillar",
    description: "A regulatory compliance and security architecture banner showcasing audit readiness, key badges, and technical assurances.",
    difficulty: "intermediate",
    subcategory: "trust",
    fingerprint: {
      interactionModel: "enterprise-security-pillar-interaction",
      visualModel: "enterprise-security-pillar-visual",
      motionModel: "subtle",
      layoutModel: "split-layout",
      semanticPurpose: "enterprise-security-pillar-section",
    },
    tags: ["security", "compliance", "soc2", "enterprise", "trust"],
    dependencies: [],
    dna: {
      macrostructure: "split",
      motionLanguage: "none",
      typographyStyle: "condensed",
      colorStrategy: "monochrome",
      shapeLanguage: "sharp",
      density: "compact",
      genre: "industrial",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface SecurityPillarItem {
  code: string;
  name: string;
  auditPeriod: string;
  status: "Certified" | "Verified" | "Compliant";
}

export interface EnterpriseSecurityPillarProps extends React.HTMLAttributes<HTMLElement> {
  headline?: string;
  description?: string;
  pillars?: SecurityPillarItem[];
}

const DEFAULT_PILLARS: SecurityPillarItem[] = [
  { code: "SOC-2-TYPE-II", name: "Security & Confidentiality", auditPeriod: "2025 Annual Audit", status: "Certified" },
  { code: "ISO-27001", name: "Information Security Management", auditPeriod: "Accredited Bureau", status: "Certified" },
  { code: "HIPAA-BAA", name: "Health Data Protection", auditPeriod: "End-to-End Encrypted", status: "Compliant" },
  { code: "GDPR-APPR", name: "Data Sovereignty & EU Storage", auditPeriod: "Frankfurt / Dublin", status: "Verified" },
];

export function EnterpriseSecurityPillar({
  headline = "Bank-grade enterprise security by default",
  description = "Every line of code and packet stream adheres to strict zero-trust operational protocols audited by third parties.",
  pillars = DEFAULT_PILLARS,
  className,
  ...props
}: EnterpriseSecurityPillarProps) {
  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-6xl mx-auto", className)} {...props}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold">
            Assurance & Governance
          </span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-2">
            {headline}
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-4 leading-relaxed">
            {description}
          </p>
          <div className="mt-6 flex items-center gap-3 text-xs font-mono text-neutral-500">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Live penetration test results updated daily
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pillars.map((pillar) => (
            <div
              key={pillar.code}
              className="p-5 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-neutral-900 dark:text-neutral-100">
                    {pillar.code}
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded">
                    {pillar.status}
                  </span>
                </div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 font-medium">
                  {pillar.name}
                </div>
              </div>
              <div className="text-[10px] font-mono text-neutral-400 mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                {pillar.auditPeriod}
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

import { EnterpriseSecurityPillar } from "./enterprise-security-pillar";

export default function Demo() {
  return (
    <div className="w-full min-h-[400px] flex items-center justify-center p-4 bg-white dark:bg-neutral-950">
      <EnterpriseSecurityPillar />
    </div>
  );
}
`,
  }),

  P("pricing-toggle-table", {
    category: "sections",
    title: "Pricing Toggle Table",
    description: "An interactive billing matrix with a monthly/annual billing cycle switch, plan tiers, and recommended highlights.",
    difficulty: "intermediate",
    subcategory: "pricing",
    fingerprint: {
      interactionModel: "pricing-toggle-table-interaction",
      visualModel: "pricing-toggle-table-visual",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "pricing-toggle-table-section",
    },
    tags: ["pricing", "table", "billing", "plans", "tier"],
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

export interface PricingPlan {
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface PricingToggleTableProps extends React.HTMLAttributes<HTMLElement> {
  plans?: PricingPlan[];
}

const DEFAULT_PLANS: PricingPlan[] = [
  {
    name: "Starter",
    monthlyPrice: 19,
    annualPrice: 15,
    description: "For independent engineers and small prototypes.",
    features: ["Up to 5 team members", "10,000 monthly active requests", "Community Discord support", "1GB shared telemetry storage"],
  },
  {
    name: "Pro",
    monthlyPrice: 49,
    annualPrice: 39,
    description: "For scaling engineering squads and growing products.",
    popular: true,
    features: ["Unlimited team members", "250,000 monthly active requests", "Priority Slack connect channel", "30-day telemetry retention", "Custom domain routing"],
  },
  {
    name: "Enterprise",
    monthlyPrice: 199,
    annualPrice: 159,
    description: "For mission-critical infrastructure with strict SLAs.",
    features: ["Unlimited requests with dedicated proxy", "99.99% uptime guarantee", "24/7/365 dedicated engineer", "Self-hosted VPC gateway", "Custom SSO & SAML"],
  },
];

export function PricingToggleTable({
  plans = DEFAULT_PLANS,
  className,
  ...props
}: PricingToggleTableProps) {
  const [annual, setAnnual] = React.useState(true);

  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-6xl mx-auto", className)} {...props}>
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Predictable, transparent pricing
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
          No hidden seat charges or overage traps. Upgrade or downgrade at any time.
        </p>

        {/* Toggle switch */}
        <div className="mt-6 inline-flex items-center gap-3 p-1 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
          <button
            type="button"
            onClick={() => setAnnual(false)}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-medium transition-colors",
              !annual ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm" : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            )}
          >
            Monthly billing
          </button>
          <button
            type="button"
            onClick={() => setAnnual(true)}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5",
              annual ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm" : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            )}
          >
            <span>Annual billing</span>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.5 rounded-full">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan) => {
          const price = annual ? plan.annualPrice : plan.monthlyPrice;
          return (
            <div
              key={plan.name}
              className={cn(
                "rounded-2xl border p-6 flex flex-col justify-between relative transition-all duration-200",
                plan.popular
                  ? "border-neutral-900 dark:border-neutral-100 shadow-xl bg-neutral-900 text-white dark:bg-neutral-900"
                  : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100"
              )}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500 text-black">
                  Most Popular
                </span>
              )}
              <div>
                <h3 className="text-lg font-bold">{plan.name}</h3>
                <p className="text-xs text-neutral-400 mt-1">{plan.description}</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tight">$\${price}</span>
                  <span className="text-xs text-neutral-400">/mo per seat</span>
                </div>
                <div className="mt-6 space-y-2.5 text-xs">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span className={plan.popular ? "text-neutral-200" : "text-neutral-600 dark:text-neutral-300"}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <button
                type="button"
                className={cn(
                  "mt-8 w-full py-2.5 rounded-xl text-xs font-semibold transition-colors",
                  plan.popular
                    ? "bg-white text-neutral-900 hover:bg-neutral-100"
                    : "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
                )}
              >
                Choose {plan.name}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { PricingToggleTable } from "./pricing-toggle-table";

export default function Demo() {
  return (
    <div className="w-full min-h-[500px] flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900/40">
      <PricingToggleTable />
    </div>
  );
}
`,
  }),

  P("interactive-workflow-stepper", {
    category: "sections",
    title: "Interactive Workflow Stepper",
    description: "A chronological process section showing numbered steps with live tab switching and interactive preview detail.",
    difficulty: "intermediate",
    subcategory: "process",
    fingerprint: {
      interactionModel: "interactive-workflow-stepper-interaction",
      visualModel: "interactive-workflow-stepper-visual",
      motionModel: "subtle",
      layoutModel: "split-layout",
      semanticPurpose: "interactive-workflow-stepper-section",
    },
    tags: ["stepper", "process", "workflow", "interactive", "timeline"],
    dependencies: [],
    dna: {
      macrostructure: "split",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
      shapeLanguage: "sharp",
      density: "medium",
      genre: "swiss",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface WorkflowStep {
  step: string;
  title: string;
  summary: string;
  details: string[];
}

export interface InteractiveWorkflowStepperProps extends React.HTMLAttributes<HTMLElement> {
  steps?: WorkflowStep[];
}

const DEFAULT_STEPS: WorkflowStep[] = [
  {
    step: "01",
    title: "Instrument Client SDK",
    summary: "Add a 2-line client snippet to your React or Next.js app root.",
    details: ["Zero bundle impact with sub-2kb dynamic loader", "Automatic session ID stitching and cookie-less attribution"],
  },
  {
    step: "02",
    title: "Declare Invariants",
    summary: "Define schema rules, rate limits, and egress constraints in openui.config.ts.",
    details: ["Type-checked configuration validated at build time", "Automated GitHub Action validation against pull requests"],
  },
  {
    step: "03",
    title: "Edge Provisioning",
    summary: "Global nodes sync within 200ms of any Git push.",
    details: ["Zero cold starts on V8 isolates worldwide", "Automatic rollback on HTTP 5xx error spikes over 1%"],
  },
  {
    step: "04",
    title: "Real-time Verification",
    summary: "Inspect live request telemetry and visual state diffs directly in your terminal.",
    details: ["CLI tail streaming directly from production edge", "Export sanitized HAR traces for post-mortems"],
  },
];

export function InteractiveWorkflowStepper({
  steps = DEFAULT_STEPS,
  className,
  ...props
}: InteractiveWorkflowStepperProps) {
  const [activeStepIndex, setActiveStepIndex] = React.useState(0);
  const current = steps[activeStepIndex];

  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-6xl mx-auto", className)} {...props}>
      <div className="mb-10">
        <span className="text-xs font-mono font-bold tracking-wider text-neutral-400 uppercase">
          Continuous Pipeline
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-1">
          From zero to global distribution in minutes
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Steps list */}
        <div className="lg:col-span-6 space-y-3">
          {steps.map((s, idx) => {
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={s.step}
                type="button"
                onClick={() => setActiveStepIndex(idx)}
                className={cn(
                  "w-full text-left p-4 rounded-xl border transition-all flex items-start gap-4",
                  isActive
                    ? "border-neutral-900 dark:border-neutral-100 bg-neutral-100/70 dark:bg-neutral-900 shadow-sm"
                    : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-neutral-950"
                )}
              >
                <span
                  className={cn(
                    "text-sm font-mono font-bold px-2 py-1 rounded",
                    isActive ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900" : "text-neutral-400 bg-neutral-100 dark:bg-neutral-800"
                  )}
                >
                  {s.step}
                </span>
                <div>
                  <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    {s.title}
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    {s.summary}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detail view */}
        <div className="lg:col-span-6 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 bg-white dark:bg-neutral-950">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
            <span className="text-xs font-mono font-semibold text-neutral-400 uppercase">
              Phase {current?.step} Deep Dive
            </span>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mt-4">
            {current?.title}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
            {current?.summary}
          </p>
          <div className="mt-6 space-y-3">
            {current?.details.map((detail, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-neutral-700 dark:text-neutral-300">
                <span className="text-emerald-500 font-bold">→</span>
                <span>{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { InteractiveWorkflowStepper } from "./interactive-workflow-stepper";

export default function Demo() {
  return (
    <div className="w-full min-h-[400px] flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900/50">
      <InteractiveWorkflowStepper />
    </div>
  );
}
`,
  }),

  P("developer-quickstart-split", {
    category: "sections",
    title: "Developer Quickstart Split",
    description: "A two-column section pairing developer installation steps with copyable terminal snippets and flags.",
    difficulty: "starter",
    subcategory: "developer",
    fingerprint: {
      interactionModel: "developer-quickstart-split-interaction",
      visualModel: "developer-quickstart-split-visual",
      motionModel: "subtle",
      layoutModel: "split-layout",
      semanticPurpose: "developer-quickstart-split-section",
    },
    tags: ["developer", "quickstart", "terminal", "code", "installation"],
    dependencies: [],
    dna: {
      macrostructure: "split",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "accent-only",
      shapeLanguage: "sharp",
      density: "compact",
      genre: "technical",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface DeveloperQuickstartSplitProps extends React.HTMLAttributes<HTMLElement> {
  command?: string;
  tabs?: { label: string; code: string }[];
}

const DEFAULT_TABS = [
  { label: "pnpm", code: "pnpm dlx openui@latest add split-headline-hero" },
  { label: "npm", code: "npx openui@latest add split-headline-hero" },
  { label: "yarn", code: "yarn dlx openui add split-headline-hero" },
  { label: "bun", code: "bunx openui@latest add split-headline-hero" },
];

export function DeveloperQuickstartSplit({
  tabs = DEFAULT_TABS,
  className,
  ...props
}: DeveloperQuickstartSplitProps) {
  const [activeTab, setActiveTab] = React.useState(0);
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    const text = tabs[activeTab]?.code || "";
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-6xl mx-auto", className)} {...props}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5">
          <span className="text-xs font-mono font-semibold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase">
            Quickstart
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-2">
            One command, zero boilerplate
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-3 leading-relaxed">
            Copy self-contained, typed components directly into your codebase. No lock-in, no runtime wrapper, complete design ownership.
          </p>
          <div className="mt-6 flex items-center gap-4 text-xs font-mono text-neutral-500">
            <div>✓ TypeScript Strict</div>
            <div>✓ Tailwind v4 Ready</div>
            <div>✓ Zero Dependencies</div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-neutral-950 text-neutral-100 rounded-xl border border-neutral-800 p-4 shadow-xl font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              {tabs.map((tab, idx) => (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={cn(
                    "px-2.5 py-1 rounded text-[11px] transition-colors",
                    activeTab === idx ? "bg-neutral-800 text-white font-bold" : "text-neutral-400 hover:text-neutral-200"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="text-[11px] text-neutral-400 hover:text-white px-2 py-1 bg-neutral-900 rounded border border-neutral-800"
            >
              {copied ? "Copied! ✓" : "Copy"}
            </button>
          </div>

          <div className="pt-4 pb-2 px-2 overflow-x-auto text-emerald-400 flex items-center gap-2">
            <span className="text-neutral-500 select-none">$</span>
            <span>{tabs[activeTab]?.code}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { DeveloperQuickstartSplit } from "./developer-quickstart-split";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] flex items-center justify-center p-4 bg-neutral-100 dark:bg-neutral-900">
      <DeveloperQuickstartSplit />
    </div>
  );
}
`,
  }),

  P("customer-story-masonry", {
    category: "sections",
    title: "Customer Story Masonry",
    description: "An editorial masonry layout displaying verified customer case studies with ROI statistics and testimonial quotes.",
    difficulty: "intermediate",
    subcategory: "testimonials",
    fingerprint: {
      interactionModel: "customer-story-masonry-interaction",
      visualModel: "customer-story-masonry-visual",
      motionModel: "subtle",
      layoutModel: "mosaic-layout",
      semanticPurpose: "customer-story-masonry-section",
    },
    tags: ["customer", "story", "masonry", "testimonials", "case-studies"],
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

export interface StoryCard {
  quote: string;
  author: string;
  role: string;
  company: string;
  stat: string;
  statLabel: string;
}

export interface CustomerStoryMasonryProps extends React.HTMLAttributes<HTMLElement> {
  stories?: StoryCard[];
}

const DEFAULT_STORIES: StoryCard[] = [
  {
    quote: "Migrating our core telemetry pipeline to OpenUI cut our infrastructure overhead by 68% within the first financial quarter.",
    author: "Elena Vasquez",
    role: "VP of Engineering",
    company: "HyperScale Cloud",
    stat: "68%",
    statLabel: "Cloud egress reduction",
  },
  {
    quote: "Our frontend velocity doubled. Engineers are no longer re-implementing accessible form controls or fighting CSS specificity wars.",
    author: "Liam K.",
    role: "Staff Product Engineer",
    company: "FinPoint Technologies",
    stat: "2.4x",
    statLabel: "Sprint release velocity",
  },
  {
    quote: "The zero-dependency architecture gave our compliance auditor complete peace of mind. We shipped SOC2 compliance two months early.",
    author: "Sarah Chen",
    role: "Chief Information Security Officer",
    company: "AeroData Global",
    stat: "2 mo",
    statLabel: "Time-to-compliance accelerated",
  },
];

export function CustomerStoryMasonry({
  stories = DEFAULT_STORIES,
  className,
  ...props
}: CustomerStoryMasonryProps) {
  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-6xl mx-auto", className)} {...props}>
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold">
          Proven Outcomes
        </span>
        <h2 className="text-3xl md:text-4xl font-serif font-normal tracking-tight text-neutral-900 dark:text-neutral-100 mt-2">
          Trusted by technical leaders building next-generation products
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stories.map((story, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-stone-50/50 dark:bg-neutral-900/40 flex flex-col justify-between"
          >
            <div>
              <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4 mb-4">
                <div className="text-3xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
                  {story.stat}
                </div>
                <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider mt-0.5">
                  {story.statLabel}
                </div>
              </div>
              <p className="text-sm font-serif italic text-neutral-700 dark:text-neutral-300 leading-relaxed">
                "{story.quote}"
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <div className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                {story.author}
              </div>
              <div className="text-[11px] text-neutral-500">
                {story.role}, {story.company}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { CustomerStoryMasonry } from "./customer-story-masonry";

export default function Demo() {
  return (
    <div className="w-full min-h-[400px] flex items-center justify-center p-4 bg-stone-100/50 dark:bg-neutral-950">
      <CustomerStoryMasonry />
    </div>
  );
}
`,
  }),

  P("api-status-health-banner", {
    category: "sections",
    title: "API Status Health Banner",
    description: "A real-time edge system status banner reporting uptime percentages, latency metrics, and recent incident logs.",
    difficulty: "starter",
    subcategory: "telemetry",
    fingerprint: {
      interactionModel: "api-status-health-banner-interaction",
      visualModel: "api-status-health-banner-visual",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "api-status-health-banner-section",
    },
    tags: ["api", "status", "uptime", "health", "telemetry"],
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

export interface RegionStatus {
  region: string;
  status: "Operational" | "Degraded" | "Maintenance";
  latency: string;
}

export interface ApiStatusHealthBannerProps extends React.HTMLAttributes<HTMLElement> {
  systemUptime?: string;
  regions?: RegionStatus[];
}

const DEFAULT_REGIONS: RegionStatus[] = [
  { region: "US-East (N. Virginia)", status: "Operational", latency: "14ms" },
  { region: "EU-West (Frankfurt)", status: "Operational", latency: "18ms" },
  { region: "AP-East (Tokyo)", status: "Operational", latency: "22ms" },
  { region: "SA-East (São Paulo)", status: "Operational", latency: "38ms" },
];

export function ApiStatusHealthBanner({
  systemUptime = "99.998%",
  regions = DEFAULT_REGIONS,
  className,
  ...props
}: ApiStatusHealthBannerProps) {
  return (
    <section className={cn("w-full py-8 px-4 md:px-8 max-w-5xl mx-auto", className)} {...props}>
      <div className="border border-neutral-800 bg-neutral-950 rounded-xl p-5 text-neutral-100 font-mono">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
            <span className="text-sm font-bold text-white tracking-wide">
              All Systems Operational
            </span>
          </div>
          <div className="text-xs text-neutral-400">
            90-Day Rolling Uptime: <span className="text-emerald-400 font-bold">{systemUptime}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-xs">
          {regions.map((r) => (
            <div key={r.region} className="p-3 rounded bg-neutral-900/60 border border-neutral-800/80">
              <div className="text-[10px] text-neutral-400 uppercase tracking-wider">{r.region}</div>
              <div className="text-emerald-400 font-semibold mt-1">{r.status}</div>
              <div className="text-[10px] text-neutral-500 mt-0.5 font-mono">{r.latency} p95</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { ApiStatusHealthBanner } from "./api-status-health-banner";

export default function Demo() {
  return (
    <div className="w-full min-h-[250px] flex items-center justify-center p-4 bg-neutral-900">
      <ApiStatusHealthBanner />
    </div>
  );
}
`,
  }),

  P("changelog-release-feed", {
    category: "sections",
    title: "Changelog Release Feed",
    description: "A chronological release notes section highlighting version bumps, features, breaking changes, and bug fixes.",
    difficulty: "intermediate",
    subcategory: "changelog",
    fingerprint: {
      interactionModel: "changelog-release-feed-interaction",
      visualModel: "changelog-release-feed-visual",
      motionModel: "subtle",
      layoutModel: "rail-layout",
      semanticPurpose: "changelog-release-feed-section",
    },
    tags: ["changelog", "release", "feed", "updates", "versioning"],
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

export interface ReleaseEntry {
  version: string;
  date: string;
  highlight: string;
  changes: { type: "feature" | "fix" | "breaking"; text: string }[];
}

export interface ChangelogReleaseFeedProps extends React.HTMLAttributes<HTMLElement> {
  releases?: ReleaseEntry[];
}

const DEFAULT_RELEASES: ReleaseEntry[] = [
  {
    version: "v2.4.0",
    date: "September 16, 2026",
    highlight: "Zero-bundle CSS variables engine and Next.js 15.2 Server Action support.",
    changes: [
      { type: "feature", text: "Added CSS-variable color token synchronization API" },
      { type: "fix", text: "Resolved hydration mismatch in SSR popover controllers" },
      { type: "breaking", text: "Renamed macroStructure prop to macrostructure in RegistrySchema" },
    ],
  },
  {
    version: "v2.3.1",
    date: "August 28, 2026",
    highlight: "Critical patch for touch gesture panning on Safari iOS 19.",
    changes: [
      { type: "fix", text: "Fixed momentum scroll inertia lock on mobile drawer" },
      { type: "feature", text: "Added keyboard shortcut Alt+K to quick command palette" },
    ],
  },
];

export function ChangelogReleaseFeed({
  releases = DEFAULT_RELEASES,
  className,
  ...props
}: ChangelogReleaseFeedProps) {
  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-4xl mx-auto", className)} {...props}>
      <div className="mb-12">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-semibold">
          Updates & Notes
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-1">
          Product Changelog
        </h2>
      </div>

      <div className="space-y-12">
        {releases.map((rel) => (
          <div key={rel.version} className="border-l-2 border-neutral-200 dark:border-neutral-800 pl-6 relative">
            <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-white dark:bg-neutral-950 border-2 border-neutral-900 dark:border-neutral-100" />
            <div className="flex items-baseline gap-3">
              <span className="text-lg font-mono font-bold text-neutral-900 dark:text-neutral-100">
                {rel.version}
              </span>
              <span className="text-xs text-neutral-400 font-mono">{rel.date}</span>
            </div>
            <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mt-2">
              {rel.highlight}
            </p>
            <div className="mt-4 space-y-2">
              {rel.changes.map((change, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs">
                  <span
                    className={cn(
                      "px-1.5 py-0.5 rounded text-[10px] font-mono uppercase font-bold",
                      change.type === "feature" && "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
                      change.type === "fix" && "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
                      change.type === "breaking" && "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                    )}
                  >
                    {change.type}
                  </span>
                  <span className="text-neutral-600 dark:text-neutral-400">{change.text}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { ChangelogReleaseFeed } from "./changelog-release-feed";

export default function Demo() {
  return (
    <div className="w-full min-h-[400px] flex items-center justify-center p-4 bg-white dark:bg-neutral-950">
      <ChangelogReleaseFeed />
    </div>
  );
}
`,
  }),

  P("career-open-roles-grid", {
    category: "sections",
    title: "Career Open Roles Grid",
    description: "A recruitment job opening board with department filters, location tags, and interactive apply modals.",
    difficulty: "intermediate",
    subcategory: "careers",
    fingerprint: {
      interactionModel: "career-open-roles-grid-interaction",
      visualModel: "career-open-roles-grid-visual",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "career-open-roles-grid-section",
    },
    tags: ["careers", "jobs", "hiring", "recruitment", "roles"],
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

export interface JobRole {
  id: string;
  department: "Engineering" | "Product" | "Design" | "Security";
  title: string;
  location: string;
  type: string;
}

export interface CareerOpenRolesGridProps extends React.HTMLAttributes<HTMLElement> {
  roles?: JobRole[];
}

const DEFAULT_ROLES: JobRole[] = [
  { id: "r1", department: "Engineering", title: "Senior Systems Engineer (Rust / V8)", location: "Remote (Global)", type: "Full-Time" },
  { id: "r2", department: "Engineering", title: "Staff Frontend Architect (React / Next.js)", location: "San Francisco, CA", type: "Full-Time" },
  { id: "r3", department: "Design", title: "Principal Design Systems Designer", location: "London, UK / Remote", type: "Full-Time" },
  { id: "r4", department: "Security", title: "Security Operations & Compliance Lead", location: "Remote (US/EU)", type: "Full-Time" },
  { id: "r5", department: "Product", title: "Developer Experience Product Manager", location: "New York, NY", type: "Full-Time" },
];

export function CareerOpenRolesGrid({
  roles = DEFAULT_ROLES,
  className,
  ...props
}: CareerOpenRolesGridProps) {
  const [selectedDept, setSelectedDept] = React.useState<string>("All");

  const departments = ["All", "Engineering", "Design", "Security", "Product"];
  const filteredRoles = selectedDept === "All" ? roles : roles.filter((r) => r.department === selectedDept);

  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-5xl mx-auto", className)} {...props}>
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold">
          Join Our Mission
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-2">
          Help build the open web interface registry
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-3">
          We operate as an autonomous, remote-first collective passionate about high-precision developer tools.
        </p>
      </div>

      {/* Dept filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {departments.map((dept) => (
          <button
            key={dept}
            type="button"
            onClick={() => setSelectedDept(dept)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
              selectedDept === dept
                ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400"
            )}
          >
            {dept}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredRoles.map((role) => (
          <div
            key={role.id}
            className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                  {role.department}
                </span>
                <span className="text-xs text-neutral-400 font-mono">{role.location}</span>
              </div>
              <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mt-1">
                {role.title}
              </h3>
            </div>
            <button
              type="button"
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
              Apply Now →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { CareerOpenRolesGrid } from "./career-open-roles-grid";

export default function Demo() {
  return (
    <div className="w-full min-h-[400px] flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900/50">
      <CareerOpenRolesGrid />
    </div>
  );
}
`,
  }),

  P("interactive-roi-calculator", {
    category: "sections",
    title: "Interactive ROI Calculator",
    description: "A dynamic financial modeling calculator with interactive sliders for engineers, compute savings, and annual ROI projections.",
    difficulty: "advanced",
    subcategory: "calculator",
    fingerprint: {
      interactionModel: "interactive-roi-calculator-interaction",
      visualModel: "interactive-roi-calculator-visual",
      motionModel: "subtle",
      layoutModel: "split-layout",
      semanticPurpose: "interactive-roi-calculator-section",
    },
    tags: ["calculator", "roi", "savings", "finance", "interactive"],
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

export interface InteractiveRoiCalculatorProps extends React.HTMLAttributes<HTMLElement> {
  defaultEngineers?: number;
  defaultHourlyRate?: number;
}

export function InteractiveRoiCalculator({
  defaultEngineers = 12,
  defaultHourlyRate = 95,
  className,
  ...props
}: InteractiveRoiCalculatorProps) {
  const [engineers, setEngineers] = React.useState(defaultEngineers);
  const [hourlyRate, setHourlyRate] = React.useState(defaultHourlyRate);

  // Assumptions: Each engineer saves ~6 hours per week on boilerplate UI and maintenance
  const hoursSavedPerYear = engineers * 6 * 48;
  const annualSavings = Math.round(hoursSavedPerYear * hourlyRate);
  const sprintDaysSaved = Math.round((hoursSavedPerYear / 8) / 10);

  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-5xl mx-auto", className)} {...props}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 md:p-10 shadow-sm">
        {/* Controls */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold">
              Engineering Velocity
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-1">
              Calculate team savings
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Adjust team size and average loaded engineering cost to see projected annual returns.
            </p>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <div>
              <div className="flex justify-between text-neutral-700 dark:text-neutral-300 mb-1">
                <span>Frontend / Fullstack Engineers</span>
                <span className="font-bold text-neutral-900 dark:text-neutral-100">{engineers} engineers</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={engineers}
                onChange={(e) => setEngineers(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-neutral-700 dark:text-neutral-300 mb-1">
                <span>Average Loaded Rate ($/hr)</span>
                <span className="font-bold text-neutral-900 dark:text-neutral-100">\${hourlyRate}/hr</span>
              </div>
              <input
                type="range"
                min="40"
                max="250"
                step="5"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Projections */}
        <div className="lg:col-span-6 bg-neutral-50 dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 text-center font-mono">
          <div className="text-xs uppercase text-neutral-500 tracking-wider">
            Estimated Annual Dollar Savings
          </div>
          <div className="text-4xl md:text-5xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-2">
            \${annualSavings.toLocaleString()}
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800 text-xs">
            <div>
              <div className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                {hoursSavedPerYear.toLocaleString()} hrs
              </div>
              <div className="text-[11px] text-neutral-500 mt-0.5">Dev time unlocked</div>
            </div>
            <div>
              <div className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                {sprintDaysSaved} sprints
              </div>
              <div className="text-[11px] text-neutral-500 mt-0.5">Velocity gained</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { InteractiveRoiCalculator } from "./interactive-roi-calculator";

export default function Demo() {
  return (
    <div className="w-full min-h-[400px] flex items-center justify-center p-4 bg-neutral-100 dark:bg-neutral-900/50">
      <InteractiveRoiCalculator />
    </div>
  );
}
`,
  }),

  P("documentation-category-browser", {
    category: "sections",
    title: "Documentation Category Browser",
    description: "A categorized developer documentation grid featuring search filter and deep-link reference indexes.",
    difficulty: "intermediate",
    subcategory: "documentation",
    fingerprint: {
      interactionModel: "documentation-category-browser-interaction",
      visualModel: "documentation-category-browser-visual",
      motionModel: "subtle",
      layoutModel: "mosaic-layout",
      semanticPurpose: "documentation-category-browser-section",
    },
    tags: ["docs", "documentation", "browser", "guides", "api"],
    dependencies: [],
    dna: {
      macrostructure: "mosaic",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
      shapeLanguage: "rounded",
      density: "medium",
      genre: "swiss",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface DocCategory {
  title: string;
  description: string;
  articlesCount: number;
  topics: string[];
}

export interface DocumentationCategoryBrowserProps extends React.HTMLAttributes<HTMLElement> {
  categories?: DocCategory[];
}

const DEFAULT_CATEGORIES: DocCategory[] = [
  {
    title: "Getting Started",
    description: "Install instructions, configuration files, and quickstart boilerplates.",
    articlesCount: 8,
    topics: ["Installation", "CLI Configuration", "Folder Structure", "TypeScript Setup"],
  },
  {
    title: "Registry Architecture",
    description: "Learn how the decentralized schema and registry packaging format operates.",
    articlesCount: 14,
    topics: ["Design DNA Tokens", "Schema Validation", "Materialization", "Air-gapped Installs"],
  },
  {
    title: "Component Primitives",
    description: "Accessibility guidelines, ARIA attributes, and keyboard navigation contracts.",
    articlesCount: 22,
    topics: ["Focus Management", "Reduced Motion", "Screen Readers", "Slots & Polymorphism"],
  },
  {
    title: "Deployment & CI",
    description: "Automate build-time verification with GitHub Actions and edge proxies.",
    articlesCount: 6,
    topics: ["Vercel Integration", "Docker Containers", "S3 Backed Registries", "Version Bumps"],
  },
];

export function DocumentationCategoryBrowser({
  categories = DEFAULT_CATEGORIES,
  className,
  ...props
}: DocumentationCategoryBrowserProps) {
  const [query, setQuery] = React.useState("");

  const filtered = categories.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.description.toLowerCase().includes(query.toLowerCase()) ||
    c.topics.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-6xl mx-auto", className)} {...props}>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold">
            Knowledge Base
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-1">
            Explore Documentation
          </h2>
        </div>
        <div className="w-full md:w-72">
          <input
            type="text"
            placeholder="Filter guides & topics..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((cat) => (
          <div
            key={cat.title}
            className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                {cat.title}
              </h3>
              <span className="text-xs font-mono text-neutral-400">
                {cat.articlesCount} guides
              </span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2">
              {cat.description}
            </p>
            <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap gap-2">
              {cat.topics.map((topic) => (
                <span
                  key={topic}
                  className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { DocumentationCategoryBrowser } from "./documentation-category-browser";

export default function Demo() {
  return (
    <div className="w-full min-h-[400px] flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900/50">
      <DocumentationCategoryBrowser />
    </div>
  );
}
`,
  }),

  P("event-keynote-schedule", {
    category: "sections",
    title: "Event Keynote Schedule",
    description: "A multi-track developer conference agenda with speaker profiles, track tags, and calendar reminders.",
    difficulty: "intermediate",
    subcategory: "events",
    fingerprint: {
      interactionModel: "event-keynote-schedule-interaction",
      visualModel: "event-keynote-schedule-visual",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "event-keynote-schedule-section",
    },
    tags: ["event", "schedule", "conference", "agenda", "keynote"],
    dependencies: [],
    dna: {
      macrostructure: "stack",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
      shapeLanguage: "sharp",
      density: "dense",
      genre: "brutalist",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface AgendaItem {
  time: string;
  stage: string;
  title: string;
  speaker: string;
  role: string;
}

export interface EventKeynoteScheduleProps extends React.HTMLAttributes<HTMLElement> {
  agenda?: AgendaItem[];
}

const DEFAULT_AGENDA: AgendaItem[] = [
  { time: "09:00 AM", stage: "Main Stage", title: "Opening Keynote: The Post-Framework Web Interface", speaker: "Cyril Chris", role: "OpenUI Creator" },
  { time: "10:30 AM", stage: "Stage A (Edge)", title: "Sub-10ms Global State Synthesis with SQLite Isolates", speaker: "Elena Rostova", role: "Distributed Systems Lead" },
  { time: "01:00 PM", stage: "Stage B (Design)", title: "Mathematical Invariants of Design Systems in Code", speaker: "Marcus Vance", role: "Design Systems Engineer" },
  { time: "03:30 PM", stage: "Main Stage", title: "Closing Panel: What 1000 Engineers Taught Us About Components", speaker: "Panel of Core Maintainers", role: "Open Source Collective" },
];

export function EventKeynoteSchedule({
  agenda = DEFAULT_AGENDA,
  className,
  ...props
}: EventKeynoteScheduleProps) {
  const [selectedStage, setSelectedStage] = React.useState("All");

  const stages = ["All", "Main Stage", "Stage A (Edge)", "Stage B (Design)"];
  const filtered = selectedStage === "All" ? agenda : agenda.filter((a) => a.stage === selectedStage);

  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-5xl mx-auto", className)} {...props}>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b-2 border-neutral-900 dark:border-neutral-100 pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest font-bold text-neutral-500">
            OpenUI Summit 2026
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100">
            Conference Agenda
          </h2>
        </div>
        <div className="flex flex-wrap gap-1 font-mono text-xs">
          {stages.map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setSelectedStage(st)}
              className={cn(
                "px-3 py-1 border transition-colors",
                selectedStage === st
                  ? "bg-neutral-900 text-white border-neutral-900 dark:bg-neutral-100 dark:text-neutral-900"
                  : "border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              )}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y divide-neutral-200 dark:divide-neutral-800 font-mono">
        {filtered.map((item, idx) => (
          <div key={idx} className="py-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-3 text-sm font-bold text-neutral-900 dark:text-neutral-100">
              {item.time}
            </div>
            <div className="md:col-span-6">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                {item.stage}
              </span>
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 mt-1 font-sans">
                {item.title}
              </h3>
            </div>
            <div className="md:col-span-3 text-right text-xs">
              <div className="font-bold text-neutral-900 dark:text-neutral-100">{item.speaker}</div>
              <div className="text-neutral-500 text-[11px]">{item.role}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { EventKeynoteSchedule } from "./event-keynote-schedule";

export default function Demo() {
  return (
    <div className="w-full min-h-[400px] flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-950">
      <EventKeynoteSchedule />
    </div>
  );
}
`,
  }),

  P("partner-tier-ecosystem", {
    category: "sections",
    title: "Partner Tier Ecosystem",
    description: "An alliance and certified consultancy network grid showcasing technology partners, tiers, and certification marks.",
    difficulty: "starter",
    subcategory: "partners",
    fingerprint: {
      interactionModel: "partner-tier-ecosystem-interaction",
      visualModel: "partner-tier-ecosystem-visual",
      motionModel: "subtle",
      layoutModel: "mosaic-layout",
      semanticPurpose: "partner-tier-ecosystem-section",
    },
    tags: ["partners", "ecosystem", "integrations", "alliances", "certifications"],
    dependencies: [],
    dna: {
      macrostructure: "mosaic",
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

export interface PartnerItem {
  name: string;
  tier: "Global Elite" | "Premier Partner" | "Authorized";
  specialty: string;
  region: string;
}

export interface PartnerTierEcosystemProps extends React.HTMLAttributes<HTMLElement> {
  partners?: PartnerItem[];
}

const DEFAULT_PARTNERS: PartnerItem[] = [
  { name: "Vercel Enterprise", tier: "Global Elite", specialty: "Edge Runtime & Next.js Deployment", region: "Worldwide" },
  { name: "Cloudflare Workers", tier: "Global Elite", specialty: "V8 Compute & DDoS Shield", region: "Worldwide" },
  { name: "Supabase", tier: "Premier Partner", specialty: "PostgreSQL & Realtime Sync", region: "North America / EMEA" },
  { name: "Railway Systems", tier: "Premier Partner", specialty: "Container Orchestration", region: "Global" },
  { name: "Resend Email", tier: "Authorized", specialty: "Transactional Message Pipeline", region: "Americas" },
  { name: "Linear Systems", tier: "Authorized", specialty: "Engineering Project Sync", region: "Global" },
];

export function PartnerTierEcosystem({
  partners = DEFAULT_PARTNERS,
  className,
  ...props
}: PartnerTierEcosystemProps) {
  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-6xl mx-auto", className)} {...props}>
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold">
          Alliances
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-1">
          Certified Ecosystem Partners
        </h2>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2">
          Backed by leading cloud infrastructure providers and developer-first platforms.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="p-5 border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 rounded flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  {partner.name}
                </h3>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
                  {partner.tier}
                </span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2">
                {partner.specialty}
              </p>
            </div>
            <div className="text-[10px] font-mono text-neutral-400 mt-4 pt-2 border-t border-neutral-200 dark:border-neutral-800">
              Region: {partner.region}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { PartnerTierEcosystem } from "./partner-tier-ecosystem";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] flex items-center justify-center p-4 bg-neutral-100 dark:bg-neutral-950">
      <PartnerTierEcosystem />
    </div>
  );
}
`,
  }),

  P("hero-media-showcase", {
    category: "sections",
    title: "Hero Media Showcase",
    description: "A flagship hero section featuring browser frame window mockup, glowing gradients, callout badges, and dual action CTAs.",
    difficulty: "intermediate",
    subcategory: "hero",
    fingerprint: {
      interactionModel: "hero-media-showcase-interaction",
      visualModel: "hero-media-showcase-visual",
      motionModel: "subtle",
      layoutModel: "asymmetric-layout",
      semanticPurpose: "hero-media-showcase-section",
    },
    tags: ["hero", "media", "showcase", "mockup", "cta"],
    dependencies: [],
    dna: {
      macrostructure: "asymmetric",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
      shapeLanguage: "rounded",
      density: "airy",
      genre: "minimal",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface HeroMediaShowcaseProps extends React.HTMLAttributes<HTMLElement> {
  badge?: string;
  headline?: string;
  subheadline?: string;
  primaryCta?: string;
  secondaryCta?: string;
}

export function HeroMediaShowcase({
  badge = "OpenUI Registry v2.4 Now Live",
  headline = "The interface standard for high-assurance web applications",
  subheadline = "800 verified, zero-dependency accessible components, layouts, sections, and blocks designed to drop straight into your production Next.js codebase.",
  primaryCta = "Browse 800 Components →",
  secondaryCta = "View CLI Docs",
  className,
  ...props
}: HeroMediaShowcaseProps) {
  return (
    <section className={cn("w-full py-20 px-4 md:px-8 max-w-6xl mx-auto text-center", className)} {...props}>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 mb-6">
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        <span>{badge}</span>
      </div>

      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100 max-w-4xl mx-auto leading-tight">
        {headline}
      </h1>

      <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mt-6 leading-relaxed">
        {subheadline}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
        <button
          type="button"
          className="px-6 py-3 rounded-xl text-sm font-semibold bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 transition-colors shadow-sm"
        >
          {primaryCta}
        </button>
        <button
          type="button"
          className="px-6 py-3 rounded-xl text-sm font-semibold border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          {secondaryCta}
        </button>
      </div>

      {/* Browser mockup stage */}
      <div className="mt-14 max-w-5xl mx-auto rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-2 shadow-2xl">
        <div className="h-8 rounded-t-xl bg-neutral-200/80 dark:bg-neutral-900 flex items-center px-4 gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <div className="mx-auto text-[11px] font-mono text-neutral-400">
            https://openui.dev/catalog/sections
          </div>
        </div>
        <div className="h-64 sm:h-80 w-full rounded-b-lg bg-white dark:bg-neutral-900/50 flex items-center justify-center text-neutral-400 font-mono text-xs">
          [Interactive Component Canvas: 800 Live Primitives Ready]
        </div>
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { HeroMediaShowcase } from "./hero-media-showcase";

export default function Demo() {
  return (
    <div className="w-full min-h-[500px] flex items-center justify-center bg-white dark:bg-neutral-950">
      <HeroMediaShowcase />
    </div>
  );
}
`,
  }),

  P("interactive-quiz-onboarding", {
    category: "sections",
    title: "Interactive Quiz Onboarding",
    description: "A multi-step guided recommendation questionnaire outputting tailored stack configurations.",
    difficulty: "advanced",
    subcategory: "onboarding",
    fingerprint: {
      interactionModel: "interactive-quiz-onboarding-interaction",
      visualModel: "interactive-quiz-onboarding-visual",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "interactive-quiz-onboarding-section",
    },
    tags: ["quiz", "onboarding", "interactive", "recommendation", "stepper"],
    dependencies: [],
    dna: {
      macrostructure: "stack",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
      shapeLanguage: "rounded",
      density: "medium",
      genre: "playful",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface QuizQuestion {
  id: string;
  title: string;
  options: { label: string; tag: string }[];
}

export interface InteractiveQuizOnboardingProps extends React.HTMLAttributes<HTMLElement> {
  questions?: QuizQuestion[];
}

const DEFAULT_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    title: "What framework is your team targeting?",
    options: [
      { label: "Next.js 15 (App Router)", tag: "nextjs" },
      { label: "Vite + React 19", tag: "vite" },
      { label: "Remix / React Router v7", tag: "remix" },
      { label: "Astro / Static SSG", tag: "astro" },
    ],
  },
  {
    id: "q2",
    title: "What is your primary design aesthetic?",
    options: [
      { label: "Minimal & Clean Grotesk", tag: "minimal" },
      { label: "High-Contrast Brutalist", tag: "brutalist" },
      { label: "Refined Swiss Editorial", tag: "editorial" },
      { label: "High-Density Technical", tag: "technical" },
    ],
  },
];

export function InteractiveQuizOnboarding({
  questions = DEFAULT_QUESTIONS,
  className,
  ...props
}: InteractiveQuizOnboardingProps) {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, string>>({});

  const question = questions[currentStep];
  const isFinished = currentStep >= questions.length;

  const handleSelect = (tag: string) => {
    if (!question) return;
    setAnswers((prev) => ({ ...prev, [question.id]: tag }));
    setCurrentStep((prev) => prev + 1);
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
  };

  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-3xl mx-auto", className)} {...props}>
      <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 md:p-8 shadow-sm">
        {!isFinished && question ? (
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-4">
              <span>Step {currentStep + 1} of {questions.length}</span>
              <span>Stack Configurator</span>
            </div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
              {question.title}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {question.options.map((opt) => (
                <button
                  key={opt.tag}
                  type="button"
                  onClick={() => handleSelect(opt.tag)}
                  className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 text-left hover:border-emerald-500 hover:bg-emerald-50/20 dark:hover:bg-emerald-950/20 transition-all text-xs font-medium text-neutral-800 dark:text-neutral-200"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <span className="text-3xl">✨</span>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mt-2">
              Configuration Tailored!
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2">
              Based on your stack selections, your recommended starter command is ready:
            </p>
            <div className="mt-4 p-3 bg-neutral-100 dark:bg-neutral-900 rounded font-mono text-xs text-emerald-600 dark:text-emerald-400">
              npx openui@latest init --stack={answers.q1 || "nextjs"} --style={answers.q2 || "minimal"}
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="mt-6 px-4 py-2 rounded-lg text-xs font-semibold bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
            >
              Start Over
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { InteractiveQuizOnboarding } from "./interactive-quiz-onboarding";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900/40">
      <InteractiveQuizOnboarding />
    </div>
  );
}
`,
  }),

  P("brand-press-kit-download", {
    category: "sections",
    title: "Brand Press Kit Download",
    description: "A media assets and brand press resource section with vector logos, color codes, and download bundles.",
    difficulty: "starter",
    subcategory: "brand",
    fingerprint: {
      interactionModel: "brand-press-kit-download-interaction",
      visualModel: "brand-press-kit-download-visual",
      motionModel: "subtle",
      layoutModel: "mosaic-layout",
      semanticPurpose: "brand-press-kit-download-section",
    },
    tags: ["brand", "press", "kit", "download", "assets"],
    dependencies: [],
    dna: {
      macrostructure: "mosaic",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
      shapeLanguage: "sharp",
      density: "medium",
      genre: "minimal",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface BrandAsset {
  name: string;
  format: "SVG" | "PNG" | "PDF" | "ZIP";
  size: string;
  description: string;
}

export interface BrandPressKitDownloadProps extends React.HTMLAttributes<HTMLElement> {
  assets?: BrandAsset[];
}

const DEFAULT_ASSETS: BrandAsset[] = [
  { name: "Primary Wordmark (Dark & Light)", format: "SVG", size: "48 KB", description: "Standard vector wordmark for digital displays." },
  { name: "Brand Symbol Monogram", format: "SVG", size: "16 KB", description: "Square icon monogram for favicons and avatars." },
  { name: "Color Palette Guideline Sheet", format: "PDF", size: "1.2 MB", description: "Design DNA tokens, hex codes, and contrast ratios." },
  { name: "Complete Media Press Kit", format: "ZIP", size: "8.4 MB", description: "High-resolution mockups, badges, and founder headshots." },
];

export function BrandPressKitDownload({
  assets = DEFAULT_ASSETS,
  className,
  ...props
}: BrandPressKitDownloadProps) {
  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-5xl mx-auto", className)} {...props}>
      <div className="mb-10">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold">
          Media Assets
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-1">
          Brand Guidelines & Press Kit
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
          Official assets for journalists, conference organizers, and partner publications.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {assets.map((asset) => (
          <div
            key={asset.name}
            className="p-5 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-white dark:bg-neutral-950 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-bold">
                  {asset.format} • {asset.size}
                </span>
              </div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 mt-3">
                {asset.name}
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                {asset.description}
              </p>
            </div>
            <button
              type="button"
              className="mt-6 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline text-left flex items-center gap-1"
            >
              Download Asset ↓
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { BrandPressKitDownload } from "./brand-press-kit-download";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900/50">
      <BrandPressKitDownload />
    </div>
  );
}
`,
  }),

  P("open-source-contribution-wall", {
    category: "sections",
    title: "Open Source Contribution Wall",
    description: "A community recognition board displaying GitHub stars, active PR contributors, and sponsorship tiers.",
    difficulty: "intermediate",
    subcategory: "community",
    fingerprint: {
      interactionModel: "open-source-contribution-wall-interaction",
      visualModel: "open-source-contribution-wall-visual",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "open-source-contribution-wall-section",
    },
    tags: ["open-source", "contributors", "github", "community", "sponsors"],
    dependencies: [],
    dna: {
      macrostructure: "stack",
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

export interface Contributor {
  handle: string;
  contributions: number;
  avatarLetter: string;
}

export interface OpenSourceContributionWallProps extends React.HTMLAttributes<HTMLElement> {
  stars?: string;
  forks?: string;
  contributors?: Contributor[];
}

const DEFAULT_CONTRIBUTORS: Contributor[] = [
  { handle: "cyrilchris", contributions: 420, avatarLetter: "C" },
  { handle: "elena-r", contributions: 184, avatarLetter: "E" },
  { handle: "marcus_v", contributions: 98, avatarLetter: "M" },
  { handle: "devon_dev", contributions: 74, avatarLetter: "D" },
  { handle: "alex_cloud", contributions: 52, avatarLetter: "A" },
  { handle: "sara_design", contributions: 41, avatarLetter: "S" },
];

export function OpenSourceContributionWall({
  stars = "14.2k",
  forks = "1.8k",
  contributors = DEFAULT_CONTRIBUTORS,
  className,
  ...props
}: OpenSourceContributionWallProps) {
  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-5xl mx-auto", className)} {...props}>
      <div className="bg-neutral-950 text-neutral-100 border border-neutral-800 rounded-2xl p-6 md:p-10 font-mono">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-neutral-800">
          <div>
            <div className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
              Community Driven
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-1">
              Built in public by 200+ contributors
            </h2>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="p-3 bg-neutral-900 border border-neutral-800 rounded text-center">
              <div className="text-lg font-bold text-white">{stars}</div>
              <div className="text-[10px] text-neutral-400">GitHub Stars</div>
            </div>
            <div className="p-3 bg-neutral-900 border border-neutral-800 rounded text-center">
              <div className="text-lg font-bold text-white">{forks}</div>
              <div className="text-[10px] text-neutral-400">Forks</div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="text-xs text-neutral-400 uppercase tracking-wider mb-4">
            Recent Code Contributors
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {contributors.map((c) => (
              <div
                key={c.handle}
                className="p-3 rounded bg-neutral-900/60 border border-neutral-800 flex items-center gap-3"
              >
                <div className="h-7 w-7 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-300 flex items-center justify-center text-xs font-bold">
                  {c.avatarLetter}
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold truncate text-neutral-200">@{c.handle}</div>
                  <div className="text-[10px] text-neutral-500">{c.contributions} commits</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { OpenSourceContributionWall } from "./open-source-contribution-wall";

export default function Demo() {
  return (
    <div className="w-full min-h-[400px] flex items-center justify-center p-4 bg-neutral-900">
      <OpenSourceContributionWall />
    </div>
  );
}
`,
  }),

  P("customer-feedback-sentiment", {
    category: "sections",
    title: "Customer Feedback Sentiment",
    description: "An aggregate user rating overview with NPS score breakdown, star reviews, and verified feedback quotes.",
    difficulty: "starter",
    subcategory: "reviews",
    fingerprint: {
      interactionModel: "customer-feedback-sentiment-interaction",
      visualModel: "customer-feedback-sentiment-visual",
      motionModel: "subtle",
      layoutModel: "split-layout",
      semanticPurpose: "customer-feedback-sentiment-section",
    },
    tags: ["feedback", "sentiment", "nps", "ratings", "reviews"],
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

export interface RatingBreakdown {
  stars: number;
  percentage: number;
}

export interface CustomerFeedbackSentimentProps extends React.HTMLAttributes<HTMLElement> {
  score?: number;
  totalReviews?: number;
  breakdown?: RatingBreakdown[];
}

const DEFAULT_BREAKDOWN: RatingBreakdown[] = [
  { stars: 5, percentage: 88 },
  { stars: 4, percentage: 9 },
  { stars: 3, percentage: 2 },
  { stars: 2, percentage: 1 },
  { stars: 1, percentage: 0 },
];

export function CustomerFeedbackSentiment({
  score = 4.9,
  totalReviews = 1420,
  breakdown = DEFAULT_BREAKDOWN,
  className,
  ...props
}: CustomerFeedbackSentimentProps) {
  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-4xl mx-auto", className)} {...props}>
      <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 text-center md:text-left border-b md:border-b-0 md:border-r border-neutral-200 dark:border-neutral-800 pb-6 md:pb-0 md:pr-8">
            <div className="text-5xl font-extrabold text-neutral-900 dark:text-neutral-100">
              {score}
            </div>
            <div className="text-amber-400 text-lg tracking-widest mt-1">★★★★★</div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
              Based on {totalReviews.toLocaleString()} verified developer ratings
            </div>
          </div>

          <div className="md:col-span-7 space-y-2">
            {breakdown.map((row) => (
              <div key={row.stars} className="flex items-center gap-3 text-xs font-mono">
                <span className="w-12 text-neutral-500">{row.stars} Stars</span>
                <div className="flex-1 h-2 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full"
                    style={{ width: \`\${row.percentage}%\` }}
                  />
                </div>
                <span className="w-10 text-right text-neutral-400">{row.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { CustomerFeedbackSentiment } from "./customer-feedback-sentiment";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900/40">
      <CustomerFeedbackSentiment />
    </div>
  );
}
`,
  }),

  P("interactive-feature-comparison", {
    category: "sections",
    title: "Interactive Feature Comparison",
    description: "A comprehensive side-by-side comparison table contrasting OpenUI with legacy UI libraries across specs.",
    difficulty: "intermediate",
    subcategory: "comparison",
    fingerprint: {
      interactionModel: "interactive-feature-comparison-interaction",
      visualModel: "interactive-feature-comparison-visual",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "interactive-feature-comparison-section",
    },
    tags: ["comparison", "features", "versus", "specs", "table"],
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

export interface ComparisonRow {
  feature: string;
  openui: string | boolean;
  legacy: string | boolean;
}

export interface InteractiveFeatureComparisonProps extends React.HTMLAttributes<HTMLElement> {
  rows?: ComparisonRow[];
}

const DEFAULT_ROWS: ComparisonRow[] = [
  { feature: "Bundle Cost", openui: "Zero runtime dependencies", legacy: "250kb+ bundled node_modules" },
  { feature: "Code Ownership", openui: "Full local copy in your src/", legacy: "Locked in node_modules" },
  { feature: "Type Safety", openui: "Strict TypeScript zero 'any'", legacy: "Loosely typed or any casts" },
  { feature: "Design Invariants", openui: "Machine-verifiable Design DNA", legacy: "Ad-hoc inline styles" },
  { feature: "Next.js 15+ Native", openui: "Server Actions & React 19 Ready", legacy: "Client-only wrappers required" },
];

export function InteractiveFeatureComparison({
  rows = DEFAULT_ROWS,
  className,
  ...props
}: InteractiveFeatureComparisonProps) {
  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-5xl mx-auto", className)} {...props}>
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Why architects choose OpenUI
        </h2>
        <p className="text-xs text-neutral-500 mt-2">
          Compare our decentralized registry design against traditional centralized npm UI libraries.
        </p>
      </div>

      <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden bg-white dark:bg-neutral-950">
        <div className="grid grid-cols-12 bg-neutral-100 dark:bg-neutral-900 p-4 font-mono text-xs font-bold border-b border-neutral-200 dark:border-neutral-800">
          <div className="col-span-4 text-neutral-500 uppercase">Capability</div>
          <div className="col-span-4 text-emerald-600 dark:text-emerald-400">OpenUI Registry</div>
          <div className="col-span-4 text-neutral-400">Legacy UI Libraries</div>
        </div>

        <div className="divide-y divide-neutral-100 dark:divide-neutral-800 text-xs">
          {rows.map((row, idx) => (
            <div key={idx} className="grid grid-cols-12 p-4 items-center">
              <div className="col-span-4 font-medium text-neutral-900 dark:text-neutral-100">
                {row.feature}
              </div>
              <div className="col-span-4 font-semibold text-emerald-600 dark:text-emerald-400">
                {typeof row.openui === "boolean" ? (row.openui ? "✓ Yes" : "✕ No") : row.openui}
              </div>
              <div className="col-span-4 text-neutral-500">
                {typeof row.legacy === "boolean" ? (row.legacy ? "✓ Yes" : "✕ No") : row.legacy}
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

import { InteractiveFeatureComparison } from "./interactive-feature-comparison";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900/50">
      <InteractiveFeatureComparison />
    </div>
  );
}
`,
  }),

  P("podcast-episode-stage", {
    category: "sections",
    title: "Podcast Episode Stage",
    description: "A featured multimedia stage showcasing podcast interviews, interactive progress scrubbers, and guest credentials.",
    difficulty: "intermediate",
    subcategory: "media",
    fingerprint: {
      interactionModel: "podcast-episode-stage-interaction",
      visualModel: "podcast-episode-stage-visual",
      motionModel: "subtle",
      layoutModel: "split-layout",
      semanticPurpose: "podcast-episode-stage-section",
    },
    tags: ["podcast", "media", "audio", "interview", "episode"],
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

export interface PodcastEpisodeStageProps extends React.HTMLAttributes<HTMLElement> {
  episodeNumber?: string;
  title?: string;
  guest?: string;
  duration?: string;
}

export function PodcastEpisodeStage({
  episodeNumber = "EPISODE 42",
  title = "Designing the Next Decade of React & V8 Interfaces",
  guest = "with Elena Rostova & Cyril Chris",
  duration = "48 min",
  className,
  ...props
}: PodcastEpisodeStageProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);

  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-5xl mx-auto", className)} {...props}>
      <div className="bg-neutral-900 text-white rounded-2xl p-6 md:p-10 border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl">
          <div className="flex items-center gap-3 text-xs font-mono text-emerald-400">
            <span>{episodeNumber}</span>
            <span>•</span>
            <span>{duration}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-2">
            {title}
          </h2>
          <p className="text-xs text-neutral-400 mt-2 font-mono">
            {guest}
          </p>
        </div>

        <div className="flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="h-16 w-16 rounded-full bg-white text-neutral-900 flex items-center justify-center text-xl font-bold hover:scale-105 transition-transform shadow-lg"
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>
          <span className="text-[11px] font-mono text-neutral-400">
            {isPlaying ? "Playing snippet..." : "Play 2m preview"}
          </span>
        </div>
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { PodcastEpisodeStage } from "./podcast-episode-stage";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] flex items-center justify-center p-4 bg-neutral-950">
      <PodcastEpisodeStage />
    </div>
  );
}
`,
  }),

  P("investor-metrics-deck", {
    category: "sections",
    title: "Investor Metrics Deck",
    description: "A financial telemetry summary presenting capital efficiency, ARR growth rates, and market penetration.",
    difficulty: "starter",
    subcategory: "investors",
    fingerprint: {
      interactionModel: "investor-metrics-deck-interaction",
      visualModel: "investor-metrics-deck-visual",
      motionModel: "subtle",
      layoutModel: "mosaic-layout",
      semanticPurpose: "investor-metrics-deck-section",
    },
    tags: ["investors", "metrics", "arr", "growth", "finance"],
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

export interface MetricCard {
  label: string;
  metric: string;
  detail: string;
}

export interface InvestorMetricsDeckProps extends React.HTMLAttributes<HTMLElement> {
  metrics?: MetricCard[];
}

const DEFAULT_METRICS: MetricCard[] = [
  { label: "ANNUAL RUN RATE", metric: "$42.8M", detail: "100% organic software revenue" },
  { label: "NET RETENTION", metric: "138%", detail: "Best-in-class enterprise expansion" },
  { label: "GROSS MARGIN", metric: "84%", detail: "Sub-millisecond edge architecture" },
  { label: "TOTAL MAU", metric: "2.4M", detail: "Active web client sessions daily" },
];

export function InvestorMetricsDeck({
  metrics = DEFAULT_METRICS,
  className,
  ...props
}: InvestorMetricsDeckProps) {
  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-5xl mx-auto", className)} {...props}>
      <div className="mb-8">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold">
          Financial Disclosures
        </span>
        <h2 className="text-2xl font-bold font-mono tracking-tight text-neutral-900 dark:text-neutral-100 mt-1">
          Q3 2026 Telemetry & Capital Efficiency
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="p-5 border-2 border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 font-mono"
          >
            <div className="text-[10px] text-neutral-500 uppercase tracking-wider">{m.label}</div>
            <div className="text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 mt-2">
              {m.metric}
            </div>
            <div className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-1">{m.detail}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { InvestorMetricsDeck } from "./investor-metrics-deck";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] flex items-center justify-center p-4 bg-white dark:bg-neutral-950">
      <InvestorMetricsDeck />
    </div>
  );
}
`,
  }),

  P("compliance-gdpr-consent-strip", {
    category: "sections",
    title: "Compliance GDPR Consent Strip",
    description: "A regulatory privacy consent banner supporting essential, analytical, and marketing preference toggles.",
    difficulty: "starter",
    subcategory: "privacy",
    fingerprint: {
      interactionModel: "compliance-gdpr-consent-strip-interaction",
      visualModel: "compliance-gdpr-consent-strip-visual",
      motionModel: "subtle",
      layoutModel: "full-bleed-layout",
      semanticPurpose: "compliance-gdpr-consent-strip-section",
    },
    tags: ["privacy", "gdpr", "consent", "cookie", "banner"],
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

export interface ComplianceGdprConsentStripProps extends React.HTMLAttributes<HTMLElement> {
  onAcceptAll?: () => void;
  onRejectAll?: () => void;
}

export function ComplianceGdprConsentStrip({
  onAcceptAll,
  onRejectAll,
  className,
  ...props
}: ComplianceGdprConsentStripProps) {
  const [closed, setClosed] = React.useState(false);

  if (closed) return null;

  return (
    <section
      className={cn(
        "w-full border-t border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-sm p-4 md:px-8",
        className
      )}
      {...props}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-xs text-neutral-600 dark:text-neutral-400 max-w-2xl">
          We adhere strictly to GDPR and CCPA guidelines. We do not sell personal telemetry. Zero third-party tracker cookies are set without your consent.
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              onRejectAll?.();
              setClosed(true);
            }}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
          >
            Essential Only
          </button>
          <button
            type="button"
            onClick={() => {
              onAcceptAll?.();
              setClosed(true);
            }}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
          >
            Accept All Preferences
          </button>
        </div>
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { ComplianceGdprConsentStrip } from "./compliance-gdpr-consent-strip";

export default function Demo() {
  return (
    <div className="w-full min-h-[200px] flex items-end justify-center bg-neutral-100 dark:bg-neutral-900">
      <ComplianceGdprConsentStrip />
    </div>
  );
}
`,
  }),

  P("mobile-app-sync-feature", {
    category: "sections",
    title: "Mobile App Sync Feature",
    description: "An omnichannel app showcase card highlighting iOS and Android synchronization with QR code download.",
    difficulty: "intermediate",
    subcategory: "mobile",
    fingerprint: {
      interactionModel: "mobile-app-sync-feature-interaction",
      visualModel: "mobile-app-sync-feature-visual",
      motionModel: "subtle",
      layoutModel: "split-layout",
      semanticPurpose: "mobile-app-sync-feature-section",
    },
    tags: ["mobile", "app", "ios", "android", "sync"],
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

export interface MobileAppSyncFeatureProps extends React.HTMLAttributes<HTMLElement> {
  headline?: string;
  description?: string;
}

export function MobileAppSyncFeature({
  headline = "Your workspace synced everywhere, offline-first",
  description = "Review telemetry, approve pull requests, and monitor production health checks straight from your pocket with native biometric access.",
  className,
  ...props
}: MobileAppSyncFeatureProps) {
  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-5xl mx-auto", className)} {...props}>
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-8 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-7">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold">
            Companion Apps
          </span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-2">
            {headline}
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-3 leading-relaxed">
            {description}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              className="px-4 py-2.5 rounded-xl bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 text-xs font-semibold"
            >
              Download on App Store
            </button>
            <button
              type="button"
              className="px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-semibold"
            >
              Get it on Google Play
            </button>
          </div>
        </div>

        <div className="md:col-span-5 flex justify-center">
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center shadow-md">
            <div className="h-32 w-32 mx-auto bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center font-mono text-[10px] text-neutral-400">
              [QR CODE SYNC]
            </div>
            <div className="text-xs font-mono text-neutral-500 mt-3">Scan to instant install</div>
          </div>
        </div>
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { MobileAppSyncFeature } from "./mobile-app-sync-feature";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] flex items-center justify-center p-4 bg-white dark:bg-neutral-900/40">
      <MobileAppSyncFeature />
    </div>
  );
}
`,
  }),

  P("mega-sitemap-footer", {
    category: "sections",
    title: "Mega Sitemap Footer",
    description: "A comprehensive multi-column site directory footer with legal links, social handles, and system status indicator.",
    difficulty: "starter",
    subcategory: "navigation",
    fingerprint: {
      interactionModel: "mega-sitemap-footer-interaction",
      visualModel: "mega-sitemap-footer-visual",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "mega-sitemap-footer-section",
    },
    tags: ["footer", "sitemap", "navigation", "directory", "legal"],
    dependencies: [],
    dna: {
      macrostructure: "stack",
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

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface MegaSitemapFooterProps extends React.HTMLAttributes<HTMLElement> {
  columns?: FooterColumn[];
}

const DEFAULT_COLUMNS: FooterColumn[] = [
  {
    title: "Registry",
    links: [
      { label: "Components (100)", href: "/components" },
      { label: "Text (100)", href: "/text" },
      { label: "Motion (100)", href: "/motion" },
      { label: "Interactions (100)", href: "/interactions" },
    ],
  },
  {
    title: "Architecture",
    links: [
      { label: "Backgrounds (100)", href: "/backgrounds" },
      { label: "Layouts (100)", href: "/layouts" },
      { label: "Sections (100)", href: "/sections" },
      { label: "Blocks (100)", href: "/blocks" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "CLI Documentation", href: "/docs" },
      { label: "GitHub Repository", href: "https://github.com/cyrilchris-j/openui" },
      { label: "Discord Community", href: "/community" },
      { label: "System Telemetry", href: "/status" },
    ],
  },
  {
    title: "Legal & Trust",
    links: [
      { label: "MIT License", href: "/license" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Security Disclosures", href: "/security" },
      { label: "SOC2 Compliance", href: "/trust" },
    ],
  },
];

export function MegaSitemapFooter({
  columns = DEFAULT_COLUMNS,
  className,
  ...props
}: MegaSitemapFooterProps) {
  return (
    <footer className={cn("w-full border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 py-16 px-4 md:px-8", className)} {...props}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-neutral-200 dark:border-neutral-800">
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5 text-xs">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>© {new Date().getFullYear()} OpenUI Open Source Project. MIT Licensed.</div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>All systems nominal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
`,
    demo: `"use client";

import { MegaSitemapFooter } from "./mega-sitemap-footer";

export default function Demo() {
  return (
    <div className="w-full bg-white dark:bg-neutral-950">
      <MegaSitemapFooter />
    </div>
  );
}
`,
  }),
];

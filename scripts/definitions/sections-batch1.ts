import type { ResourceDefinition } from "../lib/definitions.js";

const P = (name: string, definition: Omit<ResourceDefinition, "name">): ResourceDefinition => ({
  name,
  ...definition,
});

export default [
  P("split-headline-hero", {
    category: "sections",
    subcategory: "heroes",
    title: "Split Headline Hero",
    description: "High-impact landing hero with uppercase eyebrow, asymmetric headline, primary action buttons, and live stats badge.",
    tags: ["hero", "headline", "landing", "marketing", "split"],
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
      interactionModel: "hero-action-dispatch",
      visualModel: "asymmetric-headline-block",
      motionModel: "none",
      layoutModel: "side-by-side-hero",
      semanticPurpose: "landing-hero-section",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface SplitHeadlineHeroProps extends React.HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
}

export function SplitHeadlineHero({
  eyebrow = "OPENUI DESIGN REGISTRY",
  title = "Interfaces should have a fingerprint.",
  description = "A curated collection of 800 unique, production-verified React resources with strict schema validation and zero external UI dependencies.",
  primaryAction,
  secondaryAction,
  className,
  ...props
}: SplitHeadlineHeroProps) {
  return (
    <section className={cn("py-16 px-6 max-w-5xl mx-auto font-sans bg-paper text-ink", className)} {...props}>
      <div className="inline-block font-mono text-[11px] font-semibold text-accent uppercase tracking-wider mb-3 px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20">
        {eyebrow}
      </div>
      <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-ink max-w-3xl leading-[1.15] mb-4">
        {title}
      </h1>
      <p className="text-sm sm:text-base text-ink/70 max-w-2xl leading-relaxed mb-8">
        {description}
      </p>
      <div className="flex flex-wrap items-center gap-3">
        {primaryAction ?? (
          <button type="button" className="px-5 py-2.5 rounded-xl bg-accent text-white text-xs font-mono font-bold hover:bg-accent/90 transition-transform active:scale-95 shadow-sm">
            Explore 800 Resources →
          </button>
        )}
        {secondaryAction ?? (
          <button type="button" className="px-5 py-2.5 rounded-xl border border-line bg-surface/50 text-ink text-xs font-mono font-semibold hover:bg-surface transition-colors">
            Documentation
          </button>
        )}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { SplitHeadlineHero } from "./split-headline-hero";

export default function SplitHeadlineHeroDemo() {
  return <SplitHeadlineHero />;
}
`,
  }),

  P("bento-feature-showcase", {
    category: "sections",
    subcategory: "features",
    title: "Bento Feature Showcase",
    description: "Four-card modular bento grid showcasing core ecosystem features with varied aspect ratios.",
    tags: ["bento", "features", "grid", "showcase", "cards"],
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
      interactionModel: "bento-tile-inspection",
      visualModel: "four-card-bento-matrix",
      motionModel: "none",
      layoutModel: "asymmetric-mosaic-grid",
      semanticPurpose: "product-features-bento",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface BentoFeatureShowcaseProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  subtitle?: string;
}

export function BentoFeatureShowcase({
  title = "Engineered for Mathematical Precision",
  subtitle = "Every component is verified against closed types and distinct behavioral fingerprints.",
  className,
  ...props
}: BentoFeatureShowcaseProps) {
  return (
    <section className={cn("py-16 px-6 max-w-5xl mx-auto font-sans bg-paper text-ink", className)} {...props}>
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">{title}</h2>
        <p className="text-xs sm:text-sm text-ink/60 mt-2">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 p-6 rounded-2xl border border-line bg-surface/30 flex flex-col justify-between h-56">
          <div className="font-mono text-xs font-bold text-accent">01 // Zero Placeholders</div>
          <div>
            <h3 className="text-base font-bold text-ink">800 Fully Materialized Resources</h3>
            <p className="text-xs text-ink/60 mt-1">100 in each of 8 countable categories with real executable TypeScript source.</p>
          </div>
        </div>
        <div className="p-6 rounded-2xl border border-line bg-surface/30 flex flex-col justify-between h-56">
          <div className="font-mono text-xs font-bold text-emerald-600">02 // Validation</div>
          <div>
            <h3 className="text-sm font-bold text-ink">Closed Schema</h3>
            <p className="text-xs text-ink/60 mt-1">Strict compile-time schema validation with zero runtime warnings.</p>
          </div>
        </div>
        <div className="p-6 rounded-2xl border border-line bg-surface/30 flex flex-col justify-between h-56">
          <div className="font-mono text-xs font-bold text-purple-600">03 // Tokens</div>
          <div>
            <h3 className="text-sm font-bold text-ink">CSS Custom Properties</h3>
            <p className="text-xs text-ink/60 mt-1">Universal theme variable mappings with dark mode inheritance.</p>
          </div>
        </div>
        <div className="md:col-span-2 p-6 rounded-2xl border border-line bg-surface/30 flex flex-col justify-between h-56">
          <div className="font-mono text-xs font-bold text-sky-600">04 // Fingerprints</div>
          <div>
            <h3 className="text-base font-bold text-ink">Architectural Uniqueness Engine</h3>
            <p className="text-xs text-ink/60 mt-1">Guarantees zero conceptual duplicates across mechanisms, motions, and layouts.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { BentoFeatureShowcase } from "./bento-feature-showcase";

export default function BentoFeatureShowcaseDemo() {
  return <BentoFeatureShowcase />;
}
`,
  }),

  P("social-proof-logo-cloud", {
    category: "sections",
    subcategory: "social-proof",
    title: "Social Proof Logo Cloud",
    description: "Monochromatic partner/customer logo cloud with trust header and active installation count.",
    tags: ["logos", "partners", "social-proof", "trust", "brands"],
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
      interactionModel: "passive-brand-cloud",
      visualModel: "monochromatic-logo-ribbon",
      motionModel: "none",
      layoutModel: "horizontal-partner-strip",
      semanticPurpose: "client-trust-showcase",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface SocialProofLogoCloudProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  brands?: string[];
}

export function SocialProofLogoCloud({
  title = "TRUSTED BY LEADING AUTONOMOUS ENGINEERING TEAMS",
  brands = ["DeepMind", "Google AGY", "Vercel", "Supabase", "Linear", "Raycast"],
  className,
  ...props
}: SocialProofLogoCloudProps) {
  return (
    <section className={cn("py-12 px-6 max-w-5xl mx-auto font-sans text-center bg-paper text-ink", className)} {...props}>
      <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink/50 mb-8">{title}</p>
      <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-60">
        {brands.map((brand) => (
          <span key={brand} className="font-mono text-sm font-bold tracking-tight text-ink/80 hover:opacity-100 transition-opacity">
            {brand}
          </span>
        ))}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { SocialProofLogoCloud } from "./social-proof-logo-cloud";

export default function SocialProofLogoCloudDemo() {
  return <SocialProofLogoCloud />;
}
`,
  }),

  P("customer-quote-carousel", {
    category: "sections",
    subcategory: "social-proof",
    title: "Customer Quote Carousel",
    description: "Verified customer testimonial card with pull-quote statement, author avatar, credentials, and verification seal.",
    tags: ["testimonials", "quotes", "social-proof", "reviews", "author"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "editorial",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "none",
      typographyStyle: "serif-display",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "quote-testimony-presentation",
      visualModel: "bordered-quote-card",
      motionModel: "none",
      layoutModel: "centered-testimonial-card",
      semanticPurpose: "customer-testimony-section",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface CustomerQuoteCarouselProps extends React.HTMLAttributes<HTMLElement> {
  quote?: string;
  author?: string;
  role?: string;
  org?: string;
}

export function CustomerQuoteCarousel({
  quote = "“OpenUI eliminated months of boilerplate. Having exactly 800 working, installable resources with distinct architectural fingerprints transformed how we orchestrate autonomous frontends.”",
  author = "Dr. Marcus Vance",
  role = "VP of Architecture",
  org = "Autonomous Intelligence Labs",
  className,
  ...props
}: CustomerQuoteCarouselProps) {
  return (
    <section className={cn("py-16 px-6 max-w-4xl mx-auto font-sans bg-paper text-ink", className)} {...props}>
      <div className="p-8 sm:p-12 rounded-3xl border border-line bg-surface/30 shadow-sm text-center">
        <blockquote className="font-serif text-lg sm:text-xl leading-relaxed text-ink mb-6 max-w-2xl mx-auto">
          {quote}
        </blockquote>
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center font-bold font-mono text-sm mb-2">
            MV
          </div>
          <div className="font-bold text-sm text-ink">{author}</div>
          <div className="text-xs text-ink/60 font-mono mt-0.5">{role} • {org}</div>
        </div>
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { CustomerQuoteCarousel } from "./customer-quote-carousel";

export default function CustomerQuoteCarouselDemo() {
  return <CustomerQuoteCarousel />;
}
`,
  }),

  P("three-tier-pricing-matrix", {
    category: "sections",
    subcategory: "pricing",
    title: "Three Tier Pricing Matrix",
    description: "SaaS subscription pricing section with monthly/yearly billing toggle and highlighted recommended tier.",
    tags: ["pricing", "tiers", "saas", "subscription", "plans"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "billing-interval-toggle",
      visualModel: "three-tier-card-comparison",
      motionModel: "none",
      layoutModel: "three-column-pricing-matrix",
      semanticPurpose: "saas-subscription-section",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ThreeTierPricingMatrixProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  subtitle?: string;
}

export function ThreeTierPricingMatrix({
  title = "Transparent, Predictable Plans",
  subtitle = "Start for free with open source components, upgrade for team synchronization.",
  className,
  ...props
}: ThreeTierPricingMatrixProps) {
  const [annual, setAnnual] = useState(true);

  return (
    <section className={cn("py-16 px-6 max-w-5xl mx-auto font-sans bg-paper text-ink", className)} {...props}>
      <div className="text-center max-w-xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">{title}</h2>
        <p className="text-xs sm:text-sm text-ink/60 mt-2">{subtitle}</p>
        <div className="inline-flex items-center gap-2 p-1 mt-6 rounded-full border border-line bg-surface text-xs font-mono">
          <button
            type="button"
            onClick={() => setAnnual(false)}
            className={cn("px-3 py-1 rounded-full transition-colors", !annual ? "bg-accent text-white font-bold" : "text-ink/70")}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setAnnual(true)}
            className={cn("px-3 py-1 rounded-full transition-colors", annual ? "bg-accent text-white font-bold" : "text-ink/70")}
          >
            Yearly (Save 20%)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="p-6 rounded-2xl border border-line bg-paper shadow-xs">
          <div className="font-bold text-sm text-ink">Community</div>
          <div className="text-2xl font-bold font-mono text-ink my-3">$0</div>
          <p className="text-xs text-ink/60 mb-4">Complete 800 open-source resources with MIT license.</p>
          <button type="button" className="w-full py-2 rounded-xl border border-line bg-surface text-xs font-mono font-semibold">Start Free</button>
        </div>

        <div className="p-8 rounded-3xl border-2 border-accent bg-paper shadow-xl relative">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-accent text-white text-[10px] font-mono font-bold uppercase">
            Recommended
          </span>
          <div className="font-bold text-base text-ink">Pro Architect</div>
          <div className="text-3xl font-bold font-mono text-ink my-3">
            {annual ? "$24" : "$29"}<span className="text-xs font-normal text-ink/60">/mo</span>
          </div>
          <p className="text-xs text-ink/60 mb-6">Automated design token pipelines and private registry hosting.</p>
          <button type="button" className="w-full py-2.5 rounded-xl bg-accent text-white text-xs font-mono font-bold hover:bg-accent/90 shadow-sm">
            Upgrade to Pro
          </button>
        </div>

        <div className="p-6 rounded-2xl border border-line bg-paper shadow-xs">
          <div className="font-bold text-sm text-ink">Enterprise</div>
          <div className="text-2xl font-bold font-mono text-ink my-3">Custom</div>
          <p className="text-xs text-ink/60 mb-4">Dedicated VPC instances and bespoke design DNA governance.</p>
          <button type="button" className="w-full py-2 rounded-xl border border-line bg-surface text-xs font-mono font-semibold">Contact Sales</button>
        </div>
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { ThreeTierPricingMatrix } from "./three-tier-pricing-matrix";

export default function ThreeTierPricingMatrixDemo() {
  return <ThreeTierPricingMatrix />;
}
`,
  }),

  P("interactive-faq-accordion", {
    category: "sections",
    subcategory: "faq",
    title: "Interactive FAQ Accordion",
    description: "Frequently asked questions section with tidy stacked disclosures and animated chevron toggles.",
    tags: ["faq", "accordion", "questions", "support", "answers"],
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
      interactionModel: "faq-disclosure-toggle",
      visualModel: "stacked-faq-panels",
      motionModel: "none",
      layoutModel: "centered-faq-stack",
      semanticPurpose: "faq-question-section",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface FAQItem {
  q: string;
  a: string;
}

export interface InteractiveFAQAccordionProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  items?: FAQItem[];
}

export function InteractiveFAQAccordion({
  title = "Frequently Asked Questions",
  items = [
    {
      q: "How does OpenUI enforce the 800-resource contract?",
      a: "Every resource belongs to one of eight countable categories (100 each) and is validated by automated CLI tests. If any category drops below 100 or contains duplicate fingerprints, the build fails.",
    },
    {
      q: "Do I need to install heavy component libraries?",
      a: "No. Every resource is standalone with zero external UI dependencies. You simply copy-paste or install via the OpenUI CLI.",
    },
    {
      q: "What is Design DNA?",
      a: "Design DNA defines closed algebraic enums for macrostructure, motionLanguage, typographyStyle, colorStrategy, shapeLanguage, and density.",
    },
  ],
  className,
  ...props
}: InteractiveFAQAccordionProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className={cn("py-16 px-6 max-w-3xl mx-auto font-sans bg-paper text-ink", className)} {...props}>
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink text-center mb-10">{title}</h2>
      <div className="space-y-3">
        {items.map((item, idx) => {
          const isOpen = open === idx;
          return (
            <div key={item.q} className="rounded-2xl border border-line bg-paper overflow-hidden transition-colors shadow-xs">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : idx)}
                className="w-full p-5 text-left font-bold text-sm text-ink flex items-center justify-between gap-4"
              >
                <span>{item.q}</span>
                <span className="font-mono text-base text-ink/40">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-xs text-ink/70 leading-relaxed border-t border-line/50 pt-3">
                  {item.a}
                </div>
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

import { InteractiveFAQAccordion } from "./interactive-faq-accordion";

export default function InteractiveFAQAccordionDemo() {
  return <InteractiveFAQAccordion />;
}
`,
  }),

  P("newsletter-subscribe-strip", {
    category: "sections",
    subcategory: "cta",
    title: "Newsletter Subscribe Strip",
    description: "Compact horizontal email capture strip with privacy guarantee and subscription confirmation feedback.",
    tags: ["newsletter", "subscribe", "email", "cta", "capture"],
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
      interactionModel: "email-capture-form",
      visualModel: "horizontal-email-strip",
      motionModel: "none",
      layoutModel: "centered-capture-box",
      semanticPurpose: "newsletter-capture-section",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface NewsletterSubscribeStripProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  description?: string;
}

export function NewsletterSubscribeStrip({
  title = "Subscribe to Design Registry Updates",
  description = "Get weekly curated releases of new procedural components and design DNA specifications.",
  className,
  ...props
}: NewsletterSubscribeStripProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <section className={cn("py-12 px-6 max-w-4xl mx-auto font-sans bg-paper text-ink", className)} {...props}>
      <div className="p-8 rounded-3xl border border-line bg-surface/30 text-center space-y-4">
        <h3 className="text-xl font-bold tracking-tight text-ink">{title}</h3>
        <p className="text-xs text-ink/60 max-w-md mx-auto">{description}</p>
        {subscribed ? (
          <div className="p-3 rounded-xl bg-emerald-500/15 text-emerald-600 font-mono text-xs font-semibold">
            ✓ Subscription confirmed. Welcome to OpenUI Registry.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="developer@company.com"
              required
              className="w-full sm:w-72 px-4 py-2 rounded-xl border border-line bg-paper text-xs text-ink focus:outline-none focus:border-accent font-mono"
            />
            <button type="submit" className="w-full sm:w-auto px-5 py-2 rounded-xl bg-accent text-white text-xs font-mono font-bold hover:bg-accent/90 transition-colors">
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { NewsletterSubscribeStrip } from "./newsletter-subscribe-strip";

export default function NewsletterSubscribeStripDemo() {
  return <NewsletterSubscribeStrip />;
}
`,
  }),

  P("team-collaborator-roster", {
    category: "sections",
    subcategory: "team",
    title: "Team Collaborator Roster",
    description: "Team profile grid showcasing principal architects, designers, and systems engineers.",
    tags: ["team", "roster", "collaborators", "people", "profiles"],
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
      interactionModel: "team-member-inspection",
      visualModel: "avatar-card-cluster",
      motionModel: "none",
      layoutModel: "multi-column-member-grid",
      semanticPurpose: "team-member-showcase",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface TeamMember {
  name: string;
  role: string;
  handle: string;
}

export interface TeamCollaboratorRosterProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  members?: TeamMember[];
}

export function TeamCollaboratorRoster({
  title = "Core Architecture Team",
  members = [
    { name: "Cyril Chris", role: "Principal Architect", handle: "@cyrilchris" },
    { name: "Elena Rostova", role: "Lead Design Systems", handle: "@elena_design" },
    { name: "Marcus Vance", role: "Verification & Rigor", handle: "@marcus_v" },
    { name: "Devon Reed", role: "Developer Experience", handle: "@devonreed" },
  ],
  className,
  ...props
}: TeamCollaboratorRosterProps) {
  return (
    <section className={cn("py-16 px-6 max-w-5xl mx-auto font-sans bg-paper text-ink", className)} {...props}>
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink text-center mb-10">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {members.map((m) => (
          <div key={m.name} className="p-6 rounded-2xl border border-line bg-paper text-center shadow-xs">
            <div className="w-16 h-16 rounded-full bg-accent/20 text-accent font-mono font-bold text-base flex items-center justify-center mx-auto mb-4">
              {m.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="font-bold text-sm text-ink">{m.name}</div>
            <div className="text-xs text-ink/60 mt-0.5">{m.role}</div>
            <div className="text-[11px] font-mono text-accent mt-2">{m.handle}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { TeamCollaboratorRoster } from "./team-collaborator-roster";

export default function TeamCollaboratorRosterDemo() {
  return <TeamCollaboratorRoster />;
}
`,
  }),

  P("stats-telemetry-banner", {
    category: "sections",
    subcategory: "stats",
    title: "Stats Telemetry Banner",
    description: "Numeric telemetry showcase highlighting scale metrics: 800 components, 14 packages, 0 errors.",
    tags: ["stats", "telemetry", "metrics", "kpi", "numbers"],
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
      interactionModel: "telemetry-stat-scan",
      visualModel: "metric-counter-strip",
      motionModel: "none",
      layoutModel: "four-column-stat-banner",
      semanticPurpose: "scale-proof-telemetry",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface StatItem {
  metric: string;
  label: string;
}

export interface StatsTelemetryBannerProps extends React.HTMLAttributes<HTMLElement> {
  stats?: StatItem[];
}

export function StatsTelemetryBanner({
  stats = [
    { metric: "800", label: "Unique Working Resources" },
    { metric: "100%", label: "TypeScript Strictness" },
    { metric: "0ms", label: "Runtime Dependencies" },
    { metric: "14", label: "Monorepo Packages" },
  ],
  className,
  ...props
}: StatsTelemetryBannerProps) {
  return (
    <section className={cn("py-12 px-6 max-w-5xl mx-auto font-sans bg-paper text-ink", className)} {...props}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 rounded-3xl border border-line bg-surface/30">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-3xl sm:text-4xl font-bold font-mono text-ink tracking-tight">{s.metric}</div>
            <div className="text-xs text-ink/60 mt-1 font-sans">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { StatsTelemetryBanner } from "./stats-telemetry-banner";

export default function StatsTelemetryBannerDemo() {
  return <StatsTelemetryBanner />;
}
`,
  }),

  P("case-study-hero-card", {
    category: "sections",
    subcategory: "case-studies",
    title: "Case Study Hero Card",
    description: "Enterprise case study overview card with client logo, quantifiable outcome metrics, and quote.",
    tags: ["case-study", "customer", "outcome", "metrics", "hero"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "editorial",
      macrostructure: "split",
      density: "airy",
      shapeLanguage: "rounded",
      motionLanguage: "none",
      typographyStyle: "serif-display",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "case-study-hero-inspection",
      visualModel: "outcomes-and-narrative-split",
      motionModel: "none",
      layoutModel: "side-by-side-case-study",
      semanticPurpose: "customer-success-study",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface CaseStudyHeroCardProps extends React.HTMLAttributes<HTMLElement> {
  client?: string;
  headline?: string;
  metric?: string;
  metricLabel?: string;
}

export function CaseStudyHeroCard({
  client = "FINANCIAL SYSTEMS INC.",
  headline = "How a Tier-1 Fintech migrated 1,400 legacy views to OpenUI closed schemas in three sprints.",
  metric = "94% Less",
  metricLabel = "Frontend Regression Tickets",
  className,
  ...props
}: CaseStudyHeroCardProps) {
  return (
    <section className={cn("py-16 px-6 max-w-5xl mx-auto font-sans bg-paper text-ink", className)} {...props}>
      <div className="p-8 sm:p-12 rounded-3xl border border-line bg-surface/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-3">
          <div className="font-mono text-xs font-bold text-accent tracking-wider">{client}</div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-ink leading-snug">{headline}</h3>
          <p className="text-xs text-ink/60 font-sans">Verified deployment case study • Q3 2026</p>
        </div>
        <div className="lg:col-span-4 p-6 rounded-2xl border border-line bg-paper text-center shadow-xs">
          <div className="text-3xl font-bold font-mono text-emerald-600">{metric}</div>
          <div className="text-xs font-semibold text-ink mt-1 font-sans">{metricLabel}</div>
        </div>
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { CaseStudyHeroCard } from "./case-study-hero-card";

export default function CaseStudyHeroCardDemo() {
  return <CaseStudyHeroCard />;
}
`,
  }),

  P("feature-tabbed-walkthrough", {
    category: "sections",
    subcategory: "features",
    title: "Feature Tabbed Walkthrough",
    description: "Interactive tabbed feature demonstration switching between code AST, design tokens, and live visual preview.",
    tags: ["tabs", "walkthrough", "features", "code", "preview"],
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
      interactionModel: "tabbed-feature-switch",
      visualModel: "tabs-above-feature-stage",
      motionModel: "none",
      layoutModel: "tab-controlled-stage",
      semanticPurpose: "feature-deepdive-walkthrough",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface FeatureTabbedWalkthroughProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
}

export function FeatureTabbedWalkthrough({
  title = "Explore the Component Anatomy",
  className,
  ...props
}: FeatureTabbedWalkthroughProps) {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Design DNA", "TypeScript Props", "Registry Bundle"];

  return (
    <section className={cn("py-16 px-6 max-w-4xl mx-auto font-sans bg-paper text-ink", className)} {...props}>
      <h2 className="text-2xl font-bold text-center text-ink mb-6">{title}</h2>
      <div className="flex justify-center gap-2 mb-6">
        {tabs.map((tab, idx) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(idx)}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-mono transition-colors",
              activeTab === idx ? "bg-accent text-white font-bold" : "border border-line bg-surface text-ink/70 hover:bg-surface/80"
            )}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="p-6 rounded-2xl border border-line bg-surface/30 font-mono text-xs">
        {activeTab === 0 && <div>macrostructure: 'split' • motion: 'subtle' • typography: 'grotesk'</div>}
        {activeTab === 1 && <div>interface ComponentProps extends HTMLAttributes&lt;HTMLDivElement&gt;</div>}
        {activeTab === 2 && <div>// 800 JSON bundles published to apps/web/public/r/</div>}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { FeatureTabbedWalkthrough } from "./feature-tabbed-walkthrough";

export default function FeatureTabbedWalkthroughDemo() {
  return <FeatureTabbedWalkthrough />;
}
`,
  }),

  P("cta-conversion-billboard", {
    category: "sections",
    subcategory: "cta",
    title: "CTA Conversion Billboard",
    description: "High-contrast conversion billboard banner with clear headline, dual action triggers, and guarantee badge.",
    tags: ["cta", "conversion", "banner", "billboard", "action"],
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
      interactionModel: "conversion-billboard-dispatch",
      visualModel: "centered-billboard-banner",
      motionModel: "none",
      layoutModel: "centered-callout-card",
      semanticPurpose: "bottom-page-conversion-billboard",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface CTAConversionBillboardProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  description?: string;
}

export function CTAConversionBillboard({
  title = "Ready to build with architectural character?",
  description = "Access 800 verified, unique React resources. Zero placeholders. Zero runtime baggage.",
  className,
  ...props
}: CTAConversionBillboardProps) {
  return (
    <section className={cn("py-16 px-6 max-w-5xl mx-auto font-sans bg-paper text-ink", className)} {...props}>
      <div className="p-8 sm:p-14 rounded-3xl bg-slate-950 text-white text-center space-y-6 shadow-xl">
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight max-w-2xl mx-auto">{title}</h2>
        <p className="text-xs sm:text-sm text-white/70 max-w-xl mx-auto leading-relaxed">{description}</p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button type="button" className="px-6 py-3 rounded-xl bg-accent text-white font-mono text-xs font-bold hover:bg-accent/90 transition-transform active:scale-95 shadow-md">
            Start Building Free →
          </button>
          <button type="button" className="px-6 py-3 rounded-xl border border-white/20 bg-white/10 text-white font-mono text-xs font-semibold hover:bg-white/20 transition-colors">
            Read Architectural Guide
          </button>
        </div>
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { CTAConversionBillboard } from "./cta-conversion-billboard";

export default function CTAConversionBillboardDemo() {
  return <CTAConversionBillboard />;
}
`,
  }),

  P("audit-compliance-badges", {
    category: "sections",
    subcategory: "trust",
    title: "Audit Compliance Badges",
    description: "Enterprise compliance certifications rack displaying SOC 2 Type II, ISO 27001, GDPR, and HIPAA compliance.",
    tags: ["compliance", "security", "soc2", "gdpr", "trust"],
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
      interactionModel: "security-badge-verification",
      visualModel: "four-badge-compliance-rack",
      motionModel: "none",
      layoutModel: "horizontal-compliance-strip",
      semanticPurpose: "enterprise-compliance-display",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface AuditComplianceBadgesProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
}

export function AuditComplianceBadges({
  title = "ENTERPRISE COMPLIANCE & GOVERNANCE",
  className,
  ...props
}: AuditComplianceBadgesProps) {
  const badges = [
    { title: "SOC 2 Type II", desc: "Security & Confidentiality" },
    { title: "ISO / IEC 27001", desc: "Information Security" },
    { title: "GDPR Compliant", desc: "EU Data Sovereignty" },
    { title: "HIPAA Ready", desc: "Health Data Protection" },
  ];

  return (
    <section className={cn("py-12 px-6 max-w-5xl mx-auto font-mono text-xs bg-paper text-ink text-center", className)} {...props}>
      <div className="font-bold text-[11px] text-ink/50 tracking-wider uppercase mb-6">{title}</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {badges.map((b) => (
          <div key={b.title} className="p-4 rounded-xl border border-line bg-surface/30 text-center">
            <div className="w-8 h-8 rounded-full bg-emerald-500/15 text-emerald-600 font-bold flex items-center justify-center mx-auto mb-2 text-xs">
              ✓
            </div>
            <div className="font-bold text-ink">{b.title}</div>
            <div className="text-[10px] text-ink/60 mt-0.5 font-sans">{b.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { AuditComplianceBadges } from "./audit-compliance-badges";

export default function AuditComplianceBadgesDemo() {
  return <AuditComplianceBadges />;
}
`,
  }),

  P("comparison-versus-matrix", {
    category: "sections",
    subcategory: "comparison",
    title: "Comparison Versus Matrix",
    description: "Competitor comparison table contrasting OpenUI's verified architectural registry against generic UI libraries.",
    tags: ["comparison", "matrix", "versus", "features", "competitors"],
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
      interactionModel: "comparative-feature-audit",
      visualModel: "dual-column-versus-matrix",
      motionModel: "none",
      layoutModel: "tabular-comparison-matrix",
      semanticPurpose: "product-differentiation-matrix",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface ComparisonVersusMatrixProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
}

export function ComparisonVersusMatrix({
  title = "Why OpenUI Differs",
  className,
  ...props
}: ComparisonVersusMatrixProps) {
  const rows = [
    { metric: "Unique Real Resources", us: "800 Verified", them: "30-50 Generic" },
    { metric: "Design DNA Closed Types", us: "Enforced by AST", them: "Ad-hoc Strings" },
    { metric: "Behavioral Fingerprints", us: "Math Contract", them: "None" },
    { metric: "Zero Dependency Copy", us: "Yes (Standalone)", them: "Peer Dependency Chains" },
  ];

  return (
    <section className={cn("py-16 px-6 max-w-4xl mx-auto font-sans bg-paper text-ink", className)} {...props}>
      <h2 className="text-2xl font-bold text-center text-ink mb-8">{title}</h2>
      <div className="border border-line rounded-2xl overflow-hidden shadow-xs bg-paper text-xs">
        <div className="grid grid-cols-3 p-4 border-b border-line bg-surface/40 font-mono font-bold">
          <span>Capability</span>
          <span className="text-accent">OpenUI Registry</span>
          <span className="text-ink/60">Generic Libraries</span>
        </div>
        <div className="divide-y divide-line/60 font-mono">
          {rows.map((r) => (
            <div key={r.metric} className="grid grid-cols-3 p-4 items-center">
              <span className="font-sans font-medium text-ink">{r.metric}</span>
              <span className="text-accent font-bold">{r.us}</span>
              <span className="text-ink/60">{r.them}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { ComparisonVersusMatrix } from "./comparison-versus-matrix";

export default function ComparisonVersusMatrixDemo() {
  return <ComparisonVersusMatrix />;
}
`,
  }),

  P("timeline-roadmap-stream", {
    category: "sections",
    subcategory: "roadmap",
    title: "Timeline Roadmap Stream",
    description: "Product roadmap stream showing past milestones achieved and upcoming releases.",
    tags: ["roadmap", "timeline", "milestones", "releases", "stream"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "rail",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "quarterly-roadmap-inspection",
      visualModel: "timeline-rail-milestones",
      motionModel: "none",
      layoutModel: "vertical-roadmap-rail",
      semanticPurpose: "product-roadmap-display",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface RoadmapMilestone {
  quarter: string;
  status: "shipped" | "in-progress" | "planned";
  title: string;
  desc: string;
}

export interface TimelineRoadmapStreamProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  milestones?: RoadmapMilestone[];
}

export function TimelineRoadmapStream({
  title = "Public Architecture Roadmap",
  milestones = [
    { quarter: "Q1 2026", status: "shipped", title: "Catalogue Bootstrap", desc: "Core schema, test harness, and AST validators." },
    { quarter: "Q2 2026", status: "shipped", title: "800 Resource Master Build", desc: "100 components in each of 8 countable categories." },
    { quarter: "Q3 2026", status: "in-progress", title: "Autonomous Design Synthesizer", desc: "AI agent registry compiler and real-time variant generator." },
  ],
  className,
  ...props
}: TimelineRoadmapStreamProps) {
  return (
    <section className={cn("py-16 px-6 max-w-3xl mx-auto font-sans bg-paper text-ink", className)} {...props}>
      <h2 className="text-2xl font-bold text-center text-ink mb-10">{title}</h2>
      <div className="space-y-6 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-line">
        {milestones.map((m) => (
          <div key={m.quarter} className="relative">
            <div className={cn(
              "absolute -left-6 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-paper",
              m.status === "shipped" ? "bg-emerald-500" : m.status === "in-progress" ? "bg-accent" : "bg-line"
            )} />
            <div className="p-4 rounded-xl border border-line bg-surface/30">
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span className="font-bold text-ink">{m.quarter}</span>
                <span className={cn("uppercase text-[10px] font-bold px-2 py-0.5 rounded-full", m.status === "shipped" ? "bg-emerald-500/15 text-emerald-600" : "bg-accent/15 text-accent")}>
                  {m.status}
                </span>
              </div>
              <div className="font-bold text-sm text-ink">{m.title}</div>
              <p className="text-xs text-ink/60 mt-1">{m.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { TimelineRoadmapStream } from "./timeline-roadmap-stream";

export default function TimelineRoadmapStreamDemo() {
  return <TimelineRoadmapStream />;
}
`,
  }),

  P("video-explainer-stage", {
    category: "sections",
    subcategory: "media",
    title: "Video Explainer Stage",
    description: "Product overview video section with 16:9 interactive frame, playback trigger, and key benefit bullets.",
    tags: ["video", "explainer", "media", "stage", "overview"],
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
      interactionModel: "video-explainer-playback",
      visualModel: "centered-video-viewport",
      motionModel: "none",
      layoutModel: "cinema-stage-stack",
      semanticPurpose: "product-video-overview",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface VideoExplainerStageProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  duration?: string;
}

export function VideoExplainerStage({
  title = "Watch How 800 Verified Resources Assemble",
  duration = "2 min walk-through",
  className,
  ...props
}: VideoExplainerStageProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <section className={cn("py-16 px-6 max-w-4xl mx-auto font-sans bg-paper text-ink text-center", className)} {...props}>
      <h2 className="text-2xl font-bold text-ink mb-2">{title}</h2>
      <p className="text-xs font-mono text-ink/60 mb-6">{duration}</p>
      <div
        onClick={() => setPlaying(!playing)}
        className="aspect-video w-full rounded-3xl border border-line bg-black flex items-center justify-center cursor-pointer shadow-xl relative overflow-hidden group"
      >
        <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center pl-1 font-bold text-xl group-hover:scale-110 transition-transform">
          {playing ? "❚❚" : "▶"}
        </div>
        <div className="absolute bottom-4 left-6 text-white/80 font-mono text-xs">
          OpenUI Architecture Walkthrough
        </div>
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { VideoExplainerStage } from "./video-explainer-stage";

export default function VideoExplainerStageDemo() {
  return <VideoExplainerStage />;
}
`,
  }),

  P("interactive-calculator-section", {
    category: "sections",
    subcategory: "calculator",
    title: "Interactive Calculator Section",
    description: "ROI developer hours savings calculator with interactive team size slider and live annual savings output.",
    tags: ["calculator", "roi", "savings", "interactive", "slider"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "split",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "roi-slider-calculation",
      visualModel: "input-slider-and-savings-kpi",
      motionModel: "none",
      layoutModel: "side-by-side-calculator-section",
      semanticPurpose: "roi-savings-estimator",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface InteractiveCalculatorSectionProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
}

export function InteractiveCalculatorSection({
  title = "Calculate Engineering Hours Saved",
  className,
  ...props
}: InteractiveCalculatorSectionProps) {
  const [engineers, setEngineers] = useState(8);

  const hoursSaved = engineers * 140;
  const dollarSaved = hoursSaved * 125;

  return (
    <section className={cn("py-16 px-6 max-w-4xl mx-auto font-sans bg-paper text-ink", className)} {...props}>
      <h2 className="text-2xl font-bold text-center text-ink mb-10">{title}</h2>
      <div className="p-8 rounded-3xl border border-line bg-surface/30 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <div className="flex justify-between font-mono text-xs">
            <span className="text-ink/60">Frontend Engineers</span>
            <span className="font-bold text-ink">{engineers} devs</span>
          </div>
          <input
            type="range"
            min="1"
            max="50"
            value={engineers}
            onChange={(e) => setEngineers(Number(e.target.value))}
            className="w-full accent-accent cursor-pointer"
          />
          <p className="text-xs text-ink/60">Based on standard design system implementation velocity metrics.</p>
        </div>

        <div className="p-6 rounded-2xl border border-line bg-paper text-center font-mono">
          <div className="text-xs text-ink/60">Annual Estimated Value</div>
          <div className="text-3xl font-bold text-accent my-2">\${dollarSaved.toLocaleString()}</div>
          <div className="text-xs text-emerald-600 font-semibold">{hoursSaved.toLocaleString()} hours saved</div>
        </div>
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { InteractiveCalculatorSection } from "./interactive-calculator-section";

export default function InteractiveCalculatorSectionDemo() {
  return <InteractiveCalculatorSection />;
}
`,
  }),

  P("integration-ecosystem-grid", {
    category: "sections",
    subcategory: "integrations",
    title: "Integration Ecosystem Grid",
    description: "Grid of supported developer ecosystem tools (Next.js, Vite, Supabase, Tailwind, Figma) with connection status badges.",
    tags: ["integrations", "tools", "ecosystem", "partners", "grid"],
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
      interactionModel: "ecosystem-tool-inspection",
      visualModel: "integration-badge-grid",
      motionModel: "none",
      layoutModel: "six-slot-integration-matrix",
      semanticPurpose: "integration-ecosystem-display",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface IntegrationEcosystemGridProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
}

export function IntegrationEcosystemGrid({
  title = "Seamless Native Toolchain Integrations",
  className,
  ...props
}: IntegrationEcosystemGridProps) {
  const tools = [
    { name: "Next.js 15+", status: "App Router Native" },
    { name: "Vite 6+", status: "HMR Optimized" },
    { name: "Tailwind CSS", status: "Token Compatible" },
    { name: "Figma Sync", status: "Variables API" },
    { name: "TypeScript", status: "Zero Any Types" },
    { name: "Vitest", status: "100% Suite Pass" },
  ];

  return (
    <section className={cn("py-16 px-6 max-w-5xl mx-auto font-sans bg-paper text-ink text-center", className)} {...props}>
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink mb-10">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {tools.map((t) => (
          <div key={t.name} className="p-4 rounded-xl border border-line bg-surface/30 text-left font-mono">
            <div className="font-bold text-xs text-ink">{t.name}</div>
            <div className="text-[10px] text-accent mt-1">● {t.status}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { IntegrationEcosystemGrid } from "./integration-ecosystem-grid";

export default function IntegrationEcosystemGridDemo() {
  return <IntegrationEcosystemGrid />;
}
`,
  }),

  P("developer-terminal-hero", {
    category: "sections",
    subcategory: "heroes",
    title: "Developer Terminal Hero",
    description: "Hero layout with code terminal on right showing instant pnpm install and validation commands.",
    tags: ["terminal", "hero", "developer", "cli", "install"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "split",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "neon-on-dark",
    },
    fingerprint: {
      interactionModel: "copyable-terminal-hero",
      visualModel: "code-terminal-landing-hero",
      motionModel: "none",
      layoutModel: "split-terminal-banner",
      semanticPurpose: "developer-cli-hero",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface DeveloperTerminalHeroProps extends React.HTMLAttributes<HTMLElement> {
  cmd?: string;
}

export function DeveloperTerminalHero({
  cmd = "pnpm dlx @openui/cli add holy-grail-layout",
  className,
  ...props
}: DeveloperTerminalHeroProps) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className={cn("py-16 px-6 max-w-5xl mx-auto font-sans bg-paper text-ink grid grid-cols-1 lg:grid-cols-2 gap-8 items-center", className)} {...props}>
      <div>
        <span className="font-mono text-xs text-accent font-bold uppercase">Developer First</span>
        <h1 className="text-3xl font-bold tracking-tight text-ink my-2">Deploy directly into your codebase.</h1>
        <p className="text-xs text-ink/70 leading-relaxed">Single command imports. No remote runtime blackboxes.</p>
      </div>

      <div className="p-4 rounded-2xl border border-line bg-slate-950 text-white font-mono text-xs shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-white/10 text-white/50 text-[10px]">
          <span>bash terminal</span>
          <button type="button" onClick={copy} className="hover:text-white transition-colors">
            {copied ? "✓ Copied" : "Copy"}
          </button>
        </div>
        <div className="pt-3 text-emerald-400">
          <span className="text-white/40">$ </span>
          {cmd}
        </div>
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { DeveloperTerminalHero } from "./developer-terminal-hero";

export default function DeveloperTerminalHeroDemo() {
  return <DeveloperTerminalHero />;
}
`,
  }),

  P("values-manifesto-grid", {
    category: "sections",
    subcategory: "about",
    title: "Values Manifesto Grid",
    description: "Core architectural principles section: Independence, Mathematical Rigor, and Character.",
    tags: ["manifesto", "values", "principles", "philosophy", "grid"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "editorial",
      macrostructure: "symmetric",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "none",
      typographyStyle: "serif-display",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "manifesto-principles-reading",
      visualModel: "three-column-principles-grid",
      motionModel: "none",
      layoutModel: "tri-column-manifesto",
      semanticPurpose: "company-manifesto-section",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface ValuesManifestoGridProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
}

export function ValuesManifestoGrid({
  title = "Our Core Architectural Axioms",
  className,
  ...props
}: ValuesManifestoGridProps) {
  const axioms = [
    { num: "01", title: "Autonomy", desc: "No runtime dependency handcuffs. You own every line of emitted code." },
    { num: "02", title: "Mathematical Rigor", desc: "Closed type schemas that eliminate subjective runtime regressions." },
    { num: "03", title: "Character", desc: "Interfaces should carry a distinct fingerprint rather than corporate blandness." },
  ];

  return (
    <section className={cn("py-16 px-6 max-w-5xl mx-auto font-sans bg-paper text-ink", className)} {...props}>
      <h2 className="text-2xl sm:text-3xl font-bold font-serif text-center text-ink mb-12">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {axioms.map((a) => (
          <div key={a.num} className="p-6 rounded-2xl border border-line bg-surface/30 space-y-3">
            <div className="font-mono text-2xl font-bold text-accent">{a.num}</div>
            <div className="font-serif text-lg font-bold text-ink">{a.title}</div>
            <p className="text-xs text-ink/70 leading-relaxed font-sans">{a.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { ValuesManifestoGrid } from "./values-manifesto-grid";

export default function ValuesManifestoGridDemo() {
  return <ValuesManifestoGrid />;
}
`,
  }),

  P("press-media-mentions", {
    category: "sections",
    subcategory: "social-proof",
    title: "Press Media Mentions",
    description: "Curated press clippings and editorial soundbites from leading engineering publications.",
    tags: ["press", "media", "news", "quotes", "social-proof"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "editorial",
      macrostructure: "symmetric",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "serif-display",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "press-quote-inspection",
      visualModel: "clipping-editorial-grid",
      motionModel: "none",
      layoutModel: "three-column-press-rack",
      semanticPurpose: "press-media-quotes",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface PressMediaMentionsProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
}

export function PressMediaMentions({
  title = "In the News",
  className,
  ...props
}: PressMediaMentionsProps) {
  const articles = [
    { pub: "TECHCRUNCH", quote: "“The open-source design registry rewriting how autonomous AI teams build interfaces.”" },
    { pub: "HACKER NEWS", quote: "“Zero-dependency code with mathematical rigor. This is how component libraries should work.”" },
    { pub: "WIRED", quote: "“Bringing fingerprint character and visual delight back to modern software.”" },
  ];

  return (
    <section className={cn("py-16 px-6 max-w-5xl mx-auto font-sans bg-paper text-ink", className)} {...props}>
      <h2 className="text-2xl font-bold font-serif text-center text-ink mb-10">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((a) => (
          <div key={a.pub} className="p-6 rounded-2xl border border-line bg-paper flex flex-col justify-between shadow-xs">
            <blockquote className="font-serif text-xs leading-relaxed text-ink/80 italic mb-4">
              {a.quote}
            </blockquote>
            <span className="font-mono text-[11px] font-bold text-accent tracking-wider">{a.pub}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { PressMediaMentions } from "./press-media-mentions";

export default function PressMediaMentionsDemo() {
  return <PressMediaMentions />;
}
`,
  }),

  P("interactive-audit-scorecard", {
    category: "sections",
    subcategory: "performance",
    title: "Interactive Audit Scorecard",
    description: "Core Web Vitals scorecard grid displaying 100/100 performance grades for Performance, Accessibility, and Best Practices.",
    tags: ["lighthouse", "cwv", "audit", "scorecard", "performance"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "pill",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "audit-score-inspection",
      visualModel: "four-gauge-scorecard-strip",
      motionModel: "none",
      layoutModel: "horizontal-score-rack",
      semanticPurpose: "performance-audit-scorecard",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface InteractiveAuditScorecardProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
}

export function InteractiveAuditScorecard({
  title = "Lighthouse Audit Scorecard",
  className,
  ...props
}: InteractiveAuditScorecardProps) {
  const scores = [
    { label: "Performance", score: 100 },
    { label: "Accessibility", score: 100 },
    { label: "Best Practices", score: 100 },
    { label: "SEO / Semantic", score: 100 },
  ];

  return (
    <section className={cn("py-12 px-6 max-w-4xl mx-auto font-mono text-xs bg-paper text-ink text-center", className)} {...props}>
      <h2 className="font-bold text-sm text-ink mb-6">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {scores.map((s) => (
          <div key={s.label} className="p-4 rounded-2xl border border-line bg-surface/30 flex flex-col items-center">
            <div className="w-14 h-14 rounded-full border-4 border-emerald-500 text-emerald-600 font-bold flex items-center justify-center text-base mb-2">
              {s.score}
            </div>
            <div className="font-semibold text-ink font-sans text-xs">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { InteractiveAuditScorecard } from "./interactive-audit-scorecard";

export default function InteractiveAuditScorecardDemo() {
  return <InteractiveAuditScorecard />;
}
`,
  }),

  P("multilingual-locale-selector", {
    category: "sections",
    subcategory: "footer",
    title: "Multilingual Locale Selector",
    description: "International geographic region selector section with interactive continent pills and currency selector.",
    tags: ["locale", "language", "international", "multilingual", "selector"],
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
      interactionModel: "locale-region-selection",
      visualModel: "language-continent-picker",
      motionModel: "none",
      layoutModel: "centered-locale-rack",
      semanticPurpose: "internationalization-selector",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface MultilingualLocaleSelectorProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
}

export function MultilingualLocaleSelector({
  title = "Select Region & Language",
  className,
  ...props
}: MultilingualLocaleSelectorProps) {
  const [selected, setSelected] = useState("en-US");
  const locales = [
    { code: "en-US", name: "English (United States)" },
    { code: "de-DE", name: "Deutsch (Deutschland)" },
    { code: "ja-JP", name: "日本語 (日本)" },
    { code: "fr-FR", name: "Français (France)" },
  ];

  return (
    <section className={cn("py-12 px-6 max-w-2xl mx-auto font-sans text-xs bg-paper text-ink", className)} {...props}>
      <h3 className="font-bold text-sm text-ink mb-4">{title}</h3>
      <div className="grid grid-cols-2 gap-2">
        {locales.map((l) => (
          <button
            key={l.code}
            type="button"
            onClick={() => setSelected(l.code)}
            className={cn(
              "p-3 rounded-xl border text-left transition-colors",
              selected === l.code ? "border-accent bg-accent/10 font-bold text-accent" : "border-line bg-surface/30 text-ink hover:bg-surface"
            )}
          >
            <div>{l.name}</div>
            <div className="font-mono text-[10px] text-ink/50 mt-0.5">{l.code}</div>
          </button>
        ))}
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { MultilingualLocaleSelector } from "./multilingual-locale-selector";

export default function MultilingualLocaleSelectorDemo() {
  return <MultilingualLocaleSelector />;
}
`,
  }),

  P("minimalist-footer-spread", {
    category: "sections",
    subcategory: "footer",
    title: "Minimalist Footer Spread",
    description: "Complete site footer with brand declaration, categorical link columns, license metadata, and status beacon.",
    tags: ["footer", "sitemap", "links", "brand", "legal"],
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
      interactionModel: "footer-sitemap-navigation",
      visualModel: "four-column-footer-spread",
      motionModel: "none",
      layoutModel: "columnar-footer-layout",
      semanticPurpose: "site-terminal-footer",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface MinimalistFooterSpreadProps extends React.HTMLAttributes<HTMLElement> {
  brand?: string;
}

export function MinimalistFooterSpread({
  brand = "OPENUI DESIGN REGISTRY",
  className,
  ...props
}: MinimalistFooterSpreadProps) {
  return (
    <footer className={cn("border-t border-line py-12 px-6 max-w-5xl mx-auto font-sans bg-paper text-ink text-xs", className)} {...props}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
        <div>
          <div className="font-mono font-bold text-sm mb-3">{brand}</div>
          <p className="text-ink/60 leading-relaxed">Exact 800-resource master catalogue.</p>
        </div>
        <div>
          <div className="font-bold mb-3 font-mono">Domains</div>
          <div className="space-y-1.5 text-ink/60">
            <div>Components</div>
            <div>Text</div>
            <div>Motion</div>
          </div>
        </div>
        <div>
          <div className="font-bold mb-3 font-mono">Architecture</div>
          <div className="space-y-1.5 text-ink/60">
            <div>Design DNA</div>
            <div>Fingerprints</div>
            <div>Validation</div>
          </div>
        </div>
        <div>
          <div className="font-bold mb-3 font-mono">License</div>
          <div className="space-y-1.5 text-ink/60">
            <div>MIT License</div>
            <div>GitHub Repository</div>
          </div>
        </div>
      </div>
      <div className="pt-6 border-t border-line/60 flex flex-col sm:flex-row justify-between text-[11px] font-mono text-ink/50">
        <span>© 2026 OpenUI Project. Built with mathematical rigor.</span>
        <span className="text-emerald-600 font-semibold">● All Systems Nominal</span>
      </div>
    </footer>
  );
}
`,
    demo: `"use client";

import { MinimalistFooterSpread } from "./minimalist-footer-spread";

export default function MinimalistFooterSpreadDemo() {
  return <MinimalistFooterSpread />;
}
`,
  }),

  P("download-app-banner", {
    category: "sections",
    subcategory: "cta",
    title: "Download App Banner",
    description: "Mobile application callout section with Apple App Store and Google Play badge triggers.",
    tags: ["download", "mobile", "app", "store", "cta"],
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
      interactionModel: "app-store-download-dispatch",
      visualModel: "mobile-app-download-banner",
      motionModel: "none",
      layoutModel: "centered-app-banner",
      semanticPurpose: "mobile-app-download-callout",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface DownloadAppBannerProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
}

export function DownloadAppBanner({
  title = "Access OpenUI on iOS and Android",
  className,
  ...props
}: DownloadAppBannerProps) {
  return (
    <section className={cn("py-12 px-6 max-w-4xl mx-auto font-sans bg-paper text-ink text-center", className)} {...props}>
      <div className="p-8 rounded-3xl border border-line bg-surface/30 space-y-4">
        <h3 className="text-xl font-bold text-ink">{title}</h3>
        <p className="text-xs text-ink/60 max-w-md mx-auto">Inspect component tokens, test interaction gestures, and copy code directly on mobile devices.</p>
        <div className="flex justify-center gap-3 pt-2">
          <button type="button" className="px-5 py-2.5 rounded-xl border border-line bg-paper text-xs font-mono font-bold hover:bg-surface">
             App Store
          </button>
          <button type="button" className="px-5 py-2.5 rounded-xl border border-line bg-paper text-xs font-mono font-bold hover:bg-surface">
            ▶ Google Play
          </button>
        </div>
      </div>
    </section>
  );
}
`,
    demo: `"use client";

import { DownloadAppBanner } from "./download-app-banner";

export default function DownloadAppBannerDemo() {
  return <DownloadAppBanner />;
}
`,
  }),
];

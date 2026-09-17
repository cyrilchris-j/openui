"use client";

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

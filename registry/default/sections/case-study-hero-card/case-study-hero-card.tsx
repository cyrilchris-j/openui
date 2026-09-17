"use client";

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

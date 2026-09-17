"use client";

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

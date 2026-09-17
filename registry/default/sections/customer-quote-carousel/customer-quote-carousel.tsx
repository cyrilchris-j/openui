"use client";

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

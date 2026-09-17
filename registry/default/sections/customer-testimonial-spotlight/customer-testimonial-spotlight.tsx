"use client";

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

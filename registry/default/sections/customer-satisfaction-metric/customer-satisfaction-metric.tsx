"use client";

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

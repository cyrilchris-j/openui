"use client";

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

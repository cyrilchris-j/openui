"use client";

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

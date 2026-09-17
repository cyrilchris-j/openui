"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function CareerBenefitsPerks({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const perks = [
    { title: "100% Remote First", desc: "Work from anywhere in the world on asynchronous timelines." },
    { title: "$4,000 Setup Stipend", desc: "Equip your workspace with the hardware and monitors you need." },
    { title: "Continuous Learning", desc: "$2,500 annual budget for books, courses, and conferences." },
    { title: "Transparent Equity", desc: "Clear stock option schedules with 10-year exercise windows." },
  ];

  return (
    <section className={cn("w-full py-16 px-4 max-w-5xl mx-auto", className)} {...props}>
      <h3 className="text-2xl font-bold text-center text-neutral-900 dark:text-white mb-8">Life at OpenUI</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {perks.map((p) => (
          <div key={p.title} className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">{p.title}</h4>
            <p className="text-xs text-neutral-500 mt-2 leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

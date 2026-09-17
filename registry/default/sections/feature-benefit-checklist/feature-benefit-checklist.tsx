"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function FeatureBenefitChecklist({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const benefits = [
    "No runtime wrappers or sealed black-box dependencies",
    "Full source copy directly in your own repository",
    "100% compliant with WAI-ARIA and screen readers",
    "Automated type-checking across 800 certified items",
  ];

  return (
    <section className={cn("w-full py-16 px-4 max-w-3xl mx-auto", className)} {...props}>
      <h3 className="text-2xl font-bold text-center text-neutral-900 dark:text-white mb-6">Designed for Production</h3>
      <div className="space-y-3">
        {benefits.map((b) => (
          <div key={b} className="flex items-center gap-3 p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-xs">
            <span className="text-emerald-500 font-bold">✓</span>
            <span className="text-neutral-700 dark:text-neutral-300 font-medium">{b}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

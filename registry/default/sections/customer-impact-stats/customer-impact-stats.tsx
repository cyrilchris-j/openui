"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function CustomerImpactStats({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("w-full py-16 px-4 max-w-4xl mx-auto text-center", className)} {...props}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
          <div className="text-4xl font-extrabold text-emerald-600 dark:text-emerald-400">1.4M+</div>
          <div className="text-xs text-neutral-500 mt-1">Dev hours saved in 2026</div>
        </div>
        <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
          <div className="text-4xl font-extrabold text-neutral-900 dark:text-white">0</div>
          <div className="text-xs text-neutral-500 mt-1">Runtime vulnerabilities</div>
        </div>
        <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
          <div className="text-4xl font-extrabold text-neutral-900 dark:text-white">800</div>
          <div className="text-xs text-neutral-500 mt-1">Verified registry resources</div>
        </div>
      </div>
    </section>
  );
}

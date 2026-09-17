"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function FeatureDeepDiveSplit({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-5xl mx-auto", className)} {...props}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-6">
          <span className="text-xs font-mono uppercase text-emerald-500 font-bold">Deep Dive</span>
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mt-2">
            Zero-Runtime Design Invariants
          </h2>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-3 leading-relaxed">
            Every component declares strict constraints for typography, color strategy, and macrostructure to guarantee visual harmony across large teams.
          </p>
        </div>
        <div className="md:col-span-6 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 font-mono text-xs text-neutral-600 dark:text-neutral-300">
          [Verified Design DNA: 100% Type-Safe Contracts]
        </div>
      </div>
    </section>
  );
}

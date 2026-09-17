"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface ComparisonRow {
  feature: string;
  openui: string | boolean;
  legacy: string | boolean;
}

export interface InteractiveFeatureComparisonProps extends React.HTMLAttributes<HTMLElement> {
  rows?: ComparisonRow[];
}

const DEFAULT_ROWS: ComparisonRow[] = [
  { feature: "Bundle Cost", openui: "Zero runtime dependencies", legacy: "250kb+ bundled node_modules" },
  { feature: "Code Ownership", openui: "Full local copy in your src/", legacy: "Locked in node_modules" },
  { feature: "Type Safety", openui: "Strict TypeScript zero 'any'", legacy: "Loosely typed or any casts" },
  { feature: "Design Invariants", openui: "Machine-verifiable Design DNA", legacy: "Ad-hoc inline styles" },
  { feature: "Next.js 15+ Native", openui: "Server Actions & React 19 Ready", legacy: "Client-only wrappers required" },
];

export function InteractiveFeatureComparison({
  rows = DEFAULT_ROWS,
  className,
  ...props
}: InteractiveFeatureComparisonProps) {
  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-5xl mx-auto", className)} {...props}>
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Why architects choose OpenUI
        </h2>
        <p className="text-xs text-neutral-500 mt-2">
          Compare our decentralized registry design against traditional centralized npm UI libraries.
        </p>
      </div>

      <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden bg-white dark:bg-neutral-950">
        <div className="grid grid-cols-12 bg-neutral-100 dark:bg-neutral-900 p-4 font-mono text-xs font-bold border-b border-neutral-200 dark:border-neutral-800">
          <div className="col-span-4 text-neutral-500 uppercase">Capability</div>
          <div className="col-span-4 text-emerald-600 dark:text-emerald-400">OpenUI Registry</div>
          <div className="col-span-4 text-neutral-400">Legacy UI Libraries</div>
        </div>

        <div className="divide-y divide-neutral-100 dark:divide-neutral-800 text-xs">
          {rows.map((row, idx) => (
            <div key={idx} className="grid grid-cols-12 p-4 items-center">
              <div className="col-span-4 font-medium text-neutral-900 dark:text-neutral-100">
                {row.feature}
              </div>
              <div className="col-span-4 font-semibold text-emerald-600 dark:text-emerald-400">
                {typeof row.openui === "boolean" ? (row.openui ? "✓ Yes" : "✕ No") : row.openui}
              </div>
              <div className="col-span-4 text-neutral-500">
                {typeof row.legacy === "boolean" ? (row.legacy ? "✓ Yes" : "✕ No") : row.legacy}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function CustomerChurnRiskAnalyzer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-md mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-2">Account Health Analysis</h3>
      <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/20 text-center my-4">
        <div className="text-3xl font-bold font-mono text-emerald-600 dark:text-emerald-400">92 / 100</div>
        <div className="text-neutral-500 mt-1">Low Churn Risk • High Engagement</div>
      </div>
      <div className="space-y-2 text-neutral-600 dark:text-neutral-400">
        <div>✓ Daily CLI usage across 12 developers</div>
        <div>✓ 100% active seat utilization</div>
      </div>
    </div>
  );
}

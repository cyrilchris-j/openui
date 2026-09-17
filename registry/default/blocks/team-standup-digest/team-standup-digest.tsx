"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function TeamStandupDigest({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-4">Daily Engineering Standup</h3>
      <div className="space-y-3">
        <div>
          <div className="font-bold text-emerald-600 dark:text-emerald-400">✓ Yesterday Completed</div>
          <div className="text-neutral-600 dark:text-neutral-400 mt-1">Materialized 100 layouts and 100 sections.</div>
        </div>
        <div>
          <div className="font-bold text-blue-600 dark:text-blue-400">● Today's Focus</div>
          <div className="text-neutral-600 dark:text-neutral-400 mt-1">Complete 100 blocks to reach master 800/800.</div>
        </div>
        <div>
          <div className="font-bold text-rose-500">✕ Blockers</div>
          <div className="text-neutral-600 dark:text-neutral-400 mt-1">None! Zero TypeScript compiler errors.</div>
        </div>
      </div>
    </div>
  );
}

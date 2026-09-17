"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function CronJobSchedulerBlock({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [expr, setExpr] = React.useState("0 * * * *");

  return (
    <div className={cn("w-full max-w-xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-4">Recurring Job Config</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-neutral-400 text-[11px] mb-1">Cron Expression (UTC)</label>
          <input
            type="text"
            value={expr}
            onChange={(e) => setExpr(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white font-bold"
          />
        </div>
        <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg">
          Translates to: Runs every hour at minute 0.
        </div>
        <button type="button" className="w-full py-2 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-semibold rounded-lg">
          Schedule Job
        </button>
      </div>
    </div>
  );
}

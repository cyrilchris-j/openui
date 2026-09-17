"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function UserRetentionCohortMatrix({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-2xl mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-neutral-900 dark:text-white mb-3">Weekly Retention Heatmap</h3>
      <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
        <div className="p-2 bg-emerald-600 text-white rounded font-bold">W1: 100%</div>
        <div className="p-2 bg-emerald-500 text-white rounded font-bold">W2: 84%</div>
        <div className="p-2 bg-emerald-400 text-neutral-900 rounded font-bold">W3: 78%</div>
        <div className="p-2 bg-emerald-300 text-neutral-900 rounded font-bold">W4: 74%</div>
      </div>
    </div>
  );
}

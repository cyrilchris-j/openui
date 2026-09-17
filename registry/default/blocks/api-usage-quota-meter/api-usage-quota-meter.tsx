"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function ApiUsageQuotaMeter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-sm mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl font-mono text-xs shadow-sm", className)} {...props}>
      <div className="flex justify-between text-neutral-500 text-[11px] mb-1">
        <span>Monthly API Egress</span>
        <span className="font-bold text-neutral-900 dark:text-white">42,890 / 250,000</span>
      </div>
      <div className="w-full h-2 rounded-full bg-neutral-100 dark:bg-neutral-800 mb-2 overflow-hidden">
        <div className="h-full bg-emerald-500 w-[17%]" />
      </div>
      <div className="text-[10px] text-neutral-400">17% of monthly quota utilized. Resets Oct 1.</div>
    </div>
  );
}

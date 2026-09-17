"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function InteractiveMetricSparkline({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-sm mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl font-mono text-xs shadow-sm", className)} {...props}>
      <div className="text-neutral-400 text-[10px] uppercase">Daily Active Invocations</div>
      <div className="text-2xl font-bold text-neutral-900 dark:text-white mt-1">1,492,800</div>
      <div className="text-emerald-500 font-bold text-[11px] mt-0.5">+14.2% vs yesterday</div>
      <div className="mt-4 h-16 rounded bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-400 text-[10px]">
        [SPARKLINE TREND CURVE]
      </div>
    </div>
  );
}

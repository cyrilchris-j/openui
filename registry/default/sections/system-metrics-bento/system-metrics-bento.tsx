"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function SystemMetricsBento({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("w-full py-16 px-4 max-w-5xl mx-auto font-mono text-xs", className)} {...props}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
          <div className="text-neutral-400 uppercase text-[10px]">Active Edge Workers</div>
          <div className="text-3xl font-bold mt-2 text-neutral-900 dark:text-neutral-100">4,289</div>
          <div className="text-emerald-500 mt-1">100% healthy</div>
        </div>
        <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
          <div className="text-neutral-400 uppercase text-[10px]">p99 Request Latency</div>
          <div className="text-3xl font-bold mt-2 text-neutral-900 dark:text-neutral-100">1.2 ms</div>
          <div className="text-emerald-500 mt-1">-14% vs avg</div>
        </div>
        <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
          <div className="text-neutral-400 uppercase text-[10px]">Memory Pressure</div>
          <div className="text-3xl font-bold mt-2 text-neutral-900 dark:text-neutral-100">28.4%</div>
          <div className="text-neutral-500 mt-1">Nominal isolate range</div>
        </div>
      </div>
    </section>
  );
}

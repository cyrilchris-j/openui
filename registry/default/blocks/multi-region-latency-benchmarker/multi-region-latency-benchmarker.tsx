"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function MultiRegionLatencyBenchmarker({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const regions = [
    { name: "US-East (N. Virginia)", ping: "4ms" },
    { name: "EU-West (Frankfurt)", ping: "12ms" },
    { name: "AP-East (Tokyo)", ping: "18ms" },
  ];

  return (
    <div className={cn("w-full max-w-lg mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-neutral-900 dark:text-white mb-3">Edge Ping Diagnostics</h3>
      <div className="space-y-2">
        {regions.map((r) => (
          <div key={r.name} className="p-2.5 rounded bg-neutral-50 dark:bg-neutral-900 flex justify-between">
            <span>{r.name}</span>
            <span className="text-emerald-500 font-bold">{r.ping}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

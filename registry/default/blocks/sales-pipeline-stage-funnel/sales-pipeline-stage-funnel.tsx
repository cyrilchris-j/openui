"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function SalesPipelineStageFunnel({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const steps = [
    { label: "Site Visitors", count: "128,400", rate: "100%" },
    { label: "CLI Downloads", count: "34,200", rate: "26.6%" },
    { label: "Workspace Created", count: "8,920", rate: "6.9%" },
    { label: "Pro Paid Seats", count: "2,140", rate: "1.6%" },
  ];

  return (
    <div className={cn("w-full max-w-3xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-4">Conversion Funnel Telemetry</h3>
      <div className="space-y-3">
        {steps.map((s) => (
          <div key={s.label} className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 flex justify-between items-center font-mono">
            <span className="font-semibold text-neutral-800 dark:text-neutral-200">{s.label}</span>
            <div className="flex gap-4">
              <span className="text-neutral-500">{s.count}</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{s.rate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

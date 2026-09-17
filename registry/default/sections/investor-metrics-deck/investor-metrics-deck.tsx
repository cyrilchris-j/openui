"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface MetricCard {
  label: string;
  metric: string;
  detail: string;
}

export interface InvestorMetricsDeckProps extends React.HTMLAttributes<HTMLElement> {
  metrics?: MetricCard[];
}

const DEFAULT_METRICS: MetricCard[] = [
  { label: "ANNUAL RUN RATE", metric: "$42.8M", detail: "100% organic software revenue" },
  { label: "NET RETENTION", metric: "138%", detail: "Best-in-class enterprise expansion" },
  { label: "GROSS MARGIN", metric: "84%", detail: "Sub-millisecond edge architecture" },
  { label: "TOTAL MAU", metric: "2.4M", detail: "Active web client sessions daily" },
];

export function InvestorMetricsDeck({
  metrics = DEFAULT_METRICS,
  className,
  ...props
}: InvestorMetricsDeckProps) {
  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-5xl mx-auto", className)} {...props}>
      <div className="mb-8">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold">
          Financial Disclosures
        </span>
        <h2 className="text-2xl font-bold font-mono tracking-tight text-neutral-900 dark:text-neutral-100 mt-1">
          Q3 2026 Telemetry & Capital Efficiency
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="p-5 border-2 border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 font-mono"
          >
            <div className="text-[10px] text-neutral-500 uppercase tracking-wider">{m.label}</div>
            <div className="text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 mt-2">
              {m.metric}
            </div>
            <div className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-1">{m.detail}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

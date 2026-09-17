"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface MetricItem {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export interface CustomerMetricsTickerProps extends React.HTMLAttributes<HTMLElement> {
  metrics?: MetricItem[];
}

const DEFAULT_METRICS: MetricItem[] = [
  { label: "ANNUAL RUN RATE", value: "$42.8M", change: "+148% YoY", isPositive: true },
  { label: "REQUEST LATENCY (p99)", value: "1.4ms", change: "-34% YoY", isPositive: true },
  { label: "VERIFIED NODES", value: "14,892", change: "+410 this week", isPositive: true },
  { label: "UPTIME SLA", value: "99.998%", change: "0 incidents / 90d", isPositive: true },
];

export function CustomerMetricsTicker({
  metrics = DEFAULT_METRICS,
  className,
  ...props
}: CustomerMetricsTickerProps) {
  return (
    <section
      className={cn(
        "w-full bg-neutral-900 text-neutral-100 border-y-2 border-neutral-800 py-6 px-4 md:px-8",
        className
      )}
      {...props}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => (
          <div key={idx} className="border-l-2 border-neutral-700 pl-4 py-1">
            <div className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
              {metric.label}
            </div>
            <div className="text-2xl md:text-3xl font-mono font-bold tracking-tight text-white mt-1">
              {metric.value}
            </div>
            <div
              className={cn(
                "text-[11px] font-mono mt-1",
                metric.isPositive ? "text-emerald-400" : "text-rose-400"
              )}
            >
              {metric.change}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

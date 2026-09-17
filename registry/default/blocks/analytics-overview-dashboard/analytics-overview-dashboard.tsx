"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface AnalyticsOverviewDashboardProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultPeriod?: string;
}

export function AnalyticsOverviewDashboard({
  defaultPeriod = "30d",
  className,
  ...props
}: AnalyticsOverviewDashboardProps) {
  const [period, setPeriod] = React.useState(defaultPeriod);

  const kpis = [
    { label: "Total Revenue", val: "$128,430", change: "+18.2%", positive: true },
    { label: "Active Sessions", val: "42,890", change: "+6.4%", positive: true },
    { label: "Bounce Rate", val: "24.1%", change: "-2.3%", positive: true },
    { label: "p99 API Latency", val: "14ms", change: "+1.2ms", positive: false },
  ];

  return (
    <div className={cn("w-full max-w-6xl mx-auto p-6 space-y-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm", className)} {...props}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">Telemetry Overview</h2>
          <p className="text-xs text-neutral-500">Live operational throughput across edge regions.</p>
        </div>
        <div className="flex gap-1.5 p-1 rounded-lg bg-neutral-100 dark:bg-neutral-900 text-xs font-mono">
          {["7d", "30d", "90d", "1y"].map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPeriod(p)}
              className={cn(
                "px-2.5 py-1 rounded-md transition-colors",
                period === p ? "bg-white dark:bg-neutral-800 font-bold shadow-xs text-neutral-900 dark:text-neutral-100" : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
            <span className="text-[11px] font-mono text-neutral-400 uppercase">{k.label}</span>
            <div className="text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-100 mt-1">{k.val}</div>
            <div className={cn("text-[11px] font-mono mt-1", k.positive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-500")}>
              {k.change} vs prior period
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/20 text-center font-mono text-xs text-neutral-400 h-48 flex items-center justify-center">
        [Time-Series Event Stream Visualization Canvas — Mode: {period}]
      </div>
    </div>
  );
}

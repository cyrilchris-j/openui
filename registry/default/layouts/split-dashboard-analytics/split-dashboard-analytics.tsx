"use client";

import { cn } from "@/lib/cn";

export interface SplitDashboardAnalyticsProps extends React.HTMLAttributes<HTMLDivElement> {
  chart?: React.ReactNode;
  logs?: React.ReactNode;
}

export function SplitDashboardAnalytics({ chart, logs, className, ...props }: SplitDashboardAnalyticsProps) {
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-12 gap-4 max-w-5xl mx-auto p-4 font-mono text-xs", className)} {...props}>
      <div className="lg:col-span-8 p-4 rounded-xl border border-line bg-surface/30 min-h-[260px] flex items-center justify-center">{chart}</div>
      <div className="lg:col-span-4 p-4 rounded-xl border border-line bg-surface/30 space-y-2">{logs}</div>
    </div>
  );
}

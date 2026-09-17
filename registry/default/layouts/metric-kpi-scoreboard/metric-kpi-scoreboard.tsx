"use client";

import { cn } from "@/lib/cn";

export interface MetricKPIScoreboardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function MetricKPIScoreboard({ children, className, ...props }: MetricKPIScoreboardProps) {
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl border border-line bg-surface/30 max-w-5xl mx-auto font-mono text-xs", className)} {...props}>
      {children}
    </div>
  );
}

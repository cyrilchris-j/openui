"use client";

import { cn } from "@/lib/cn";

export interface MetricStatCardProps {
  label?: string;
  value?: string;
  change?: string;
  positive?: boolean;
  className?: string;
}

export function MetricStatCard({
  label = "Monthly Active Queries",
  value = "1,842,900",
  change = "+14.2%",
  positive = true,
  className,
}: MetricStatCardProps) {
  return (
    <div className={cn("w-full max-w-xs rounded-xl border border-line bg-paper p-5 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60 uppercase">{label}</span>
      <div className="mt-2 flex items-baseline justify-between">
        <span className="font-mono text-2xl font-bold text-ink">{value}</span>
        <span
          className={cn(
            "rounded px-2 py-0.5 font-mono text-xs font-semibold",
            positive ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"
          )}
        >
          {change}
        </span>
      </div>
      <p className="mt-3 font-mono text-[10px] text-ink/40">vs. previous 30-day baseline</p>
    </div>
  );
}

export default MetricStatCard;

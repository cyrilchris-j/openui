"use client";

import { cn } from "@/lib/cn";

export interface StatCounterBadgeProps {
  label?: string;
  count?: number;
  delta?: string;
  className?: string;
}

export function StatCounterBadge({
  label = "Requests",
  count = 9412,
  delta = "+8%",
  className,
}: StatCounterBadgeProps) {
  return (
    <div className={cn("inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1 font-mono text-xs shadow-sm", className)}>
      <span className="text-ink/60">{label}:</span>
      <span className="font-bold text-ink">{count.toLocaleString()}</span>
      <span className="text-[10px] text-emerald-600 font-bold">{delta}</span>
    </div>
  );
}

export default StatCounterBadge;

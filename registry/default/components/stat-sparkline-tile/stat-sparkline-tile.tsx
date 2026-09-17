"use client";

import { cn } from "@/lib/cn";

export interface StatSparklineTileProps {
  className?: string;
}

export function StatSparklineTile({ className }: StatSparklineTileProps) {
  return (
    <div className={cn("w-full max-w-xs rounded-xl border border-line bg-paper p-5 shadow-sm font-mono text-xs", className)}>
      <span className="text-ink/60 uppercase text-[10px]">THROUGHPUT TREND</span>
      <div className="flex items-end justify-between mt-2">
        <span className="text-2xl font-bold text-ink">99.98%</span>
        <svg className="h-6 w-20 overflow-visible text-emerald-600">
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            points="0,20 15,14 30,18 45,8 60,10 75,4 90,2"
          />
        </svg>
      </div>
    </div>
  );
}

export default StatSparklineTile;

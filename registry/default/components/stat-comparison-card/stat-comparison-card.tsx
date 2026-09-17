"use client";

import { cn } from "@/lib/cn";

export interface StatComparisonCardProps {
  className?: string;
}

export function StatComparisonCard({ className }: StatComparisonCardProps) {
  return (
    <div className={cn("w-full max-w-xs rounded-xl border border-line bg-paper p-5 shadow-sm font-mono text-xs", className)}>
      <span className="text-ink/60 uppercase block mb-3">BUNDLE OVERHEAD</span>
      <div className="flex items-baseline justify-between">
        <div>
          <span className="text-2xl font-bold text-ink">4.2 kB</span>
          <span className="text-[10px] text-ink/50 block">CURRENT</span>
        </div>
        <div className="text-right">
          <span className="text-sm font-semibold text-ink/40 line-through">18.4 kB</span>
          <span className="text-[10px] text-emerald-600 font-bold block">-77% SAVED</span>
        </div>
      </div>
    </div>
  );
}

export default StatComparisonCard;

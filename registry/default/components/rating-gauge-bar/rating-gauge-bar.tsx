"use client";

import { cn } from "@/lib/cn";

export interface RatingGaugeBarProps {
  score?: number;
  className?: string;
}

export function RatingGaugeBar({ score = 94, className }: RatingGaugeBarProps) {
  return (
    <div className={cn("w-full max-w-sm rounded-xl border border-line bg-paper p-5 shadow-sm font-mono text-xs", className)}>
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-ink/60">SATISFACTION SCORE</span>
        <span className="font-bold text-ink text-base">{score}%</span>
      </div>

      <div className="h-2.5 w-full rounded-full bg-line/40 overflow-hidden">
        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

export default RatingGaugeBar;

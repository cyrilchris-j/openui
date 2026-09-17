"use client";

import { cn } from "@/lib/cn";

export interface SplitComparisonSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  before?: React.ReactNode;
  after?: React.ReactNode;
}

export function SplitComparisonSlider({ before, after, className, ...props }: SplitComparisonSliderProps) {
  return (
    <div className={cn("grid grid-cols-2 h-64 max-w-2xl mx-auto rounded-2xl overflow-hidden border border-line relative font-mono text-xs", className)} {...props}>
      <div className="bg-surface/50 p-4 flex items-center justify-center border-r border-accent">{before}</div>
      <div className="bg-paper p-4 flex items-center justify-center">{after}</div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center font-bold text-[10px]">
        ⟷
      </div>
    </div>
  );
}

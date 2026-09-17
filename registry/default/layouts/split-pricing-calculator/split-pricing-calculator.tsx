"use client";

import { cn } from "@/lib/cn";

export interface SplitPricingCalculatorProps extends React.HTMLAttributes<HTMLDivElement> {
  controls?: React.ReactNode;
  receipt?: React.ReactNode;
}

export function SplitPricingCalculator({ controls, receipt, className, ...props }: SplitPricingCalculatorProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto p-6 rounded-2xl border border-line bg-paper font-sans shadow-sm", className)} {...props}>
      <div className="space-y-4">{controls}</div>
      <div className="p-6 rounded-xl border border-line bg-surface/30 font-mono text-xs space-y-3">{receipt}</div>
    </div>
  );
}

"use client";

import { cn } from "@/lib/cn";

export interface SplitSpecComparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  itemA?: React.ReactNode;
  itemB?: React.ReactNode;
}

export function SplitSpecComparator({ itemA, itemB, className, ...props }: SplitSpecComparatorProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto p-4 font-mono text-xs", className)} {...props}>
      <div className="p-4 rounded-xl border border-line bg-surface/30 space-y-2">{itemA}</div>
      <div className="p-4 rounded-xl border border-line bg-surface/30 space-y-2">{itemB}</div>
    </div>
  );
}

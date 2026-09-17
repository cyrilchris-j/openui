"use client";

import { cn } from "@/lib/cn";

export interface DualPanelComparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  leftTitle?: string;
  rightTitle?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export function DualPanelComparator({
  leftTitle = "Variant A",
  rightTitle = "Variant B",
  left,
  right,
  className,
  ...props
}: DualPanelComparatorProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto p-4 font-sans", className)} {...props}>
      <div className="p-4 rounded-xl border border-line bg-surface/30">
        <div className="font-mono text-xs font-bold text-ink mb-2 pb-2 border-b border-line">{leftTitle}</div>
        {left}
      </div>
      <div className="p-4 rounded-xl border border-line bg-surface/30">
        <div className="font-mono text-xs font-bold text-ink mb-2 pb-2 border-b border-line">{rightTitle}</div>
        {right}
      </div>
    </div>
  );
}

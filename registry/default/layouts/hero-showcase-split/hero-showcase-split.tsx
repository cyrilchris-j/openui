"use client";

import { cn } from "@/lib/cn";

export interface HeroShowcaseSplitProps extends React.HTMLAttributes<HTMLDivElement> {
  headline?: React.ReactNode;
  visual?: React.ReactNode;
}

export function HeroShowcaseSplit({ headline, visual, className, ...props }: HeroShowcaseSplitProps) {
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto p-8 items-center font-sans", className)} {...props}>
      <div className="space-y-4">{headline}</div>
      <div className="p-8 rounded-3xl border border-line bg-surface/40 flex items-center justify-center">{visual}</div>
    </div>
  );
}

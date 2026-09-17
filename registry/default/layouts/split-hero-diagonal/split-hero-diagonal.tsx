"use client";

import { cn } from "@/lib/cn";

export interface SplitHeroDiagonalProps extends React.HTMLAttributes<HTMLDivElement> {
  headline?: React.ReactNode;
  visual?: React.ReactNode;
}

export function SplitHeroDiagonal({ headline, visual, className, ...props }: SplitHeroDiagonalProps) {
  return (
    <div className={cn("relative grid grid-cols-1 lg:grid-cols-2 min-h-[360px] w-full overflow-hidden rounded-2xl border border-line font-sans", className)} {...props}>
      <div className="p-8 flex items-center bg-paper z-10">{headline}</div>
      <div className="p-8 flex items-center justify-center bg-surface/50 [clip-path:polygon(15%_0,100%_0,100%_100%,0%_100%)]">{visual}</div>
    </div>
  );
}

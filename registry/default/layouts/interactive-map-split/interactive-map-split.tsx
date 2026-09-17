"use client";

import { cn } from "@/lib/cn";

export interface InteractiveMapSplitProps extends React.HTMLAttributes<HTMLDivElement> {
  map?: React.ReactNode;
  children?: React.ReactNode;
}

export function InteractiveMapSplit({ map, children, className, ...props }: InteractiveMapSplitProps) {
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-12 min-h-[360px] w-full border border-line rounded-2xl overflow-hidden font-sans", className)} {...props}>
      <div className="lg:col-span-5 p-4 overflow-y-auto space-y-3 bg-paper">{children}</div>
      <div className="lg:col-span-7 bg-surface/40 p-6 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-line">{map}</div>
    </div>
  );
}

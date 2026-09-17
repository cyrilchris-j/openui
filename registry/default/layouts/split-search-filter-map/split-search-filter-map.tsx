"use client";

import { cn } from "@/lib/cn";

export interface SplitSearchFilterMapProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "results"> {
  filters?: React.ReactNode;
  results?: React.ReactNode;
  map?: React.ReactNode;
}

export function SplitSearchFilterMap({ filters, results, map, className, ...props }: SplitSearchFilterMapProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-12 min-h-[380px] w-full border border-line rounded-2xl overflow-hidden font-sans text-xs", className)} {...props}>
      <aside className="md:col-span-3 border-r border-line p-3 bg-surface/20 hidden md:block">{filters}</aside>
      <main className="md:col-span-5 p-4 overflow-y-auto space-y-3 bg-paper">{results}</main>
      <div className="md:col-span-4 bg-surface/40 p-4 hidden lg:flex items-center justify-center border-l border-line">{map}</div>
    </div>
  );
}

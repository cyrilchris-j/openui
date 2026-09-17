"use client";

import { cn } from "@/lib/cn";

export interface MultiPanelDockProps extends React.HTMLAttributes<HTMLDivElement> {
  editor?: React.ReactNode;
  dock?: React.ReactNode;
}

export function MultiPanelDock({ editor, dock, className, ...props }: MultiPanelDockProps) {
  return (
    <div className={cn("h-80 flex flex-col w-full border border-line rounded-xl overflow-hidden font-mono text-xs", className)} {...props}>
      <div className="flex-1 p-4 bg-paper overflow-y-auto">{editor}</div>
      <div className="h-28 border-t border-line p-3 bg-surface/40 shrink-0 overflow-y-auto">{dock}</div>
    </div>
  );
}

"use client";

import { cn } from "@/lib/cn";

export interface TerminalSplitViewProps extends React.HTMLAttributes<HTMLDivElement> {
  paneA?: React.ReactNode;
  paneB?: React.ReactNode;
}

export function TerminalSplitView({ paneA, paneB, className, ...props }: TerminalSplitViewProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 min-h-[300px] w-full border border-line rounded-xl overflow-hidden bg-slate-950 text-white font-mono text-xs", className)} {...props}>
      <div className="p-3 border-b md:border-b-0 md:border-r border-white/10 overflow-y-auto">{paneA}</div>
      <div className="p-3 overflow-y-auto">{paneB}</div>
    </div>
  );
}

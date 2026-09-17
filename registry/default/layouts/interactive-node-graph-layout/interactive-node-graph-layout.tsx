"use client";

import { cn } from "@/lib/cn";

export interface InteractiveNodeGraphLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  toolbar?: React.ReactNode;
  children?: React.ReactNode;
}

export function InteractiveNodeGraphLayout({ toolbar, children, className, ...props }: InteractiveNodeGraphLayoutProps) {
  return (
    <div className={cn("relative w-full h-80 rounded-2xl border border-line bg-surface/20 overflow-hidden font-mono text-xs", className)} {...props}>
      {toolbar && <div className="absolute top-3 left-3 z-10 p-1.5 rounded-lg border border-line bg-paper/90 shadow-sm flex items-center gap-2">{toolbar}</div>}
      <div className="absolute inset-0 flex items-center justify-center -z-10">{children}</div>
    </div>
  );
}

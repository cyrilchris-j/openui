"use client";

import { cn } from "@/lib/cn";

export interface CompactWidgetDockProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function CompactWidgetDock({ children, className, ...props }: CompactWidgetDockProps) {
  return (
    <div className={cn("grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 rounded-2xl border border-line bg-paper/90 backdrop-blur-md shadow-lg max-w-3xl mx-auto font-mono text-xs", className)} {...props}>
      {children}
    </div>
  );
}

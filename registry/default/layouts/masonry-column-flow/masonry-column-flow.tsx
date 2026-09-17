"use client";

import { cn } from "@/lib/cn";

export interface MasonryColumnFlowProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function MasonryColumnFlow({ children, className, ...props }: MasonryColumnFlowProps) {
  return (
    <div className={cn("columns-1 sm:columns-2 lg:columns-3 gap-4 p-4 max-w-5xl mx-auto space-y-4", className)} {...props}>
      {children}
    </div>
  );
}

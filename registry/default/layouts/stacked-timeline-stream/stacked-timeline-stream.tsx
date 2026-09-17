"use client";

import { cn } from "@/lib/cn";

export interface StackedTimelineStreamProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function StackedTimelineStream({ children, className, ...props }: StackedTimelineStreamProps) {
  return (
    <div className={cn("max-w-md mx-auto p-4 space-y-4 font-sans text-xs", className)} {...props}>
      {children}
    </div>
  );
}

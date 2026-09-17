"use client";

import { cn } from "@/lib/cn";

export interface TimelineMilestoneRailProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function TimelineMilestoneRail({ children, className, ...props }: TimelineMilestoneRailProps) {
  return (
    <div className={cn("relative max-w-2xl mx-auto p-4 space-y-6 font-sans before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-line", className)} {...props}>
      {children}
    </div>
  );
}

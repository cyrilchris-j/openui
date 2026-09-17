"use client";

import { cn } from "@/lib/cn";

export interface HorizontalStripReelProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function HorizontalStripReel({ children, className, ...props }: HorizontalStripReelProps) {
  return (
    <div className={cn("flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory px-4 scrollbar-none", className)} {...props}>
      {children}
    </div>
  );
}

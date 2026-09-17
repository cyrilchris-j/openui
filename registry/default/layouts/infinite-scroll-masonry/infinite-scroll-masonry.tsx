"use client";

import { cn } from "@/lib/cn";

export interface InfiniteScrollMasonryProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function InfiniteScrollMasonry({ children, className, ...props }: InfiniteScrollMasonryProps) {
  return (
    <div className={cn("columns-2 sm:columns-3 gap-3 p-4 max-w-4xl mx-auto space-y-3", className)} {...props}>
      {children}
    </div>
  );
}

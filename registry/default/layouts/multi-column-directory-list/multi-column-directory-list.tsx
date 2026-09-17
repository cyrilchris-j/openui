"use client";

import { cn } from "@/lib/cn";

export interface MultiColumnDirectoryListProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function MultiColumnDirectoryList({ children, className, ...props }: MultiColumnDirectoryListProps) {
  return (
    <div className={cn("grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto p-4 font-mono text-xs", className)} {...props}>
      {children}
    </div>
  );
}

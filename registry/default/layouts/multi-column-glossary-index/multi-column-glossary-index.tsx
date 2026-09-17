"use client";

import { cn } from "@/lib/cn";

export interface MultiColumnGlossaryIndexProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function MultiColumnGlossaryIndex({ children, className, ...props }: MultiColumnGlossaryIndexProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto p-6 font-serif text-xs", className)} {...props}>
      {children}
    </div>
  );
}

"use client";

import { cn } from "@/lib/cn";

export interface BentoModularGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function BentoModularGrid({ children, className, ...props }: BentoModularGridProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto p-4 font-sans", className)} {...props}>
      {children}
    </div>
  );
}

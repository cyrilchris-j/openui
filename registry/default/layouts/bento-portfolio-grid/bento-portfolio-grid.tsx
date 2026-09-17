"use client";

import { cn } from "@/lib/cn";

export interface BentoPortfolioGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function BentoPortfolioGrid({ children, className, ...props }: BentoPortfolioGridProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto p-4 font-sans", className)} {...props}>
      {children}
    </div>
  );
}

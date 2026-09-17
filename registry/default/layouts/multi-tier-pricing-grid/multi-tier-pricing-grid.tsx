"use client";

import { cn } from "@/lib/cn";

export interface MultiTierPricingGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function MultiTierPricingGrid({ children, className, ...props }: MultiTierPricingGridProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto p-4 font-sans items-center", className)} {...props}>
      {children}
    </div>
  );
}

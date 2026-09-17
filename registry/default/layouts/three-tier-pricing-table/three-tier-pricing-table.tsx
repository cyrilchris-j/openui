"use client";

import { cn } from "@/lib/cn";

export interface ThreeTierPricingTableProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function ThreeTierPricingTable({ children, className, ...props }: ThreeTierPricingTableProps) {
  return (
    <div className={cn("max-w-4xl mx-auto border border-line rounded-2xl overflow-hidden font-sans text-xs bg-paper", className)} {...props}>
      {children}
    </div>
  );
}

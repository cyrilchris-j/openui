"use client";

import { cn } from "@/lib/cn";

export interface BentoMetricsDashboardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function BentoMetricsDashboard({ children, className, ...props }: BentoMetricsDashboardProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-3 max-w-5xl mx-auto p-4 font-mono text-xs", className)} {...props}>
      {children}
    </div>
  );
}

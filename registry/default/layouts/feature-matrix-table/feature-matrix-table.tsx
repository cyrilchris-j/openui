"use client";

import { cn } from "@/lib/cn";

export interface FeatureMatrixTableProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function FeatureMatrixTable({ children, className, ...props }: FeatureMatrixTableProps) {
  return (
    <div className={cn("max-w-3xl mx-auto border border-line rounded-xl overflow-hidden font-sans text-xs bg-paper", className)} {...props}>
      {children}
    </div>
  );
}

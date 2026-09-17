"use client";

import { cn } from "@/lib/cn";

export interface StackedFeatureCardsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function StackedFeatureCards({ children, className, ...props }: StackedFeatureCardsProps) {
  return (
    <div className={cn("space-y-8 max-w-4xl mx-auto p-4 font-sans", className)} {...props}>
      {children}
    </div>
  );
}

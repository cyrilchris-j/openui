"use client";

import { cn } from "@/lib/cn";

export interface IsometricShelfGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function IsometricShelfGrid({ children, className, ...props }: IsometricShelfGridProps) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto p-6 font-sans [perspective:600px]", className)} {...props}>
      {children}
    </div>
  );
}

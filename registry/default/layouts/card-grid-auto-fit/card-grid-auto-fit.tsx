"use client";

import { cn } from "@/lib/cn";

export interface CardGridAutoFitProps extends React.HTMLAttributes<HTMLDivElement> {
  minWidth?: number;
  children?: React.ReactNode;
}

export function CardGridAutoFit({ minWidth = 240, children, className, ...props }: CardGridAutoFitProps) {
  return (
    <div
      className={cn("grid gap-4 p-4 max-w-5xl mx-auto font-sans", className)}
      style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}px, 1fr))` }}
      {...props}
    >
      {children}
    </div>
  );
}

"use client";

import { cn } from "@/lib/cn";

export interface DiagonalStripesPatternProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function DiagonalStripesPattern({ className, children, ...props }: DiagonalStripesPatternProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div
        className="absolute inset-0 pointer-events-none opacity-10 -z-10"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, currentColor, currentColor 1px, transparent 1px, transparent 12px)",
        }}
      />
      {children}
    </div>
  );
}

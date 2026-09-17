"use client";

import { cn } from "@/lib/cn";

export interface GeometricTartanPlaidProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function GeometricTartanPlaid({ className, children, ...props }: GeometricTartanPlaidProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div
        className="absolute inset-0 pointer-events-none opacity-10 -z-10"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, currentColor 0, currentColor 2px, transparent 2px, transparent 24px),
            repeating-linear-gradient(90deg, currentColor 0, currentColor 2px, transparent 2px, transparent 24px),
            repeating-linear-gradient(0deg, currentColor 0, currentColor 6px, transparent 6px, transparent 72px),
            repeating-linear-gradient(90deg, currentColor 0, currentColor 6px, transparent 6px, transparent 72px)
          `,
        }}
      />
      {children}
    </div>
  );
}

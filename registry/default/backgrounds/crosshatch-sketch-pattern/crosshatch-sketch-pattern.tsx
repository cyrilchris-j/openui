"use client";

import { cn } from "@/lib/cn";

export interface CrosshatchSketchPatternProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function CrosshatchSketchPattern({ className, children, ...props }: CrosshatchSketchPatternProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div
        className="absolute inset-0 pointer-events-none opacity-15 -z-10"
        style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 16px),
            repeating-linear-gradient(-45deg, currentColor 0, currentColor 1px, transparent 0, transparent 16px)
          `,
        }}
      />
      {children}
    </div>
  );
}

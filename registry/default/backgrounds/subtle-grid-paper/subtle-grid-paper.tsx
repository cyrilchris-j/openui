"use client";

import { cn } from "@/lib/cn";

export interface SubtleGridPaperProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function SubtleGridPaper({ className, children, ...props }: SubtleGridPaperProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div
        className="absolute inset-0 pointer-events-none opacity-20 -z-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />
      {children}
    </div>
  );
}

"use client";

import { cn } from "@/lib/cn";

export interface VintageLedgerLinesProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function VintageLedgerLines({ className, children, ...props }: VintageLedgerLinesProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div
        className="absolute inset-0 pointer-events-none opacity-20 -z-10"
        style={{
          backgroundImage: `
            linear-gradient(to bottom, #3b82f6 1px, transparent 1px),
            linear-gradient(to right, #ef4444 1px, transparent 1px)
          `,
          backgroundSize: "100% 24px, 80px 100%",
        }}
      />
      {children}
    </div>
  );
}

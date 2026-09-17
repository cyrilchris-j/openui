"use client";

import { cn } from "@/lib/cn";

export interface CircuitBoardTracesProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function CircuitBoardTraces({ className, children, ...props }: CircuitBoardTracesProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="pcb-pat" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M10 20 L50 20 L70 40 L90 40" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="10" cy="20" r="3" fill="currentColor" />
            <circle cx="90" cy="40" r="3" fill="currentColor" />
            <path d="M20 80 L40 60 L80 60" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="20" cy="80" r="3" fill="currentColor" />
            <circle cx="80" cy="60" r="3" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pcb-pat)" />
      </svg>
      {children}
    </div>
  );
}

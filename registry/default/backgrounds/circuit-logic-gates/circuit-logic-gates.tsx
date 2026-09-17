"use client";

import { cn } from "@/lib/cn";

export interface CircuitLogicGatesProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function CircuitLogicGates({ className, children, ...props }: CircuitLogicGatesProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="gates-pat" width="100" height="60" patternUnits="userSpaceOnUse">
            <path d="M10 20 L25 20 M10 40 L25 40 M25 15 L35 15 A15 15 0 0 1 35 45 L25 45 Z M50 30 L70 30" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="70" cy="30" r="2" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#gates-pat)" />
      </svg>
      {children}
    </div>
  );
}

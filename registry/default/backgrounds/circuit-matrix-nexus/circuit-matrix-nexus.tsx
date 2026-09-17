"use client";

import { cn } from "@/lib/cn";

export interface CircuitMatrixNexusProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function CircuitMatrixNexus({ className, children, ...props }: CircuitMatrixNexusProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-cyan-400 overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="nexus-pat" width="60" height="60" patternUnits="userSpaceOnUse">
            <line x1="0" y1="30" x2="60" y2="30" stroke="currentColor" strokeWidth="1" />
            <line x1="30" y1="0" x2="30" y2="60" stroke="currentColor" strokeWidth="1" />
            <circle cx="30" cy="30" r="3" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#nexus-pat)" />
      </svg>
      {children}
    </div>
  );
}

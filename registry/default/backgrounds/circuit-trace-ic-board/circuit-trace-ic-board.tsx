"use client";

import { cn } from "@/lib/cn";

export interface CircuitTraceICBoardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function CircuitTraceICBoard({ className, children, ...props }: CircuitTraceICBoardProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-emerald-400 overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="ic-pat" width="80" height="80" patternUnits="userSpaceOnUse">
            <rect x="25" y="25" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1" />
            <line x1="10" y1="30" x2="25" y2="30" stroke="currentColor" strokeWidth="1" />
            <line x1="10" y1="40" x2="25" y2="40" stroke="currentColor" strokeWidth="1" />
            <line x1="10" y1="50" x2="25" y2="50" stroke="currentColor" strokeWidth="1" />
            <line x1="55" y1="30" x2="70" y2="30" stroke="currentColor" strokeWidth="1" />
            <line x1="55" y1="40" x2="70" y2="40" stroke="currentColor" strokeWidth="1" />
            <line x1="55" y1="50" x2="70" y2="50" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ic-pat)" />
      </svg>
      {children}
    </div>
  );
}

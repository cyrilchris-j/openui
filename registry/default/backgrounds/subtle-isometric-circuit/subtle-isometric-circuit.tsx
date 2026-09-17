"use client";

import { cn } from "@/lib/cn";

export interface SubtleIsometricCircuitProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function SubtleIsometricCircuit({ className, children, ...props }: SubtleIsometricCircuitProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="iso-pcb-pat" width="60" height="52" patternUnits="userSpaceOnUse">
            <path d="M0 26 L30 9 L60 26 M30 9 L30 43" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="30" cy="9" r="2.5" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#iso-pcb-pat)" />
      </svg>
      {children}
    </div>
  );
}

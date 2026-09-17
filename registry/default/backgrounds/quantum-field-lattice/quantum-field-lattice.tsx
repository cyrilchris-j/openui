"use client";

import { cn } from "@/lib/cn";

export interface QuantumFieldLatticeProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function QuantumFieldLattice({ className, children, ...props }: QuantumFieldLatticeProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="quantum-pat" width="36" height="36" patternUnits="userSpaceOnUse">
            <line x1="18" y1="14" x2="18" y2="22" stroke="currentColor" strokeWidth="1" />
            <line x1="14" y1="18" x2="22" y2="18" stroke="currentColor" strokeWidth="1" />
            <circle cx="18" cy="18" r="1.5" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#quantum-pat)" />
      </svg>
      {children}
    </div>
  );
}

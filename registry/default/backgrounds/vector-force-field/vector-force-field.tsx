"use client";

import { cn } from "@/lib/cn";

export interface VectorForceFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function VectorForceField({ className, children, ...props }: VectorForceFieldProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="vector-pat" width="40" height="40" patternUnits="userSpaceOnUse">
            <line x1="12" y1="28" x2="28" y2="12" stroke="currentColor" strokeWidth="1" />
            <polygon points="28,12 22,14 26,18" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#vector-pat)" />
      </svg>
      {children}
    </div>
  );
}

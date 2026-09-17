"use client";

import { cn } from "@/lib/cn";

export interface GeometricPenroseTilesProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function GeometricPenroseTiles({ className, children, ...props }: GeometricPenroseTilesProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="penrose-pat" width="64" height="64" patternUnits="userSpaceOnUse">
            <polygon points="32,4 58,24 32,44 6,24" fill="none" stroke="currentColor" strokeWidth="1" />
            <polygon points="32,24 58,44 32,64 6,44" fill="none" stroke="currentColor" strokeWidth="1" />
            <line x1="32" y1="4" x2="32" y2="44" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#penrose-pat)" />
      </svg>
      {children}
    </div>
  );
}

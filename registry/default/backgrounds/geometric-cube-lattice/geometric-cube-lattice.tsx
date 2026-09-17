"use client";

import { cn } from "@/lib/cn";

export interface GeometricCubeLatticeProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function GeometricCubeLattice({ className, children, ...props }: GeometricCubeLatticeProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="cubes-pat" width="60" height="104" patternUnits="userSpaceOnUse">
            <polygon points="30,0 60,17 60,52 30,35" fill="none" stroke="currentColor" strokeWidth="1" />
            <polygon points="30,0 0,17 0,52 30,35" fill="none" stroke="currentColor" strokeWidth="1" />
            <polygon points="30,35 60,52 30,69 0,52" fill="none" stroke="currentColor" strokeWidth="1" />
            <polygon points="30,69 60,86 60,121 30,104" fill="none" stroke="currentColor" strokeWidth="1" />
            <polygon points="30,69 0,86 0,121 30,104" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cubes-pat)" />
      </svg>
      {children}
    </div>
  );
}

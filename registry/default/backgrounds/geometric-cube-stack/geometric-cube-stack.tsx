"use client";

import { cn } from "@/lib/cn";

export interface GeometricCubeStackProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function GeometricCubeStack({ className, children, ...props }: GeometricCubeStackProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="stack-pat" width="40" height="70" patternUnits="userSpaceOnUse">
            <polygon points="20,0 40,12 20,24 0,12" fill="none" stroke="currentColor" strokeWidth="1" />
            <polygon points="20,24 40,36 20,48 0,36" fill="none" stroke="currentColor" strokeWidth="1" />
            <polygon points="20,48 40,60 20,72 0,60" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#stack-pat)" />
      </svg>
      {children}
    </div>
  );
}

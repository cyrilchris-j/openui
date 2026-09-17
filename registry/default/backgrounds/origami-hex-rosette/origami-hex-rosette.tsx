"use client";

import { cn } from "@/lib/cn";

export interface OrigamiHexRosetteProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function OrigamiHexRosette({ className, children, ...props }: OrigamiHexRosetteProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hex-rosette-pat" width="48" height="48" patternUnits="userSpaceOnUse">
            <polygon points="24,4 30,18 44,24 30,30 24,44 18,30 4,24 18,18" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex-rosette-pat)" />
      </svg>
      {children}
    </div>
  );
}

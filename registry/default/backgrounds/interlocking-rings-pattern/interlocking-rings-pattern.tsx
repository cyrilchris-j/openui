"use client";

import { cn } from "@/lib/cn";

export interface InterlockingRingsPatternProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function InterlockingRingsPattern({ className, children, ...props }: InterlockingRingsPatternProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="rings-pat" width="48" height="48" patternUnits="userSpaceOnUse">
            <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="0" cy="0" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="48" cy="0" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="0" cy="48" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="48" cy="48" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#rings-pat)" />
      </svg>
      {children}
    </div>
  );
}

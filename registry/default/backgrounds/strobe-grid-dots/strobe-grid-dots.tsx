"use client";

import { cn } from "@/lib/cn";

export interface StrobeGridDotsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function StrobeGridDots({ className, children, ...props }: StrobeGridDotsProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="strobe-pat" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="15" cy="15" r="2" fill="currentColor" />
            <circle cx="15" cy="15" r="5" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#strobe-pat)" />
      </svg>
      {children}
    </div>
  );
}

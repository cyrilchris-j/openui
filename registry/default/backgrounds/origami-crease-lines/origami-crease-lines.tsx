"use client";

import { cn } from "@/lib/cn";

export interface OrigamiCreaseLinesProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function OrigamiCreaseLines({ className, children, ...props }: OrigamiCreaseLinesProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="origami-pat" width="50" height="40" patternUnits="userSpaceOnUse">
            <path d="M0 0 L25 20 L50 0 M25 20 L25 40 M0 40 L25 20 L50 40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#origami-pat)" />
      </svg>
      {children}
    </div>
  );
}

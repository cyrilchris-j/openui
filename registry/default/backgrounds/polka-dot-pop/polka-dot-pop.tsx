"use client";

import { cn } from "@/lib/cn";

export interface PolkaDotPopProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function PolkaDotPop({ className, children, ...props }: PolkaDotPopProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="polka-pat" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="8" cy="8" r="3" fill="currentColor" />
            <circle cx="24" cy="24" r="3" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#polka-pat)" />
      </svg>
      {children}
    </div>
  );
}

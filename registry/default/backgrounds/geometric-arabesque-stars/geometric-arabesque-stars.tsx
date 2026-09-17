"use client";

import { cn } from "@/lib/cn";

export interface GeometricArabesqueStarsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function GeometricArabesqueStars({ className, children, ...props }: GeometricArabesqueStarsProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="arabesque-pat" width="60" height="60" patternUnits="userSpaceOnUse">
            <rect x="15" y="15" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1" />
            <rect x="15" y="15" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(45 30 30)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#arabesque-pat)" />
      </svg>
      {children}
    </div>
  );
}

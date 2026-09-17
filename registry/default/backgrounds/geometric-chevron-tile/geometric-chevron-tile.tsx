"use client";

import { cn } from "@/lib/cn";

export interface GeometricChevronTileProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function GeometricChevronTile({ className, children, ...props }: GeometricChevronTileProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="chevron-pat" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M0 20 L20 0 L40 20 L20 40 Z" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M0 0 L20 20 L40 0" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M0 40 L20 20 L40 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#chevron-pat)" />
      </svg>
      {children}
    </div>
  );
}

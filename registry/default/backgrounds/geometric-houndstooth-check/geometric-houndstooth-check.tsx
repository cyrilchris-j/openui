"use client";

import { cn } from "@/lib/cn";

export interface GeometricHoundstoothCheckProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function GeometricHoundstoothCheck({ className, children, ...props }: GeometricHoundstoothCheckProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="houndstooth-pat" width="32" height="32" patternUnits="userSpaceOnUse">
            <polygon points="0,0 8,0 16,8 8,8" fill="currentColor" />
            <polygon points="16,8 24,8 32,16 24,16" fill="currentColor" />
            <polygon points="16,16 32,16 32,32 16,32" fill="currentColor" />
            <polygon points="0,16 8,16 0,24" fill="currentColor" />
            <polygon points="24,0 32,0 32,8" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#houndstooth-pat)" />
      </svg>
      {children}
    </div>
  );
}

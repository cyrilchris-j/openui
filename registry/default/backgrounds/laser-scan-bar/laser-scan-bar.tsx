"use client";

import { cn } from "@/lib/cn";

export interface LaserScanBarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function LaserScanBar({ className, children, ...props }: LaserScanBarProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-white overflow-hidden", className)} {...props}>
      <div
        className="absolute inset-x-0 h-1 bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)] pointer-events-none -z-10 animate-bounce duration-1000 top-1/2"
      />
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/80 pointer-events-none -z-10" />
      {children}
    </div>
  );
}

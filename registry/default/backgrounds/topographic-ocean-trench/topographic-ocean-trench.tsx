"use client";

import { cn } from "@/lib/cn";

export interface TopographicOceanTrenchProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function TopographicOceanTrench({ className, children, ...props }: TopographicOceanTrenchProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-cyan-400 overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 800 600">
        <path d="M0,150 Q400,350 800,150" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M0,220 Q400,420 800,220" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M0,300 Q400,490 800,300" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M0,380 Q400,560 800,380" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
      {children}
    </div>
  );
}

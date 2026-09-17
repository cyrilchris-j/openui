"use client";

import { cn } from "@/lib/cn";

export interface TopographicContourLinesProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function TopographicContourLines({ className, children, ...props }: TopographicContourLinesProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 800 600">
        <path d="M0,100 Q200,50 400,120 T800,100" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M0,160 Q220,110 420,180 T800,160" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M0,240 Q250,190 450,260 T800,230" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M0,320 Q230,270 430,340 T800,310" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M0,400 Q270,350 470,420 T800,390" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M0,480 Q240,430 440,500 T800,470" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M0,560 Q260,510 460,580 T800,550" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      {children}
    </div>
  );
}

"use client";

import { cn } from "@/lib/cn";

export interface FlowingTopologicalBandsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function FlowingTopologicalBands({ className, children, ...props }: FlowingTopologicalBandsProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 800 600">
        <path d="M0,80 C200,160 400,20 800,140" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M0,160 C250,220 450,90 800,210" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M0,260 C220,340 500,180 800,300" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M0,380 C300,450 520,290 800,420" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M0,500 C280,560 550,420 800,530" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      {children}
    </div>
  );
}

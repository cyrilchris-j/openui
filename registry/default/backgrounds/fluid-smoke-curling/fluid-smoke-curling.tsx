"use client";

import { cn } from "@/lib/cn";

export interface FluidSmokeCurlingProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function FluidSmokeCurling({ className, children, ...props }: FluidSmokeCurlingProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 400 600">
        <path d="M200 600 Q240 450 180 350 T220 150 Q230 50 200 0" fill="none" stroke="currentColor" strokeWidth="2" filter="blur(2px)" />
        <path d="M190 600 Q230 460 170 360 T210 160 Q220 60 190 0" fill="none" stroke="currentColor" strokeWidth="1" filter="blur(3px)" />
        <path d="M210 600 Q250 440 190 340 T230 140 Q240 40 210 0" fill="none" stroke="currentColor" strokeWidth="1.5" filter="blur(4px)" />
      </svg>
      {children}
    </div>
  );
}

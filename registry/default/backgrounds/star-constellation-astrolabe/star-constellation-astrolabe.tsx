"use client";

import { cn } from "@/lib/cn";

export interface StarConstellationAstrolabeProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function StarConstellationAstrolabe({ className, children, ...props }: StarConstellationAstrolabeProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 -z-10">
        <svg className="w-[500px] h-[500px]" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" />
          <circle cx="100" cy="100" r="35" fill="none" stroke="currentColor" strokeWidth="0.75" />
          <line x1="15" y1="100" x2="185" y2="100" stroke="currentColor" strokeWidth="1" />
          <line x1="100" y1="15" x2="100" y2="185" stroke="currentColor" strokeWidth="1" />
          <polygon points="100,20 103,30 97,30" fill="currentColor" />
          <polygon points="100,180 103,170 97,170" fill="currentColor" />
        </svg>
      </div>
      {children}
    </div>
  );
}

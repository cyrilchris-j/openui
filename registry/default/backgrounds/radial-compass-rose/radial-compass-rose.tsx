"use client";

import { cn } from "@/lib/cn";

export interface RadialCompassRoseProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function RadialCompassRose({ className, children, ...props }: RadialCompassRoseProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 -z-10">
        <svg className="w-[500px] h-[500px]" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="100" cy="100" r="82" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" />
          <polygon points="100,10 106,90 100,85 94,90" fill="currentColor" />
          <polygon points="100,190 106,110 100,115 94,110" fill="currentColor" />
          <polygon points="10,100 90,106 85,100 90,94" fill="currentColor" />
          <polygon points="190,100 110,106 115,100 110,94" fill="currentColor" />
        </svg>
      </div>
      {children}
    </div>
  );
}

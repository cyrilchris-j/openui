"use client";

import { cn } from "@/lib/cn";

export interface HypnoticSpiralVortexProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function HypnoticSpiralVortex({ className, children, ...props }: HypnoticSpiralVortexProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15 -z-10">
        <svg className="w-[500px] h-[500px]" viewBox="0 0 200 200">
          <path
            d="M 100 100 m 0 0 a 10 10 0 0 1 10 10 a 20 20 0 0 1 -20 20 a 30 30 0 0 1 -30 -30 a 40 40 0 0 1 40 -40 a 50 50 0 0 1 50 50 a 60 60 0 0 1 -60 60 a 70 70 0 0 1 -70 -70 a 80 80 0 0 1 80 -80"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      </div>
      {children}
    </div>
  );
}

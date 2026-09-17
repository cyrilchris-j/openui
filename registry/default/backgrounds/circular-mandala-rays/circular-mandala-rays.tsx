"use client";

import { cn } from "@/lib/cn";

export interface CircularMandalaRaysProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function CircularMandalaRays({ className, children, ...props }: CircularMandalaRaysProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15 -z-10">
        <svg className="w-[600px] h-[600px]" viewBox="0 0 200 200">
          {Array.from({ length: 12 }).map((_, i) => (
            <ellipse
              key={i}
              cx="100"
              cy="100"
              rx="80"
              ry="25"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
              transform={`rotate(${i * 15} 100 100)`}
            />
          ))}
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.75" />
          <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="0.75" />
        </svg>
      </div>
      {children}
    </div>
  );
}

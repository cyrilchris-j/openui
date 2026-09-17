"use client";

import { cn } from "@/lib/cn";

export interface AstronomyStellarOrbitsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function AstronomyStellarOrbits({ className, children, ...props }: AstronomyStellarOrbitsProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 -z-10">
        <svg className="w-[500px] h-[500px]" viewBox="0 0 200 200">
          {Array.from({ length: 8 }).map((_, i) => (
            <ellipse
              key={i}
              cx="100"
              cy="100"
              rx="75"
              ry="30"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
              transform={`rotate(${i * 22.5} 100 100)`}
            />
          ))}
        </svg>
      </div>
      {children}
    </div>
  );
}

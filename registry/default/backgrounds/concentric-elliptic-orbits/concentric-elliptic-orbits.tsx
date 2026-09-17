"use client";

import { cn } from "@/lib/cn";

export interface ConcentricEllipticOrbitsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function ConcentricEllipticOrbits({ className, children, ...props }: ConcentricEllipticOrbitsProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
        <ellipse cx="400" cy="300" rx="360" ry="120" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(-15 400 300)" />
        <ellipse cx="400" cy="300" rx="280" ry="90" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(25 400 300)" />
        <ellipse cx="400" cy="300" rx="200" ry="70" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(-40 400 300)" />
        <circle cx="400" cy="300" r="4" fill="currentColor" />
      </svg>
      {children}
    </div>
  );
}

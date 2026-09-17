"use client";

import { cn } from "@/lib/cn";

export interface CelestialZodiacMapProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function CelestialZodiacMap({ className, children, ...props }: CelestialZodiacMapProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400">
        <circle cx="300" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="300" cy="200" r="120" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
        <line x1="120" y1="200" x2="480" y2="200" stroke="currentColor" strokeWidth="0.75" />
        <line x1="300" y1="20" x2="300" y2="380" stroke="currentColor" strokeWidth="0.75" />
        <circle cx="240" cy="160" r="2" fill="currentColor" />
        <circle cx="360" cy="140" r="3" fill="currentColor" />
        <circle cx="280" cy="260" r="2" fill="currentColor" />
        <circle cx="330" cy="220" r="2.5" fill="currentColor" />
        <line x1="240" y1="160" x2="360" y2="140" stroke="currentColor" strokeWidth="0.5" />
        <line x1="360" y1="140" x2="330" y2="220" stroke="currentColor" strokeWidth="0.5" />
      </svg>
      {children}
    </div>
  );
}

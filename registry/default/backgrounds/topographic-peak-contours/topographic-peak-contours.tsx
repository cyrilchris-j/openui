"use client";

import { cn } from "@/lib/cn";

export interface TopographicPeakContoursProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function TopographicPeakContours({ className, children, ...props }: TopographicPeakContoursProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400">
        <path d="M 300 200 m -40, 0 a 40,25 0 1,0 80,0 a 40,25 0 1,0 -80,0" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M 300 200 m -70, 0 a 70,45 0 1,0 140,0 a 70,45 0 1,0 -140,0" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M 300 200 m -110, 0 a 110,70 0 1,0 220,0 a 110,70 0 1,0 -220,0" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M 300 200 m -160, 0 a 160,105 0 1,0 320,0 a 160,105 0 1,0 -320,0" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="300" cy="200" r="2" fill="currentColor" />
      </svg>
      {children}
    </div>
  );
}

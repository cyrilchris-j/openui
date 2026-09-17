"use client";

import { cn } from "@/lib/cn";

export interface VintageSunburstRaysProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function VintageSunburstRays({ className, children, ...props }: VintageSunburstRaysProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div
        className="absolute inset-0 pointer-events-none opacity-15 -z-10"
        style={{
          background: "repeating-conic-gradient(from 0deg at 50% 100%, currentColor 0deg 10deg, transparent 10deg 20deg)",
        }}
      />
      {children}
    </div>
  );
}

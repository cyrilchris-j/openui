"use client";

import { cn } from "@/lib/cn";

export interface HalftoneDotGradientProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function HalftoneDotGradient({ className, children, ...props }: HalftoneDotGradientProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div
        className="absolute inset-0 pointer-events-none opacity-20 -z-10"
        style={{
          backgroundImage: "radial-gradient(currentColor 1.5px, transparent 1.5px)",
          backgroundSize: "16px 16px",
          maskImage: "linear-gradient(to bottom, black 20%, transparent 95%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 20%, transparent 95%)",
        }}
      />
      {children}
    </div>
  );
}

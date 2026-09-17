"use client";

import { cn } from "@/lib/cn";

export interface GradientPrismRainbowProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function GradientPrismRainbow({ className, children, ...props }: GradientPrismRainbowProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-white overflow-hidden", className)} {...props}>
      <div
        className="absolute -top-40 -left-40 w-[800px] h-[300px] pointer-events-none -z-10 rotate-45 blur-3xl opacity-30"
        style={{
          background: "linear-gradient(to right, #ef4444, #f97316, #eab308, #22c55e, #06b6d4, #8b5cf6)",
        }}
      />
      {children}
    </div>
  );
}

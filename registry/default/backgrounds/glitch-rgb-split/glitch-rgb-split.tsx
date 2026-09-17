"use client";

import { cn } from "@/lib/cn";

export interface GlitchRGBSplitProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function GlitchRGBSplit({ className, children, ...props }: GlitchRGBSplitProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-white overflow-hidden", className)} {...props}>
      <div className="absolute inset-0 pointer-events-none opacity-20 -z-10 mix-blend-screen">
        <div
          className="absolute inset-0 translate-x-1"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, #ef4444 0, #ef4444 1px, transparent 1px, transparent 8px)",
          }}
        />
        <div
          className="absolute inset-0 -translate-x-1"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, #06b6d4 0, #06b6d4 1px, transparent 1px, transparent 8px)",
          }}
        />
      </div>
      {children}
    </div>
  );
}

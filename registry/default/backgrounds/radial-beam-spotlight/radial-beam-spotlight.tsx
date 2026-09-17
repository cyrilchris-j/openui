"use client";

import { cn } from "@/lib/cn";

export interface RadialBeamSpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function RadialBeamSpotlight({ className, children, ...props }: RadialBeamSpotlightProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-white overflow-hidden", className)} {...props}>
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[500px] pointer-events-none -z-10 opacity-35"
        style={{
          background: "radial-gradient(ellipse at top, rgba(56, 189, 248, 0.45) 0%, rgba(56, 189, 248, 0.05) 50%, transparent 70%)",
        }}
      />
      {children}
    </div>
  );
}

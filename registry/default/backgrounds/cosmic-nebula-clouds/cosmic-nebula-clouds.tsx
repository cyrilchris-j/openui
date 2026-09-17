"use client";

import { cn } from "@/lib/cn";

export interface CosmicNebulaCloudsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function CosmicNebulaClouds({ className, children, ...props }: CosmicNebulaCloudsProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-white overflow-hidden", className)} {...props}>
      <div
        className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-30 pointer-events-none -z-10"
        style={{ background: "radial-gradient(circle, #8b5cf6 0%, #ec4899 50%, transparent 80%)" }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[450px] h-[450px] rounded-full blur-3xl opacity-25 pointer-events-none -z-10"
        style={{ background: "radial-gradient(circle, #06b6d4 0%, #3b82f6 50%, transparent 80%)" }}
      />
      {children}
    </div>
  );
}

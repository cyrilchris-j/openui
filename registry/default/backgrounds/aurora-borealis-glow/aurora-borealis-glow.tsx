"use client";

import { cn } from "@/lib/cn";

export interface AuroraBorealisGlowProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function AuroraBorealisGlow({ className, children, ...props }: AuroraBorealisGlowProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-white overflow-hidden", className)} {...props}>
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-96 h-96 rounded-full bg-emerald-500/30 blur-3xl" />
        <div className="absolute -top-20 right-1/4 w-96 h-96 rounded-full bg-cyan-500/30 blur-3xl" />
        <div className="absolute top-40 left-1/3 w-80 h-80 rounded-full bg-purple-500/25 blur-3xl" />
      </div>
      {children}
    </div>
  );
}

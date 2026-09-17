"use client";

import { cn } from "@/lib/cn";

export interface SoundwaveRadialPulseProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function SoundwaveRadialPulse({ className, children, ...props }: SoundwaveRadialPulseProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-cyan-400 overflow-hidden", className)} {...props}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25 -z-10">
        <div className="w-96 h-96 rounded-full border border-cyan-500/40" />
        <div className="absolute w-72 h-72 rounded-full border border-cyan-500/50" />
        <div className="absolute w-48 h-48 rounded-full border border-cyan-500/60" />
        <div className="absolute w-24 h-24 rounded-full border border-cyan-500/80" />
      </div>
      {children}
    </div>
  );
}

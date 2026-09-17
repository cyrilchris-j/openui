"use client";

import { cn } from "@/lib/cn";

export interface RetroSynthSunProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function RetroSynthSun({ className, children, ...props }: RetroSynthSunProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-white overflow-hidden", className)} {...props}>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-gradient-to-b from-amber-400 via-pink-500 to-purple-600 pointer-events-none opacity-70 -z-10 overflow-hidden shadow-[0_0_50px_rgba(236,72,153,0.5)]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "repeating-linear-gradient(to bottom, transparent 0px, transparent 10px, #020617 10px, #020617 14px)",
          }}
        />
      </div>
      {children}
    </div>
  );
}

"use client";

import { cn } from "@/lib/cn";

export interface GlitchScanlineStaticProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function GlitchScanlineStatic({ className, children, ...props }: GlitchScanlineStaticProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-emerald-400 overflow-hidden", className)} {...props}>
      <div
        className="absolute inset-0 pointer-events-none opacity-25 -z-10"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0.7))",
          backgroundSize: "100% 4px",
        }}
      />
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent via-black/40 to-black/80 -z-10" />
      {children}
    </div>
  );
}

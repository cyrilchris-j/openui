"use client";

import { cn } from "@/lib/cn";

export interface AuroraCurtainDrapeProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function AuroraCurtainDrape({ className, children, ...props }: AuroraCurtainDrapeProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-white overflow-hidden", className)} {...props}>
      <div
        className="absolute inset-0 pointer-events-none opacity-30 -z-10"
        style={{
          background: "linear-gradient(to bottom, transparent 20%, rgba(16, 185, 129, 0.4) 60%, rgba(6, 182, 212, 0.3) 80%, transparent 100%)",
          filter: "blur(30px)",
        }}
      />
      {children}
    </div>
  );
}

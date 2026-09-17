"use client";

import { cn } from "@/lib/cn";

export interface CarbonFiberWeaveProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function CarbonFiberWeave({ className, children, ...props }: CarbonFiberWeaveProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-white overflow-hidden", className)} {...props}>
      <div
        className="absolute inset-0 pointer-events-none opacity-40 -z-10"
        style={{
          background: `
            radial-gradient(black 15%, transparent 16%) 0 0,
            radial-gradient(black 15%, transparent 16%) 8px 8px,
            radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 0 1px,
            radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 8px 9px
          `,
          backgroundColor: "#1e2024",
          backgroundSize: "16px 16px",
        }}
      />
      {children}
    </div>
  );
}

"use client";

import { cn } from "@/lib/cn";

export interface NeonLaserGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function NeonLaserGrid({ className, children, ...props }: NeonLaserGridProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-white overflow-hidden", className)} {...props}>
      <div
        className="absolute inset-0 pointer-events-none opacity-30 -z-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(236, 72, 153, 0.7) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(6, 182, 212, 0.7) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
      {children}
    </div>
  );
}

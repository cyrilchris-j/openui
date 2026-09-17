"use client";

import { cn } from "@/lib/cn";

export interface RetroCRTPhosphorGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function RetroCRTPhosphorGrid({ className, children, ...props }: RetroCRTPhosphorGridProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-white overflow-hidden", className)} {...props}>
      <div
        className="absolute inset-0 pointer-events-none opacity-25 -z-10"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(255, 0, 0, 0.4) 1px, rgba(0, 255, 0, 0.4) 2px, rgba(0, 0, 255, 0.4) 3px, transparent 4px)",
          backgroundSize: "6px 100%",
        }}
      />
      {children}
    </div>
  );
}

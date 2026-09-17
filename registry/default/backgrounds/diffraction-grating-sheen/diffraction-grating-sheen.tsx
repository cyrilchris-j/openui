"use client";

import { cn } from "@/lib/cn";

export interface DiffractionGratingSheenProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function DiffractionGratingSheen({ className, children, ...props }: DiffractionGratingSheenProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-white overflow-hidden", className)} {...props}>
      <div
        className="absolute inset-0 pointer-events-none opacity-20 -z-10"
        style={{
          background: "conic-gradient(from 45deg at 50% 50%, #f43f5e, #f59e0b, #10b981, #06b6d4, #8b5cf6, #ec4899, #f43f5e)",
          filter: "blur(60px)",
        }}
      />
      {children}
    </div>
  );
}

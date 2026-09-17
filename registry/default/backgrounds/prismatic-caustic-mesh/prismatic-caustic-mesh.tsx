"use client";

import { cn } from "@/lib/cn";

export interface PrismaticCausticMeshProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function PrismaticCausticMesh({ className, children, ...props }: PrismaticCausticMeshProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-white overflow-hidden", className)} {...props}>
      <div
        className="absolute -top-20 -right-20 w-[600px] h-[400px] pointer-events-none opacity-30 -z-10 rotate-12 blur-3xl"
        style={{
          background: "linear-gradient(135deg, rgba(239, 68, 68, 0.4), rgba(59, 130, 246, 0.4), rgba(16, 185, 129, 0.4))",
        }}
      />
      {children}
    </div>
  );
}

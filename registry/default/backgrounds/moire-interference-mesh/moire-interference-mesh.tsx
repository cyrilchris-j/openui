"use client";

import { cn } from "@/lib/cn";

export interface MoireInterferenceMeshProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function MoireInterferenceMesh({ className, children, ...props }: MoireInterferenceMeshProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div className="absolute inset-0 pointer-events-none opacity-20 -z-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(to right, currentColor 1px, transparent 1px)",
            backgroundSize: "8px 8px",
          }}
        />
        <div
          className="absolute inset-0 origin-center rotate-3"
          style={{
            backgroundImage: "linear-gradient(to right, currentColor 1px, transparent 1px)",
            backgroundSize: "8px 8px",
          }}
        />
      </div>
      {children}
    </div>
  );
}

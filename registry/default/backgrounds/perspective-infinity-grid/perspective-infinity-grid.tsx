"use client";

import { cn } from "@/lib/cn";

export interface PerspectiveInfinityGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function PerspectiveInfinityGrid({ className, children, ...props }: PerspectiveInfinityGridProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-white overflow-hidden [perspective:500px]", className)} {...props}>
      <div
        className="absolute inset-0 top-1/3 [transform:rotateX(65deg)] origin-top pointer-events-none opacity-40 -z-10"
        style={{
          backgroundImage: "linear-gradient(to right, #8b5cf6 1px, transparent 1px), linear-gradient(to bottom, #8b5cf6 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage: "linear-gradient(to bottom, black, transparent 90%)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent 90%)",
        }}
      />
      {children}
    </div>
  );
}

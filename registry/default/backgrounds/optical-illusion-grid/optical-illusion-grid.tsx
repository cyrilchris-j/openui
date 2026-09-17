"use client";

import { cn } from "@/lib/cn";

export interface OpticalIllusionGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function OpticalIllusionGrid({ className, children, ...props }: OpticalIllusionGridProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div
        className="absolute inset-0 pointer-events-none opacity-20 -z-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 6px, transparent 6px),
            linear-gradient(to bottom, currentColor 6px, transparent 6px)
          `,
          backgroundSize: "36px 36px",
        }}
      />
      {children}
    </div>
  );
}

"use client";

import { cn } from "@/lib/cn";

export interface ConcentricRadarRingsProps extends React.HTMLAttributes<HTMLDivElement> {
  ringCount?: number;
  children?: React.ReactNode;
}

export function ConcentricRadarRings({
  ringCount = 5,
  className,
  children,
  ...props
}: ConcentricRadarRingsProps) {
  const rings = Array.from({ length: ringCount }, (_, i) => (i + 1) * (100 / ringCount));

  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 -z-10">
        <div className="absolute inset-x-0 top-1/2 h-px bg-line" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-line" />
        {rings.map((pct, idx) => (
          <div
            key={idx}
            className="absolute rounded-full border border-line"
            style={{ width: `${pct}%`, height: `${pct}%`, maxWidth: `${pct * 6}px`, maxHeight: `${pct * 6}px` }}
          />
        ))}
      </div>
      {children}
    </div>
  );
}

"use client";

import { cn } from "@/lib/cn";

export interface HoneycombHexLatticeProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  children?: React.ReactNode;
}

export function HoneycombHexLattice({ size = 32, className, children, ...props }: HoneycombHexLatticeProps) {
  const w = size * 2;
  const h = size * 1.732;

  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hex-pat" width={w} height={h} patternUnits="userSpaceOnUse">
            <path
              d={`M${size * 0.5} 0 L${size * 1.5} 0 L${w} ${h * 0.5} L${size * 1.5} ${h} L${size * 0.5} ${h} L0 ${h * 0.5} Z`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex-pat)" />
      </svg>
      {children}
    </div>
  );
}

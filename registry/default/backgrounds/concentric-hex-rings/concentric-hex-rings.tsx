"use client";

import { cn } from "@/lib/cn";

export interface ConcentricHexRingsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function ConcentricHexRings({ className, children, ...props }: ConcentricHexRingsProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-emerald-400 overflow-hidden", className)} {...props}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 -z-10">
        <svg className="w-[600px] h-[600px]" viewBox="0 0 200 200">
          {[20, 40, 60, 80].map((r, i) => (
            <polygon
              key={i}
              points={`${100 + r * Math.cos(0)},${100 + r * Math.sin(0)} ${100 + r * Math.cos(Math.PI / 3)},${100 + r * Math.sin(Math.PI / 3)} ${100 + r * Math.cos((2 * Math.PI) / 3)},${100 + r * Math.sin((2 * Math.PI) / 3)} ${100 + r * Math.cos(Math.PI)},${100 + r * Math.sin(Math.PI)} ${100 + r * Math.cos((4 * Math.PI) / 3)},${100 + r * Math.sin((4 * Math.PI) / 3)} ${100 + r * Math.cos((5 * Math.PI) / 3)},${100 + r * Math.sin((5 * Math.PI) / 3)}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>
      {children}
    </div>
  );
}

"use client";

import { cn } from "@/lib/cn";

export interface RadialMenuOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  center?: React.ReactNode;
  items?: React.ReactNode[];
}

export function RadialMenuOverlay({ center, items = [], className, ...props }: RadialMenuOverlayProps) {
  return (
    <div className={cn("relative w-full h-80 rounded-2xl border border-line bg-paper overflow-hidden flex items-center justify-center font-mono text-xs", className)} {...props}>
      <div className="w-16 h-16 rounded-full border border-line bg-accent text-white flex items-center justify-center font-bold z-10">{center}</div>
      {items.map((item, idx) => {
        const angle = (idx / items.length) * Math.PI * 2;
        const x = Math.cos(angle) * 80;
        const y = Math.sin(angle) * 80;
        return (
          <div key={idx} className="absolute z-10" style={{ transform: `translate(${x}px, ${y}px)` }}>
            {item}
          </div>
        );
      })}
    </div>
  );
}

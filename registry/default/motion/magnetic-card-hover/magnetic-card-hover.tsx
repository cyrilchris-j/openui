"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface MagneticCardHoverProps {
  className?: string;
}

export function MagneticCardHover({ className }: MagneticCardHoverProps) {
  const [hover, setHover] = useState(false);

  return (
    <div className={cn("flex h-64 w-full max-w-sm items-center justify-center rounded-xl border border-line bg-paper p-6", className)}>
      <div
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        className={cn(
          "cursor-pointer rounded-xl border border-line bg-paper p-6 transition-all duration-200 ease-out",
          hover ? "-translate-y-2 shadow-2xl scale-[1.02]" : "translate-y-0 shadow-sm scale-100"
        )}
      >
        <span className="font-mono text-[10px] uppercase text-ink/50">ELEVATION RIG</span>
        <h4 className="mt-1 font-display font-bold text-ink">Dynamic Shadow Hover</h4>
        <p className="mt-1 text-xs text-ink/70">Z-axis lift with softened diffuse drop shadow.</p>
      </div>
    </div>
  );
}

export default MagneticCardHover;

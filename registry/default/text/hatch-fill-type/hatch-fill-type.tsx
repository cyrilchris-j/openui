"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface HatchFillTypeProps {
  children: string;
  ink?: string;
  className?: string;
}

export function HatchFillType({ children, ink = "#1c1c1e", className }: HatchFillTypeProps) {
  const [angle, setAngle] = useState(45);
  const [spacing, setSpacing] = useState(6);

  return (
    <span className={cn("inline-flex flex-col gap-4", className)}>
      <span
        aria-hidden
        className="inline-block select-none font-display"
        style={{
          backgroundImage: `repeating-linear-gradient(${angle}deg, ${ink} 0 1.5px, transparent 1.5px ${spacing}px)`,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        {children}
      </span>
      <span className="sr-only">{children}</span>
      <label className="flex items-center gap-2 font-mono text-xs text-ink/70">
        angle
        <input type="range" min={0} max={90} value={angle} onChange={(event) => setAngle(Number(event.target.value))} className="w-24" />
      </label>
      <label className="flex items-center gap-2 font-mono text-xs text-ink/70">
        spacing
        <input type="range" min={3} max={14} value={spacing} onChange={(event) => setSpacing(Number(event.target.value))} className="w-24" />
      </label>
    </span>
  );
}

export default HatchFillType;

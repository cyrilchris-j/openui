"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SpectralSplitTextProps {
  children: string;
  /** Max split offset in px. */
  offset?: number;
  channelA?: string;
  channelB?: string;
  className?: string;
}

export function SpectralSplitText({
  children,
  offset = 4,
  channelA = "#e2624a",
  channelB = "#4a6fa5",
  className,
}: SpectralSplitTextProps) {
  const [spread, setSpread] = useState(1);

  return (
    <span className={cn("inline-flex flex-col gap-4", className)}>
      <span className="relative inline-block select-none font-display" role="text" aria-label={children}>
        <span
          aria-hidden
          className="absolute left-0 top-0 block"
          style={{ color: channelA, transform: `translateX(${-offset * spread}px)`, mixBlendMode: "multiply", opacity: 0.85 }}
        >
          {children}
        </span>
        <span
          aria-hidden
          className="absolute left-0 top-0 block"
          style={{ color: channelB, transform: `translateX(${offset * spread}px)`, mixBlendMode: "screen", opacity: 0.85 }}
        >
          {children}
        </span>
        <span aria-hidden className="relative z-10 block text-ink">
          {children}
        </span>
        <span className="sr-only">{children}</span>
      </span>
      <label className="flex items-center gap-2 font-mono text-xs text-ink/70">
        split
        <input
          type="range"
          min={0}
          max={3}
          step={0.1}
          value={spread}
          onChange={(event) => setSpread(Number(event.target.value))}
          className="w-32 accent-[#e2624a]"
        />
      </label>
    </span>
  );
}

export default SpectralSplitText;

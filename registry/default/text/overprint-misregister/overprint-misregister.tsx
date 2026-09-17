"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface OverprintMisregisterProps {
  children: string;
  /** Max plate offset in px at full misregistration. */
  maxOffset?: number;
  className?: string;
}

export function OverprintMisregister({ children, maxOffset = 5, className }: OverprintMisregisterProps) {
  const [misregister, setMisregister] = useState(0.35);
  const offset = misregister * maxOffset;

  return (
    <span className={cn("inline-flex flex-col gap-4", className)}>
      <span className="relative inline-block select-none font-display" role="text" aria-label={children}>
        {(["#00a5e3", "#e5007d", "#ffd400"] as const).map((color, index) => {
          const angle = (index * Math.PI * 2) / 3;
          return (
            <span
              key={color}
              aria-hidden
              className="absolute left-0 top-0 block"
              style={{
                color,
                mixBlendMode: "multiply",
                opacity: 0.9,
                transform: `translate(${Math.cos(angle) * offset}px, ${Math.sin(angle) * offset}px)`,
              }}
            >
              {children}
            </span>
          );
        })}
        <span aria-hidden className="relative z-10 block text-ink">
          {children}
        </span>
        <span className="sr-only">{children}</span>
      </span>
      <label className="flex items-center gap-2 font-mono text-xs text-ink/70">
        misregister
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={misregister}
          onChange={(event) => setMisregister(Number(event.target.value))}
          className="w-32"
        />
      </label>
    </span>
  );
}

export default OverprintMisregister;

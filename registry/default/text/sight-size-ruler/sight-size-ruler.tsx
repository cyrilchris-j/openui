"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

const RULES = [
  { name: "cap height", top: "0%" },
  { name: "x-height", top: "24%" },
  { name: "baseline", top: "76%" },
] as const;

export interface SightSizeRulerProps {
  children: string;
  /** Specimen size in px. */
  size?: number;
  className?: string;
}

export function SightSizeRuler({ children, size = 96, className }: SightSizeRulerProps) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <figure className={cn("relative inline-block", className)}>
      <figcaption className="mb-3 font-mono text-xs uppercase tracking-widest text-ink/60">
        Sight-size · {size}px
      </figcaption>
      <div className="relative" style={{ fontSize: size, lineHeight: 1 }}>
        <span className="relative z-10 font-display text-ink">{children}</span>
        {RULES.map((rule) => (
          <button
            key={rule.name}
            type="button"
            onMouseEnter={() => setActive(rule.name)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(rule.name)}
            onBlur={() => setActive(null)}
            className="absolute left-0 right-0 border-0 bg-transparent p-0"
            style={{ top: `calc(${rule.top} + 0.14em)` }}
            aria-label={`Show ${rule.name}`}
          >
            <span
              className="block w-full border-t"
              style={{
                borderColor: active === rule.name ? "#e2624a" : "color-mix(in oklab, currentColor, transparent 72%)",
                borderStyle: rule.name === "baseline" ? "solid" : "dashed",
              }}
            />
            <span
              className="absolute right-0 -top-5 font-mono text-[10px] uppercase tracking-widest"
              style={{ opacity: active === rule.name ? 1 : 0, color: "#e2624a", transition: "opacity 120ms ease" }}
            >
              {rule.name}
            </span>
          </button>
        ))}
      </div>
    </figure>
  );
}

export default SightSizeRuler;

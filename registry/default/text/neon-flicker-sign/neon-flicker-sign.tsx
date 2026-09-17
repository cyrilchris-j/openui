"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export interface NeonFlickerSignProps {
  children: string;
  /** Glow colour. */
  glow?: string;
  /** Indices of glyphs that misbehave, e.g. [2, 5]. */
  faultyIndices?: number[];
  className?: string;
}

export function NeonFlickerSign({
  children,
  glow = "#41ead4",
  faultyIndices = [],
  className,
}: NeonFlickerSignProps) {
  const [lit, setLit] = useState<boolean[]>(() => [...children].map(() => true));

  useEffect(() => {
    if (faultyIndices.length === 0) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let timeout: number | undefined;
    const buzz = () => {
      const next = [...children].map((_, index) =>
        faultyIndices.includes(index) ? Math.random() > 0.5 : true,
      );
      setLit(next);
      timeout = window.setTimeout(() => {
        setLit([...children].map(() => true));
        timeout = window.setTimeout(buzz, 2400 + Math.random() * 3600);
      }, 140 + Math.random() * 220);
    };

    timeout = window.setTimeout(buzz, 2000);
    return () => window.clearTimeout(timeout);
  }, [children, faultyIndices]);

  return (
    <span className={cn("inline-block select-none font-display", className)} role="text" aria-label={children}>
      {[...children].map((char, index) => (
        <span
          key={`${index}-${char}`}
          aria-hidden
          style={{
            color: lit[index] ? glow : "rgba(255,255,255,0.18)",
            textShadow: lit[index]
              ? `0 0 4px ${glow}, 0 0 11px ${glow}, 0 0 32px ${glow}`
              : "none",
            transition: "color 60ms linear, text-shadow 60ms linear",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
      <span className="sr-only">{children}</span>
    </span>
  );
}

export default NeonFlickerSign;

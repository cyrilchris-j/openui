"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface SpotlightKnockoutProps {
  /** Text revealed inside the spotlight. */
  children: string;
  /** Cover colour above the text. */
  cover?: string;
  /** Spotlight radius, px. */
  radius?: number;
  className?: string;
}

export function SpotlightKnockout({
  children,
  cover = "#0e0e10",
  radius = 110,
  className,
}: SpotlightKnockoutProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(Boolean(window.matchMedia?.("(pointer: fine)")?.matches));
  }, []);

  const onMove = useCallback((event: React.PointerEvent) => {
    const host = ref.current;
    if (!host) return;
    const rect = host.getBoundingClientRect();
    host.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    host.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }, []);

  return (
    <span
      ref={ref}
      onPointerMove={enabled ? onMove : undefined}
      className={cn("relative inline-block select-none", className)}
      role="text"
      aria-label={children}
      style={{ "--spot-x": "50%", "--spot-y": "50%" } as React.CSSProperties}
    >
      <span aria-hidden className="relative z-0 block text-ink">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 z-10"
        style={{
          background: cover,
          maskImage: `radial-gradient(circle ${radius}px at var(--spot-x) var(--spot-y), transparent 0 55%, black 78%)`,
          WebkitMaskImage: `radial-gradient(circle ${radius}px at var(--spot-x) var(--spot-y), transparent 0 55%, black 78%)`,
          opacity: enabled ? 1 : 0.86,
          transition: "opacity 300ms ease",
        }}
      />
    </span>
  );
}

export default SpotlightKnockout;

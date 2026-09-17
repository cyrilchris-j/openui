"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface PerspectiveTiltTextProps {
  children: string;
  /** Maximum tilt in degrees on each axis. */
  maxTilt?: number;
  /** Extra depth for the shadow layer, in px. */
  depth?: number;
  className?: string;
}

export function PerspectiveTiltText({
  children,
  maxTilt = 18,
  depth = 24,
  className,
}: PerspectiveTiltTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const fine = window.matchMedia?.("(pointer: fine)");
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(Boolean(fine?.matches) && !reduced?.matches);
    update();
    fine?.addEventListener?.("change", update);
    return () => fine?.removeEventListener?.("change", update);
  }, []);

  useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    },
    [],
  );

  const handleMove = (event: React.PointerEvent<HTMLSpanElement>) => {
    if (!enabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => setTilt({ x: -py * maxTilt, y: px * maxTilt }));
  };

  const reset = () => setTilt({ x: 0, y: 0 });

  return (
    <span
      ref={ref}
      className={cn("inline-block", className)}
      style={{ perspective: "600px" }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      role="text"
      aria-label={children}
    >
      <span
        aria-hidden
        className="relative inline-block will-change-transform motion-reduce:transform-none"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 180ms cubic-bezier(0.2, 0, 0, 1)",
        }}
      >
        <span
          aria-hidden
          className="absolute inset-0 select-none text-graphite/25"
          style={{ transform: `translateZ(-${depth}px)` }}
        >
          {children}
        </span>
        <span className="relative" style={{ transform: `translateZ(${depth / 2}px)` }}>
          {children}
        </span>
      </span>
    </span>
  );
}

export default PerspectiveTiltText;

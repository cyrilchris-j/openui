"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface LensMagnifyTextProps {
  children: string;
  /** Lens diameter in px. */
  lensSize?: number;
  /** Magnification factor inside the lens. */
  zoom?: number;
  className?: string;
}

export function LensMagnifyText({
  children,
  lensSize = 96,
  zoom = 1.8,
  className,
}: LensMagnifyTextProps) {
  const surfaceRef = useRef<HTMLSpanElement>(null);
  const lensRef = useRef<HTMLSpanElement>(null);
  const frame = useRef<number | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia?.("(pointer: fine)");
    setActive(Boolean(fine?.matches));
  }, []);

  useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    },
    [],
  );

  const track = useCallback(
    (clientX: number, clientY: number) => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const surface = surfaceRef.current;
        const lens = lensRef.current;
        if (!surface || !lens) return;
        const rect = surface.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        lens.style.left = `${x - lensSize / 2}px`;
        lens.style.top = `${y - lensSize / 2}px`;
        // Counter-offset the scaled copy so the point under the cursor is the
        // point under the lens centre: translate = (1 - zoom) * position.
        const inner = lens.firstElementChild as HTMLElement | null;
        if (inner) {
          inner.style.transform = `scale(${zoom}) translate(${(1 - zoom) * (x - lensSize / 2)}px, ${(1 - zoom) * (y - lensSize / 2)}px)`;
        }
      });
    },
    [lensSize, zoom],
  );

  return (
    <span
      ref={surfaceRef}
      className={cn("relative inline-block select-none", className)}
      onPointerMove={(event) => active && track(event.clientX, event.clientY)}
      role="text"
      aria-label={children}
    >
      <span aria-hidden>{children}</span>
      <span
        ref={lensRef}
        aria-hidden
        className={cn(
          "pointer-events-none absolute overflow-hidden rounded-full border border-line bg-paper",
          active ? "opacity-100" : "opacity-0",
        )}
        style={{ width: lensSize, height: lensSize, transition: "opacity 150ms ease" }}
      >
        <span
          className="absolute left-0 top-0 origin-top-left"
          style={{ width: "100%", willChange: "transform" }}
        >
          {children}
        </span>
      </span>
    </span>
  );
}

export default LensMagnifyText;

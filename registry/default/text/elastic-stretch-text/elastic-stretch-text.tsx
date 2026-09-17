"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface ElasticStretchTextProps {
  text: string;
  /** Maximum horizontal stretch at the pointer position. */
  maxStretch?: number;
  /** Falloff radius in px. */
  radius?: number;
  className?: string;
}

export function ElasticStretchText({
  text,
  maxStretch = 1.9,
  radius = 110,
  className,
}: ElasticStretchTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const glyphRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const frame = useRef<number | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia?.("(pointer: fine)");
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    setEnabled(Boolean(fine?.matches) && !reduced?.matches);
  }, []);

  useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    },
    [],
  );

  const apply = useCallback(
    (pointerX: number | null) => {
      for (const [index, glyph] of glyphRefs.current.entries()) {
        if (!glyph) continue;
        if (!enabled || pointerX === null) {
          glyph.style.transform = "scaleX(1)";
          continue;
        }
        const rect = glyph.getBoundingClientRect();
        const distance = Math.abs(pointerX - (rect.left + rect.width / 2));
        const falloff = Math.max(0, 1 - distance / radius);
        glyph.style.transform = `scaleX(${1 + (maxStretch - 1) * falloff})`;
      }
    },
    [enabled, maxStretch, radius],
  );

  const handleMove = (event: React.PointerEvent<HTMLSpanElement>) => {
    const x = event.clientX;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => apply(x));
  };

  return (
    <span
      ref={containerRef}
      className={cn("select-none", className)}
      onPointerMove={handleMove}
      onPointerLeave={() => apply(null)}
      aria-label={text}
      role="text"
    >
      {[...text].map((char, index) => (
        <span
          key={`${char}-${index}`}
          aria-hidden
          ref={(element) => {
            glyphRefs.current[index] = element;
          }}
          className="inline-block will-change-transform motion-reduce:transform-none"
          style={{ transformOrigin: "center", transition: "transform 260ms cubic-bezier(0.3, 1.6, 0.4, 1)" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export default ElasticStretchText;

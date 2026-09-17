"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface VariableWeightTextProps {
  text: string;
  /** Weight at rest, 100–900 depending on the face. */
  baseWeight?: number;
  /** Weight at zero distance. */
  peakWeight?: number;
  /** Falloff radius in px. */
  radius?: number;
  className?: string;
}

export function VariableWeightText({
  text,
  baseWeight = 300,
  peakWeight = 800,
  radius = 120,
  className,
}: VariableWeightTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const glyphRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const frame = useRef<number | null>(null);
  const [enabled, setEnabled] = useState(false);

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

  const applyWeights = useCallback(
    (pointerX: number | null) => {
      for (const [index, glyph] of glyphRefs.current.entries()) {
        if (!glyph) continue;
        if (!enabled || pointerX === null) {
          glyph.style.fontVariationSettings = `"wght" ${baseWeight}`;
          continue;
        }
        const rect = glyph.getBoundingClientRect();
        const distance = Math.abs(pointerX - (rect.left + rect.width / 2));
        const falloff = Math.max(0, 1 - distance / radius);
        const weight = Math.round(baseWeight + (peakWeight - baseWeight) * falloff * falloff);
        glyph.style.fontVariationSettings = `"wght" ${weight}`;
      }
    },
    [baseWeight, enabled, peakWeight, radius],
  );

  const handleMove = (event: React.PointerEvent<HTMLSpanElement>) => {
    const x = event.clientX;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => applyWeights(x));
  };

  return (
    <span
      ref={containerRef}
      className={cn("select-none", className)}
      style={{ fontVariationSettings: `"wght" ${baseWeight}` }}
      onPointerMove={handleMove}
      onPointerLeave={() => applyWeights(null)}
      aria-label={text}
      role="text"
    >
      {[...text].map((char, index) => (
        <span
          key={`${char}-${index}`}
          aria-hidden
          // eslint-disable-next-line no-return-assign
          ref={(element) => {
            glyphRefs.current[index] = element;
          }}
          className="inline-block will-change-[font-variation-settings]"
          style={{ transition: "font-variation-settings 120ms ease-out" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export default VariableWeightText;

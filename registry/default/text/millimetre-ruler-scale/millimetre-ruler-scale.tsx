"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface MillimetreRulerScaleProps {
  /** Ruler length in millimetres. */
  lengthMm?: number;
  className?: string;
}

export function MillimetreRulerScale({ lengthMm = 150, className }: MillimetreRulerScaleProps) {
  const [dragMm, setDragMm] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // CSS mm unit = 1/25.4 inch rendered at 96dpi ≈ 3.78px, but the browser's
  // physical calibration may differ; we trust CSS mm and let users verify.
  const ticks = Array.from({ length: lengthMm + 1 }, (_, index) => index);

  const onPointerDown = (event: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track) return;
    const update = (clientX: number) => {
      const rect = track.getBoundingClientRect();
      const ratio = (clientX - rect.left) / rect.width;
      setDragMm(Math.max(0, Math.min(lengthMm, Math.round(ratio * lengthMm))));
    };
    update(event.clientX);
    const move = (moveEvent: PointerEvent) => update(moveEvent.clientX);
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        className="relative flex cursor-ew-resize select-none items-end border-b-2 border-ink pb-0.5"
        style={{ height: 56 }}
        role="slider"
        aria-label="Measuring position in millimetres"
        aria-valuemin={0}
        aria-valuemax={lengthMm}
        aria-valuenow={dragMm ?? 0}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") setDragMm((value) => Math.min(lengthMm, (value ?? 0) + 1));
          if (event.key === "ArrowLeft") setDragMm((value) => Math.max(0, (value ?? 0) - 1));
        }}
      >
        {ticks.map((mm) => {
          const isCm = mm % 10 === 0;
          const isHalf = mm % 5 === 0 && !isCm;
          return (
            <span
              key={mm}
              aria-hidden
              className="relative flex flex-col items-center justify-end"
              style={{ width: "1mm", height: isCm ? 32 : isHalf ? 22 : 13 }}
            >
              <span
                className="w-px bg-ink"
                style={{ height: "100%", opacity: isCm ? 1 : isHalf ? 0.7 : 0.45 }}
              />
              {isCm && (
                <span className="absolute -top-4 font-mono text-[9px] text-ink/70">{mm / 10}</span>
              )}
            </span>
          );
        })}
        {dragMm !== null && (
          <span
            aria-hidden
            className="absolute bottom-0 top-0 w-px bg-accent"
            style={{ left: `${(dragMm / lengthMm) * 100}%` }}
          />
        )}
      </div>
      <p className="font-mono text-xs text-ink/60" role="status">
        {dragMm !== null ? `reading: ${dragMm} mm` : "drag along the ruler · verify against a card"}
      </p>
    </div>
  );
}

export default MillimetreRulerScale;

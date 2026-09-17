"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface MeasuringTapeHoverProps {
  children: string;
  className?: string;
}

export function MeasuringTapeHover({ children, className }: MeasuringTapeHoverProps) {
  const [measurement, setMeasurement] = useState<{ index: number; px: number; ch: number } | null>(null);
  const hostRef = useRef<HTMLParagraphElement>(null);

  const measure = (event: React.MouseEvent<HTMLSpanElement>, index: number) => {
    const host = hostRef.current;
    if (!host) return;
    const hostStyle = window.getComputedStyle(host);
    const rect = event.currentTarget.getBoundingClientRect();
    const chWidth = parseFloat(hostStyle.fontSize) * 0.5; // approx ch unit
    setMeasurement({ index, px: Math.round(rect.width), ch: Number((rect.width / chWidth).toFixed(1)) });
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <p ref={hostRef} className="max-w-prose text-lg leading-loose text-ink">
        {children.split(" ").map((word, index) => (
          <span
            key={index}
            className="cursor-crosshair rounded-sm hover:bg-line/40"
            onMouseEnter={(event) => measure(event, index)}
            onMouseLeave={() => setMeasurement(null)}
          >
            {word}{" "}
          </span>
        ))}
      </p>
      <div className="h-6 font-mono text-xs text-ink/60" role="status" aria-live="polite">
        {measurement !== null && (
          <span aria-hidden>
            word {measurement.index + 1}: {measurement.px}px ≈ {measurement.ch}ch
          </span>
        )}
      </div>
    </div>
  );
}

export default MeasuringTapeHover;

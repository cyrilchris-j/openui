"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface SpringSnappingSliderProps {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  onChange?: (val: number) => void;
  className?: string;
}

export function SpringSnappingSlider({
  min = 0,
  max = 100,
  step = 20,
  defaultValue = 40,
  onChange,
  className,
}: SpringSnappingSliderProps) {
  const [value, setValue] = useState(defaultValue);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const stepsCount = Math.floor((max - min) / step);
  const percentage = ((value - min) / (max - min)) * 100;

  const updateFromPointer = (clientX: number) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const rawPct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const rawVal = min + rawPct * (max - min);
    const snappedVal = Math.round(rawVal / step) * step;
    const clamped = Math.max(min, Math.min(max, snappedVal));
    setValue(clamped);
    onChange?.(clamped);
  };

  return (
    <div className={cn("w-full max-w-md p-4", className)}>
      <div className="flex items-center justify-between font-mono text-xs text-graphite mb-2">
        <span>QUANTIZED_STEP: {step}</span>
        <span className="font-bold text-ink">{value} / {max}</span>
      </div>
      <div
        ref={trackRef}
        onPointerDown={(e) => {
          setIsDragging(true);
          updateFromPointer(e.clientX);
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (isDragging) updateFromPointer(e.clientX);
        }}
        onPointerUp={(e) => {
          setIsDragging(false);
          try {
            (e.target as HTMLElement).releasePointerCapture(e.pointerId);
          } catch {}
        }}
        className="relative h-9 cursor-pointer select-none rounded border border-line bg-surface p-1 flex items-center"
      >
        {/* Notches */}
        <div className="absolute inset-x-2 flex justify-between pointer-events-none">
          {Array.from({ length: stepsCount + 1 }).map((_, i) => (
            <div key={i} className="h-2 w-0.5 bg-line/80" />
          ))}
        </div>

        {/* Progress fill */}
        <div
          className="absolute left-1 top-1 bottom-1 bg-ink/10 rounded-sm pointer-events-none transition-all duration-150 ease-out"
          style={{ width: `calc(${percentage}% - 4px)` }}
        />

        {/* Thumb */}
        <div
          className="absolute top-1 bottom-1 w-6 rounded border border-ink bg-ink text-paper flex items-center justify-center font-mono text-[9px] shadow-sm transition-all duration-200 ease-spring"
          style={{
            left: `calc(${percentage}% - ${(percentage / 100) * 24}px)`,
            transitionProperty: isDragging ? "none" : "left",
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface RubberSliderKnobProps {
  className?: string;
}

export function RubberSliderKnob({ className }: RubberSliderKnobProps) {
  const [deg, setDeg] = useState(0);

  return (
    <div className={cn("inline-flex flex-col items-center gap-4 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-line bg-paper shadow-inner">
        <div
          className="h-16 w-16 rounded-full border border-line bg-ink shadow transition-transform duration-75 flex items-start justify-center pt-1"
          style={{ transform: `rotate(${deg}deg)` }}
        >
          <div className="h-3 w-1 rounded bg-paper" />
        </div>
      </div>

      <div className="flex gap-2">
        {[-90, -45, 0, 45, 90].map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setDeg(d)}
            className="rounded border border-line px-2 py-0.5 font-mono text-[10px] text-ink hover:bg-line/20"
          >
            {d}°
          </button>
        ))}
      </div>
    </div>
  );
}

export default RubberSliderKnob;

"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ElasticSliderKnobProps {
  className?: string;
}

export function ElasticSliderKnob({ className }: ElasticSliderKnobProps) {
  const [angle, setAngle] = useState(0);

  return (
    <div className={cn("inline-flex flex-col items-center gap-4 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60">SPRING RECOIL JOG: {angle}°</span>

      <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-line bg-line/20">
        <div
          className="h-16 w-16 rounded-full border border-line bg-ink shadow-md transition-transform duration-200 ease-out flex items-start justify-center pt-1"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          <div className="h-3 w-1 bg-paper rounded" />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => {
            setAngle(-60);
            setTimeout(() => setAngle(0), 200);
          }}
          className="rounded border border-line px-3 py-1 font-mono text-xs hover:bg-line/20"
        >
          Jog Left
        </button>
        <button
          type="button"
          onClick={() => {
            setAngle(60);
            setTimeout(() => setAngle(0), 200);
          }}
          className="rounded border border-line px-3 py-1 font-mono text-xs hover:bg-line/20"
        >
          Jog Right
        </button>
      </div>
    </div>
  );
}

export default ElasticSliderKnob;

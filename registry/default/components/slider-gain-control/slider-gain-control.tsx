"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SliderGainControlProps {
  className?: string;
}

export function SliderGainControl({ className }: SliderGainControlProps) {
  const [db, setDb] = useState(0);

  return (
    <div className={cn("w-full max-w-xs rounded-xl border border-line bg-paper p-5 shadow-sm font-mono text-xs", className)}>
      <div className="flex justify-between mb-3">
        <span className="text-ink/60">OUTPUT GAIN</span>
        <span className="font-bold text-ink">{db > 0 ? `+${db} dB` : `${db} dB`}</span>
      </div>

      <input
        type="range"
        min="-12"
        max="12"
        value={db}
        onChange={(e) => setDb(parseInt(e.target.value, 10))}
        className="w-full cursor-pointer accent-ink"
      />
    </div>
  );
}

export default SliderGainControl;

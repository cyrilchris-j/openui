"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ColorSwatchPickerProps {
  className?: string;
}

export function ColorSwatchPicker({ className }: ColorSwatchPickerProps) {
  const colors = ["#000000", "#4f46e5", "#0ea5e9", "#10b981", "#f59e0b", "#ef4444"];
  const [active, setActive] = useState(colors[0]);

  return (
    <div className={cn("inline-flex flex-col gap-3 rounded-xl border border-line bg-paper p-4 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60">THEME TONE: {active}</span>
      <div className="flex gap-2">
        {colors.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 shadow-sm transition-transform active:scale-90"
            style={{ backgroundColor: c }}
          >
            {active === c && <span className="text-white text-xs font-bold">✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ColorSwatchPicker;

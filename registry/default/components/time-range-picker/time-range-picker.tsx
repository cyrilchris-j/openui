"use client";

import { useState } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/cn";

export interface TimeRangePickerProps {
  className?: string;
  defaultStart?: string;
  defaultEnd?: string;
}

export function TimeRangePicker({
  className,
  defaultStart = "09:00",
  defaultEnd = "17:00",
}: TimeRangePickerProps) {
  const [start, setStart] = useState(defaultStart);
  const [end, setEnd] = useState(defaultEnd);

  const presets = [
    { label: "1h", s: "09:00", e: "10:00" },
    { label: "4h", s: "09:00", e: "13:00" },
    { label: "Workday", s: "09:00", e: "17:00" },
    { label: "Evening", s: "18:00", e: "23:00" },
  ];

  return (
    <div className={cn("p-4 rounded-xl border border-line bg-paper max-w-sm w-full font-sans shadow-sm", className)}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-ink">
          <Clock className="w-3.5 h-3.5 text-accent" />
          <span>Active Window</span>
        </div>
        <span className="text-[11px] font-mono text-ink/60">{start} → {end}</span>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div>
          <label className="block text-[11px] font-mono text-ink/60 mb-1">Start</label>
          <input
            type="time"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded border border-line bg-surface text-xs font-mono text-ink focus:outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="block text-[11px] font-mono text-ink/60 mb-1">End</label>
          <input
            type="time"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded border border-line bg-surface text-xs font-mono text-ink focus:outline-none focus:border-accent"
          />
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        {presets.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => {
              setStart(p.s);
              setEnd(p.e);
            }}
            className="px-2 py-1 rounded bg-surface hover:bg-line/40 text-[10px] font-mono text-ink/80 transition-colors"
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}

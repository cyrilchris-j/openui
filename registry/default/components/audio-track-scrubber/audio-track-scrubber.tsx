"use client";

import { useState } from "react";
import { Play, Pause, Volume2 } from "lucide-react";
import { cn } from "@/lib/cn";

export function AudioTrackScrubber({ className }: { className?: string }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(35);

  const bars = [20, 45, 60, 80, 50, 90, 75, 40, 60, 30, 85, 95, 70, 45, 55, 35, 65, 80, 50, 40];

  return (
    <div className={cn("flex items-center gap-3 p-3 rounded-full border border-line bg-paper max-w-md w-full shadow-sm", className)}>
      <button
        type="button"
        onClick={() => setPlaying(!playing)}
        className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center transition-transform active:scale-95 shrink-0"
        aria-label={playing ? "Pause" : "Play"}
      >
        {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
      </button>

      <div className="flex-1 flex items-center gap-0.5 h-8 px-1 cursor-pointer" onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const p = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
        setProgress(p);
      }}>
        {bars.map((h, i) => {
          const barPct = (i / bars.length) * 100;
          const isPassed = barPct <= progress;
          return (
            <div
              key={i}
              className={cn("flex-1 rounded-full transition-all", isPassed ? "bg-accent" : "bg-line")}
              style={{ height: `${h}%` }}
            />
          );
        })}
      </div>

      <div className="text-[11px] font-mono text-ink/60 shrink-0">01:24</div>
      <Volume2 className="w-4 h-4 text-ink/40 hover:text-ink cursor-pointer shrink-0" />
    </div>
  );
}

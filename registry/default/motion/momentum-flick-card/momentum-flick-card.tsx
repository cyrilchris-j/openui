"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface MomentumFlickCardProps {
  className?: string;
}

export function MomentumFlickCard({ className }: MomentumFlickCardProps) {
  const [flicked, setFlicked] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const flick = (dir: "left" | "right") => {
    setDirection(dir);
    setFlicked(true);
    setTimeout(() => setFlicked(false), 800);
  };

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div className="relative h-64 w-52">
        {/* Background standby card */}
        <div className="absolute inset-0 rounded-lg border border-line bg-surface p-4 scale-95 opacity-60" />

        {/* Foreground dynamic card */}
        <div
          style={{
            transform: flicked
              ? direction === "right"
                ? "translate(160%, -20%) rotate(24deg)"
                : "translate(-160%, -20%) rotate(-24deg)"
              : "translate(0, 0) rotate(0deg)",
            opacity: flicked ? 0 : 1,
          }}
          className="absolute inset-0 flex flex-col justify-between rounded-lg border border-ink bg-paper p-5 shadow-lg transition-all duration-500 ease-out select-none"
        >
          <span className="font-mono text-[10px] uppercase tracking-wider text-graphite">
            DECISION SPECIMEN
          </span>
          <div className="my-auto text-center">
            <h4 className="font-serif text-xl font-bold text-ink">Action 09</h4>
            <p className="mt-1 text-xs text-graphite">Flick left or right to trigger ballistic flight.</p>
          </div>
          <div className="flex justify-between font-mono text-[10px] text-graphite">
            <span>← Dismiss</span>
            <span>Approve →</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => flick("left")}
          className="rounded border border-line px-3 py-1 font-mono text-xs text-ink hover:bg-surface"
        >
          Flick Left
        </button>
        <button
          type="button"
          onClick={() => flick("right")}
          className="rounded border border-line px-3 py-1 font-mono text-xs text-ink hover:bg-surface"
        >
          Flick Right
        </button>
      </div>
    </div>
  );
}

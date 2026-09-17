"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export interface GerundLoadingLabelProps {
  /** Stages in order; the last one completes. */
  stages: string[];
  /** ms per stage. */
  stageMs?: number;
  /** Called once with the past-tense completion. */
  onComplete?: () => void;
  className?: string;
}

export function GerundLoadingLabel({ stages, stageMs = 1100, onComplete, className }: GerundLoadingLabelProps) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (stage >= stages.length) {
      onComplete?.();
      return;
    }
    const timer = window.setTimeout(() => setStage((value) => value + 1), stageMs);
    return () => window.clearTimeout(timer);
  }, [stage, stages.length, stageMs, onComplete]);

  const done = stage >= stages.length;
  const label = done ? "Done" : `${stages[stage]}…`;

  return (
    <p
      className={cn("inline-flex flex-col gap-1.5 font-mono text-sm", className)}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <span aria-hidden className={done ? "text-emerald-600" : "text-ink"}>
        {label}
      </span>
      <span aria-hidden className="relative h-px w-40 bg-line">
        <span
          className="absolute left-0 top-0 h-full bg-accent"
          style={{
            width: done ? "100%" : `${((stage + 1) / stages.length) * 100}%`,
            transition: "width 600ms ease",
          }}
        />
      </span>
    </p>
  );
}

export default GerundLoadingLabel;

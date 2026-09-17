"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface RatingFeedbackScaleProps {
  className?: string;
}

export function RatingFeedbackScale({ className }: RatingFeedbackScaleProps) {
  const [score, setScore] = useState(8);

  return (
    <div className={cn("inline-flex flex-col gap-2 rounded-xl border border-line bg-paper p-4 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60">SATISFACTION: {score}/10</span>
      <div className="flex gap-1">
        {Array.from({ length: 10 }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setScore(i + 1)}
            className={cn(
              "h-8 w-8 rounded border font-mono text-xs font-bold transition-colors",
              score === i + 1 ? "border-ink bg-ink text-paper" : "border-line text-ink hover:bg-line/20"
            )}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default RatingFeedbackScale;

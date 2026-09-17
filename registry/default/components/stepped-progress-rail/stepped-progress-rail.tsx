"use client";

import { cn } from "@/lib/cn";

export interface SteppedProgressRailProps {
  currentStep?: number;
  totalSteps?: number;
  className?: string;
}

export function SteppedProgressRail({
  currentStep = 3,
  totalSteps = 5,
  className,
}: SteppedProgressRailProps) {
  return (
    <div className={cn("w-full max-w-sm rounded-xl border border-line bg-paper p-5 shadow-sm", className)}>
      <div className="flex justify-between font-mono text-xs text-ink/60 mb-3">
        <span>DEPLOY STAGES</span>
        <span className="font-bold text-ink">STEP {currentStep}/{totalSteps}</span>
      </div>

      <div className="flex gap-1.5">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-2 flex-1 rounded-full transition-all duration-300",
              i < currentStep ? "bg-ink" : "bg-line/40"
            )}
          />
        ))}
      </div>
    </div>
  );
}

export default SteppedProgressRail;

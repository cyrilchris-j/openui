"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface InteractiveStepperFlowProps {
  className?: string;
}

export function InteractiveStepperFlow({ className }: InteractiveStepperFlowProps) {
  const [step, setStep] = useState(1);
  const steps = ["Config", "Build", "Deploy", "Verify"];

  return (
    <div className={cn("inline-flex flex-col items-center gap-4 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <div className="flex items-center gap-3">
        {steps.map((label, idx) => {
          const isDone = idx < step;
          const isCurrent = idx === step;
          return (
            <div key={label} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setStep(idx)}
                className={cn(
                  "h-8 w-8 rounded-full font-mono text-xs font-bold transition-all",
                  isDone || isCurrent ? "bg-ink text-paper" : "bg-line/20 text-ink/50"
                )}
              >
                {idx + 1}
              </button>
              {idx < steps.length - 1 && <div className="h-[2px] w-6 bg-line" />}
            </div>
          );
        })}
      </div>
      <span className="font-mono text-xs text-ink/60">ACTIVE STEP: {steps[step]}</span>
    </div>
  );
}

export default InteractiveStepperFlow;

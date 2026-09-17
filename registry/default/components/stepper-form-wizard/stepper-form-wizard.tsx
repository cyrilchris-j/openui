"use client";

import { useState } from "react";
import { Check, ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/cn";

export function StepperFormWizard({ className }: { className?: string }) {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = ["Details", "Credentials", "Review"];

  return (
    <div className={cn("p-4 rounded-xl border border-line bg-paper max-w-sm w-full font-sans shadow-sm", className)}>
      <div className="flex items-center justify-between mb-4 relative">
        <div className="absolute left-4 right-4 top-4 -translate-y-1/2 h-0.5 bg-line z-0" />
        {steps.map((label, i) => {
          const isDone = i < currentStep;
          const isCurr = i === currentStep;
          return (
            <div key={label} className="relative z-10 flex flex-col items-center">
              <div
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
                  isDone
                    ? "bg-emerald-500 text-white"
                    : isCurr
                    ? "bg-accent text-white shadow-sm ring-4 ring-accent/20"
                    : "bg-surface border border-line text-ink/40"
                )}
              >
                {isDone ? <Check className="w-3.5 h-3.5" /> : i + 1}
              </div>
              <span className={cn("text-[10px] mt-1 font-mono", isCurr ? "text-ink font-semibold" : "text-ink/50")}>
                {label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-line">
        <button
          type="button"
          onClick={() => setCurrentStep((p) => Math.max(0, p - 1))}
          disabled={currentStep === 0}
          className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono border border-line bg-surface hover:bg-line/40 disabled:opacity-40 text-ink transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Back
        </button>
        <button
          type="button"
          onClick={() => setCurrentStep((p) => Math.min(steps.length - 1, p + 1))}
          disabled={currentStep === steps.length - 1}
          className="flex items-center gap-1 px-3 py-1 rounded text-xs font-mono bg-accent text-white hover:bg-accent/90 disabled:opacity-40 transition-colors"
        >
          Next
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

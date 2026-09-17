"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function FormSurveyBuilder({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [satisfaction, setSatisfaction] = React.useState<number | null>(null);

  return (
    <div className={cn("w-full max-w-xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">Developer Experience Survey</h3>
      <p className="text-neutral-500 mb-6">How seamless was your experience installing OpenUI registry components?</p>

      <div className="flex justify-between gap-2 mb-6">
        {[1, 2, 3, 4, 5].map((val) => (
          <button
            key={val}
            type="button"
            onClick={() => setSatisfaction(val)}
            className={cn(
              "h-12 flex-1 rounded-xl border font-bold font-mono text-sm transition-colors",
              satisfaction === val ? "bg-emerald-600 text-white border-emerald-600" : "border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900"
            )}
          >
            {val}
          </button>
        ))}
      </div>

      <button type="button" disabled={!satisfaction} className="w-full py-2.5 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-lg font-semibold disabled:opacity-40">
        Submit Feedback
      </button>
    </div>
  );
}

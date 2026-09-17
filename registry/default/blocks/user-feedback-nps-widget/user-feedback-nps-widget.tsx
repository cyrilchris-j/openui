"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function UserFeedbackNpsWidget({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [score, setScore] = React.useState<number | null>(null);

  return (
    <div className={cn("w-full max-w-md mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-lg text-xs", className)} {...props}>
      <h4 className="font-bold text-neutral-900 dark:text-white">How likely are you to recommend OpenUI?</h4>
      <p className="text-neutral-500 text-[11px] mt-0.5">0 = Not likely at all, 10 = Extremely likely</p>
      <div className="flex justify-between gap-1 my-4">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setScore(n)}
            className={cn("h-7 w-7 rounded font-mono font-bold transition-colors", score === n ? "bg-emerald-600 text-white" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300")}
          >
            {n}
          </button>
        ))}
      </div>
      <button type="button" disabled={score === null} className="w-full py-2 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-lg font-semibold disabled:opacity-40">
        Submit Rating
      </button>
    </div>
  );
}

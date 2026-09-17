"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function ApiTrafficRateLimiter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [rpm, setRpm] = React.useState(1200);

  return (
    <div className={cn("w-full max-w-xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-4">Edge Rate Limiting Rule</h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-neutral-500 mb-1">
            <span>Requests Per Minute (RPM)</span>
            <span className="font-bold text-neutral-900 dark:text-white">{rpm} req/min</span>
          </div>
          <input
            type="range"
            min="100"
            max="10000"
            step="100"
            value={rpm}
            onChange={(e) => setRpm(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>
        <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400">
          Enforces HTTP 429 Too Many Requests once ceiling is exceeded.
        </div>
        <button type="button" className="w-full py-2 bg-emerald-600 text-white rounded-lg font-semibold">
          Apply Edge Rule
        </button>
      </div>
    </div>
  );
}

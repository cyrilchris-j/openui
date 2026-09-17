"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function PricingCalculatorQuote({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [seats, setSeats] = React.useState(25);
  const total = seats * 29;

  return (
    <div className={cn("w-full max-w-xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-4">Enterprise Quote Estimator</h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-neutral-500 mb-1">
            <span>Team Members</span>
            <span className="font-mono font-bold text-neutral-900 dark:text-white">{seats} seats</span>
          </div>
          <input
            type="range"
            min="5"
            max="100"
            value={seats}
            onChange={(e) => setSeats(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>
        <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 flex justify-between items-center font-mono">
          <span className="font-bold text-neutral-900 dark:text-white">Estimated Annual Total:</span>
          <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">${total * 12}/yr</span>
        </div>
      </div>
    </div>
  );
}

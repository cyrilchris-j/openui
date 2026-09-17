"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function InteractivePricingSlider({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [seats, setSeats] = React.useState(15);

  const pricePerSeat = seats > 50 ? 12 : seats > 20 ? 15 : 19;
  const total = seats * pricePerSeat;

  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-xl mx-auto text-center", className)} {...props}>
      <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold">
        Seat Volume
      </span>
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-1">
        Pay as your engineering squad grows
      </h2>

      <div className="mt-8 p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm">
        <div className="flex justify-between items-baseline">
          <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Active Team Seats</span>
          <span className="text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-100">{seats} seats</span>
        </div>

        <input
          type="range"
          min="1"
          max="100"
          value={seats}
          onChange={(e) => setSeats(Number(e.target.value))}
          className="w-full mt-4 accent-emerald-500 cursor-pointer"
        />

        <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800 flex items-baseline justify-between">
          <div className="text-left">
            <div className="text-xs text-neutral-400">Total Billed Monthly</div>
            <div className="text-3xl font-extrabold text-neutral-900 dark:text-neutral-100">${total}/mo</div>
          </div>
          <button
            type="button"
            className="px-4 py-2 rounded-lg bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 text-xs font-semibold"
          >
            Start Free Trial
          </button>
        </div>
      </div>
    </section>
  );
}

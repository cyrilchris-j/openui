"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function CalendarEventScheduler({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [slot, setSlot] = React.useState<string | null>("10:00 AM");

  const slots = ["09:00 AM", "10:00 AM", "11:30 AM", "02:00 PM", "03:30 PM"];

  return (
    <div className={cn("w-full max-w-2xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-4">Architecture Review Session</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <div className="font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Available Slots (Today)</div>
          <div className="space-y-2">
            {slots.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSlot(s)}
                className={cn(
                  "w-full py-2 px-3 rounded-lg border font-mono transition-colors text-left",
                  slot === s ? "border-emerald-600 bg-emerald-50/30 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 font-bold" : "border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 flex flex-col justify-between">
          <div>
            <div className="font-bold text-neutral-900 dark:text-white">Selected Meeting</div>
            <div className="text-neutral-500 mt-1">30 min video consultation with principal engineer.</div>
            <div className="mt-4 font-mono text-emerald-600 dark:text-emerald-400 font-bold">Time: {slot || "None"}</div>
          </div>
          <button type="button" className="w-full py-2 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-lg font-semibold mt-4">
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}

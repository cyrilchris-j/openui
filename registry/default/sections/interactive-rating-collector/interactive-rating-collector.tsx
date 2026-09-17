"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function InteractiveRatingCollector({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [rating, setRating] = React.useState(0);
  const [done, setDone] = React.useState(false);

  return (
    <section className={cn("w-full py-16 px-4 max-w-md mx-auto text-center", className)} {...props}>
      <div className="border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 bg-white dark:bg-neutral-950">
        <h4 className="text-base font-bold text-neutral-900 dark:text-white">How was your experience?</h4>
        {!done ? (
          <div className="mt-4 flex justify-center gap-2 text-2xl cursor-pointer">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => {
                  setRating(star);
                  setDone(true);
                }}
                className={star <= rating ? "text-amber-400" : "text-neutral-300 dark:text-neutral-700"}
              >
                ★
              </button>
            ))}
          </div>
        ) : (
          <div className="text-xs text-emerald-500 font-bold mt-4">Thank you for your rating!</div>
        )}
      </div>
    </section>
  );
}

"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface RatingBreakdown {
  stars: number;
  percentage: number;
}

export interface CustomerFeedbackSentimentProps extends React.HTMLAttributes<HTMLElement> {
  score?: number;
  totalReviews?: number;
  breakdown?: RatingBreakdown[];
}

const DEFAULT_BREAKDOWN: RatingBreakdown[] = [
  { stars: 5, percentage: 88 },
  { stars: 4, percentage: 9 },
  { stars: 3, percentage: 2 },
  { stars: 2, percentage: 1 },
  { stars: 1, percentage: 0 },
];

export function CustomerFeedbackSentiment({
  score = 4.9,
  totalReviews = 1420,
  breakdown = DEFAULT_BREAKDOWN,
  className,
  ...props
}: CustomerFeedbackSentimentProps) {
  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-4xl mx-auto", className)} {...props}>
      <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 text-center md:text-left border-b md:border-b-0 md:border-r border-neutral-200 dark:border-neutral-800 pb-6 md:pb-0 md:pr-8">
            <div className="text-5xl font-extrabold text-neutral-900 dark:text-neutral-100">
              {score}
            </div>
            <div className="text-amber-400 text-lg tracking-widest mt-1">★★★★★</div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
              Based on {totalReviews.toLocaleString()} verified developer ratings
            </div>
          </div>

          <div className="md:col-span-7 space-y-2">
            {breakdown.map((row) => (
              <div key={row.stars} className="flex items-center gap-3 text-xs font-mono">
                <span className="w-12 text-neutral-500">{row.stars} Stars</span>
                <div className="flex-1 h-2 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full"
                    style={{ width: `${row.percentage}%` }}
                  />
                </div>
                <span className="w-10 text-right text-neutral-400">{row.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

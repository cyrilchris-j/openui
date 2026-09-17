"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function FeedbackSentimentWordcloud({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const words = [
    { text: "fast", size: "text-2xl font-bold text-emerald-600" },
    { text: "zero-dependencies", size: "text-xl font-bold text-neutral-900 dark:text-white" },
    { text: "clean", size: "text-lg text-emerald-500" },
    { text: "type-safe", size: "text-xl font-bold text-neutral-800 dark:text-neutral-200" },
    { text: "flexible", size: "text-base text-neutral-500" },
  ];

  return (
    <div className={cn("w-full max-w-lg mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl text-center shadow-sm", className)} {...props}>
      <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-4">Customer Sentiment Summary</h3>
      <div className="flex flex-wrap items-center justify-center gap-4 py-4">
        {words.map((w) => (
          <span key={w.text} className={w.size}>
            {w.text}
          </span>
        ))}
      </div>
    </div>
  );
}

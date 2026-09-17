"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function CustomerQuoteMarquee({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const quotes = [
    "“The single cleanest registry architecture I have ever seen.”",
    "“We dropped 300kb from our initial bundle in one afternoon.”",
    "“Design DNA tokens transformed how we ship design reviews.”",
  ];

  return (
    <section className={cn("w-full py-8 border-y border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden", className)} {...props}>
      <div className="flex justify-around gap-8 text-xs font-serif italic text-neutral-700 dark:text-neutral-300 max-w-5xl mx-auto px-4">
        {quotes.map((q, i) => (
          <span key={i} className="truncate">{q}</span>
        ))}
      </div>
    </section>
  );
}

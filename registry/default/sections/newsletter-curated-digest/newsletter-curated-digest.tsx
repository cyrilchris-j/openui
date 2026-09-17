"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function NewsletterCuratedDigest({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("w-full py-16 px-4 max-w-xl mx-auto text-center", className)} {...props}>
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">The Design Engineer Digest</h2>
      <p className="text-xs text-neutral-500 mt-2">Join 12,000+ UI architects receiving our bi-weekly deep dive.</p>
      <div className="mt-6 flex gap-2 max-w-md mx-auto">
        <input
          type="email"
          placeholder="your.email@work.com"
          className="flex-1 px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
        />
        <button type="button" className="px-4 py-2 rounded-lg text-xs font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
          Subscribe
        </button>
      </div>
    </section>
  );
}

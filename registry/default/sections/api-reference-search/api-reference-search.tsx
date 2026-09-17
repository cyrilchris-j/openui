"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function ApiReferenceSearch({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [query, setQuery] = React.useState("");

  return (
    <section className={cn("w-full py-12 px-4 max-w-2xl mx-auto font-mono text-xs", className)} {...props}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search API endpoints (e.g. /r/components/button)..."
        className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none"
      />
    </section>
  );
}

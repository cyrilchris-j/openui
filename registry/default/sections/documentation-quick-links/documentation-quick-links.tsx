"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function DocumentationQuickLinks({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const links = ["Getting Started", "Design DNA", "CLI Reference", "Schema Spec", "FAQ"];

  return (
    <section className={cn("w-full py-8 px-4 max-w-4xl mx-auto", className)} {...props}>
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
        {links.map((l) => (
          <a
            key={l}
            href="#doc"
            className="px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 font-medium text-neutral-800 dark:text-neutral-200 hover:border-emerald-500 transition-colors"
          >
            {l} →
          </a>
        ))}
      </div>
    </section>
  );
}

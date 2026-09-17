"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface HeroMediaShowcaseProps extends React.HTMLAttributes<HTMLElement> {
  badge?: string;
  headline?: string;
  subheadline?: string;
  primaryCta?: string;
  secondaryCta?: string;
}

export function HeroMediaShowcase({
  badge = "OpenUI Registry v2.4 Now Live",
  headline = "The interface standard for high-assurance web applications",
  subheadline = "800 verified, zero-dependency accessible components, layouts, sections, and blocks designed to drop straight into your production Next.js codebase.",
  primaryCta = "Browse 800 Components →",
  secondaryCta = "View CLI Docs",
  className,
  ...props
}: HeroMediaShowcaseProps) {
  return (
    <section className={cn("w-full py-20 px-4 md:px-8 max-w-6xl mx-auto text-center", className)} {...props}>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 mb-6">
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        <span>{badge}</span>
      </div>

      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100 max-w-4xl mx-auto leading-tight">
        {headline}
      </h1>

      <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mt-6 leading-relaxed">
        {subheadline}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
        <button
          type="button"
          className="px-6 py-3 rounded-xl text-sm font-semibold bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 transition-colors shadow-sm"
        >
          {primaryCta}
        </button>
        <button
          type="button"
          className="px-6 py-3 rounded-xl text-sm font-semibold border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          {secondaryCta}
        </button>
      </div>

      {/* Browser mockup stage */}
      <div className="mt-14 max-w-5xl mx-auto rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-2 shadow-2xl">
        <div className="h-8 rounded-t-xl bg-neutral-200/80 dark:bg-neutral-900 flex items-center px-4 gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <div className="mx-auto text-[11px] font-mono text-neutral-400">
            https://openui.dev/catalog/sections
          </div>
        </div>
        <div className="h-64 sm:h-80 w-full rounded-b-lg bg-white dark:bg-neutral-900/50 flex items-center justify-center text-neutral-400 font-mono text-xs">
          [Interactive Component Canvas: 800 Live Primitives Ready]
        </div>
      </div>
    </section>
  );
}

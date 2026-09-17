"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function DeveloperSandboxPreview({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [view, setView] = React.useState<"preview" | "code">("preview");

  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-5xl mx-auto", className)} {...props}>
      <div className="border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden bg-white dark:bg-neutral-950 shadow-sm">
        <div className="flex items-center justify-between p-3 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
          <span className="text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300">
            SplitHeadlineHero.tsx
          </span>
          <div className="flex items-center gap-1 font-mono text-xs">
            <button
              type="button"
              onClick={() => setView("preview")}
              className={cn(
                "px-3 py-1 rounded text-xs transition-colors",
                view === "preview" ? "bg-white dark:bg-neutral-800 font-bold shadow-xs" : "text-neutral-400"
              )}
            >
              Live Preview
            </button>
            <button
              type="button"
              onClick={() => setView("code")}
              className={cn(
                "px-3 py-1 rounded text-xs transition-colors",
                view === "code" ? "bg-white dark:bg-neutral-800 font-bold shadow-xs" : "text-neutral-400"
              )}
            >
              React Code
            </button>
          </div>
        </div>

        <div className="p-6">
          {view === "preview" ? (
            <div className="h-48 flex flex-col items-center justify-center text-center bg-neutral-100 dark:bg-neutral-900/60 rounded-xl p-4">
              <h4 className="text-lg font-bold text-neutral-900 dark:text-white">Next Generation Interfaces</h4>
              <p className="text-xs text-neutral-500 mt-1 max-w-md">Interactive preview render executing in client sandbox</p>
              <button type="button" className="mt-4 px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold">
                Action Trigger
              </button>
            </div>
          ) : (
            <pre className="text-xs font-mono overflow-x-auto p-4 bg-neutral-950 text-neutral-100 rounded-xl">
              {`export function SplitHeadlineHero({ title, cta }) {
  return (
    <section className="py-12 flex items-center justify-between">
      <h1>{title}</h1>
      <button>{cta}</button>
    </section>
  );
}`}
            </pre>
          )}
        </div>
      </div>
    </section>
  );
}

"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function HeroSplitTerminal({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("w-full py-20 px-4 md:px-8 max-w-6xl mx-auto", className)} {...props}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6">
          <span className="text-xs font-mono uppercase text-emerald-500 font-bold">OpenUI v2.4</span>
          <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white mt-2 leading-tight">
            Interfaces should have a fingerprint.
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-4 leading-relaxed">
            The decentralized design system registry. 800 certified open-source primitives installable straight to your src/ with deterministic schemas.
          </p>
          <div className="mt-6 flex gap-3">
            <button type="button" className="px-5 py-2.5 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs font-bold">
              Explore 800 Items
            </button>
          </div>
        </div>

        <div className="lg:col-span-6 bg-neutral-950 text-neutral-100 p-5 rounded-xl border border-neutral-800 font-mono text-xs">
          <div className="text-neutral-500 mb-2"># Install your first verified primitive</div>
          <div className="text-emerald-400 font-bold">$ pnpm dlx openui@latest add hero-split-terminal</div>
          <div className="text-neutral-400 mt-2">✓ Verified 0 runtime dependencies</div>
          <div className="text-neutral-400">✓ Materialized in src/components/sections/</div>
        </div>
      </div>
    </section>
  );
}

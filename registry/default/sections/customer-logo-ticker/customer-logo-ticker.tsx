"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

const BRANDS = ["ACME CLOUD", "VORTEX LABS", "SYNAPSE AI", "HYPERSCALE", "NEXUS SYSTEMS", "AERO PROTOCOL"];

export function CustomerLogoTicker({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("w-full py-8 border-y border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden", className)} {...props}>
      <div className="text-center text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-4 font-semibold">
        Powering interface infrastructure at
      </div>
      <div className="flex items-center justify-around gap-8 max-w-5xl mx-auto px-4 text-xs font-mono font-bold text-neutral-400 dark:text-neutral-600">
        {BRANDS.map((b) => (
          <span key={b} className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors cursor-default">
            {b}
          </span>
        ))}
      </div>
    </section>
  );
}

"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function CtaClosingBillboard({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("w-full py-20 px-4 md:px-8 bg-neutral-950 text-white text-center border-t-2 border-neutral-800", className)} {...props}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black tracking-tight">
          BUILD WITHOUT COMPROMISE.
        </h2>
        <p className="text-sm md:text-base text-neutral-400 mt-4 max-w-xl mx-auto">
          Start integrating 800 certified zero-dependency accessible components into your production Next.js apps today.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            className="px-6 py-3 rounded-none bg-white text-neutral-950 font-mono font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors"
          >
            Explore Catalog (800) →
          </button>
        </div>
      </div>
    </section>
  );
}

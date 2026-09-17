"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function InteractiveColorTokenPreviewer({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [activeToken, setActiveToken] = React.useState("emerald");

  return (
    <section className={cn("w-full py-16 px-4 max-w-3xl mx-auto text-center font-mono text-xs", className)} {...props}>
      <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 mb-4">Color Strategy Tokens</h3>
      <div className="flex justify-center gap-3 mb-6">
        {["emerald", "indigo", "rose", "amber"].map((token) => (
          <button
            key={token}
            type="button"
            onClick={() => setActiveToken(token)}
            className={cn("px-3 py-1 rounded border", activeToken === token ? "border-black dark:border-white font-bold" : "border-neutral-300 dark:border-neutral-700")}
          >
            {token}
          </button>
        ))}
      </div>
      <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
        Selected active accent: <span className="font-bold">{activeToken}</span>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ElasticDrawerCurtainProps {
  className?: string;
}

export function ElasticDrawerCurtain({ className }: ElasticDrawerCurtainProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative h-72 w-full max-w-md overflow-hidden rounded-xl border border-line bg-paper", className)}>
      <div className="flex h-full items-center justify-center">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded border border-line bg-ink px-4 py-2 font-mono text-xs text-paper"
        >
          Pull Drawer
        </button>
      </div>

      <div
        className={cn(
          "absolute inset-y-0 left-0 w-64 border-r border-line bg-paper p-6 shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between pb-4 border-b border-line">
          <span className="font-display font-bold text-ink">Navigation</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="font-mono text-xs text-ink/60 hover:text-ink"
          >
            Close
          </button>
        </div>
        <ul className="mt-4 space-y-2 font-mono text-xs text-ink/70">
          <li className="hover:text-ink cursor-pointer">/ Overview</li>
          <li className="hover:text-ink cursor-pointer">/ Design Tokens</li>
          <li className="hover:text-ink cursor-pointer">/ API Reference</li>
        </ul>
      </div>
    </div>
  );
}

export default ElasticDrawerCurtain;

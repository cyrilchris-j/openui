"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SegmentedViewSwitcherProps {
  className?: string;
}

export function SegmentedViewSwitcher({ className }: SegmentedViewSwitcherProps) {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className={cn("inline-flex rounded-lg border border-line bg-paper p-1 shadow-sm font-mono text-xs", className)}>
      <button
        type="button"
        onClick={() => setView("grid")}
        className={cn("px-3 py-1 rounded font-bold transition-all", view === "grid" ? "bg-ink text-paper" : "text-ink/60")}
      >
        Grid
      </button>
      <button
        type="button"
        onClick={() => setView("list")}
        className={cn("px-3 py-1 rounded font-bold transition-all", view === "list" ? "bg-ink text-paper" : "text-ink/60")}
      >
        List
      </button>
    </div>
  );
}

export default SegmentedViewSwitcher;

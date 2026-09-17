"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface MorphSearchBarProps {
  className?: string;
}

export function MorphSearchBar({ className }: MorphSearchBarProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("flex items-center", className)}>
      <div
        className={cn(
          "flex items-center overflow-hidden rounded-full border border-line bg-paper shadow-sm transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          open ? "w-64 px-3" : "w-10 px-2.5"
        )}
      >
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="text-ink/60 hover:text-ink font-mono text-xs"
        >
          🔍
        </button>
        {open && (
          <input
            type="text"
            placeholder="Search catalog..."
            autoFocus
            className="ml-2 w-full bg-transparent font-mono text-xs text-ink outline-none"
          />
        )}
      </div>
    </div>
  );
}

export default MorphSearchBar;

"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface PopoverInfoTooltipProps {
  className?: string;
}

export function PopoverInfoTooltip({ className }: PopoverInfoTooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative inline-block", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-7 w-7 items-center justify-center rounded-full border border-line bg-paper font-mono text-xs font-bold text-ink hover:bg-line/20 shadow-sm"
      >
        ?
      </button>

      {open && (
        <div className="absolute bottom-full mb-2 -left-20 w-48 rounded-xl border border-line bg-ink text-paper p-3 shadow-xl font-mono text-[11px] leading-relaxed z-10">
          Cryptographic signing confirms registry identity integrity.
        </div>
      )}
    </div>
  );
}

export default PopoverInfoTooltip;

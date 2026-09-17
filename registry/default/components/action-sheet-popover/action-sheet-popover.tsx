"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ActionSheetPopoverProps {
  className?: string;
}

export function ActionSheetPopover({ className }: ActionSheetPopoverProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative inline-block font-mono text-xs", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="rounded-lg border border-line bg-paper px-4 py-2 font-bold text-ink shadow-sm hover:bg-line/20"
      >
        Actions ▾
      </button>

      {open && (
        <div className="absolute top-full mt-1.5 w-44 rounded-xl border border-line bg-paper p-1.5 shadow-xl z-20 space-y-1">
          <div className="px-3 py-1.5 hover:bg-line/20 rounded cursor-pointer text-ink">Inspect Item</div>
          <div className="px-3 py-1.5 hover:bg-line/20 rounded cursor-pointer text-ink">Export Bundle</div>
          <div className="border-t border-line my-1" />
          <div className="px-3 py-1.5 hover:bg-red-500/10 text-red-600 font-bold rounded cursor-pointer">
            Archive Item
          </div>
        </div>
      )}
    </div>
  );
}

export default ActionSheetPopover;

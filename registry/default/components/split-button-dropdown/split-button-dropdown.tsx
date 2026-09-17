"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SplitButtonDropdownProps {
  className?: string;
}

export function SplitButtonDropdown({ className }: SplitButtonDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative inline-flex rounded-lg border border-line bg-paper shadow-sm font-mono text-xs", className)}>
      <button
        type="button"
        className="px-4 py-2 font-bold text-ink hover:bg-line/20 rounded-l-lg"
      >
        Deploy Branch
      </button>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="border-l border-line px-2 hover:bg-line/20 rounded-r-lg"
      >
        ▾
      </button>

      {open && (
        <div className="absolute top-full mt-1 right-0 w-44 rounded-xl border border-line bg-paper p-1.5 shadow-xl space-y-1 z-10">
          <div className="px-3 py-1.5 hover:bg-line/20 rounded cursor-pointer">Deploy to Staging</div>
          <div className="px-3 py-1.5 hover:bg-line/20 rounded cursor-pointer">Deploy with Rebuild</div>
        </div>
      )}
    </div>
  );
}

export default SplitButtonDropdown;

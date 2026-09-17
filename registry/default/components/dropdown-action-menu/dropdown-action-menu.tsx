"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface DropdownActionMenuProps {
  className?: string;
}

export function DropdownActionMenu({ className }: DropdownActionMenuProps) {
  const [open, setOpen] = useState(true);

  return (
    <div className={cn("relative inline-block text-left", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="rounded-lg border border-line bg-paper px-4 py-2 font-mono text-xs font-bold text-ink shadow-sm hover:bg-line/20"
      >
        Options ▾
      </button>

      {open && (
        <div className="mt-2 w-48 rounded-xl border border-line bg-paper p-1.5 shadow-xl font-mono text-xs divide-y divide-line">
          <div className="py-1">
            <div className="px-3 py-1.5 hover:bg-line/20 rounded cursor-pointer text-ink">Edit Spec</div>
            <div className="px-3 py-1.5 hover:bg-line/20 rounded cursor-pointer text-ink">Duplicate</div>
          </div>
          <div className="py-1">
            <div className="px-3 py-1.5 hover:bg-red-500/10 text-red-600 rounded cursor-pointer font-bold">
              Delete Resource
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DropdownActionMenu;

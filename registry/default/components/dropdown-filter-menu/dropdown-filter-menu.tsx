"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface DropdownFilterMenuProps {
  className?: string;
}

export function DropdownFilterMenu({ className }: DropdownFilterMenuProps) {
  const [selected, setSelected] = useState("All Categories");
  const [open, setOpen] = useState(false);
  const options = ["All Categories", "Components", "Motion", "Interactions"];

  return (
    <div className={cn("relative inline-block font-mono text-xs", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="rounded-lg border border-line bg-paper px-4 py-2 font-bold text-ink shadow-sm"
      >
        {selected} ▾
      </button>

      {open && (
        <div className="absolute top-full mt-1.5 w-44 rounded-xl border border-line bg-paper p-1.5 shadow-xl z-20 space-y-1">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                setSelected(opt);
                setOpen(false);
              }}
              className="flex justify-between px-3 py-1.5 rounded hover:bg-line/20 cursor-pointer"
            >
              <span>{opt}</span>
              {selected === opt && <span>✓</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownFilterMenu;

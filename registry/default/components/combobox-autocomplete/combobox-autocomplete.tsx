"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ComboboxAutocompleteProps {
  className?: string;
}

export function ComboboxAutocomplete({ className }: ComboboxAutocompleteProps) {
  const [val, setVal] = useState("");
  const [open, setOpen] = useState(false);
  const options = ["components", "text", "motion", "interactions", "backgrounds", "layouts"];

  const filtered = options.filter((o) => o.toLowerCase().includes(val.toLowerCase()));

  return (
    <div className={cn("relative w-full max-w-xs font-mono text-xs", className)}>
      <input
        type="text"
        value={val}
        onChange={(e) => {
          setVal(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder="Select category..."
        className="w-full rounded-xl border border-line bg-paper p-2.5 outline-none focus:border-ink shadow-sm"
      />

      {open && filtered.length > 0 && (
        <div className="absolute top-full mt-1.5 inset-x-0 rounded-xl border border-line bg-paper p-1.5 shadow-xl z-20 space-y-1">
          {filtered.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                setVal(opt);
                setOpen(false);
              }}
              className="px-3 py-1.5 rounded hover:bg-line/20 cursor-pointer text-ink"
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ComboboxAutocomplete;

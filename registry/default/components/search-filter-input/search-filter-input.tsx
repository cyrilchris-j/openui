"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SearchFilterInputProps {
  placeholder?: string;
  className?: string;
}

export function SearchFilterInput({
  placeholder = "Filter resources...",
  className,
}: SearchFilterInputProps) {
  const [val, setVal] = useState("");

  return (
    <div className={cn("relative flex items-center w-full max-w-sm", className)}>
      <span className="absolute left-3 text-ink/40 font-mono text-xs">🔍</span>
      <input
        type="text"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-line bg-paper py-2.5 pl-9 pr-12 font-mono text-xs text-ink placeholder:text-ink/40 focus:border-ink focus:outline-none shadow-sm"
      />
      {val ? (
        <button
          type="button"
          onClick={() => setVal("")}
          className="absolute right-3 font-mono text-xs text-ink/50 hover:text-ink"
        >
          ✕
        </button>
      ) : (
        <span className="absolute right-3 rounded border border-line px-1.5 py-0.5 font-mono text-[9px] text-ink/40">
          /
        </span>
      )}
    </div>
  );
}

export default SearchFilterInput;

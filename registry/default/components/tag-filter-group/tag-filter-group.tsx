"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface TagFilterGroupProps {
  className?: string;
}

export function TagFilterGroup({ className }: TagFilterGroupProps) {
  const [selected, setSelected] = useState<string>("All");
  const tags = ["All", "Core", "Ecosystem", "Plugins"];

  return (
    <div className={cn("inline-flex gap-2 font-mono text-xs", className)}>
      {tags.map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => setSelected(t)}
          className={cn(
            "rounded-full border px-3 py-1 font-semibold transition-all",
            selected === t ? "border-ink bg-ink text-paper" : "border-line bg-paper text-ink hover:border-ink"
          )}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

export default TagFilterGroup;

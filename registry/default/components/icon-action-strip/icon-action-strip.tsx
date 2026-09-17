"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface IconActionStripProps {
  className?: string;
}

export function IconActionStrip({ className }: IconActionStripProps) {
  const [active, setActive] = useState(0);
  const icons = ["⌂", "⌘", "⚙", "★"];

  return (
    <div className={cn("inline-flex flex-col gap-2 rounded-2xl border border-line bg-paper p-2 shadow-md", className)}>
      {icons.map((ic, i) => (
        <button
          key={i}
          type="button"
          onClick={() => setActive(i)}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl font-mono text-sm transition-all",
            active === i ? "bg-ink text-paper font-bold shadow" : "text-ink/60 hover:bg-line/20"
          )}
        >
          {ic}
        </button>
      ))}
    </div>
  );
}

export default IconActionStrip;

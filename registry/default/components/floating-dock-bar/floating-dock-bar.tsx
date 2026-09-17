"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface FloatingDockBarProps {
  className?: string;
}

export function FloatingDockBar({ className }: FloatingDockBarProps) {
  const [active, setActive] = useState(0);
  const items = ["Home", "Components", "Docs", "Settings"];

  return (
    <div className={cn("inline-flex items-center gap-1.5 rounded-full border border-line bg-paper/90 p-2 shadow-xl backdrop-blur font-mono text-xs", className)}>
      {items.map((item, idx) => (
        <button
          key={item}
          type="button"
          onClick={() => setActive(idx)}
          className={cn(
            "rounded-full px-3.5 py-1.5 transition-all font-semibold",
            active === idx ? "bg-ink text-paper shadow-sm" : "text-ink/60 hover:text-ink"
          )}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default FloatingDockBar;

"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface KeyboardTabNavigatorProps {
  className?: string;
}

export function KeyboardTabNavigator({ className }: KeyboardTabNavigatorProps) {
  const [focused, setFocused] = useState(0);
  const items = ["First Tab", "Second Tab", "Third Tab"];

  return (
    <div className={cn("inline-flex flex-col gap-3 rounded-xl border border-line bg-paper p-5 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60">KEYBOARD ACCESSIBILITY FOCUS</span>

      <div className="flex gap-2">
        {items.map((item, idx) => (
          <button
            key={item}
            type="button"
            onFocus={() => setFocused(idx)}
            className={cn(
              "rounded-lg border px-3 py-1.5 font-mono text-xs transition-all",
              focused === idx ? "border-ink bg-ink text-paper shadow-sm" : "border-line bg-paper text-ink"
            )}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default KeyboardTabNavigator;

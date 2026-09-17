"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface BlindDebossToggleProps {
  /** Initial state. */
  defaultOn?: boolean;
  onChange?: (on: boolean) => void;
  className?: string;
}

export function BlindDebossToggle({ defaultOn = false, onChange, className }: BlindDebossToggleProps) {
  const [on, setOn] = useState(defaultOn);

  const toggle = () => {
    const next = !on;
    setOn(next);
    onChange?.(next);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={toggle}
      className={cn(
        "inline-flex items-center rounded-xl px-6 py-3 font-display text-lg transition-shadow duration-150",
        className,
      )}
      style={
        on
          ? {
              background: "#e7ddc9",
              color: "#6b5d45",
              boxShadow: "inset 3px 3px 6px rgba(0,0,0,0.25), inset -2px -2px 4px rgba(255,255,255,0.7)",
            }
          : {
              background: "#f0e8d6",
              color: "#8a7a5c",
              boxShadow: "3px 3px 6px rgba(0,0,0,0.18), -2px -2px 4px rgba(255,255,255,0.8)",
            }
      }
    >
      {on ? "ON" : "OFF"}
    </button>
  );
}

export default BlindDebossToggle;

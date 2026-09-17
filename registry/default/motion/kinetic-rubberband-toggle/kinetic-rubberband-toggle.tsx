"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface KineticRubberbandToggleProps {
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export function KineticRubberbandToggle({
  defaultChecked = false,
  onChange,
  className,
}: KineticRubberbandToggleProps) {
  const [checked, setChecked] = useState(defaultChecked);
  const [animating, setAnimating] = useState(false);

  const toggle = () => {
    setAnimating(true);
    const next = !checked;
    setChecked(next);
    onChange?.(next);
    setTimeout(() => setAnimating(false), 380);
  };

  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={toggle}
        className={cn(
          "relative h-8 w-16 rounded-pill border p-1 transition-colors duration-300",
          checked ? "border-ink bg-ink" : "border-line bg-surface",
        )}
      >
        <span
          className={cn(
            "block h-6 rounded-pill transition-all duration-300 ease-spring",
            checked ? "bg-paper" : "bg-ink",
            animating ? "w-10" : "w-6",
            checked ? "translate-x-8" : "translate-x-0",
          )}
        />
      </button>
      <span className="font-mono text-xs text-graphite uppercase">
        {checked ? "Online" : "Standby"}
      </span>
    </div>
  );
}

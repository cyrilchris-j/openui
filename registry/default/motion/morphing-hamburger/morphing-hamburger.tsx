"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface MorphingHamburgerProps {
  open?: boolean;
  onToggle?: (open: boolean) => void;
  className?: string;
}

export function MorphingHamburger({ open: controlled, onToggle, className }: MorphingHamburgerProps) {
  const [uncontrolled, setUncontrolled] = useState(false);
  const open = controlled ?? uncontrolled;
  const toggle = () => {
    const next = !open;
    setUncontrolled(next);
    onToggle?.(next);
  };

  const bar = "absolute left-0 h-0.5 w-6 rounded-full bg-ink transition-all duration-300";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-expanded={open}
      aria-label={open ? "Close menu" : "Open menu"}
      className={cn("relative h-8 w-8 cursor-pointer border-0 bg-transparent p-0", className)}
    >
      <span
        aria-hidden
        className={bar}
        style={{ top: open ? "calc(50% - 1px)" : "8px", transform: open ? "rotate(45deg)" : "rotate(0)" }}
      />
      <span
        aria-hidden
        className={bar}
        style={{
          top: "calc(50% - 1px)",
          opacity: open ? 0 : 1,
          transform: open ? "scaleX(0.2)" : "scaleX(1)",
        }}
      />
      <span
        aria-hidden
        className={bar}
        style={{ bottom: open ? "calc(50% - 1px)" : "8px", transform: open ? "rotate(-45deg)" : "rotate(0)" }}
      />
    </button>
  );
}

export default MorphingHamburger;

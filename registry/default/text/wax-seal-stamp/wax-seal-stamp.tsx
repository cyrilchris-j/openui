"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface WaxSealStampProps {
  /** One or two initials pressed into the wax. */
  initials: string;
  /** Wax colour. */
  wax?: string;
  className?: string;
}

export function WaxSealStamp({ initials, wax = "#a03c2e", className }: WaxSealStampProps) {
  const [stamps, setStamps] = useState(0);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  return (
    <button
      type="button"
      onClick={() => setStamps((value) => value + 1)}
      className={cn(
        "flex h-28 w-28 cursor-pointer items-center justify-center rounded-[46%_54%_52%_48%/54%_46%_52%_48%] border-0",
        className,
      )}
      aria-label={`Seal stamped with ${initials}`}
      style={{
        background: `radial-gradient(circle at 32% 30%, color-mix(in oklab, ${wax}, white 24%), ${wax} 58%, color-mix(in oklab, ${wax}, black 30%))`,
        boxShadow: "0 4px 10px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.25), inset 0 -3px 6px rgba(0,0,0,0.3)",
      }}
    >
      <span
        key={stamps}
        aria-hidden
        className="font-display text-2xl"
        style={{
          color: "color-mix(in oklab, black, transparent 55%)",
          textShadow: "0 1px 1px rgba(255,255,255,0.35), 0 -1px 1px rgba(0,0,0,0.4)",
          letterSpacing: "0.05em",
          animation: stamps > 0 && !reduced ? "openui-press 380ms cubic-bezier(0.2, 0, 0, 1)" : undefined,
        }}
      >
        {initials}
      </span>
      <style>{`@keyframes openui-press { 0% { transform: scale(1) } 35% { transform: scale(0.86) } 70% { transform: scale(1.06) } 100% { transform: scale(1) } } @media (prefers-reduced-motion: reduce) { span { animation: none !important } }`}</style>
    </button>
  );
}

export default WaxSealStamp;

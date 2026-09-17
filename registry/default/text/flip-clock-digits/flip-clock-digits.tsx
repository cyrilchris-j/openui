"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

function FlipDigit({ digit }: { digit: string }) {
  const [current, setCurrent] = React.useState(digit);
  const [flipping, setFlipping] = React.useState(false);

  React.useEffect(() => {
    if (digit === current) return;
    setFlipping(true);
    const timeout = window.setTimeout(() => {
      setCurrent(digit);
      setFlipping(false);
    }, 320);
    return () => window.clearTimeout(timeout);
  }, [digit, current]);

  return (
    <span
      className="relative inline-block h-[1.6em] w-[1ch] overflow-hidden align-bottom font-mono text-ink"
      style={{ perspective: "220px" }}
      aria-hidden
    >
      <span
        className="absolute inset-0 flex items-start justify-center"
        style={{
          transformOrigin: "50% 100%",
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          transition: "transform 320ms cubic-bezier(0.4, 0, 0.2, 1)",
          transform: flipping ? "rotateX(-90deg)" : "rotateX(0)",
        }}
      >
        {current}
      </span>
      <span
        className="absolute inset-0 flex items-end justify-center"
        style={{
          transformOrigin: "50% 0%",
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          transition: "transform 320ms cubic-bezier(0.4, 0, 0.2, 1)",
          transform: flipping ? "rotateX(0)" : "rotateX(90deg)",
        }}
      >
        {digit}
      </span>
      <span className="absolute left-0 right-0 top-1/2 h-px bg-ink/20" aria-hidden />
    </span>
  );
}

export interface FlipClockDigitsProps {
  /** Numeric value; each digit flips independently. */
  value: number;
  /** Minimum digit count, zero-padded. */
  digits?: number;
  className?: string;
}

export function FlipClockDigits({ value, digits = 2, className }: FlipClockDigitsProps) {
  const padded = String(Math.max(0, Math.floor(value))).padStart(digits, "0");
  return (
    <span className={cn("inline-flex gap-0.5", className)} role="status" aria-label={String(value)}>
      {[...padded].map((digit, index) => (
        <FlipDigit key={`${index}-${digit}`} digit={digit} />
      ))}
    </span>
  );
}

export default FlipClockDigits;

"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/cn";

export interface CounterTypographyProps {
  value: number;
  /** Animation duration in milliseconds. */
  duration?: number;
  /** Decimal places to render. */
  decimals?: number;
  /** Locale for digit grouping. */
  locale?: string;
  /** Optional suffix rendered after the number (%, k, …). */
  suffix?: string;
  className?: string;
}

export function CounterTypography({
  value,
  duration = 1400,
  decimals = 0,
  locale = "en-US",
  suffix,
  className,
}: CounterTypographyProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ once: true });
  const [display, setDisplay] = useState(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }

    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      // ease-out cubic: fast start, soft landing
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) frame.current = requestAnimationFrame(step);
    };
    frame.current = requestAnimationFrame(step);
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [inView, value, duration]);

  const formatted = display.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span
      ref={ref}
      className={cn("tabular-nums", className)}
      // Reserve the final width so the line does not shift while counting.
      style={{ minWidth: `${value.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).length}ch`, display: "inline-block" }}
    >
      {formatted}
      {suffix ? <span aria-hidden>{suffix}</span> : null}
    </span>
  );
}

export default CounterTypography;

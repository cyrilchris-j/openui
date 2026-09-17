"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface TallyGlyphCounterProps {
  value: number;
  /** Whether to show the numeral beside the marks. */
  numeral?: boolean;
  className?: string;
}

function TallyGroup({ index, filled }: { index: number; filled: boolean }) {
  return (
    <svg
      aria-hidden
      width="26"
      height="30"
      viewBox="0 0 26 30"
      className={cn("inline-block", !filled && "opacity-25")}
    >
      {[4, 9, 14, 19].map((x, i) => (
        <line
          key={i}
          x1={x}
          y1={4}
          x2={x}
          y2={26}
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          pathLength={1}
          style={filled ? { strokeDasharray: 1, animation: `openui-tally-draw 160ms ease-out ${i * 60}ms both` } : undefined}
        />
      ))}
      {filled && (
        <line
          x1="1"
          y1="22"
          x2="23"
          y2="7"
          stroke="#e2624a"
          strokeWidth="2.6"
          strokeLinecap="round"
          pathLength={1}
          style={{ strokeDasharray: 1, animation: "openui-tally-draw 200ms ease-out 260ms both" }}
        />
      )}
      <title>{`group ${index + 1}`}</title>
    </svg>
  );
}

export function TallyGlyphCounter({ value, numeral = true, className }: TallyGlyphCounterProps) {
  const groups = Math.ceil(value / 5);
  const [animatedValue, setAnimatedValue] = useState(0);
  const previous = useRef(0);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setAnimatedValue(value);
      previous.current = value;
      return;
    }
    // Tick up in steps of 5 so new groups draw one at a time.
    const step = value > previous.current ? 1 : -1;
    let current = previous.current;
    const timer = window.setInterval(() => {
      current += step;
      setAnimatedValue(current);
      if (current === value) {
        window.clearInterval(timer);
        previous.current = value;
      }
    }, 120);
    return () => window.clearInterval(timer);
  }, [value]);

  const visibleGroups = Math.ceil(animatedValue / 5);

  return (
    <span
      className={cn("inline-flex items-center gap-3", className)}
      role="status"
      aria-label={`${value} counted`}
    >
      <span aria-hidden className="flex max-w-md flex-wrap gap-1.5 text-ink">
        {Array.from({ length: Math.max(groups, 1) }, (_, index) => (
          <TallyGroup key={index} index={index} filled={index < visibleGroups} />
        ))}
      </span>
      {numeral && <span className="font-mono text-sm tabular-nums text-ink/70">{value}</span>}
      <style>{`@keyframes openui-tally-draw { from { stroke-dashoffset: 1 } to { stroke-dashoffset: 0 } } @media (prefers-reduced-motion: reduce) { line { animation: none !important; stroke-dashoffset: 0 !important } }`}</style>
    </span>
  );
}

export default TallyGlyphCounter;

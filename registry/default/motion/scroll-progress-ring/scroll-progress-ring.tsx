"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export interface ScrollProgressRingProps {
  size?: number;
  className?: string;
}

export function ScrollProgressRing({ size = 56, className }: ScrollProgressRingProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const measure = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(1, window.scrollY / total) : 0);
    };
    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const radius = (size - 6) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={`Scroll progress ${Math.round(progress * 100)}%. Click to return to top.`}
      className={cn("cursor-pointer border-0 bg-transparent p-0", className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeWidth="2" opacity="0.15" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e2624a"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: "stroke-dashoffset 80ms linear" }}
        />
      </svg>
      <span aria-hidden className="absolute inset-0 flex items-center justify-center font-mono text-[10px] tabular-nums text-ink/70">
        {Math.round(progress * 100)}%
      </span>
    </button>
  );
}

export default ScrollProgressRing;

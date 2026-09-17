"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export interface VerticalPhraseTickerProps {
  phrases: string[];
  /** ms each phrase is shown. */
  holdMs?: number;
  className?: string;
}

export function VerticalPhraseTicker({ phrases, holdMs = 2400, className }: VerticalPhraseTickerProps) {
  const [index, setIndex] = useState(0);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduced) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % phrases.length), holdMs);
    return () => window.clearInterval(timer);
  }, [phrases.length, holdMs, reduced]);

  return (
    <span
      className={cn("inline-flex overflow-hidden", className)}
      style={{ height: "1.25em" }}
      role="status"
      aria-label={phrases[index]}
    >
      <span
        aria-hidden
        key={index}
        className="inline-block leading-[1.25]"
        style={{
          animation: reduced ? undefined : "openui-ticker-slide 420ms cubic-bezier(0.2, 0, 0, 1)",
        }}
      >
        {phrases[index]}
      </span>
      <style>{`@keyframes openui-ticker-slide { 0% { transform: translateY(1.25em); opacity: 0 } 100% { transform: translateY(0); opacity: 1 } } @media (prefers-reduced-motion: reduce) { span { animation: none !important } }`}</style>
    </span>
  );
}

export default VerticalPhraseTicker;

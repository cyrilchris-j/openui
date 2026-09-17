"use client";

import { useMemo } from "react";
import { cn } from "@/lib/cn";

export interface WaveTextProps {
  text: string;
  /** Wave duration in seconds for a full cycle. */
  duration?: number;
  /** Vertical travel in em. */
  amplitude?: number;
  className?: string;
}

export function WaveText({ text, duration = 2.4, amplitude = 0.35, className }: WaveTextProps) {
  const words = useMemo(() => text.split(" "), [text]);

  if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
    return <span className={className}>{text}</span>;
  }

  let index = 0;
  return (
    <span className={cn("inline-block", className)} aria-label={text} role="text">
      {words.map((word, wordPosition) => (
        <span key={wordPosition} aria-hidden className="inline-block whitespace-nowrap">
          {[...word].map((char) => {
            const delay = index * 0.09;
            index++;
            return (
              <span
                key={`${char}-${delay}`}
                className="inline-block motion-reduce:transform-none"
                style={{
                  animation: `openui-wave ${duration}s ease-in-out ${delay}s infinite`,
                  ["--wave-amplitude" as string]: `${amplitude}em`,
                }}
              >
                {char}
              </span>
            );
          })}
          {wordPosition < words.length - 1 ? <span> </span> : null}
        </span>
      ))}
      <style>{`@keyframes openui-wave { 0%,100% { transform: translateY(0) } 50% { transform: translateY(calc(var(--wave-amplitude) * -1)) } } @media (prefers-reduced-motion: reduce) { [style] { animation: none !important } }`}</style>
    </span>
  );
}

export default WaveText;

"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
const REEL_TURNS = 2;

export interface LetterSlotMachineProps {
  value: string;
  /** Base ms per full reel spin. */
  spinMs?: number;
  className?: string;
}

export function LetterSlotMachine({ value, spinMs = 900, className }: LetterSlotMachineProps) {
  const [displayed, setDisplayed] = useState(() => value.toUpperCase());
  const previous = useRef(value.toUpperCase());

  useEffect(() => {
    const target = value.toUpperCase();
    const from = previous.current;
    previous.current = target;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setDisplayed(target);
      return;
    }

    let cancelled = false;
    const timers: number[] = [];

    [...target].forEach((char, index) => {
      const delay = index * 110;
      timers.push(
        window.setTimeout(() => {
          if (cancelled) return;
          setDisplayed((current) => {
            const next = [...current];
            next[index] = char;
            // Keep reel visuals: fill the remainder with alphabet neighbours.
            for (let fill = index + 1; fill < next.length && fill < target.length; fill++) {
              if (target[fill] !== next[fill] && ALPHABET.includes(target[fill]!)) {
                next[fill] = ALPHABET[(ALPHABET.indexOf(target[fill]!) + REEL_TURNS) % ALPHABET.length]!;
              }
            }
            return next.join("");
          });
        }, delay),
      );
    });

    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [value]);

  return (
    <span className={cn("inline-flex font-mono", className)} role="status" aria-label={value}>
      {[...displayed].map((char, index) => (
        <span key={`${index}`} aria-hidden className="inline-block overflow-hidden" style={{ height: "1em" }}>
          <span
            className="inline-block"
            style={{
              transform: char === displayed[index] ? "translateY(0)" : "translateY(-0.15em)",
              animation: char === displayed[index] ? "openui-reel-settle 260ms ease-out" : undefined,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ))}
      <style>{`@keyframes openui-reel-settle { 0% { transform: translateY(-0.6em) } 100% { transform: translateY(0) } } @media (prefers-reduced-motion: reduce) { * { animation: none !important } }`}</style>
    </span>
  );
}

export default LetterSlotMachine;

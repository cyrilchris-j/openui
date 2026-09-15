"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/cn";

/**
 * Kinetic Ticker
 *
 * Two details separate a usable ticker from a distracting one:
 *
 *  1. **Width reservation.** An invisible copy of the longest phrase sits in the
 *     layout, so the words around it never move. Without this, every rotation
 *     shoves the rest of the sentence sideways.
 *  2. **Visibility.** The interval stops when the document is hidden, so a
 *     background tab is not animating 60 times a second.
 *
 * Under reduced motion it stops rotating and shows the first phrase, with the
 * full list available to screen readers as text.
 */

export interface KineticTickerProps {
  phrases: readonly string[];
  /** Milliseconds each phrase stays. */
  interval?: number;
  className?: string;
  /** Text before the rotating word, e.g. "Build with". */
  prefix?: string;
  /** Text after the rotating word. */
  suffix?: string;
}

export function KineticTicker({
  phrases,
  interval = 2200,
  className,
  prefix,
  suffix,
}: KineticTickerProps) {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const longest = useMemo(
    () => phrases.reduce((longestSoFar, phrase) => (phrase.length > longestSoFar.length ? phrase : longestSoFar), ""),
    [phrases],
  );

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduced || phrases.length < 2) return;

    function start() {
      if (timer.current) clearInterval(timer.current);
      timer.current = setInterval(() => setIndex((current) => (current + 1) % phrases.length), interval);
    }
    function stop() {
      if (timer.current) clearInterval(timer.current);
      timer.current = null;
    }

    start();
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [interval, phrases.length, reduced]);

  return (
    <span className={cn("inline-flex flex-wrap items-baseline gap-x-3", className)}>
      {prefix ? <span>{prefix}</span> : null}
      <span className="relative inline-block align-baseline">
        {/* Reservers: keep the widest phrase in the flow so nothing reflows. */}
        <span aria-hidden="true" className="invisible block font-[inherit] whitespace-pre">
          {longest}
        </span>
        <span
          aria-hidden="true"
          key={index}
          className="absolute inset-0 flex items-center font-[inherit] text-oxide motion-safe:animate-[openui-ticker-in_420ms_cubic-bezier(0.2,0,0,1)]"
        >
          {phrases[index]}
        </span>
      </span>
      {suffix ? <span>{suffix}</span> : null}
      <span className="sr-only">{phrases.join(", ")}</span>
      <style>{`@keyframes openui-ticker-in { from { opacity: 0; transform: translate3d(0,0.55em,0); } to { opacity: 1; transform: none; } }`}</style>
    </span>
  );
}

export default KineticTicker;

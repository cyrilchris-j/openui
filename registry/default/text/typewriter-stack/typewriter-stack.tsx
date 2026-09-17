"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface TypewriterStackProps {
  phrases: string[];
  /** Base typing delay per character in ms. */
  typeDelay?: number;
  /** Deletion delay per character in ms. */
  deleteDelay?: number;
  className?: string;
}

export function TypewriterStack({
  phrases,
  typeDelay = 70,
  deleteDelay = 32,
  className,
}: TypewriterStackProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timer = useRef<number | null>(null);

  const current = phrases[phraseIndex] ?? "";

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setLength(current.length);
      return;
    }

    let next: number;
    let action: () => void;

    if (!deleting && length < current.length) {
      next = typeDelay + Math.random() * 60; // humanised jitter
      action = () => setLength((value) => value + 1);
    } else if (!deleting && length === current.length) {
      next = 1800;
      action = () => setDeleting(true);
    } else if (deleting && length > 0) {
      next = deleteDelay;
      action = () => setLength((value) => value - 1);
    } else {
      next = 400;
      action = () => {
        setDeleting(false);
        setPhraseIndex((value) => (value + 1) % phrases.length);
      };
    }

    timer.current = window.setTimeout(() => action(), next);
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    };
  }, [length, deleting, current, phrases.length, typeDelay, deleteDelay]);

  return (
    <span className={cn("inline", className)} role="status" aria-label={current}>
      <span aria-hidden>
        {current.slice(0, length)}
        <span
          className="ml-0.5 inline-block w-[0.55ch] border-r-2 border-ink align-text-bottom"
          style={{ animation: "openui-caret 1.1s steps(1) infinite", height: "1em" }}
        />
      </span>
      <style>{`@keyframes openui-caret { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } } @media (prefers-reduced-motion: reduce) { @keyframes openui-caret { 0%, 100% { opacity: 1 } } }`}</style>
    </span>
  );
}

export default TypewriterStack;

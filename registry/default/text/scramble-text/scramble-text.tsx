"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/cn";

const GLYPHS = "!<>-_\\/[]{}—=+*^?#________";

export interface ScrambleTextProps {
  text: string;
  /** Frames each position stays scrambled before locking. */
  resolvePerFrame?: number;
  /** Extra scrambled characters appended while resolving. */
  revealPadding?: number;
  className?: string;
}

export function ScrambleText({
  text,
  resolvePerFrame = 2,
  revealPadding = 4,
  className,
}: ScrambleTextProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ once: true });
  const [output, setOutput] = useState(() => text.replace(/./g, " "));
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setOutput(text);
      return;
    }

    let locked = 0;
    let ticks = 0;

    const step = () => {
      ticks++;
      if (ticks % resolvePerFrame === 0 && locked < text.length) locked++;
      let next = "";
      for (let position = 0; position < text.length; position++) {
        const char = text[position] ?? " ";
        if (position < locked || char === " ") next += char;
        else next += GLYPHS[Math.floor(Math.random() * GLYPHS.length)] ?? "-";
      }
      setOutput(next);
      if (locked < text.length) frame.current = requestAnimationFrame(step);
    };

    frame.current = requestAnimationFrame(step);
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [inView, text, resolvePerFrame]);

  return (
    <span ref={ref} className={cn("font-mono tabular-nums", className)} role="text">
      {output}
    </span>
  );
}

export default ScrambleText;

"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface EditorialDropCapProps {
  /** Body copy; the first character becomes the initial. */
  text: string;
  /** How many body lines the initial spans. */
  lines?: number;
  className?: string;
}

export function EditorialDropCap({ text, lines = 3, className }: EditorialDropCapProps) {
  const initialRef = useRef<HTMLSpanElement>(null);
  const [offset, setOffset] = useState(0);
  const [reduced, setReduced] = useState(false);

  // The indent is measured from the rendered glyph rather than assumed from
  // the ch unit, which is wrong for proportional faces — a serif C is not one ch wide.
  useEffect(() => {
    setReduced(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false);
    const initial = initialRef.current;
    if (!initial) return;
    const measure = () => setOffset(initial.getBoundingClientRect().width);
    measure();
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    observer?.observe(initial);
    return () => observer?.disconnect();
  }, [text]);

  const [first, ...rest] = text;
  const body = rest.join("");

  return (
    <p className={cn("prose-measure text-[0.95rem] leading-[1.7] text-graphite", className)}>
      <span
        ref={initialRef}
        aria-hidden={reduced}
        className="float-left mr-3 select-none font-display text-ink"
        style={{
          fontSize: `calc(${lines} * 1.7em)`,
          lineHeight: "0.82",
          paddingTop: "0.04em",
        }}
      >
        {first}
      </span>
      <span className={reduced ? "inline" : undefined} style={{ marginLeft: reduced ? 0 : -offset / 2 }}>
        {body}
      </span>
    </p>
  );
}

export default EditorialDropCap;

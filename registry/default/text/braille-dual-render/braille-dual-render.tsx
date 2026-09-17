"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const MAP: Record<string, string> = {
  a: "\u2801", b: "\u2803", c: "\u2809", d: "\u2819", e: "\u2811", f: "\u280b", g: "\u281b",
  h: "\u2813", i: "\u280a", j: "\u281a", k: "\u2805", l: "\u2807", m: "\u280d", n: "\u281d",
  o: "\u2815", p: "\u280f", q: "\u281f", r: "\u2817", s: "\u280e", t: "\u281e", u: "\u2825",
  v: "\u2827", w: "\u283a", x: "\u282d", y: "\u283d", z: "\u2835", " ": "\u2800",
};

export interface BrailleDualRenderProps {
  children: string;
  className?: string;
}

export function BrailleDualRender({ children, className }: BrailleDualRenderProps) {
  const [dots, setDots] = useState(() => toBraille(children));

  useEffect(() => {
    setDots(toBraille(children));
  }, [children]);

  return (
    <span className={cn("inline-flex flex-col gap-2", className)}>
      <span className="font-display text-lg text-ink">{children}</span>
      <span aria-hidden className="select-none font-mono text-2xl leading-none tracking-[0.2em] text-ink/85">
        {dots}
      </span>
    </span>
  );
}

function toBraille(text: string): string {
  return [...text.toLowerCase()].map((char) => MAP[char] ?? "\u2800").join("");
}

export default BrailleDualRender;

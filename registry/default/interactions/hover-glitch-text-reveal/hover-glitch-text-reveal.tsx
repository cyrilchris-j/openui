"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface HoverGlitchTextRevealProps {
  text?: string;
  className?: string;
}

export function HoverGlitchTextReveal({ text = "CLASSIFIED_KERNEL", className }: HoverGlitchTextRevealProps) {
  const [glitching, setGlitching] = useState(false);

  return (
    <div
      onPointerEnter={() => setGlitching(true)}
      onPointerLeave={() => setGlitching(false)}
      className={cn("inline-flex items-center gap-2 rounded-xl border border-line bg-paper p-6 font-mono text-sm font-bold text-ink shadow-sm cursor-pointer", className)}
    >
      <span>&gt;</span>
      <span>{glitching ? "X%#@9_!§K902" : text}</span>
    </div>
  );
}

export default HoverGlitchTextReveal;

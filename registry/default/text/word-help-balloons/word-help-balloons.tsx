"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";

export interface WordHelpBalloonsProps {
  /** Segments: plain strings, or { term, definition } objects. */
  segments: Array<string | { term: string; definition: string }>;
  className?: string;
}

export function WordHelpBalloons({ segments, className }: WordHelpBalloonsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <p className={cn("max-w-prose leading-relaxed", className)}>
      {segments.map((segment, index) => {
        if (typeof segment === "string") return <span key={index}>{segment} </span>;
        return <Balloon key={index} index={index} term={segment.term} definition={segment.definition} open={openIndex === index} onToggle={(next) => setOpenIndex(next ? index : null)} />;
      })}
    </p>
  );
}

function Balloon({
  index,
  term,
  definition,
  open,
  onToggle,
}: {
  index: number;
  term: string;
  definition: string;
  open: boolean;
  onToggle: (open: boolean) => void;
}) {
  const id = useId();
  return (
    <span className="relative inline-block">
      <button
        type="button"
        aria-expanded={open}
        aria-describedby={open ? id : undefined}
        onClick={() => onToggle(!open)}
        onMouseEnter={() => onToggle(true)}
        onMouseLeave={() => onToggle(false)}
        onFocus={() => onToggle(true)}
        onBlur={() => onToggle(false)}
        className="cursor-help border-0 bg-transparent p-0 underline decoration-dotted decoration-2 underline-offset-4"
      >
        {term}
      </button>
      <span
        id={id}
        role="tooltip"
        className={cn(
          "absolute bottom-full left-1/2 z-10 mb-2 w-56 -translate-x-1/2 rounded-md border border-line bg-paper p-3 text-xs leading-relaxed text-ink shadow-lg",
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0",
        )}
        style={{ transition: "opacity 140ms ease, transform 140ms ease", transformOrigin: "bottom center" }}
      >
        {definition}
      </span>
    </span>
  );
}

export default WordHelpBalloons;

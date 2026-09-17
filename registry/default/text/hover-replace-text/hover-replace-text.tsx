"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface HoverReplaceTextProps {
  /** Label shown at rest. */
  base: string;
  /** Label revealed on hover, focus or tap. */
  alt: string;
  href?: string;
  className?: string;
}

export function HoverReplaceText({ base, alt, href = "#", className }: HoverReplaceTextProps) {
  const [active, setActive] = useState(false);
  const [direction, setDirection] = useState<"up" | "down">("up");
  const enteredFromTop = useRef<boolean | null>(null);

  const handleEnter = (event: React.PointerEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const fromTop = event.clientY - rect.top < rect.height / 2;
    enteredFromTop.current = fromTop;
    setDirection(fromTop ? "up" : "down");
    setActive(true);
  };

  const swapTransition =
    "transform 220ms cubic-bezier(0.2, 0, 0, 1), opacity 220ms ease";

  return (
    <a
      href={href}
      className={cn("group relative inline-block overflow-hidden align-baseline", className)}
      onPointerEnter={handleEnter}
      onPointerLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      onClick={(event) => {
        // Touch: first tap swaps, second tap follows the link.
        if (enteredFromTop.current === null) {
          event.preventDefault();
          setActive((value) => !value);
        }
      }}
    >
      <span className="relative inline-grid" style={{ minWidth: "1ch" }} aria-label={`${base} — ${alt}`}>
        <span
          aria-hidden
          className="col-start-1 row-start-1 text-ink"
          style={{
            transform: active ? `translateY(${direction === "up" ? "-100%" : "100%"})` : "translateY(0)",
            opacity: active ? 0 : 1,
            transition: swapTransition,
          }}
        >
          {base}
        </span>
        <span
          aria-hidden
          className="col-start-1 row-start-1 text-oxide"
          style={{
            transform: active
              ? "translateY(0)"
              : `translateY(${direction === "up" ? "100%" : "-100%"})`,
            opacity: active ? 1 : 0,
            transition: swapTransition,
          }}
        >
          {alt}
        </span>
      </span>
    </a>
  );
}

export default HoverReplaceText;

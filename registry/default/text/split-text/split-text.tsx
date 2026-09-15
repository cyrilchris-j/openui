"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

/**
 * Split Text
 *
 * Most "split text" components destroy the thing they are splitting: the text
 * ends up unselectable, unsearchable by find-in-page, and is announced as a
 * stream of letters. This one splits on **words**, keeps them as real text
 * nodes, uses `aria-label` on the wrapper so assistive technology reads the
 * sentence once, and hides the decorative spans from the accessibility tree.
 *
 * The reveal is driven by one CSS custom property per word (`--i`), so the
 * animation lives in the stylesheet and the component stays cheap.
 */

export interface SplitTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  /** Delay between words in ms. */
  stagger?: number;
  /** Delay before the first word in ms. */
  delay?: number;
  duration?: number;
  as?: "span" | "p" | "div";
  /** Trigger when scrolled into view rather than on mount. */
  onView?: boolean;
}

export function SplitText({
  text,
  stagger = 48,
  delay = 0,
  duration = 620,
  as: Tag = "span",
  onView = false,
  className,
  ...props
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(!onView);
  const words = text.split(/(\s+)/);

  useEffect(() => {
    if (!onView || typeof window === "undefined") return;
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }
    if (!("IntersectionObserver" in window)) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [onView]);

  let wordIndex = -1;

  return (
    <Tag
      ref={ref as React.RefObject<never>}
      aria-label={text}
      data-revealed={revealed ? "true" : "false"}
      className={cn("inline-block", className)}
      {...props}
    >
      <style>{`[data-split-word]{display:inline-block;opacity:0;transform:translate3d(0,0.4em,0);transition:opacity var(--split-duration,620ms) cubic-bezier(0.2,0,0,1),transform var(--split-duration,620ms) cubic-bezier(0.2,0,0,1);transition-delay:calc(var(--split-delay,0ms) + var(--i,0) * var(--split-stagger,48ms))}[data-revealed="true"] [data-split-word]{opacity:1;transform:none}@media (prefers-reduced-motion: reduce){[data-split-word]{opacity:1;transform:none;transition:none}}`}</style>
      <span
        aria-hidden="true"
        style={
          {
            "--split-stagger": `${stagger}ms`,
            "--split-delay": `${delay}ms`,
            "--split-duration": `${duration}ms`,
          } as React.CSSProperties
        }
      >
        {words.map((chunk, index) => {
          if (/^\s+$/.test(chunk)) return <span key={`space-${index}`}> </span>;
          wordIndex += 1;
          return (
            <span key={`${chunk}-${index}`} data-split-word="" style={{ "--i": wordIndex } as React.CSSProperties}>
              {chunk}
            </span>
          );
        })}
      </span>
    </Tag>
  );
}

export default SplitText;

"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

/**
 * Marquee Index
 *
 * A ticker with the behaviour most implementations forget:
 *
 *  - It pauses on hover **and** on focus-within, so a keyboard user can actually
 *    reach a link inside it.
 *  - Under `prefers-reduced-motion` it stops translating and becomes a
 *    horizontally scrollable list — motion is removed, content is not.
 *  - It duplicates the track exactly once and animates by -50%, which is what
 *    makes the loop seamless regardless of content width.
 */

export interface MarqueeIndexProps extends React.HTMLAttributes<HTMLDivElement> {
  items: readonly string[];
  /** Seconds for one full pass. Slower for longer lists. */
  duration?: number;
  direction?: "left" | "right";
  separator?: React.ReactNode;
}

export function MarqueeIndex({
  items,
  duration = 32,
  direction = "left",
  separator = <span aria-hidden="true" className="px-6 text-graphite/60">/</span>,
  className,
  ...props
}: MarqueeIndexProps) {
  const [reduced, setReduced] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const track = (
    <div className="flex shrink-0 items-center whitespace-nowrap">
      {items.map((item, index) => (
        <span key={`${item}-${index}`} className="flex items-center">
          <span className="font-mono text-xs uppercase tracking-[0.28em]">{item}</span>
          {index < items.length - 1 ? separator : null}
        </span>
      ))}
    </div>
  );

  return (
    <div
      ref={scroller}
      role="marquee"
      aria-label="Resource index ticker"
      data-reduced-motion={reduced ? "true" : "false"}
      className={cn(
        "group relative flex w-full items-center overflow-hidden border-y border-line py-4",
        reduced && "overflow-x-auto",
        className,
      )}
      {...props}
    >
      {reduced ? (
        track
      ) : (
        <div
          className="flex min-w-full shrink-0 [animation-play-state:running] group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]"
          style={{
            animation: `openui-marquee ${duration}s linear infinite`,
            animationDirection: direction === "right" ? "reverse" : "normal",
          }}
        >
          {track}
          <div aria-hidden="true" className="flex shrink-0">
            {track}
          </div>
        </div>
      )}

      <style>{`@keyframes openui-marquee { from { transform: translate3d(0,0,0); } to { transform: translate3d(-50%,0,0); } }`}</style>
    </div>
  );
}

export default MarqueeIndex;

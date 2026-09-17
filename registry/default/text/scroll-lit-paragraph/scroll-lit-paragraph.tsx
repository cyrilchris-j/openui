"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface ScrollLitParagraphProps {
  children: string;
  className?: string;
}

export function ScrollLitParagraph({ children, className }: ScrollLitParagraphProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);
  const words = children.split(/\s+/);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const measure = () => {
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight;
      // 0 when the paragraph top reaches 80% of viewport, 1 when its bottom passes 35%.
      const start = viewport * 0.8;
      const end = viewport * 0.35;
      const span = start - end + rect.height;
      const travelled = start - rect.top;
      setProgress(Math.max(0, Math.min(1, travelled / span)));
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const litCount = Math.floor(progress * words.length);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const allLit = reduced && progress === 0 ? true : undefined;

  return (
    <p ref={ref} className={cn("max-w-prose text-lg leading-relaxed", className)}>
      {words.map((word, index) => (
        <span
          key={index}
          style={{
            color:
              allLit || index < litCount
                ? "var(--openui-ink, #1c1c1e)"
                : "color-mix(in oklab, currentColor, transparent 72%)",
            transition: "color 180ms ease",
          }}
        >
          {word}{" "}
        </span>
      ))}
    </p>
  );
}

export default ScrollLitParagraph;

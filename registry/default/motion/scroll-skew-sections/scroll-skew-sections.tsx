"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface ScrollSkewSectionsProps {
  sections: Array<{ title: string; body: string }>;
  maxSkew?: number;
  className?: string;
}

export function ScrollSkewSections({ sections, maxSkew = 4, className }: ScrollSkewSectionsProps) {
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let lastY = window.scrollY;
    let lastT = performance.now();
    let velocity = 0;
    let skew = 0;
    let raf: number | null = null;

    const tick = () => {
      const now = performance.now();
      const dy = window.scrollY - lastY;
      const dt = Math.max(1, now - lastT);
      lastY = window.scrollY;
      lastT = now;
      velocity += ((dy / dt) * 16 - velocity) * 0.2;
      skew += (velocity * 0.08 - skew) * 0.3;

      sectionRefs.current.forEach((node, index) => {
        if (!node) return;
        const direction = index % 2 === 0 ? 1 : -1;
        node.style.transform = `skewY(${(skew * direction).toFixed(3)}deg)`;
      });

      if (Math.abs(skew) > 0.02 || Math.abs(velocity) > 0.1) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = null;
        sectionRefs.current.forEach((node) => {
          if (node) node.style.transform = "";
        });
      }
    };

    const kick = () => {
      if (raf === null) raf = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", kick, { passive: true });
    return () => {
      window.removeEventListener("scroll", kick);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={cn("flex flex-col", className)}>
      {sections.map((section, index) => (
        <section
          key={index}
          ref={(node) => {
            sectionRefs.current[index] = node;
          }}
          className={cn("py-16 will-change-transform", index % 2 === 0 ? "bg-paper" : "bg-line/20")}
        >
          <div className="mx-auto max-w-xl px-8">
            <h2 className="font-display text-2xl text-ink">{section.title}</h2>
            <p className="mt-3 text-ink/70">{section.body}</p>
          </div>
        </section>
      ))}
    </div>
  );
}

export default ScrollSkewSections;

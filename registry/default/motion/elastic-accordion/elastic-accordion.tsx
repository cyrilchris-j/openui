"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface ElasticAccordionProps {
  items: Array<{ q: string; a: string }>;
  className?: string;
}

export function ElasticAccordion({ items, className }: ElasticAccordionProps) {
  const [open, setOpen] = useState<number | null>(0);
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);
  const offsets = useRef<number[]>(items.map(() => 0));
  const velocities = useRef<number[]>(items.map(() => 0));
  const raf = useRef<number | null>(null);

  // Spring simulation: each closed row below the open one gets pushed down
  // by the open panel's height, chasing with a lag proportional to its index.
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const tick = () => {
      const openIndex = open;
      const openRow = openIndex !== null ? rowRefs.current[openIndex] : null;
      const openHeight = openRow?.scrollHeight ?? 0;

      items.forEach((_, index) => {
        if (index === openIndex) {
          offsets.current[index] = 0;
          velocities.current[index] = 0;
          return;
        }
        const pushed = openIndex !== null && index > openIndex ? openHeight : 0;
        const force = -0.18 * (offsets.current[index]! - pushed);
        velocities.current[index] = (velocities.current[index]! + force) * 0.82;
        offsets.current[index] = offsets.current[index]! + velocities.current[index]!;
      });

      items.forEach((_, index) => {
        const node = rowRefs.current[index];
        if (node && index !== open) {
          node.style.transform = `translateY(${offsets.current[index]!.toFixed(2)}px)`;
        }
      });

      const stillMoving = offsets.current.some((offset, index) => index !== open && Math.abs(offset - (open !== null && index > open ? openHeight : 0)) > 0.5);
      raf.current = stillMoving ? requestAnimationFrame(tick) : null;
    };

    if (raf.current === null) raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current !== null) {
        cancelAnimationFrame(raf.current);
        raf.current = null;
      }
    };
  }, [open, items]);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {items.map((item, index) => (
        <div key={index} className="overflow-hidden rounded-xl border border-line bg-paper">
          <button
            type="button"
            onClick={() => setOpen((current) => (current === index ? null : index))}
            aria-expanded={open === index}
            className="flex w-full items-center justify-between px-5 py-4 text-left font-display text-ink"
          >
            {item.q}
            <span aria-hidden className="text-ink/40">{open === index ? "−" : "+"}</span>
          </button>
          <div
            ref={(node) => {
              rowRefs.current[index] = node;
            }}
            className="grid transition-[grid-template-rows] duration-300"
            style={{
              gridTemplateRows: open === index ? "1fr" : "0fr",
              ...(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? { transition: "none" } : {}),
            }}
          >
            <div className="overflow-hidden">
              <p className="px-5 pb-4 text-sm leading-relaxed text-ink/75">{item.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ElasticAccordion;

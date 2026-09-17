"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface SharedLayoutMorphProps {
  items: Array<{ id: string; title: string; body: string }>;
  className?: string;
}

export function SharedLayoutMorph({ items, className }: SharedLayoutMorphProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const cardRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const detailRef = useRef<HTMLDivElement>(null);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const expand = (id: string) => {
    const card = cardRefs.current[id];
    setSelected(id);
    if (!card || reduced) return;
    // Wait for the detail node to mount, then FLIP from the card's rect.
    requestAnimationFrame(() => {
      const detail = detailRef.current;
      if (!detail) return;
      const first = card.getBoundingClientRect();
      const last = detail.getBoundingClientRect();
      const dx = first.left - last.left;
      const dy = first.top - last.top;
      const sx = first.width / last.width;
      const sy = first.height / last.height;
      detail.animate(
        [
          { transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`, borderRadius: "12px" },
          { transform: "translate(0, 0) scale(1, 1)", borderRadius: "12px" },
        ],
        { duration: 420, easing: "cubic-bezier(0.2, 0, 0, 1)" },
      );
    });
  };

  return (
    <div className={cn("relative", className)}>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((item) => (
          <button
            key={item.id}
            ref={(node) => {
              cardRefs.current[item.id] = node;
            }}
            type="button"
            onClick={() => expand(item.id)}
            className={cn(
              "rounded-xl border border-line bg-paper p-4 text-left transition-opacity",
              selected === item.id ? "opacity-30" : "opacity-100 hover:border-accent",
            )}
          >
            <p className="font-display text-ink">{item.title}</p>
          </button>
        ))}
      </div>
      {selected && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div
            ref={detailRef}
            className="w-full max-w-sm rounded-xl border border-line bg-paper p-6 shadow-2xl"
          >
            <p className="font-display text-lg text-ink">
              {items.find((item) => item.id === selected)?.title}
            </p>
            <p className="mt-2 text-sm text-ink/70">
              {items.find((item) => item.id === selected)?.body}
            </p>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="mt-4 rounded-md border border-line px-3 py-1.5 text-sm text-ink hover:bg-line/20"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SharedLayoutMorph;

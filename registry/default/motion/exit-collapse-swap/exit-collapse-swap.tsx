"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface ExitCollapseSwapProps {
  items: string[];
  className?: string;
}

export function ExitCollapseSwap({ items: initial, className }: ExitCollapseSwapProps) {
  const [items, setItems] = useState(initial);
  const listRef = useRef<HTMLUListElement>(null);
  const leaving = useRef<Set<string>>(new Set());
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const remove = (item: string) => {
    const list = listRef.current;
    if (!list || reduced) {
      setItems((current) => current.filter((entry) => entry !== item));
      return;
    }

    // FLIP: measure siblings before mutation.
    const before = new Map<string, DOMRect>();
    list.querySelectorAll("li[data-item]").forEach((node) => {
      const el = node as HTMLElement;
      before.set(el.dataset.item!, el.getBoundingClientRect());
    });

    leaving.current.add(item);
    const leavingNode = list.querySelector(`li[data-item="${CSS.escape(item)}"]`) as HTMLElement | null;

    // Force the leaving row to collapse.
    if (leavingNode) {
      const rect = leavingNode.getBoundingClientRect();
      leavingNode.style.height = `${rect.height}px`;
      requestAnimationFrame(() => {
        leavingNode.style.transition = "height 320ms ease, opacity 240ms ease, margin 320ms ease";
        leavingNode.style.height = "0px";
        leavingNode.style.opacity = "0";
        leavingNode.style.marginBottom = "0px";
        leavingNode.style.overflow = "hidden";
      });
    }

    window.setTimeout(() => {
      setItems((current) => current.filter((entry) => entry !== item));
      leaving.current.delete(item);
    }, 340);

    // Slide neighbours in the same frame window.
    requestAnimationFrame(() => {
      list.querySelectorAll("li[data-item]").forEach((node) => {
        const el = node as HTMLElement;
        const id = el.dataset.item!;
        const after = el.getBoundingClientRect();
        const firstRect = before.get(id);
        if (!firstRect || leaving.current.has(id)) return;
        const dy = firstRect.top - after.top;
        if (Math.abs(dy) > 1) {
          el.animate(
            [{ transform: `translateY(${dy}px)` }, { transform: "translateY(0)" }],
            { duration: 320, easing: "cubic-bezier(0.2, 0, 0, 1)" },
          );
        }
      });
    });
  };

  return (
    <ul ref={listRef} className={cn("flex flex-col gap-2", className)}>
      {items.map((item) => (
        <li
          key={item}
          data-item={item}
          className="flex items-center justify-between rounded-lg border border-line bg-paper px-4 py-3"
          style={{ marginBottom: "0.5rem" }}
        >
          <span className="text-ink">{item}</span>
          <button
            type="button"
            onClick={() => remove(item)}
            aria-label={`Remove ${item}`}
            className="rounded border border-line px-2 py-0.5 font-mono text-xs text-ink/60 hover:border-red-400 hover:text-red-500"
          >
            remove
          </button>
        </li>
      ))}
      {items.length === 0 && <li className="py-6 text-center text-sm text-ink/50">All items removed — add some back?</li>}
    </ul>
  );
}

export default ExitCollapseSwap;

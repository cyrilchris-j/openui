"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface DataStreamRowsProps {
  /** Generates a new row label per tick. */
  generate?: (index: number) => string;
  tickMs?: number;
  maxRows?: number;
  className?: string;
}

const EVENTS = ["deploy", "merge", "validate", "publish", "rollback", "install"];

export function DataStreamRows({
  generate,
  tickMs = 2000,
  maxRows = 6,
  className,
}: DataStreamRowsProps) {
  const [rows, setRows] = useState<Array<{ id: number; label: string }>>([]);
  const counter = useRef(0);
  const listRef = useRef<HTMLUListElement>(null);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const timer = window.setInterval(() => {
      const id = counter.current++;
      const label = generate
        ? generate(id)
        : `${EVENTS[id % EVENTS.length]} #${1000 + id}`;

      const list = listRef.current;
      if (list && !reduced) {
        // Measure existing rows before the insert for the FLIP push.
        const before = new Map<string, DOMRect>();
        list.querySelectorAll("li[data-row]").forEach((node) => {
          before.set((node as HTMLElement).dataset.row!, (node as HTMLElement).getBoundingClientRect());
        });

        setRows((current) => [{ id, label, flash: true } as never, ...current].slice(0, maxRows));

        requestAnimationFrame(() => {
          list.querySelectorAll("li[data-row]").forEach((node) => {
            const el = node as HTMLElement;
            const firstRect = before.get(el.dataset.row!);
            if (!firstRect) {
              el.animate([{ opacity: 0, transform: "translateY(-100%)" }, { opacity: 1, transform: "translateY(0)" }], {
                duration: 320,
                easing: "cubic-bezier(0.2, 0, 0, 1)",
              });
              return;
            }
            const after = el.getBoundingClientRect();
            const dy = firstRect.top - after.top;
            if (Math.abs(dy) > 1) {
              el.animate([{ transform: `translateY(${dy}px)` }, { transform: "translateY(0)" }], {
                duration: 320,
                easing: "cubic-bezier(0.2, 0, 0, 1)",
              });
            }
          });
        });
      } else {
        setRows((current) => [{ id, label }, ...current].slice(0, maxRows));
      }
    }, tickMs);
    return () => window.clearInterval(timer);
  }, [tickMs, maxRows, generate, reduced]);

  return (
    <ul ref={listRef} className={cn("flex flex-col overflow-hidden rounded-lg border border-line bg-ink font-mono text-xs", className)} aria-live="polite">
      {rows.map((row) => (
        <li
          key={row.id}
          data-row={row.id}
          className="flex items-center gap-2 border-b border-white/5 px-3 py-2 text-paper/85 last:border-0"
        >
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          {row.label}
        </li>
      ))}
    </ul>
  );
}

export default DataStreamRows;

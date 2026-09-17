"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export interface BreadcrumbEntry {
  label: string;
  href?: string;
}

export interface SmartBreadcrumbProps {
  entries: BreadcrumbEntry[];
  /** How many leading entries stay visible before collapsing begins. */
  keepFirst?: number;
  className?: string;
}

export function SmartBreadcrumb({ entries, keepFirst = 1, className }: SmartBreadcrumbProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [overflowing, setOverflowing] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => {
      setOverflowing(container.scrollWidth > container.clientWidth);
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const last = entries.length - 1;
  const collapsed = overflowing && !expanded && entries.length > keepFirst + 2;
  const visible = collapsed
    ? [...entries.slice(0, keepFirst), null, ...entries.slice(-2)]
    : entries;

  return (
    <nav aria-label="Breadcrumb" ref={containerRef} className={cn("min-w-0", className)}>
      <ol className="flex items-center gap-1.5 whitespace-nowrap text-[0.85rem] text-graphite">
        {visible.map((entry, position) =>
          entry === null ? (
            <li key="collapsed">
              <button
                type="button"
                aria-label={`${entries.length - keepFirst - 2} hidden levels`}
                aria-expanded={expanded}
                onClick={() => setExpanded(true)}
                className="rounded-sm px-1.5 py-0.5 font-mono text-[10px] tracking-widest hover:bg-ink/[0.05] focus-visible:outline-2 focus-visible:outline-oxide"
              >
                …
              </button>
            </li>
          ) : (
            <li key={`${entry.label}-${position}`} className="flex items-center gap-1.5">
              {position > 0 ? (
                <ChevronRight aria-hidden className="h-3 w-3 text-graphite/50" />
              ) : null}
              {position === last || !entry.href ? (
                <span aria-current={position === last ? "page" : undefined} className="text-ink">
                  {entry.label}
                </span>
              ) : (
                <a href={entry.href} className="transition-colors hover:text-ink">
                  {entry.label}
                </a>
              )}
            </li>
          ),
        )}
      </ol>
    </nav>
  );
}

export default SmartBreadcrumb;

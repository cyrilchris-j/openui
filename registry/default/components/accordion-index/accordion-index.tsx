"use client";

import { useId } from "react";

import { cn } from "@/lib/cn";

/**
 * Accordion Index
 *
 * Disclosure built on `<details>` / `<summary>` instead of a JavaScript state
 * machine. That choice buys real behaviour for free: keyboard operation,
 * find-in-page expansion, screen reader semantics, and a working page if the
 * bundle never loads.
 *
 * The only enhancement on top is `::details-content` style height animation,
 * which degrades to an instant open where it is unsupported.
 */

export interface AccordionItem {
  title: string;
  body: React.ReactNode;
  meta?: string;
}

export interface AccordionIndexProps {
  items: AccordionItem[];
  /** Two-digit zero-padded index numbers, as in an editorial contents page. */
  numbered?: boolean;
  defaultOpen?: number;
  className?: string;
}

export function AccordionIndex({ items, numbered = true, defaultOpen, className }: AccordionIndexProps) {
  const group = useId();

  return (
    <div className={cn("w-full border-t border-line", className)}>
      {items.map((item, index) => (
        <details
          key={`${item.title}-${index}`}
          name={group}
          open={defaultOpen === index}
          className="group border-b border-line [&_summary::-webkit-details-marker]:hidden"
        >
          <summary
            className={cn(
              "flex cursor-pointer list-none items-baseline gap-4 py-4",
              "transition-colors hover:text-oxide",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxide",
            )}
          >
            {numbered ? (
              <span className="w-8 shrink-0 font-mono text-[11px] tabular-nums text-graphite">
                {String(index + 1).padStart(2, "0")}
              </span>
            ) : null}
            <span className="flex-1 font-sans text-lg leading-snug">{item.title}</span>
            {item.meta ? (
              <span className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-graphite sm:block">
                {item.meta}
              </span>
            ) : null}
            <span
              aria-hidden="true"
              className="relative mt-1 ml-2 size-3 shrink-0 before:absolute before:top-1/2 before:left-0 before:h-px before:w-3 before:-translate-y-1/2 before:bg-current after:absolute after:top-0 after:left-1/2 after:h-3 after:w-px after:-translate-x-1/2 after:bg-current after:transition-transform after:duration-200 group-open:after:rotate-90 motion-reduce:after:transition-none"
            />
          </summary>
          <div className="pr-2 pb-5 pl-12 font-sans text-[15px] leading-relaxed text-graphite">
            {item.body}
          </div>
        </details>
      ))}
    </div>
  );
}

export default AccordionIndex;

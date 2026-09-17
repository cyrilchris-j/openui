"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface AccordionChevronListProps {
  className?: string;
}

export function AccordionChevronList({ className }: AccordionChevronListProps) {
  const [open, setOpen] = useState<number | null>(0);
  const items = [
    { q: "Is OpenUI fully typed?", a: "Yes, every resource carries strict TypeScript interfaces." },
    { q: "How are components installed?", a: "Via the openui CLI copying zero-dependency source." },
  ];

  return (
    <div className={cn("w-full max-w-md rounded-xl border border-line bg-paper p-4 shadow-sm divide-y divide-line", className)}>
      {items.map((item, idx) => {
        const isOpen = open === idx;
        return (
          <div key={item.q} className="py-3">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : idx)}
              className="flex w-full items-center justify-between font-display text-sm font-bold text-ink"
            >
              <span>{item.q}</span>
              <span className="font-mono text-xs">{isOpen ? "▲" : "▼"}</span>
            </button>
            {isOpen && <p className="mt-2 text-xs leading-relaxed text-ink/70 font-mono">{item.a}</p>}
          </div>
        );
      })}
    </div>
  );
}

export default AccordionChevronList;

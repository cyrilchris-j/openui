"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface FAQItem {
  q: string;
  a: string;
}

export interface InteractiveFAQAccordionProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  items?: FAQItem[];
}

export function InteractiveFAQAccordion({
  title = "Frequently Asked Questions",
  items = [
    {
      q: "How does OpenUI enforce the 800-resource contract?",
      a: "Every resource belongs to one of eight countable categories (100 each) and is validated by automated CLI tests. If any category drops below 100 or contains duplicate fingerprints, the build fails.",
    },
    {
      q: "Do I need to install heavy component libraries?",
      a: "No. Every resource is standalone with zero external UI dependencies. You simply copy-paste or install via the OpenUI CLI.",
    },
    {
      q: "What is Design DNA?",
      a: "Design DNA defines closed algebraic enums for macrostructure, motionLanguage, typographyStyle, colorStrategy, shapeLanguage, and density.",
    },
  ],
  className,
  ...props
}: InteractiveFAQAccordionProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className={cn("py-16 px-6 max-w-3xl mx-auto font-sans bg-paper text-ink", className)} {...props}>
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink text-center mb-10">{title}</h2>
      <div className="space-y-3">
        {items.map((item, idx) => {
          const isOpen = open === idx;
          return (
            <div key={item.q} className="rounded-2xl border border-line bg-paper overflow-hidden transition-colors shadow-xs">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : idx)}
                className="w-full p-5 text-left font-bold text-sm text-ink flex items-center justify-between gap-4"
              >
                <span>{item.q}</span>
                <span className="font-mono text-base text-ink/40">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-xs text-ink/70 leading-relaxed border-t border-line/50 pt-3">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

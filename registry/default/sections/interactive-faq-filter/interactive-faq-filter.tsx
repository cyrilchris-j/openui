"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface FAQItem {
  id: string;
  category: "General" | "Licensing" | "Technical";
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  { id: "1", category: "General", q: "Can I use OpenUI in commercial client projects?", a: "Yes. All 800 items are licensed under permissive MIT." },
  { id: "2", category: "Technical", q: "How does OpenUI differ from npm component libraries?", a: "OpenUI materializes code straight into your src folder with zero runtime dependency lock-in." },
  { id: "3", category: "Licensing", q: "Are there any hidden seat fees or cloud subscriptions?", a: "None. The open-source registry is 100% free and open." },
];

export function InteractiveFAQFilter({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [selected, setSelected] = React.useState("All");
  const [openId, setOpenId] = React.useState<string | null>("1");

  const filtered = selected === "All" ? FAQS : FAQS.filter((f) => f.category === selected);

  return (
    <section className={cn("w-full py-16 px-4 max-w-3xl mx-auto", className)} {...props}>
      <h2 className="text-2xl font-bold text-center text-neutral-900 dark:text-neutral-100 mb-6">Frequently Asked Questions</h2>
      <div className="flex justify-center gap-2 mb-6 text-xs">
        {["All", "General", "Technical", "Licensing"].map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setSelected(c)}
            className={cn(
              "px-3 py-1 rounded-full",
              selected === c ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div key={item.id} className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 bg-white dark:bg-neutral-950">
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="w-full flex justify-between items-center text-left text-sm font-semibold text-neutral-900 dark:text-neutral-100"
              >
                <span>{item.q}</span>
                <span>{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 pt-2 border-t border-neutral-100 dark:border-neutral-900">
                  {item.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

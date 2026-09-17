"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface KineticAccordionStackProps {
  className?: string;
}

export function KineticAccordionStack({ className }: KineticAccordionStackProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const items = [
    { title: "Distributed Consensus", body: "Raft and Paxos implement state machine replication across partitioned topologies." },
    { title: "Vector Clocks", body: "Causality tracking guarantees partial ordering across asynchronous message passing networks." },
    { title: "Zero-Knowledge Proofs", body: "Succinct non-interactive arguments enable verifiable computation without data leakage." },
  ];

  return (
    <div className={cn("w-full max-w-md rounded-xl border border-line bg-paper p-4 shadow-sm divide-y divide-line", className)}>
      {items.map((item, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div key={item.title} className="py-3">
            <button
              type="button"
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              className="flex w-full items-center justify-between font-display text-sm font-semibold text-ink"
            >
              <span>{item.title}</span>
              <span className={cn("transition-transform duration-200", isOpen ? "rotate-180" : "rotate-0")}>▾</span>
            </button>
            {isOpen && (
              <p className="mt-2 text-xs leading-relaxed text-ink/70 transition-all duration-200">
                {item.body}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default KineticAccordionStack;

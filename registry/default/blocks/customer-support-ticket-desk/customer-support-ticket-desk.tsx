"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function CustomerSupportTicketDesk({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const tickets = [
    { id: "TICK-101", subject: "Next.js 15 Server Action prop binding issue", priority: "High", status: "Open" },
    { id: "TICK-102", subject: "Figma token export color math question", priority: "Low", status: "Resolved" },
  ];

  return (
    <div className={cn("w-full max-w-3xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-4">Support Inquiries Queue</h3>
      <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
        {tickets.map((t) => (
          <div key={t.id} className="p-4 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-neutral-400">{t.id}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                  {t.priority}
                </span>
              </div>
              <div className="font-semibold text-neutral-900 dark:text-white mt-1">{t.subject}</div>
            </div>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{t.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

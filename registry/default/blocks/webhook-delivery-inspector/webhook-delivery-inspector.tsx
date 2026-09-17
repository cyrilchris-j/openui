"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function WebhookDeliveryInspector({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const deliveries = [
    { event: "manifest.published", url: "https://api.partner.com/webhook", status: 200, latency: "42ms" },
    { event: "telemetry.alert", url: "https://ops.internal.net/alerts", status: 200, latency: "18ms" },
    { event: "audit.tamper_check", url: "https://audit.soc2.org/log", status: 500, latency: "210ms" },
  ];

  return (
    <div className={cn("w-full max-w-4xl mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-neutral-900 dark:text-white mb-4">Webhook Delivery Stream</h3>
      <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
        {deliveries.map((d, idx) => (
          <div key={idx} className="p-3 flex items-center justify-between">
            <div>
              <span className="font-bold text-neutral-900 dark:text-white">{d.event}</span>
              <span className="text-neutral-400 text-[11px] ml-2 truncate">{d.url}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-neutral-400 text-[11px]">{d.latency}</span>
              <span className={cn("px-2 py-0.5 rounded font-bold text-[10px]", d.status === 200 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" : "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300")}>
                HTTP {d.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

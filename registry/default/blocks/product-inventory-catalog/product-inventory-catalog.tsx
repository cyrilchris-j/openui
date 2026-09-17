"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function ProductInventoryCatalog({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const items = [
    { sku: "OPUI-TEE-BLK", name: "Engineer Tee", stock: 142, status: "In Stock" },
    { sku: "OPUI-HOOD-GRY", name: "Architecture Hoodie", stock: 8, status: "Low Stock" },
  ];

  return (
    <div className={cn("w-full max-w-3xl mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-neutral-900 dark:text-white mb-3">Warehouse Stock</h3>
      <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
        {items.map((it) => (
          <div key={it.sku} className="p-3 flex items-center justify-between">
            <div>
              <span className="text-neutral-400">{it.sku}</span>
              <span className="font-bold text-neutral-900 dark:text-white ml-2">{it.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span>{it.stock} units</span>
              <span className={it.stock < 10 ? "text-amber-500 font-bold" : "text-emerald-500 font-bold"}>{it.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

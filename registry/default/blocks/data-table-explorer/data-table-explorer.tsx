"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface DataRow {
  id: string;
  name: string;
  category: string;
  status: "Active" | "Pending" | "Failed";
  latency: number;
}

const ROWS: DataRow[] = [
  { id: "res_01", name: "SplitHeadlineHero", category: "Sections", status: "Active", latency: 12 },
  { id: "res_02", name: "MagneticButton", category: "Interactions", status: "Active", latency: 8 },
  { id: "res_03", name: "CyberpunkNoise", category: "Backgrounds", status: "Pending", latency: 24 },
  { id: "res_04", name: "HolyGrailLayout", category: "Layouts", status: "Active", latency: 14 },
  { id: "res_05", name: "ParticleExplosion", category: "Motion", status: "Active", latency: 18 },
];

export function DataTableExplorer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [query, setQuery] = React.useState("");
  const [selected, setSelected] = React.useState<string[]>([]);

  const filtered = ROWS.filter((r) =>
    r.name.toLowerCase().includes(query.toLowerCase()) ||
    r.category.toLowerCase().includes(query.toLowerCase())
  );

  const toggleSelect = (id: string) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <div className="flex items-center justify-between gap-4 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter resources..."
          className="px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-xs text-neutral-900 dark:text-white"
        />
        <div className="text-neutral-400 text-[11px]">{selected.length} of {ROWS.length} selected</div>
      </div>

      <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 bg-neutral-50 dark:bg-neutral-900 p-3 font-bold border-b border-neutral-200 dark:border-neutral-800 text-neutral-500">
          <div className="col-span-1">#</div>
          <div className="col-span-4">Resource</div>
          <div className="col-span-3">Category</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2 text-right">Latency</div>
        </div>
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {filtered.map((r) => {
            const isChecked = selected.includes(r.id);
            return (
              <div key={r.id} className={cn("grid grid-cols-12 p-3 items-center hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30", isChecked && "bg-emerald-50/30 dark:bg-emerald-950/20")}>
                <div className="col-span-1">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleSelect(r.id)}
                    className="accent-emerald-500 cursor-pointer"
                  />
                </div>
                <div className="col-span-4 font-bold text-neutral-900 dark:text-neutral-100">{r.name}</div>
                <div className="col-span-3 text-neutral-500">{r.category}</div>
                <div className="col-span-2 text-emerald-600 dark:text-emerald-400 font-semibold">{r.status}</div>
                <div className="col-span-2 text-right text-neutral-400">{r.latency}ms</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

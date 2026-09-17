"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function HardwareEdgeSpecs({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const specs = [
    { label: "NVMe Write IOPS", val: "1.2M IOPS" },
    { label: "Memory Isolation", val: "128MB / V8 isolate" },
    { label: "Network Bandwidth", val: "100 Gbps per cluster" },
    { label: "Cold Start Latency", val: "0.4 ms" },
  ];

  return (
    <section className={cn("w-full py-16 px-4 max-w-5xl mx-auto font-mono", className)} {...props}>
      <h3 className="text-xs uppercase tracking-widest text-neutral-400 font-bold mb-6">Cluster Hardware</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {specs.map((s) => (
          <div key={s.label} className="p-4 border border-neutral-800 bg-neutral-950 text-neutral-100 rounded">
            <div className="text-[10px] text-neutral-500 uppercase">{s.label}</div>
            <div className="text-xl font-bold mt-1">{s.val}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

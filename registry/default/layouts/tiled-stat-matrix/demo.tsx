"use client";

import { TiledStatMatrix } from "./tiled-stat-matrix";

export default function TiledStatMatrixDemo() {
  const metrics = [
    { label: "Active Nodes", val: "1,048" },
    { label: "Uptime", val: "99.99%" },
    { label: "Throughput", val: "4.8 GB/s" },
    { label: "Error Rate", val: "0.001%" },
  ];

  return (
    <TiledStatMatrix>
      {metrics.map((m) => (
        <div key={m.label} className="p-4 rounded-xl border border-line bg-surface/30">
          <div className="text-[11px] font-mono text-ink/60">{m.label}</div>
          <div className="text-xl font-bold font-mono text-ink mt-1">{m.val}</div>
        </div>
      ))}
    </TiledStatMatrix>
  );
}

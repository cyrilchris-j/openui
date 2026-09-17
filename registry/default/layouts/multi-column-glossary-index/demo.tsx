"use client";

import { MultiColumnGlossaryIndex } from "./multi-column-glossary-index";

export default function MultiColumnGlossaryIndexDemo() {
  return (
    <MultiColumnGlossaryIndex>
      <div className="space-y-2">
        <div className="text-lg font-bold font-mono text-accent">A</div>
        <div className="p-2.5 rounded border border-line bg-paper"><strong>Axonometric</strong>: 3D projection without perspective convergence.</div>
      </div>
      <div className="space-y-2">
        <div className="text-lg font-bold font-mono text-accent">B</div>
        <div className="p-2.5 rounded border border-line bg-paper"><strong>Bento Grid</strong>: Modular rectangular container matrix.</div>
      </div>
      <div className="space-y-2">
        <div className="text-lg font-bold font-mono text-accent">C</div>
        <div className="p-2.5 rounded border border-line bg-paper"><strong>Closed Schema</strong>: Strict compile-time type validation.</div>
      </div>
    </MultiColumnGlossaryIndex>
  );
}

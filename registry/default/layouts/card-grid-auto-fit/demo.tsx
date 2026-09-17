"use client";

import { CardGridAutoFit } from "./card-grid-auto-fit";

export default function CardGridAutoFitDemo() {
  return (
    <CardGridAutoFit>
      {[1, 2, 3, 4].map((id) => (
        <div key={id} className="p-4 rounded-xl border border-line bg-surface/40">
          <div className="font-mono text-xs font-bold text-ink">Entity #{id}</div>
          <p className="text-xs text-ink/60 mt-1">Auto-fitting fluid grid cell.</p>
        </div>
      ))}
    </CardGridAutoFit>
  );
}

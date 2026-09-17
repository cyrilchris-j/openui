"use client";

import { IsometricShelfGrid } from "./isometric-shelf-grid";

export default function IsometricShelfGridDemo() {
  return (
    <IsometricShelfGrid>
      {[1, 2, 3].map((s) => (
        <div key={s} className="p-6 rounded-xl border border-line bg-surface/50 shadow-md [transform:rotateX(10deg)_rotateY(-5deg)]">
          <div className="font-mono text-xs font-bold text-accent">Artifact #{s}</div>
          <p className="text-xs text-ink/60 mt-1">Isometric showcase shelf display card.</p>
        </div>
      ))}
    </IsometricShelfGrid>
  );
}

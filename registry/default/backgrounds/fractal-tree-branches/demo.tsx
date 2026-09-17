"use client";

import { FractalTreeBranches } from "./fractal-tree-branches";

export default function FractalTreeBranchesDemo() {
  return (
    <FractalTreeBranches className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-sans text-ink">Recursive Arbor</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Procedural fractal tree branching arbor.</p>
      </div>
    </FractalTreeBranches>
  );
}

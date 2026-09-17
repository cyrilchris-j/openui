"use client";

import { MatrixBinaryCurtain } from "./matrix-binary-curtain";

export default function MatrixBinaryCurtainDemo() {
  return (
    <MatrixBinaryCurtain className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-emerald-500/30 bg-black/70 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-emerald-400">Binary Curtain</h3>
        <p className="text-xs text-white/70 mt-1 font-mono">Structured columns of binary code bits.</p>
      </div>
    </MatrixBinaryCurtain>
  );
}

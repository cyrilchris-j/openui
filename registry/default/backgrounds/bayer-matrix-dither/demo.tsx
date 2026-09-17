"use client";

import { BayerMatrixDither } from "./bayer-matrix-dither";

export default function BayerMatrixDitherDemo() {
  return (
    <BayerMatrixDither className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-ink">Bayer Ordered Dither</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Classic 1-bit threshold quantization grid.</p>
      </div>
    </BayerMatrixDither>
  );
}

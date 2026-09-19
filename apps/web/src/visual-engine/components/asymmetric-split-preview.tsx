import * as React from "react";

export function AsymmetricSplitPreview(): React.JSX.Element {
  const [splitRatio, setSplitRatio] = React.useState(50);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(25, Math.min(75, ((e.clientX - rect.left) / rect.width) * 100));
    setSplitRatio(pct);
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className="w-full h-full relative flex select-none overflow-hidden cursor-ew-resize bg-surface"
    >
      {/* Left panel: Dark editorial */}
      <div
        className="h-full bg-[#12141a] text-white p-4 flex flex-col justify-between overflow-hidden transition-all duration-75"
        style={{ width: `${splitRatio}%` }}
      >
        <span className="font-mono text-[9px] text-graphite uppercase tracking-widest">
          SIDE A // SWISS MINIMAL
        </span>
        <div>
          <h3 className="font-display font-bold text-xl leading-tight">ARCHITECTURAL</h3>
          <p className="font-mono text-[9px] text-white/50 mt-1">GRID 12-COL ASYMMETRY</p>
        </div>
        <span className="font-mono text-[9px] text-oxide">← DRAG TO EXPAND</span>
      </div>

      {/* Split Divider line */}
      <div className="w-1 h-full bg-oxide z-10 shadow-lg flex items-center justify-center">
        <div className="w-4 h-6 rounded-full bg-oxide border border-white flex items-center justify-center text-[8px] text-white">
          ↔
        </div>
      </div>

      {/* Right panel: Light editorial */}
      <div
        className="h-full bg-[#fcfbf7] text-ink p-4 flex flex-col justify-between overflow-hidden transition-all duration-75"
        style={{ width: `${100 - splitRatio}%` }}
      >
        <span className="font-mono text-[9px] text-graphite uppercase tracking-widest">
          SIDE B // SPECULAR CONTRAST
        </span>
        <div>
          <h3 className="font-serif italic text-xl leading-tight">TYPOGRAPHIC</h3>
          <p className="font-mono text-[9px] text-graphite mt-1">SERIF WITH OPTICAL SIZING</p>
        </div>
        <span className="font-mono text-[9px] text-ink font-semibold">99.4% PRECISION</span>
      </div>
    </div>
  );
}

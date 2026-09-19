import * as React from "react";

export function KineticEditorialPreview(): React.JSX.Element {
  const [hoveredChar, setHoveredChar] = React.useState<number | null>(null);

  const headline = "KINETIC MOTION";

  return (
    <div className="w-full h-full p-4 flex flex-col justify-between select-none relative overflow-hidden bg-paper/90">
      {/* Top micro-bar */}
      <div className="flex items-center justify-between border-b border-line/40 pb-2">
        <span className="font-mono text-[10px] text-graphite uppercase tracking-widest">
          ISSUE 04 • EDITORIAL
        </span>
        <span className="px-2 py-0.5 rounded-full border border-oxide/40 bg-oxide/10 font-mono text-[9px] text-oxide">
          ✦ ACTIVE TICKER
        </span>
      </div>

      {/* Main Kinetic Headline */}
      <div className="my-auto py-2 text-center">
        <div className="flex items-center justify-center gap-1">
          {headline.split("").map((char, i) => (
            <span
              key={i}
              onMouseEnter={() => setHoveredChar(i)}
              onMouseLeave={() => setHoveredChar(null)}
              className={`font-display font-bold text-2xl sm:text-3xl transition-all duration-200 cursor-pointer ${
                hoveredChar === i
                  ? "text-oxide -translate-y-1 scale-110"
                  : "text-ink hover:text-oxide"
              }`}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>
        <p className="mt-1 font-mono text-[10px] text-graphite uppercase tracking-widest">
          HIGH-VELOCITY TYPOGRAPHY WITH SPRING PHYSICS
        </p>
      </div>

      {/* Marquee Ticker */}
      <div className="border-t border-line/40 pt-2 overflow-hidden whitespace-nowrap flex items-center">
        <div className="inline-flex gap-6 animate-marquee font-mono text-[10px] text-ink uppercase tracking-wider">
          <span>⚡ FLUID SPRING PHYSICS</span>
          <span>◈ 3D SPATIAL RUNTIME</span>
          <span>✦ 220+ ADVANCED ASSETS</span>
          <span>⚡ FLUID SPRING PHYSICS</span>
          <span>◈ 3D SPATIAL RUNTIME</span>
        </div>
      </div>
    </div>
  );
}

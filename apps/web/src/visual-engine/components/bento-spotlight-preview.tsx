import * as React from "react";
import { SpotlightCard } from "../hover/surface-hover.js";

export function BentoSpotlightPreview(): React.JSX.Element {
  const [pulse, setPulse] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setPulse((p) => (p + 1) % 100);
    }, 150);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full p-3 grid grid-cols-2 gap-2 select-none bg-surface/50">
      {/* Bento Cell 1: Main Spotlight */}
      <SpotlightCard className="col-span-2 p-3 bg-paper/80 flex items-center justify-between">
        <div>
          <span className="font-mono text-[9px] text-oxide uppercase font-semibold">
            ✦ BENTO SPOTLIGHT
          </span>
          <h4 className="font-display text-xs font-bold text-ink mt-0.5">
            Dynamic Radial Proximity
          </h4>
        </div>
        <div className="w-6 h-6 rounded-full border border-oxide/50 bg-oxide/10 flex items-center justify-center font-mono text-[10px] text-oxide animate-pulse">
          ⚡
        </div>
      </SpotlightCard>

      {/* Bento Cell 2: Live telemetry */}
      <SpotlightCard className="p-2.5 bg-paper/80 flex flex-col justify-between">
        <span className="font-mono text-[8px] text-graphite uppercase">FPS / TELEMETRY</span>
        <div className="flex items-baseline gap-1 my-1">
          <span className="font-mono text-base font-bold text-ink">120</span>
          <span className="font-mono text-[9px] text-moss">STABLE</span>
        </div>
        <div className="w-full h-1.5 bg-line/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-moss rounded-full transition-all duration-150"
            style={{ width: `${85 + (pulse % 12)}%` }}
          />
        </div>
      </SpotlightCard>

      {/* Bento Cell 3: Live sparkline */}
      <SpotlightCard className="p-2.5 bg-paper/80 flex flex-col justify-between">
        <span className="font-mono text-[8px] text-graphite uppercase">LATENCY</span>
        <div className="flex items-baseline gap-1 my-1">
          <span className="font-mono text-base font-bold text-ink">1.2</span>
          <span className="font-mono text-[9px] text-graphite">ms</span>
        </div>
        <div className="flex items-end gap-1 h-3">
          {[4, 8, 12, 7, 10, 6, 11, 9].map((val, i) => (
            <div
              key={i}
              className="flex-1 bg-oxide rounded-xs transition-all duration-150"
              style={{ height: `${val + (i === pulse % 8 ? 4 : 0)}px` }}
            />
          ))}
        </div>
      </SpotlightCard>
    </div>
  );
}

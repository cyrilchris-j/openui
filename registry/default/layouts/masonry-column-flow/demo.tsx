import { cn } from "@/lib/cn";
import { MasonryColumnFlow } from "./masonry-column-flow";

export default function MasonryColumnFlowDemo() {
  const heights = ["h-32", "h-48", "h-40", "h-56", "h-36", "h-44"];
  return (
    <MasonryColumnFlow>
      {heights.map((h, i) => (
        <div
          key={i}
          className={cn("p-4 rounded-xl border border-line bg-surface/30 break-inside-avoid flex flex-col justify-between", h)}
        >
          <span className="font-mono text-xs font-bold text-ink">Tile #{i + 1}</span>
          <span className="text-[11px] text-ink/60 font-sans">Variable height masonry card container.</span>
        </div>
      ))}
    </MasonryColumnFlow>
  );
}

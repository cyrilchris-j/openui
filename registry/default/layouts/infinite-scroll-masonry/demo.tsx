import { cn } from "@/lib/cn";
import { InfiniteScrollMasonry } from "./infinite-scroll-masonry";

export default function InfiniteScrollMasonryDemo() {
  return (
    <InfiniteScrollMasonry>
      {[40, 24, 32, 48, 28, 36].map((h, i) => (
        <div key={i} className={cn("p-4 rounded-xl border border-line bg-surface/30 break-inside-avoid text-xs font-mono", `h-${h}`)}>
          Card #{i + 1}
        </div>
      ))}
    </InfiniteScrollMasonry>
  );
}

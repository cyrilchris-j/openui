import * as React from "react";
import { Link } from "react-router";

import type { RegistryIndexEntry } from "@openui/types";
import { Skeleton } from "@openui/ui";

import { useInView } from "../hooks/use-in-view.js";
import { useRegistryItem } from "../features/resources/use-catalogue.js";

/**
 * Lazy tile preview.
 *
 * A catalogue of 800 live demos cannot mount 800 sandboxes; it cannot even
 * *fetch* 800 artifacts. This component renders a metadata-only tile until it
 * scrolls within one viewport of visibility, then loads the item artifact and
 * renders the real demo in the isolated iframe. When the tile leaves the
 * viewport the iframe is not torn down (scroll thrash would cost more than the
 * idle frame), but the underlying loop-driven demos pause themselves via
 * `use-canvas-loop`'s IntersectionObserver and the document visibility rules.
 *
 * The catalogue's performance contract is therefore enforced in layers:
 * metadata is cheap and instant; source is fetched on approach; heavy frames
 * only run while visible.
 */
const TileSandbox = React.lazy(() =>
  import("../features/playground/TileSandbox.js").then((module) => ({
    default: module.TileSandbox,
  })),
);

export function TilePreview({ item }: { item: RegistryIndexEntry }): React.JSX.Element {
  const { ref, inView } = useInView<HTMLDivElement>({ once: true, rootMargin: "200px" });

  return (
    <div ref={ref} className="border-b border-line overflow-hidden pointer-events-none select-none">
      {inView ? (
        <React.Suspense fallback={<PreviewSkeleton />}>
          <TileSandbox name={item.name} />
        </React.Suspense>
      ) : (
        <Link
          to={`/${item.category}/${item.name}`}
          className="flex h-44 items-end bg-ink/[0.02] p-4"
          tabIndex={-1}
          aria-hidden
        >
          <span className="eyebrow text-[10px] text-graphite/70">scroll to preview</span>
        </Link>
      )}
    </div>
  );
}

function PreviewSkeleton(): React.JSX.Element {
  return (
    <div className="flex h-44 items-center justify-center bg-ink/[0.02]">
      <Skeleton lines={3} />
    </div>
  );
}

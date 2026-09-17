"use client";

import { SplitSearchFilterMap } from "./split-search-filter-map";

export default function SplitSearchFilterMapDemo() {
  return (
    <SplitSearchFilterMap
      filters={<div>Filter Facets</div>}
      results={<div className="p-3 rounded-lg border border-line bg-surface/30">Listing Item A</div>}
      map={<div className="font-mono text-ink/60">Spatial Map</div>}
    />
  );
}

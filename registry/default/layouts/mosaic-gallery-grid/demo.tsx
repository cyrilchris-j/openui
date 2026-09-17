"use client";

import { MosaicGalleryGrid } from "./mosaic-gallery-grid";

export default function MosaicGalleryGridDemo() {
  return (
    <MosaicGalleryGrid>
      <div className="col-span-2 row-span-2 h-64 rounded-xl border border-line bg-surface/50 flex items-center justify-center font-mono text-xs">
        Feature Image 2x2
      </div>
      <div className="h-30 rounded-xl border border-line bg-surface/30 flex items-center justify-center font-mono text-xs">
        Tile 1x1
      </div>
      <div className="h-30 rounded-xl border border-line bg-surface/30 flex items-center justify-center font-mono text-xs">
        Tile 1x1
      </div>
      <div className="col-span-2 h-30 rounded-xl border border-line bg-surface/40 flex items-center justify-center font-mono text-xs">
        Panoramic Tile 2x1
      </div>
    </MosaicGalleryGrid>
  );
}

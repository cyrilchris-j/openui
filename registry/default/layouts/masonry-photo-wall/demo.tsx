"use client";

import { MasonryPhotoWall } from "./masonry-photo-wall";

export default function MasonryPhotoWallDemo() {
  return (
    <MasonryPhotoWall>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="h-32 bg-surface/40 border border-line/40 flex items-center justify-center font-mono text-[11px] text-ink/50">
          Photo #{i + 1}
        </div>
      ))}
    </MasonryPhotoWall>
  );
}

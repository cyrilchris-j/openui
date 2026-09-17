"use client";

import { MediaGalleryLightbox } from "./media-gallery-lightbox";

export default function MediaGalleryLightboxDemo() {
  return (
    <MediaGalleryLightbox feature={<span>Featured Image Viewport</span>}>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-16 rounded-lg border border-line bg-surface/30 flex items-center justify-center text-xs font-mono">
          #{i}
        </div>
      ))}
    </MediaGalleryLightbox>
  );
}

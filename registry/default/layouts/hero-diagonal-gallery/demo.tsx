"use client";

import { HeroDiagonalGallery } from "./hero-diagonal-gallery";

export default function HeroDiagonalGalleryDemo() {
  return (
    <HeroDiagonalGallery
      headline={
        <div className="space-y-2">
          <h1 className="text-xl font-bold text-ink">Modern Component Architecture</h1>
          <p className="text-xs text-ink/70">800 unique resources categorized into 8 domains.</p>
        </div>
      }
    >
      <div className="w-32 h-64 rounded-xl border border-line bg-surface/80 shrink-0" />
      <div className="w-32 h-64 rounded-xl border border-line bg-surface/80 shrink-0" />
    </HeroDiagonalGallery>
  );
}

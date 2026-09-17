"use client";

import { PanoramicHeroBanner } from "./panoramic-hero-banner";

export default function PanoramicHeroBannerDemo() {
  return (
    <PanoramicHeroBanner
      overlay={
        <div>
          <h1 className="text-base font-bold font-serif text-ink">Cinematic Registry</h1>
          <p className="text-xs text-ink/60 mt-1">Panoramic presentation format.</p>
        </div>
      }
    />
  );
}

"use client";

import { CelestialZodiacMap } from "./celestial-zodiac-map";

export default function CelestialZodiacMapDemo() {
  return (
    <CelestialZodiacMap className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-serif text-ink">Celestial Meridian</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Astrological constellation chart meridians.</p>
      </div>
    </CelestialZodiacMap>
  );
}

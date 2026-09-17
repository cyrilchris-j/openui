"use client";

import { GeometricArabesqueStars } from "./geometric-arabesque-stars";

export default function GeometricArabesqueStarsDemo() {
  return (
    <GeometricArabesqueStars className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-serif text-ink">Arabesque Stars</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">8-pointed rotational star strapwork tessellation.</p>
      </div>
    </GeometricArabesqueStars>
  );
}

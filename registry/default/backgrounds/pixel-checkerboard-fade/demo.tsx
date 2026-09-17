"use client";

import { PixelCheckerboardFade } from "./pixel-checkerboard-fade";

export default function PixelCheckerboardFadeDemo() {
  return (
    <PixelCheckerboardFade className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-ink">Pixel Checkerboard</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">8-bit retro gaming tiled dither pattern.</p>
      </div>
    </PixelCheckerboardFade>
  );
}

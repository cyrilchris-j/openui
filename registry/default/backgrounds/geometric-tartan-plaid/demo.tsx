"use client";

import { GeometricTartanPlaid } from "./geometric-tartan-plaid";

export default function GeometricTartanPlaidDemo() {
  return (
    <GeometricTartanPlaid className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-serif text-ink">Heritage Tartan</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Multi-stripe highland wool woven plaid.</p>
      </div>
    </GeometricTartanPlaid>
  );
}

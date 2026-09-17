"use client";

import { HeroCalloutGrid } from "./hero-callout-grid";

export default function HeroCalloutGridDemo() {
  return (
    <HeroCalloutGrid>
      <div className="p-6 rounded-2xl border border-line bg-surface/30 text-xs">Feature A</div>
      <div className="p-8 rounded-2xl border-2 border-accent bg-paper shadow-md text-xs">Featured Hub</div>
      <div className="p-6 rounded-2xl border border-line bg-surface/30 text-xs">Feature C</div>
    </HeroCalloutGrid>
  );
}

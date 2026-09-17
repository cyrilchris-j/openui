"use client";

import { CardDeckTabs } from "./card-deck-tabs";

export default function CardDeckTabsDemo() {
  return (
    <CardDeckTabs
      tabs={
        <>
          <button type="button" className="px-3 py-1 rounded-t-lg bg-paper border-t border-x border-line font-bold text-accent">Active Tab</button>
          <button type="button" className="px-3 py-1 text-ink/60">Alternate Tab</button>
        </>
      }
    >
      <div className="text-ink/80">Swappable card sheet viewport contents.</div>
    </CardDeckTabs>
  );
}

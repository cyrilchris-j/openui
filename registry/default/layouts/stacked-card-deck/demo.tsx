"use client";

import { StackedCardDeck } from "./stacked-card-deck";

export default function StackedCardDeckDemo() {
  return (
    <StackedCardDeck>
      {[1, 2, 3].map((card) => (
        <div key={card} className="p-6 rounded-2xl border border-line bg-paper shadow-sm">
          <div className="font-mono text-xs font-bold text-accent mb-1">Layer 0{card}</div>
          <h3 className="text-sm font-bold text-ink">Procedural Composition Card</h3>
          <p className="text-xs text-ink/60 mt-1">Self-contained card block with responsive bounds.</p>
        </div>
      ))}
    </StackedCardDeck>
  );
}

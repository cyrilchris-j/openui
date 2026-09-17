"use client";

import { StackedFeatureCards } from "./stacked-feature-cards";

export default function StackedFeatureCardsDemo() {
  return (
    <StackedFeatureCards>
      <div className="p-8 rounded-3xl border border-line bg-surface/30">
        <h3 className="text-base font-bold text-ink">Feature Card 01</h3>
        <p className="text-xs text-ink/60 mt-1">Autonomous registration pipeline.</p>
      </div>
    </StackedFeatureCards>
  );
}

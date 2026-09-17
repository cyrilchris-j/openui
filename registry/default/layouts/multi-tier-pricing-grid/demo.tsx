"use client";

import { MultiTierPricingGrid } from "./multi-tier-pricing-grid";

export default function MultiTierPricingGridDemo() {
  return (
    <MultiTierPricingGrid>
      <div className="p-6 rounded-2xl border border-line bg-paper text-xs">
        <h3 className="font-bold text-sm mb-1">Starter</h3>
        <p className="text-xl font-bold font-mono my-2">$0</p>
      </div>
      <div className="p-6 rounded-2xl border-2 border-accent bg-paper shadow-lg text-xs">
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent text-white uppercase font-bold">Recommended</span>
        <h3 className="font-bold text-sm mt-2 mb-1">Pro Architect</h3>
        <p className="text-xl font-bold font-mono my-2">$29<span className="text-xs font-normal">/mo</span></p>
      </div>
      <div className="p-6 rounded-2xl border border-line bg-paper text-xs">
        <h3 className="font-bold text-sm mb-1">Enterprise</h3>
        <p className="text-xl font-bold font-mono my-2">Custom</p>
      </div>
    </MultiTierPricingGrid>
  );
}

"use client";

import { SplitPricingCalculator } from "./split-pricing-calculator";

export default function SplitPricingCalculatorDemo() {
  return (
    <SplitPricingCalculator
      controls={
        <div>
          <h3 className="text-sm font-bold text-ink">Estimate Cloud Compute</h3>
          <p className="text-xs text-ink/60 mt-1">Adjust server instances and storage quotas.</p>
        </div>
      }
      receipt={
        <div>
          <div className="text-ink/60">Estimated Monthly Total</div>
          <div className="text-2xl font-bold text-accent mt-1">$142.50</div>
        </div>
      }
    />
  );
}

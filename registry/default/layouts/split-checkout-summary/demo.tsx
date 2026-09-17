"use client";

import { SplitCheckoutSummary } from "./split-checkout-summary";

export default function SplitCheckoutSummaryDemo() {
  return (
    <SplitCheckoutSummary
      form={
        <div>
          <h3 className="text-sm font-bold text-ink mb-2">Shipping Information</h3>
          <input type="text" placeholder="Street Address" className="w-full px-3 py-2 rounded-lg border border-line bg-paper text-xs" />
        </div>
      }
      summary={
        <div className="text-xs">
          <div className="font-bold text-ink mb-2">Order Summary</div>
          <div className="flex justify-between py-1 text-ink/70"><span>Components Pack</span><span>$49.00</span></div>
          <div className="flex justify-between py-1 text-ink/70"><span>Taxes</span><span>$4.90</span></div>
          <div className="flex justify-between pt-2 border-t border-line font-bold text-ink"><span>Total</span><span>$53.90</span></div>
        </div>
      }
    />
  );
}

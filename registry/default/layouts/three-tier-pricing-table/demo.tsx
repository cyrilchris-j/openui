"use client";

import { ThreeTierPricingTable } from "./three-tier-pricing-table";

export default function ThreeTierPricingTableDemo() {
  return (
    <ThreeTierPricingTable>
      <div className="grid grid-cols-4 p-4 border-b border-line font-bold font-mono">
        <span>Plan</span>
        <span className="text-center">Free</span>
        <span className="text-center text-accent">Pro</span>
        <span className="text-center">Team</span>
      </div>
      <div className="grid grid-cols-4 p-4 border-b border-line/50">
        <span>Monthly Cost</span>
        <span className="text-center font-mono">$0</span>
        <span className="text-center font-mono font-bold text-accent">$29</span>
        <span className="text-center font-mono">$99</span>
      </div>
    </ThreeTierPricingTable>
  );
}

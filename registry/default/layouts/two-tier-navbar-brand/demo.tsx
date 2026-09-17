"use client";

import { TwoTierNavbarBrand } from "./two-tier-navbar-brand";

export default function TwoTierNavbarBrandDemo() {
  return (
    <TwoTierNavbarBrand
      topStrip={<span>Status: Operational • Global CDN Edge</span>}
      mainNav={<span className="font-bold text-sm">OPENUI REGISTRY</span>}
    >
      <div className="text-xs text-ink/70">Main content area below double-decker navbar.</div>
    </TwoTierNavbarBrand>
  );
}

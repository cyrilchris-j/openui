"use client";

import { EditorialMagazineGrid } from "./editorial-magazine-grid";

export default function EditorialMagazineGridDemo() {
  return (
    <div className="w-full border border-line rounded-xl overflow-hidden shadow-sm">
      <EditorialMagazineGrid
        headline={<h1 className="text-2xl font-bold tracking-tight">The Geometry of Autonomous Design Systems</h1>}
        lede={<p>Standardization enables velocity, but rigid homogenization drains character. Here is the framework for procedural divergence.</p>}
        story={
          <p>Every interface should have a fingerprint. When components are authored as pure algebraic compositions rather than ad-hoc templates, consistency arises organically without sacrificing visual delight.</p>
        }
        aside={<div>PUBLISHED IN VOL. 04<br />CURATED BY OPENUI REGISTRY</div>}
      />
    </div>
  );
}

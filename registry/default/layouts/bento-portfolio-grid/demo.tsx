"use client";

import { BentoPortfolioGrid } from "./bento-portfolio-grid";

export default function BentoPortfolioGridDemo() {
  return (
    <BentoPortfolioGrid>
      <div className="md:col-span-2 p-6 rounded-2xl border border-line bg-surface/40">
        <h3 className="text-sm font-bold font-serif text-ink">Autonomous Design Ecosystem</h3>
        <p className="text-xs text-ink/60 mt-1">Featured architecture study.</p>
      </div>
      <div className="p-6 rounded-2xl border border-line bg-surface/30">
        <h4 className="text-xs font-bold text-ink">Design Lead</h4>
        <p className="text-xs text-ink/60 mt-1">Elena Rostova</p>
      </div>
    </BentoPortfolioGrid>
  );
}

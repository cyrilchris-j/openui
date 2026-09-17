"use client";

import { CarouselHeroStage } from "./carousel-hero-stage";

export default function CarouselHeroStageDemo() {
  return (
    <CarouselHeroStage controls={<div className="font-mono text-xs text-accent">● ○ ○</div>}>
      <div className="text-center">
        <h2 className="text-lg font-bold text-ink">Featured Release: 800 Resource Master Catalogue</h2>
        <p className="text-xs text-ink/60 mt-1">Zero placeholders • Complete standalone React components</p>
      </div>
    </CarouselHeroStage>
  );
}

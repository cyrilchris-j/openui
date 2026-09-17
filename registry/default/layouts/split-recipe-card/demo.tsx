"use client";

import { SplitRecipeCard } from "./split-recipe-card";

export default function SplitRecipeCardDemo() {
  return (
    <SplitRecipeCard
      ingredients={
        <div className="text-xs space-y-1">
          <div className="font-bold mb-2">Ingredients</div>
          <div>• 100 Components</div>
          <div>• 100 Text Presets</div>
          <div>• 100 Motion Models</div>
        </div>
      }
      instructions={
        <div>
          <h3 className="text-sm font-bold text-ink mb-1">Preparation</h3>
          <p className="text-xs text-ink/70 leading-relaxed">Combine closed design DNA enums with behavioral fingerprints.</p>
        </div>
      }
    />
  );
}

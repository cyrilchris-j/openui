"use client";

import { MultiStepFormRail } from "./multi-step-form-rail";

export default function MultiStepFormRailDemo() {
  return (
    <MultiStepFormRail
      rail={
        <div className="text-xs space-y-2">
          <div className="font-bold text-accent">1. Project Basics ✓</div>
          <div className="font-semibold text-ink">2. Design DNA Specs</div>
          <div className="text-ink/50">3. Verification Pipeline</div>
        </div>
      }
    >
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-ink">Configure Design DNA</h3>
        <p className="text-xs text-ink/60">Choose closed enums for typography, density, and macrostructure.</p>
      </div>
    </MultiStepFormRail>
  );
}

"use client";

import { StepperJourneyMap } from "./stepper-journey-map";

export default function StepperJourneyMapDemo() {
  return (
    <StepperJourneyMap>
      {["Discover", "Evaluate", "Install", "Automate"].map((stage, i) => (
        <div key={stage} className="p-4 rounded-xl border border-line bg-paper space-y-1">
          <div className="font-mono text-[10px] text-accent font-bold">Stage 0{i + 1}</div>
          <div className="font-bold text-ink">{stage}</div>
          <p className="text-[11px] text-ink/60">Touchpoint interactions and state telemetry.</p>
        </div>
      ))}
    </StepperJourneyMap>
  );
}

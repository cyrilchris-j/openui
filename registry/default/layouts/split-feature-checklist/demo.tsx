"use client";

import { SplitFeatureChecklist } from "./split-feature-checklist";

export default function SplitFeatureChecklistDemo() {
  return (
    <SplitFeatureChecklist
      pitch={
        <div>
          <h3 className="text-lg font-bold text-ink">Built for Speed and Rigor</h3>
          <p className="text-xs text-ink/60 mt-1">Autonomous registry infrastructure.</p>
        </div>
      }
    />
  );
}

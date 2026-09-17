"use client";

import { OnboardingFlowShell } from "./onboarding-flow-shell";

export default function OnboardingFlowShellDemo() {
  return (
    <OnboardingFlowShell
      stepIndicator={<div className="font-mono text-xs text-accent">● ○ ○</div>}
      actions={<button type="button" className="w-full py-2 rounded-xl bg-accent text-white font-mono text-xs font-bold">Next</button>}
    >
      <h3 className="text-base font-bold text-ink">Welcome to OpenUI</h3>
      <p className="text-xs text-ink/60 mt-1">Autonomous interface registration built for speed.</p>
    </OnboardingFlowShell>
  );
}

"use client";

import { StepperWizardShell } from "./stepper-wizard-shell";

export default function StepperWizardShellDemo() {
  return (
    <StepperWizardShell
      stepper={<div className="font-mono text-xs text-accent font-semibold">Step 2 of 4 — Organization Credentials</div>}
      actions={<button type="button" className="px-3 py-1.5 rounded bg-accent text-white font-mono text-xs">Continue</button>}
    >
      <div className="text-xs text-ink/70">Wizard form step fields and inputs.</div>
    </StepperWizardShell>
  );
}

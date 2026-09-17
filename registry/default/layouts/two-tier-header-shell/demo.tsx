"use client";

import { TwoTierHeaderShell } from "./two-tier-header-shell";

export default function TwoTierHeaderShellDemo() {
  return (
    <div className="w-full border border-line rounded-xl overflow-hidden shadow-sm">
      <TwoTierHeaderShell
        brand={<span>OPENUI CONSOLE</span>}
        utilities={<span className="text-xs font-mono text-ink/60">User: developer@openui.org</span>}
        tabs={
          <>
            <span className="text-accent font-semibold border-b-2 border-accent pb-1">Deployments</span>
            <span className="text-ink/60">Analytics</span>
            <span className="text-ink/60">Settings</span>
          </>
        }
      >
        <div className="p-4 rounded-lg bg-surface/30 border border-line text-xs font-mono">
          Tier 2 sub-navigation active viewport.
        </div>
      </TwoTierHeaderShell>
    </div>
  );
}

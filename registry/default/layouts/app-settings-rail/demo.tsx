"use client";

import { AppSettingsRail } from "./app-settings-rail";

export default function AppSettingsRailDemo() {
  return (
    <AppSettingsRail
      nav={
        <div className="text-xs space-y-1">
          <div className="p-2 rounded bg-accent/15 text-accent font-semibold">General</div>
          <div className="p-2 rounded text-ink/70 hover:bg-surface">Team Members</div>
          <div className="p-2 rounded text-ink/70 hover:bg-surface">API Credentials</div>
        </div>
      }
    >
      <div>
        <h3 className="text-sm font-bold text-ink mb-1">Organization Profile</h3>
        <p className="text-xs text-ink/60 mb-3">Manage public workspace presence and security tokens.</p>
        <div className="p-3 rounded-lg border border-line bg-surface/30 text-xs font-mono">Workspace: openui-core</div>
      </div>
    </AppSettingsRail>
  );
}

"use client";

import { DashboardShellLayout } from "./dashboard-shell-layout";

export default function DashboardShellLayoutDemo() {
  return (
    <div className="w-full border border-line rounded-xl overflow-hidden shadow-sm">
      <DashboardShellLayout
        sidebar={
          <div className="space-y-3 font-mono text-xs">
            <div className="font-bold text-accent">OPENUI ADMIN</div>
            <div className="text-ink/60">Overview</div>
            <div className="text-ink/60">Telemetry</div>
            <div className="text-ink/60">Registry Items</div>
          </div>
        }
        topbar={<div className="font-mono text-xs text-ink/70">Search commands or endpoints... (⌘K)</div>}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border border-line bg-surface/40">
            <div className="text-xs font-mono text-ink/60">API Latency</div>
            <div className="text-xl font-bold font-mono text-ink mt-1">24ms</div>
          </div>
          <div className="p-4 rounded-lg border border-line bg-surface/40">
            <div className="text-xs font-mono text-ink/60">Active Agents</div>
            <div className="text-xl font-bold font-mono text-ink mt-1">1,248</div>
          </div>
        </div>
      </DashboardShellLayout>
    </div>
  );
}

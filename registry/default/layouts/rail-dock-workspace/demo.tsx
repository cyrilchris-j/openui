"use client";

import { RailDockWorkspace } from "./rail-dock-workspace";

export default function RailDockWorkspaceDemo() {
  return (
    <div className="w-full border border-line rounded-xl overflow-hidden shadow-sm">
      <RailDockWorkspace
        rail={
          <div className="space-y-3 font-mono text-xs text-ink/70">
            <div>📁</div>
            <div>🔍</div>
            <div>⚡</div>
          </div>
        }
        drawer={<div className="font-mono text-xs text-ink/70">Files & Modules</div>}
      >
        <div className="font-mono text-xs text-ink/60">Primary Editor Stage</div>
      </RailDockWorkspace>
    </div>
  );
}

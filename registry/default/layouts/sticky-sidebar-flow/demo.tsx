"use client";

import { StickySidebarFlow } from "./sticky-sidebar-flow";

export default function StickySidebarFlowDemo() {
  return (
    <StickySidebarFlow
      sidebar={
        <div className="p-4 rounded-xl border border-line bg-surface/40 font-mono text-xs">
          <div className="font-bold mb-2">Quick Actions</div>
          <button type="button" className="w-full py-1.5 px-3 rounded bg-accent text-white font-semibold text-xs">
            Export Bundle
          </button>
        </div>
      }
    >
      <div className="space-y-3">
        <h2 className="text-base font-bold text-ink">Longform Document Flow</h2>
        <p className="text-xs text-ink/70 leading-relaxed">
          The main column flows naturally while the companion aside is held statically in view by native CSS sticky positioning.
        </p>
      </div>
    </StickySidebarFlow>
  );
}

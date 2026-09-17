"use client";

import { InteractiveNodeGraphLayout } from "./interactive-node-graph-layout";

export default function InteractiveNodeGraphLayoutDemo() {
  return (
    <InteractiveNodeGraphLayout toolbar={<span>+ Add Node | 🔍 100%</span>}>
      <div className="text-ink/40">Directed Acyclic Graph Canvas</div>
    </InteractiveNodeGraphLayout>
  );
}

"use client";

import { CompactInspectorPane } from "./compact-inspector-pane";

export default function CompactInspectorPaneDemo() {
  return (
    <CompactInspectorPane
      sceneTree={<div>Root Node<br />└ Camera<br />└ Mesh #1</div>}
      viewport={<div className="text-ink/40">3D Interactive Viewport</div>}
      inspector={<div>Transform<br />X: 0.00<br />Y: 1.50<br />Z: -4.20</div>}
    />
  );
}

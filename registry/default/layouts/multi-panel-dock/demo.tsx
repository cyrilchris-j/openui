"use client";

import { MultiPanelDock } from "./multi-panel-dock";

export default function MultiPanelDockDemo() {
  return (
    <MultiPanelDock
      editor={<div>// Active file: index.tsx</div>}
      dock={<div>Output: 0 errors, ready in 12ms</div>}
    />
  );
}

"use client";

import { TerminalSplitView } from "./terminal-split-view";

export default function TerminalSplitViewDemo() {
  return (
    <TerminalSplitView
      paneA={<div>[Server] Listening on http://localhost:5173</div>}
      paneB={<div>[Watcher] 800 modules compiled in 14ms</div>}
    />
  );
}

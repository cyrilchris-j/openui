"use client";

import { MultiPaneChatLayout } from "./multi-pane-chat-layout";

export default function MultiPaneChatLayoutDemo() {
  return (
    <MultiPaneChatLayout
      channels={<div className="font-mono"># general<br /># engineering<br /># design-dna</div>}
      messages={<div className="space-y-2"><div className="p-2 rounded bg-surface/50">Hey team, registry validation is green!</div></div>}
      members={<div className="font-mono text-ink/60">Members (4)</div>}
    />
  );
}

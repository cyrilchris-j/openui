"use client";

import { PinnedHeaderStickyFooter } from "./pinned-header-sticky-footer";

export default function PinnedHeaderStickyFooterDemo() {
  return (
    <PinnedHeaderStickyFooter
      header={<span>Process Pipeline</span>}
      footer={<span className="font-mono text-ink/60">Status: Running (4/4 complete)</span>}
    >
      <div className="space-y-2 text-xs">
        <p>Step 1: Ingest JSON Schema ✓</p>
        <p>Step 2: Validate Uniqueness Fingerprints ✓</p>
        <p>Step 3: Compile TypeScript AST Definitions ✓</p>
        <p>Step 4: Package Output Registry ✓</p>
      </div>
    </PinnedHeaderStickyFooter>
  );
}

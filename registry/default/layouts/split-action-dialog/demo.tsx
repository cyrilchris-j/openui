"use client";

import { SplitActionDialog } from "./split-action-dialog";

export default function SplitActionDialogDemo() {
  return (
    <SplitActionDialog
      visual={<div className="font-mono text-xs text-accent font-bold">Graphic Asset</div>}
      content={
        <div>
          <h3 className="text-sm font-bold text-ink mb-1">Confirm Deployment</h3>
          <p className="text-xs text-ink/60 mb-4">Promote release candidate v2.4.0 to production edge.</p>
          <button type="button" className="w-full py-1.5 rounded bg-accent text-white font-mono text-xs">Authorize</button>
        </div>
      }
    />
  );
}

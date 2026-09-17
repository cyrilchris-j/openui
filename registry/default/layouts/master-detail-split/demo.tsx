"use client";

import { MasterDetailSplit } from "./master-detail-split";

export default function MasterDetailSplitDemo() {
  return (
    <MasterDetailSplit
      master={
        <div className="space-y-1 text-xs">
          <div className="p-2 rounded bg-accent/15 text-accent font-semibold">Incident #1042 — Auth Spike</div>
          <div className="p-2 rounded text-ink/70 hover:bg-surface">Incident #1041 — DB Replica Lag</div>
          <div className="p-2 rounded text-ink/70 hover:bg-surface">Incident #1040 — Edge Cache Miss</div>
        </div>
      }
      detail={
        <div>
          <h3 className="text-sm font-bold text-ink">Incident #1042: Authentication Anomaly</h3>
          <p className="text-xs text-ink/60 mt-1">Severity: High • Region: US-East-1 • Resolved</p>
        </div>
      }
    />
  );
}

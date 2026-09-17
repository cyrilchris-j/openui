"use client";

import { SecurityAuditTrailStream } from "./security-audit-trail-stream";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] flex items-center justify-center p-4 bg-neutral-950">
      <SecurityAuditTrailStream />
    </div>
  );
}

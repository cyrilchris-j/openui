"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface AuditEvent {
  timestamp: string;
  actor: string;
  action: string;
  sha: string;
}

export interface SecurityAuditTrailStreamProps extends React.HTMLAttributes<HTMLElement> {
  events?: AuditEvent[];
}

const DEFAULT_EVENTS: AuditEvent[] = [
  { timestamp: "18:42:19 UTC", actor: "deploy-bot@prod", action: "DEPLOY_REGISTRY_V2.4", sha: "8f7a9d2" },
  { timestamp: "18:35:04 UTC", actor: "cyrilchris", action: "APPROVE_PULL_REQUEST_800", sha: "3c4e1b0" },
  { timestamp: "17:12:51 UTC", actor: "kms-system", action: "ROTATE_HARDWARE_M_TLS_CERTS", sha: "e9f02a4" },
  { timestamp: "15:08:12 UTC", actor: "auditor@soc2", action: "TAMPER_PROOF_CHECKSUM_PASS", sha: "01bc93f" },
];

export function SecurityAuditTrailStream({
  events = DEFAULT_EVENTS,
  className,
  ...props
}: SecurityAuditTrailStreamProps) {
  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-5xl mx-auto", className)} {...props}>
      <div className="bg-neutral-950 text-neutral-100 border border-neutral-800 rounded-xl p-5 font-mono text-xs">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold uppercase tracking-wider text-white">Live Audit Log Feed</span>
          </div>
          <span className="text-[10px] text-neutral-500">Tamper-Evident SHA-256 Ledger</span>
        </div>

        <div className="divide-y divide-neutral-900 mt-2">
          {events.map((e, idx) => (
            <div key={idx} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="text-neutral-500 text-[11px]">{e.timestamp}</span>
                <span className="text-emerald-400 font-bold">{e.actor}</span>
                <span className="text-neutral-200">{e.action}</span>
              </div>
              <span className="text-neutral-500 text-[10px] font-mono">sha:{e.sha}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { StackedNotificationCenter } from "./stacked-notification-center";

export default function StackedNotificationCenterDemo() {
  return (
    <StackedNotificationCenter
      header={
        <>
          <span className="font-bold text-ink">Inbox (2)</span>
          <button type="button" className="text-[11px] text-accent font-mono">Mark read</button>
        </>
      }
    >
      <div className="p-3 rounded-lg border border-line bg-surface/30">
        <span className="font-bold">Catalog Verified</span>
        <p className="text-ink/60 mt-0.5">800 of 800 items verified with zero errors.</p>
      </div>
    </StackedNotificationCenter>
  );
}

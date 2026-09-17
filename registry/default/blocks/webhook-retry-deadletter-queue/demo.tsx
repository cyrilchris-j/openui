"use client";

import { WebhookRetryDeadletterQueue } from "./webhook-retry-deadletter-queue";

export default function Demo() {
  return (
    <div className="w-full min-h-[250px] p-4 flex items-center justify-center bg-neutral-900">
      <WebhookRetryDeadletterQueue />
    </div>
  );
}

"use client";

import { BillingSubscriptionManager } from "./billing-subscription-manager";

export default function Demo() {
  return (
    <div className="w-full min-h-[400px] p-4 flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
      <BillingSubscriptionManager />
    </div>
  );
}

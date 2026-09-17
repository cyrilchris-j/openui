"use client";

import { OrderFulfillmentTracker } from "./order-fulfillment-tracker";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] p-4 flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
      <OrderFulfillmentTracker />
    </div>
  );
}

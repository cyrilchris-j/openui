"use client";

import { CustomerFeedbackSentiment } from "./customer-feedback-sentiment";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900/40">
      <CustomerFeedbackSentiment />
    </div>
  );
}

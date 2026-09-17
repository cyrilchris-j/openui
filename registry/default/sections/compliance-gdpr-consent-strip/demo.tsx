"use client";

import { ComplianceGdprConsentStrip } from "./compliance-gdpr-consent-strip";

export default function Demo() {
  return (
    <div className="w-full min-h-[200px] flex items-end justify-center bg-neutral-100 dark:bg-neutral-900">
      <ComplianceGdprConsentStrip />
    </div>
  );
}

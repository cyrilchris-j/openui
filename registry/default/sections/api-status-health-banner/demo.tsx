"use client";

import { ApiStatusHealthBanner } from "./api-status-health-banner";

export default function Demo() {
  return (
    <div className="w-full min-h-[250px] flex items-center justify-center p-4 bg-neutral-900">
      <ApiStatusHealthBanner />
    </div>
  );
}

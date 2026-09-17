"use client";

import { DeveloperSandboxEmbedCard } from "./developer-sandbox-embed-card";

export default function Demo() {
  return (
    <div className="w-full min-h-[250px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <DeveloperSandboxEmbedCard />
    </div>
  );
}

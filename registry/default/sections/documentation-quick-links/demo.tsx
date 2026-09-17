"use client";

import { DocumentationQuickLinks } from "./documentation-quick-links";

export default function Demo() {
  return (
    <div className="w-full min-h-[150px] flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900/50">
      <DocumentationQuickLinks />
    </div>
  );
}

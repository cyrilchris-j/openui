"use client";

import { DocumentationCategoryBrowser } from "./documentation-category-browser";

export default function Demo() {
  return (
    <div className="w-full min-h-[400px] flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900/50">
      <DocumentationCategoryBrowser />
    </div>
  );
}

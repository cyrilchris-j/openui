"use client";

import { ApiReferenceSearch } from "./api-reference-search";

export default function Demo() {
  return (
    <div className="w-full min-h-[200px] flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900/50">
      <ApiReferenceSearch />
    </div>
  );
}

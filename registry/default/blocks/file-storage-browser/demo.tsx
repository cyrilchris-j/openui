"use client";

import { FileStorageBrowser } from "./file-storage-browser";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] p-4 flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
      <FileStorageBrowser />
    </div>
  );
}

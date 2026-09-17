"use client";

import { DataExportQueueMonitor } from "./data-export-queue-monitor";

export default function Demo() {
  return (
    <div className="w-full min-h-[200px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <DataExportQueueMonitor />
    </div>
  );
}

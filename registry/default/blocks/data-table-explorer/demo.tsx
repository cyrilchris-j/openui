"use client";

import { DataTableExplorer } from "./data-table-explorer";

export default function Demo() {
  return (
    <div className="w-full min-h-[400px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <DataTableExplorer />
    </div>
  );
}

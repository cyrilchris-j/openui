"use client";

import { DatabaseBackupRestorePanel } from "./database-backup-restore-panel";

export default function Demo() {
  return (
    <div className="w-full min-h-[250px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <DatabaseBackupRestorePanel />
    </div>
  );
}

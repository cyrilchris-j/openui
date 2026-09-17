"use client";

import { UserRolePermissionMatrix } from "./user-role-permission-matrix";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <UserRolePermissionMatrix />
    </div>
  );
}

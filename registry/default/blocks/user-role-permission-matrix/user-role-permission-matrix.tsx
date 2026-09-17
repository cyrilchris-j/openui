"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function UserRolePermissionMatrix({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const roles = [
    { role: "Owner", read: true, write: true, delete: true },
    { role: "Developer", read: true, write: true, delete: false },
    { role: "Viewer", read: true, write: false, delete: false },
  ];

  return (
    <div className={cn("w-full max-w-3xl mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-sm text-neutral-900 dark:text-white mb-4">RBAC Role Privileges</h3>
      <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
        <div className="grid grid-cols-4 bg-neutral-50 dark:bg-neutral-900 p-2.5 font-bold text-neutral-500">
          <div>Role</div>
          <div>Read</div>
          <div>Write</div>
          <div>Delete</div>
        </div>
        {roles.map((r) => (
          <div key={r.role} className="grid grid-cols-4 p-2.5 items-center">
            <div className="font-bold text-neutral-900 dark:text-white">{r.role}</div>
            <div className="text-emerald-500 font-bold">{r.read ? "✓" : "—"}</div>
            <div className="text-emerald-500 font-bold">{r.write ? "✓" : "—"}</div>
            <div className="text-emerald-500 font-bold">{r.delete ? "✓" : "—"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

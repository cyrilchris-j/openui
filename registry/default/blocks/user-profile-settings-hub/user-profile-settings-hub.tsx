"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function UserProfileSettingsHub({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [name, setName] = React.useState("Elena Rostova");
  const [email, setEmail] = React.useState("elena@openui.dev");
  const [emailAlerts, setEmailAlerts] = React.useState(true);

  return (
    <div className={cn("w-full max-w-3xl mx-auto p-6 space-y-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
        <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Account Settings</h3>
        <p className="text-neutral-500 mt-0.5">Manage your personal profile and security configurations.</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xl font-bold">
          ER
        </div>
        <div>
          <button type="button" className="px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900">
            Change Photo
          </button>
          <div className="text-[10px] text-neutral-400 mt-1">JPG or PNG up to 2MB</div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
        <div>
          <div className="font-semibold text-neutral-900 dark:text-white">Email Digest Alerts</div>
          <div className="text-neutral-500 text-[11px]">Receive weekly telemetry and security digests.</div>
        </div>
        <input
          type="checkbox"
          checked={emailAlerts}
          onChange={(e) => setEmailAlerts(e.target.checked)}
          className="h-4 w-4 accent-emerald-600 rounded cursor-pointer"
        />
      </div>
    </div>
  );
}

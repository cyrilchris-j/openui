"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function ApiKeyManagerConsole({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [keys, setKeys] = React.useState([
    { id: "key_1", name: "Production Gateway", token: "opui_live_8f92a1...", created: "2026-08-14" },
    { id: "key_2", name: "CI/CD Test Runner", token: "opui_test_3c4e1b...", created: "2026-09-01" },
  ]);

  const revokeKey = (id: string) => {
    setKeys((prev) => prev.filter((k) => k.id !== id));
  };

  return (
    <div className={cn("w-full max-w-3xl mx-auto p-6 bg-neutral-950 text-neutral-100 border border-neutral-800 rounded-2xl font-mono text-xs", className)} {...props}>
      <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
        <div>
          <h3 className="text-sm font-bold text-white">API Authentication Keys</h3>
          <p className="text-neutral-400 text-[11px] mt-0.5">Never expose production secrets in client bundles.</p>
        </div>
        <button type="button" className="px-3 py-1.5 rounded bg-emerald-600 text-white font-bold text-[11px]">
          Create Secret
        </button>
      </div>

      <div className="divide-y divide-neutral-800 mt-2">
        {keys.map((k) => (
          <div key={k.id} className="py-3 flex items-center justify-between">
            <div>
              <div className="font-bold text-white">{k.name}</div>
              <div className="text-emerald-400 text-[11px] mt-0.5">{k.token}</div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-neutral-500 text-[10px]">{k.created}</span>
              <button type="button" onClick={() => revokeKey(k.id)} className="text-rose-400 hover:underline text-[11px]">
                Revoke
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

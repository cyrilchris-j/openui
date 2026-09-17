"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/cn";

export function MatrixPermissionTable({ className }: { className?: string }) {
  const [matrix, setMatrix] = useState<Record<string, boolean>>({
    "read-viewer": true,
    "read-editor": true,
    "read-admin": true,
    "write-viewer": false,
    "write-editor": true,
    "write-admin": true,
    "delete-viewer": false,
    "delete-editor": false,
    "delete-admin": true,
  });

  const toggle = (key: string) => {
    setMatrix((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const perms = [
    { id: "read", label: "Read Assets" },
    { id: "write", label: "Publish Updates" },
    { id: "delete", label: "Purge Datasets" },
  ];
  const roles = ["viewer", "editor", "admin"];

  return (
    <div className={cn("p-4 rounded-xl border border-line bg-paper max-w-md w-full font-sans text-xs shadow-sm", className)}>
      <div className="text-xs font-semibold text-ink mb-3 font-mono">RBAC Permission Matrix</div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-line text-ink/60 font-mono text-[11px]">
            <th className="text-left pb-2 font-normal">Capability</th>
            {roles.map((r) => (
              <th key={r} className="text-center pb-2 uppercase font-normal">{r}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line/60">
          {perms.map((p) => (
            <tr key={p.id}>
              <td className="py-2.5 text-ink font-medium">{p.label}</td>
              {roles.map((r) => {
                const k = `${p.id}-${r}`;
                const active = matrix[k];
                return (
                  <td key={r} className="text-center py-2.5">
                    <button
                      type="button"
                      onClick={() => toggle(k)}
                      className={cn(
                        "w-5 h-5 rounded border inline-flex items-center justify-center transition-colors",
                        active ? "bg-accent border-accent text-white" : "border-line text-transparent hover:border-ink/40"
                      )}
                    >
                      <Check className="w-3 h-3" />
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

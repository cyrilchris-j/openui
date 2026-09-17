"use client";

import { useState } from "react";
import { ChevronRight, Folder, File, Settings, Share2, Trash2 } from "lucide-react";
import { cn } from "@/lib/cn";

export interface MenuItem {
  id: string;
  label: string;
  icon?: any;
  children?: MenuItem[];
  action?: string;
}

export function CascadingMenuTree({ className }: { className?: string }) {
  const [activeBranch, setActiveBranch] = useState<string | null>(null);
  const [status, setStatus] = useState("Hover or click a menu item");

  const items: MenuItem[] = [
    {
      id: "workspace",
      label: "Workspace Options",
      icon: Folder,
      children: [
        { id: "ws-share", label: "Invite Collaborators", icon: Share2 },
        { id: "ws-settings", label: "Preferences & Keys", icon: Settings },
      ],
    },
    {
      id: "exports",
      label: "Export Pipeline",
      icon: File,
      children: [
        { id: "exp-json", label: "Bundle as JSON" },
        { id: "exp-ts", label: "Typescript Definitions" },
        { id: "exp-tar", label: "Archive (.tar.gz)" },
      ],
    },
    { id: "delete", label: "Prune Workspace", icon: Trash2 },
  ];

  return (
    <div className={cn("relative inline-block font-sans text-xs", className)}>
      <div className="w-56 rounded-lg border border-line bg-paper shadow-md p-1.5 flex flex-col gap-0.5">
        {items.map((item) => {
          const Icon = item.icon;
          const hasChildren = Boolean(item.children && item.children.length > 0);
          const isOpen = activeBranch === item.id;

          return (
            <div
              key={item.id}
              className="relative"
              onMouseEnter={() => hasChildren && setActiveBranch(item.id)}
              onMouseLeave={() => hasChildren && setActiveBranch(null)}
            >
              <button
                type="button"
                onClick={() => {
                  if (!hasChildren) setStatus(`Triggered: ${item.label}`);
                }}
                className={cn(
                  "w-full flex items-center justify-between px-2.5 py-1.5 rounded transition-colors text-left",
                  isOpen ? "bg-surface font-medium text-ink" : "text-ink/80 hover:bg-surface hover:text-ink"
                )}
              >
                <div className="flex items-center gap-2">
                  {Icon && <Icon className="w-3.5 h-3.5 text-ink/60" />}
                  <span>{item.label}</span>
                </div>
                {hasChildren && <ChevronRight className="w-3.5 h-3.5 text-ink/40" />}
              </button>

              {hasChildren && isOpen && (
                <div className="absolute left-full top-0 ml-1 w-48 rounded-lg border border-line bg-paper shadow-lg p-1.5 flex flex-col gap-0.5 z-20">
                  {item.children?.map((sub) => {
                    const SubIcon = sub.icon;
                    return (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => setStatus(`Selected: ${sub.label}`)}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded text-left text-ink/80 hover:bg-surface hover:text-ink transition-colors"
                      >
                        {SubIcon && <SubIcon className="w-3.5 h-3.5 text-ink/60" />}
                        <span>{sub.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-2 text-[11px] font-mono text-ink/60">{status}</div>
    </div>
  );
}

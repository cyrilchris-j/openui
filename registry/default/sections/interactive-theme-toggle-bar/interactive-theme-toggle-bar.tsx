"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function InteractiveThemeToggleBar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [theme, setTheme] = React.useState<"light" | "dark" | "system">("system");

  return (
    <section className={cn("w-full py-6 px-4 border-y border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 flex justify-center", className)} {...props}>
      <div className="flex gap-2 p-1 rounded-full bg-neutral-100 dark:bg-neutral-900 text-xs font-medium">
        {(["light", "dark", "system"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTheme(t)}
            className={cn(
              "px-3 py-1 rounded-full capitalize transition-colors",
              theme === t ? "bg-white dark:bg-neutral-800 font-bold shadow-xs text-neutral-900 dark:text-white" : "text-neutral-500"
            )}
          >
            {t}
          </button>
        ))}
      </div>
    </section>
  );
}

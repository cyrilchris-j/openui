"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface MultilingualLocaleSelectorProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
}

export function MultilingualLocaleSelector({
  title = "Select Region & Language",
  className,
  ...props
}: MultilingualLocaleSelectorProps) {
  const [selected, setSelected] = useState("en-US");
  const locales = [
    { code: "en-US", name: "English (United States)" },
    { code: "de-DE", name: "Deutsch (Deutschland)" },
    { code: "ja-JP", name: "日本語 (日本)" },
    { code: "fr-FR", name: "Français (France)" },
  ];

  return (
    <section className={cn("py-12 px-6 max-w-2xl mx-auto font-sans text-xs bg-paper text-ink", className)} {...props}>
      <h3 className="font-bold text-sm text-ink mb-4">{title}</h3>
      <div className="grid grid-cols-2 gap-2">
        {locales.map((l) => (
          <button
            key={l.code}
            type="button"
            onClick={() => setSelected(l.code)}
            className={cn(
              "p-3 rounded-xl border text-left transition-colors",
              selected === l.code ? "border-accent bg-accent/10 font-bold text-accent" : "border-line bg-surface/30 text-ink hover:bg-surface"
            )}
          >
            <div>{l.name}</div>
            <div className="font-mono text-[10px] text-ink/50 mt-0.5">{l.code}</div>
          </button>
        ))}
      </div>
    </section>
  );
}

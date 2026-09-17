"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface MarginNoteAnnotationsProps {
  body: string;
  notes: Array<{ marker: string; note: string }>;
  className?: string;
}

export function MarginNoteAnnotations({ body, notes, className }: MarginNoteAnnotationsProps) {
  const [open, setOpen] = useState<string | null>(null);

  const renderBody = () => {
    const parts = body.split(/\[(\d+)\]/);
    return parts.map((part: string, index: number) => {
      if (index % 2 === 1) {
        const note = notes.find((entry: { marker: string; note: string }) => entry.marker === part);
        if (!note) return <span key={index}>{part}</span>;
        return (
          <button
            key={index}
            type="button"
            onClick={() => setOpen((current) => (current === part ? null : part))}
            aria-expanded={open === part}
            className="align-super text-xs font-semibold text-accent"
          >
            [{part}]
          </button>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className={cn("grid gap-6 lg:grid-cols-[1fr_16rem]", className)}>
      <div className="text-base leading-relaxed text-ink">
        {renderBody()}
        {notes.map((note: { marker: string; note: string }) => (
          <span key={note.marker} className="lg:hidden">
            {open === note.marker && (
              <span className="mt-3 block rounded-md border border-line bg-paper p-3 text-sm">
                <strong className="text-accent">[{note.marker}]</strong> {note.note}
              </span>
            )}
          </span>
        ))}
      </div>
      <aside className="hidden lg:block">
        {notes.map((note: { marker: string; note: string }) => (
          <p
            key={note.marker}
            className={cn(
              "mb-4 border-l-2 pl-3 text-sm leading-relaxed transition-colors",
              open === note.marker ? "border-accent text-ink" : "border-line text-ink/60",
            )}
          >
            <strong className="text-accent">[{note.marker}]</strong> {note.note}
          </p>
        ))}
      </aside>
    </div>
  );
}

export default MarginNoteAnnotations;

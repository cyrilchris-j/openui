"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface BidiMirrorTypeProps {
  /** Left-to-right phrase. */
  ltr: string;
  /** Right-to-left phrase (rendered with dir="rtl"). */
  rtl: string;
  className?: string;
}

export function BidiMirrorType({ ltr, rtl, className }: BidiMirrorTypeProps) {
  const [mirrored, setMirrored] = useState(false);

  return (
    <div className={cn("flex flex-col gap-5", className)}>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-ink/50">dir=ltr</p>
          <p dir="ltr" className="text-2xl text-ink">
            {ltr}
          </p>
        </div>
        <div>
          <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-ink/50">dir=rtl</p>
          <p dir={mirrored ? "ltr" : "rtl"} className="text-2xl text-ink">
            {rtl}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setMirrored((value) => !value)}
        className="self-start rounded border border-line px-2 py-1 font-mono text-xs text-ink/70 hover:bg-line/20"
      >
        {mirrored ? "restore rtl" : "force ltr on rtl copy"}
      </button>
    </div>
  );
}

export default BidiMirrorType;

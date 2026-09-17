"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface InputOtpPinProps {
  className?: string;
}

export function InputOtpPin({ className }: InputOtpPinProps) {
  const [digits, setDigits] = useState(["4", "8", "", "", "", ""]);

  return (
    <div className={cn("inline-flex flex-col items-center gap-3 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60 uppercase">VERIFICATION CODE</span>
      <div className="flex gap-2">
        {digits.map((d, i) => (
          <input
            key={i}
            type="text"
            maxLength={1}
            value={d}
            onChange={(e) => {
              const next = [...digits];
              next[i] = e.target.value;
              setDigits(next);
            }}
            className="h-12 w-10 rounded-lg border border-line bg-paper text-center font-mono text-base font-bold text-ink focus:border-ink focus:outline-none"
          />
        ))}
      </div>
    </div>
  );
}

export default InputOtpPin;

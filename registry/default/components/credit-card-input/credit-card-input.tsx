"use client";

import { useState } from "react";
import { CreditCard, Lock } from "lucide-react";
import { cn } from "@/lib/cn";

export function CreditCardInput({ className }: { className?: string }) {
  const [num, setNum] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");

  const formatCard = (v: string) => {
    const raw = v.replace(/\D/g, "").slice(0, 16);
    return raw.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const formatExp = (v: string) => {
    const raw = v.replace(/\D/g, "").slice(0, 4);
    if (raw.length > 2) return `${raw.slice(0, 2)}/${raw.slice(2)}`;
    return raw;
  };

  return (
    <div className={cn("p-4 rounded-xl border border-line bg-paper max-w-sm w-full font-mono text-xs shadow-sm", className)}>
      <div className="flex items-center justify-between mb-3 text-ink">
        <div className="flex items-center gap-1.5 font-bold">
          <CreditCard className="w-4 h-4 text-accent" />
          <span>Card Payment</span>
        </div>
        <Lock className="w-3.5 h-3.5 text-emerald-500" />
      </div>

      <div className="space-y-2">
        <div>
          <label className="block text-[10px] text-ink/60 mb-1 uppercase">Card Number</label>
          <input
            type="text"
            value={num}
            onChange={(e) => setNum(formatCard(e.target.value))}
            placeholder="4111 2222 3333 4444"
            className="w-full px-2.5 py-2 rounded border border-line bg-surface text-ink text-xs focus:outline-none focus:border-accent"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[10px] text-ink/60 mb-1 uppercase">Expiry</label>
            <input
              type="text"
              value={exp}
              onChange={(e) => setExp(formatExp(e.target.value))}
              placeholder="MM/YY"
              className="w-full px-2.5 py-2 rounded border border-line bg-surface text-ink text-xs focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="block text-[10px] text-ink/60 mb-1 uppercase">CVC</label>
            <input
              type="password"
              maxLength={4}
              value={cvc}
              onChange={(e) => setCvc(e.target.value.replace(/\D/g, ""))}
              placeholder="•••"
              className="w-full px-2.5 py-2 rounded border border-line bg-surface text-ink text-xs focus:outline-none focus:border-accent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function TwoFactorAuthSetup({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [code, setCode] = React.useState("");
  const [verified, setVerified] = React.useState(false);

  return (
    <div className={cn("w-full max-w-lg mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">Enable Two-Factor Auth (TOTP)</h3>
      <p className="text-neutral-500 mb-6">Scan the QR code with 1Password, Google Authenticator, or Apple Passwords.</p>

      <div className="h-32 w-32 mx-auto bg-neutral-100 dark:bg-neutral-900 rounded-xl flex items-center justify-center font-mono text-neutral-400 text-[10px] mb-6">
        [QR CODE PLACEHOLDER]
      </div>

      {!verified ? (
        <div className="space-y-3">
          <input
            type="text"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter 6-digit code"
            className="w-full text-center tracking-widest font-mono text-sm py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
          />
          <button
            type="button"
            onClick={() => code.length === 6 && setVerified(true)}
            className="w-full py-2 bg-emerald-600 text-white font-semibold rounded-lg"
          >
            Verify & Activate 2FA
          </button>
        </div>
      ) : (
        <div className="text-center p-3 rounded bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 font-bold">
          ✓ Two-Factor Authentication Activated!
        </div>
      )}
    </div>
  );
}

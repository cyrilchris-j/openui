"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function BetaWaitlistCard({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [email, setEmail] = React.useState("");
  const [joined, setJoined] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes("@")) setJoined(true);
  };

  return (
    <section className={cn("w-full py-16 px-4 max-w-lg mx-auto text-center", className)} {...props}>
      <div className="border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 bg-white dark:bg-neutral-950 shadow-sm">
        <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">Join Private Registry Beta</h3>
        <p className="text-xs text-neutral-500 mt-2">Get access to private mirror syncs and enterprise teams features.</p>

        {!joined ? (
          <form onSubmit={handleSubmit} className="mt-6 flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              className="flex-1 px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
            />
            <button type="submit" className="px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-600 text-white">
              Join Waitlist
            </button>
          </form>
        ) : (
          <div className="mt-6 p-3 rounded bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
            You're #1,492 on the waitlist! We will be in touch soon.
          </div>
        )}
      </div>
    </section>
  );
}

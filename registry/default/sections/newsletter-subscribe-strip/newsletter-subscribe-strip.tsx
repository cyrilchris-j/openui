"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface NewsletterSubscribeStripProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  description?: string;
}

export function NewsletterSubscribeStrip({
  title = "Subscribe to Design Registry Updates",
  description = "Get weekly curated releases of new procedural components and design DNA specifications.",
  className,
  ...props
}: NewsletterSubscribeStripProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <section className={cn("py-12 px-6 max-w-4xl mx-auto font-sans bg-paper text-ink", className)} {...props}>
      <div className="p-8 rounded-3xl border border-line bg-surface/30 text-center space-y-4">
        <h3 className="text-xl font-bold tracking-tight text-ink">{title}</h3>
        <p className="text-xs text-ink/60 max-w-md mx-auto">{description}</p>
        {subscribed ? (
          <div className="p-3 rounded-xl bg-emerald-500/15 text-emerald-600 font-mono text-xs font-semibold">
            ✓ Subscription confirmed. Welcome to OpenUI Registry.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="developer@company.com"
              required
              className="w-full sm:w-72 px-4 py-2 rounded-xl border border-line bg-paper text-xs text-ink focus:outline-none focus:border-accent font-mono"
            />
            <button type="submit" className="w-full sm:w-auto px-5 py-2 rounded-xl bg-accent text-white text-xs font-mono font-bold hover:bg-accent/90 transition-colors">
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

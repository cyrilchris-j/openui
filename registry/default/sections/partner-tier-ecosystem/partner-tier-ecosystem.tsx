"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface PartnerItem {
  name: string;
  tier: "Global Elite" | "Premier Partner" | "Authorized";
  specialty: string;
  region: string;
}

export interface PartnerTierEcosystemProps extends React.HTMLAttributes<HTMLElement> {
  partners?: PartnerItem[];
}

const DEFAULT_PARTNERS: PartnerItem[] = [
  { name: "Vercel Enterprise", tier: "Global Elite", specialty: "Edge Runtime & Next.js Deployment", region: "Worldwide" },
  { name: "Cloudflare Workers", tier: "Global Elite", specialty: "V8 Compute & DDoS Shield", region: "Worldwide" },
  { name: "Supabase", tier: "Premier Partner", specialty: "PostgreSQL & Realtime Sync", region: "North America / EMEA" },
  { name: "Railway Systems", tier: "Premier Partner", specialty: "Container Orchestration", region: "Global" },
  { name: "Resend Email", tier: "Authorized", specialty: "Transactional Message Pipeline", region: "Americas" },
  { name: "Linear Systems", tier: "Authorized", specialty: "Engineering Project Sync", region: "Global" },
];

export function PartnerTierEcosystem({
  partners = DEFAULT_PARTNERS,
  className,
  ...props
}: PartnerTierEcosystemProps) {
  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-6xl mx-auto", className)} {...props}>
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold">
          Alliances
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-1">
          Certified Ecosystem Partners
        </h2>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2">
          Backed by leading cloud infrastructure providers and developer-first platforms.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="p-5 border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 rounded flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  {partner.name}
                </h3>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
                  {partner.tier}
                </span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2">
                {partner.specialty}
              </p>
            </div>
            <div className="text-[10px] font-mono text-neutral-400 mt-4 pt-2 border-t border-neutral-200 dark:border-neutral-800">
              Region: {partner.region}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

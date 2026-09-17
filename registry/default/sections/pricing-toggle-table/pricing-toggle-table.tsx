"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface PricingPlan {
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface PricingToggleTableProps extends React.HTMLAttributes<HTMLElement> {
  plans?: PricingPlan[];
}

const DEFAULT_PLANS: PricingPlan[] = [
  {
    name: "Starter",
    monthlyPrice: 19,
    annualPrice: 15,
    description: "For independent engineers and small prototypes.",
    features: ["Up to 5 team members", "10,000 monthly active requests", "Community Discord support", "1GB shared telemetry storage"],
  },
  {
    name: "Pro",
    monthlyPrice: 49,
    annualPrice: 39,
    description: "For scaling engineering squads and growing products.",
    popular: true,
    features: ["Unlimited team members", "250,000 monthly active requests", "Priority Slack connect channel", "30-day telemetry retention", "Custom domain routing"],
  },
  {
    name: "Enterprise",
    monthlyPrice: 199,
    annualPrice: 159,
    description: "For mission-critical infrastructure with strict SLAs.",
    features: ["Unlimited requests with dedicated proxy", "99.99% uptime guarantee", "24/7/365 dedicated engineer", "Self-hosted VPC gateway", "Custom SSO & SAML"],
  },
];

export function PricingToggleTable({
  plans = DEFAULT_PLANS,
  className,
  ...props
}: PricingToggleTableProps) {
  const [annual, setAnnual] = React.useState(true);

  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-6xl mx-auto", className)} {...props}>
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Predictable, transparent pricing
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
          No hidden seat charges or overage traps. Upgrade or downgrade at any time.
        </p>

        {/* Toggle switch */}
        <div className="mt-6 inline-flex items-center gap-3 p-1 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
          <button
            type="button"
            onClick={() => setAnnual(false)}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-medium transition-colors",
              !annual ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm" : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            )}
          >
            Monthly billing
          </button>
          <button
            type="button"
            onClick={() => setAnnual(true)}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5",
              annual ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm" : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            )}
          >
            <span>Annual billing</span>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.5 rounded-full">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan) => {
          const price = annual ? plan.annualPrice : plan.monthlyPrice;
          return (
            <div
              key={plan.name}
              className={cn(
                "rounded-2xl border p-6 flex flex-col justify-between relative transition-all duration-200",
                plan.popular
                  ? "border-neutral-900 dark:border-neutral-100 shadow-xl bg-neutral-900 text-white dark:bg-neutral-900"
                  : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100"
              )}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500 text-black">
                  Most Popular
                </span>
              )}
              <div>
                <h3 className="text-lg font-bold">{plan.name}</h3>
                <p className="text-xs text-neutral-400 mt-1">{plan.description}</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tight">$${price}</span>
                  <span className="text-xs text-neutral-400">/mo per seat</span>
                </div>
                <div className="mt-6 space-y-2.5 text-xs">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span className={plan.popular ? "text-neutral-200" : "text-neutral-600 dark:text-neutral-300"}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <button
                type="button"
                className={cn(
                  "mt-8 w-full py-2.5 rounded-xl text-xs font-semibold transition-colors",
                  plan.popular
                    ? "bg-white text-neutral-900 hover:bg-neutral-100"
                    : "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
                )}
              >
                Choose {plan.name}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

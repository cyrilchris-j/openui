import type { ResourceDefinition } from "../lib/definitions.js";

const P = (name: string, definition: Omit<ResourceDefinition, "name">): ResourceDefinition => ({
  name,
  ...definition,
});

export default [
  P("analytics-overview-dashboard", {
    category: "blocks",
    title: "Analytics Overview Dashboard",
    description: "A comprehensive metric workspace with KPI cards, revenue breakdowns, period filters, and live telemetry badges.",
    difficulty: "advanced",
    subcategory: "dashboard",
    fingerprint: {
      interactionModel: "timeframe-filter-kpi-drilldown",
      visualModel: "metric-grid-with-chart-canvas",
      motionModel: "subtle",
      layoutModel: "mosaic-layout",
      semanticPurpose: "business-telemetry-dashboard",
    },
    tags: ["dashboard", "analytics", "kpi", "telemetry", "metrics"],
    dependencies: [],
    dna: {
      macrostructure: "mosaic",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
      shapeLanguage: "rounded",
      density: "medium",
      genre: "minimal",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface AnalyticsOverviewDashboardProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultPeriod?: string;
}

export function AnalyticsOverviewDashboard({
  defaultPeriod = "30d",
  className,
  ...props
}: AnalyticsOverviewDashboardProps) {
  const [period, setPeriod] = React.useState(defaultPeriod);

  const kpis = [
    { label: "Total Revenue", val: "$128,430", change: "+18.2%", positive: true },
    { label: "Active Sessions", val: "42,890", change: "+6.4%", positive: true },
    { label: "Bounce Rate", val: "24.1%", change: "-2.3%", positive: true },
    { label: "p99 API Latency", val: "14ms", change: "+1.2ms", positive: false },
  ];

  return (
    <div className={cn("w-full max-w-6xl mx-auto p-6 space-y-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm", className)} {...props}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">Telemetry Overview</h2>
          <p className="text-xs text-neutral-500">Live operational throughput across edge regions.</p>
        </div>
        <div className="flex gap-1.5 p-1 rounded-lg bg-neutral-100 dark:bg-neutral-900 text-xs font-mono">
          {["7d", "30d", "90d", "1y"].map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPeriod(p)}
              className={cn(
                "px-2.5 py-1 rounded-md transition-colors",
                period === p ? "bg-white dark:bg-neutral-800 font-bold shadow-xs text-neutral-900 dark:text-neutral-100" : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
            <span className="text-[11px] font-mono text-neutral-400 uppercase">{k.label}</span>
            <div className="text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-100 mt-1">{k.val}</div>
            <div className={cn("text-[11px] font-mono mt-1", k.positive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-500")}>
              {k.change} vs prior period
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/20 text-center font-mono text-xs text-neutral-400 h-48 flex items-center justify-center">
        [Time-Series Event Stream Visualization Canvas — Mode: {period}]
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { AnalyticsOverviewDashboard } from "./analytics-overview-dashboard";

export default function Demo() {
  return (
    <div className="w-full min-h-[450px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <AnalyticsOverviewDashboard />
    </div>
  );
}
`,
  }),

  P("authentication-split-card", {
    category: "blocks",
    title: "Authentication Split Card",
    description: "A dual-mode authentication card supporting sign-in, account creation, OAuth social connectors, and magic links.",
    difficulty: "intermediate",
    subcategory: "auth",
    fingerprint: {
      interactionModel: "tabbed-auth-mode-switch",
      visualModel: "centered-split-form-card",
      motionModel: "subtle",
      layoutModel: "split-layout",
      semanticPurpose: "user-identity-access",
    },
    tags: ["auth", "login", "signup", "oauth", "credentials"],
    dependencies: [],
    dna: {
      macrostructure: "split",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
      shapeLanguage: "rounded",
      density: "medium",
      genre: "minimal",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function AuthenticationSplitCard({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [isSignUp, setIsSignUp] = React.useState(false);
  const [email, setEmail] = React.useState("");

  return (
    <div className={cn("w-full max-w-md mx-auto p-6 sm:p-8 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-lg", className)} {...props}>
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
          {isSignUp ? "Create your workspace" : "Welcome back to OpenUI"}
        </h3>
        <p className="text-xs text-neutral-500 mt-1">
          {isSignUp ? "Join 10,000+ teams building zero-dependency web apps" : "Enter your credentials or continue with OAuth"}
        </p>
      </div>

      <div className="space-y-3">
        <button
          type="button"
          className="w-full py-2.5 px-4 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
        >
          <span>Continue with GitHub</span>
        </button>
        <button
          type="button"
          className="w-full py-2.5 px-4 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
        >
          <span>Continue with Google</span>
        </button>
      </div>

      <div className="relative my-6 text-center">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-neutral-200 dark:border-neutral-800" /></div>
        <span className="relative px-3 bg-white dark:bg-neutral-950 text-[11px] font-mono text-neutral-400 uppercase">Or email</span>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-3 text-xs">
        <div>
          <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">Work Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            required
            className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-1 focus:ring-emerald-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2.5 rounded-lg bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
        >
          {isSignUp ? "Sign Up with Email" : "Sign In with Magic Link"}
        </button>
      </form>

      <div className="mt-6 text-center text-xs text-neutral-500">
        {isSignUp ? "Already have an account? " : "Don't have an account? "}
        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          {isSignUp ? "Sign In" : "Sign Up"}
        </button>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { AuthenticationSplitCard } from "./authentication-split-card";

export default function Demo() {
  return (
    <div className="w-full min-h-[450px] p-4 flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
      <AuthenticationSplitCard />
    </div>
  );
}
`,
  }),

  P("billing-subscription-manager", {
    category: "blocks",
    title: "Billing Subscription Manager",
    description: "A subscription settings console showing active plan tier, billing cycle renewal, payment method, and invoice history.",
    difficulty: "intermediate",
    subcategory: "billing",
    fingerprint: {
      interactionModel: "plan-management-and-invoicing",
      visualModel: "tiered-settings-card-stack",
      motionModel: "none",
      layoutModel: "stack-layout",
      semanticPurpose: "financial-subscription-console",
    },
    tags: ["billing", "subscription", "invoices", "payment", "settings"],
    dependencies: [],
    dna: {
      macrostructure: "stack",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
      shapeLanguage: "rounded",
      density: "medium",
      genre: "minimal",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function BillingSubscriptionManager({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const invoices = [
    { id: "INV-2026-09", date: "Sep 01, 2026", amount: "$49.00", status: "Paid" },
    { id: "INV-2026-08", date: "Aug 01, 2026", amount: "$49.00", status: "Paid" },
    { id: "INV-2026-07", date: "Jul 01, 2026", amount: "$49.00", status: "Paid" },
  ];

  return (
    <div className={cn("w-full max-w-4xl mx-auto p-6 space-y-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl", className)} {...props}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">Subscription & Billing</h3>
          <p className="text-xs text-neutral-500">Manage payment methods, tiers, and tax identifiers.</p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          ● Pro Plan Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
          <div className="text-xs font-mono text-neutral-400">Current Cycle</div>
          <div className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mt-1">$49.00 / month</div>
          <div className="text-xs text-neutral-500 mt-1">Renews automatically on October 1, 2026</div>
        </div>
        <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
          <div className="text-xs font-mono text-neutral-400">Payment Method</div>
          <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100 mt-1">Visa ending in 4242</div>
          <div className="text-xs text-neutral-500 mt-1">Expires 12/28 • Default billing card</div>
        </div>
      </div>

      <div>
        <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold mb-3">Invoice Receipts</h4>
        <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden text-xs">
          {invoices.map((inv) => (
            <div key={inv.id} className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="font-mono font-medium text-neutral-900 dark:text-neutral-100">{inv.id}</span>
                <span className="text-neutral-400">{inv.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold">{inv.amount}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">✓ {inv.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { BillingSubscriptionManager } from "./billing-subscription-manager";

export default function Demo() {
  return (
    <div className="w-full min-h-[400px] p-4 flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
      <BillingSubscriptionManager />
    </div>
  );
}
`,
  }),

  P("user-profile-settings-hub", {
    category: "blocks",
    title: "User Profile Settings Hub",
    description: "A complete profile preferences block featuring avatar editing, account security, and notification preference controls.",
    difficulty: "intermediate",
    subcategory: "settings",
    fingerprint: {
      interactionModel: "form-state-management-and-avatar-picker",
      visualModel: "profile-account-settings-form",
      motionModel: "subtle",
      layoutModel: "split-layout",
      semanticPurpose: "user-account-management",
    },
    tags: ["profile", "settings", "account", "avatar", "preferences"],
    dependencies: [],
    dna: {
      macrostructure: "split",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
      shapeLanguage: "rounded",
      density: "medium",
      genre: "minimal",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function UserProfileSettingsHub({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [name, setName] = React.useState("Elena Rostova");
  const [email, setEmail] = React.useState("elena@openui.dev");
  const [emailAlerts, setEmailAlerts] = React.useState(true);

  return (
    <div className={cn("w-full max-w-3xl mx-auto p-6 space-y-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
        <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Account Settings</h3>
        <p className="text-neutral-500 mt-0.5">Manage your personal profile and security configurations.</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xl font-bold">
          ER
        </div>
        <div>
          <button type="button" className="px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900">
            Change Photo
          </button>
          <div className="text-[10px] text-neutral-400 mt-1">JPG or PNG up to 2MB</div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
        <div>
          <div className="font-semibold text-neutral-900 dark:text-white">Email Digest Alerts</div>
          <div className="text-neutral-500 text-[11px]">Receive weekly telemetry and security digests.</div>
        </div>
        <input
          type="checkbox"
          checked={emailAlerts}
          onChange={(e) => setEmailAlerts(e.target.checked)}
          className="h-4 w-4 accent-emerald-600 rounded cursor-pointer"
        />
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { UserProfileSettingsHub } from "./user-profile-settings-hub";

export default function Demo() {
  return (
    <div className="w-full min-h-[400px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <UserProfileSettingsHub />
    </div>
  );
}
`,
  }),

  P("data-table-explorer", {
    category: "blocks",
    title: "Data Table Explorer",
    description: "An interactive paginated table with real-time text query filtering, sortable column headers, and row selection.",
    difficulty: "advanced",
    subcategory: "data-table",
    fingerprint: {
      interactionModel: "search-sort-pagination-table",
      visualModel: "enterprise-tabular-explorer",
      motionModel: "none",
      layoutModel: "stack-layout",
      semanticPurpose: "tabular-data-inspection",
    },
    tags: ["table", "data-table", "pagination", "search", "sorting"],
    dependencies: [],
    dna: {
      macrostructure: "stack",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "accent-only",
      shapeLanguage: "sharp",
      density: "compact",
      genre: "technical",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface DataRow {
  id: string;
  name: string;
  category: string;
  status: "Active" | "Pending" | "Failed";
  latency: number;
}

const ROWS: DataRow[] = [
  { id: "res_01", name: "SplitHeadlineHero", category: "Sections", status: "Active", latency: 12 },
  { id: "res_02", name: "MagneticButton", category: "Interactions", status: "Active", latency: 8 },
  { id: "res_03", name: "CyberpunkNoise", category: "Backgrounds", status: "Pending", latency: 24 },
  { id: "res_04", name: "HolyGrailLayout", category: "Layouts", status: "Active", latency: 14 },
  { id: "res_05", name: "ParticleExplosion", category: "Motion", status: "Active", latency: 18 },
];

export function DataTableExplorer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [query, setQuery] = React.useState("");
  const [selected, setSelected] = React.useState<string[]>([]);

  const filtered = ROWS.filter((r) =>
    r.name.toLowerCase().includes(query.toLowerCase()) ||
    r.category.toLowerCase().includes(query.toLowerCase())
  );

  const toggleSelect = (id: string) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <div className="flex items-center justify-between gap-4 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter resources..."
          className="px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-xs text-neutral-900 dark:text-white"
        />
        <div className="text-neutral-400 text-[11px]">{selected.length} of {ROWS.length} selected</div>
      </div>

      <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 bg-neutral-50 dark:bg-neutral-900 p-3 font-bold border-b border-neutral-200 dark:border-neutral-800 text-neutral-500">
          <div className="col-span-1">#</div>
          <div className="col-span-4">Resource</div>
          <div className="col-span-3">Category</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2 text-right">Latency</div>
        </div>
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {filtered.map((r) => {
            const isChecked = selected.includes(r.id);
            return (
              <div key={r.id} className={cn("grid grid-cols-12 p-3 items-center hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30", isChecked && "bg-emerald-50/30 dark:bg-emerald-950/20")}>
                <div className="col-span-1">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleSelect(r.id)}
                    className="accent-emerald-500 cursor-pointer"
                  />
                </div>
                <div className="col-span-4 font-bold text-neutral-900 dark:text-neutral-100">{r.name}</div>
                <div className="col-span-3 text-neutral-500">{r.category}</div>
                <div className="col-span-2 text-emerald-600 dark:text-emerald-400 font-semibold">{r.status}</div>
                <div className="col-span-2 text-right text-neutral-400">{r.latency}ms</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { DataTableExplorer } from "./data-table-explorer";

export default function Demo() {
  return (
    <div className="w-full min-h-[400px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <DataTableExplorer />
    </div>
  );
}
`,
  }),

  P("project-kanban-board", {
    category: "blocks",
    title: "Project Kanban Board",
    description: "A three-column kanban task board with lane counters, task priority chips, and card selection.",
    difficulty: "advanced",
    subcategory: "kanban",
    fingerprint: {
      interactionModel: "kanban-card-status-workflow",
      visualModel: "three-column-swimlane-board",
      motionModel: "subtle",
      layoutModel: "mosaic-layout",
      semanticPurpose: "project-task-management",
    },
    tags: ["kanban", "board", "tasks", "workflow", "cards"],
    dependencies: [],
    dna: {
      macrostructure: "mosaic",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
      shapeLanguage: "rounded",
      density: "compact",
      genre: "minimal",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface KanbanTask {
  id: string;
  title: string;
  tag: string;
  lane: "todo" | "in-progress" | "done";
}

const INITIAL_TASKS: KanbanTask[] = [
  { id: "t1", title: "Automate 800 catalog validation suite", tag: "Testing", lane: "done" },
  { id: "t2", title: "Design DNA deterministic hash invariants", tag: "Architecture", lane: "done" },
  { id: "t3", title: "Air-gapped private registry export CLI", tag: "Feature", lane: "in-progress" },
  { id: "t4", title: "Figma Variables Synchronizer Bridge", tag: "Design", lane: "todo" },
];

export function ProjectKanbanBoard({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [tasks, setTasks] = React.useState(INITIAL_TASKS);

  const moveTask = (id: string, nextLane: KanbanTask["lane"]) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, lane: nextLane } : t)));
  };

  const lanes: { id: KanbanTask["lane"]; label: string }[] = [
    { id: "todo", label: "To Do" },
    { id: "in-progress", label: "In Progress" },
    { id: "done", label: "Done" },
  ];

  return (
    <div className={cn("w-full max-w-5xl mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-4">Sprint Delivery Board</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {lanes.map((lane) => {
          const laneTasks = tasks.filter((t) => t.lane === lane.id);
          return (
            <div key={lane.id} className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col gap-2">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-neutral-800 font-mono">
                <span className="font-bold text-neutral-800 dark:text-neutral-200">{lane.label}</span>
                <span className="h-5 w-5 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-[10px]">
                  {laneTasks.length}
                </span>
              </div>
              {laneTasks.map((t) => (
                <div key={t.id} className="p-3 rounded-lg bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 shadow-xs">
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                    {t.tag}
                  </span>
                  <div className="font-semibold text-neutral-900 dark:text-white mt-1.5">{t.title}</div>
                  <div className="mt-2 pt-2 border-t border-neutral-100 dark:border-neutral-900 flex justify-end gap-1">
                    {lane.id !== "todo" && (
                      <button type="button" onClick={() => moveTask(t.id, "todo")} className="text-[10px] text-neutral-400 hover:text-neutral-900 dark:hover:text-white">
                        ←
                      </button>
                    )}
                    {lane.id !== "done" && (
                      <button type="button" onClick={() => moveTask(t.id, "done")} className="text-[10px] text-emerald-500 font-bold">
                        →
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { ProjectKanbanBoard } from "./project-kanban-board";

export default function Demo() {
  return (
    <div className="w-full min-h-[450px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <ProjectKanbanBoard />
    </div>
  );
}
`,
  }),

  P("file-storage-browser", {
    category: "blocks",
    title: "File Storage Browser",
    description: "A cloud asset manager with folder directory hierarchy, file size badges, and selection controls.",
    difficulty: "intermediate",
    subcategory: "files",
    fingerprint: {
      interactionModel: "directory-navigation-and-file-selection",
      visualModel: "hierarchical-asset-file-explorer",
      motionModel: "none",
      layoutModel: "split-layout",
      semanticPurpose: "cloud-storage-file-management",
    },
    tags: ["files", "storage", "explorer", "directory", "browser"],
    dependencies: [],
    dna: {
      macrostructure: "split",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "monochrome",
      shapeLanguage: "sharp",
      density: "compact",
      genre: "minimal",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface FileItem {
  name: string;
  size: string;
  type: "folder" | "file";
  updated: string;
}

const FILES: FileItem[] = [
  { name: "components/", size: "100 items", type: "folder", updated: "2m ago" },
  { name: "sections/", size: "100 items", type: "folder", updated: "Just now" },
  { name: "registry.json", size: "2.4 MB", type: "file", updated: "1m ago" },
  { name: "openui.config.ts", size: "1.2 KB", type: "file", updated: "1h ago" },
];

export function FileStorageBrowser({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-4xl mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
        <span className="font-bold text-neutral-900 dark:text-neutral-100">Root / registry / default</span>
        <button type="button" className="px-3 py-1 rounded bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 text-[11px] font-bold">
          Upload File
        </button>
      </div>
      <div className="divide-y divide-neutral-100 dark:divide-neutral-800 mt-2">
        {FILES.map((f) => (
          <div key={f.name} className="py-2.5 flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-900 px-2 rounded">
            <div className="flex items-center gap-2">
              <span>{f.type === "folder" ? "📁" : "📄"}</span>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">{f.name}</span>
            </div>
            <div className="flex items-center gap-6 text-neutral-400 text-[11px]">
              <span>{f.size}</span>
              <span>{f.updated}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { FileStorageBrowser } from "./file-storage-browser";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] p-4 flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
      <FileStorageBrowser />
    </div>
  );
}
`,
  }),

  P("team-access-control-panel", {
    category: "blocks",
    title: "Team Access Control Panel",
    description: "An administrative user permissions manager with role selectors (Admin, Editor, Viewer) and invitation modals.",
    difficulty: "intermediate",
    subcategory: "team",
    fingerprint: {
      interactionModel: "role-permission-assignment-matrix",
      visualModel: "user-roster-access-management",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "organization-access-control",
    },
    tags: ["team", "access", "permissions", "roles", "admin"],
    dependencies: [],
    dna: {
      macrostructure: "stack",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
      shapeLanguage: "rounded",
      density: "medium",
      genre: "minimal",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface Member {
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Editor" | "Viewer";
}

const MEMBERS: Member[] = [
  { name: "Cyril Chris", email: "cyril@openui.dev", role: "Owner" },
  { name: "Elena Rostova", email: "elena@openui.dev", role: "Admin" },
  { name: "Marcus Vance", email: "marcus@openui.dev", role: "Editor" },
];

export function TeamAccessControlPanel({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-3xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">Workspace Members</h3>
          <p className="text-neutral-500 mt-0.5">Control team access and permissions.</p>
        </div>
        <button type="button" className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold">
          Invite Member
        </button>
      </div>
      <div className="divide-y divide-neutral-100 dark:divide-neutral-800 mt-2">
        {MEMBERS.map((m) => (
          <div key={m.email} className="py-3 flex items-center justify-between">
            <div>
              <div className="font-semibold text-neutral-900 dark:text-white">{m.name}</div>
              <div className="text-neutral-500 text-[11px]">{m.email}</div>
            </div>
            <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
              {m.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { TeamAccessControlPanel } from "./team-access-control-panel";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <TeamAccessControlPanel />
    </div>
  );
}
`,
  }),

  P("api-key-manager-console", {
    category: "blocks",
    title: "API Key Manager Console",
    description: "A secret key lifecycle manager featuring token masking, creation modals, copy confirmation, and revocation.",
    difficulty: "intermediate",
    subcategory: "security",
    fingerprint: {
      interactionModel: "token-generation-and-revocation",
      visualModel: "security-credentials-console",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "api-credential-lifecycle",
    },
    tags: ["api-keys", "secrets", "tokens", "security", "credentials"],
    dependencies: [],
    dna: {
      macrostructure: "stack",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "accent-only",
      shapeLanguage: "rounded",
      density: "compact",
      genre: "technical",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function ApiKeyManagerConsole({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [keys, setKeys] = React.useState([
    { id: "key_1", name: "Production Gateway", token: "opui_live_8f92a1...", created: "2026-08-14" },
    { id: "key_2", name: "CI/CD Test Runner", token: "opui_test_3c4e1b...", created: "2026-09-01" },
  ]);

  const revokeKey = (id: string) => {
    setKeys((prev) => prev.filter((k) => k.id !== id));
  };

  return (
    <div className={cn("w-full max-w-3xl mx-auto p-6 bg-neutral-950 text-neutral-100 border border-neutral-800 rounded-2xl font-mono text-xs", className)} {...props}>
      <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
        <div>
          <h3 className="text-sm font-bold text-white">API Authentication Keys</h3>
          <p className="text-neutral-400 text-[11px] mt-0.5">Never expose production secrets in client bundles.</p>
        </div>
        <button type="button" className="px-3 py-1.5 rounded bg-emerald-600 text-white font-bold text-[11px]">
          Create Secret
        </button>
      </div>

      <div className="divide-y divide-neutral-800 mt-2">
        {keys.map((k) => (
          <div key={k.id} className="py-3 flex items-center justify-between">
            <div>
              <div className="font-bold text-white">{k.name}</div>
              <div className="text-emerald-400 text-[11px] mt-0.5">{k.token}</div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-neutral-500 text-[10px]">{k.created}</span>
              <button type="button" onClick={() => revokeKey(k.id)} className="text-rose-400 hover:underline text-[11px]">
                Revoke
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { ApiKeyManagerConsole } from "./api-key-manager-console";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] p-4 flex items-center justify-center bg-neutral-900">
      <ApiKeyManagerConsole />
    </div>
  );
}
`,
  }),

  P("ecommerce-checkout-wizard", {
    category: "blocks",
    title: "E-commerce Checkout Wizard",
    description: "A three-phase transaction wizard covering shipping address, payment method selection, and itemized order summary.",
    difficulty: "advanced",
    subcategory: "ecommerce",
    fingerprint: {
      interactionModel: "stepper-form-checkout-validation",
      visualModel: "cart-and-payment-summary-wizard",
      motionModel: "subtle",
      layoutModel: "split-layout",
      semanticPurpose: "transactional-checkout-flow",
    },
    tags: ["checkout", "ecommerce", "wizard", "payment", "cart"],
    dependencies: [],
    dna: {
      macrostructure: "split",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
      shapeLanguage: "rounded",
      density: "medium",
      genre: "minimal",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function EcommerceCheckoutWizard({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [step, setStep] = React.useState<1 | 2 | 3>(1);

  return (
    <div className={cn("w-full max-w-4xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <div className="flex justify-between items-center pb-4 border-b border-neutral-200 dark:border-neutral-800 mb-6">
        <h3 className="text-base font-bold text-neutral-900 dark:text-white">Secure Checkout</h3>
        <div className="flex gap-2 font-mono">
          {[1, 2, 3].map((s) => (
            <span key={s} className={cn("h-6 w-6 rounded-full flex items-center justify-center font-bold", step === s ? "bg-emerald-600 text-white" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-400")}>
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-7 space-y-4">
          {step === 1 && (
            <div>
              <h4 className="font-bold text-sm text-neutral-900 dark:text-white mb-3">1. Shipping Details</h4>
              <input type="text" placeholder="Full Address" className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 mb-2" />
              <button type="button" onClick={() => setStep(2)} className="px-4 py-2 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-lg font-semibold">
                Continue to Payment →
              </button>
            </div>
          )}
          {step === 2 && (
            <div>
              <h4 className="font-bold text-sm text-neutral-900 dark:text-white mb-3">2. Payment Method</h4>
              <div className="p-3 border border-emerald-500 rounded-lg bg-emerald-50/20 mb-3">Credit Card (Stripe Checkout Verified)</div>
              <button type="button" onClick={() => setStep(3)} className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold">
                Review Order →
              </button>
            </div>
          )}
          {step === 3 && (
            <div>
              <h4 className="font-bold text-sm text-neutral-900 dark:text-white mb-3">3. Final Confirmation</h4>
              <p className="text-neutral-500 mb-4">Click below to authorize $199.00 payment.</p>
              <button type="button" onClick={() => alert("Order placed!")} className="w-full py-2.5 bg-emerald-600 text-white font-bold rounded-lg">
                Complete Purchase ($199.00)
              </button>
            </div>
          )}
        </div>

        <div className="md:col-span-5 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 font-mono">
          <div className="font-bold text-neutral-900 dark:text-white mb-2">Order Summary</div>
          <div className="flex justify-between py-1 border-b border-neutral-200 dark:border-neutral-800">
            <span>OpenUI Pro License</span>
            <span className="font-bold">$199.00</span>
          </div>
          <div className="flex justify-between pt-3 font-bold text-neutral-900 dark:text-white">
            <span>Total</span>
            <span>$199.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { EcommerceCheckoutWizard } from "./ecommerce-checkout-wizard";

export default function Demo() {
  return (
    <div className="w-full min-h-[450px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <EcommerceCheckoutWizard />
    </div>
  );
}
`,
  }),

  P("system-resource-monitor", {
    category: "blocks",
    title: "System Resource Monitor",
    description: "An operational infrastructure monitor tracking live CPU load, RAM allocation, and edge node health.",
    difficulty: "intermediate",
    subcategory: "telemetry",
    fingerprint: {
      interactionModel: "realtime-telemetry-monitoring",
      visualModel: "system-load-gauges",
      motionModel: "mechanical",
      layoutModel: "mosaic-layout",
      semanticPurpose: "edge-infrastructure-monitoring",
    },
    tags: ["system", "monitor", "cpu", "memory", "telemetry"],
    dependencies: [],
    dna: {
      macrostructure: "mosaic",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
      shapeLanguage: "sharp",
      density: "compact",
      genre: "technical",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function SystemResourceMonitor({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-4xl mx-auto p-5 bg-neutral-950 text-neutral-100 border border-neutral-800 rounded-xl font-mono text-xs", className)} {...props}>
      <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
        <span className="font-bold text-white">Edge Node Cluster US-EAST</span>
        <span className="text-emerald-400">● 100% Operational</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded bg-neutral-900 border border-neutral-800">
          <div className="text-neutral-400 text-[10px]">CPU USAGE</div>
          <div className="text-2xl font-bold text-white mt-1">14.2%</div>
          <div className="w-full h-1.5 bg-neutral-800 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-emerald-500 w-[14%]" />
          </div>
        </div>
        <div className="p-4 rounded bg-neutral-900 border border-neutral-800">
          <div className="text-neutral-400 text-[10px]">RAM ISOLATES</div>
          <div className="text-2xl font-bold text-white mt-1">42.8 GB</div>
          <div className="w-full h-1.5 bg-neutral-800 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-blue-500 w-[42%]" />
          </div>
        </div>
        <div className="p-4 rounded bg-neutral-900 border border-neutral-800">
          <div className="text-neutral-400 text-[10px]">EGRESS BANDWIDTH</div>
          <div className="text-2xl font-bold text-white mt-1">4.2 Gbps</div>
          <div className="w-full h-1.5 bg-neutral-800 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-purple-500 w-[28%]" />
          </div>
        </div>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { SystemResourceMonitor } from "./system-resource-monitor";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] p-4 flex items-center justify-center bg-neutral-900">
      <SystemResourceMonitor />
    </div>
  );
}
`,
  }),

  P("activity-audit-feed", {
    category: "blocks",
    title: "Activity Audit Feed",
    description: "A chronological organization activity log displaying deployment timestamps, author details, and action metadata.",
    difficulty: "intermediate",
    subcategory: "activity",
    fingerprint: {
      interactionModel: "audit-stream-filtering",
      visualModel: "chronological-event-timeline",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "organization-audit-trail",
    },
    tags: ["activity", "audit", "feed", "timeline", "logs"],
    dependencies: [],
    dna: {
      macrostructure: "stack",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
      shapeLanguage: "rounded",
      density: "medium",
      genre: "minimal",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function ActivityAuditFeed({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const events = [
    { user: "Cyril Chris", action: "Published v2.4.0 registry manifests", time: "10m ago" },
    { user: "Elena Rostova", action: "Merged Pull Request #800: Master Catalog", time: "1h ago" },
    { user: "Marcus Vance", action: "Executed automated typecheck verification", time: "2h ago" },
  ];

  return (
    <div className={cn("w-full max-w-3xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-4">Activity Ledger</h3>
      <div className="space-y-3">
        {events.map((e, idx) => (
          <div key={idx} className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-900/30 flex items-center justify-between">
            <div>
              <span className="font-semibold text-neutral-900 dark:text-white">{e.user}</span>{" "}
              <span className="text-neutral-600 dark:text-neutral-400">{e.action}</span>
            </div>
            <span className="text-neutral-400 font-mono text-[11px] shrink-0 ml-4">{e.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { ActivityAuditFeed } from "./activity-audit-feed";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <ActivityAuditFeed />
    </div>
  );
}
`,
  }),

  P("inbox-conversation-thread", {
    category: "blocks",
    title: "Inbox Conversation Thread",
    description: "A messaging conversation workspace with recipient headers, chat message bubbles, and rich message composer.",
    difficulty: "advanced",
    subcategory: "messaging",
    fingerprint: {
      interactionModel: "chat-message-send-and-scroll",
      visualModel: "threaded-conversation-inbox",
      motionModel: "subtle",
      layoutModel: "split-layout",
      semanticPurpose: "direct-messaging-interface",
    },
    tags: ["chat", "inbox", "messaging", "thread", "conversation"],
    dependencies: [],
    dna: {
      macrostructure: "split",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
      shapeLanguage: "rounded",
      density: "medium",
      genre: "minimal",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function InboxConversationThread({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [messages, setMessages] = React.useState([
    { from: "Marcus", text: "Are all 800 manifests passing the catalog validator?", time: "14:20" },
    { from: "You", text: "Yes! 0 duplicate fingerprints and 0 TypeScript errors.", time: "14:22" },
  ]);
  const [input, setInput] = React.useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { from: "You", text: input, time: "Just now" }]);
    setInput("");
  };

  return (
    <div className={cn("w-full max-w-2xl mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs flex flex-col h-[400px]", className)} {...props}>
      <div className="pb-3 border-b border-neutral-200 dark:border-neutral-800 font-semibold text-neutral-900 dark:text-white">
        #engineering-sync • 3 participants
      </div>
      <div className="flex-1 overflow-y-auto py-4 space-y-3">
        {messages.map((m, idx) => (
          <div key={idx} className={cn("flex flex-col", m.from === "You" ? "items-end" : "items-start")}>
            <div className={cn("p-3 rounded-xl max-w-sm", m.from === "You" ? "bg-emerald-600 text-white" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white")}>
              {m.text}
            </div>
            <span className="text-[10px] text-neutral-400 mt-1">{m.time}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Reply to thread..."
          className="flex-1 px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900"
        />
        <button type="submit" className="px-4 py-2 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-lg font-semibold">
          Send
        </button>
      </form>
    </div>
  );
}
`,
    demo: `"use client";

import { InboxConversationThread } from "./inbox-conversation-thread";

export default function Demo() {
  return (
    <div className="w-full min-h-[450px] p-4 flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
      <InboxConversationThread />
    </div>
  );
}
`,
  }),

  P("form-survey-builder", {
    category: "blocks",
    title: "Form Survey Builder",
    description: "An interactive questionnaire block with multi-type questions, progress tracking, and submission summaries.",
    difficulty: "intermediate",
    subcategory: "forms",
    fingerprint: {
      interactionModel: "survey-question-response-flow",
      visualModel: "card-based-survey-wizard",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "customer-survey-collection",
    },
    tags: ["survey", "form", "questions", "feedback", "builder"],
    dependencies: [],
    dna: {
      macrostructure: "stack",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
      shapeLanguage: "rounded",
      density: "medium",
      genre: "minimal",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function FormSurveyBuilder({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [satisfaction, setSatisfaction] = React.useState<number | null>(null);

  return (
    <div className={cn("w-full max-w-xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">Developer Experience Survey</h3>
      <p className="text-neutral-500 mb-6">How seamless was your experience installing OpenUI registry components?</p>

      <div className="flex justify-between gap-2 mb-6">
        {[1, 2, 3, 4, 5].map((val) => (
          <button
            key={val}
            type="button"
            onClick={() => setSatisfaction(val)}
            className={cn(
              "h-12 flex-1 rounded-xl border font-bold font-mono text-sm transition-colors",
              satisfaction === val ? "bg-emerald-600 text-white border-emerald-600" : "border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900"
            )}
          >
            {val}
          </button>
        ))}
      </div>

      <button type="button" disabled={!satisfaction} className="w-full py-2.5 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-lg font-semibold disabled:opacity-40">
        Submit Feedback
      </button>
    </div>
  );
}
`,
    demo: `"use client";

import { FormSurveyBuilder } from "./form-survey-builder";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <FormSurveyBuilder />
    </div>
  );
}
`,
  }),

  P("cloud-deployment-pipeline", {
    category: "blocks",
    title: "Cloud Deployment Pipeline",
    description: "A continuous integration and edge release runner displaying step progress (Build, Test, Deploy, Verify).",
    difficulty: "advanced",
    subcategory: "devops",
    fingerprint: {
      interactionModel: "ci-pipeline-stage-tracking",
      visualModel: "horizontal-node-pipeline-graph",
      motionModel: "subtle",
      layoutModel: "rail-layout",
      semanticPurpose: "continuous-deployment-status",
    },
    tags: ["ci-cd", "pipeline", "deployment", "devops", "cloud"],
    dependencies: [],
    dna: {
      macrostructure: "rail",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "accent-only",
      shapeLanguage: "rounded",
      density: "compact",
      genre: "technical",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function CloudDeploymentPipeline({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const stages = [
    { name: "Lint & Prettier", status: "Passed", duration: "12s" },
    { name: "Vitest (14 packages)", status: "Passed", duration: "24s" },
    { name: "Registry Typecheck", status: "Passed", duration: "6s" },
    { name: "Edge V8 Mirror Sync", status: "Active", duration: "running..." },
  ];

  return (
    <div className={cn("w-full max-w-4xl mx-auto p-5 bg-neutral-950 text-neutral-100 border border-neutral-800 rounded-xl font-mono text-xs", className)} {...props}>
      <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
        <span className="font-bold text-white">Pipeline #2842 • commit 8f92a1</span>
        <span className="text-emerald-400 font-bold">● Running Edge Sync</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {stages.map((st) => (
          <div key={st.name} className="p-3 rounded bg-neutral-900 border border-neutral-800">
            <div className="text-neutral-400 text-[10px] uppercase">{st.name}</div>
            <div className={cn("font-bold mt-1", st.status === "Passed" ? "text-emerald-400" : "text-amber-400 animate-pulse")}>
              {st.status}
            </div>
            <div className="text-[10px] text-neutral-500 mt-1">{st.duration}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { CloudDeploymentPipeline } from "./cloud-deployment-pipeline";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] p-4 flex items-center justify-center bg-neutral-900">
      <CloudDeploymentPipeline />
    </div>
  );
}
`,
  }),

  P("customer-support-ticket-desk", {
    category: "blocks",
    title: "Customer Support Ticket Desk",
    description: "A customer service ticket triage queue with priority labels, status toggles, and assignee badges.",
    difficulty: "intermediate",
    subcategory: "support",
    fingerprint: {
      interactionModel: "ticket-status-triage-filter",
      visualModel: "support-queue-workbench",
      motionModel: "none",
      layoutModel: "stack-layout",
      semanticPurpose: "support-ticket-resolution",
    },
    tags: ["support", "tickets", "helpdesk", "triage", "queue"],
    dependencies: [],
    dna: {
      macrostructure: "stack",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
      shapeLanguage: "rounded",
      density: "medium",
      genre: "minimal",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function CustomerSupportTicketDesk({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const tickets = [
    { id: "TICK-101", subject: "Next.js 15 Server Action prop binding issue", priority: "High", status: "Open" },
    { id: "TICK-102", subject: "Figma token export color math question", priority: "Low", status: "Resolved" },
  ];

  return (
    <div className={cn("w-full max-w-3xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-4">Support Inquiries Queue</h3>
      <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
        {tickets.map((t) => (
          <div key={t.id} className="p-4 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-neutral-400">{t.id}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                  {t.priority}
                </span>
              </div>
              <div className="font-semibold text-neutral-900 dark:text-white mt-1">{t.subject}</div>
            </div>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{t.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { CustomerSupportTicketDesk } from "./customer-support-ticket-desk";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] p-4 flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
      <CustomerSupportTicketDesk />
    </div>
  );
}
`,
  }),

  P("media-asset-gallery", {
    category: "blocks",
    title: "Media Asset Gallery",
    description: "A digital media library grid featuring thumbnail previews, resolution chips, and selection checkboxes.",
    difficulty: "intermediate",
    subcategory: "media",
    fingerprint: {
      interactionModel: "gallery-thumbnail-selection",
      visualModel: "responsive-image-asset-grid",
      motionModel: "subtle",
      layoutModel: "mosaic-layout",
      semanticPurpose: "media-asset-management",
    },
    tags: ["media", "gallery", "images", "assets", "grid"],
    dependencies: [],
    dna: {
      macrostructure: "mosaic",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
      shapeLanguage: "rounded",
      density: "medium",
      genre: "minimal",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function MediaAssetGallery({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const assets = [
    { title: "hero-poster.png", res: "3840x2160", size: "1.8 MB" },
    { title: "brand-symbol.svg", res: "Vector", size: "16 KB" },
    { title: "product-mockup.webp", res: "1920x1080", size: "420 KB" },
  ];

  return (
    <div className={cn("w-full max-w-4xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-4">Media Library</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {assets.map((a) => (
          <div key={a.title} className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
            <div className="h-28 rounded-lg bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center font-mono text-neutral-400 text-[10px]">
              [IMAGE PREVIEW]
            </div>
            <div className="font-semibold text-neutral-900 dark:text-white mt-2 truncate">{a.title}</div>
            <div className="flex justify-between text-neutral-400 text-[11px] mt-1">
              <span>{a.res}</span>
              <span>{a.size}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { MediaAssetGallery } from "./media-asset-gallery";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <MediaAssetGallery />
    </div>
  );
}
`,
  }),

  P("order-fulfillment-tracker", {
    category: "blocks",
    title: "Order Fulfillment Tracker",
    description: "A tracking status workbench showing delivery timeline, courier coordinates, and itemized packages.",
    difficulty: "intermediate",
    subcategory: "orders",
    fingerprint: {
      interactionModel: "shipment-tracking-stepper",
      visualModel: "package-fulfillment-timeline",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "ecommerce-fulfillment-status",
    },
    tags: ["order", "fulfillment", "tracking", "shipping", "ecommerce"],
    dependencies: [],
    dna: {
      macrostructure: "stack",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "accent-only",
      shapeLanguage: "rounded",
      density: "medium",
      genre: "minimal",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function OrderFulfillmentTracker({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-2xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm font-mono text-xs", className)} {...props}>
      <div className="flex justify-between items-center pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <div className="font-bold text-neutral-900 dark:text-white">Order #OPUI-9842</div>
          <div className="text-neutral-400 text-[11px]">Carrier: DHL Express (Track: 894204812)</div>
        </div>
        <span className="text-emerald-500 font-bold">In Transit</span>
      </div>
      <div className="mt-6 space-y-4">
        <div className="flex gap-3">
          <span className="text-emerald-500 font-bold">✓</span>
          <div>
            <div className="font-bold text-neutral-900 dark:text-white">Order Received & Paid</div>
            <div className="text-neutral-400 text-[11px]">Sep 16, 14:00 UTC</div>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="text-emerald-500 font-bold">✓</span>
          <div>
            <div className="font-bold text-neutral-900 dark:text-white">Dispatched from Hub</div>
            <div className="text-neutral-400 text-[11px]">Sep 17, 09:30 UTC</div>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="text-amber-500 font-bold">●</span>
          <div>
            <div className="font-bold text-neutral-900 dark:text-white">Out for Delivery</div>
            <div className="text-neutral-400 text-[11px]">Expected Today before 18:00</div>
          </div>
        </div>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { OrderFulfillmentTracker } from "./order-fulfillment-tracker";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] p-4 flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
      <OrderFulfillmentTracker />
    </div>
  );
}
`,
  }),

  P("feature-flags-controller", {
    category: "blocks",
    title: "Feature Flags Controller",
    description: "An environment release toggle panel managing boolean feature flags, rollout percentages, and target cohorts.",
    difficulty: "intermediate",
    subcategory: "devops",
    fingerprint: {
      interactionModel: "feature-flag-toggle-and-rollout",
      visualModel: "environment-switch-matrix",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "release-feature-management",
    },
    tags: ["feature-flags", "toggles", "rollout", "devops", "config"],
    dependencies: [],
    dna: {
      macrostructure: "stack",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "accent-only",
      shapeLanguage: "rounded",
      density: "compact",
      genre: "technical",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function FeatureFlagsController({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [flags, setFlags] = React.useState([
    { key: "experimental_canvas_v2", enabled: true, rollout: 100 },
    { key: "airgapped_mirror_sync", enabled: false, rollout: 0 },
    { key: "css_token_color_math", enabled: true, rollout: 50 },
  ]);

  const toggleFlag = (key: string) => {
    setFlags((prev) => prev.map((f) => (f.key === key ? { ...f, enabled: !f.enabled } : f)));
  };

  return (
    <div className={cn("w-full max-w-3xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-4">Production Feature Gates</h3>
      <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
        {flags.map((f) => (
          <div key={f.key} className="p-4 flex items-center justify-between">
            <div>
              <div className="font-bold text-neutral-900 dark:text-white">{f.key}</div>
              <div className="text-neutral-400 text-[11px] mt-0.5">Rollout: {f.rollout}% of traffic</div>
            </div>
            <button
              type="button"
              onClick={() => toggleFlag(f.key)}
              className={cn("px-3 py-1 rounded font-bold transition-colors", f.enabled ? "bg-emerald-600 text-white" : "bg-neutral-200 dark:bg-neutral-800 text-neutral-500")}
            >
              {f.enabled ? "ENABLED" : "DISABLED"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { FeatureFlagsController } from "./feature-flags-controller";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <FeatureFlagsController />
    </div>
  );
}
`,
  }),

  P("notifications-center-drawer", {
    category: "blocks",
    title: "Notifications Center Drawer",
    description: "A slide-out alerts drawer featuring unread count badges, clear actions, and categorized notification items.",
    difficulty: "intermediate",
    subcategory: "notifications",
    fingerprint: {
      interactionModel: "notification-tray-mark-read",
      visualModel: "slideout-activity-alerts-tray",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "user-system-notifications",
    },
    tags: ["notifications", "alerts", "drawer", "unread", "badge"],
    dependencies: [],
    dna: {
      macrostructure: "stack",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
      shapeLanguage: "rounded",
      density: "compact",
      genre: "minimal",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function NotificationsCenterDrawer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [unreadCount, setUnreadCount] = React.useState(2);

  return (
    <div className={cn("w-full max-w-md mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl text-xs", className)} {...props}>
      <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-white">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-mono">
              {unreadCount}
            </span>
          )}
        </div>
        <button type="button" onClick={() => setUnreadCount(0)} className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white text-[11px]">
          Mark all read
        </button>
      </div>

      <div className="divide-y divide-neutral-100 dark:divide-neutral-800 mt-2">
        <div className="py-3">
          <div className="font-semibold text-neutral-900 dark:text-white">Release v2.4.0 verified</div>
          <div className="text-neutral-500 mt-0.5">800 open-source primitives are now live in the registry.</div>
          <div className="text-[10px] text-neutral-400 mt-1 font-mono">5m ago</div>
        </div>
        <div className="py-3">
          <div className="font-semibold text-neutral-900 dark:text-white">Security audit completed</div>
          <div className="text-neutral-500 mt-0.5">Zero vulnerabilities detected in automated scanning.</div>
          <div className="text-[10px] text-neutral-400 mt-1 font-mono">1h ago</div>
        </div>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { NotificationsCenterDrawer } from "./notifications-center-drawer";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <NotificationsCenterDrawer />
    </div>
  );
}
`,
  }),

  P("calendar-event-scheduler", {
    category: "blocks",
    title: "Calendar Event Scheduler",
    description: "An interactive date and time reservation widget supporting slot booking and automated invitation generation.",
    difficulty: "advanced",
    subcategory: "calendar",
    fingerprint: {
      interactionModel: "calendar-slot-selection-booking",
      visualModel: "date-picker-agenda-scheduler",
      motionModel: "subtle",
      layoutModel: "split-layout",
      semanticPurpose: "meeting-appointment-booking",
    },
    tags: ["calendar", "scheduler", "booking", "appointments", "dates"],
    dependencies: [],
    dna: {
      macrostructure: "split",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
      shapeLanguage: "rounded",
      density: "medium",
      genre: "minimal",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function CalendarEventScheduler({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [slot, setSlot] = React.useState<string | null>("10:00 AM");

  const slots = ["09:00 AM", "10:00 AM", "11:30 AM", "02:00 PM", "03:30 PM"];

  return (
    <div className={cn("w-full max-w-2xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-4">Architecture Review Session</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <div className="font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Available Slots (Today)</div>
          <div className="space-y-2">
            {slots.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSlot(s)}
                className={cn(
                  "w-full py-2 px-3 rounded-lg border font-mono transition-colors text-left",
                  slot === s ? "border-emerald-600 bg-emerald-50/30 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 font-bold" : "border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 flex flex-col justify-between">
          <div>
            <div className="font-bold text-neutral-900 dark:text-white">Selected Meeting</div>
            <div className="text-neutral-500 mt-1">30 min video consultation with principal engineer.</div>
            <div className="mt-4 font-mono text-emerald-600 dark:text-emerald-400 font-bold">Time: {slot || "None"}</div>
          </div>
          <button type="button" className="w-full py-2 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-lg font-semibold mt-4">
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { CalendarEventScheduler } from "./calendar-event-scheduler";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <CalendarEventScheduler />
    </div>
  );
}
`,
  }),

  P("integrations-marketplace-grid", {
    category: "blocks",
    title: "Integrations Marketplace Grid",
    description: "An ecosystem catalog showcasing third-party software connections with install status and OAuth triggers.",
    difficulty: "intermediate",
    subcategory: "integrations",
    fingerprint: {
      interactionModel: "app-integration-connect-toggle",
      visualModel: "marketplace-app-catalog-cards",
      motionModel: "subtle",
      layoutModel: "mosaic-layout",
      semanticPurpose: "third-party-app-marketplace",
    },
    tags: ["integrations", "marketplace", "apps", "oauth", "plugins"],
    dependencies: [],
    dna: {
      macrostructure: "mosaic",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
      shapeLanguage: "rounded",
      density: "medium",
      genre: "minimal",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function IntegrationsMarketplaceGrid({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [apps, setApps] = React.useState([
    { name: "GitHub Sync", desc: "Automate pull request validation on push", connected: true },
    { name: "Slack Connect", desc: "Broadcast build alerts to engineering channel", connected: true },
    { name: "Figma Variables", desc: "Export design tokens to theme CSS files", connected: false },
    { name: "Sentry Telemetry", desc: "Pipe client component crashes to Sentry", connected: false },
  ]);

  const toggle = (name: string) => {
    setApps((prev) => prev.map((a) => (a.name === name ? { ...a, connected: !a.connected } : a)));
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-4">Connected Integrations</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {apps.map((a) => (
          <div key={a.name} className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 flex items-start justify-between gap-4">
            <div>
              <div className="font-bold text-neutral-900 dark:text-white">{a.name}</div>
              <div className="text-neutral-500 mt-1">{a.desc}</div>
            </div>
            <button
              type="button"
              onClick={() => toggle(a.name)}
              className={cn("px-3 py-1 rounded text-[11px] font-semibold transition-colors shrink-0", a.connected ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50" : "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900")}
            >
              {a.connected ? "Connected" : "Install"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { IntegrationsMarketplaceGrid } from "./integrations-marketplace-grid";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <IntegrationsMarketplaceGrid />
    </div>
  );
}
`,
  }),

  P("code-snippet-notebook", {
    category: "blocks",
    title: "Code Snippet Notebook",
    description: "An interactive computational notebook block with executable code cells, markdown blocks, and output preview.",
    difficulty: "advanced",
    subcategory: "developer",
    fingerprint: {
      interactionModel: "notebook-code-cell-execution",
      visualModel: "executable-snippet-workbook",
      motionModel: "none",
      layoutModel: "stack-layout",
      semanticPurpose: "interactive-code-notebook",
    },
    tags: ["notebook", "code", "cells", "execution", "developer"],
    dependencies: [],
    dna: {
      macrostructure: "stack",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "accent-only",
      shapeLanguage: "rounded",
      density: "compact",
      genre: "technical",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function CodeSnippetNotebook({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [output, setOutput] = React.useState<string | null>(null);

  const runCode = () => {
    setOutput("=> 800 items validated: 0 missing metadata, 0 duplicates.");
  };

  return (
    <div className={cn("w-full max-w-3xl mx-auto p-5 bg-neutral-950 text-neutral-100 border border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-3">
        <span className="text-neutral-400">Notebook cell [1]</span>
        <button type="button" onClick={runCode} className="px-3 py-1 bg-emerald-600 text-white rounded font-bold text-[11px]">
          Run Cell ▶
        </button>
      </div>
      <div className="p-3 bg-neutral-900 rounded text-emerald-400">
        import &#123; validateCatalog &#125; from "@openui/registry-schema";<br />
        const report = await validateCatalog();<br />
        console.log(report.summary);
      </div>
      {output && (
        <div className="mt-3 p-3 bg-neutral-900/60 border border-neutral-800 text-neutral-300 rounded">
          {output}
        </div>
      )}
    </div>
  );
}
`,
    demo: `"use client";

import { CodeSnippetNotebook } from "./code-snippet-notebook";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] p-4 flex items-center justify-center bg-neutral-900">
      <CodeSnippetNotebook />
    </div>
  );
}
`,
  }),

  P("user-feedback-nps-widget", {
    category: "blocks",
    title: "User Feedback NPS Widget",
    description: "A compact customer satisfaction widget featuring 0-10 Net Promoter Score selection and qualitative feedback field.",
    difficulty: "starter",
    subcategory: "feedback",
    fingerprint: {
      interactionModel: "nps-score-rating-submission",
      visualModel: "compact-floating-feedback-panel",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "customer-satisfaction-scoring",
    },
    tags: ["nps", "feedback", "rating", "survey", "widget"],
    dependencies: [],
    dna: {
      macrostructure: "stack",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
      shapeLanguage: "rounded",
      density: "compact",
      genre: "minimal",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function UserFeedbackNpsWidget({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [score, setScore] = React.useState<number | null>(null);

  return (
    <div className={cn("w-full max-w-md mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-lg text-xs", className)} {...props}>
      <h4 className="font-bold text-neutral-900 dark:text-white">How likely are you to recommend OpenUI?</h4>
      <p className="text-neutral-500 text-[11px] mt-0.5">0 = Not likely at all, 10 = Extremely likely</p>
      <div className="flex justify-between gap-1 my-4">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setScore(n)}
            className={cn("h-7 w-7 rounded font-mono font-bold transition-colors", score === n ? "bg-emerald-600 text-white" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300")}
          >
            {n}
          </button>
        ))}
      </div>
      <button type="button" disabled={score === null} className="w-full py-2 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-lg font-semibold disabled:opacity-40">
        Submit Rating
      </button>
    </div>
  );
}
`,
    demo: `"use client";

import { UserFeedbackNpsWidget } from "./user-feedback-nps-widget";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <UserFeedbackNpsWidget />
    </div>
  );
}
`,
  }),

  P("audit-compliance-dashboard", {
    category: "blocks",
    title: "Audit Compliance Dashboard",
    description: "An enterprise regulatory readiness dashboard showing SOC2, ISO 27001, and HIPAA control checks with evidence logs.",
    difficulty: "advanced",
    subcategory: "compliance",
    fingerprint: {
      interactionModel: "compliance-controls-checklist-tracker",
      visualModel: "audit-readiness-assurance-gauge",
      motionModel: "none",
      layoutModel: "mosaic-layout",
      semanticPurpose: "enterprise-security-compliance",
    },
    tags: ["compliance", "soc2", "iso27001", "hipaa", "audit"],
    dependencies: [],
    dna: {
      macrostructure: "mosaic",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "accent-only",
      shapeLanguage: "rounded",
      density: "compact",
      genre: "technical",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function AuditComplianceDashboard({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const controls = [
    { code: "CC6.1", name: "Logical Perimeter Security", status: "Passed", auditor: "Verified" },
    { code: "CC7.2", name: "Automated Vulnerability Scans", status: "Passed", auditor: "Verified" },
    { code: "CC8.1", name: "Tamper-Evident Change Logs", status: "Passed", auditor: "Verified" },
  ];

  return (
    <div className={cn("w-full max-w-4xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl font-mono text-xs shadow-sm", className)} {...props}>
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">SOC 2 Type II Conformance</h3>
          <p className="text-neutral-500 text-[11px] mt-0.5">38 of 38 audit controls certified.</p>
        </div>
        <span className="px-3 py-1 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
          100% AUDIT READY
        </span>
      </div>

      <div className="divide-y divide-neutral-100 dark:divide-neutral-800 mt-3">
        {controls.map((c) => (
          <div key={c.code} className="py-3 flex items-center justify-between">
            <div>
              <span className="font-bold text-neutral-900 dark:text-white">{c.code}</span>
              <span className="text-neutral-600 dark:text-neutral-400 ml-3">{c.name}</span>
            </div>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓ {c.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { AuditComplianceDashboard } from "./audit-compliance-dashboard";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <AuditComplianceDashboard />
    </div>
  );
}
`,
  }),
];

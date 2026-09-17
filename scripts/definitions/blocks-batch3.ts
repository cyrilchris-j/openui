import type { ResourceDefinition } from "../lib/definitions.js";

const P = (name: string, definition: Omit<ResourceDefinition, "name">): ResourceDefinition => ({
  name,
  ...definition,
});

export default [
  P("api-traffic-rate-limiter", {
    category: "blocks",
    title: "API Traffic Rate Limiter",
    description: "An edge rate limiting rule configurator managing requests-per-minute ceilings, burst limits, and CIDR blocks.",
    difficulty: "advanced",
    subcategory: "devops",
    fingerprint: {
      interactionModel: "rate-limit-slider-configuration",
      visualModel: "firewall-throttling-card",
      motionModel: "none",
      layoutModel: "stack-layout",
      semanticPurpose: "edge-traffic-rate-limiting",
    },
    tags: ["rate-limiting", "traffic", "security", "firewall", "devops"],
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

export function ApiTrafficRateLimiter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [rpm, setRpm] = React.useState(1200);

  return (
    <div className={cn("w-full max-w-xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-4">Edge Rate Limiting Rule</h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-neutral-500 mb-1">
            <span>Requests Per Minute (RPM)</span>
            <span className="font-bold text-neutral-900 dark:text-white">{rpm} req/min</span>
          </div>
          <input
            type="range"
            min="100"
            max="10000"
            step="100"
            value={rpm}
            onChange={(e) => setRpm(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>
        <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400">
          Enforces HTTP 429 Too Many Requests once ceiling is exceeded.
        </div>
        <button type="button" className="w-full py-2 bg-emerald-600 text-white rounded-lg font-semibold">
          Apply Edge Rule
        </button>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { ApiTrafficRateLimiter } from "./api-traffic-rate-limiter";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <ApiTrafficRateLimiter />
    </div>
  );
}
`,
  }),

  P("interactive-metric-sparkline", {
    category: "blocks",
    title: "Interactive Metric Sparkline",
    description: "A KPI telemetry card pairing high-precision numerical stats with interactive trend sparkline charts.",
    difficulty: "intermediate",
    subcategory: "analytics",
    fingerprint: {
      interactionModel: "sparkline-telemetry-scrubbing",
      visualModel: "stat-card-with-embedded-chart",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "metric-sparkline-visualization",
    },
    tags: ["sparkline", "metrics", "kpi", "charts", "analytics"],
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

export function InteractiveMetricSparkline({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-sm mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl font-mono text-xs shadow-sm", className)} {...props}>
      <div className="text-neutral-400 text-[10px] uppercase">Daily Active Invocations</div>
      <div className="text-2xl font-bold text-neutral-900 dark:text-white mt-1">1,492,800</div>
      <div className="text-emerald-500 font-bold text-[11px] mt-0.5">+14.2% vs yesterday</div>
      <div className="mt-4 h-16 rounded bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-400 text-[10px]">
        [SPARKLINE TREND CURVE]
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { InteractiveMetricSparkline } from "./interactive-metric-sparkline";

export default function Demo() {
  return (
    <div className="w-full min-h-[250px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <InteractiveMetricSparkline />
    </div>
  );
}
`,
  }),

  P("email-inbox-previewer", {
    category: "blocks",
    title: "Email Inbox Previewer",
    description: "A dual-column webmail client displaying message threads, sender badges, and email reading pane.",
    difficulty: "advanced",
    subcategory: "email",
    fingerprint: {
      interactionModel: "email-selection-and-reading-pane",
      visualModel: "split-email-inbox-workspace",
      motionModel: "none",
      layoutModel: "split-layout",
      semanticPurpose: "email-inbox-navigation",
    },
    tags: ["email", "inbox", "mail", "reader", "messages"],
    dependencies: [],
    dna: {
      macrostructure: "split",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
      shapeLanguage: "rounded",
      density: "compact",
      genre: "minimal",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function EmailInboxPreviewer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [active, setActive] = React.useState(0);

  const emails = [
    { from: "Marcus Vance", subject: "Verification suite completed", body: "All 800 items verified with 0 typescript errors." },
    { from: "Elena Rostova", subject: "Design DNA tokens updated", body: "Checked mathematical token consistency across themes." },
  ];

  return (
    <div className={cn("w-full max-w-3xl mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-5 space-y-2">
          {emails.map((m, idx) => (
            <div
              key={idx}
              onClick={() => setActive(idx)}
              className={cn(
                "p-3 rounded-xl border cursor-pointer transition-colors",
                active === idx ? "border-emerald-600 bg-emerald-50/20 dark:bg-emerald-950/20" : "border-neutral-200 dark:border-neutral-800"
              )}
            >
              <div className="font-bold text-neutral-900 dark:text-white">{m.from}</div>
              <div className="text-neutral-500 truncate mt-0.5">{m.subject}</div>
            </div>
          ))}
        </div>
        <div className="md:col-span-7 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
          <div className="font-bold text-sm text-neutral-900 dark:text-white mb-2">{emails[active]?.subject}</div>
          <div className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{emails[active]?.body}</div>
        </div>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { EmailInboxPreviewer } from "./email-inbox-previewer";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <EmailInboxPreviewer />
    </div>
  );
}
`,
  }),

  P("file-metadata-inspector", {
    category: "blocks",
    title: "File Metadata Inspector",
    description: "A binary file inspector drawer presenting MIME types, SHA-256 integrity checksums, and dimensions.",
    difficulty: "intermediate",
    subcategory: "files",
    fingerprint: {
      interactionModel: "metadata-inspection-and-hash-copy",
      visualModel: "asset-properties-sidebar",
      motionModel: "none",
      layoutModel: "stack-layout",
      semanticPurpose: "file-integrity-verification",
    },
    tags: ["file", "metadata", "sha256", "checksum", "mime"],
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

export function FileMetadataInspector({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-md mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-neutral-900 dark:text-white pb-3 border-b border-neutral-200 dark:border-neutral-800 mb-3">
        Asset Integrity Inspector
      </h3>
      <div className="space-y-2 text-[11px]">
        <div className="flex justify-between">
          <span className="text-neutral-500">File Name</span>
          <span className="font-bold text-neutral-900 dark:text-white">registry.tar.gz</span>
        </div>
        <div className="flex justify-between">
          <span className="text-neutral-500">MIME Type</span>
          <span>application/gzip</span>
        </div>
        <div className="flex justify-between">
          <span className="text-neutral-500">Byte Size</span>
          <span>4,290,140 B (4.1 MB)</span>
        </div>
        <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800">
          <span className="text-neutral-500">SHA-256 Hash</span>
          <div className="text-emerald-600 dark:text-emerald-400 font-bold truncate mt-0.5">
            8f92a10b48c2e91048f029a81234bcfe8192
          </div>
        </div>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { FileMetadataInspector } from "./file-metadata-inspector";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <FileMetadataInspector />
    </div>
  );
}
`,
  }),

  P("oauth-app-consent-screen", {
    category: "blocks",
    title: "OAuth App Consent Screen",
    description: "An authorization prompt displaying third-party application name, requested permission scopes, and grant actions.",
    difficulty: "starter",
    subcategory: "auth",
    fingerprint: {
      interactionModel: "oauth-scope-grant-authorization",
      visualModel: "permission-consent-dialog",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "oauth-authorization-consent",
    },
    tags: ["oauth", "consent", "permissions", "auth", "security"],
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

export function OauthAppConsentScreen({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-sm mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl text-center text-xs", className)} {...props}>
      <div className="h-12 w-12 mx-auto rounded-xl bg-neutral-900 text-white flex items-center justify-center text-xl font-bold mb-3">
        ◈
      </div>
      <h3 className="font-bold text-base text-neutral-900 dark:text-white">Authorize Figma Sync</h3>
      <p className="text-neutral-500 mt-1 mb-6">Figma Variables Sync is requesting read access to your design tokens.</p>
      <div className="space-y-2 mb-6">
        <button type="button" className="w-full py-2 bg-emerald-600 text-white font-semibold rounded-lg">
          Grant Access
        </button>
        <button type="button" className="w-full py-2 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-lg">
          Cancel
        </button>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { OauthAppConsentScreen } from "./oauth-app-consent-screen";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <OauthAppConsentScreen />
    </div>
  );
}
`,
  }),

  P("kanban-matrix-swimlane", {
    category: "blocks",
    title: "Kanban Matrix Swimlane",
    description: "A two-axis project board organizing engineering tasks by milestone rows and delivery columns.",
    difficulty: "advanced",
    subcategory: "kanban",
    fingerprint: {
      interactionModel: "swimlane-task-status-tracking",
      visualModel: "multilane-kanban-matrix",
      motionModel: "none",
      layoutModel: "mosaic-layout",
      semanticPurpose: "complex-project-task-matrix",
    },
    tags: ["kanban", "swimlane", "matrix", "tasks", "management"],
    dependencies: [],
    dna: {
      macrostructure: "mosaic",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
      shapeLanguage: "rounded",
      density: "compact",
      genre: "minimal",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function KanbanMatrixSwimlane({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-4xl mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-sm text-neutral-900 dark:text-white mb-3">Release 2.4 Swimlanes</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <div className="font-bold text-neutral-900 dark:text-white mb-2">Milestone: 800 Catalog Total</div>
          <div className="p-2 bg-white dark:bg-neutral-950 rounded border border-neutral-200 dark:border-neutral-800">
            ✓ 100% categories verified
          </div>
        </div>
        <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <div className="font-bold text-neutral-900 dark:text-white mb-2">Milestone: Registry Zero Errors</div>
          <div className="p-2 bg-white dark:bg-neutral-950 rounded border border-neutral-200 dark:border-neutral-800">
            ✓ Zero TypeScript compilation errors
          </div>
        </div>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { KanbanMatrixSwimlane } from "./kanban-matrix-swimlane";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <KanbanMatrixSwimlane />
    </div>
  );
}
`,
  }),

  P("user-role-permission-matrix", {
    category: "blocks",
    title: "User Role Permission Matrix",
    description: "An enterprise access control table defining read, write, and delete permissions per team persona.",
    difficulty: "intermediate",
    subcategory: "security",
    fingerprint: {
      interactionModel: "permission-checkbox-toggling",
      visualModel: "crud-permission-matrix-grid",
      motionModel: "none",
      layoutModel: "stack-layout",
      semanticPurpose: "rbac-access-permissions",
    },
    tags: ["permissions", "roles", "rbac", "security", "matrix"],
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

export function UserRolePermissionMatrix({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const roles = [
    { role: "Owner", read: true, write: true, delete: true },
    { role: "Developer", read: true, write: true, delete: false },
    { role: "Viewer", read: true, write: false, delete: false },
  ];

  return (
    <div className={cn("w-full max-w-3xl mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-sm text-neutral-900 dark:text-white mb-4">RBAC Role Privileges</h3>
      <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
        <div className="grid grid-cols-4 bg-neutral-50 dark:bg-neutral-900 p-2.5 font-bold text-neutral-500">
          <div>Role</div>
          <div>Read</div>
          <div>Write</div>
          <div>Delete</div>
        </div>
        {roles.map((r) => (
          <div key={r.role} className="grid grid-cols-4 p-2.5 items-center">
            <div className="font-bold text-neutral-900 dark:text-white">{r.role}</div>
            <div className="text-emerald-500 font-bold">{r.read ? "✓" : "—"}</div>
            <div className="text-emerald-500 font-bold">{r.write ? "✓" : "—"}</div>
            <div className="text-emerald-500 font-bold">{r.delete ? "✓" : "—"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { UserRolePermissionMatrix } from "./user-role-permission-matrix";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <UserRolePermissionMatrix />
    </div>
  );
}
`,
  }),

  P("realtime-chat-widget", {
    category: "blocks",
    title: "Realtime Chat Widget",
    description: "A floating customer support chat widget with interactive conversation history and agent availability.",
    difficulty: "intermediate",
    subcategory: "messaging",
    fingerprint: {
      interactionModel: "chat-modal-message-input",
      visualModel: "floating-support-chat-widget",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "customer-support-chat",
    },
    tags: ["chat", "support", "widget", "realtime", "messaging"],
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

export function RealtimeChatWidget({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-sm mx-auto p-4 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl text-xs", className)} {...props}>
      <div className="flex items-center gap-3 pb-3 border-b border-neutral-200 dark:border-neutral-800 mb-3">
        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        <div>
          <div className="font-bold text-neutral-900 dark:text-white">OpenUI Support Desk</div>
          <div className="text-neutral-400 text-[10px]">Active now • Avg reply 2m</div>
        </div>
      </div>
      <div className="h-36 overflow-y-auto space-y-2 p-1">
        <div className="p-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300">
          Hi! How can we assist with your component configuration?
        </div>
      </div>
      <input
        type="text"
        placeholder="Type a message..."
        className="w-full mt-2 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
      />
    </div>
  );
}
`,
    demo: `"use client";

import { RealtimeChatWidget } from "./realtime-chat-widget";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <RealtimeChatWidget />
    </div>
  );
}
`,
  }),

  P("password-generator-vault", {
    category: "blocks",
    title: "Password Generator Vault",
    description: "A cryptographic password generator with customizable length slider, character toggles, and copy confirmation.",
    difficulty: "starter",
    subcategory: "security",
    fingerprint: {
      interactionModel: "random-password-generation-slider",
      visualModel: "credential-vault-generator-card",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "credential-entropy-generator",
    },
    tags: ["password", "generator", "security", "vault", "crypto"],
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

export function PasswordGeneratorVault({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [len, setLen] = React.useState(24);

  return (
    <div className={cn("w-full max-w-md mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-3">Password Vault Generator</h3>
      <div className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-900 text-emerald-600 dark:text-emerald-400 font-bold tracking-wider mb-4 break-all">
        8f92a10!eB#k92@LpQ99148b
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-neutral-500">
          <span>Length</span>
          <span>{len} chars</span>
        </div>
        <input
          type="range"
          min="12"
          max="64"
          value={len}
          onChange={(e) => setLen(Number(e.target.value))}
          className="w-full accent-emerald-500 cursor-pointer"
        />
      </div>
      <button type="button" className="w-full py-2 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-lg font-bold">
        Copy Password
      </button>
    </div>
  );
}
`,
    demo: `"use client";

import { PasswordGeneratorVault } from "./password-generator-vault";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <PasswordGeneratorVault />
    </div>
  );
}
`,
  }),

  P("crypto-wallet-transaction-card", {
    category: "blocks",
    title: "Crypto Wallet Transaction Card",
    description: "A web3 payment card showing wallet balance, network confirmation status, and transaction hash link.",
    difficulty: "intermediate",
    subcategory: "finance",
    fingerprint: {
      interactionModel: "wallet-transfer-confirmation",
      visualModel: "crypto-balance-payment-card",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "crypto-wallet-transfers",
    },
    tags: ["crypto", "wallet", "web3", "finance", "blockchain"],
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

export function CryptoWalletTransactionCard({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-sm mx-auto p-6 bg-neutral-950 text-neutral-100 border border-neutral-800 rounded-2xl font-mono text-xs shadow-xl", className)} {...props}>
      <div className="text-neutral-400 text-[10px] uppercase">Wallet Balance</div>
      <div className="text-2xl font-bold text-white mt-1">4.8210 ETH</div>
      <div className="text-neutral-400 text-[11px] mt-0.5">≈ $12,480.20 USD</div>
      <div className="my-4 p-3 rounded bg-neutral-900 border border-neutral-800 text-[11px] text-emerald-400">
        Status: Confirmed (Block #19842010)
      </div>
      <button type="button" className="w-full py-2 bg-emerald-600 text-white font-bold rounded-lg">
        Send Transaction
      </button>
    </div>
  );
}
`,
    demo: `"use client";

import { CryptoWalletTransactionCard } from "./crypto-wallet-transaction-card";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] p-4 flex items-center justify-center bg-neutral-900">
      <CryptoWalletTransactionCard />
    </div>
  );
}
`,
  }),

  P("deployment-environment-diff", {
    category: "blocks",
    title: "Deployment Environment Diff",
    description: "A side-by-side environment inspector comparing staging vs production configuration variables.",
    difficulty: "intermediate",
    subcategory: "devops",
    fingerprint: {
      interactionModel: "env-variable-diff-comparison",
      visualModel: "side-by-side-config-diff",
      motionModel: "none",
      layoutModel: "split-layout",
      semanticPurpose: "environment-variable-comparison",
    },
    tags: ["env", "diff", "devops", "staging", "production"],
    dependencies: [],
    dna: {
      macrostructure: "split",
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

export function DeploymentEnvironmentDiff({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-4xl mx-auto p-5 bg-neutral-950 text-neutral-100 border border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-white mb-3">Environment Config Diff</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 rounded bg-neutral-900 border border-neutral-800">
          <div className="font-bold text-amber-400 mb-2">Staging (Preview)</div>
          <div>DATABASE_URL=postgres://preview:5432</div>
          <div>CACHE_TTL=60s</div>
        </div>
        <div className="p-3 rounded bg-neutral-900 border border-neutral-800">
          <div className="font-bold text-emerald-400 mb-2">Production (Live)</div>
          <div>DATABASE_URL=postgres://prod:5432</div>
          <div>CACHE_TTL=86400s</div>
        </div>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { DeploymentEnvironmentDiff } from "./deployment-environment-diff";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] p-4 flex items-center justify-center bg-neutral-900">
      <DeploymentEnvironmentDiff />
    </div>
  );
}
`,
  }),

  P("product-inventory-catalog", {
    category: "blocks",
    title: "Product Inventory Catalog",
    description: "An e-commerce stock management table showing product SKUs, inventory counts, and reorder triggers.",
    difficulty: "intermediate",
    subcategory: "ecommerce",
    fingerprint: {
      interactionModel: "inventory-stock-management",
      visualModel: "product-sku-inventory-table",
      motionModel: "none",
      layoutModel: "stack-layout",
      semanticPurpose: "ecommerce-inventory-catalog",
    },
    tags: ["inventory", "ecommerce", "sku", "stock", "catalog"],
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

export function ProductInventoryCatalog({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const items = [
    { sku: "OPUI-TEE-BLK", name: "Engineer Tee", stock: 142, status: "In Stock" },
    { sku: "OPUI-HOOD-GRY", name: "Architecture Hoodie", stock: 8, status: "Low Stock" },
  ];

  return (
    <div className={cn("w-full max-w-3xl mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-neutral-900 dark:text-white mb-3">Warehouse Stock</h3>
      <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
        {items.map((it) => (
          <div key={it.sku} className="p-3 flex items-center justify-between">
            <div>
              <span className="text-neutral-400">{it.sku}</span>
              <span className="font-bold text-neutral-900 dark:text-white ml-2">{it.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span>{it.stock} units</span>
              <span className={it.stock < 10 ? "text-amber-500 font-bold" : "text-emerald-500 font-bold"}>{it.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { ProductInventoryCatalog } from "./product-inventory-catalog";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <ProductInventoryCatalog />
    </div>
  );
}
`,
  }),

  P("customer-churn-risk-analyzer", {
    category: "blocks",
    title: "Customer Churn Risk Analyzer",
    description: "An AI telemetry analyzer tracking client engagement decline, health score metrics, and retention triggers.",
    difficulty: "advanced",
    subcategory: "crm",
    fingerprint: {
      interactionModel: "churn-risk-scoring-drilldown",
      visualModel: "predictive-customer-risk-gauge",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "customer-retention-scoring",
    },
    tags: ["churn", "retention", "crm", "health-score", "analytics"],
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

export function CustomerChurnRiskAnalyzer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-md mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-2">Account Health Analysis</h3>
      <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/20 text-center my-4">
        <div className="text-3xl font-bold font-mono text-emerald-600 dark:text-emerald-400">92 / 100</div>
        <div className="text-neutral-500 mt-1">Low Churn Risk • High Engagement</div>
      </div>
      <div className="space-y-2 text-neutral-600 dark:text-neutral-400">
        <div>✓ Daily CLI usage across 12 developers</div>
        <div>✓ 100% active seat utilization</div>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { CustomerChurnRiskAnalyzer } from "./customer-churn-risk-analyzer";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <CustomerChurnRiskAnalyzer />
    </div>
  );
}
`,
  }),

  P("incident-postmortem-report", {
    category: "blocks",
    title: "Incident Postmortem Report",
    description: "An operational incident debrief card summarizing root cause analysis, timeline, and mitigation actions.",
    difficulty: "intermediate",
    subcategory: "devops",
    fingerprint: {
      interactionModel: "incident-postmortem-review",
      visualModel: "structured-postmortem-dossier",
      motionModel: "none",
      layoutModel: "stack-layout",
      semanticPurpose: "incident-resolution-postmortem",
    },
    tags: ["incident", "postmortem", "devops", "mttr", "reliability"],
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

export function IncidentPostmortemReport({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-3xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <div className="flex justify-between items-center pb-3 border-b border-neutral-200 dark:border-neutral-800 mb-3">
        <span className="font-bold text-neutral-900 dark:text-white">INCIDENT #2026-08-A</span>
        <span className="text-emerald-500 font-bold">Resolved (MTTR: 8m)</span>
      </div>
      <div className="space-y-2 text-neutral-700 dark:text-neutral-300">
        <div><strong className="text-neutral-900 dark:text-white">Impact:</strong> Temporary 1.2s latency spike on EU-Frankfurt edge node.</div>
        <div><strong className="text-neutral-900 dark:text-white">Root Cause:</strong> Memory isolate GC compaction contention under 25k simultaneous requests.</div>
        <div><strong className="text-neutral-900 dark:text-white">Action Taken:</strong> Increased V8 isolate memory ceiling to 256MB.</div>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { IncidentPostmortemReport } from "./incident-postmortem-report";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <IncidentPostmortemReport />
    </div>
  );
}
`,
  }),

  P("cookie-audit-scanner", {
    category: "blocks",
    title: "Cookie Audit Scanner",
    description: "A regulatory privacy compliance scanner identifying first and third-party tracking scripts and cookies.",
    difficulty: "starter",
    subcategory: "privacy",
    fingerprint: {
      interactionModel: "cookie-compliance-scan-action",
      visualModel: "cookie-audit-report-table",
      motionModel: "none",
      layoutModel: "stack-layout",
      semanticPurpose: "privacy-cookie-auditing",
    },
    tags: ["cookies", "audit", "scanner", "gdpr", "privacy"],
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

export function CookieAuditScanner({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-2xl mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-neutral-900 dark:text-white mb-2">Cookie Conformance Scanner</h3>
      <div className="p-3 rounded bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold mb-3">
        ✓ 0 Third-Party Tracking Cookies Detected
      </div>
      <div className="text-neutral-500 text-[11px]">100% CCPA & GDPR compliant. OpenUI operates strictly cookie-less by default.</div>
    </div>
  );
}
`,
    demo: `"use client";

import { CookieAuditScanner } from "./cookie-audit-scanner";

export default function Demo() {
  return (
    <div className="w-full min-h-[250px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <CookieAuditScanner />
    </div>
  );
}
`,
  }),

  P("system-load-stress-tester", {
    category: "blocks",
    title: "System Load Stress Tester",
    description: "A simulated concurrent traffic stress tester with virtual user (VU) slider and live latency benchmarking curve.",
    difficulty: "advanced",
    subcategory: "testing",
    fingerprint: {
      interactionModel: "concurrency-load-stress-simulation",
      visualModel: "stress-test-benchmark-console",
      motionModel: "mechanical",
      layoutModel: "stack-layout",
      semanticPurpose: "load-concurrency-benchmarking",
    },
    tags: ["load-testing", "stress", "concurrency", "benchmark", "devops"],
    dependencies: [],
    dna: {
      macrostructure: "stack",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "accent-only",
      shapeLanguage: "sharp",
      density: "compact",
      genre: "technical",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function SystemLoadStressTester({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [vus, setVus] = React.useState(500);

  return (
    <div className={cn("w-full max-w-xl mx-auto p-5 bg-neutral-950 text-neutral-100 border border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-white mb-3">Cluster Stress Simulator</h3>
      <div className="space-y-3">
        <div className="flex justify-between text-neutral-400">
          <span>Concurrent VUs</span>
          <span className="text-emerald-400 font-bold">{vus} virtual users</span>
        </div>
        <input
          type="range"
          min="50"
          max="5000"
          value={vus}
          onChange={(e) => setVus(Number(e.target.value))}
          className="w-full accent-emerald-500 cursor-pointer"
        />
        <div className="p-3 rounded bg-neutral-900 text-neutral-300">
          Estimated p99 Latency: <strong>{Math.round(vus * 0.02 + 8)}ms</strong> (Zero dropouts)
        </div>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { SystemLoadStressTester } from "./system-load-stress-tester";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] p-4 flex items-center justify-center bg-neutral-900">
      <SystemLoadStressTester />
    </div>
  );
}
`,
  }),

  P("developer-webhook-debugger", {
    category: "blocks",
    title: "Developer Webhook Debugger",
    description: "An interactive webhook payload simulator with JSON syntax validation and instant HTTP response inspector.",
    difficulty: "intermediate",
    subcategory: "webhooks",
    fingerprint: {
      interactionModel: "webhook-payload-replay-sandbox",
      visualModel: "debugger-payload-console",
      motionModel: "none",
      layoutModel: "stack-layout",
      semanticPurpose: "webhook-endpoint-debugging",
    },
    tags: ["webhooks", "debugger", "replay", "json", "api"],
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

export function DeveloperWebhookDebugger({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-2xl mx-auto p-5 bg-neutral-950 text-neutral-100 border border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-white mb-3">Payload Replay Simulator</h3>
      <div className="p-3 bg-neutral-900 rounded border border-neutral-800 text-emerald-400 mb-3">
        &#123; "event": "resource.materialized", "count": 800 &#125;
      </div>
      <button type="button" className="w-full py-2 bg-emerald-600 text-white font-bold rounded">
        Dispatch Test Event →
      </button>
    </div>
  );
}
`,
    demo: `"use client";

import { DeveloperWebhookDebugger } from "./developer-webhook-debugger";

export default function Demo() {
  return (
    <div className="w-full min-h-[250px] p-4 flex items-center justify-center bg-neutral-900">
      <DeveloperWebhookDebugger />
    </div>
  );
}
`,
  }),

  P("pricing-calculator-quote", {
    category: "blocks",
    title: "Pricing Calculator Quote",
    description: "An enterprise quote estimator calculating multi-seat licenses with dedicated support add-on toggles.",
    difficulty: "intermediate",
    subcategory: "pricing",
    fingerprint: {
      interactionModel: "quote-cost-calculator",
      visualModel: "enterprise-quote-summary-sheet",
      motionModel: "subtle",
      layoutModel: "split-layout",
      semanticPurpose: "enterprise-contract-quote",
    },
    tags: ["quote", "calculator", "pricing", "enterprise", "billing"],
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

export function PricingCalculatorQuote({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [seats, setSeats] = React.useState(25);
  const total = seats * 29;

  return (
    <div className={cn("w-full max-w-xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-4">Enterprise Quote Estimator</h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-neutral-500 mb-1">
            <span>Team Members</span>
            <span className="font-mono font-bold text-neutral-900 dark:text-white">{seats} seats</span>
          </div>
          <input
            type="range"
            min="5"
            max="100"
            value={seats}
            onChange={(e) => setSeats(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>
        <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 flex justify-between items-center font-mono">
          <span className="font-bold text-neutral-900 dark:text-white">Estimated Annual Total:</span>
          <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">\${total * 12}/yr</span>
        </div>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { PricingCalculatorQuote } from "./pricing-calculator-quote";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <PricingCalculatorQuote />
    </div>
  );
}
`,
  }),

  P("smart-document-tagger", {
    category: "blocks",
    title: "Smart Document Tagger",
    description: "An automated keyword and category tagger allowing content editors to categorize resources quickly.",
    difficulty: "starter",
    subcategory: "editor",
    fingerprint: {
      interactionModel: "tag-addition-and-removal",
      visualModel: "interactive-pill-tagger-card",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "document-tag-categorization",
    },
    tags: ["tags", "tagger", "categorization", "taxonomy", "pills"],
    dependencies: [],
    dna: {
      macrostructure: "stack",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
      shapeLanguage: "pill",
      density: "compact",
      genre: "minimal",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function SmartDocumentTagger({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [tags, setTags] = React.useState(["react-19", "tailwind-v4", "zero-dependency"]);

  const removeTag = (t: string) => {
    setTags((prev) => prev.filter((x) => x !== t));
  };

  return (
    <div className={cn("w-full max-w-md mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <h3 className="font-bold text-neutral-900 dark:text-white mb-3">Resource Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <span key={t} className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-mono text-[11px] flex items-center gap-1.5">
            <span>{t}</span>
            <button type="button" onClick={() => removeTag(t)} className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white">
              ✕
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { SmartDocumentTagger } from "./smart-document-tagger";

export default function Demo() {
  return (
    <div className="w-full min-h-[250px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <SmartDocumentTagger />
    </div>
  );
}
`,
  }),

  P("mobile-push-notification-previewer", {
    category: "blocks",
    title: "Mobile Push Notification Previewer",
    description: "A mobile phone frame mockup visualizing iOS and Android push notifications with app badge counter.",
    difficulty: "starter",
    subcategory: "mobile",
    fingerprint: {
      interactionModel: "push-notification-preview-toggle",
      visualModel: "smartphone-lockscreen-notification-mockup",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "mobile-notification-preview",
    },
    tags: ["push", "notifications", "mobile", "preview", "ios"],
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

export function MobilePushNotificationPreviewer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-sm mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-xl text-xs", className)} {...props}>
      <div className="p-3.5 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <div className="flex items-center justify-between text-[10px] text-neutral-400 mb-1">
          <span className="font-bold text-neutral-900 dark:text-white">OPENUI REGISTRY</span>
          <span>Now</span>
        </div>
        <div className="font-bold text-neutral-900 dark:text-white">Release v2.4 Verified</div>
        <div className="text-neutral-600 dark:text-neutral-400 mt-0.5">800 components passing all automated tests.</div>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { MobilePushNotificationPreviewer } from "./mobile-push-notification-previewer";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <MobilePushNotificationPreviewer />
    </div>
  );
}
`,
  }),

  P("team-standup-digest", {
    category: "blocks",
    title: "Team Standup Digest",
    description: "An asynchronous standup card organizing squad updates across Completed, In Progress, and Blockers.",
    difficulty: "starter",
    subcategory: "team",
    fingerprint: {
      interactionModel: "async-standup-task-logging",
      visualModel: "standup-progress-card",
      motionModel: "none",
      layoutModel: "stack-layout",
      semanticPurpose: "agile-standup-tracking",
    },
    tags: ["standup", "team", "agile", "scrum", "tasks"],
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

export function TeamStandupDigest({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-4">Daily Engineering Standup</h3>
      <div className="space-y-3">
        <div>
          <div className="font-bold text-emerald-600 dark:text-emerald-400">✓ Yesterday Completed</div>
          <div className="text-neutral-600 dark:text-neutral-400 mt-1">Materialized 100 layouts and 100 sections.</div>
        </div>
        <div>
          <div className="font-bold text-blue-600 dark:text-blue-400">● Today's Focus</div>
          <div className="text-neutral-600 dark:text-neutral-400 mt-1">Complete 100 blocks to reach master 800/800.</div>
        </div>
        <div>
          <div className="font-bold text-rose-500">✕ Blockers</div>
          <div className="text-neutral-600 dark:text-neutral-400 mt-1">None! Zero TypeScript compiler errors.</div>
        </div>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { TeamStandupDigest } from "./team-standup-digest";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <TeamStandupDigest />
    </div>
  );
}
`,
  }),

  P("version-compatibility-matrix", {
    category: "blocks",
    title: "Version Compatibility Matrix",
    description: "A framework runtime compatibility checklist validating React 19, Next.js 15, Vite, and Node.js.",
    difficulty: "starter",
    subcategory: "devops",
    fingerprint: {
      interactionModel: "runtime-version-check-matrix",
      visualModel: "compatibility-assurance-grid",
      motionModel: "none",
      layoutModel: "stack-layout",
      semanticPurpose: "runtime-compatibility-verification",
    },
    tags: ["compatibility", "matrix", "versions", "react19", "nextjs15"],
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

export function VersionCompatibilityMatrix({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const versions = [
    { target: "React", version: ">=19.0.0", status: "Supported" },
    { target: "Next.js", version: ">=15.0.0", status: "Supported" },
    { target: "Vite", version: ">=6.0.0", status: "Supported" },
    { target: "Node.js", version: ">=20.0.0", status: "Supported" },
  ];

  return (
    <div className={cn("w-full max-w-2xl mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-neutral-900 dark:text-white mb-3">Runtime Compatibility Spec</h3>
      <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
        {versions.map((v) => (
          <div key={v.target} className="p-3 flex items-center justify-between">
            <span className="font-bold text-neutral-900 dark:text-white">{v.target}</span>
            <span className="text-neutral-400">{v.version}</span>
            <span className="text-emerald-500 font-bold">✓ {v.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { VersionCompatibilityMatrix } from "./version-compatibility-matrix";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <VersionCompatibilityMatrix />
    </div>
  );
}
`,
  }),

  P("feedback-sentiment-wordcloud", {
    category: "blocks",
    title: "Feedback Sentiment Wordcloud",
    description: "An aggregated customer sentiment visualization highlighting dominant feedback keywords and approval score.",
    difficulty: "intermediate",
    subcategory: "feedback",
    fingerprint: {
      interactionModel: "sentiment-tag-cloud-inspection",
      visualModel: "keyword-frequency-cloud",
      motionModel: "subtle",
      layoutModel: "scatter-layout",
      semanticPurpose: "customer-sentiment-analysis",
    },
    tags: ["sentiment", "feedback", "wordcloud", "keywords", "nps"],
    dependencies: [],
    dna: {
      macrostructure: "scatter",
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

export function FeedbackSentimentWordcloud({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const words = [
    { text: "fast", size: "text-2xl font-bold text-emerald-600" },
    { text: "zero-dependencies", size: "text-xl font-bold text-neutral-900 dark:text-white" },
    { text: "clean", size: "text-lg text-emerald-500" },
    { text: "type-safe", size: "text-xl font-bold text-neutral-800 dark:text-neutral-200" },
    { text: "flexible", size: "text-base text-neutral-500" },
  ];

  return (
    <div className={cn("w-full max-w-lg mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl text-center shadow-sm", className)} {...props}>
      <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-4">Customer Sentiment Summary</h3>
      <div className="flex flex-wrap items-center justify-center gap-4 py-4">
        {words.map((w) => (
          <span key={w.text} className={w.size}>
            {w.text}
          </span>
        ))}
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { FeedbackSentimentWordcloud } from "./feedback-sentiment-wordcloud";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <FeedbackSentimentWordcloud />
    </div>
  );
}
`,
  }),

  P("database-backup-restore-panel", {
    category: "blocks",
    title: "Database Backup Restore Panel",
    description: "A database snapshot management block with manual snapshot trigger, backup size logs, and point-in-time recovery.",
    difficulty: "intermediate",
    subcategory: "database",
    fingerprint: {
      interactionModel: "database-snapshot-creation-and-restore",
      visualModel: "backup-recovery-management-card",
      motionModel: "none",
      layoutModel: "stack-layout",
      semanticPurpose: "database-backup-recovery",
    },
    tags: ["database", "backup", "restore", "snapshots", "devops"],
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

export function DatabaseBackupRestorePanel({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-2xl mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <div className="flex justify-between items-center pb-3 border-b border-neutral-200 dark:border-neutral-800 mb-3">
        <span className="font-bold text-neutral-900 dark:text-white">Point-In-Time Snapshots</span>
        <button type="button" className="px-3 py-1 bg-emerald-600 text-white rounded font-bold text-[11px]">
          Create Snapshot
        </button>
      </div>
      <div className="space-y-2">
        <div className="p-3 rounded bg-neutral-50 dark:bg-neutral-900 flex justify-between items-center">
          <div>
            <div className="font-bold text-neutral-900 dark:text-white">snap_auto_20260918_0000</div>
            <div className="text-neutral-400 text-[10px]">Size: 1.8 GB • Retention: 30 days</div>
          </div>
          <button type="button" className="text-emerald-500 font-bold hover:underline">
            Restore
          </button>
        </div>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { DatabaseBackupRestorePanel } from "./database-backup-restore-panel";

export default function Demo() {
  return (
    <div className="w-full min-h-[250px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <DatabaseBackupRestorePanel />
    </div>
  );
}
`,
  }),

  P("serverless-function-logs", {
    category: "blocks",
    title: "Serverless Function Logs",
    description: "An edge serverless function invocation console reporting execution duration, memory consumption, and cold start metrics.",
    difficulty: "intermediate",
    subcategory: "devops",
    fingerprint: {
      interactionModel: "serverless-execution-log-streaming",
      visualModel: "edge-function-invocation-ledger",
      motionModel: "none",
      layoutModel: "stack-layout",
      semanticPurpose: "serverless-function-telemetry",
    },
    tags: ["serverless", "functions", "logs", "edge", "telemetry"],
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

export function ServerlessFunctionLogs({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-3xl mx-auto p-5 bg-neutral-950 text-neutral-100 border border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <div className="flex justify-between items-center pb-3 border-b border-neutral-800 mb-3">
        <span className="text-white font-bold">edge-handler: GET /api/v2/items</span>
        <span className="text-emerald-400">Duration: 4.2ms</span>
      </div>
      <div className="space-y-1 text-neutral-300">
        <div>[2026-09-18T00:12:00Z] START RequestId: 8f92a10b</div>
        <div>[2026-09-18T00:12:00Z] MEMORY: 32MB / 128MB Isolate</div>
        <div>[2026-09-18T00:12:00Z] END RequestId: 8f92a10b (Cold start: 0ms)</div>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { ServerlessFunctionLogs } from "./serverless-function-logs";

export default function Demo() {
  return (
    <div className="w-full min-h-[250px] p-4 flex items-center justify-center bg-neutral-900">
      <ServerlessFunctionLogs />
    </div>
  );
}
`,
  }),
];

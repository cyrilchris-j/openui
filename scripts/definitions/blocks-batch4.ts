import type { ResourceDefinition } from "../lib/definitions.js";

const P = (name: string, definition: Omit<ResourceDefinition, "name">): ResourceDefinition => ({
  name,
  ...definition,
});

export default [
  P("ai-prompt-tuning-workbench", {
    category: "blocks",
    title: "AI Prompt Tuning Workbench",
    description: "An interactive LLM prompt development playground with temperature sliders, token counters, and live response streaming.",
    difficulty: "advanced",
    subcategory: "ai",
    fingerprint: {
      interactionModel: "prompt-engineering-parameter-tuning",
      visualModel: "dual-pane-prompt-workbench",
      motionModel: "subtle",
      layoutModel: "split-layout",
      semanticPurpose: "ai-prompt-engineering",
    },
    tags: ["ai", "prompt", "llm", "temperature", "tokens"],
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

export function AiPromptTuningWorkbench({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [temp, setTemp] = React.useState(0.7);
  const [output, setOutput] = React.useState<string | null>(null);

  const generate = () => {
    setOutput("OpenUI is a decentralized design system registry providing 800 certified open-source components with zero runtime dependencies.");
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-4">Prompt Engineering Workbench</h3>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-7 space-y-3">
          <div>
            <label className="block text-neutral-500 mb-1">System Prompt</label>
            <textarea
              defaultValue="You are an expert design systems engineer specializing in zero-dependency React 19 architecture."
              rows={4}
              className="w-full p-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:outline-none"
            />
          </div>
          <button type="button" onClick={generate} className="px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg">
            Generate Response ▶
          </button>
          {output && (
            <div className="mt-4 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 leading-relaxed">
              {output}
            </div>
          )}
        </div>
        <div className="md:col-span-5 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 space-y-4">
          <div>
            <div className="flex justify-between font-mono text-neutral-500 mb-1">
              <span>Temperature</span>
              <span>{temp}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={temp}
              onChange={(e) => setTemp(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { AiPromptTuningWorkbench } from "./ai-prompt-tuning-workbench";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <AiPromptTuningWorkbench />
    </div>
  );
}
`,
  }),

  P("edge-cache-purge-console", {
    category: "blocks",
    title: "Edge Cache Purge Console",
    description: "A global CDN cache invalidator with URL path targeting, tag-based purging, and execution verification logs.",
    difficulty: "intermediate",
    subcategory: "devops",
    fingerprint: {
      interactionModel: "cache-invalidation-path-purge",
      visualModel: "cdn-purge-action-card",
      motionModel: "none",
      layoutModel: "stack-layout",
      semanticPurpose: "cdn-edge-cache-invalidation",
    },
    tags: ["cache", "cdn", "purge", "edge", "devops"],
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

export function EdgeCachePurgeConsole({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [purged, setPurged] = React.useState(false);

  return (
    <div className={cn("w-full max-w-xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-3">Edge CDN Cache Purge</h3>
      <input
        type="text"
        defaultValue="/r/components/*"
        className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 mb-3"
      />
      <button
        type="button"
        onClick={() => setPurged(true)}
        className="w-full py-2 bg-rose-600 text-white font-bold rounded-lg"
      >
        Purge Global Edge Cache
      </button>
      {purged && (
        <div className="mt-3 p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 rounded">
          ✓ Invalidated 284 global points of presence in 420ms.
        </div>
      )}
    </div>
  );
}
`,
    demo: `"use client";

import { EdgeCachePurgeConsole } from "./edge-cache-purge-console";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <EdgeCachePurgeConsole />
    </div>
  );
}
`,
  }),

  P("customer-invoice-dispute-card", {
    category: "blocks",
    title: "Customer Invoice Dispute Card",
    description: "A financial dispute review panel presenting customer complaint logs, transaction evidence, and refund actions.",
    difficulty: "intermediate",
    subcategory: "billing",
    fingerprint: {
      interactionModel: "dispute-resolution-action",
      visualModel: "invoice-chargeback-detail-card",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "financial-dispute-resolution",
    },
    tags: ["billing", "dispute", "chargeback", "finance", "invoice"],
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

export function CustomerInvoiceDisputeCard({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <div className="flex justify-between items-center pb-3 border-b border-neutral-200 dark:border-neutral-800 mb-4">
        <div>
          <h3 className="font-bold text-base text-neutral-900 dark:text-white">Dispute #DSP-9842</h3>
          <div className="text-neutral-500 text-[11px]">Invoice: $49.00 (Pro Monthly)</div>
        </div>
        <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-bold">
          Under Review
        </span>
      </div>
      <p className="text-neutral-600 dark:text-neutral-400 mb-6">
        Customer requested refund stating accidental renewal charge prior to cancellation.
      </p>
      <div className="flex gap-3">
        <button type="button" className="flex-1 py-2 bg-emerald-600 text-white font-semibold rounded-lg">
          Approve Full Refund
        </button>
        <button type="button" className="flex-1 py-2 border border-neutral-200 dark:border-neutral-800 rounded-lg">
          Decline Request
        </button>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { CustomerInvoiceDisputeCard } from "./customer-invoice-dispute-card";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <CustomerInvoiceDisputeCard />
    </div>
  );
}
`,
  }),

  P("api-documentation-explorer", {
    category: "blocks",
    title: "API Documentation Explorer",
    description: "An interactive API reference explorer with HTTP method badges (GET, POST), parameter tables, and live response simulation.",
    difficulty: "advanced",
    subcategory: "documentation",
    fingerprint: {
      interactionModel: "api-endpoint-try-it-out-request",
      visualModel: "openapi-interactive-specification-viewer",
      motionModel: "none",
      layoutModel: "split-layout",
      semanticPurpose: "api-specification-inspection",
    },
    tags: ["api", "docs", "explorer", "openapi", "endpoints"],
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

export function ApiDocumentationExplorer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-4xl mx-auto p-5 bg-neutral-950 text-neutral-100 border border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <div className="flex items-center gap-3 pb-3 border-b border-neutral-800 mb-4">
        <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-bold text-[10px]">GET</span>
        <span className="font-bold text-white">/api/v2/registry/item/[slug]</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3 bg-neutral-900 rounded border border-neutral-800">
          <div className="font-bold text-neutral-400 mb-2">Request Parameters</div>
          <div className="text-emerald-400">slug: string (required)</div>
        </div>
        <div className="p-3 bg-neutral-900 rounded border border-neutral-800">
          <div className="font-bold text-neutral-400 mb-2">Response 200 OK</div>
          <div className="text-neutral-300">&#123; "name": "button", "status": "verified" &#125;</div>
        </div>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { ApiDocumentationExplorer } from "./api-documentation-explorer";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] p-4 flex items-center justify-center bg-neutral-900">
      <ApiDocumentationExplorer />
    </div>
  );
}
`,
  }),

  P("realtime-collaborative-whiteboard", {
    category: "blocks",
    title: "Realtime Collaborative Whiteboard",
    description: "A collaborative drawing whiteboard mockup showing active cursor presences, sticky note objects, and shape tools.",
    difficulty: "advanced",
    subcategory: "collaboration",
    fingerprint: {
      interactionModel: "canvas-collaboration-cursor-tracking",
      visualModel: "virtual-whiteboard-infinite-canvas",
      motionModel: "subtle",
      layoutModel: "full-bleed-layout",
      semanticPurpose: "collaborative-visual-whiteboard",
    },
    tags: ["whiteboard", "canvas", "collaboration", "realtime", "drawing"],
    dependencies: [],
    dna: {
      macrostructure: "full-bleed",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
      shapeLanguage: "rounded",
      density: "medium",
      genre: "playful",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function RealtimeCollaborativeWhiteboard({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-4xl mx-auto h-72 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 relative overflow-hidden flex items-center justify-center font-mono text-xs", className)} {...props}>
      <div className="absolute top-4 left-4 flex gap-2">
        <span className="px-3 py-1 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-xs font-bold text-neutral-800 dark:text-neutral-200">
          ✏ Select Tool
        </span>
        <span className="px-3 py-1 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-xs text-neutral-500">
          📝 Sticky Note
        </span>
      </div>
      <div className="text-center text-neutral-400">
        [Multiplayer Whiteboard Stage — 3 Active Cursors]
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { RealtimeCollaborativeWhiteboard } from "./realtime-collaborative-whiteboard";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <RealtimeCollaborativeWhiteboard />
    </div>
  );
}
`,
  }),

  P("dark-mode-theme-customizer", {
    category: "blocks",
    title: "Dark Mode Theme Customizer",
    description: "An interactive color palette modifier letting developers adjust primary hue, saturation, and export CSS variables.",
    difficulty: "intermediate",
    subcategory: "theme",
    fingerprint: {
      interactionModel: "theme-hsl-token-manipulation",
      visualModel: "theme-color-palette-configurator",
      motionModel: "subtle",
      layoutModel: "split-layout",
      semanticPurpose: "theme-token-customization",
    },
    tags: ["theme", "darkmode", "colors", "tokens", "customizer"],
    dependencies: [],
    dna: {
      macrostructure: "split",
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

export function DarkModeThemeCustomizer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [hue, setHue] = React.useState(160);

  return (
    <div className={cn("w-full max-w-xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-4">HSL Theme Customizer</h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-neutral-500 mb-1">
            <span>Primary Brand Hue</span>
            <span className="font-bold">{hue}°</span>
          </div>
          <input
            type="range"
            min="0"
            max="360"
            value={hue}
            onChange={(e) => setHue(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>
        <div
          className="h-14 rounded-xl flex items-center justify-center font-bold text-white"
          style={{ backgroundColor: \`hsl(\${hue}, 80%, 40%)\` }}
        >
          Active Accent Preview
        </div>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { DarkModeThemeCustomizer } from "./dark-mode-theme-customizer";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <DarkModeThemeCustomizer />
    </div>
  );
}
`,
  }),

  P("system-incident-declaration-modal", {
    category: "blocks",
    title: "System Incident Declaration Modal",
    description: "An emergency incident declaration modal with severity tiers (P0, P1, P2), impact scope, and status broadcast checkbox.",
    difficulty: "intermediate",
    subcategory: "devops",
    fingerprint: {
      interactionModel: "incident-declaration-dispatch",
      visualModel: "emergency-response-declaration-modal",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "emergency-incident-declaration",
    },
    tags: ["incident", "devops", "modal", "alerts", "sre"],
    dependencies: [],
    dna: {
      macrostructure: "stack",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
      shapeLanguage: "sharp",
      density: "compact",
      genre: "technical",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function SystemIncidentDeclarationModal({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-md mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl text-xs", className)} {...props}>
      <h3 className="font-bold text-base text-rose-600 mb-2">Declare Operational Incident</h3>
      <p className="text-neutral-500 mb-4">This action broadcasts a pager alert to the on-call SRE squad.</p>
      <div className="space-y-3 mb-6">
        <div>
          <label className="block text-neutral-600 dark:text-neutral-400 mb-1">Severity Level</label>
          <select className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900">
            <option>P0 — Catastrophic Outage</option>
            <option>P1 — Degraded Performance</option>
            <option>P2 — Minor Edge Latency</option>
          </select>
        </div>
      </div>
      <button type="button" className="w-full py-2 bg-rose-600 text-white font-bold rounded-lg">
        Trigger Incident Alert 🚨
      </button>
    </div>
  );
}
`,
    demo: `"use client";

import { SystemIncidentDeclarationModal } from "./system-incident-declaration-modal";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <SystemIncidentDeclarationModal />
    </div>
  );
}
`,
  }),

  P("compliance-tamper-proof-ledger", {
    category: "blocks",
    title: "Compliance Tamper-Proof Ledger",
    description: "A cryptographic Merkle tree audit log displaying chained block hashes and automated immutability verification.",
    difficulty: "advanced",
    subcategory: "compliance",
    fingerprint: {
      interactionModel: "merkle-hash-chain-verification",
      visualModel: "cryptographic-ledger-block-view",
      motionModel: "none",
      layoutModel: "stack-layout",
      semanticPurpose: "immutable-audit-ledger",
    },
    tags: ["compliance", "ledger", "merkle", "sha256", "security"],
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

export function ComplianceTamperProofLedger({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-3xl mx-auto p-5 bg-neutral-950 text-neutral-100 border border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-white mb-3">Tamper-Proof Merkle Ledger</h3>
      <div className="space-y-2 text-[11px]">
        <div className="p-3 bg-neutral-900 rounded border border-neutral-800 flex justify-between">
          <span>Block #48201</span>
          <span className="text-emerald-400">hash: 9a204b... Verified ✓</span>
        </div>
        <div className="p-3 bg-neutral-900 rounded border border-neutral-800 flex justify-between">
          <span>Block #48202</span>
          <span className="text-emerald-400">hash: f4810c... Verified ✓</span>
        </div>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { ComplianceTamperProofLedger } from "./compliance-tamper-proof-ledger";

export default function Demo() {
  return (
    <div className="w-full min-h-[250px] p-4 flex items-center justify-center bg-neutral-900">
      <ComplianceTamperProofLedger />
    </div>
  );
}
`,
  }),

  P("developer-sandbox-embed-card", {
    category: "blocks",
    title: "Developer Sandbox Embed Card",
    description: "An embeddable code snippet preview card with iframe embed code generator and direct share button.",
    difficulty: "starter",
    subcategory: "developer",
    fingerprint: {
      interactionModel: "sandbox-embed-copy-code",
      visualModel: "embed-share-preview-card",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "sandbox-component-embedding",
    },
    tags: ["sandbox", "embed", "iframe", "developer", "share"],
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

export function DeveloperSandboxEmbedCard({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-md mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <h3 className="font-bold text-neutral-900 dark:text-white mb-2">Embed Sandbox</h3>
      <p className="text-neutral-500 mb-4">Paste this iframe to embed this live primitive into your documentation.</p>
      <div className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-900 font-mono text-[10px] text-neutral-700 dark:text-neutral-300 break-all mb-4">
        &lt;iframe src="https://openui.dev/embed/hero" width="100%" height="400" /&gt;
      </div>
      <button type="button" className="w-full py-2 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-semibold rounded-lg">
        Copy Embed Code
      </button>
    </div>
  );
}
`,
    demo: `"use client";

import { DeveloperSandboxEmbedCard } from "./developer-sandbox-embed-card";

export default function Demo() {
  return (
    <div className="w-full min-h-[250px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <DeveloperSandboxEmbedCard />
    </div>
  );
}
`,
  }),

  P("employee-onboarding-progress-tray", {
    category: "blocks",
    title: "Employee Onboarding Progress Tray",
    description: "An HR and IT provisioning tracker managing laptop shipping, GitHub team access, and SSO credentialing.",
    difficulty: "starter",
    subcategory: "team",
    fingerprint: {
      interactionModel: "employee-provisioning-checklist",
      visualModel: "it-onboarding-status-tray",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "employee-provisioning-tracking",
    },
    tags: ["employee", "onboarding", "hr", "it", "provisioning"],
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

export function EmployeeOnboardingProgressTray({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-md mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <h3 className="font-bold text-neutral-900 dark:text-white mb-3">Provisioning Status</h3>
      <div className="space-y-2">
        <div className="flex justify-between p-2 rounded bg-neutral-50 dark:bg-neutral-900">
          <span>GitHub Org Access</span>
          <span className="text-emerald-500 font-bold">✓ Active</span>
        </div>
        <div className="flex justify-between p-2 rounded bg-neutral-50 dark:bg-neutral-900">
          <span>Hardware Laptop</span>
          <span className="text-emerald-500 font-bold">✓ Delivered</span>
        </div>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { EmployeeOnboardingProgressTray } from "./employee-onboarding-progress-tray";

export default function Demo() {
  return (
    <div className="w-full min-h-[250px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <EmployeeOnboardingProgressTray />
    </div>
  );
}
`,
  }),

  P("security-ip-geofencing-rules", {
    category: "blocks",
    title: "Security IP Geofencing Rules",
    description: "A country-based edge geofencing rule controller allowing developers to allow or block inbound CIDR traffic.",
    difficulty: "intermediate",
    subcategory: "security",
    fingerprint: {
      interactionModel: "geofence-country-rule-toggle",
      visualModel: "geofence-policy-table",
      motionModel: "none",
      layoutModel: "stack-layout",
      semanticPurpose: "ip-geofence-firewall",
    },
    tags: ["geofence", "firewall", "security", "ip", "edge"],
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

export function SecurityIpGeofencingRules({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-lg mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-neutral-900 dark:text-white mb-3">Inbound Geofencing</h3>
      <div className="space-y-2">
        <div className="flex justify-between p-2.5 rounded bg-neutral-50 dark:bg-neutral-900">
          <span>United States (US)</span>
          <span className="text-emerald-500 font-bold">ALLOWED</span>
        </div>
        <div className="flex justify-between p-2.5 rounded bg-neutral-50 dark:bg-neutral-900">
          <span>European Union (EU)</span>
          <span className="text-emerald-500 font-bold">ALLOWED</span>
        </div>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { SecurityIpGeofencingRules } from "./security-ip-geofencing-rules";

export default function Demo() {
  return (
    <div className="w-full min-h-[250px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <SecurityIpGeofencingRules />
    </div>
  );
}
`,
  }),

  P("ecommerce-discount-rule-builder", {
    category: "blocks",
    title: "E-commerce Discount Rule Builder",
    description: "An automated pricing rule builder supporting conditional thresholds like free shipping above order limits.",
    difficulty: "intermediate",
    subcategory: "ecommerce",
    fingerprint: {
      interactionModel: "discount-rule-threshold-builder",
      visualModel: "conditional-rule-logic-card",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "ecommerce-pricing-rules",
    },
    tags: ["discount", "pricing", "rules", "ecommerce", "threshold"],
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

export function EcommerceDiscountRuleBuilder({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-md mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <h3 className="font-bold text-neutral-900 dark:text-white mb-2">Automatic Order Rule</h3>
      <p className="text-neutral-500 mb-4">IF cart total &gt; $100 THEN apply free priority shipping.</p>
      <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 font-semibold font-mono">
        Active in Production ✓
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { EcommerceDiscountRuleBuilder } from "./ecommerce-discount-rule-builder";

export default function Demo() {
  return (
    <div className="w-full min-h-[200px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <EcommerceDiscountRuleBuilder />
    </div>
  );
}
`,
  }),

  P("data-export-queue-monitor", {
    category: "blocks",
    title: "Data Export Queue Monitor",
    description: "A background asynchronous export task monitor with live progress percentage and download links.",
    difficulty: "intermediate",
    subcategory: "devops",
    fingerprint: {
      interactionModel: "export-job-progress-monitoring",
      visualModel: "async-task-queue-tray",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "async-data-export-queue",
    },
    tags: ["queue", "export", "async", "jobs", "devops"],
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

export function DataExportQueueMonitor({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-xl mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-neutral-900 dark:text-white mb-3">Background Job Queue</h3>
      <div className="p-3 rounded bg-neutral-50 dark:bg-neutral-900 flex justify-between items-center">
        <div>
          <div className="font-bold text-neutral-900 dark:text-white">export_catalog_800.json</div>
          <div className="text-neutral-400 text-[10px]">Completed in 1.4s</div>
        </div>
        <button type="button" className="text-emerald-500 font-bold hover:underline">
          Download ↓
        </button>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { DataExportQueueMonitor } from "./data-export-queue-monitor";

export default function Demo() {
  return (
    <div className="w-full min-h-[200px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <DataExportQueueMonitor />
    </div>
  );
}
`,
  }),

  P("user-retention-cohort-matrix", {
    category: "blocks",
    title: "User Retention Cohort Matrix",
    description: "A SaaS analytics retention heatmap table visualizing weekly active cohorts and retention percentages.",
    difficulty: "advanced",
    subcategory: "analytics",
    fingerprint: {
      interactionModel: "cohort-matrix-cell-inspection",
      visualModel: "saas-retention-heatmap-grid",
      motionModel: "none",
      layoutModel: "mosaic-layout",
      semanticPurpose: "user-cohort-retention-analysis",
    },
    tags: ["cohort", "retention", "analytics", "heatmap", "metrics"],
    dependencies: [],
    dna: {
      macrostructure: "mosaic",
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

export function UserRetentionCohortMatrix({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-2xl mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-neutral-900 dark:text-white mb-3">Weekly Retention Heatmap</h3>
      <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
        <div className="p-2 bg-emerald-600 text-white rounded font-bold">W1: 100%</div>
        <div className="p-2 bg-emerald-500 text-white rounded font-bold">W2: 84%</div>
        <div className="p-2 bg-emerald-400 text-neutral-900 rounded font-bold">W3: 78%</div>
        <div className="p-2 bg-emerald-300 text-neutral-900 rounded font-bold">W4: 74%</div>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { UserRetentionCohortMatrix } from "./user-retention-cohort-matrix";

export default function Demo() {
  return (
    <div className="w-full min-h-[250px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <UserRetentionCohortMatrix />
    </div>
  );
}
`,
  }),

  P("hardware-isolate-telemetry-tile", {
    category: "blocks",
    title: "Hardware Isolate Telemetry Tile",
    description: "An isolated V8 runtime memory gauge showing heap allocations and garbage collection duration.",
    difficulty: "intermediate",
    subcategory: "telemetry",
    fingerprint: {
      interactionModel: "isolate-resource-telemetry-gauge",
      visualModel: "v8-memory-heap-tile",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "v8-isolate-heap-monitoring",
    },
    tags: ["v8", "isolate", "heap", "memory", "telemetry"],
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

export function HardwareIsolateTelemetryTile({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-sm mx-auto p-5 bg-neutral-950 text-neutral-100 border border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <div className="text-neutral-400 text-[10px]">V8 ISOLATE POOL</div>
      <div className="text-2xl font-bold text-white mt-1">28.4 MB / 128 MB</div>
      <div className="text-emerald-400 text-[11px] mt-1">GC Pause: 0.12ms (Optimal)</div>
    </div>
  );
}
`,
    demo: `"use client";

import { HardwareIsolateTelemetryTile } from "./hardware-isolate-telemetry-tile";

export default function Demo() {
  return (
    <div className="w-full min-h-[200px] p-4 flex items-center justify-center bg-neutral-900">
      <HardwareIsolateTelemetryTile />
    </div>
  );
}
`,
  }),

  P("webhook-retry-deadletter-queue", {
    category: "blocks",
    title: "Webhook Retry Deadletter Queue",
    description: "A dead-letter queue recovery tool displaying failed delivery events and bulk re-dispatch action triggers.",
    difficulty: "intermediate",
    subcategory: "webhooks",
    fingerprint: {
      interactionModel: "dead-letter-queue-redelivery",
      visualModel: "failed-job-retry-console",
      motionModel: "none",
      layoutModel: "stack-layout",
      semanticPurpose: "dead-letter-queue-recovery",
    },
    tags: ["deadletter", "queue", "webhooks", "retry", "devops"],
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

export function WebhookRetryDeadletterQueue({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [cleared, setCleared] = React.useState(false);

  return (
    <div className={cn("w-full max-w-xl mx-auto p-5 bg-neutral-950 text-neutral-100 border border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <div className="flex justify-between items-center pb-3 border-b border-neutral-800 mb-3">
        <span className="font-bold text-white">Dead Letter Queue (DLQ)</span>
        <button type="button" onClick={() => setCleared(true)} className="px-3 py-1 bg-emerald-600 text-white rounded font-bold text-[11px]">
          Retry All Events
        </button>
      </div>
      {!cleared ? (
        <div className="p-3 rounded bg-neutral-900 text-rose-400">
          1 failed event: HTTP 504 Gateway Timeout (partner endpoint)
        </div>
      ) : (
        <div className="p-3 rounded bg-emerald-950 text-emerald-400">
          ✓ All events redelivered successfully.
        </div>
      )}
    </div>
  );
}
`,
    demo: `"use client";

import { WebhookRetryDeadletterQueue } from "./webhook-retry-deadletter-queue";

export default function Demo() {
  return (
    <div className="w-full min-h-[250px] p-4 flex items-center justify-center bg-neutral-900">
      <WebhookRetryDeadletterQueue />
    </div>
  );
}
`,
  }),

  P("customer-support-call-scheduler", {
    category: "blocks",
    title: "Customer Support Call Scheduler",
    description: "A VIP technical consultation reservation block with timezone selection and instant calendar invitation dispatch.",
    difficulty: "starter",
    subcategory: "support",
    fingerprint: {
      interactionModel: "support-call-slot-reservation",
      visualModel: "consultation-booking-card",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "vip-support-consultation-booking",
    },
    tags: ["support", "booking", "consultation", "calendar", "vip"],
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

export function CustomerSupportCallScheduler({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-md mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs text-center", className)} {...props}>
      <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-2">Book an Architecture Call</h3>
      <p className="text-neutral-500 mb-6">Schedule 30 minutes with an OpenUI core maintainer.</p>
      <button type="button" className="w-full py-2 bg-emerald-600 text-white font-semibold rounded-lg">
        Choose Date & Time →
      </button>
    </div>
  );
}
`,
    demo: `"use client";

import { CustomerSupportCallScheduler } from "./customer-support-call-scheduler";

export default function Demo() {
  return (
    <div className="w-full min-h-[250px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <CustomerSupportCallScheduler />
    </div>
  );
}
`,
  }),

  P("multi-region-latency-benchmarker", {
    category: "blocks",
    title: "Multi-region Latency Benchmarker",
    description: "An edge ping diagnostic utility testing real-time connection latencies against Frankfurt, Virginia, Tokyo, and Singapore.",
    difficulty: "intermediate",
    subcategory: "telemetry",
    fingerprint: {
      interactionModel: "ping-benchmark-execution",
      visualModel: "edge-region-ping-comparison-card",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "multi-region-latency-testing",
    },
    tags: ["latency", "edge", "ping", "benchmark", "network"],
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

export function MultiRegionLatencyBenchmarker({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const regions = [
    { name: "US-East (N. Virginia)", ping: "4ms" },
    { name: "EU-West (Frankfurt)", ping: "12ms" },
    { name: "AP-East (Tokyo)", ping: "18ms" },
  ];

  return (
    <div className={cn("w-full max-w-lg mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-neutral-900 dark:text-white mb-3">Edge Ping Diagnostics</h3>
      <div className="space-y-2">
        {regions.map((r) => (
          <div key={r.name} className="p-2.5 rounded bg-neutral-50 dark:bg-neutral-900 flex justify-between">
            <span>{r.name}</span>
            <span className="text-emerald-500 font-bold">{r.ping}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { MultiRegionLatencyBenchmarker } from "./multi-region-latency-benchmarker";

export default function Demo() {
  return (
    <div className="w-full min-h-[250px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <MultiRegionLatencyBenchmarker />
    </div>
  );
}
`,
  }),

  P("smart-form-input-validator", {
    category: "blocks",
    title: "Smart Form Input Validator",
    description: "A live form field validator displaying real-time feedback for password strength, email formatting, and slug syntax.",
    difficulty: "starter",
    subcategory: "forms",
    fingerprint: {
      interactionModel: "live-input-schema-validation",
      visualModel: "interactive-form-validator-card",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "client-side-form-validation",
    },
    tags: ["forms", "validation", "input", "schema", "feedback"],
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

export function SmartFormInputValidator({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [slug, setSlug] = React.useState("valid-component-slug");
  const isValid = /^[a-z0-9-]+$/.test(slug);

  return (
    <div className={cn("w-full max-w-md mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <h3 className="font-bold text-neutral-900 dark:text-white mb-3">Slug Syntax Validator</h3>
      <input
        type="text"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 font-mono mb-2"
      />
      <div className={cn("font-mono text-[11px]", isValid ? "text-emerald-500" : "text-rose-500")}>
        {isValid ? "✓ Valid registry item slug format" : "✕ Must match /^[a-z0-9-]+$/"}
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { SmartFormInputValidator } from "./smart-form-input-validator";

export default function Demo() {
  return (
    <div className="w-full min-h-[250px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <SmartFormInputValidator />
    </div>
  );
}
`,
  }),

  P("cookie-consent-script-blocker", {
    category: "blocks",
    title: "Cookie Consent Script Blocker",
    description: "An automated script blocking inspector showing which third-party tags are held pending explicit consent.",
    difficulty: "starter",
    subcategory: "privacy",
    fingerprint: {
      interactionModel: "script-dependency-block-audit",
      visualModel: "tag-blocker-status-panel",
      motionModel: "none",
      layoutModel: "stack-layout",
      semanticPurpose: "script-blocking-consent-audit",
    },
    tags: ["privacy", "scripts", "consent", "gdpr", "blocking"],
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

export function CookieConsentScriptBlocker({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-lg mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-neutral-900 dark:text-white mb-2">Client Script Gatekeeper</h3>
      <div className="text-neutral-500 text-[11px] mb-3">All third-party scripts blocked prior to consent grant.</div>
      <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 rounded font-bold">
        Zero external scripts loaded. 100% clean isolate.
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { CookieConsentScriptBlocker } from "./cookie-consent-script-blocker";

export default function Demo() {
  return (
    <div className="w-full min-h-[200px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <CookieConsentScriptBlocker />
    </div>
  );
}
`,
  }),

  P("developer-terminal-ssh-session", {
    category: "blocks",
    title: "Developer Terminal SSH Session",
    description: "A browser-based remote shell console emulator displaying active connection authentication and status output.",
    difficulty: "advanced",
    subcategory: "developer",
    fingerprint: {
      interactionModel: "ssh-terminal-command-execution",
      visualModel: "browser-ssh-shell-window",
      motionModel: "mechanical",
      layoutModel: "stack-layout",
      semanticPurpose: "remote-shell-terminal-session",
    },
    tags: ["ssh", "terminal", "shell", "console", "developer"],
    dependencies: [],
    dna: {
      macrostructure: "stack",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
      shapeLanguage: "sharp",
      density: "dense",
      genre: "technical",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function DeveloperTerminalSshSession({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-2xl mx-auto p-5 bg-neutral-950 text-neutral-100 border border-neutral-800 rounded-xl font-mono text-xs shadow-xl", className)} {...props}>
      <div className="text-emerald-400 font-bold mb-2">ssh deploy@edge.openui.dev (mTLS verified)</div>
      <div className="text-neutral-300">
        Last login: Thu Sep 17 23:42:10 UTC from 192.0.2.4<br />
        openui-node-01:~$ pnpm validate:catalog<br />
        <span className="text-emerald-400">TOTAL 800/800 ✓ All checks passed.</span>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { DeveloperTerminalSshSession } from "./developer-terminal-ssh-session";

export default function Demo() {
  return (
    <div className="w-full min-h-[250px] p-4 flex items-center justify-center bg-neutral-900">
      <DeveloperTerminalSshSession />
    </div>
  );
}
`,
  }),

  P("project-roadmap-gantt-chart", {
    category: "blocks",
    title: "Project Roadmap Gantt Chart",
    description: "A milestone timeline Gantt visualization displaying deliverable progress across sprints and quarters.",
    difficulty: "intermediate",
    subcategory: "roadmap",
    fingerprint: {
      interactionModel: "gantt-timeline-scrubbing",
      visualModel: "quarterly-milestone-bar-chart",
      motionModel: "none",
      layoutModel: "mosaic-layout",
      semanticPurpose: "milestone-gantt-roadmap",
    },
    tags: ["gantt", "roadmap", "timeline", "milestones", "projects"],
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

export function ProjectRoadmapGanttChart({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-3xl mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-neutral-900 dark:text-white mb-4">Milestone Delivery Timeline</h3>
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-[11px] mb-1">
            <span>800 Certified Catalog Resources</span>
            <span className="text-emerald-500 font-bold">100% Completed</span>
          </div>
          <div className="w-full h-2 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
            <div className="h-full bg-emerald-500 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { ProjectRoadmapGanttChart } from "./project-roadmap-gantt-chart";

export default function Demo() {
  return (
    <div className="w-full min-h-[250px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <ProjectRoadmapGanttChart />
    </div>
  );
}
`,
  }),

  P("api-usage-quota-meter", {
    category: "blocks",
    title: "API Usage Quota Meter",
    description: "A developer usage quota tracker presenting monthly API limits, current burn rate, and alert thresholds.",
    difficulty: "starter",
    subcategory: "billing",
    fingerprint: {
      interactionModel: "quota-usage-monitoring",
      visualModel: "threshold-meter-progress-card",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "api-quota-consumption-tracking",
    },
    tags: ["quota", "usage", "meter", "billing", "api"],
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

export function ApiUsageQuotaMeter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-sm mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl font-mono text-xs shadow-sm", className)} {...props}>
      <div className="flex justify-between text-neutral-500 text-[11px] mb-1">
        <span>Monthly API Egress</span>
        <span className="font-bold text-neutral-900 dark:text-white">42,890 / 250,000</span>
      </div>
      <div className="w-full h-2 rounded-full bg-neutral-100 dark:bg-neutral-800 mb-2 overflow-hidden">
        <div className="h-full bg-emerald-500 w-[17%]" />
      </div>
      <div className="text-[10px] text-neutral-400">17% of monthly quota utilized. Resets Oct 1.</div>
    </div>
  );
}
`,
    demo: `"use client";

import { ApiUsageQuotaMeter } from "./api-usage-quota-meter";

export default function Demo() {
  return (
    <div className="w-full min-h-[200px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <ApiUsageQuotaMeter />
    </div>
  );
}
`,
  }),

  P("openui-registry-sync-workbench", {
    category: "blocks",
    title: "OpenUI Registry Sync Workbench",
    description: "An air-gapped private registry synchronizer checking upstream catalog parity and security advisories.",
    difficulty: "advanced",
    subcategory: "devops",
    fingerprint: {
      interactionModel: "registry-sync-audit-execution",
      visualModel: "airgapped-mirror-synchronizer",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "private-registry-synchronization",
    },
    tags: ["registry", "sync", "airgapped", "mirror", "devops"],
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

export function OpenuiRegistrySyncWorkbench({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-2xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl font-mono text-xs shadow-sm", className)} {...props}>
      <div className="flex justify-between items-center pb-3 border-b border-neutral-200 dark:border-neutral-800 mb-4">
        <span className="font-bold text-neutral-900 dark:text-white">Registry Mirror Status</span>
        <span className="text-emerald-500 font-bold">In Parity (800 / 800)</span>
      </div>
      <div className="p-3 rounded bg-neutral-50 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 mb-4">
        Local mirror is synchronized with upstream openui-registry v2.4.0.
      </div>
      <button type="button" className="w-full py-2 bg-emerald-600 text-white font-bold rounded-lg">
        Trigger Mirror Verification Check
      </button>
    </div>
  );
}
`,
    demo: `"use client";

import { OpenuiRegistrySyncWorkbench } from "./openui-registry-sync-workbench";

export default function Demo() {
  return (
    <div className="w-full min-h-[250px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <OpenuiRegistrySyncWorkbench />
    </div>
  );
}
`,
  }),
];

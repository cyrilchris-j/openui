import type { ResourceDefinition } from "../lib/definitions.js";

const P = (name: string, definition: Omit<ResourceDefinition, "name">): ResourceDefinition => ({
  name,
  ...definition,
});

export default [
  P("code-editor-workspace", {
    category: "blocks",
    title: "Code Editor Workspace",
    description: "A developer code workspace featuring numbered lines, language selection, run action, and simulated execution console.",
    difficulty: "advanced",
    subcategory: "developer",
    fingerprint: {
      interactionModel: "code-editing-and-terminal-output",
      visualModel: "syntax-editor-with-console-drawer",
      motionModel: "none",
      layoutModel: "split-layout",
      semanticPurpose: "developer-code-sandbox",
    },
    tags: ["code", "editor", "ide", "developer", "console"],
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

export function CodeEditorWorkspace({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [code, setCode] = React.useState("export default function Page() {\\n  return <h1>Hello OpenUI</h1>;\\n}");
  const [output, setOutput] = React.useState<string | null>(null);

  const handleRun = () => {
    setOutput("Compiled successfully in 14ms (React 19 Server Component)");
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto p-5 bg-neutral-950 text-neutral-100 border border-neutral-800 rounded-xl font-mono text-xs shadow-2xl", className)} {...props}>
      <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-emerald-400 font-bold">App.tsx</span>
          <span className="text-[10px] text-neutral-500">TypeScript / React 19</span>
        </div>
        <button type="button" onClick={handleRun} className="px-3 py-1 bg-emerald-600 text-white rounded font-bold text-[11px]">
          Execute ▶
        </button>
      </div>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={6}
        className="w-full bg-neutral-900 text-emerald-300 p-3 rounded border border-neutral-800 focus:outline-none resize-none"
      />

      {output && (
        <div className="mt-3 p-3 bg-neutral-900/80 border border-neutral-800 text-neutral-300 rounded">
          <span className="text-neutral-500">console.log:</span> {output}
        </div>
      )}
    </div>
  );
}
`,
    demo: `"use client";

import { CodeEditorWorkspace } from "./code-editor-workspace";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] p-4 flex items-center justify-center bg-neutral-900">
      <CodeEditorWorkspace />
    </div>
  );
}
`,
  }),

  P("database-query-runner", {
    category: "blocks",
    title: "Database Query Runner",
    description: "An SQL workbench featuring query input, execution benchmark timer, and structured result record grid.",
    difficulty: "advanced",
    subcategory: "database",
    fingerprint: {
      interactionModel: "sql-query-execution-and-results-grid",
      visualModel: "database-console-workbench",
      motionModel: "none",
      layoutModel: "stack-layout",
      semanticPurpose: "database-query-inspection",
    },
    tags: ["sql", "database", "query", "tables", "records"],
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

export function DatabaseQueryRunner({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [query, setQuery] = React.useState("SELECT name, category, status FROM registry_items LIMIT 3;");

  const results = [
    { name: "SplitHeadlineHero", category: "sections", status: "verified" },
    { name: "MagneticButton", category: "interactions", status: "verified" },
    { name: "HolyGrailLayout", category: "layouts", status: "verified" },
  ];

  return (
    <div className={cn("w-full max-w-4xl mx-auto p-5 bg-neutral-950 text-neutral-100 border border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-3">
        <span className="text-white font-bold">PostgreSQL Console (Isolate Pool)</span>
        <span className="text-emerald-400">0.8ms query time</span>
      </div>
      <div className="p-3 bg-neutral-900 rounded border border-neutral-800 text-neutral-300 mb-3">
        {query}
      </div>
      <div className="border border-neutral-800 rounded overflow-hidden">
        <div className="grid grid-cols-3 bg-neutral-900 p-2 font-bold text-neutral-400">
          <div>name</div>
          <div>category</div>
          <div>status</div>
        </div>
        <div className="divide-y divide-neutral-800">
          {results.map((r) => (
            <div key={r.name} className="grid grid-cols-3 p-2 text-neutral-200">
              <div>{r.name}</div>
              <div>{r.category}</div>
              <div className="text-emerald-400">{r.status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { DatabaseQueryRunner } from "./database-query-runner";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] p-4 flex items-center justify-center bg-neutral-900">
      <DatabaseQueryRunner />
    </div>
  );
}
`,
  }),

  P("webhook-delivery-inspector", {
    category: "blocks",
    title: "Webhook Delivery Inspector",
    description: "An HTTP webhook dispatch log displaying payload digests, status codes (200, 500), and retry action triggers.",
    difficulty: "intermediate",
    subcategory: "webhooks",
    fingerprint: {
      interactionModel: "webhook-event-inspection-and-retry",
      visualModel: "http-delivery-status-ledger",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "webhook-monitoring-console",
    },
    tags: ["webhooks", "http", "api", "payload", "retry"],
    dependencies: [],
    dna: {
      macrostructure: "stack",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "accent-only",
      shapeLanguage: "sharp",
      density: "compact",
      genre: "technical",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function WebhookDeliveryInspector({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const deliveries = [
    { event: "manifest.published", url: "https://api.partner.com/webhook", status: 200, latency: "42ms" },
    { event: "telemetry.alert", url: "https://ops.internal.net/alerts", status: 200, latency: "18ms" },
    { event: "audit.tamper_check", url: "https://audit.soc2.org/log", status: 500, latency: "210ms" },
  ];

  return (
    <div className={cn("w-full max-w-4xl mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-neutral-900 dark:text-white mb-4">Webhook Delivery Stream</h3>
      <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
        {deliveries.map((d, idx) => (
          <div key={idx} className="p-3 flex items-center justify-between">
            <div>
              <span className="font-bold text-neutral-900 dark:text-white">{d.event}</span>
              <span className="text-neutral-400 text-[11px] ml-2 truncate">{d.url}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-neutral-400 text-[11px]">{d.latency}</span>
              <span className={cn("px-2 py-0.5 rounded font-bold text-[10px]", d.status === 200 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" : "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300")}>
                HTTP {d.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { WebhookDeliveryInspector } from "./webhook-delivery-inspector";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <WebhookDeliveryInspector />
    </div>
  );
}
`,
  }),

  P("user-onboarding-checklist", {
    category: "blocks",
    title: "User Onboarding Checklist",
    description: "An interactive getting-started card with progress calculation, task completion toggles, and step guides.",
    difficulty: "starter",
    subcategory: "onboarding",
    fingerprint: {
      interactionModel: "task-completion-progress-checklist",
      visualModel: "gamified-onboarding-stepper",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "user-activation-checklist",
    },
    tags: ["onboarding", "checklist", "progress", "setup", "tasks"],
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

export function UserOnboardingChecklist({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [items, setItems] = React.useState([
    { id: "1", title: "Install OpenUI CLI globally", done: true },
    { id: "2", title: "Add first component to local src/", done: true },
    { id: "3", title: "Configure Design DNA invariants in openui.config.ts", done: false },
    { id: "4", title: "Verify build passes 'pnpm validate:catalog'", done: false },
  ]);

  const toggle = (id: string) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, done: !it.done } : it)));
  };

  const completed = items.filter((it) => it.done).length;
  const percent = Math.round((completed / items.length) * 100);

  return (
    <div className={cn("w-full max-w-xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-base text-neutral-900 dark:text-white">Workspace Onboarding</h3>
        <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{percent}% Done</span>
      </div>
      <div className="w-full h-2 rounded-full bg-neutral-100 dark:bg-neutral-800 mb-6 overflow-hidden">
        <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: \`\${percent}%\` }} />
      </div>
      <div className="space-y-3">
        {items.map((it) => (
          <div key={it.id} onClick={() => toggle(it.id)} className="flex items-center gap-3 p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
            <span className={cn("h-5 w-5 rounded-full flex items-center justify-center font-bold text-[10px]", it.done ? "bg-emerald-600 text-white" : "border border-neutral-300 dark:border-neutral-700")}>
              {it.done ? "✓" : ""}
            </span>
            <span className={cn(it.done ? "line-through text-neutral-400" : "font-medium text-neutral-800 dark:text-neutral-200")}>
              {it.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { UserOnboardingChecklist } from "./user-onboarding-checklist";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <UserOnboardingChecklist />
    </div>
  );
}
`,
  }),

  P("support-faq-knowledge-hub", {
    category: "blocks",
    title: "Support FAQ Knowledge Hub",
    description: "A customer documentation support hub featuring categorized topic tiles and instant search filtering.",
    difficulty: "intermediate",
    subcategory: "support",
    fingerprint: {
      interactionModel: "knowledge-base-topic-navigation",
      visualModel: "categorized-faq-hub-grid",
      motionModel: "subtle",
      layoutModel: "mosaic-layout",
      semanticPurpose: "self-service-support-hub",
    },
    tags: ["faq", "support", "knowledge-hub", "help", "docs"],
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

export function SupportFaqKnowledgeHub({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const topics = [
    { title: "Installation & CLI", count: "12 articles", icon: "⚡" },
    { title: "Design DNA Invariants", count: "8 articles", icon: "📐" },
    { title: "Custom Theme Tokens", count: "14 articles", icon: "🎨" },
    { title: "Enterprise Air-gapped Mirror", count: "6 articles", icon: "🔒" },
  ];

  return (
    <div className={cn("w-full max-w-4xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <div className="text-center max-w-xl mx-auto mb-8">
        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Knowledge Hub</h3>
        <p className="text-neutral-500 mt-1">Search through verified setup guides and architecture specifications.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {topics.map((t) => (
          <div key={t.title} className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-emerald-500 transition-colors cursor-pointer bg-neutral-50/40 dark:bg-neutral-900/30">
            <div className="text-2xl">{t.icon}</div>
            <h4 className="font-bold text-sm text-neutral-900 dark:text-white mt-2">{t.title}</h4>
            <div className="text-neutral-400 text-[11px] mt-1">{t.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { SupportFaqKnowledgeHub } from "./support-faq-knowledge-hub";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <SupportFaqKnowledgeHub />
    </div>
  );
}
`,
  }),

  P("device-session-manager", {
    category: "blocks",
    title: "Device Session Manager",
    description: "A security authentication sessions console showing active browsers, IP geolocations, and remote termination.",
    difficulty: "intermediate",
    subcategory: "security",
    fingerprint: {
      interactionModel: "session-revocation-controls",
      visualModel: "connected-device-roster",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "user-session-security",
    },
    tags: ["sessions", "devices", "security", "auth", "tokens"],
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

export function DeviceSessionManager({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [sessions, setSessions] = React.useState([
    { id: "s1", device: "MacBook Pro (Chrome 128)", ip: "192.0.2.1", location: "San Francisco, US", current: true },
    { id: "s2", device: "iPhone 16 Pro (Safari Mobile)", ip: "198.51.100.4", location: "San Francisco, US", current: false },
  ]);

  const revoke = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className={cn("w-full max-w-3xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-4">Active Device Sessions</h3>
      <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
        {sessions.map((s) => (
          <div key={s.id} className="p-4 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-neutral-900 dark:text-white">{s.device}</span>
                {s.current && <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">This Device</span>}
              </div>
              <div className="text-neutral-400 text-[11px] mt-0.5">{s.location} • IP: {s.ip}</div>
            </div>
            {!s.current && (
              <button type="button" onClick={() => revoke(s.id)} className="text-rose-500 hover:underline font-semibold">
                Revoke
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { DeviceSessionManager } from "./device-session-manager";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <DeviceSessionManager />
    </div>
  );
}
`,
  }),

  P("two-factor-auth-setup", {
    category: "blocks",
    title: "Two-Factor Auth Setup",
    description: "A time-based one-time password (TOTP) setup card featuring authenticator QR placeholder and verification code field.",
    difficulty: "intermediate",
    subcategory: "auth",
    fingerprint: {
      interactionModel: "totp-code-verification-setup",
      visualModel: "two-factor-authenticator-card",
      motionModel: "subtle",
      layoutModel: "split-layout",
      semanticPurpose: "mfa-security-provisioning",
    },
    tags: ["2fa", "totp", "security", "mfa", "auth"],
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
`,
    demo: `"use client";

import { TwoFactorAuthSetup } from "./two-factor-auth-setup";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <TwoFactorAuthSetup />
    </div>
  );
}
`,
  }),

  P("file-dropzone-uploader", {
    category: "blocks",
    title: "File Dropzone Uploader",
    description: "A drag-and-drop file staging area with visual dropzone, active upload progress, and file list preview.",
    difficulty: "intermediate",
    subcategory: "files",
    fingerprint: {
      interactionModel: "drag-and-drop-upload-staging",
      visualModel: "dashed-dropzone-progress-tray",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "file-upload-pipeline",
    },
    tags: ["uploader", "dropzone", "files", "drag-drop", "progress"],
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

export function FileDropzoneUploader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [uploaded, setUploaded] = React.useState(false);

  return (
    <div className={cn("w-full max-w-xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <div
        onClick={() => setUploaded(true)}
        className="p-8 border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl text-center cursor-pointer hover:border-emerald-500 transition-colors bg-neutral-50/50 dark:bg-neutral-900/30"
      >
        <div className="text-3xl mb-2">📥</div>
        <div className="font-semibold text-neutral-900 dark:text-white">Click or drag files here to upload</div>
        <div className="text-neutral-400 text-[11px] mt-1">Supports PNG, SVG, JSON up to 10MB</div>
      </div>
      {uploaded && (
        <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-lg flex justify-between items-center font-mono">
          <span>manifest_bundle.json (2.4 MB)</span>
          <span className="font-bold">Uploaded ✓</span>
        </div>
      )}
    </div>
  );
}
`,
    demo: `"use client";

import { FileDropzoneUploader } from "./file-dropzone-uploader";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <FileDropzoneUploader />
    </div>
  );
}
`,
  }),

  P("system-health-status-page", {
    category: "blocks",
    title: "System Health Status Page",
    description: "A complete service health status board displaying global edge availability, incident timeline, and uptime bars.",
    difficulty: "intermediate",
    subcategory: "status",
    fingerprint: {
      interactionModel: "system-status-indicator-monitoring",
      visualModel: "uptime-history-status-board",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "service-uptime-status",
    },
    tags: ["status", "health", "uptime", "services", "incidents"],
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

export function SystemHealthStatusPage({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const services = [
    { name: "Registry API Distribution", uptime: "99.99%" },
    { name: "Static Asset CDN Edge", uptime: "100.00%" },
    { name: "CLI Mirror Synchronization", uptime: "99.98%" },
  ];

  return (
    <div className={cn("w-full max-w-3xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl font-mono text-xs shadow-sm", className)} {...props}>
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800 mb-4">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-neutral-900 dark:text-white">All Systems Operational</span>
        </div>
        <span className="text-neutral-400">90-Day SLA</span>
      </div>

      <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
        {services.map((s) => (
          <div key={s.name} className="py-3 flex items-center justify-between">
            <span className="text-neutral-800 dark:text-neutral-200">{s.name}</span>
            <span className="text-emerald-500 font-bold">{s.uptime}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { SystemHealthStatusPage } from "./system-health-status-page";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <SystemHealthStatusPage />
    </div>
  );
}
`,
  }),

  P("email-template-composer", {
    category: "blocks",
    title: "Email Template Composer",
    description: "A newsletter and transactional email draft composer with subject line editor and live HTML view toggle.",
    difficulty: "advanced",
    subcategory: "email",
    fingerprint: {
      interactionModel: "email-composer-and-preview-toggle",
      visualModel: "wysiwyg-email-layout-editor",
      motionModel: "none",
      layoutModel: "split-layout",
      semanticPurpose: "transactional-email-authoring",
    },
    tags: ["email", "composer", "newsletter", "template", "messaging"],
    dependencies: [],
    dna: {
      macrostructure: "split",
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

export function EmailTemplateComposer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [subject, setSubject] = React.useState("OpenUI Release v2.4.0 — 800 Certified Primitives");

  return (
    <div className={cn("w-full max-w-3xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-4">Email Campaign Composer</h3>
      <div className="space-y-3">
        <div>
          <label className="block text-neutral-500 mb-1">Subject Line</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 font-semibold"
          />
        </div>
        <div>
          <label className="block text-neutral-500 mb-1">Body Preview</label>
          <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
            <h4 className="font-bold text-neutral-900 dark:text-white">Hi Team,</h4>
            <p className="text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
              We are excited to announce that all 800 registry resources across 8 categories have passed 100% automated verification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { EmailTemplateComposer } from "./email-template-composer";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <EmailTemplateComposer />
    </div>
  );
}
`,
  }),

  P("crm-customer-contact-card", {
    category: "blocks",
    title: "CRM Customer Contact Card",
    description: "A customer relationship management overview featuring deal pipeline status, company info, and call log notes.",
    difficulty: "intermediate",
    subcategory: "crm",
    fingerprint: {
      interactionModel: "deal-pipeline-stage-selection",
      visualModel: "customer-dossier-card",
      motionModel: "subtle",
      layoutModel: "split-layout",
      semanticPurpose: "crm-contact-record",
    },
    tags: ["crm", "customer", "contact", "deals", "sales"],
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

export function CrmCustomerContactCard({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [stage, setStage] = React.useState("Qualified Opportunity");

  return (
    <div className={cn("w-full max-w-2xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <div className="flex justify-between items-start pb-4 border-b border-neutral-200 dark:border-neutral-800 mb-4">
        <div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">Alex Rivera</h3>
          <div className="text-neutral-500">VP Architecture • Acme Cloud Systems</div>
        </div>
        <div className="text-right font-mono">
          <div className="text-base font-bold text-emerald-600 dark:text-emerald-400">$120,000 ARR</div>
          <div className="text-[10px] text-neutral-400">Annual Contract Value</div>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-neutral-500 mb-1">Deal Pipeline Stage</label>
          <select
            value={stage}
            onChange={(e) => setStage(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900"
          >
            <option>Discovery Call</option>
            <option>Qualified Opportunity</option>
            <option>Security Review</option>
            <option>Closed Won</option>
          </select>
        </div>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { CrmCustomerContactCard } from "./crm-customer-contact-card";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <CrmCustomerContactCard />
    </div>
  );
}
`,
  }),

  P("sales-pipeline-stage-funnel", {
    category: "blocks",
    title: "Sales Pipeline Stage Funnel",
    description: "A conversion stage funnel visualizing visitor-to-customer conversion percentages across the pipeline.",
    difficulty: "intermediate",
    subcategory: "analytics",
    fingerprint: {
      interactionModel: "funnel-conversion-rate-breakdown",
      visualModel: "stepped-sales-funnel-bars",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "revenue-funnel-analytics",
    },
    tags: ["funnel", "sales", "pipeline", "conversion", "metrics"],
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

export function SalesPipelineStageFunnel({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const steps = [
    { label: "Site Visitors", count: "128,400", rate: "100%" },
    { label: "CLI Downloads", count: "34,200", rate: "26.6%" },
    { label: "Workspace Created", count: "8,920", rate: "6.9%" },
    { label: "Pro Paid Seats", count: "2,140", rate: "1.6%" },
  ];

  return (
    <div className={cn("w-full max-w-3xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-4">Conversion Funnel Telemetry</h3>
      <div className="space-y-3">
        {steps.map((s) => (
          <div key={s.label} className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 flex justify-between items-center font-mono">
            <span className="font-semibold text-neutral-800 dark:text-neutral-200">{s.label}</span>
            <div className="flex gap-4">
              <span className="text-neutral-500">{s.count}</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{s.rate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { SalesPipelineStageFunnel } from "./sales-pipeline-stage-funnel";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <SalesPipelineStageFunnel />
    </div>
  );
}
`,
  }),

  P("audio-track-player-widget", {
    category: "blocks",
    title: "Audio Track Player Widget",
    description: "A rich multimedia audio card with waveform mockup, play/pause controls, time scrubber, and volume bar.",
    difficulty: "intermediate",
    subcategory: "media",
    fingerprint: {
      interactionModel: "audio-playback-and-scrubbing",
      visualModel: "waveform-audio-player-card",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "media-audio-player",
    },
    tags: ["audio", "player", "music", "waveform", "media"],
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

export function AudioTrackPlayerWidget({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [playing, setPlaying] = React.useState(false);

  return (
    <div className={cn("w-full max-w-md mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-lg text-xs", className)} {...props}>
      <div className="flex items-center gap-4 mb-4">
        <div className="h-12 w-12 rounded-xl bg-neutral-900 text-white flex items-center justify-center text-xl font-bold">
          ♫
        </div>
        <div>
          <h4 className="font-bold text-neutral-900 dark:text-white">Podcast: The Zero-Bundle Web</h4>
          <div className="text-neutral-400 text-[11px]">Elena Rostova • Episode 42</div>
        </div>
      </div>

      <div className="h-8 rounded bg-neutral-100 dark:bg-neutral-900 flex items-center px-3 font-mono text-[10px] text-neutral-400 justify-between mb-4">
        <span>02:14</span>
        <span>||||||||||||||||||||||||||||||||</span>
        <span>48:00</span>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => setPlaying(!playing)}
          className="h-10 w-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm"
        >
          {playing ? "❚❚" : "▶"}
        </button>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { AudioTrackPlayerWidget } from "./audio-track-player-widget";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <AudioTrackPlayerWidget />
    </div>
  );
}
`,
  }),

  P("video-playlist-workbench", {
    category: "blocks",
    title: "Video Playlist Workbench",
    description: "An educational video library block pairing an embedded video stage with an episodic queued playlist.",
    difficulty: "advanced",
    subcategory: "media",
    fingerprint: {
      interactionModel: "video-queue-selection-switching",
      visualModel: "video-stage-with-playlist-rail",
      motionModel: "subtle",
      layoutModel: "split-layout",
      semanticPurpose: "course-video-workbench",
    },
    tags: ["video", "playlist", "course", "media", "player"],
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

export function VideoPlaylistWorkbench({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [active, setActive] = React.useState(0);

  const playlist = [
    { title: "1. Core Philosophy of Design DNA", duration: "12m" },
    { title: "2. Setting Up Zero-Dependency Primitives", duration: "18m" },
    { title: "3. Verifying Schema with pnpm validate", duration: "14m" },
  ];

  return (
    <div className={cn("w-full max-w-4xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 bg-neutral-900 text-white rounded-xl h-56 flex items-center justify-center font-mono">
          [Playing: {playlist[active]?.title}]
        </div>
        <div className="md:col-span-4 space-y-2">
          <div className="font-bold text-neutral-900 dark:text-white mb-2">Tutorial Series</div>
          {playlist.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setActive(idx)}
              className={cn(
                "p-3 rounded-lg border cursor-pointer transition-colors",
                active === idx ? "border-emerald-600 bg-emerald-50/20 dark:bg-emerald-950/20 font-bold" : "border-neutral-200 dark:border-neutral-800"
              )}
            >
              <div>{item.title}</div>
              <div className="text-neutral-400 text-[10px] mt-1">{item.duration}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { VideoPlaylistWorkbench } from "./video-playlist-workbench";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <VideoPlaylistWorkbench />
    </div>
  );
}
`,
  }),

  P("coupon-discount-manager", {
    category: "blocks",
    title: "Coupon Discount Manager",
    description: "An e-commerce promotional discount code creator managing active promo percentages, usages, and expiry dates.",
    difficulty: "intermediate",
    subcategory: "ecommerce",
    fingerprint: {
      interactionModel: "discount-code-creation-and-table",
      visualModel: "promo-coupon-manager",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "ecommerce-coupon-management",
    },
    tags: ["coupons", "discounts", "ecommerce", "promo", "billing"],
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

export function CouponDiscountManager({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const coupons = [
    { code: "LAUNCH800", discount: "20% OFF", used: 142, status: "Active" },
    { code: "STUDENT50", discount: "50% OFF", used: 890, status: "Active" },
  ];

  return (
    <div className={cn("w-full max-w-3xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl font-mono text-xs shadow-sm", className)} {...props}>
      <div className="flex justify-between items-center pb-4 border-b border-neutral-200 dark:border-neutral-800 mb-4">
        <h3 className="font-bold text-neutral-900 dark:text-white">Active Promo Discounts</h3>
        <button type="button" className="px-3 py-1 bg-emerald-600 text-white rounded font-bold text-[11px]">
          Create Code
        </button>
      </div>
      <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
        {coupons.map((c) => (
          <div key={c.code} className="p-3 flex items-center justify-between">
            <div>
              <span className="font-bold text-neutral-900 dark:text-white">{c.code}</span>
              <span className="text-emerald-600 dark:text-emerald-400 ml-3 font-semibold">{c.discount}</span>
            </div>
            <span className="text-neutral-400">{c.used} redemptions</span>
          </div>
        ))}
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { CouponDiscountManager } from "./coupon-discount-manager";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <CouponDiscountManager />
    </div>
  );
}
`,
  }),

  P("invoice-generator-preview", {
    category: "blocks",
    title: "Invoice Generator Preview",
    description: "An itemized accounting invoice document with dynamic line additions, tax calculations, and printable summary.",
    difficulty: "advanced",
    subcategory: "billing",
    fingerprint: {
      interactionModel: "invoice-calculation-and-line-items",
      visualModel: "formal-invoice-document-sheet",
      motionModel: "none",
      layoutModel: "stack-layout",
      semanticPurpose: "tax-invoice-generation",
    },
    tags: ["invoice", "billing", "tax", "accounting", "calculator"],
    dependencies: [],
    dna: {
      macrostructure: "stack",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "monochrome",
      shapeLanguage: "sharp",
      density: "compact",
      genre: "swiss",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function InvoiceGeneratorPreview({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-2xl mx-auto p-8 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <div className="flex justify-between items-start pb-6 border-b border-neutral-300 dark:border-neutral-800">
        <div>
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white">INVOICE</h2>
          <div className="text-neutral-500">INV-2026-09-800</div>
        </div>
        <div className="text-right text-neutral-500">
          <div>Date: 2026-09-18</div>
          <div>Due: Upon Receipt</div>
        </div>
      </div>

      <div className="py-6 border-b border-neutral-200 dark:border-neutral-800 space-y-2">
        <div className="flex justify-between font-bold">
          <span>Item</span>
          <span>Amount</span>
        </div>
        <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
          <span>OpenUI Enterprise License (Annual)</span>
          <span>$1,908.00</span>
        </div>
      </div>

      <div className="pt-4 flex justify-between text-base font-bold text-neutral-900 dark:text-white">
        <span>Total Due</span>
        <span>$1,908.00</span>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { InvoiceGeneratorPreview } from "./invoice-generator-preview";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <InvoiceGeneratorPreview />
    </div>
  );
}
`,
  }),

  P("dns-record-management-table", {
    category: "blocks",
    title: "DNS Record Management Table",
    description: "A domain routing table managing A, CNAME, and TXT records with TTL durations and verification checks.",
    difficulty: "intermediate",
    subcategory: "devops",
    fingerprint: {
      interactionModel: "dns-record-row-management",
      visualModel: "domain-nameserver-table",
      motionModel: "none",
      layoutModel: "stack-layout",
      semanticPurpose: "dns-configuration-console",
    },
    tags: ["dns", "domains", "records", "devops", "cname"],
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

export function DnsRecordManagementTable({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const records = [
    { type: "A", host: "@", value: "76.76.21.21", ttl: "3600" },
    { type: "CNAME", host: "www", value: "cname.openui.dev", ttl: "3600" },
    { type: "TXT", host: "_dmarc", value: "v=DMARC1; p=reject;", ttl: "300" },
  ];

  return (
    <div className={cn("w-full max-w-4xl mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-neutral-900 dark:text-white mb-4">DNS Routing Matrix</h3>
      <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 bg-neutral-50 dark:bg-neutral-900 p-2.5 font-bold text-neutral-400">
          <div className="col-span-2">Type</div>
          <div className="col-span-3">Host</div>
          <div className="col-span-5">Value</div>
          <div className="col-span-2 text-right">TTL</div>
        </div>
        {records.map((r, idx) => (
          <div key={idx} className="grid grid-cols-12 p-2.5 items-center">
            <div className="col-span-2 font-bold text-emerald-600 dark:text-emerald-400">{r.type}</div>
            <div className="col-span-3 text-neutral-900 dark:text-white">{r.host}</div>
            <div className="col-span-5 text-neutral-500 truncate">{r.value}</div>
            <div className="col-span-2 text-right text-neutral-400">{r.ttl}s</div>
          </div>
        ))}
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { DnsRecordManagementTable } from "./dns-record-management-table";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <DnsRecordManagementTable />
    </div>
  );
}
`,
  }),

  P("audit-log-export-modal", {
    category: "blocks",
    title: "Audit Log Export Modal",
    description: "An export dialog allowing compliance administrators to bundle security event logs into CSV or JSON tarballs.",
    difficulty: "starter",
    subcategory: "security",
    fingerprint: {
      interactionModel: "export-format-and-date-selector",
      visualModel: "modal-export-dialog-box",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "security-audit-export",
    },
    tags: ["export", "audit", "compliance", "logs", "modal"],
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

export function AuditLogExportModal({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [format, setFormat] = React.useState<"json" | "csv">("json");
  const [exported, setExported] = React.useState(false);

  return (
    <div className={cn("w-full max-w-md mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl text-xs", className)} {...props}>
      <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">Export Audit Trail</h3>
      <p className="text-neutral-500 mb-4">Generate cryptographically verified compliance logs for external auditors.</p>

      <div className="space-y-3 mb-6 font-mono">
        <label className="block text-neutral-400 text-[11px]">Format</label>
        <div className="flex gap-2">
          {(["json", "csv"] as const).map((fmt) => (
            <button
              key={fmt}
              type="button"
              onClick={() => setFormat(fmt)}
              className={cn("px-4 py-2 rounded-lg border uppercase font-bold", format === fmt ? "border-emerald-600 bg-emerald-50/20 text-emerald-600 dark:text-emerald-400" : "border-neutral-200 dark:border-neutral-800")}
            >
              {fmt}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setExported(true)}
        className="w-full py-2.5 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-lg font-semibold"
      >
        {exported ? "Download Ready! (1.4 MB) ↓" : "Generate Export Bundle"}
      </button>
    </div>
  );
}
`,
    demo: `"use client";

import { AuditLogExportModal } from "./audit-log-export-modal";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <AuditLogExportModal />
    </div>
  );
}
`,
  }),

  P("user-avatar-crop-dialog", {
    category: "blocks",
    title: "User Avatar Crop Dialog",
    description: "An image profile adjustment modal featuring zoom slider, orientation rotation, and circular masking.",
    difficulty: "intermediate",
    subcategory: "settings",
    fingerprint: {
      interactionModel: "avatar-zoom-and-crop-adjustment",
      visualModel: "circular-mask-cropper-dialog",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "profile-image-customization",
    },
    tags: ["avatar", "crop", "image", "zoom", "profile"],
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

export function UserAvatarCropDialog({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [zoom, setZoom] = React.useState(100);

  return (
    <div className={cn("w-full max-w-sm mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl text-center text-xs", className)} {...props}>
      <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-4">Adjust Profile Photo</h3>
      <div className="h-32 w-32 mx-auto rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center font-mono text-neutral-400 mb-4 overflow-hidden">
        <span style={{ transform: \`scale(\${zoom / 100})\` }} className="transition-transform font-bold text-2xl">
          👤
        </span>
      </div>
      <div className="space-y-1 mb-6">
        <div className="flex justify-between text-neutral-500 font-mono text-[11px]">
          <span>Zoom</span>
          <span>{zoom}%</span>
        </div>
        <input
          type="range"
          min="100"
          max="200"
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="w-full accent-emerald-500 cursor-pointer"
        />
      </div>
      <button type="button" className="w-full py-2 bg-emerald-600 text-white rounded-lg font-semibold">
        Save Avatar
      </button>
    </div>
  );
}
`,
    demo: `"use client";

import { UserAvatarCropDialog } from "./user-avatar-crop-dialog";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <UserAvatarCropDialog />
    </div>
  );
}
`,
  }),

  P("multi-tenant-organization-switcher", {
    category: "blocks",
    title: "Multi-tenant Organization Switcher",
    description: "An enterprise workspace dropdown selector supporting team switching, plan badges, and tenant creation.",
    difficulty: "intermediate",
    subcategory: "navigation",
    fingerprint: {
      interactionModel: "organization-tenant-selection",
      visualModel: "multitenant-workspace-dropdown",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "organization-context-switching",
    },
    tags: ["tenants", "workspace", "organizations", "teams", "switcher"],
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

export function MultiTenantOrganizationSwitcher({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [activeOrg, setActiveOrg] = React.useState("OpenUI Core");

  const orgs = [
    { name: "OpenUI Core", plan: "Enterprise" },
    { name: "Personal Prototypes", plan: "Starter" },
  ];

  return (
    <div className={cn("w-full max-w-xs mx-auto p-4 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-lg text-xs", className)} {...props}>
      <div className="font-bold text-neutral-400 text-[10px] uppercase mb-2">Active Workspace</div>
      <div className="space-y-1">
        {orgs.map((o) => (
          <div
            key={o.name}
            onClick={() => setActiveOrg(o.name)}
            className={cn(
              "p-2.5 rounded-lg flex items-center justify-between cursor-pointer transition-colors",
              activeOrg === o.name ? "bg-neutral-100 dark:bg-neutral-800 font-bold" : "hover:bg-neutral-50 dark:hover:bg-neutral-900 text-neutral-600 dark:text-neutral-400"
            )}
          >
            <span>{o.name}</span>
            <span className="font-mono text-[10px] text-neutral-400">{o.plan}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { MultiTenantOrganizationSwitcher } from "./multi-tenant-organization-switcher";

export default function Demo() {
  return (
    <div className="w-full min-h-[250px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <MultiTenantOrganizationSwitcher />
    </div>
  );
}
`,
  }),

  P("smart-search-command-palette", {
    category: "blocks",
    title: "Smart Search Command Palette",
    description: "A keyboard-accessible modal command palette supporting fuzzy action execution and shortcut cues.",
    difficulty: "advanced",
    subcategory: "search",
    fingerprint: {
      interactionModel: "fuzzy-command-palette-keyboard-nav",
      visualModel: "floating-omnisearch-modal",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "global-action-launcher",
    },
    tags: ["command-palette", "search", "shortcuts", "actions", "fuzzy"],
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

export function SmartSearchCommandPalette({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [query, setQuery] = React.useState("");

  const actions = [
    { label: "Browse 800 Catalog Resources", category: "Navigation", key: "G C" },
    { label: "Run Validation: pnpm validate:catalog", category: "DevOps", key: "⌘ V" },
    { label: "Create New API Secret", category: "Security", key: "⌘ K" },
  ];

  const filtered = actions.filter((a) => a.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className={cn("w-full max-w-xl mx-auto p-4 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl font-mono text-xs", className)} {...props}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type a command or search resource..."
        className="w-full px-3 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 mb-3 focus:outline-none"
      />
      <div className="space-y-1">
        {filtered.map((a) => (
          <div key={a.label} className="p-2.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-between cursor-pointer">
            <span className="text-neutral-900 dark:text-white">{a.label}</span>
            <span className="px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-[10px] text-neutral-500">{a.key}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { SmartSearchCommandPalette } from "./smart-search-command-palette";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <SmartSearchCommandPalette />
    </div>
  );
}
`,
  }),

  P("cookie-preferences-dialog", {
    category: "blocks",
    title: "Cookie Preferences Dialog",
    description: "A granular privacy preference center with category switches for essential, functional, and analytical data.",
    difficulty: "starter",
    subcategory: "privacy",
    fingerprint: {
      interactionModel: "privacy-category-consent-toggles",
      visualModel: "granular-cookie-preference-panel",
      motionModel: "subtle",
      layoutModel: "stack-layout",
      semanticPurpose: "gdpr-consent-management",
    },
    tags: ["privacy", "cookies", "gdpr", "consent", "dialog"],
    dependencies: [],
    dna: {
      macrostructure: "stack",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
      shapeLanguage: "rounded",
      density: "compact",
      genre: "minimal",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function CookiePreferencesDialog({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-lg mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl text-xs", className)} {...props}>
      <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-2">Privacy & Cookie Settings</h3>
      <p className="text-neutral-500 mb-6">Manage how telemetry and performance cookies are processed.</p>
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="font-semibold text-neutral-900 dark:text-white">Strictly Necessary</div>
            <div className="text-[11px] text-neutral-400">Required for authentication and security tokens.</div>
          </div>
          <span className="font-mono text-neutral-400 text-[10px]">Always On</span>
        </div>
      </div>
      <button type="button" className="w-full py-2 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-lg font-semibold">
        Save Preferences
      </button>
    </div>
  );
}
`,
    demo: `"use client";

import { CookiePreferencesDialog } from "./cookie-preferences-dialog";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <CookiePreferencesDialog />
    </div>
  );
}
`,
  }),

  P("rich-text-markdown-editor", {
    category: "blocks",
    title: "Rich Text Markdown Editor",
    description: "A dual-pane markdown document authoring tool with formatting toolbar buttons and live preview pane.",
    difficulty: "advanced",
    subcategory: "editor",
    fingerprint: {
      interactionModel: "markdown-live-preview-split",
      visualModel: "dual-pane-document-editor",
      motionModel: "none",
      layoutModel: "split-layout",
      semanticPurpose: "markdown-document-authoring",
    },
    tags: ["markdown", "editor", "wysiwyg", "writing", "docs"],
    dependencies: [],
    dna: {
      macrostructure: "split",
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

export function RichTextMarkdownEditor({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [content, setContent] = React.useState("# OpenUI Design Registry\\n\\nZero external runtime dependencies.");

  return (
    <div className={cn("w-full max-w-4xl mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-3">Markdown Editor</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className="w-full p-3 font-mono rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 focus:outline-none"
        />
        <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 prose prose-xs dark:prose-invert">
          <div className="font-bold text-sm text-neutral-900 dark:text-white mb-2">Live Preview</div>
          <div className="text-neutral-600 dark:text-neutral-400">{content}</div>
        </div>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { RichTextMarkdownEditor } from "./rich-text-markdown-editor";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <RichTextMarkdownEditor />
    </div>
  );
}
`,
  }),

  P("telemetry-live-tail-stream", {
    category: "blocks",
    title: "Telemetry Live Tail Stream",
    description: "A streaming log terminal with pause/resume controls, log severity filters, and auto-scrolling telemetry.",
    difficulty: "intermediate",
    subcategory: "telemetry",
    fingerprint: {
      interactionModel: "streaming-log-tail-pause-resume",
      visualModel: "console-log-streaming-window",
      motionModel: "mechanical",
      layoutModel: "stack-layout",
      semanticPurpose: "edge-log-tail-streaming",
    },
    tags: ["telemetry", "logs", "stream", "console", "terminal"],
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

export function TelemetryLiveTailStream({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [paused, setPaused] = React.useState(false);

  const lines = [
    "[INFO] 18:42:01 edge-fra: GET /r/components/button.json 200 1.2ms",
    "[INFO] 18:42:02 edge-iad: GET /r/sections/hero.json 200 0.8ms",
    "[WARN] 18:42:04 edge-hnd: Memory pressure spike 42% (mitigated)",
    "[INFO] 18:42:05 edge-sfo: Invariant verification PASS (800 items)",
  ];

  return (
    <div className={cn("w-full max-w-4xl mx-auto p-5 bg-neutral-950 text-neutral-100 border border-neutral-800 rounded-xl font-mono text-xs", className)} {...props}>
      <div className="flex justify-between items-center pb-3 border-b border-neutral-800 mb-3">
        <span className="text-white font-bold">Edge Request Stream Tail</span>
        <button
          type="button"
          onClick={() => setPaused(!paused)}
          className={cn("px-3 py-1 rounded font-bold text-[11px]", paused ? "bg-amber-600 text-white" : "bg-neutral-800 text-neutral-300")}
        >
          {paused ? "Stream Paused ❚❚" : "Streaming Live ●"}
        </button>
      </div>
      <div className="space-y-1.5 max-h-48 overflow-y-auto">
        {lines.map((l, idx) => (
          <div key={idx} className={l.includes("WARN") ? "text-amber-400" : "text-emerald-400"}>
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { TelemetryLiveTailStream } from "./telemetry-live-tail-stream";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] p-4 flex items-center justify-center bg-neutral-900">
      <TelemetryLiveTailStream />
    </div>
  );
}
`,
  }),

  P("cron-job-scheduler-block", {
    category: "blocks",
    title: "Cron Job Scheduler Block",
    description: "A recurring task scheduler with 5-field cron syntax parser, human-readable translation, and trigger actions.",
    difficulty: "intermediate",
    subcategory: "devops",
    fingerprint: {
      interactionModel: "cron-expression-input-and-trigger",
      visualModel: "scheduled-job-timeline-card",
      motionModel: "none",
      layoutModel: "stack-layout",
      semanticPurpose: "scheduled-cron-task-execution",
    },
    tags: ["cron", "scheduler", "jobs", "devops", "automation"],
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

export function CronJobSchedulerBlock({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [expr, setExpr] = React.useState("0 * * * *");

  return (
    <div className={cn("w-full max-w-xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-4">Recurring Job Config</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-neutral-400 text-[11px] mb-1">Cron Expression (UTC)</label>
          <input
            type="text"
            value={expr}
            onChange={(e) => setExpr(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white font-bold"
          />
        </div>
        <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg">
          Translates to: Runs every hour at minute 0.
        </div>
        <button type="button" className="w-full py-2 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-semibold rounded-lg">
          Schedule Job
        </button>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { CronJobSchedulerBlock } from "./cron-job-scheduler-block";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <CronJobSchedulerBlock />
    </div>
  );
}
`,
  }),
];

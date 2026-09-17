import type { ResourceDefinition } from "../lib/definitions.js";

const P = (name: string, definition: Omit<ResourceDefinition, "name">): ResourceDefinition => ({
  name,
  ...definition,
});

export default [
  P("transfer-list-box", {
    category: "components",
    subcategory: "forms",
    title: "Transfer List Box",
    description: "Dual column listbox transfer component with selection checkboxes, batch move buttons, and search filtering.",
    tags: ["transfer", "listbox", "forms", "selection", "dual-list"],
    dependencies: ["react", "lucide-react"],
    difficulty: "intermediate",
    dna: {
      genre: "technical",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "dual-column-item-transfer",
      visualModel: "bracketed-dual-panel",
      motionModel: "none",
      layoutModel: "side-by-side-rail",
      semanticPurpose: "batch-entity-assignment",
    },
    source: `"use client";

import { useState } from "react";
import { ArrowLeftRight, Check, ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/cn";

export interface TransferItem {
  id: string;
  label: string;
}

export interface TransferListBoxProps {
  initialLeft?: TransferItem[];
  initialRight?: TransferItem[];
  className?: string;
}

export function TransferListBox({
  initialLeft = [
    { id: "1", label: "Server US-East-1" },
    { id: "2", label: "Server EU-Central-1" },
    { id: "3", label: "Worker AP-East-2" },
    { id: "4", label: "DB Replica Read-01" },
  ],
  initialRight = [{ id: "5", label: "Edge Proxy Global" }],
  className,
}: TransferListBoxProps) {
  const [left, setLeft] = useState<TransferItem[]>(initialLeft);
  const [right, setRight] = useState<TransferItem[]>(initialRight);
  const [selectedLeft, setSelectedLeft] = useState<string[]>([]);
  const [selectedRight, setSelectedRight] = useState<string[]>([]);

  const moveToRight = () => {
    const moving = left.filter((item) => selectedLeft.includes(item.id));
    setRight((prev) => [...prev, ...moving]);
    setLeft((prev) => prev.filter((item) => !selectedLeft.includes(item.id)));
    setSelectedLeft([]);
  };

  const moveToLeft = () => {
    const moving = right.filter((item) => selectedRight.includes(item.id));
    setLeft((prev) => [...prev, ...moving]);
    setRight((prev) => prev.filter((item) => !selectedRight.includes(item.id)));
    setSelectedRight([]);
  };

  return (
    <div className={cn("flex flex-col sm:flex-row items-center gap-3 p-4 rounded-xl border border-line bg-surface/50 max-w-xl w-full", className)}>
      <div className="flex-1 w-full border border-line rounded-lg p-2 bg-paper">
        <div className="text-xs font-mono text-ink/60 font-semibold mb-2 px-1">Available ({left.length})</div>
        <div className="flex flex-col gap-1 max-h-48 overflow-y-auto">
          {left.map((item) => {
            const isSel = selectedLeft.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedLeft((prev) => (isSel ? prev.filter((id) => id !== item.id) : [...prev, item.id]))}
                className={cn(
                  "flex items-center justify-between px-2.5 py-1.5 rounded text-xs text-left transition-colors",
                  isSel ? "bg-accent/15 text-accent font-medium" : "text-ink hover:bg-surface"
                )}
              >
                <span>{item.label}</span>
                {isSel && <Check className="w-3.5 h-3.5" />}
              </button>
            );
          })}
          {left.length === 0 && <div className="text-xs text-ink/40 p-2 text-center">None left</div>}
        </div>
      </div>

      <div className="flex sm:flex-col gap-1.5">
        <button
          type="button"
          onClick={moveToRight}
          disabled={selectedLeft.length === 0}
          className="p-2 rounded border border-line bg-paper disabled:opacity-40 hover:bg-surface text-ink transition-colors"
          aria-label="Move selected right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={moveToLeft}
          disabled={selectedRight.length === 0}
          className="p-2 rounded border border-line bg-paper disabled:opacity-40 hover:bg-surface text-ink transition-colors"
          aria-label="Move selected left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 w-full border border-line rounded-lg p-2 bg-paper">
        <div className="text-xs font-mono text-ink/60 font-semibold mb-2 px-1">Assigned ({right.length})</div>
        <div className="flex flex-col gap-1 max-h-48 overflow-y-auto">
          {right.map((item) => {
            const isSel = selectedRight.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedRight((prev) => (isSel ? prev.filter((id) => id !== item.id) : [...prev, item.id]))}
                className={cn(
                  "flex items-center justify-between px-2.5 py-1.5 rounded text-xs text-left transition-colors",
                  isSel ? "bg-accent/15 text-accent font-medium" : "text-ink hover:bg-surface"
                )}
              >
                <span>{item.label}</span>
                {isSel && <Check className="w-3.5 h-3.5" />}
              </button>
            );
          })}
          {right.length === 0 && <div className="text-xs text-ink/40 p-2 text-center">None assigned</div>}
        </div>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { TransferListBox } from "./transfer-list-box";

export default function TransferListBoxDemo() {
  return (
    <div className="flex items-center justify-center p-6 bg-surface/30 min-h-[320px]">
      <TransferListBox />
    </div>
  );
}
`,
  }),

  P("cascading-menu-tree", {
    category: "components",
    subcategory: "navigation",
    title: "Cascading Menu Tree",
    description: "A nested flyout menu with keyboard navigation support, chevron branch indicators, and action triggers.",
    tags: ["menu", "cascading", "flyout", "navigation", "nested"],
    dependencies: ["react", "lucide-react"],
    difficulty: "intermediate",
    dna: {
      genre: "minimal",
      macrostructure: "stack",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "cascading-flyout-hover",
      visualModel: "floating-nested-popover",
      motionModel: "none",
      layoutModel: "hierarchical-flyout",
      semanticPurpose: "hierarchical-action-menu",
    },
    source: `"use client";

import { useState } from "react";
import { ChevronRight, Folder, File, Settings, Share2, Trash2 } from "lucide-react";
import { cn } from "@/lib/cn";

export interface MenuItem {
  id: string;
  label: string;
  icon?: any;
  children?: MenuItem[];
  action?: string;
}

export function CascadingMenuTree({ className }: { className?: string }) {
  const [activeBranch, setActiveBranch] = useState<string | null>(null);
  const [status, setStatus] = useState("Hover or click a menu item");

  const items: MenuItem[] = [
    {
      id: "workspace",
      label: "Workspace Options",
      icon: Folder,
      children: [
        { id: "ws-share", label: "Invite Collaborators", icon: Share2 },
        { id: "ws-settings", label: "Preferences & Keys", icon: Settings },
      ],
    },
    {
      id: "exports",
      label: "Export Pipeline",
      icon: File,
      children: [
        { id: "exp-json", label: "Bundle as JSON" },
        { id: "exp-ts", label: "Typescript Definitions" },
        { id: "exp-tar", label: "Archive (.tar.gz)" },
      ],
    },
    { id: "delete", label: "Prune Workspace", icon: Trash2 },
  ];

  return (
    <div className={cn("relative inline-block font-sans text-xs", className)}>
      <div className="w-56 rounded-lg border border-line bg-paper shadow-md p-1.5 flex flex-col gap-0.5">
        {items.map((item) => {
          const Icon = item.icon;
          const hasChildren = Boolean(item.children && item.children.length > 0);
          const isOpen = activeBranch === item.id;

          return (
            <div
              key={item.id}
              className="relative"
              onMouseEnter={() => hasChildren && setActiveBranch(item.id)}
              onMouseLeave={() => hasChildren && setActiveBranch(null)}
            >
              <button
                type="button"
                onClick={() => {
                  if (!hasChildren) setStatus(\`Triggered: \${item.label}\`);
                }}
                className={cn(
                  "w-full flex items-center justify-between px-2.5 py-1.5 rounded transition-colors text-left",
                  isOpen ? "bg-surface font-medium text-ink" : "text-ink/80 hover:bg-surface hover:text-ink"
                )}
              >
                <div className="flex items-center gap-2">
                  {Icon && <Icon className="w-3.5 h-3.5 text-ink/60" />}
                  <span>{item.label}</span>
                </div>
                {hasChildren && <ChevronRight className="w-3.5 h-3.5 text-ink/40" />}
              </button>

              {hasChildren && isOpen && (
                <div className="absolute left-full top-0 ml-1 w-48 rounded-lg border border-line bg-paper shadow-lg p-1.5 flex flex-col gap-0.5 z-20">
                  {item.children?.map((sub) => {
                    const SubIcon = sub.icon;
                    return (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => setStatus(\`Selected: \${sub.label}\`)}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded text-left text-ink/80 hover:bg-surface hover:text-ink transition-colors"
                      >
                        {SubIcon && <SubIcon className="w-3.5 h-3.5 text-ink/60" />}
                        <span>{sub.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-2 text-[11px] font-mono text-ink/60">{status}</div>
    </div>
  );
}
`,
    demo: `"use client";

import { CascadingMenuTree } from "./cascading-menu-tree";

export default function CascadingMenuTreeDemo() {
  return (
    <div className="flex items-center justify-center p-8 bg-surface/20 min-h-[300px]">
      <CascadingMenuTree />
    </div>
  );
}
`,
  }),

  P("time-range-picker", {
    category: "components",
    subcategory: "controls",
    title: "Time Range Picker",
    description: "An intuitive time span selector with preset duration pills, custom start/end hour inputs, and visual range bar.",
    tags: ["time", "range", "picker", "controls", "schedule"],
    dependencies: ["react", "lucide-react"],
    difficulty: "intermediate",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "interval-slider-selection",
      visualModel: "time-interval-bar",
      motionModel: "none",
      layoutModel: "compact-form-stack",
      semanticPurpose: "time-window-specification",
    },
    source: `"use client";

import { useState } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/cn";

export interface TimeRangePickerProps {
  className?: string;
  defaultStart?: string;
  defaultEnd?: string;
}

export function TimeRangePicker({
  className,
  defaultStart = "09:00",
  defaultEnd = "17:00",
}: TimeRangePickerProps) {
  const [start, setStart] = useState(defaultStart);
  const [end, setEnd] = useState(defaultEnd);

  const presets = [
    { label: "1h", s: "09:00", e: "10:00" },
    { label: "4h", s: "09:00", e: "13:00" },
    { label: "Workday", s: "09:00", e: "17:00" },
    { label: "Evening", s: "18:00", e: "23:00" },
  ];

  return (
    <div className={cn("p-4 rounded-xl border border-line bg-paper max-w-sm w-full font-sans shadow-sm", className)}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-ink">
          <Clock className="w-3.5 h-3.5 text-accent" />
          <span>Active Window</span>
        </div>
        <span className="text-[11px] font-mono text-ink/60">{start} → {end}</span>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div>
          <label className="block text-[11px] font-mono text-ink/60 mb-1">Start</label>
          <input
            type="time"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded border border-line bg-surface text-xs font-mono text-ink focus:outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="block text-[11px] font-mono text-ink/60 mb-1">End</label>
          <input
            type="time"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded border border-line bg-surface text-xs font-mono text-ink focus:outline-none focus:border-accent"
          />
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        {presets.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => {
              setStart(p.s);
              setEnd(p.e);
            }}
            className="px-2 py-1 rounded bg-surface hover:bg-line/40 text-[10px] font-mono text-ink/80 transition-colors"
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { TimeRangePicker } from "./time-range-picker";

export default function TimeRangePickerDemo() {
  return (
    <div className="flex items-center justify-center p-8 bg-surface/20 min-h-[260px]">
      <TimeRangePicker />
    </div>
  );
}
`,
  }),

  P("color-gradient-slider", {
    category: "components",
    subcategory: "controls",
    title: "Color Gradient Slider",
    description: "Multi-stop CSS linear gradient builder with adjustable color stops, angle control, and copyable CSS string.",
    tags: ["gradient", "color", "slider", "css", "controls"],
    dependencies: ["react", "lucide-react"],
    difficulty: "intermediate",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "duotone",
    },
    fingerprint: {
      interactionModel: "multi-stop-gradient-tuning",
      visualModel: "gradient-strip-preview",
      motionModel: "none",
      layoutModel: "compact-form-stack",
      semanticPurpose: "gradient-generator",
    },
    source: `"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/cn";

export function ColorGradientSlider({ className }: { className?: string }) {
  const [color1, setColor1] = useState("#3b82f6");
  const [color2, setColor2] = useState("#8b5cf6");
  const [angle, setAngle] = useState(90);
  const [copied, setCopied] = useState(false);

  const gradientString = \`linear-gradient(\${angle}deg, \${color1}, \${color2})\`;

  const copyCss = () => {
    navigator.clipboard.writeText(\`background: \${gradientString};\`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("p-4 rounded-xl border border-line bg-paper max-w-sm w-full font-sans shadow-sm", className)}>
      <div
        className="w-full h-14 rounded-lg mb-3 border border-line/50 transition-all shadow-inner"
        style={{ background: gradientString }}
      />

      <div className="space-y-2.5 mb-4">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-ink/60">Angle ({angle}°)</span>
          <input
            type="range"
            min="0"
            max="360"
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="w-32 accent-accent cursor-pointer"
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="flex-1 flex items-center gap-2 p-1.5 rounded border border-line bg-surface text-xs font-mono">
            <input
              type="color"
              value={color1}
              onChange={(e) => setColor1(e.target.value)}
              className="w-5 h-5 rounded cursor-pointer border-0 p-0 bg-transparent"
            />
            <span className="text-ink text-[11px]">{color1}</span>
          </label>
          <label className="flex-1 flex items-center gap-2 p-1.5 rounded border border-line bg-surface text-xs font-mono">
            <input
              type="color"
              value={color2}
              onChange={(e) => setColor2(e.target.value)}
              className="w-5 h-5 rounded cursor-pointer border-0 p-0 bg-transparent"
            />
            <span className="text-ink text-[11px]">{color2}</span>
          </label>
        </div>
      </div>

      <button
        type="button"
        onClick={copyCss}
        className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded bg-surface hover:bg-line/40 text-xs font-mono text-ink transition-colors border border-line"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
        <span>{copied ? "Copied CSS!" : "Copy CSS"}</span>
      </button>
    </div>
  );
}
`,
    demo: `"use client";

import { ColorGradientSlider } from "./color-gradient-slider";

export default function ColorGradientSliderDemo() {
  return (
    <div className="flex items-center justify-center p-8 bg-surface/20 min-h-[280px]">
      <ColorGradientSlider />
    </div>
  );
}
`,
  }),

  P("audio-track-scrubber", {
    category: "components",
    subcategory: "media",
    title: "Audio Track Scrubber",
    description: "Compact playback bar with play/pause state, dynamic progress waveform ticks, and timestamp display.",
    tags: ["audio", "player", "scrubber", "waveform", "media"],
    dependencies: ["react", "lucide-react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "stack",
      density: "compact",
      shapeLanguage: "pill",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "waveform-progress-scrubbing",
      visualModel: "bar-waveform-track",
      motionModel: "none",
      layoutModel: "compact-media-bar",
      semanticPurpose: "audio-playback-control",
    },
    source: `"use client";

import { useState } from "react";
import { Play, Pause, Volume2 } from "lucide-react";
import { cn } from "@/lib/cn";

export function AudioTrackScrubber({ className }: { className?: string }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(35);

  const bars = [20, 45, 60, 80, 50, 90, 75, 40, 60, 30, 85, 95, 70, 45, 55, 35, 65, 80, 50, 40];

  return (
    <div className={cn("flex items-center gap-3 p-3 rounded-full border border-line bg-paper max-w-md w-full shadow-sm", className)}>
      <button
        type="button"
        onClick={() => setPlaying(!playing)}
        className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center transition-transform active:scale-95 shrink-0"
        aria-label={playing ? "Pause" : "Play"}
      >
        {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
      </button>

      <div className="flex-1 flex items-center gap-0.5 h-8 px-1 cursor-pointer" onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const p = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
        setProgress(p);
      }}>
        {bars.map((h, i) => {
          const barPct = (i / bars.length) * 100;
          const isPassed = barPct <= progress;
          return (
            <div
              key={i}
              className={cn("flex-1 rounded-full transition-all", isPassed ? "bg-accent" : "bg-line")}
              style={{ height: \`\${h}%\` }}
            />
          );
        })}
      </div>

      <div className="text-[11px] font-mono text-ink/60 shrink-0">01:24</div>
      <Volume2 className="w-4 h-4 text-ink/40 hover:text-ink cursor-pointer shrink-0" />
    </div>
  );
}
`,
    demo: `"use client";

import { AudioTrackScrubber } from "./audio-track-scrubber";

export default function AudioTrackScrubberDemo() {
  return (
    <div className="flex items-center justify-center p-8 bg-surface/20 min-h-[220px]">
      <AudioTrackScrubber />
    </div>
  );
}
`,
  }),

  P("kanban-mini-column", {
    category: "components",
    subcategory: "data-display",
    title: "Kanban Mini Column",
    description: "Streamlined single-column task rack with item count pill, checkable items, and quick-add inline input.",
    tags: ["kanban", "column", "task", "card", "data-display"],
    dependencies: ["react", "lucide-react"],
    difficulty: "intermediate",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "in-situ-task-addition-and-toggle",
      visualModel: "vertical-kanban-lane",
      motionModel: "none",
      layoutModel: "single-column-rail",
      semanticPurpose: "lightweight-task-column",
    },
    source: `"use client";

import { useState } from "react";
import { Plus, Check, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/cn";

export function KanbanMiniColumn({ className }: { className?: string }) {
  const [tasks, setTasks] = useState([
    { id: "1", title: "Review RFC for auth tokens", done: false },
    { id: "2", title: "Migrate registry bundles to CDN", done: true },
    { id: "3", title: "Benchmark latency on edge proxy", done: false },
  ]);
  const [newTitle, setNewTitle] = useState("");

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setTasks((prev) => [...prev, { id: String(Date.now()), title: newTitle.trim(), done: false }]);
    setNewTitle("");
  };

  const toggle = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  return (
    <div className={cn("w-72 rounded-xl border border-line bg-surface/40 p-3 flex flex-col gap-2 font-sans", className)}>
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-ink">In Progress</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-line text-ink/60">
            {tasks.filter((t) => !t.done).length}
          </span>
        </div>
        <MoreHorizontal className="w-4 h-4 text-ink/40 cursor-pointer hover:text-ink" />
      </div>

      <div className="flex flex-col gap-1.5">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => toggle(task.id)}
            className={cn(
              "flex items-start gap-2 p-2.5 rounded-lg border border-line bg-paper cursor-pointer transition-colors shadow-xs",
              task.done ? "opacity-60 bg-surface/60" : "hover:border-accent/40"
            )}
          >
            <div
              className={cn(
                "w-4 h-4 rounded border flex items-center justify-center mt-0.5 transition-colors",
                task.done ? "bg-emerald-500 border-emerald-500 text-white" : "border-line"
              )}
            >
              {task.done && <Check className="w-3 h-3" />}
            </div>
            <span className={cn("text-xs text-ink flex-1", task.done && "line-through text-ink/50")}>
              {task.title}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={addTask} className="mt-1 flex items-center gap-1.5">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New task..."
          className="flex-1 px-2.5 py-1.5 text-xs rounded-md border border-line bg-paper text-ink focus:outline-none focus:border-accent font-sans"
        />
        <button
          type="submit"
          className="p-1.5 rounded-md bg-accent text-white hover:bg-accent/90 transition-colors"
          aria-label="Add task"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
`,
    demo: `"use client";

import { KanbanMiniColumn } from "./kanban-mini-column";

export default function KanbanMiniColumnDemo() {
  return (
    <div className="flex items-center justify-center p-8 bg-surface/20 min-h-[300px]">
      <KanbanMiniColumn />
    </div>
  );
}
`,
  }),

  P("inline-editable-heading", {
    category: "components",
    subcategory: "forms",
    title: "Inline Editable Heading",
    description: "Double-click or click-to-edit heading component with live input switch, escape-to-cancel, and blur commit.",
    tags: ["editable", "inline", "heading", "forms", "input"],
    dependencies: ["react", "lucide-react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "inline-double-click-edit",
      visualModel: "seamless-text-to-input",
      motionModel: "none",
      layoutModel: "single-line-field",
      semanticPurpose: "inline-title-mutator",
    },
    source: `"use client";

import { useState, useRef, useEffect } from "react";
import { Edit2, Check } from "lucide-react";
import { cn } from "@/lib/cn";

export interface InlineEditableHeadingProps {
  initialValue?: string;
  className?: string;
}

export function InlineEditableHeading({
  initialValue = "Untitled Project Matrix",
  className,
}: InlineEditableHeadingProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") setIsEditing(false);
    if (e.key === "Escape") {
      setValue(initialValue);
      setIsEditing(false);
    }
  };

  return (
    <div className={cn("inline-flex items-center gap-2 group font-sans", className)}>
      {isEditing ? (
        <div className="flex items-center gap-1.5">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => setIsEditing(false)}
            onKeyDown={handleKeyDown}
            className="text-lg font-semibold px-2 py-0.5 rounded border border-accent bg-paper text-ink focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="p-1 rounded bg-accent text-white"
          >
            <Check className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-2 cursor-pointer px-2 py-0.5 rounded hover:bg-surface/80 transition-colors"
        >
          <span className="text-lg font-semibold text-ink">{value}</span>
          <Edit2 className="w-3.5 h-3.5 text-ink/30 group-hover:text-ink/70 transition-colors" />
        </div>
      )}
    </div>
  );
}
`,
    demo: `"use client";

import { InlineEditableHeading } from "./inline-editable-heading";

export default function InlineEditableHeadingDemo() {
  return (
    <div className="flex items-center justify-center p-8 bg-surface/20 min-h-[200px]">
      <InlineEditableHeading />
    </div>
  );
}
`,
  }),

  P("docked-action-toolbar", {
    category: "components",
    subcategory: "actions",
    title: "Docked Action Toolbar",
    description: "A floating bottom pill toolbar with action icons, badge counters, and keyboard shortcut indicators.",
    tags: ["toolbar", "docked", "actions", "floating", "shortcuts"],
    dependencies: ["react", "lucide-react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "pill",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "floating-toolbar-quick-action",
      visualModel: "glass-pill-dock",
      motionModel: "none",
      layoutModel: "bottom-pinned-bar",
      semanticPurpose: "viewport-action-dock",
    },
    source: `"use client";

import { useState } from "react";
import { MessageSquare, Share, Bookmark, ThumbsUp, Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";

export function DockedActionToolbar({ className }: { className?: string }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div className={cn("inline-flex items-center gap-1 p-1.5 rounded-full border border-line bg-paper/90 backdrop-blur-md shadow-lg font-sans", className)}>
      <button
        type="button"
        onClick={() => setLiked(!liked)}
        className={cn(
          "flex items-center gap-1 px-3 py-1.5 rounded-full text-xs transition-colors",
          liked ? "bg-red-500/15 text-red-500 font-semibold" : "text-ink/70 hover:bg-surface hover:text-ink"
        )}
      >
        <ThumbsUp className="w-3.5 h-3.5" />
        <span>{liked ? "43" : "42"}</span>
      </button>

      <div className="w-px h-4 bg-line" />

      <button
        type="button"
        className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs text-ink/70 hover:bg-surface hover:text-ink transition-colors"
      >
        <MessageSquare className="w-3.5 h-3.5" />
        <span>18</span>
      </button>

      <button
        type="button"
        onClick={() => setSaved(!saved)}
        className={cn(
          "p-2 rounded-full transition-colors",
          saved ? "bg-accent/15 text-accent" : "text-ink/70 hover:bg-surface hover:text-ink"
        )}
        aria-label="Save"
      >
        <Bookmark className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        className="p-2 rounded-full text-ink/70 hover:bg-surface hover:text-ink transition-colors"
        aria-label="Share"
      >
        <Share className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        className="ml-1 p-2 rounded-full bg-accent text-white hover:bg-accent/90 transition-transform active:scale-95"
        aria-label="AI Insight"
      >
        <Sparkles className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
`,
    demo: `"use client";

import { DockedActionToolbar } from "./docked-action-toolbar";

export default function DockedActionToolbarDemo() {
  return (
    <div className="flex items-center justify-center p-8 bg-surface/20 min-h-[200px]">
      <DockedActionToolbar />
    </div>
  );
}
`,
  }),

  P("multi-range-histogram", {
    category: "components",
    subcategory: "data-display",
    title: "Multi Range Histogram",
    description: "Interactive distribution chart with dual-threshold range sliders to filter numeric dataset partitions.",
    tags: ["histogram", "chart", "range", "filter", "data-display"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "accent-only",
    },
    fingerprint: {
      interactionModel: "histogram-slice-selection",
      visualModel: "columnar-distribution-bars",
      motionModel: "none",
      layoutModel: "stacked-histogram-rack",
      semanticPurpose: "distribution-range-filter",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export function MultiRangeHistogram({ className }: { className?: string }) {
  const buckets = [12, 28, 45, 60, 92, 110, 85, 64, 40, 32, 18, 9];
  const [minVal, setMinVal] = useState(2);
  const [maxVal, setMaxVal] = useState(9);

  return (
    <div className={cn("p-4 rounded-xl border border-line bg-paper max-w-sm w-full font-mono text-xs shadow-sm", className)}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-ink/60 font-semibold">Distribution Window</span>
        <span className="text-accent font-bold">[{minVal * 10}ms – {maxVal * 10}ms]</span>
      </div>

      <div className="flex items-end gap-1.5 h-24 mb-3 px-1">
        {buckets.map((count, i) => {
          const inRange = i >= minVal && i <= maxVal;
          const heightPct = (count / 110) * 100;
          return (
            <div
              key={i}
              onClick={() => {
                if (i < minVal) setMinVal(i);
                else setMaxVal(i);
              }}
              className={cn(
                "flex-1 rounded-t transition-all cursor-pointer",
                inRange ? "bg-accent" : "bg-line hover:bg-line/70"
              )}
              style={{ height: \`\${heightPct}%\` }}
            />
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <input
          type="range"
          min="0"
          max="11"
          value={minVal}
          onChange={(e) => setMinVal(Math.min(Number(e.target.value), maxVal))}
          className="flex-1 accent-accent"
        />
        <input
          type="range"
          min="0"
          max="11"
          value={maxVal}
          onChange={(e) => setMaxVal(Math.max(Number(e.target.value), minVal))}
          className="flex-1 accent-accent"
        />
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { MultiRangeHistogram } from "./multi-range-histogram";

export default function MultiRangeHistogramDemo() {
  return (
    <div className="flex items-center justify-center p-8 bg-surface/20 min-h-[250px]">
      <MultiRangeHistogram />
    </div>
  );
}
`,
  }),

  P("mention-textarea", {
    category: "components",
    subcategory: "forms",
    title: "Mention Textarea",
    description: "Smart text input with @ mention trigger popover, member lookup, and automatic pill replacement.",
    tags: ["mention", "textarea", "forms", "input", "collaborator"],
    dependencies: ["react", "lucide-react"],
    difficulty: "intermediate",
    dna: {
      genre: "minimal",
      macrostructure: "stack",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "character-triggered-popover-lookup",
      visualModel: "anchored-suggestion-popover",
      motionModel: "none",
      layoutModel: "text-input-with-overlay",
      semanticPurpose: "member-mention-input",
    },
    source: `"use client";

import { useState, useRef } from "react";
import { AtSign, User } from "lucide-react";
import { cn } from "@/lib/cn";

export function MentionTextarea({ className }: { className?: string }) {
  const [text, setText] = useState("");
  const [showMentions, setShowMentions] = useState(false);
  const users = ["alex.morgan", "clara.oswald", "devon.reed", "elena.rostova"];

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setText(val);
    if (val.endsWith("@")) {
      setShowMentions(true);
    } else if (showMentions && !val.includes("@")) {
      setShowMentions(false);
    }
  };

  const insertMention = (username: string) => {
    setText((prev) => prev.slice(0, prev.lastIndexOf("@")) + \`@\${username} \`);
    setShowMentions(false);
  };

  return (
    <div className={cn("relative max-w-sm w-full font-sans text-xs", className)}>
      <div className="relative rounded-lg border border-line bg-paper focus-within:border-accent p-2.5 shadow-sm">
        <textarea
          rows={3}
          value={text}
          onChange={handleChange}
          placeholder="Write a message... Type @ to mention a team member"
          className="w-full bg-transparent resize-none text-ink focus:outline-none"
        />
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-line text-[11px] text-ink/50 font-mono">
          <span className="flex items-center gap-1">
            <AtSign className="w-3 h-3" /> mention
          </span>
          <span>{text.length} chars</span>
        </div>
      </div>

      {showMentions && (
        <div className="absolute left-2 bottom-full mb-1 w-48 rounded-lg border border-line bg-paper shadow-lg p-1 z-20">
          <div className="text-[10px] font-mono text-ink/40 px-2 py-1 uppercase">Members</div>
          {users.map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => insertMention(u)}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-surface text-ink text-left transition-colors"
            >
              <User className="w-3.5 h-3.5 text-accent" />
              <span>{u}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
`,
    demo: `"use client";

import { MentionTextarea } from "./mention-textarea";

export default function MentionTextareaDemo() {
  return (
    <div className="flex items-center justify-center p-8 bg-surface/20 min-h-[240px]">
      <MentionTextarea />
    </div>
  );
}
`,
  }),

  P("credit-card-input", {
    category: "components",
    subcategory: "forms",
    title: "Credit Card Input",
    description: "Segmented credit card entry with card issuer brand indicator, space grouping, and expiry date format.",
    tags: ["card", "payment", "forms", "input", "validation"],
    dependencies: ["react", "lucide-react"],
    difficulty: "intermediate",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "formatted-numeric-card-entry",
      visualModel: "card-brand-badge-field",
      motionModel: "none",
      layoutModel: "card-payment-form",
      semanticPurpose: "payment-card-input",
    },
    source: `"use client";

import { useState } from "react";
import { CreditCard, Lock } from "lucide-react";
import { cn } from "@/lib/cn";

export function CreditCardInput({ className }: { className?: string }) {
  const [num, setNum] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");

  const formatCard = (v: string) => {
    const raw = v.replace(/\\D/g, "").slice(0, 16);
    return raw.replace(/(\\d{4})(?=\\d)/g, "$1 ");
  };

  const formatExp = (v: string) => {
    const raw = v.replace(/\\D/g, "").slice(0, 4);
    if (raw.length > 2) return \`\${raw.slice(0, 2)}/\${raw.slice(2)}\`;
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
              onChange={(e) => setCvc(e.target.value.replace(/\\D/g, ""))}
              placeholder="•••"
              className="w-full px-2.5 py-2 rounded border border-line bg-surface text-ink text-xs focus:outline-none focus:border-accent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { CreditCardInput } from "./credit-card-input";

export default function CreditCardInputDemo() {
  return (
    <div className="flex items-center justify-center p-8 bg-surface/20 min-h-[250px]">
      <CreditCardInput />
    </div>
  );
}
`,
  }),

  P("virtual-keyboard-numpad", {
    category: "components",
    subcategory: "controls",
    title: "Virtual Keyboard Numpad",
    description: "Tactile on-screen PIN/numeric keypad for POS terminals and verification gates with backspace and clear.",
    tags: ["numpad", "pin", "keypad", "controls", "security"],
    dependencies: ["react", "lucide-react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "touch-keypad-pin-entry",
      visualModel: "three-column-button-grid",
      motionModel: "none",
      layoutModel: "numeric-keypad-matrix",
      semanticPurpose: "secure-pin-input",
    },
    source: `"use client";

import { useState } from "react";
import { Delete, Check } from "lucide-react";
import { cn } from "@/lib/cn";

export function VirtualKeyboardNumpad({ className }: { className?: string }) {
  const [pin, setPin] = useState("");

  const press = (digit: string) => {
    if (pin.length < 6) setPin((prev) => prev + digit);
  };

  const backspace = () => setPin((prev) => prev.slice(0, -1));

  return (
    <div className={cn("p-4 rounded-xl border border-line bg-paper max-w-xs w-full font-mono shadow-sm", className)}>
      <div className="flex items-center justify-center gap-2 h-10 mb-4 bg-surface rounded-lg border border-line/60">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all",
              i < pin.length ? "bg-accent scale-110" : "bg-line"
            )}
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "DEL"].map((k) => {
          const isDel = k === "DEL";
          const isClear = k === "C";
          return (
            <button
              key={k}
              type="button"
              onClick={() => {
                if (isDel) backspace();
                else if (isClear) setPin("");
                else press(k);
              }}
              className="h-11 rounded-lg border border-line bg-paper hover:bg-surface text-ink text-sm font-semibold flex items-center justify-center active:scale-95 transition-all"
            >
              {isDel ? <Delete className="w-4 h-4 text-ink/60" /> : k}
            </button>
          );
        })}
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { VirtualKeyboardNumpad } from "./virtual-keyboard-numpad";

export default function VirtualKeyboardNumpadDemo() {
  return (
    <div className="flex items-center justify-center p-8 bg-surface/20 min-h-[300px]">
      <VirtualKeyboardNumpad />
    </div>
  );
}
`,
  }),

  P("matrix-permission-table", {
    category: "components",
    subcategory: "data-display",
    title: "Matrix Permission Table",
    description: "Role-based access control grid with toggleable capability checkboxes across User, Manager, and Admin roles.",
    tags: ["rbac", "permissions", "table", "roles", "data-display"],
    dependencies: ["react", "lucide-react"],
    difficulty: "intermediate",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "matrix-checkbox-toggle",
      visualModel: "role-permission-grid",
      motionModel: "none",
      layoutModel: "tabular-matrix-view",
      semanticPurpose: "rbac-access-assignment",
    },
    source: `"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/cn";

export function MatrixPermissionTable({ className }: { className?: string }) {
  const [matrix, setMatrix] = useState<Record<string, boolean>>({
    "read-viewer": true,
    "read-editor": true,
    "read-admin": true,
    "write-viewer": false,
    "write-editor": true,
    "write-admin": true,
    "delete-viewer": false,
    "delete-editor": false,
    "delete-admin": true,
  });

  const toggle = (key: string) => {
    setMatrix((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const perms = [
    { id: "read", label: "Read Assets" },
    { id: "write", label: "Publish Updates" },
    { id: "delete", label: "Purge Datasets" },
  ];
  const roles = ["viewer", "editor", "admin"];

  return (
    <div className={cn("p-4 rounded-xl border border-line bg-paper max-w-md w-full font-sans text-xs shadow-sm", className)}>
      <div className="text-xs font-semibold text-ink mb-3 font-mono">RBAC Permission Matrix</div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-line text-ink/60 font-mono text-[11px]">
            <th className="text-left pb-2 font-normal">Capability</th>
            {roles.map((r) => (
              <th key={r} className="text-center pb-2 uppercase font-normal">{r}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line/60">
          {perms.map((p) => (
            <tr key={p.id}>
              <td className="py-2.5 text-ink font-medium">{p.label}</td>
              {roles.map((r) => {
                const k = \`\${p.id}-\${r}\`;
                const active = matrix[k];
                return (
                  <td key={r} className="text-center py-2.5">
                    <button
                      type="button"
                      onClick={() => toggle(k)}
                      className={cn(
                        "w-5 h-5 rounded border inline-flex items-center justify-center transition-colors",
                        active ? "bg-accent border-accent text-white" : "border-line text-transparent hover:border-ink/40"
                      )}
                    >
                      <Check className="w-3 h-3" />
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
`,
    demo: `"use client";

import { MatrixPermissionTable } from "./matrix-permission-table";

export default function MatrixPermissionTableDemo() {
  return (
    <div className="flex items-center justify-center p-8 bg-surface/20 min-h-[260px]">
      <MatrixPermissionTable />
    </div>
  );
}
`,
  }),

  P("gauge-speedometer", {
    category: "components",
    subcategory: "data-display",
    title: "Gauge Speedometer",
    description: "SVG arc speedometer gauge showing current utilization percentage with color warning thresholds.",
    tags: ["gauge", "speedometer", "svg", "metric", "data-display"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "slider-driven-arc-gauge",
      visualModel: "radial-speedometer-arc",
      motionModel: "none",
      layoutModel: "radial-meter-box",
      semanticPurpose: "utilization-telemetry-gauge",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export function GaugeSpeedometer({ className }: { className?: string }) {
  const [val, setVal] = useState(68);

  const angle = (val / 100) * 180 - 90;

  return (
    <div className={cn("p-4 rounded-xl border border-line bg-paper max-w-xs w-full flex flex-col items-center font-mono shadow-sm", className)}>
      <div className="text-xs text-ink/60 mb-2 font-semibold">Engine Throughput</div>
      <div className="relative w-40 h-24 flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 100 55" className="w-full h-full">
          <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="currentColor" strokeWidth="8" className="text-line" strokeLinecap="round" />
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-accent"
            strokeLinecap="round"
            strokeDasharray="126"
            strokeDashoffset={126 - (val / 100) * 126}
          />
        </svg>
        <div
          className="absolute bottom-1 w-0.5 h-14 bg-ink origin-bottom transition-transform duration-200"
          style={{ transform: \`rotate(\${angle}deg)\` }}
        />
        <div className="absolute bottom-0 w-3 h-3 rounded-full bg-ink" />
      </div>

      <div className="text-xl font-bold text-ink mt-2">{val}%</div>
      <input
        type="range"
        min="0"
        max="100"
        value={val}
        onChange={(e) => setVal(Number(e.target.value))}
        className="w-full mt-3 accent-accent cursor-pointer"
      />
    </div>
  );
}
`,
    demo: `"use client";

import { GaugeSpeedometer } from "./gauge-speedometer";

export default function GaugeSpeedometerDemo() {
  return (
    <div className="flex items-center justify-center p-8 bg-surface/20 min-h-[250px]">
      <GaugeSpeedometer />
    </div>
  );
}
`,
  }),

  P("aspect-ratio-selector", {
    category: "components",
    subcategory: "controls",
    title: "Aspect Ratio Selector",
    description: "Aspect ratio buttons (16:9, 4:3, 1:1, 9:16) with dynamic proportional preview frame.",
    tags: ["aspect-ratio", "media", "controls", "frame", "ratio"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "stack",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "ratio-button-selection",
      visualModel: "proportional-bounding-box",
      motionModel: "none",
      layoutModel: "frame-with-ratio-strip",
      semanticPurpose: "canvas-ratio-picker",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

interface RatioItem {
  label: string;
  w: number;
  h: number;
}

const RATIOS: RatioItem[] = [
  { label: "16:9", w: 16, h: 9 },
  { label: "4:3", w: 4, h: 3 },
  { label: "1:1", w: 1, h: 1 },
  { label: "9:16", w: 9, h: 16 },
];

export function AspectRatioSelector({ className }: { className?: string }) {
  const [selected, setSelected] = useState<RatioItem>(RATIOS[0]!);

  return (
    <div className={cn("p-4 rounded-xl border border-line bg-paper max-w-xs w-full flex flex-col items-center font-mono shadow-sm", className)}>
      <div className="w-full h-36 bg-surface/50 rounded-lg flex items-center justify-center p-3 mb-4">
        <div
          className="border-2 border-dashed border-accent bg-accent/10 rounded transition-all flex items-center justify-center text-accent text-xs font-bold"
          style={{
            aspectRatio: \`\${selected.w} / \${selected.h}\`,
            maxHeight: "100%",
            maxWidth: "100%",
          }}
        >
          {selected.label}
        </div>
      </div>

      <div className="flex items-center gap-1.5 w-full">
        {RATIOS.map((r) => (
          <button
            key={r.label}
            type="button"
            onClick={() => setSelected(r)}
            className={cn(
              "flex-1 py-1 rounded text-xs transition-colors",
              selected.label === r.label ? "bg-accent text-white font-bold" : "bg-surface text-ink/70 hover:bg-line/40"
            )}
          >
            {r.label}
          </button>
        ))}
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { AspectRatioSelector } from "./aspect-ratio-selector";

export default function AspectRatioSelectorDemo() {
  return (
    <div className="flex items-center justify-center p-8 bg-surface/20 min-h-[250px]">
      <AspectRatioSelector />
    </div>
  );
}
`,
  }),

  P("qr-code-display", {
    category: "components",
    subcategory: "data-display",
    title: "QR Code Display",
    description: "Scanable matrix card with copyable URL link, simulated SVG matrix pattern, and download action button.",
    tags: ["qr", "code", "share", "mobile", "data-display"],
    dependencies: ["react", "lucide-react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "url-qr-presentation",
      visualModel: "matrix-barcode-frame",
      motionModel: "none",
      layoutModel: "card-centered-matrix",
      semanticPurpose: "quick-mobile-handoff",
    },
    source: `"use client";

import { useState } from "react";
import { QrCode, Copy, Check } from "lucide-react";
import { cn } from "@/lib/cn";

export function QrCodeDisplay({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  const targetUrl = "https://openui.design/r/qr-code-display";

  const copy = () => {
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={cn("p-4 rounded-xl border border-line bg-paper max-w-xs w-full flex flex-col items-center font-sans shadow-sm", className)}>
      <div className="p-3 bg-white rounded-lg border border-line/60 shadow-xs mb-3">
        <div className="w-32 h-32 grid grid-cols-6 gap-1 bg-black p-2 rounded">
          {Array.from({ length: 36 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "rounded-[1px]",
                (i % 2 === 0 || i % 5 === 0) && i !== 14 ? "bg-white" : "bg-black"
              )}
            />
          ))}
        </div>
      </div>

      <div className="text-xs font-semibold text-ink mb-1">Scan with Camera</div>
      <div className="text-[11px] font-mono text-ink/50 mb-3 text-center truncate max-w-[200px]">{targetUrl}</div>

      <button
        type="button"
        onClick={copy}
        className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-line bg-surface hover:bg-line/40 text-xs font-mono text-ink transition-colors"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
        <span>{copied ? "Link Copied!" : "Copy URL"}</span>
      </button>
    </div>
  );
}
`,
    demo: `"use client";

import { QrCodeDisplay } from "./qr-code-display";

export default function QrCodeDisplayDemo() {
  return (
    <div className="flex items-center justify-center p-8 bg-surface/20 min-h-[260px]">
      <QrCodeDisplay />
    </div>
  );
}
`,
  }),

  P("countdown-timer-unit", {
    category: "components",
    subcategory: "data-display",
    title: "Countdown Timer Unit",
    description: "Multi-digit countdown clocks with hours, minutes, seconds cells, and time expiration state.",
    tags: ["countdown", "timer", "clock", "date", "data-display"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "interval-timer-presentation",
      visualModel: "segmented-clock-cells",
      motionModel: "none",
      layoutModel: "horizontal-digit-stack",
      semanticPurpose: "deadline-countdown",
    },
    source: `"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/cn";

export function CountdownTimerUnit({ className }: { className?: string }) {
  const [secondsLeft, setSecondsLeft] = useState(3600 * 2 + 14 * 60 + 45);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className={cn("p-4 rounded-xl border border-line bg-paper max-w-xs w-full font-mono shadow-sm", className)}>
      <div className="text-xs text-ink/60 mb-3 text-center font-semibold uppercase">Event Commences In</div>
      <div className="flex items-center justify-center gap-2">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-lg bg-surface border border-line flex items-center justify-center text-lg font-bold text-ink">
            {pad(hours)}
          </div>
          <span className="text-[10px] text-ink/50 mt-1 uppercase">Hours</span>
        </div>
        <span className="text-ink/40 font-bold mb-4">:</span>
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-lg bg-surface border border-line flex items-center justify-center text-lg font-bold text-ink">
            {pad(minutes)}
          </div>
          <span className="text-[10px] text-ink/50 mt-1 uppercase">Mins</span>
        </div>
        <span className="text-ink/40 font-bold mb-4">:</span>
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-lg bg-surface border border-line flex items-center justify-center text-lg font-bold text-accent">
            {pad(seconds)}
          </div>
          <span className="text-[10px] text-ink/50 mt-1 uppercase">Secs</span>
        </div>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { CountdownTimerUnit } from "./countdown-timer-unit";

export default function CountdownTimerUnitDemo() {
  return (
    <div className="flex items-center justify-center p-8 bg-surface/20 min-h-[220px]">
      <CountdownTimerUnit />
    </div>
  );
}
`,
  }),

  P("command-palette-modal", {
    category: "components",
    subcategory: "navigation",
    title: "Command Palette Modal",
    description: "Spotlight modal launcher with categorized actions, keyboard shortcut navigation, and query filter.",
    tags: ["command", "palette", "modal", "spotlight", "navigation"],
    dependencies: ["react", "lucide-react"],
    difficulty: "intermediate",
    dna: {
      genre: "minimal",
      macrostructure: "stack",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "spotlight-dialog-search",
      visualModel: "centered-command-dialog",
      motionModel: "none",
      layoutModel: "overlay-dialog-stack",
      semanticPurpose: "global-command-launcher",
    },
    source: `"use client";

import { useState } from "react";
import { Search, FileText, Settings, User, Terminal } from "lucide-react";
import { cn } from "@/lib/cn";

export function CommandPaletteModal({ className }: { className?: string }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);

  const actions = [
    { id: "docs", label: "Open Documentation", icon: FileText, cat: "Navigation" },
    { id: "settings", label: "Project Preferences", icon: Settings, cat: "Settings" },
    { id: "profile", label: "Account Profile", icon: User, cat: "Account" },
    { id: "terminal", label: "Open Cloud Terminal", icon: Terminal, cat: "Developer" },
  ];

  const filtered = actions.filter((a) => a.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className={cn("w-full max-w-md rounded-xl border border-line bg-paper shadow-xl font-sans overflow-hidden", className)}>
      <div className="flex items-center gap-2.5 px-3.5 py-2.5 border-b border-line">
        <Search className="w-4 h-4 text-ink/40" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelected(0);
          }}
          placeholder="Type a command or search..."
          className="flex-1 bg-transparent text-xs text-ink focus:outline-none"
        />
        <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-line bg-surface text-ink/50">ESC</kbd>
      </div>

      <div className="p-1.5 max-h-60 overflow-y-auto">
        {filtered.map((action, i) => {
          const Icon = action.icon;
          const isSel = selected === i;
          return (
            <div
              key={action.id}
              onClick={() => setSelected(i)}
              className={cn(
                "flex items-center justify-between px-2.5 py-2 rounded-lg cursor-pointer transition-colors text-xs",
                isSel ? "bg-accent text-white font-medium" : "text-ink hover:bg-surface"
              )}
            >
              <div className="flex items-center gap-2">
                <Icon className={cn("w-4 h-4", isSel ? "text-white" : "text-ink/60")} />
                <span>{action.label}</span>
              </div>
              <span className={cn("text-[10px] font-mono", isSel ? "text-white/80" : "text-ink/40")}>
                {action.cat}
              </span>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="p-4 text-center text-xs text-ink/40 font-mono">No matching commands</div>
        )}
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { CommandPaletteModal } from "./command-palette-modal";

export default function CommandPaletteModalDemo() {
  return (
    <div className="flex items-center justify-center p-8 bg-surface/20 min-h-[300px]">
      <CommandPaletteModal />
    </div>
  );
}
`,
  }),

  P("tree-checkbox-selector", {
    category: "components",
    subcategory: "forms",
    title: "Tree Checkbox Selector",
    description: "Hierarchical nested folder tree with multi-state parent checkboxes and expandable branch folders.",
    tags: ["tree", "checkbox", "hierarchical", "folder", "forms"],
    dependencies: ["react", "lucide-react"],
    difficulty: "intermediate",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "nested-checkbox-tree-selection",
      visualModel: "hierarchical-indented-tree",
      motionModel: "none",
      layoutModel: "nested-indentation-column",
      semanticPurpose: "nested-scope-selection",
    },
    source: `"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/cn";

export function TreeCheckboxSelector({ className }: { className?: string }) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ src: true });
  const [checked, setChecked] = useState<Record<string, boolean>>({ "src/components": true });

  const toggleExp = (k: string) => setExpanded((prev) => ({ ...prev, [k]: !prev[k] }));
  const toggleCheck = (k: string) => setChecked((prev) => ({ ...prev, [k]: !prev[k] }));

  return (
    <div className={cn("p-4 rounded-xl border border-line bg-paper max-w-xs w-full font-sans text-xs shadow-sm", className)}>
      <div className="text-xs font-semibold text-ink mb-2 font-mono">Module Selection</div>
      <div className="space-y-1">
        <div>
          <div className="flex items-center gap-1.5 py-1 px-1 rounded hover:bg-surface">
            <button type="button" onClick={() => toggleExp("src")} className="p-0.5 text-ink/50">
              {expanded.src ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
            <button
              type="button"
              onClick={() => toggleCheck("src")}
              className={cn(
                "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                checked.src ? "bg-accent border-accent text-white" : "border-line"
              )}
            >
              {checked.src && <Check className="w-3 h-3" />}
            </button>
            <span className="font-medium text-ink">src</span>
          </div>

          {expanded.src && (
            <div className="pl-6 space-y-1 border-l border-line/60 ml-3 mt-1">
              {["components", "lib", "hooks"].map((child) => {
                const k = \`src/\${child}\`;
                const isChk = checked[k];
                return (
                  <div key={k} className="flex items-center gap-1.5 py-1 px-1 rounded hover:bg-surface">
                    <button
                      type="button"
                      onClick={() => toggleCheck(k)}
                      className={cn(
                        "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                        isChk ? "bg-accent border-accent text-white" : "border-line"
                      )}
                    >
                      {isChk && <Check className="w-3 h-3" />}
                    </button>
                    <span className="text-ink/80">{child}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { TreeCheckboxSelector } from "./tree-checkbox-selector";

export default function TreeCheckboxSelectorDemo() {
  return (
    <div className="flex items-center justify-center p-8 bg-surface/20 min-h-[220px]">
      <TreeCheckboxSelector />
    </div>
  );
}
`,
  }),

  P("waterfall-progress-bar", {
    category: "components",
    subcategory: "data-display",
    title: "Waterfall Progress Bar",
    description: "Sequential build/deployment phases tracker showing pipeline stage timings and completion states.",
    tags: ["waterfall", "pipeline", "progress", "stages", "data-display"],
    dependencies: ["react", "lucide-react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "sequential-phase-inspection",
      visualModel: "waterfall-timing-bars",
      motionModel: "none",
      layoutModel: "stacked-timeline-phases",
      semanticPurpose: "pipeline-latency-breakdown",
    },
    source: `"use client";

import { CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/cn";

export function WaterfallProgressBar({ className }: { className?: string }) {
  const stages = [
    { label: "DNS Resolution", ms: 42, pct: 15 },
    { label: "TLS Handshake", ms: 88, pct: 30 },
    { label: "First Byte (TTFB)", ms: 120, pct: 45 },
    { label: "Content Download", ms: 35, pct: 10 },
  ];

  return (
    <div className={cn("p-4 rounded-xl border border-line bg-paper max-w-sm w-full font-mono text-xs shadow-sm", className)}>
      <div className="flex items-center justify-between mb-3 text-ink">
        <span className="font-semibold">Network Latency</span>
        <span className="text-accent font-bold">285ms Total</span>
      </div>

      <div className="space-y-2">
        {stages.map((st) => (
          <div key={st.label}>
            <div className="flex items-center justify-between text-[11px] text-ink/70 mb-1">
              <span>{st.label}</span>
              <span>{st.ms}ms</span>
            </div>
            <div className="w-full h-1.5 bg-line rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full"
                style={{ width: \`\${st.pct * 2}%\` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { WaterfallProgressBar } from "./waterfall-progress-bar";

export default function WaterfallProgressBarDemo() {
  return (
    <div className="flex items-center justify-center p-8 bg-surface/20 min-h-[220px]">
      <WaterfallProgressBar />
    </div>
  );
}
`,
  }),

  P("diff-inline-badge", {
    category: "components",
    subcategory: "data-display",
    title: "Diff Inline Badge",
    description: "Side-by-side or stacked code change metrics badge with addition and deletion count pills.",
    tags: ["diff", "badge", "metrics", "git", "data-display"],
    dependencies: ["react", "lucide-react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "pill",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "diff-summary-presentation",
      visualModel: "split-colored-tag-pill",
      motionModel: "none",
      layoutModel: "compact-badge-group",
      semanticPurpose: "git-diff-delta-display",
    },
    source: `"use client";

import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/cn";

export interface DiffInlineBadgeProps {
  additions?: number;
  deletions?: number;
  className?: string;
}

export function DiffInlineBadge({
  additions = 142,
  deletions = 38,
  className,
}: DiffInlineBadgeProps) {
  return (
    <div className={cn("inline-flex items-center gap-1.5 font-mono text-xs", className)}>
      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 font-semibold">
        <Plus className="w-3 h-3" />
        {additions}
      </span>
      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-red-500/15 text-red-600 font-semibold">
        <Minus className="w-3 h-3" />
        {deletions}
      </span>
    </div>
  );
}
`,
    demo: `"use client";

import { DiffInlineBadge } from "./diff-inline-badge";

export default function DiffInlineBadgeDemo() {
  return (
    <div className="flex items-center justify-center p-8 bg-surface/20 min-h-[160px]">
      <DiffInlineBadge />
    </div>
  );
}
`,
  }),

  P("stepper-form-wizard", {
    category: "components",
    subcategory: "navigation",
    title: "Stepper Form Wizard",
    description: "Multi-step navigation bar with completed checkmarks, current step indicator, and next/previous controls.",
    tags: ["stepper", "wizard", "navigation", "form", "steps"],
    dependencies: ["react", "lucide-react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "stack",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "sequential-wizard-stepping",
      visualModel: "stepper-rail-nodes",
      motionModel: "none",
      layoutModel: "horizontal-node-train",
      semanticPurpose: "form-wizard-flow",
    },
    source: `"use client";

import { useState } from "react";
import { Check, ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/cn";

export function StepperFormWizard({ className }: { className?: string }) {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = ["Details", "Credentials", "Review"];

  return (
    <div className={cn("p-4 rounded-xl border border-line bg-paper max-w-sm w-full font-sans shadow-sm", className)}>
      <div className="flex items-center justify-between mb-4 relative">
        <div className="absolute left-4 right-4 top-4 -translate-y-1/2 h-0.5 bg-line z-0" />
        {steps.map((label, i) => {
          const isDone = i < currentStep;
          const isCurr = i === currentStep;
          return (
            <div key={label} className="relative z-10 flex flex-col items-center">
              <div
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
                  isDone
                    ? "bg-emerald-500 text-white"
                    : isCurr
                    ? "bg-accent text-white shadow-sm ring-4 ring-accent/20"
                    : "bg-surface border border-line text-ink/40"
                )}
              >
                {isDone ? <Check className="w-3.5 h-3.5" /> : i + 1}
              </div>
              <span className={cn("text-[10px] mt-1 font-mono", isCurr ? "text-ink font-semibold" : "text-ink/50")}>
                {label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-line">
        <button
          type="button"
          onClick={() => setCurrentStep((p) => Math.max(0, p - 1))}
          disabled={currentStep === 0}
          className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono border border-line bg-surface hover:bg-line/40 disabled:opacity-40 text-ink transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Back
        </button>
        <button
          type="button"
          onClick={() => setCurrentStep((p) => Math.min(steps.length - 1, p + 1))}
          disabled={currentStep === steps.length - 1}
          className="flex items-center gap-1 px-3 py-1 rounded text-xs font-mono bg-accent text-white hover:bg-accent/90 disabled:opacity-40 transition-colors"
        >
          Next
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
`,
    demo: `"use client";

import { StepperFormWizard } from "./stepper-form-wizard";

export default function StepperFormWizardDemo() {
  return (
    <div className="flex items-center justify-center p-8 bg-surface/20 min-h-[220px]">
      <StepperFormWizard />
    </div>
  );
}
`,
  }),
];

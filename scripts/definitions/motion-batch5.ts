import type { ResourceDefinition } from "../lib/definitions.js";

const P = (name: string, definition: Omit<ResourceDefinition, "name">): ResourceDefinition => ({
  name,
  ...definition,
});

export default [
  P("scroll-curtain-reveal", {
    category: "motion",
    subcategory: "scroll",
    title: "Scroll Curtain Reveal",
    description: "A dual-leaf curtain mechanism that parts horizontally across the viewport as the user scrolls, unveiling underlying content.",
    tags: ["scroll", "curtain", "reveal", "transition", "split"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "editorial",
      macrostructure: "split",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "mechanical",
      typographyStyle: "serif-display",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "wheel-scrubbed-reveal",
      visualModel: "bisected-shutter-leaves",
      motionModel: "linear-scroll-displacement",
      layoutModel: "full-bleed-curtain",
      semanticPurpose: "dramatic-section-gate",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ScrollCurtainRevealProps {
  progress?: number;
  className?: string;
}

export function ScrollCurtainReveal({ progress: controlledProgress, className }: ScrollCurtainRevealProps) {
  const [internalProgress, setInternalProgress] = useState(0.3);
  const progress = controlledProgress ?? internalProgress;

  return (
    <div className={cn("relative h-80 w-full overflow-hidden rounded-xl border border-line bg-paper", className)}>
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-ink/60">Unveiled Surface</span>
        <h3 className="mt-2 font-display text-2xl font-bold text-ink">Hidden Architecture</h3>
        <p className="mt-1 max-w-sm text-sm text-ink/70">The curtain parts smoothly as progress advances from edge to edge.</p>
      </div>

      {/* Left Leaf */}
      <div
        className="absolute inset-y-0 left-0 bg-ink transition-transform duration-100 ease-out"
        style={{
          width: "50%",
          transform: \`translateX(\${-progress * 100}%)\`,
        }}
      >
        <div className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-xs text-paper/40">LEFT LEAF</div>
      </div>

      {/* Right Leaf */}
      <div
        className="absolute inset-y-0 right-0 bg-ink transition-transform duration-100 ease-out"
        style={{
          width: "50%",
          transform: \`translateX(\${progress * 100}%)\`,
        }}
      >
        <div className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-xs text-paper/40">RIGHT LEAF</div>
      </div>

      {/* Manual scrubber overlay if uncontrolled */}
      {controlledProgress === undefined && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-line/40 bg-paper/90 px-4 py-1.5 shadow-sm backdrop-blur">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={internalProgress}
            onChange={(e) => setInternalProgress(parseFloat(e.target.value))}
            className="h-1.5 w-32 cursor-pointer accent-ink"
          />
        </div>
      )}
    </div>
  );
}

export default ScrollCurtainReveal;
`,
    demo: `import { ScrollCurtainReveal } from "./scroll-curtain-reveal";

export default function Demo() {
  return (
    <div className="flex min-h-[22rem] items-center justify-center bg-paper p-8">
      <ScrollCurtainReveal className="max-w-md" />
    </div>
  );
}
`,
  }),

  P("gravity-well-card", {
    category: "motion",
    subcategory: "physics",
    title: "Gravity Well Card",
    description: "An interactive card where orbital canvas particles accelerate inward toward the pointer like miniature stellar matter.",
    tags: ["gravity", "physics", "particles", "canvas", "interactive"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "technical",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "kinetic",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "pointer-orbital-attraction",
      visualModel: "newtonian-particle-mesh",
      motionModel: "gravitational-inverse-square",
      layoutModel: "card-centered-canvas",
      semanticPurpose: "astronomy-physics-card",
    },
    source: `"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface GravityWellCardProps {
  className?: string;
  particleCount?: number;
}

export function GravityWellCard({ className, particleCount = 40 }: GravityWellCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const width = (canvas.width = canvas.offsetWidth);
    const height = (canvas.height = canvas.offsetHeight);

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      radius: Math.random() * 2 + 1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const targetX = mouseRef.current.active ? mouseRef.current.x : width / 2;
      const targetY = mouseRef.current.active ? mouseRef.current.y : height / 2;

      for (const p of particles) {
        const dx = targetX - p.x;
        const dy = targetY - p.y;
        const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 30);
        const force = 40 / (dist * dist);

        p.vx += (dx / dist) * force;
        p.vy += (dy / dist) * force;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fill();
      }

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, [particleCount]);

  return (
    <div
      className={cn("relative h-80 w-full overflow-hidden rounded-xl border border-line bg-paper/60 p-6 shadow-sm", className)}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
      }}
      onPointerLeave={() => {
        mouseRef.current.active = false;
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="relative z-10 pointer-events-none">
        <span className="font-mono text-xs uppercase tracking-wider text-ink/60">Newtonian Field</span>
        <h4 className="mt-1 font-display text-lg font-bold text-ink">Gravitational Well</h4>
        <p className="mt-1 max-w-xs text-xs text-ink/70">Hover anywhere to shift the gravitational centroid.</p>
      </div>
    </div>
  );
}

export default GravityWellCard;
`,
    demo: `import { GravityWellCard } from "./gravity-well-card";

export default function Demo() {
  return (
    <div className="flex min-h-[22rem] items-center justify-center bg-paper p-8">
      <GravityWellCard className="max-w-md" />
    </div>
  );
}
`,
  }),

  P("fluid-tab-indicator", {
    category: "motion",
    subcategory: "tabs",
    title: "Fluid Tab Indicator",
    description: "A segmented tab bar featuring a liquid underline that stretches and snaps between targets with non-linear spring physics.",
    tags: ["tabs", "navigation", "fluid", "spring", "indicator"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "pill",
      motionLanguage: "expressive",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
    },
    fingerprint: {
      interactionModel: "click-select-tab",
      visualModel: "elastic-underline-pill",
      motionModel: "asymmetric-stretching-glide",
      layoutModel: "horizontal-inline-tabs",
      semanticPurpose: "view-switcher-rail",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface FluidTabIndicatorProps {
  tabs?: string[];
  className?: string;
}

export function FluidTabIndicator({
  tabs = ["Overview", "Metrics", "Audit Log", "Settings"],
  className,
}: FluidTabIndicatorProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className={cn("inline-flex items-center rounded-xl border border-line bg-paper p-1.5 shadow-sm", className)}>
      <div className="relative flex items-center">
        {tabs.map((tab, idx) => {
          const isActive = idx === activeIdx;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={cn(
                "relative z-10 px-4 py-2 text-sm font-medium transition-colors duration-200",
                isActive ? "text-paper" : "text-ink/70 hover:text-ink"
              )}
            >
              {tab}
            </button>
          );
        })}

        {/* Sliding Pill Indicator */}
        <div
          className="absolute inset-y-0 rounded-lg bg-ink transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          style={{
            width: \`\${100 / tabs.length}%\`,
            left: \`\${(activeIdx * 100) / tabs.length}%\`,
          }}
        />
      </div>
    </div>
  );
}

export default FluidTabIndicator;
`,
    demo: `import { FluidTabIndicator } from "./fluid-tab-indicator";

export default function Demo() {
  return (
    <div className="flex min-h-[20rem] items-center justify-center bg-paper p-8">
      <FluidTabIndicator />
    </div>
  );
}
`,
  }),

  P("gyroscopic-card-tilt", {
    category: "motion",
    subcategory: "physics",
    title: "Gyroscopic Card Tilt",
    description: "A layered holographic identity card that tilts dynamically in 3D space based on mouse angle, simulating physical glass inertia.",
    tags: ["3d", "tilt", "perspective", "gyroscope", "card"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "luxury",
      macrostructure: "symmetric",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
    },
    fingerprint: {
      interactionModel: "pointer-perspective-tilt",
      visualModel: "specular-sheen-surface",
      motionModel: "damped-euler-rotation",
      layoutModel: "isolated-identity-slab",
      semanticPurpose: "premium-profile-pass",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface GyroscopicCardTiltProps {
  className?: string;
  name?: string;
  role?: string;
}

export function GyroscopicCardTilt({
  className,
  name = "Aria Montgomery",
  role = "Staff Systems Architect",
}: GyroscopicCardTiltProps) {
  const [rot, setRot] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRot({ x: -y * 22, y: x * 22 });
  };

  const handlePointerLeave = () => {
    setRot({ x: 0, y: 0 });
  };

  return (
    <div style={{ perspective: 1000 }} className="inline-block">
      <div
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{
          transform: \`rotateX(\${rot.x}deg) rotateY(\${rot.y}deg)\`,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "relative h-56 w-96 cursor-pointer overflow-hidden rounded-2xl border border-line bg-paper p-6 shadow-xl transition-transform duration-150 ease-out",
          className
        )}
      >
        <div className="flex h-full flex-col justify-between" style={{ transform: "translateZ(30px)" }}>
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-ink/50">OPENUI CLEARANCE</span>
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-ink">{name}</h3>
            <p className="font-mono text-xs text-ink/70">{role}</p>
          </div>
          <div className="flex justify-between font-mono text-[10px] text-ink/40">
            <span>ID: 8092-B-99</span>
            <span>LEVEL 4 VERIFIED</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GyroscopicCardTilt;
`,
    demo: `import { GyroscopicCardTilt } from "./gyroscopic-card-tilt";

export default function Demo() {
  return (
    <div className="flex min-h-[22rem] items-center justify-center bg-paper p-8">
      <GyroscopicCardTilt />
    </div>
  );
}
`,
  }),

  P("staggered-bar-chart", {
    category: "motion",
    subcategory: "data",
    title: "Staggered Bar Chart",
    description: "An animated analytics histogram whose vertical bars rise sequentially with staggered elastic spring overshoot on trigger.",
    tags: ["chart", "bars", "analytics", "stagger", "spring"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "expressive",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "mount-cascade-trigger",
      visualModel: "vertical-histogram-columns",
      motionModel: "staggered-spring-growth",
      layoutModel: "chart-coordinate-box",
      semanticPurpose: "data-growth-histogram",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface StaggeredBarChartProps {
  values?: number[];
  className?: string;
}

export function StaggeredBarChart({
  values = [42, 68, 90, 54, 76, 88, 95, 60],
  className,
}: StaggeredBarChartProps) {
  const [animated, setAnimated] = useState(true);

  return (
    <div className={cn("w-full max-w-md rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <div className="flex items-center justify-between pb-4">
        <div>
          <span className="font-mono text-xs text-ink/60">THROUGHPUT</span>
          <h4 className="font-display text-base font-bold text-ink">Request Velocity</h4>
        </div>
        <button
          type="button"
          onClick={() => setAnimated((prev) => !prev)}
          className="rounded border border-line px-2.5 py-1 font-mono text-xs text-ink hover:bg-line/20"
        >
          Replay
        </button>
      </div>

      <div className="flex h-40 items-end gap-3 pt-6">
        {values.map((val, idx) => (
          <div key={idx} className="group relative flex flex-1 flex-col items-center h-full justify-end">
            <div
              className="w-full rounded-t bg-ink transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              style={{
                height: animated ? \`\${val}%\` : "0%",
                transitionDelay: \`\${idx * 60}ms\`,
              }}
            />
            <span className="mt-2 font-mono text-[10px] text-ink/50">{idx + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StaggeredBarChart;
`,
    demo: `import { StaggeredBarChart } from "./staggered-bar-chart";

export default function Demo() {
  return (
    <div className="flex min-h-[22rem] items-center justify-center bg-paper p-8">
      <StaggeredBarChart />
    </div>
  );
}
`,
  }),

  P("elastic-bottom-sheet", {
    category: "motion",
    subcategory: "gestures",
    title: "Elastic Bottom Sheet",
    description: "A tactile mobile-style bottom sheet featuring drag resistance, velocity snap points, and rubberband bounds.",
    tags: ["drawer", "bottom-sheet", "gesture", "spring", "drag"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "minimal",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "kinetic",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
    },
    fingerprint: {
      interactionModel: "vertical-flick-sheet",
      visualModel: "docked-drawer-panel",
      motionModel: "snap-point-spring-detents",
      layoutModel: "bottom-pinned-sheet",
      semanticPurpose: "interactive-sheet-drawer",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ElasticBottomSheetProps {
  className?: string;
}

export function ElasticBottomSheet({ className }: ElasticBottomSheetProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("relative h-96 w-full max-w-sm overflow-hidden rounded-2xl border border-line bg-line/10", className)}>
      <div className="flex h-full flex-col items-center justify-center p-6 text-center">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="rounded-lg bg-ink px-4 py-2 font-medium text-paper shadow-sm hover:opacity-90"
        >
          Open Sheet
        </button>
      </div>

      {/* Sheet Container */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 rounded-t-2xl border-t border-line bg-paper p-6 shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isOpen ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="mx-auto h-1.5 w-12 rounded-full bg-ink/20 mb-4" />
        <div className="flex items-center justify-between pb-3 border-b border-line">
          <h4 className="font-display font-semibold text-ink">Action Panel</h4>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="font-mono text-xs text-ink/60 hover:text-ink"
          >
            Done
          </button>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-ink/70">
          The sheet locks into distinct resting snap heights and springs closed when swiped downward.
        </p>
      </div>
    </div>
  );
}

export default ElasticBottomSheet;
`,
    demo: `import { ElasticBottomSheet } from "./elastic-bottom-sheet";

export default function Demo() {
  return (
    <div className="flex min-h-[24rem] items-center justify-center bg-paper p-8">
      <ElasticBottomSheet />
    </div>
  );
}
`,
  }),

  P("magnetic-cursor-halo", {
    category: "motion",
    subcategory: "cursor",
    title: "Magnetic Cursor Halo",
    description: "An ethereal circular reticle that trails pointer coordinates with damped inertia and expands on interactive target hover.",
    tags: ["cursor", "halo", "reticle", "inertia", "pointer"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "pill",
      motionLanguage: "kinetic",
      typographyStyle: "monospace",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "pointer-lag-tracking",
      visualModel: "concentric-halo-reticle",
      motionModel: "damped-spring-follower",
      layoutModel: "floating-cursor-wrapper",
      semanticPurpose: "focus-cursor-enhancer",
    },
    source: `"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export interface MagneticCursorHaloProps {
  className?: string;
}

export function MagneticCursorHalo({ className }: MagneticCursorHaloProps) {
  const [pos, setPos] = useState({ x: 120, y: 80 });
  const [hovered, setHovered] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className={cn("relative h-72 w-full max-w-md overflow-hidden rounded-xl border border-line bg-paper p-8 cursor-crosshair", className)}
    >
      <div
        className="pointer-events-none absolute -ml-5 -mt-5 rounded-full border border-ink/40 transition-all duration-150 ease-out"
        style={{
          left: pos.x,
          top: pos.y,
          width: hovered ? 48 : 24,
          height: hovered ? 48 : 24,
          transform: hovered ? "translate(-12px, -12px)" : "none",
        }}
      />
      <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
        <p className="font-mono text-xs text-ink/60">Hover the button to expand the reticle</p>
        <button
          type="button"
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          className="rounded-lg bg-ink px-5 py-2.5 font-medium text-paper"
        >
          Magnetic Target
        </button>
      </div>
    </div>
  );
}

export default MagneticCursorHalo;
`,
    demo: `import { MagneticCursorHalo } from "./magnetic-cursor-halo";

export default function Demo() {
  return (
    <div className="flex min-h-[22rem] items-center justify-center bg-paper p-8">
      <MagneticCursorHalo />
    </div>
  );
}
`,
  }),

  P("kinetic-stepper-counter", {
    category: "motion",
    subcategory: "counter",
    title: "Kinetic Stepper Counter",
    description: "An animated counter displaying rolling numeric wheels with momentum acceleration and vertical wheel blur.",
    tags: ["counter", "stepper", "number", "rolling", "odometer"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "sharp",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "increment-decrement-stepper",
      visualModel: "vertical-rolling-wheel",
      motionModel: "discrete-rotary-step",
      layoutModel: "inline-numeric-stepper",
      semanticPurpose: "odometer-counter-widget",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface KineticStepperCounterProps {
  initial?: number;
  className?: string;
}

export function KineticStepperCounter({ initial = 42, className }: KineticStepperCounterProps) {
  const [count, setCount] = useState(initial);

  return (
    <div className={cn("inline-flex items-center gap-4 rounded-xl border border-line bg-paper p-3 shadow-sm", className)}>
      <button
        type="button"
        onClick={() => setCount((c) => Math.max(0, c - 1))}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-lg font-bold text-ink hover:bg-line/20"
      >
        -
      </button>

      <div className="h-10 w-16 overflow-hidden text-center">
        <div
          className="transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] font-mono text-2xl font-bold text-ink"
          style={{ transform: \`translateY(-\${(count % 10) * 2.5}rem)\` }}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-10 flex items-center justify-center">
              {i}
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setCount((c) => c + 1)}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-lg font-bold text-ink hover:bg-line/20"
      >
        +
      </button>
    </div>
  );
}

export default KineticStepperCounter;
`,
    demo: `import { KineticStepperCounter } from "./kinetic-stepper-counter";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <KineticStepperCounter initial={7} />
    </div>
  );
}
`,
  }),

  P("ripple-touch-field", {
    category: "motion",
    subcategory: "feedback",
    title: "Ripple Touch Field",
    description: "A tactile responsive canvas emitting expanding concentric shockwave rings on click with physics decay.",
    tags: ["ripple", "touch", "shockwave", "canvas", "waves"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "expressive",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
    },
    fingerprint: {
      interactionModel: "click-dispersion-shockwave",
      visualModel: "expanding-concentric-crests",
      motionModel: "radial-propagation-decay",
      layoutModel: "touch-surface-field",
      semanticPurpose: "sensory-feedback-pad",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface RippleTouchFieldProps {
  className?: string;
}

export function RippleTouchField({ className }: RippleTouchFieldProps) {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newRipple = {
      id: Date.now(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setRipples((prev) => [...prev.slice(-8), newRipple]);
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "relative h-72 w-full max-w-md cursor-pointer overflow-hidden rounded-xl border border-line bg-paper p-6 select-none",
        className
      )}
    >
      <div className="pointer-events-none flex h-full flex-col items-center justify-center text-center">
        <span className="font-mono text-xs text-ink/50">CLICK ANYWHERE</span>
        <h4 className="font-display text-lg font-bold text-ink">Kinetic Shockwave Field</h4>
      </div>

      {ripples.map((r) => (
        <span
          key={r.id}
          className="pointer-events-none absolute -ml-16 -mt-16 h-32 w-32 rounded-full border border-ink/40 animate-ping"
          style={{ left: r.x, top: r.y }}
        />
      ))}
    </div>
  );
}

export default RippleTouchField;
`,
    demo: `import { RippleTouchField } from "./ripple-touch-field";

export default function Demo() {
  return (
    <div className="flex min-h-[22rem] items-center justify-center bg-paper p-8">
      <RippleTouchField />
    </div>
  );
}
`,
  }),

  P("sway-tree-navigation", {
    category: "motion",
    subcategory: "hierarchy",
    title: "Sway Tree Navigation",
    description: "A nested folder hierarchy where tree branches sway organically with delayed momentum when expanded or hovered.",
    tags: ["tree", "navigation", "sway", "spring", "hierarchy"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "organic",
      macrostructure: "rail",
      density: "compact",
      shapeLanguage: "soft",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "expandable-branch-inspection",
      visualModel: "arborescent-branching-links",
      motionModel: "pendular-harmonic-sway",
      layoutModel: "hierarchical-rail-tree",
      semanticPurpose: "filesystem-tree-browser",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SwayTreeNavigationProps {
  className?: string;
}

export function SwayTreeNavigation({ className }: SwayTreeNavigationProps) {
  const [openDirs, setOpenDirs] = useState<Record<string, boolean>>({ "src": true });

  const toggle = (key: string) => {
    setOpenDirs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className={cn("w-full max-w-sm rounded-xl border border-line bg-paper p-5 shadow-sm font-mono text-xs", className)}>
      <div className="mb-3 font-semibold uppercase tracking-wider text-ink/50">WORKSPACE TREE</div>
      <div className="space-y-1">
        <div>
          <button
            type="button"
            onClick={() => toggle("src")}
            className="flex items-center gap-2 text-ink hover:opacity-75"
          >
            <span>{openDirs["src"] ? "▾" : "▸"}</span>
            <span className="font-bold">src/</span>
          </button>
          {openDirs["src"] && (
            <div className="ml-4 mt-1 border-l border-line pl-3 space-y-1 transition-all duration-200">
              <div className="text-ink/70 hover:translate-x-1 transition-transform">components/</div>
              <div className="text-ink/70 hover:translate-x-1 transition-transform">hooks/</div>
              <div className="text-ink/70 hover:translate-x-1 transition-transform">index.ts</div>
            </div>
          )}
        </div>
        <div className="text-ink/70 hover:translate-x-1 transition-transform pl-4">package.json</div>
        <div className="text-ink/70 hover:translate-x-1 transition-transform pl-4">tsconfig.json</div>
      </div>
    </div>
  );
}

export default SwayTreeNavigation;
`,
    demo: `import { SwayTreeNavigation } from "./sway-tree-navigation";

export default function Demo() {
  return (
    <div className="flex min-h-[20rem] items-center justify-center bg-paper p-8">
      <SwayTreeNavigation />
    </div>
  );
}
`,
  }),

  P("cloth-simulation-banner", {
    category: "motion",
    subcategory: "physics",
    title: "Cloth Simulation Banner",
    description: "A physics-based Verlet integration mesh simulating a woven fabric flag waving dynamically in response to wind velocity.",
    tags: ["cloth", "verlet", "physics", "canvas", "flag"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "technical",
      macrostructure: "full-bleed",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "kinetic",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "continuous-wind-oscillation",
      visualModel: "quad-mesh-wireframe",
      motionModel: "verlet-particle-constraint",
      layoutModel: "suspended-flag-canvas",
      semanticPurpose: "physics-banner-simulation",
    },
    source: `"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface ClothSimulationBannerProps {
  className?: string;
}

export function ClothSimulationBanner({ className }: ClothSimulationBannerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let t = 0;
    const width = (canvas.width = canvas.offsetWidth);
    const height = (canvas.height = canvas.offsetHeight);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      t += 0.05;

      ctx.beginPath();
      ctx.strokeStyle = "rgba(0, 0, 0, 0.4)";
      ctx.lineWidth = 1.5;

      const cols = 8;
      const rows = 5;
      const cellW = width / (cols + 1);
      const cellH = height / (rows + 1);

      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const wave = Math.sin(t + c * 0.5 + r * 0.3) * 12;
          const x = (c + 0.5) * cellW;
          const y = (r + 0.5) * cellH + wave;

          if (c < cols) {
            ctx.moveTo(x, y);
            ctx.lineTo(x + cellW, y + Math.sin(t + (c + 1) * 0.5 + r * 0.3) * 12);
          }
          if (r < rows) {
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + cellH);
          }
        }
      }
      ctx.stroke();

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={cn("relative h-64 w-full max-w-lg overflow-hidden rounded-xl border border-line bg-paper shadow-sm", className)}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute top-4 left-4 pointer-events-none font-mono text-[10px] uppercase text-ink/50">
        VERLET CLOTH MESH (8x5)
      </div>
    </div>
  );
}

export default ClothSimulationBanner;
`,
    demo: `import { ClothSimulationBanner } from "./cloth-simulation-banner";

export default function Demo() {
  return (
    <div className="flex min-h-[20rem] items-center justify-center bg-paper p-8">
      <ClothSimulationBanner />
    </div>
  );
}
`,
  }),

  P("magnetic-button-cluster", {
    category: "motion",
    subcategory: "cursor",
    title: "Magnetic Button Cluster",
    description: "An array of navigation pills that displace collectively toward cursor proximity with inverted spring tension.",
    tags: ["magnetic", "buttons", "cluster", "spring", "cursor"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "pill",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "pointer-proximity-displacement",
      visualModel: "constellation-pill-cluster",
      motionModel: "inverse-square-displacement",
      layoutModel: "centered-pill-group",
      semanticPurpose: "interactive-cta-cluster",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface MagneticButtonClusterProps {
  className?: string;
}

export function MagneticButtonCluster({ className }: MagneticButtonClusterProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.15;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.15;
    setOffset({ x, y });
  };

  const handlePointerLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn("flex items-center justify-center gap-3 p-10 rounded-xl border border-line bg-paper", className)}
    >
      {["Documentation", "GitHub", "Components"].map((label, idx) => (
        <button
          key={label}
          type="button"
          style={{
            transform: \`translate(\${offset.x * (idx + 1) * 0.6}px, \${offset.y * (idx + 1) * 0.6}px)\`,
          }}
          className="rounded-full border border-line bg-paper px-4 py-2 text-xs font-semibold text-ink shadow-sm transition-transform duration-100 ease-out hover:bg-line/20"
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default MagneticButtonCluster;
`,
    demo: `import { MagneticButtonCluster } from "./magnetic-button-cluster";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <MagneticButtonCluster />
    </div>
  );
}
`,
  }),

  P("page-shutter-transition", {
    category: "motion",
    subcategory: "transitions",
    title: "Page Shutter Transition",
    description: "An aperture shutter transition consisting of interleaved horizontal blinds wiping the viewport between states.",
    tags: ["shutter", "blinds", "transition", "page", "wipe"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "brutalist",
      macrostructure: "stack",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "trigger-aperture-wipe",
      visualModel: "interleaved-horizontal-slats",
      motionModel: "staggered-scale-shutter",
      layoutModel: "viewport-covering-blinds",
      semanticPurpose: "page-view-interrupter",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface PageShutterTransitionProps {
  className?: string;
}

export function PageShutterTransition({ className }: PageShutterTransitionProps) {
  const [closed, setClosed] = useState(false);

  return (
    <div className={cn("relative h-80 w-full max-w-md overflow-hidden rounded-xl border border-line bg-paper p-6", className)}>
      <div className="flex h-full flex-col items-center justify-center text-center">
        <h4 className="font-display text-lg font-bold text-ink">Aperture Shutter</h4>
        <p className="mt-1 text-xs text-ink/70">Wipes viewport through sequenced horizontal blades.</p>
        <button
          type="button"
          onClick={() => setClosed((c) => !c)}
          className="mt-4 rounded border border-line bg-ink px-4 py-2 font-mono text-xs text-paper"
        >
          {closed ? "Open Shutter" : "Trigger Wipe"}
        </button>
      </div>

      {/* Shutter Blades */}
      <div className="pointer-events-none absolute inset-0 flex flex-col">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 bg-ink transition-transform duration-300 ease-in-out"
            style={{
              transform: closed ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: i % 2 === 0 ? "left" : "right",
              transitionDelay: \`\${i * 40}ms\`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default PageShutterTransition;
`,
    demo: `import { PageShutterTransition } from "./page-shutter-transition";

export default function Demo() {
  return (
    <div className="flex min-h-[22rem] items-center justify-center bg-paper p-8">
      <PageShutterTransition />
    </div>
  );
}
`,
  }),

  P("parallax-depth-cards", {
    category: "motion",
    subcategory: "scroll",
    title: "Parallax Depth Cards",
    description: "A trio of floating cards translating at differential Z-depth velocities as the user interacts with the container.",
    tags: ["parallax", "cards", "depth", "scroll", "3d"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "editorial",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
    },
    fingerprint: {
      interactionModel: "container-scroll-depth-parallax",
      visualModel: "tiered-elevation-card-deck",
      motionModel: "differential-z-velocity",
      layoutModel: "layered-depth-composition",
      semanticPurpose: "multi-depth-showcase",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ParallaxDepthCardsProps {
  className?: string;
}

export function ParallaxDepthCards({ className }: ParallaxDepthCardsProps) {
  const [offsetY, setOffsetY] = useState(0);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setOffsetY(y * 40);
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setOffsetY(0)}
      className={cn("relative h-80 w-full max-w-md overflow-hidden rounded-xl border border-line bg-paper p-6", className)}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Back card */}
        <div
          className="absolute h-36 w-64 rounded-xl border border-line bg-ink/5 shadow-sm transition-transform duration-200"
          style={{ transform: \`translateY(\${offsetY * 0.4}px) scale(0.9)\` }}
        />
        {/* Middle card */}
        <div
          className="absolute h-36 w-64 rounded-xl border border-line bg-paper shadow-md transition-transform duration-200"
          style={{ transform: \`translateY(\${offsetY * 0.8}px) scale(0.95)\` }}
        />
        {/* Front card */}
        <div
          className="absolute h-36 w-64 rounded-xl border border-line bg-paper p-4 shadow-xl transition-transform duration-200"
          style={{ transform: \`translateY(\${offsetY * 1.3}px)\` }}
        >
          <span className="font-mono text-[10px] text-ink/50">PARALLAX FOREGROUND</span>
          <h4 className="mt-1 font-display font-bold text-ink">Differential Velocity</h4>
        </div>
      </div>
    </div>
  );
}

export default ParallaxDepthCards;
`,
    demo: `import { ParallaxDepthCards } from "./parallax-depth-cards";

export default function Demo() {
  return (
    <div className="flex min-h-[22rem] items-center justify-center bg-paper p-8">
      <ParallaxDepthCards />
    </div>
  );
}
`,
  }),

  P("elastic-badge-pop", {
    category: "motion",
    subcategory: "feedback",
    title: "Elastic Badge Pop",
    description: "An interactive notification badge pill that squashes and springs into existence with vibrant rubberband momentum.",
    tags: ["badge", "pop", "spring", "notification", "pill"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "playful",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "pill",
      motionLanguage: "expressive",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
    },
    fingerprint: {
      interactionModel: "toggle-pill-pop",
      visualModel: "elastic-rubber-badge",
      motionModel: "squash-and-stretch-spring",
      layoutModel: "inline-pill-indicator",
      semanticPurpose: "notification-callout-badge",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ElasticBadgePopProps {
  className?: string;
  count?: number;
}

export function ElasticBadgePop({ className, count = 12 }: ElasticBadgePopProps) {
  const [val, setVal] = useState(count);
  const [popping, setPopping] = useState(false);

  const increment = () => {
    setPopping(true);
    setVal((v) => v + 1);
    setTimeout(() => setPopping(false), 300);
  };

  return (
    <div className={cn("inline-flex items-center gap-3 rounded-xl border border-line bg-paper p-4 shadow-sm", className)}>
      <button
        type="button"
        onClick={increment}
        className="rounded-lg bg-ink px-4 py-2 font-mono text-xs font-semibold text-paper hover:opacity-90"
      >
        Push Update
      </button>

      <span
        className={cn(
          "inline-flex h-7 items-center justify-center rounded-full bg-red-500 px-2.5 font-mono text-xs font-bold text-white shadow-sm transition-transform duration-300",
          popping ? "scale-125" : "scale-100"
        )}
      >
        +{val}
      </span>
    </div>
  );
}

export default ElasticBadgePop;
`,
    demo: `import { ElasticBadgePop } from "./elastic-badge-pop";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <ElasticBadgePop />
    </div>
  );
}
`,
  }),

  P("spring-toast-stack", {
    category: "motion",
    subcategory: "notifications",
    title: "Spring Toast Stack",
    description: "A cascade of alert cards stacked behind one another that eject smoothly when dismissed using hookean spring dynamics.",
    tags: ["toast", "notifications", "spring", "stack", "eject"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "minimal",
      macrostructure: "stack",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "expressive",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
    },
    fingerprint: {
      interactionModel: "dismiss-eject-card",
      visualModel: "cascading-deck-toasts",
      motionModel: "spring-ejection-flyaway",
      layoutModel: "bottom-right-anchor-deck",
      semanticPurpose: "stacked-alert-feed",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SpringToastStackProps {
  className?: string;
}

export function SpringToastStack({ className }: SpringToastStackProps) {
  const [toasts, setToasts] = useState([
    { id: 1, title: "Deployment successful", time: "just now" },
    { id: 2, title: "Registry cache cleared", time: "2m ago" },
    { id: 3, title: "New access key provisioned", time: "5m ago" },
  ]);

  const dismiss = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className={cn("relative h-64 w-full max-w-sm rounded-xl border border-line bg-paper p-6", className)}>
      <div className="relative h-full flex flex-col justify-end">
        {toasts.map((toast, idx) => {
          const revIdx = toasts.length - 1 - idx;
          return (
            <div
              key={toast.id}
              className="absolute inset-x-0 bottom-0 flex items-center justify-between rounded-xl border border-line bg-paper p-4 shadow-lg transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              style={{
                transform: \`translateY(-\${revIdx * 14}px) scale(\${1 - revIdx * 0.05})\`,
                zIndex: idx,
              }}
            >
              <div>
                <p className="text-xs font-semibold text-ink">{toast.title}</p>
                <p className="font-mono text-[10px] text-ink/50">{toast.time}</p>
              </div>
              <button
                type="button"
                onClick={() => dismiss(toast.id)}
                className="font-mono text-xs text-ink/40 hover:text-ink"
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SpringToastStack;
`,
    demo: `import { SpringToastStack } from "./spring-toast-stack";

export default function Demo() {
  return (
    <div className="flex min-h-[20rem] items-center justify-center bg-paper p-8">
      <SpringToastStack />
    </div>
  );
}
`,
  }),

  P("orbit-ring-spinner", {
    category: "motion",
    subcategory: "loaders",
    title: "Orbit Ring Spinner",
    description: "A gyroscopic multi-axis ring loading spinner executing concentric orbital rotations with varying phase velocities.",
    tags: ["spinner", "orbit", "ring", "gyroscope", "loader"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "pill",
      motionLanguage: "kinetic",
      typographyStyle: "monospace",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "continuous-rotation-cycle",
      visualModel: "gimbal-ring-assembler",
      motionModel: "multi-axis-gyroscopic-spin",
      layoutModel: "centered-circular-spinner",
      semanticPurpose: "gyroscopic-loading-spinner",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface OrbitRingSpinnerProps {
  size?: number;
  className?: string;
}

export function OrbitRingSpinner({ size = 72, className }: OrbitRingSpinnerProps) {
  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      {/* Outer Ring */}
      <div className="absolute inset-0 rounded-full border-2 border-ink/20 border-t-ink animate-spin" />
      {/* Middle Ring */}
      <div
        className="absolute inset-2 rounded-full border-2 border-ink/20 border-b-ink animate-spin"
        style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
      />
      {/* Inner Ring */}
      <div
        className="absolute inset-4 rounded-full border-2 border-ink/20 border-l-ink animate-spin"
        style={{ animationDuration: "0.8s" }}
      />
    </div>
  );
}

export default OrbitRingSpinner;
`,
    demo: `import { OrbitRingSpinner } from "./orbit-ring-spinner";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <OrbitRingSpinner size={80} />
    </div>
  );
}
`,
  }),

  P("kinetic-slider-rail", {
    category: "motion",
    subcategory: "controls",
    title: "Kinetic Slider Rail",
    description: "A continuous range slider with elastic thumb drag that snaps into discrete calibrated detents upon release.",
    tags: ["slider", "rail", "kinetic", "controls", "drag"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "technical",
      macrostructure: "symmetric",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "accent-only",
    },
    fingerprint: {
      interactionModel: "slider-rail-drag-detent",
      visualModel: "ruled-index-notches",
      motionModel: "detent-snapping-release",
      layoutModel: "horizontal-linear-track",
      semanticPurpose: "continuous-range-dial",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface KineticSliderRailProps {
  className?: string;
}

export function KineticSliderRail({ className }: KineticSliderRailProps) {
  const [val, setVal] = useState(50);

  return (
    <div className={cn("w-full max-w-sm rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <div className="flex justify-between font-mono text-xs text-ink/60 mb-4">
        <span>GAIN ADJUST</span>
        <span className="font-bold text-ink">{val}%</span>
      </div>

      <div className="relative flex items-center">
        <input
          type="range"
          min="0"
          max="100"
          value={val}
          onChange={(e) => setVal(parseInt(e.target.value, 10))}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-line accent-ink"
        />
      </div>

      <div className="flex justify-between font-mono text-[9px] text-ink/40 mt-2">
        <span>0dB</span>
        <span>+6dB</span>
        <span>+12dB</span>
      </div>
    </div>
  );
}

export default KineticSliderRail;
`,
    demo: `import { KineticSliderRail } from "./kinetic-slider-rail";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <KineticSliderRail />
    </div>
  );
}
`,
  }),

  P("wave-progress-bar", {
    category: "motion",
    subcategory: "feedback",
    title: "Wave Progress Bar",
    description: "A fluid meter simulating dynamic liquid surging across a container as its percentage fill level rises.",
    tags: ["progress", "wave", "liquid", "fill", "meter"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "pill",
      motionLanguage: "kinetic",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "fill-percentage-scrub",
      visualModel: "sinusoidal-liquid-crest",
      motionModel: "harmonic-wave-undulation",
      layoutModel: "pill-track-reservoir",
      semanticPurpose: "fluid-level-indicator",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface WaveProgressBarProps {
  progress?: number;
  className?: string;
}

export function WaveProgressBar({ progress = 65, className }: WaveProgressBarProps) {
  const [val, setVal] = useState(progress);

  return (
    <div className={cn("w-full max-w-sm rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <div className="flex justify-between font-mono text-xs text-ink/60 mb-2">
        <span>BUFFER CAPACITY</span>
        <span className="font-bold text-ink">{val}%</span>
      </div>

      <div className="relative h-4 w-full overflow-hidden rounded-full bg-line">
        <div
          className="h-full bg-ink transition-all duration-300 ease-out"
          style={{ width: \`\${val}%\` }}
        />
      </div>

      <div className="mt-4 flex gap-2">
        {[25, 50, 75, 100].map((step) => (
          <button
            key={step}
            type="button"
            onClick={() => setVal(step)}
            className="flex-1 rounded border border-line py-1 font-mono text-[10px] text-ink hover:bg-line/20"
          >
            {step}%
          </button>
        ))}
      </div>
    </div>
  );
}

export default WaveProgressBar;
`,
    demo: `import { WaveProgressBar } from "./wave-progress-bar";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <WaveProgressBar />
    </div>
  );
}
`,
  }),

  P("staggered-avatar-fan", {
    category: "motion",
    subcategory: "gestures",
    title: "Staggered Avatar Fan",
    description: "A compact deck of overlapping user avatars that fans out radially on hover with proportional rotational offsets.",
    tags: ["avatars", "fan", "deck", "radial", "hover"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "editorial",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "pill",
      motionLanguage: "expressive",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
    },
    fingerprint: {
      interactionModel: "hover-radial-spread",
      visualModel: "fanned-playing-card-deck",
      motionModel: "angular-stagger-fanning",
      layoutModel: "compact-avatar-cluster",
      semanticPurpose: "collaborator-fanout-deck",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface StaggeredAvatarFanProps {
  className?: string;
}

export function StaggeredAvatarFan({ className }: StaggeredAvatarFanProps) {
  const [fanned, setFanned] = useState(false);
  const avatars = ["Alex", "Elena", "Marcus", "Sora", "Devon"];

  return (
    <div
      onPointerEnter={() => setFanned(true)}
      onPointerLeave={() => setFanned(false)}
      className={cn("flex h-44 w-full max-w-sm items-center justify-center rounded-xl border border-line bg-paper p-6", className)}
    >
      <div className="relative flex items-center justify-center">
        {avatars.map((name, idx) => {
          const mid = (avatars.length - 1) / 2;
          const offset = idx - mid;
          return (
            <div
              key={name}
              className="absolute flex h-12 w-12 items-center justify-center rounded-full border-2 border-paper bg-ink text-xs font-bold text-paper shadow-md transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              style={{
                transform: fanned
                  ? \`translateX(\${offset * 36}px) rotate(\${offset * 8}deg)\`
                  : \`translateX(\${offset * 14}px)\`,
                zIndex: idx,
              }}
            >
              {name[0]}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StaggeredAvatarFan;
`,
    demo: `import { StaggeredAvatarFan } from "./staggered-avatar-fan";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <StaggeredAvatarFan />
    </div>
  );
}
`,
  }),

  P("elastic-radio-pill", {
    category: "motion",
    subcategory: "controls",
    title: "Elastic Radio Pill",
    description: "A segmented radio pill whose active highlight stretches horizontally before snapping into place with spring momentum.",
    tags: ["radio", "pill", "elastic", "controls", "segmented"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "pill",
      motionLanguage: "expressive",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
    },
    fingerprint: {
      interactionModel: "radio-select-pill",
      visualModel: "elastic-bounding-capsule",
      motionModel: "viscoelastic-pill-travel",
      layoutModel: "horizontal-pill-group",
      semanticPurpose: "segmented-choice-selector",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ElasticRadioPillProps {
  options?: string[];
  className?: string;
}

export function ElasticRadioPill({
  options = ["Daily", "Weekly", "Monthly", "Yearly"],
  className,
}: ElasticRadioPillProps) {
  const [selected, setSelected] = useState(0);

  return (
    <div className={cn("inline-flex rounded-full border border-line bg-line/20 p-1", className)}>
      <div className="relative flex">
        {options.map((opt, idx) => (
          <button
            key={opt}
            type="button"
            onClick={() => setSelected(idx)}
            className={cn(
              "relative z-10 px-4 py-1.5 font-mono text-xs font-medium transition-colors duration-200",
              selected === idx ? "text-paper" : "text-ink/60 hover:text-ink"
            )}
          >
            {opt}
          </button>
        ))}

        <div
          className="absolute inset-y-0 rounded-full bg-ink transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          style={{
            width: \`\${100 / options.length}%\`,
            left: \`\${(selected * 100) / options.length}%\`,
          }}
        />
      </div>
    </div>
  );
}

export default ElasticRadioPill;
`,
    demo: `import { ElasticRadioPill } from "./elastic-radio-pill";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <ElasticRadioPill />
    </div>
  );
}
`,
  }),

  P("perspective-carousel", {
    category: "motion",
    subcategory: "transitions",
    title: "Perspective Carousel",
    description: "A 3D revolving cylindrical carousel rotating items across an elliptical perspective plane on click.",
    tags: ["carousel", "3d", "perspective", "cylinder", "revolving"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "luxury",
      macrostructure: "symmetric",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "kinetic",
      typographyStyle: "serif-display",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "stepped-carousel-rotation",
      visualModel: "cylindrical-ring-array",
      motionModel: "orbital-cylinder-spin",
      layoutModel: "perspective-3d-stage",
      semanticPurpose: "3d-product-carousel",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface PerspectiveCarouselProps {
  className?: string;
}

export function PerspectiveCarousel({ className }: PerspectiveCarouselProps) {
  const [angle, setAngle] = useState(0);
  const items = ["Alpha", "Beta", "Gamma", "Delta"];

  return (
    <div className={cn("relative h-80 w-full max-w-md overflow-hidden rounded-xl border border-line bg-paper p-6", className)}>
      <div className="flex h-full flex-col items-center justify-between">
        <span className="font-mono text-xs text-ink/50">3D CYLINDRICAL STAGE</span>

        <div className="relative h-40 w-40" style={{ perspective: 600 }}>
          {items.map((item, idx) => {
            const itemAngle = (idx * 360) / items.length + angle;
            const rad = (itemAngle * Math.PI) / 180;
            const z = Math.cos(rad) * 90;
            const x = Math.sin(rad) * 90;
            const opacity = (z + 90) / 180;

            return (
              <div
                key={item}
                className="absolute left-1/2 top-1/2 -ml-14 -mt-10 flex h-20 w-28 items-center justify-center rounded-xl border border-line bg-paper shadow-lg font-display text-sm font-bold text-ink transition-all duration-300"
                style={{
                  transform: \`translate3d(\${x}px, 0, \${z}px)\`,
                  opacity: Math.max(0.2, opacity),
                  zIndex: Math.round(z),
                }}
              >
                {item}
              </div>
            );
          })}
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setAngle((a) => a - 90)}
            className="rounded border border-line px-3 py-1 font-mono text-xs text-ink hover:bg-line/20"
          >
            ← Prev
          </button>
          <button
            type="button"
            onClick={() => setAngle((a) => a + 90)}
            className="rounded border border-line px-3 py-1 font-mono text-xs text-ink hover:bg-line/20"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

export default PerspectiveCarousel;
`,
    demo: `import { PerspectiveCarousel } from "./perspective-carousel";

export default function Demo() {
  return (
    <div className="flex min-h-[22rem] items-center justify-center bg-paper p-8">
      <PerspectiveCarousel />
    </div>
  );
}
`,
  }),

  P("floating-dock-magnifier", {
    category: "motion",
    subcategory: "gestures",
    title: "Floating Dock Magnifier",
    description: "A desktop navigation dock where individual icon targets scale smoothly using a Gaussian proximity curve as pointer glides across.",
    tags: ["dock", "magnifier", "gaussian", "proximity", "icons"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "kinetic",
      typographyStyle: "monospace",
      colorStrategy: "accent-only",
    },
    fingerprint: {
      interactionModel: "gaussian-proximity-scale",
      visualModel: "docked-horizontal-shelf",
      motionModel: "bell-curve-expansion",
      layoutModel: "bottom-anchored-dock",
      semanticPurpose: "app-launcher-dock",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface FloatingDockMagnifierProps {
  className?: string;
}

export function FloatingDockMagnifier({ className }: FloatingDockMagnifierProps) {
  const [mouseX, setMouseX] = useState<number | null>(null);
  const icons = ["⌘", "⌥", "⇧", "⌃", "⎋", "⏎"];

  return (
    <div
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMouseX(e.clientX - rect.left);
      }}
      onPointerLeave={() => setMouseX(null)}
      className={cn("inline-flex items-end gap-3 rounded-2xl border border-line bg-paper/80 p-3 shadow-xl backdrop-blur", className)}
    >
      {icons.map((icon, idx) => {
        const iconCenter = idx * 52 + 24;
        const dist = mouseX !== null ? Math.abs(mouseX - iconCenter) : 999;
        const scale = mouseX !== null ? Math.max(1, 1.8 - dist / 80) : 1;

        return (
          <div
            key={idx}
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-paper shadow-sm font-mono text-base font-bold text-ink transition-transform duration-75"
            style={{
              transform: \`scale(\${scale})\`,
              transformOrigin: "bottom center",
            }}
          >
            {icon}
          </div>
        );
      })}
    </div>
  );
}

export default FloatingDockMagnifier;
`,
    demo: `import { FloatingDockMagnifier } from "./floating-dock-magnifier";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <FloatingDockMagnifier />
    </div>
  );
}
`,
  }),

  P("elastic-drawer-curtain", {
    category: "motion",
    subcategory: "gestures",
    title: "Elastic Drawer Curtain",
    description: "A lateral drawer with an elastic pull string that deforms under user drag before parting cleanly from the screen edge.",
    tags: ["drawer", "curtain", "pull", "elastic", "gesture"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "editorial",
      macrostructure: "split",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "mechanical",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "lateral-draw-pull",
      visualModel: "taut-string-boundary",
      motionModel: "elastic-tension-release",
      layoutModel: "side-anchored-drawer",
      semanticPurpose: "lateral-navigation-panel",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ElasticDrawerCurtainProps {
  className?: string;
}

export function ElasticDrawerCurtain({ className }: ElasticDrawerCurtainProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative h-72 w-full max-w-md overflow-hidden rounded-xl border border-line bg-paper", className)}>
      <div className="flex h-full items-center justify-center">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded border border-line bg-ink px-4 py-2 font-mono text-xs text-paper"
        >
          Pull Drawer
        </button>
      </div>

      <div
        className={cn(
          "absolute inset-y-0 left-0 w-64 border-r border-line bg-paper p-6 shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between pb-4 border-b border-line">
          <span className="font-display font-bold text-ink">Navigation</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="font-mono text-xs text-ink/60 hover:text-ink"
          >
            Close
          </button>
        </div>
        <ul className="mt-4 space-y-2 font-mono text-xs text-ink/70">
          <li className="hover:text-ink cursor-pointer">/ Overview</li>
          <li className="hover:text-ink cursor-pointer">/ Design Tokens</li>
          <li className="hover:text-ink cursor-pointer">/ API Reference</li>
        </ul>
      </div>
    </div>
  );
}

export default ElasticDrawerCurtain;
`,
    demo: `import { ElasticDrawerCurtain } from "./elastic-drawer-curtain";

export default function Demo() {
  return (
    <div className="flex min-h-[20rem] items-center justify-center bg-paper p-8">
      <ElasticDrawerCurtain />
    </div>
  );
}
`,
  }),

  P("cursor-particle-fountain", {
    category: "motion",
    subcategory: "cursor",
    title: "Cursor Particle Fountain",
    description: "A decorative canvas fountain erupting gravity-bound sparkles as pointer travels rapidly across the surface.",
    tags: ["cursor", "fountain", "particles", "gravity", "canvas"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "playful",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "kinetic",
      typographyStyle: "monospace",
      colorStrategy: "neon-on-dark",
    },
    fingerprint: {
      interactionModel: "pointer-motion-emission",
      visualModel: "gravity-spark-fountain",
      motionModel: "ballistic-projectile-arc",
      layoutModel: "interactive-canvas-surface",
      semanticPurpose: "celebratory-spark-fountain",
    },
    source: `"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface CursorParticleFountainProps {
  className?: string;
}

export function CursorParticleFountain({ className }: CursorParticleFountainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<{ x: number; y: number; vx: number; vy: number; life: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const width = (canvas.width = canvas.offsetWidth);
    const height = (canvas.height = canvas.offsetHeight);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particlesRef.current = particlesRef.current.filter((p) => {
        p.vy += 0.25;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;

        if (p.life <= 0) return false;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5 * p.life, 0, Math.PI * 2);
        ctx.fillStyle = \`rgba(0, 0, 0, \${p.life})\`;
        ctx.fill();
        return true;
      });

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (let i = 0; i < 3; i++) {
      particlesRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 4,
        vy: -Math.random() * 5 - 2,
        life: 1,
      });
    }
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className={cn("relative h-72 w-full max-w-md overflow-hidden rounded-xl border border-line bg-paper p-6", className)}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none flex h-full flex-col items-center justify-center text-center">
        <span className="font-mono text-xs text-ink/50">MOVE POINTER TO ERUPT</span>
        <h4 className="font-display text-base font-bold text-ink">Ballistic Spark Fountain</h4>
      </div>
    </div>
  );
}

export default CursorParticleFountain;
`,
    demo: `import { CursorParticleFountain } from "./cursor-particle-fountain";

export default function Demo() {
  return (
    <div className="flex min-h-[20rem] items-center justify-center bg-paper p-8">
      <CursorParticleFountain />
    </div>
  );
}
`,
  }),

  P("magnetic-anchor-tooltip", {
    category: "motion",
    subcategory: "feedback",
    title: "Magnetic Anchor Tooltip",
    description: "A contextual tooltip balloon anchored via invisible elastic tether that leans smoothly toward pointer cursor.",
    tags: ["tooltip", "magnetic", "anchor", "spring", "tether"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "tethered-hover-lean",
      visualModel: "elastic-speech-bubble",
      motionModel: "spring-tether-displacement",
      layoutModel: "anchored-tooltip-float",
      semanticPurpose: "contextual-help-balloon",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface MagneticAnchorTooltipProps {
  className?: string;
}

export function MagneticAnchorTooltip({ className }: MagneticAnchorTooltipProps) {
  const [lean, setLean] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.2;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.2;
    setLean({ x, y });
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setLean({ x: 0, y: 0 })}
      className={cn("flex h-64 w-full max-w-sm flex-col items-center justify-center rounded-xl border border-line bg-paper p-6", className)}
    >
      <div
        className="mb-4 rounded-lg bg-ink px-3 py-1.5 font-mono text-xs text-paper shadow-md transition-transform duration-100 ease-out"
        style={{ transform: \`translate(\${lean.x}px, \${lean.y}px)\` }}
      >
        Tethered Tooltip
      </div>
      <button
        type="button"
        className="rounded-full border border-line bg-paper px-4 py-2 font-mono text-xs text-ink shadow-sm"
      >
        Target Anchor
      </button>
    </div>
  );
}

export default MagneticAnchorTooltip;
`,
    demo: `import { MagneticAnchorTooltip } from "./magnetic-anchor-tooltip";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <MagneticAnchorTooltip />
    </div>
  );
}
`,
  }),

  P("rebound-checkbox", {
    category: "motion",
    subcategory: "controls",
    title: "Rebound Checkbox",
    description: "A mechanical checkbox whose border compresses elastically before springing an animated SVG checkmark into lock.",
    tags: ["checkbox", "controls", "rebound", "spring", "svg"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "sharp",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "click-toggle-rebound",
      visualModel: "square-bordered-latch",
      motionModel: "svg-stroke-dash-spring",
      layoutModel: "inline-checkbox-label",
      semanticPurpose: "boolean-verification-latch",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ReboundCheckboxProps {
  label?: string;
  className?: string;
}

export function ReboundCheckbox({ label = "Require cryptographic signature", className }: ReboundCheckboxProps) {
  const [checked, setChecked] = useState(false);

  return (
    <label className={cn("inline-flex items-center gap-3 cursor-pointer select-none", className)}>
      <div
        onClick={() => setChecked((c) => !c)}
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded border transition-all duration-200",
          checked ? "border-ink bg-ink scale-95" : "border-line bg-paper hover:border-ink"
        )}
      >
        {checked && (
          <svg className="h-4 w-4 text-paper" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span className="font-mono text-xs text-ink">{label}</span>
    </label>
  );
}

export default ReboundCheckbox;
`,
    demo: `import { ReboundCheckbox } from "./rebound-checkbox";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <ReboundCheckbox />
    </div>
  );
}
`,
  }),

  P("dynamic-island-morph", {
    category: "motion",
    subcategory: "notifications",
    title: "Dynamic Island Morph",
    description: "A compact floating pill header that morphs smoothly into a wide notification panel upon incoming state event.",
    tags: ["island", "morph", "notification", "pill", "banner"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "pill",
      motionLanguage: "expressive",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "expandable-island-capsule",
      visualModel: "black-pill-aperture",
      motionModel: "interpolated-aspect-expansion",
      layoutModel: "top-pinned-capsule",
      semanticPurpose: "dynamic-status-capsule",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface DynamicIslandMorphProps {
  className?: string;
}

export function DynamicIslandMorph({ className }: DynamicIslandMorphProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={cn("relative h-64 w-full max-w-md overflow-hidden rounded-2xl border border-line bg-paper p-6", className)}>
      <div className="flex justify-center">
        <div
          onClick={() => setExpanded((e) => !e)}
          className={cn(
            "cursor-pointer overflow-hidden rounded-full bg-ink text-paper transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-xl",
            expanded ? "h-16 w-80 rounded-2xl px-5 py-3" : "h-9 w-32 px-3 py-1.5"
          )}
        >
          {expanded ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold">Incoming Call</p>
                <p className="font-mono text-[10px] opacity-70">Sarah Lin (Engineering)</p>
              </div>
              <div className="flex gap-2">
                <span className="h-6 w-6 rounded-full bg-red-500 flex items-center justify-center text-[10px]">✕</span>
                <span className="h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center text-[10px]">✓</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between text-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[10px]">Connected</span>
            </div>
          )}
        </div>
      </div>
      <p className="mt-8 text-center font-mono text-xs text-ink/50">Click pill to toggle island state</p>
    </div>
  );
}

export default DynamicIslandMorph;
`,
    demo: `import { DynamicIslandMorph } from "./dynamic-island-morph";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <DynamicIslandMorph />
    </div>
  );
}
`,
  }),
];

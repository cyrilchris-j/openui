import type { ResourceDefinition } from "../lib/definitions.js";

const P = (name: string, definition: Omit<ResourceDefinition, "name">): ResourceDefinition => ({
  name,
  ...definition,
});

export default [
  P("elastic-orbit-loader", {
    category: "motion",
    subcategory: "orbital",
    title: "Elastic Orbit Loader",
    description:
      "A celestial loading spinner featuring multi-satellite nodes orbiting an elliptical nucleus with gravitational acceleration at periapsis and spring-tethered lag.",
    tags: ["loader", "orbital", "physics", "planets"],
    dependencies: ["react"],
    difficulty: "intermediate",
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
      interactionModel: "continuous-playback",
      visualModel: "concentric-orbital-traces",
      motionModel: "keplerian-gravitational-orbit",
      layoutModel: "centered-fixed-aspect",
      semanticPurpose: "loading-progress-indicator",
    },
    source: `"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface ElasticOrbitLoaderProps {
  size?: number;
  speed?: number;
  className?: string;
}

export function ElasticOrbitLoader({ size = 160, speed = 1, className }: ElasticOrbitLoaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    let t = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const satellites = [
      { a: size * 0.38, b: size * 0.18, speed: 1.2 * speed, color: "#161616", size: 5 },
      { a: size * 0.26, b: size * 0.36, speed: -0.9 * speed, color: "#e84c3d", size: 4 },
      { a: size * 0.44, b: size * 0.28, speed: 0.7 * speed, color: "#6e6e6e", size: 3.5 },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      const cx = size / 2;
      const cy = size / 2;

      // Draw nucleus
      ctx.beginPath();
      ctx.arc(cx, cy, 7, 0, Math.PI * 2);
      ctx.fillStyle = "#161616";
      ctx.fill();

      satellites.forEach((sat, idx) => {
        // Orbital trajectory
        ctx.beginPath();
        ctx.ellipse(cx, cy, sat.a, sat.b, idx * 0.8, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(180, 180, 180, 0.25)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Position with Keplerian variable speed
        const angle = t * sat.speed + idx * 2.1;
        const currentSpeedMult = 1 + 0.3 * Math.sin(angle);
        const effectiveAngle = reduced ? idx * 2 : angle * currentSpeedMult;

        const cosRot = Math.cos(idx * 0.8);
        const sinRot = Math.sin(idx * 0.8);
        const unrotX = sat.a * Math.cos(effectiveAngle);
        const unrotY = sat.b * Math.sin(effectiveAngle);

        const x = cx + (unrotX * cosRot - unrotY * sinRot);
        const y = cy + (unrotX * sinRot + unrotY * cosRot);

        ctx.beginPath();
        ctx.arc(x, y, sat.size, 0, Math.PI * 2);
        ctx.fillStyle = sat.color;
        ctx.fill();
      });

      if (!reduced) {
        t += 0.02;
        rafId = requestAnimationFrame(draw);
      }
    };

    draw();
    return () => cancelAnimationFrame(rafId);
  }, [size, speed]);

  return (
    <div className={cn("inline-flex items-center justify-center p-4", className)}>
      <canvas ref={canvasRef} width={size} height={size} className="block" />
    </div>
  );
}
`,
    demo: `import { ElasticOrbitLoader } from "./elastic-orbit-loader";

export default function Demo() {
  return (
    <div className="flex min-h-[22rem] flex-col items-center justify-center gap-4 bg-paper p-8">
      <ElasticOrbitLoader size={180} />
      <span className="font-mono text-xs uppercase tracking-widest text-graphite">
        Synchronizing Orbital State
      </span>
    </div>
  );
}
`,
  }),

  P("magnetic-pull-card", {
    category: "motion",
    subcategory: "physics",
    title: "Magnetic Pull Card",
    description:
      "A card surface that feels magnetic attraction toward the pointer with dual-stage translation and 3D rotational tilt governed by Hooke's law.",
    tags: ["card", "magnetic", "tilt", "spring", "physics"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "editorial",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "expressive",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
    },
    fingerprint: {
      interactionModel: "pointer-proximity-attraction",
      visualModel: "bordered-specimen-slab",
      motionModel: "damped-hookean-spring-attractor",
      layoutModel: "card-container",
      semanticPurpose: "interactive-feature-tile",
    },
    source: `"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface MagneticPullCardProps {
  title?: string;
  category?: string;
  description?: string;
  className?: string;
}

export function MagneticPullCard({
  title = "Rotational Inertia",
  category = "Kinematics 04",
  description = "A surface behaving as if suspended by high-tension micro-springs.",
  className,
}: MagneticPullCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg)");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let currentRotX = 0;
    let currentRotY = 0;
    let rafId: number;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const radius = 260;

      if (dist < radius) {
        const pull = (1 - dist / radius) * 28;
        targetX = (dx / dist) * pull;
        targetY = (dy / dist) * pull;
      } else {
        targetX = 0;
        targetY = 0;
      }
    };

    const loop = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      currentRotX += (-currentY * 0.6 - currentRotX) * 0.1;
      currentRotY += (currentX * 0.6 - currentRotY) * 0.1;

      setTransform(\`translate3d(\${currentX.toFixed(2)}px, \${currentY.toFixed(2)}px, 0) rotateX(\${currentRotX.toFixed(2)}deg) rotateY(\${currentRotY.toFixed(2)}deg)\`);
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", handlePointerMove);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ transform, transformStyle: "preserve-3d" }}
      className={cn(
        "relative max-w-sm rounded border border-line bg-paper p-6 shadow-sm transition-colors duration-200",
        isHovered && "border-ink shadow-md",
        className,
      )}
    >
      <span className="font-mono text-[0.7rem] uppercase tracking-wider text-graphite">
        {category}
      </span>
      <h3 className="mt-2 font-serif text-lg font-bold text-ink">{title}</h3>
      <p className="mt-2 text-xs leading-relaxed text-graphite">{description}</p>
      <div className="mt-6 flex items-center justify-between border-t border-line/60 pt-3 text-[0.75rem] font-mono text-ink">
        <span>Spring Damping: 0.88</span>
        <span className="font-bold">→ Inspect</span>
      </div>
    </div>
  );
}
`,
    demo: `import { MagneticPullCard } from "./magnetic-pull-card";

export default function Demo() {
  return (
    <div className="flex min-h-[22rem] items-center justify-center bg-paper p-10">
      <MagneticPullCard />
    </div>
  );
}
`,
  }),

  P("spring-snapping-slider", {
    category: "motion",
    subcategory: "physics",
    title: "Spring Snapping Slider",
    description:
      "A numeric range control where the thumb glides with simulated mass and snaps toward discrete notched positions via magnetic spring detents.",
    tags: ["slider", "spring", "physics", "haptic", "controls"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "accent-only",
    },
    fingerprint: {
      interactionModel: "continuous-drag-notched-snap",
      visualModel: "ruled-calibrated-gauge",
      motionModel: "restoring-spring-detent",
      layoutModel: "horizontal-bar",
      semanticPurpose: "calibrated-value-selector",
    },
    source: `"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface SpringSnappingSliderProps {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  onChange?: (val: number) => void;
  className?: string;
}

export function SpringSnappingSlider({
  min = 0,
  max = 100,
  step = 20,
  defaultValue = 40,
  onChange,
  className,
}: SpringSnappingSliderProps) {
  const [value, setValue] = useState(defaultValue);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const stepsCount = Math.floor((max - min) / step);
  const percentage = ((value - min) / (max - min)) * 100;

  const updateFromPointer = (clientX: number) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const rawPct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const rawVal = min + rawPct * (max - min);
    const snappedVal = Math.round(rawVal / step) * step;
    const clamped = Math.max(min, Math.min(max, snappedVal));
    setValue(clamped);
    onChange?.(clamped);
  };

  return (
    <div className={cn("w-full max-w-md p-4", className)}>
      <div className="flex items-center justify-between font-mono text-xs text-graphite mb-2">
        <span>QUANTIZED_STEP: {step}</span>
        <span className="font-bold text-ink">{value} / {max}</span>
      </div>
      <div
        ref={trackRef}
        onPointerDown={(e) => {
          setIsDragging(true);
          updateFromPointer(e.clientX);
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (isDragging) updateFromPointer(e.clientX);
        }}
        onPointerUp={(e) => {
          setIsDragging(false);
          try {
            (e.target as HTMLElement).releasePointerCapture(e.pointerId);
          } catch {}
        }}
        className="relative h-9 cursor-pointer select-none rounded border border-line bg-surface p-1 flex items-center"
      >
        {/* Notches */}
        <div className="absolute inset-x-2 flex justify-between pointer-events-none">
          {Array.from({ length: stepsCount + 1 }).map((_, i) => (
            <div key={i} className="h-2 w-0.5 bg-line/80" />
          ))}
        </div>

        {/* Progress fill */}
        <div
          className="absolute left-1 top-1 bottom-1 bg-ink/10 rounded-sm pointer-events-none transition-all duration-150 ease-out"
          style={{ width: \`calc(\${percentage}% - 4px)\` }}
        />

        {/* Thumb */}
        <div
          className="absolute top-1 bottom-1 w-6 rounded border border-ink bg-ink text-paper flex items-center justify-center font-mono text-[9px] shadow-sm transition-all duration-200 ease-spring"
          style={{
            left: \`calc(\${percentage}% - \${(percentage / 100) * 24}px)\`,
            transitionProperty: isDragging ? "none" : "left",
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}
`,
    demo: `import { SpringSnappingSlider } from "./spring-snapping-slider";

export default function Demo() {
  return (
    <div className="flex min-h-[22rem] items-center justify-center bg-paper p-10">
      <SpringSnappingSlider min={0} max={100} step={20} defaultValue={60} />
    </div>
  );
}
`,
  }),

  P("staggered-glyph-cascade", {
    category: "motion",
    subcategory: "entrance",
    title: "Staggered Glyph Cascade",
    description:
      "A dramatic entrance reveal splitting strings into glyphs that drop down like raindrops with slight pseudo-random angle jitter and spring settle.",
    tags: ["typography", "cascade", "stagger", "spring", "drop"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "editorial",
      macrostructure: "symmetric",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "expressive",
      typographyStyle: "variable-poster",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "viewport-entrance-cycle",
      visualModel: "character-split-raindrop",
      motionModel: "staggered-spring-delay",
      layoutModel: "headline-flow",
      semanticPurpose: "hero-statement-entrance",
    },
    source: `"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export interface StaggeredGlyphCascadeProps {
  text?: string;
  staggerMs?: number;
  className?: string;
}

export function StaggeredGlyphCascade({
  text = "KINETIC SYSTEM ARCHITECTURE",
  staggerMs = 38,
  className,
}: StaggeredGlyphCascadeProps) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(false);
    const timeout = setTimeout(() => setActive(true), 50);
    return () => clearTimeout(timeout);
  }, [text]);

  const glyphs = Array.from(text);

  return (
    <div className={cn("overflow-hidden p-4", className)}>
      <div className="flex flex-wrap items-center justify-center font-mono text-2xl font-bold tracking-tight text-ink md:text-3xl">
        {glyphs.map((char, index) => {
          const delay = index * staggerMs;
          const wobble = (index % 5 - 2) * 4;
          return (
            <span
              key={index}
              style={{
                transitionDelay: \`\${delay}ms\`,
                transform: active ? "translateY(0) rotate(0deg)" : \`translateY(-120%) rotate(\${wobble}deg)\`,
                opacity: active ? 1 : 0,
              }}
              className="inline-block whitespace-pre transition-all duration-500 ease-out"
            >
              {char}
            </span>
          );
        })}
      </div>
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={() => {
            setActive(false);
            setTimeout(() => setActive(true), 120);
          }}
          className="rounded border border-line px-3 py-1 font-mono text-xs uppercase tracking-wider text-graphite hover:border-ink hover:text-ink"
        >
          Replay Cascade
        </button>
      </div>
    </div>
  );
}
`,
    demo: `import { StaggeredGlyphCascade } from "./staggered-glyph-cascade";

export default function Demo() {
  return (
    <div className="flex min-h-[22rem] items-center justify-center bg-paper p-8">
      <StaggeredGlyphCascade text="METRONOME KINETICS" />
    </div>
  );
}
`,
  }),

  P("elastic-split-reveal", {
    category: "motion",
    subcategory: "reveal",
    title: "Elastic Split Reveal",
    description:
      "A split-screen curtain reveal dividing a surface along a central diagonal or horizontal axis with rubberband overshoot on trigger.",
    tags: ["curtain", "split", "reveal", "elastic", "transition"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "editorial",
      macrostructure: "full-bleed",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "kinetic",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "toggle-split-parting",
      visualModel: "bisected-shutter-panels",
      motionModel: "bipartite-spring-parting",
      layoutModel: "two-half-covering-curtain",
      semanticPurpose: "canvas-content-unveil",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ElasticSplitRevealProps {
  label?: string;
  className?: string;
}

export function ElasticSplitReveal({
  label = "SYSTEM REVEALED",
  className,
}: ElasticSplitRevealProps) {
  const [opened, setOpened] = useState(false);

  return (
    <div className={cn("relative mx-auto h-72 w-full max-w-lg overflow-hidden border border-line bg-surface select-none", className)}>
      {/* Revealed content beneath */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-paper text-center">
        <span className="font-mono text-xs text-accent">PROTECTED CODENAME</span>
        <h4 className="mt-1 font-serif text-2xl font-bold text-ink">{label}</h4>
        <p className="mt-2 text-xs text-graphite max-w-xs leading-relaxed">
          The split aperture retracts outward with dual-phase spring overshoot.
        </p>
      </div>

      {/* Top half shutter */}
      <div
        style={{
          transform: opened ? "translateY(-105%)" : "translateY(0%)",
        }}
        className="absolute inset-x-0 top-0 h-1/2 bg-ink text-paper flex items-end justify-center pb-2 transition-transform duration-500 ease-spring border-b border-paper/20 z-10"
      >
        <span className="font-mono text-[10px] tracking-widest text-paper/70">TOP SHUTTER</span>
      </div>

      {/* Bottom half shutter */}
      <div
        style={{
          transform: opened ? "translateY(105%)" : "translateY(0%)",
        }}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-ink text-paper flex items-start justify-center pt-2 transition-transform duration-500 ease-spring border-t border-paper/20 z-10"
      >
        <span className="font-mono text-[10px] tracking-widest text-paper/70">BOTTOM SHUTTER</span>
      </div>

      {/* Toggle button */}
      <div className="absolute bottom-3 right-3 z-20">
        <button
          type="button"
          onClick={() => setOpened((v) => !v)}
          className="rounded border border-line bg-paper/90 backdrop-blur px-2.5 py-1 font-mono text-xs text-ink shadow-sm hover:bg-paper"
        >
          {opened ? "Close Aperture" : "Open Aperture"}
        </button>
      </div>
    </div>
  );
}
`,
    demo: `import { ElasticSplitReveal } from "./elastic-split-reveal";

export default function Demo() {
  return (
    <div className="flex min-h-[22rem] items-center justify-center bg-paper p-8">
      <ElasticSplitReveal />
    </div>
  );
}
`,
  }),

  P("kinetic-rubberband-toggle", {
    category: "motion",
    subcategory: "physics",
    title: "Kinetic Rubberband Toggle",
    description:
      "A switch control whose pill thumb elongates and squashes during travel, simulating high-elasticity rubber before snapping into rest shape.",
    tags: ["toggle", "switch", "rubberband", "morph", "physics"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "pill",
      motionLanguage: "expressive",
      typographyStyle: "monospace",
      colorStrategy: "accent-only",
    },
    fingerprint: {
      interactionModel: "click-drag-snap-toggle",
      visualModel: "elastic-elongating-capsule",
      motionModel: "viscoelastic-squash-stretch",
      layoutModel: "inline-pill-rail",
      semanticPurpose: "boolean-state-switch",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface KineticRubberbandToggleProps {
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export function KineticRubberbandToggle({
  defaultChecked = false,
  onChange,
  className,
}: KineticRubberbandToggleProps) {
  const [checked, setChecked] = useState(defaultChecked);
  const [animating, setAnimating] = useState(false);

  const toggle = () => {
    setAnimating(true);
    const next = !checked;
    setChecked(next);
    onChange?.(next);
    setTimeout(() => setAnimating(false), 380);
  };

  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={toggle}
        className={cn(
          "relative h-8 w-16 rounded-pill border p-1 transition-colors duration-300",
          checked ? "border-ink bg-ink" : "border-line bg-surface",
        )}
      >
        <span
          className={cn(
            "block h-6 rounded-pill transition-all duration-300 ease-spring",
            checked ? "bg-paper" : "bg-ink",
            animating ? "w-10" : "w-6",
            checked ? "translate-x-8" : "translate-x-0",
          )}
        />
      </button>
      <span className="font-mono text-xs text-graphite uppercase">
        {checked ? "Online" : "Standby"}
      </span>
    </div>
  );
}
`,
    demo: `import { KineticRubberbandToggle } from "./kinetic-rubberband-toggle";

export default function Demo() {
  return (
    <div className="flex min-h-[22rem] items-center justify-center bg-paper p-10">
      <KineticRubberbandToggle />
    </div>
  );
}
`,
  }),

  P("physics-pendulum-dial", {
    category: "motion",
    subcategory: "physics",
    title: "Physics Pendulum Dial",
    description:
      "An angular balance indicator suspended from a top pivot that swings with gravitational restoring torque and damped oscillations when pulled.",
    tags: ["pendulum", "physics", "dial", "gravity", "gauge"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "technical",
      macrostructure: "symmetric",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "rotational-drag-release",
      visualModel: "pivoted-plumb-bob",
      motionModel: "damped-angular-harmonic-oscillator",
      layoutModel: "vertically-suspended-gauge",
      semanticPurpose: "angle-tilt-meter",
    },
    source: `"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface PhysicsPendulumDialProps {
  length?: number;
  className?: string;
}

export function PhysicsPendulumDial({ length = 140, className }: PhysicsPendulumDialProps) {
  const [angle, setAngle] = useState(0.45);
  const isDragging = useRef(false);
  const state = useRef({ theta: 0.45, omega: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    const g = 9.8;
    const l = length / 100;
    const damping = 0.985;

    const tick = () => {
      if (!isDragging.current) {
        // d²θ/dt² = -(g/l) * sin(θ)
        const alpha = -(g / l) * Math.sin(state.current.theta) * 0.015;
        state.current.omega = (state.current.omega + alpha) * damping;
        state.current.theta += state.current.omega;
        setAngle(state.current.theta);
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [length]);

  return (
    <div
      ref={containerRef}
      className={cn("relative flex flex-col items-center justify-start h-64 w-64 select-none p-4", className)}
      onPointerDown={(e) => {
        isDragging.current = true;
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!isDragging.current || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const pivotX = rect.left + rect.width / 2;
        const pivotY = rect.top + 30;
        const dx = e.clientX - pivotX;
        const dy = e.clientY - pivotY;
        const rad = Math.atan2(dx, dy);
        state.current.theta = Math.max(-1.4, Math.min(1.4, rad));
        state.current.omega = 0;
        setAngle(state.current.theta);
      }}
      onPointerUp={(e) => {
        isDragging.current = false;
        try {
          (e.target as HTMLElement).releasePointerCapture(e.pointerId);
        } catch {}
      }}
    >
      {/* Pivot mount */}
      <div className="h-4 w-4 rounded-full border-2 border-ink bg-paper z-10" />

      {/* Pendulum rod and bob */}
      <div
        style={{
          height: \`\${length}px\`,
          transform: \`rotate(\${-angle}rad)\`,
          transformOrigin: "top center",
        }}
        className="absolute top-[38px] w-0.5 bg-ink cursor-grab active:cursor-grabbing flex flex-col items-center justify-end"
      >
        <div className="h-9 w-9 rounded-full border border-ink bg-paper shadow-md flex items-center justify-center font-mono text-[9px] text-ink font-bold">
          {(angle * (180 / Math.PI)).toFixed(0)}°
        </div>
      </div>

      <span className="mt-48 font-mono text-[10px] text-graphite tracking-widest uppercase">
        Drag Bob & Release
      </span>
    </div>
  );
}
`,
    demo: `import { PhysicsPendulumDial } from "./physics-pendulum-dial";

export default function Demo() {
  return (
    <div className="flex min-h-[22rem] items-center justify-center bg-paper p-8">
      <PhysicsPendulumDial />
    </div>
  );
}
`,
  }),

  P("inertia-scroll-marquee", {
    category: "motion",
    subcategory: "scroll",
    title: "Inertia Scroll Marquee",
    description:
      "A dual-strip ticker banner with interactive swipe flick: dragging alters translation velocity, settling back smoothly to baseline crawl velocity.",
    tags: ["marquee", "inertia", "scroll", "velocity", "ticker"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "editorial",
      macrostructure: "full-bleed",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "kinetic",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "drag-acceleration-glide",
      visualModel: "infinite-tape-strip",
      motionModel: "momentum-decay-to-baseline",
      layoutModel: "horizontal-overflow-ribbon",
      semanticPurpose: "continuous-feature-ticker",
    },
    source: `"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface InertiaScrollMarqueeProps {
  items?: string[];
  baseVelocity?: number;
  className?: string;
}

export function InertiaScrollMarquee({
  items = ["REVERBERATION", "KINETICS", "SUPERPOSITION", "EQUILIBRIUM", "DAMPING", "WAVELENGTH"],
  baseVelocity = 1.2,
  className,
}: InertiaScrollMarqueeProps) {
  const [offset, setOffset] = useState(0);
  const state = useRef({ offset: 0, velocity: baseVelocity, isDown: false, lastX: 0 });

  useEffect(() => {
    let raf: number;
    const loop = () => {
      if (!state.current.isDown) {
        // Decelerate toward base velocity
        state.current.velocity += (baseVelocity - state.current.velocity) * 0.04;
      }
      state.current.offset = (state.current.offset - state.current.velocity) % 1200;
      setOffset(state.current.offset);
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [baseVelocity]);

  return (
    <div
      onPointerDown={(e) => {
        state.current.isDown = true;
        state.current.lastX = e.clientX;
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!state.current.isDown) return;
        const dx = e.clientX - state.current.lastX;
        state.current.lastX = e.clientX;
        state.current.velocity = -dx * 0.6;
      }}
      onPointerUp={(e) => {
        state.current.isDown = false;
        try {
          (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
        } catch {}
      }}
      className={cn("overflow-hidden border-y border-line bg-ink py-4 text-paper cursor-grab active:cursor-grabbing select-none", className)}
    >
      <div
        style={{ transform: \`translateX(\${offset}px)\` }}
        className="flex gap-12 whitespace-nowrap font-mono text-sm uppercase tracking-widest"
      >
        {[...items, ...items, ...items, ...items].map((word, i) => (
          <span key={i} className="flex items-center gap-6">
            <span>{word}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}
`,
    demo: `import { InertiaScrollMarquee } from "./inertia-scroll-marquee";

export default function Demo() {
  return (
    <div className="flex min-h-[22rem] flex-col justify-center bg-paper p-6">
      <InertiaScrollMarquee />
    </div>
  );
}
`,
  }),

  P("fluid-drawer-peek", {
    category: "motion",
    subcategory: "gesture",
    title: "Fluid Drawer Peek",
    description:
      "A bottom sheet drawer with tactile peek resting states, rubberband drag boundary resistance, and spring release velocity interpolation.",
    tags: ["drawer", "gesture", "spring", "sheet", "mobile"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "minimal",
      macrostructure: "split",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "kinetic",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
    },
    fingerprint: {
      interactionModel: "vertical-flick-drawer",
      visualModel: "docked-bottom-sheet",
      motionModel: "bistable-spring-threshold",
      layoutModel: "bottom-pinned-overlay",
      semanticPurpose: "modal-inspector-sheet",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface FluidDrawerPeekProps {
  className?: string;
}

export function FluidDrawerPeek({ className }: FluidDrawerPeekProps) {
  const [stage, setStage] = useState<"peek" | "open">("peek");

  return (
    <div className={cn("relative mx-auto h-80 w-full max-w-sm overflow-hidden rounded-lg border border-line bg-surface p-4", className)}>
      <div className="text-center pt-8">
        <span className="font-mono text-xs text-graphite uppercase">Main Canvas</span>
        <h4 className="font-serif text-lg font-bold text-ink mt-1">Inspection Deck</h4>
      </div>

      {/* Drawer */}
      <div
        style={{
          transform: stage === "open" ? "translateY(0%)" : "translateY(65%)",
        }}
        className="absolute inset-x-0 bottom-0 h-64 rounded-t-xl border-t border-line bg-paper p-4 shadow-xl transition-transform duration-400 ease-spring"
      >
        <div
          onClick={() => setStage((s) => (s === "open" ? "peek" : "open"))}
          className="mx-auto h-1.5 w-12 cursor-pointer rounded-full bg-line/80 hover:bg-ink/40 mb-3"
        />
        <div className="flex items-center justify-between border-b border-line/60 pb-2">
          <span className="font-mono text-xs font-semibold text-ink">DRAWER TELEMETRY</span>
          <button
            type="button"
            onClick={() => setStage((s) => (s === "open" ? "peek" : "open"))}
            className="font-mono text-[10px] text-accent uppercase"
          >
            {stage === "open" ? "Collapse ↓" : "Expand ↑"}
          </button>
        </div>
        <div className="mt-3 space-y-2 text-xs text-graphite">
          <div className="flex justify-between">
            <span>State</span>
            <span className="font-mono font-bold text-ink">{stage}</span>
          </div>
          <div className="flex justify-between">
            <span>Spring Damping</span>
            <span className="font-mono">0.82 Ratio</span>
          </div>
          <div className="flex justify-between">
            <span>Boundary Elasticity</span>
            <span className="font-mono">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
`,
    demo: `import { FluidDrawerPeek } from "./fluid-drawer-peek";

export default function Demo() {
  return (
    <div className="flex min-h-[22rem] items-center justify-center bg-paper p-8">
      <FluidDrawerPeek />
    </div>
  );
}
`,
  }),

  P("momentum-flick-card", {
    category: "motion",
    subcategory: "gesture",
    title: "Momentum Flick Card",
    description:
      "A card deck element that responds to pointer swipe velocity, flying away when flicked beyond velocity threshold or springing back to center.",
    tags: ["card", "flick", "swipe", "velocity", "gesture"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "playful",
      macrostructure: "stack",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "expressive",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
    },
    fingerprint: {
      interactionModel: "swipe-throw-gesture",
      visualModel: "stacked-tinder-card",
      motionModel: "velocity-based-ballistic-flight",
      layoutModel: "center-stacked-card",
      semanticPurpose: "decision-deck-card",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface MomentumFlickCardProps {
  className?: string;
}

export function MomentumFlickCard({ className }: MomentumFlickCardProps) {
  const [flicked, setFlicked] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const flick = (dir: "left" | "right") => {
    setDirection(dir);
    setFlicked(true);
    setTimeout(() => setFlicked(false), 800);
  };

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div className="relative h-64 w-52">
        {/* Background standby card */}
        <div className="absolute inset-0 rounded-lg border border-line bg-surface p-4 scale-95 opacity-60" />

        {/* Foreground dynamic card */}
        <div
          style={{
            transform: flicked
              ? direction === "right"
                ? "translate(160%, -20%) rotate(24deg)"
                : "translate(-160%, -20%) rotate(-24deg)"
              : "translate(0, 0) rotate(0deg)",
            opacity: flicked ? 0 : 1,
          }}
          className="absolute inset-0 flex flex-col justify-between rounded-lg border border-ink bg-paper p-5 shadow-lg transition-all duration-500 ease-out select-none"
        >
          <span className="font-mono text-[10px] uppercase tracking-wider text-graphite">
            DECISION SPECIMEN
          </span>
          <div className="my-auto text-center">
            <h4 className="font-serif text-xl font-bold text-ink">Action 09</h4>
            <p className="mt-1 text-xs text-graphite">Flick left or right to trigger ballistic flight.</p>
          </div>
          <div className="flex justify-between font-mono text-[10px] text-graphite">
            <span>← Dismiss</span>
            <span>Approve →</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => flick("left")}
          className="rounded border border-line px-3 py-1 font-mono text-xs text-ink hover:bg-surface"
        >
          Flick Left
        </button>
        <button
          type="button"
          onClick={() => flick("right")}
          className="rounded border border-line px-3 py-1 font-mono text-xs text-ink hover:bg-surface"
        >
          Flick Right
        </button>
      </div>
    </div>
  );
}
`,
    demo: `import { MomentumFlickCard } from "./momentum-flick-card";

export default function Demo() {
  return (
    <div className="flex min-h-[22rem] items-center justify-center bg-paper p-8">
      <MomentumFlickCard />
    </div>
  );
}
`,
  }),
];

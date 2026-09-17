import type { ResourceDefinition } from "../lib/definitions.js";

/**
 * Motion batch 1 — eleven motion systems, each a distinct animation
 * mechanism: gravity settle, scroll-linked compression, orbital revolutions,
 * magnetic docking, damped tilt, inertial drag, fluid morph, stagger
 * cascades, perspective planes, pointer trails and idle float.
 */

const P = (name: string, definition: Omit<ResourceDefinition, "name">): ResourceDefinition => ({
  name,
  ...definition,
});

export default [
  P("spring-drop-in", {
    category: "motion",
    subcategory: "entrance",
    title: "Spring Drop In",
    description:
      "Entrance motion built on a critically damped spring equation run in rAF: element falls from above with velocity-carrying overshoot, one bounce below rest position, then settles — parameterised by stiffness and damping, not keyframes.",
    tags: ["spring", "entrance", "physics", "overshoot"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "playful",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "expressive",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "in-view-trigger",
      visualModel: "single-element-drop",
      motionModel: "damped-spring-integrator",
      layoutModel: "block",
      semanticPurpose: "entrance-attention",
    },
    source: `"use client";

import { useEffect, useRef } from "react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/cn";

export interface SpringDropInProps {
  children: React.ReactNode;
  /** Spring stiffness (higher = snappier). */
  stiffness?: number;
  /** Damping ratio below 1 overshoots. */
  damping?: number;
  /** Initial vertical offset in px. */
  from?: number;
  className?: string;
}

export function SpringDropIn({
  children,
  stiffness = 170,
  damping = 0.72,
  from = -120,
  className,
}: SpringDropInProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ once: true });
  const targetRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    const node = targetRef.current;
    if (!node) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      node.style.transform = "translateY(0)";
      node.style.opacity = "1";
      return;
    }

    // Semi-implicit Euler spring integration.
    let position = from;
    let velocity = 0;
    let last = performance.now();
    let raf: number | null = null;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      const force = -stiffness * (position - 0);
      const drag = -2 * damping * Math.sqrt(stiffness) * velocity;
      velocity += (force + drag) * dt;
      position += velocity * dt;

      node.style.transform = \`translateY(\${position.toFixed(2)}px)\`;
      node.style.opacity = String(Math.min(1, 1 - position / from));

      if (Math.abs(position) > 0.4 || Math.abs(velocity) > 4) {
        raf = requestAnimationFrame(tick);
      } else {
        node.style.transform = "";
        node.style.opacity = "1";
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [inView, from, stiffness, damping]);

  return (
    <div ref={ref}>
      <div ref={targetRef} className={cn("will-change-transform", className)} style={{ opacity: 0 }}>
        {children}
      </div>
    </div>
  );
}

export default SpringDropIn;
`,
    demo: `import { SpringDropIn } from "./spring-drop-in";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-10">
      <SpringDropIn>
        <div className="rounded-xl bg-ink px-8 py-5 text-paper shadow-xl">Drop me in</div>
      </SpringDropIn>
    </div>
  );
}
`,
  }),

  P("scroll-compression", {
    category: "motion",
    subcategory: "scroll",
    title: "Scroll Compression",
    description:
      "A stack of panels that compresses together as the page scrolls — each layer's gap interpolates from loose to sealed based on scroll progress through the section, like a deck being squeezed shut.",
    tags: ["scroll", "compress", "stack", "panels"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "dense",
      shapeLanguage: "rounded",
      motionLanguage: "kinetic",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "scroll-progress-trigger",
      visualModel: "gap-collapsing-stack",
      motionModel: "scroll-linked-gap-interpolation",
      layoutModel: "stack",
      semanticPurpose: "narrative-sequence",
    },
    source: `"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface ScrollCompressionProps {
  panels: Array<{ title: string; body: string }>;
  className?: string;
}

export function ScrollCompression({ panels, className }: ScrollCompressionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const measure = () => {
      const rect = node.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      setProgress(Math.max(0, Math.min(1, -rect.top / Math.max(total, 1))));
    };
    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const gap = (1 - progress) * 48; // px between panels
  const scaleStep = 0.04 * progress;

  return (
    <div ref={sectionRef} className={cn("relative", className)} style={{ minHeight: "220vh" }}>
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center">
        <div
          className="flex flex-col will-change-transform"
          style={{ gap: \`\${gap}px\`, transition: "gap 80ms linear" }}
        >
          {panels.map((panel, index) => (
            <div
              key={index}
              className="w-72 rounded-xl border border-line bg-paper p-5 shadow-lg"
              style={{
                transform: \`scale(\${1 - index * scaleStep})\`,
                zIndex: panels.length - index,
              }}
            >
              <p className="font-display text-lg text-ink">{panel.title}</p>
              <p className="mt-1 text-sm text-ink/70">{panel.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 font-mono text-xs text-ink/50">scroll progress: {(progress * 100).toFixed(0)}%</p>
      </div>
    </div>
  );
}

export default ScrollCompression;
`,
    demo: `import { ScrollCompression } from "./scroll-compression";

export default function Demo() {
  return (
    <div className="bg-paper">
      <div className="p-10 text-center text-ink/60">Scroll down ↓</div>
      <ScrollCompression
        panels={[
          { title: "Signal", body: "The first panel holds the headline claim." },
          { title: "Proof", body: "The second carries the evidence." },
          { title: "Action", body: "The last one asks for the click." },
        ]}
      />
    </div>
  );
}
`,
  }),

  P("orbital-revolution", {
    category: "motion",
    subcategory: "physics",
    title: "Orbital Revolution",
    description:
      "Satellites revolve a centre point on elliptical paths with independent periods and phases; each body's opacity and scale respond to depth (behind/in front of the centre), faking 3D with pure transforms.",
    tags: ["orbit", "revolution", "depth", "elliptical"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "technical",
      macrostructure: "rail",
      density: "airy",
      shapeLanguage: "rounded",
      motionLanguage: "kinetic",
      typographyStyle: "monospace",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "ambient-loop",
      visualModel: "depth-faked-orbits",
      motionModel: "elliptical-revolution",
      layoutModel: "radial",
      semanticPurpose: "system-diagram",
    },
    source: `"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface OrbitalRevolutionProps {
  /** Orbiting bodies with their own radius, period and phase. */
  bodies: Array<{ label: string; radius: number; periodSeconds: number; phase: number }>;
  size?: number;
  className?: string;
}

export function OrbitalRevolution({ bodies, size = 260, className }: OrbitalRevolutionProps) {
  const refs = useRef<Array<HTMLDivElement | null>>([]);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduced) return;
    let raf: number | null = null;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      bodies.forEach((body, index) => {
        const node = refs.current[index];
        if (!node) return;
        const angle = body.phase + (elapsed / body.periodSeconds) * Math.PI * 2;
        const x = Math.cos(angle) * body.radius;
        const y = Math.sin(angle) * body.radius * 0.42; // elliptical
        const depth = (Math.sin(angle) + 1) / 2; // 0 back, 1 front
        node.style.transform = \`translate(calc(-50% + \${x}px), calc(-50% + \${y}px)) scale(\${0.7 + depth * 0.5})\`;
        node.style.opacity = String(0.45 + depth * 0.55);
        node.style.zIndex = String(Math.round(depth * 10));
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [bodies, reduced]);

  return (
    <div className={cn("relative", className)} style={{ width: size, height: size / 1.6 }} role="img" aria-label="Orbiting bodies">
      <span aria-hidden className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" />
      {bodies.map((body, index) => (
        <div
          key={body.label}
          ref={(node) => {
            refs.current[index] = node;
          }}
          aria-hidden
          className="absolute left-1/2 top-1/2 flex items-center justify-center rounded-full border border-line bg-paper font-mono text-[10px] text-ink shadow-md will-change-transform"
          style={{ width: 34, height: 34 }}
        >
          {body.label}
        </div>
      ))}
    </div>
  );
}

export default OrbitalRevolution;
`,
    demo: `import { OrbitalRevolution } from "./orbital-revolution";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-10">
      <OrbitalRevolution
        bodies={[
          { label: "ui", radius: 110, periodSeconds: 6, phase: 0 },
          { label: "api", radius: 82, periodSeconds: 4.2, phase: 2.1 },
          { label: "cli", radius: 60, periodSeconds: 3, phase: 4.4 },
        ]}
      />
    </div>
  );
}
`,
  }),

  P("magnetic-dock", {
    category: "motion",
    subcategory: "hover",
    title: "Magnetic Dock",
    description:
      "A dock where icons gravitate toward the pointer within an influence field: displacement falls off with distance (inverse-square), neighbours lean toward the cursor, and the dock lifts as a whole when engaged.",
    tags: ["dock", "magnetic", "pointer", "field"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "playful",
      macrostructure: "rail",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "kinetic",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "pointer-field",
      visualModel: "displacement-icon-rail",
      motionModel: "inverse-square-attraction",
      layoutModel: "rail",
      semanticPurpose: "app-launcher",
    },
    source: `"use client";

import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface MagneticDockProps {
  icons: string[];
  /** Radius of the magnetic field, px. */
  influence?: number;
  className?: string;
}

export function MagneticDock({ icons, influence = 90, className }: MagneticDockProps) {
  const dockRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const frame = useRef<number | null>(null);

  const apply = useCallback(
    (clientX: number | null) => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const dock = dockRef.current;
        if (!dock) return;
        const dockRect = dock.getBoundingClientRect();
        let anyEngaged = false;

        icons.forEach((_, index) => {
          const node = iconRefs.current[index];
          if (!node) return;
          const rect = node.getBoundingClientRect();
          const centre = rect.left + rect.width / 2;

          if (clientX === null) {
            node.style.transform = "translateY(0) scale(1)";
            return;
          }
          const distance = clientX - centre;
          const falloff = Math.max(0, 1 - Math.abs(distance) / influence);
          if (falloff > 0) anyEngaged = true;
          const lift = falloff * falloff * 18;
          node.style.transform = \`translateY(-\${lift}px) scale(\${1 + falloff * 0.25})\`;
        });

        dock.style.transform = anyEngaged ? "translateY(-4px)" : "translateY(0)";
      });
    },
    [icons, influence],
  );

  useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    },
    [],
  );

  return (
    <div
      ref={dockRef}
      className={cn("inline-flex items-end gap-3 rounded-2xl border border-line bg-paper/90 p-3 shadow-xl backdrop-blur", className)}
      onPointerMove={(event) => apply(event.clientX)}
      onPointerLeave={() => apply(null)}
      role="toolbar"
      aria-label="Magnetic dock"
    >
      {icons.map((icon, index) => (
        <button
          key={icon}
          ref={(node) => {
            iconRefs.current[index] = node;
          }}
          type="button"
          aria-label={icon}
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-line/40 text-xl transition-transform duration-100 will-change-transform hover:bg-accent/20"
        >
          <span aria-hidden>{icon}</span>
        </button>
      ))}
    </div>
  );
}

export default MagneticDock;
`,
    demo: `import { MagneticDock } from "./magnetic-dock";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-end justify-center bg-paper p-10">
      <MagneticDock icons={["📐", "✏️", "🗂️", "⚙️", "📦", "🔍"]} />
    </div>
  );
}
`,
  }),

  P("tilt-spring-card", {
    category: "motion",
    subcategory: "hover",
    title: "Tilt Spring Card",
    description:
      "Pointer-driven 3D tilt with a real spring integrator: rotation chases the pointer through a damped spring rather than lerping, so quick circles overshoot and settle — the difference between a transition and a physical object.",
    tags: ["tilt", "3d", "spring", "pointer"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "expressive",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "pointer-tilt",
      visualModel: "perspective-rotation",
      motionModel: "damped-spring-rotation",
      layoutModel: "card",
      semanticPurpose: "showcase-card",
    },
    source: `"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface TiltSpringCardProps {
  children: React.ReactNode;
  /** Max tilt in degrees. */
  maxTilt?: number;
  stiffness?: number;
  className?: string;
}

export function TiltSpringCard({ children, maxTilt = 12, stiffness = 120, className }: TiltSpringCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const state = useRef({ rx: 0, ry: 0, vx: 0, vy: 0, tx: 0, ty: 0, raf: null as number | null, running: false });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia?.("(pointer: coarse)").matches) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const s = state.current;

    const tick = () => {
      const forceX = -stiffness * (s.rx - s.tx);
      const forceY = -stiffness * (s.ry - s.ty);
      s.vx += forceX * 0.016;
      s.vy += forceY * 0.016;
      s.vx *= 0.86;
      s.vy *= 0.86;
      s.rx += s.vx * 0.016;
      s.ry += s.vy * 0.016;

      node.style.transform = \`rotateX(\${s.rx.toFixed(2)}deg) rotateY(\${s.ry.toFixed(2)}deg)\`;

      if (Math.abs(s.rx - s.tx) > 0.05 || Math.abs(s.ry - s.ty) > 0.05 || Math.abs(s.vx) > 0.5 || Math.abs(s.vy) > 0.5) {
        s.raf = requestAnimationFrame(tick);
      } else {
        s.running = false;
      }
    };

    const kick = () => {
      if (!s.running) {
        s.running = true;
        s.raf = requestAnimationFrame(tick);
      }
    };

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      s.ty = px * maxTilt * 2;
      s.tx = -py * maxTilt * 2;
      kick();
    };
    const onLeave = () => {
      s.tx = 0;
      s.ty = 0;
      kick();
    };

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);
    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
      if (s.raf !== null) cancelAnimationFrame(s.raf);
    };
  }, [maxTilt, stiffness]);

  return (
    <div style={{ perspective: 900 }}>
      <div
        ref={ref}
        className={cn("rounded-xl border border-line bg-paper shadow-xl will-change-transform", className)}
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </div>
    </div>
  );
}

export default TiltSpringCard;
`,
    demo: `import { TiltSpringCard } from "./tilt-spring-card";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-10">
      <TiltSpringCard className="w-64 p-8">
        <p className="font-display text-xl text-ink">Physical object</p>
        <p className="mt-2 text-sm text-ink/70">Circle your pointer quickly — the card overshoots and settles like a gyroscope.</p>
      </TiltSpringCard>
    </div>
  );
}
`,
  }),

  P("momentum-panel", {
    category: "motion",
    subcategory: "gesture",
    title: "Momentum Panel",
    description:
      "A draggable panel that keeps its release velocity: throw it and it coasts with friction, bounces off container edges with restitution, and comes to rest where physics puts it — gesture + inertia in one primitive.",
    tags: ["drag", "momentum", "inertia", "bounce"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "playful",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "kinetic",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "drag-throw",
      visualModel: "free-floating-panel",
      motionModel: "friction-coast-restitution",
      layoutModel: "free-canvas",
      semanticPurpose: "playful-panel",
    },
    source: `"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface MomentumPanelProps {
  children?: React.ReactNode;
  /** Friction per frame (lower = slides further). */
  friction?: number;
  /** Bounce energy retained on wall hits. */
  restitution?: number;
  className?: string;
}

export function MomentumPanel({
  children,
  friction = 0.94,
  restitution = 0.7,
  className,
}: MomentumPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const state = useRef({ x: 0, y: 0, vx: 0, vy: 0, dragging: false, lastX: 0, lastY: 0, raf: null as number | null });

  useEffect(() => {
    const container = containerRef.current;
    const panel = panelRef.current;
    if (!container || !panel) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const s = state.current;

    const tick = () => {
      const rect = container.getBoundingClientRect();
      const panelRect = panel.getBoundingClientRect();
      const maxX = (rect.width - panelRect.width) / 2;
      const maxY = (rect.height - panelRect.height) / 2;

      if (!s.dragging) {
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= friction;
        s.vy *= friction;

        if (s.x > maxX) {
          s.x = maxX;
          s.vx = -s.vx * restitution;
        } else if (s.x < -maxX) {
          s.x = -maxX;
          s.vx = -s.vx * restitution;
        }
        if (s.y > maxY) {
          s.y = maxY;
          s.vy = -s.vy * restitution;
        } else if (s.y < -maxY) {
          s.y = -maxY;
          s.vy = -s.vy * restitution;
        }

        if (Math.abs(s.vx) > 0.1 || Math.abs(s.vy) > 0.1) {
          s.raf = requestAnimationFrame(tick);
        } else {
          s.raf = null;
        }
      }

      panel.style.transform = \`translate(\${s.x}px, \${s.y}px)\`;
    };

    const kick = () => {
      if (s.raf === null && !s.dragging) s.raf = requestAnimationFrame(tick);
    };

    const onPointerDown = (event: PointerEvent) => {
      s.dragging = true;
      s.lastX = event.clientX;
      s.lastY = event.clientY;
      s.vx = 0;
      s.vy = 0;
      panel.setPointerCapture(event.pointerId);
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!s.dragging) return;
      const dx = event.clientX - s.lastX;
      const dy = event.clientY - s.lastY;
      s.x += dx;
      s.y += dy;
      s.vx = dx;
      s.vy = dy;
      s.lastX = event.clientX;
      s.lastY = event.clientY;
      panel.style.transform = \`translate(\${s.x}px, \${s.y}px)\`;
    };
    const onPointerUp = () => {
      s.dragging = false;
      kick();
    };

    panel.addEventListener("pointerdown", onPointerDown);
    panel.addEventListener("pointermove", onPointerMove);
    panel.addEventListener("pointerup", onPointerUp);
    return () => {
      panel.removeEventListener("pointerdown", onPointerDown);
      panel.removeEventListener("pointermove", onPointerMove);
      panel.removeEventListener("pointerup", onPointerUp);
      if (s.raf !== null) cancelAnimationFrame(s.raf);
    };
  }, [friction, restitution]);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden rounded-xl border border-line bg-line/20", className)}
      style={{ height: 320 }}
    >
      <div
        ref={panelRef}
        className="absolute left-1/2 top-1/2 -ml-20 -mt-14 w-40 cursor-grab touch-none rounded-xl bg-ink p-4 text-paper shadow-2xl active:cursor-grabbing"
      >
        <p className="font-display text-sm">Throw me</p>
        <p className="mt-1 text-xs opacity-70">I keep your momentum</p>
      </div>
      <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-xs text-ink/50">
        drag & release
      </p>
    </div>
  );
}

export default MomentumPanel;
`,
    demo: `import { MomentumPanel } from "./momentum-panel";

export default function Demo() {
  return (
    <div className="flex min-h-[22rem] items-center justify-center bg-paper p-10">
      <MomentumPanel className="w-full max-w-md" />
    </div>
  );
}
`,
  }),

  P("liquid-shape-morph", {
    category: "motion",
    subcategory: "page",
    title: "Liquid Shape Morph",
    description:
      "A surface that morphs between organic blob shapes using animated border-radius interpolation across eight values — the cheapest real morph in CSS, with asymmetric timing so the blob never looks mechanical.",
    tags: ["morph", "blob", "organic", "shape"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "playful",
      macrostructure: "stack",
      density: "airy",
      shapeLanguage: "soft",
      motionLanguage: "kinetic",
      typographyStyle: "grotesk",
      colorStrategy: "pastel",
    },
    fingerprint: {
      interactionModel: "ambient-loop",
      visualModel: "border-radius-blob",
      motionModel: "keyframe-radius-morph",
      layoutModel: "block",
      semanticPurpose: "decorative-motion",
    },
    source: `import { cn } from "@/lib/cn";

export interface LiquidShapeMorphProps {
  children?: React.ReactNode;
  /** Seconds per morph cycle. */
  cycleSeconds?: number;
  /** Blob fill colour. */
  fill?: string;
  className?: string;
}

export function LiquidShapeMorph({
  children,
  cycleSeconds = 9,
  fill = "#e2624a",
  className,
}: LiquidShapeMorphProps) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <div
        aria-hidden
        className="absolute inset-0 will-change-[border-radius]"
        style={{
          background: \`linear-gradient(135deg, \${fill}, color-mix(in oklab, \${fill}, #4a6fa5 45%))\`,
          borderRadius: "42% 58% 61% 39% / 45% 42% 58% 55%",
          animation: \`openui-blob \${cycleSeconds}s ease-in-out infinite alternate\`,
        }}
      />
      <div className="relative z-10 p-10">{children}</div>
      <style>{\`@keyframes openui-blob {
        0% { border-radius: 42% 58% 61% 39% / 45% 42% 58% 55% }
        33% { border-radius: 58% 42% 39% 61% / 52% 58% 42% 48% }
        66% { border-radius: 39% 61% 55% 45% / 58% 39% 61% 42% }
        100% { border-radius: 61% 39% 45% 55% / 39% 55% 45% 61% }
      } @media (prefers-reduced-motion: reduce) { div { animation: none !important } }\`}</style>
    </div>
  );
}

export default LiquidShapeMorph;
`,
    demo: `import { LiquidShapeMorph } from "./liquid-shape-morph";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-10">
      <LiquidShapeMorph className="h-56 w-56">
        <p className="text-center font-display text-lg text-paper">stay fluid</p>
      </LiquidShapeMorph>
    </div>
  );
}
`,
  }),

  P("stagger-cascade", {
    category: "motion",
    subcategory: "entrance",
    title: "Stagger Cascade",
    description:
      "Child elements enter in sequence where each successive delay is computed from the previous child's actual animation end (not a fixed step) — cascades that stay correct even when children have different durations.",
    tags: ["stagger", "cascade", "sequence", "entrance"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "swiss",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "expressive",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "in-view-trigger",
      visualModel: "child-sequence-entrance",
      motionModel: "measured-chained-delays",
      layoutModel: "stack",
      semanticPurpose: "list-entrance",
    },
    source: `"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/cn";

export interface StaggerCascadeProps {
  children: React.ReactNode[];
  /** Base duration per child, ms; delays chain from actual completion. */
  childDurationMs?: number;
  className?: string;
}

export function StaggerCascade({ children, childDurationMs = 420, className }: StaggerCascadeProps) {
  const { ref, inView } = useInView<HTMLUListElement>({ once: true });
  const [visibleCount, setVisibleCount] = useState(0);
  const timeouts = useRef<number[]>([]);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setVisibleCount(children.length);
      return;
    }
    // Chain: child i starts when child i-1 has half-finished — the cascade
    // overlaps like dominoes rather than marching metronomically.
    let elapsed = 0;
    children.forEach((_, index) => {
      elapsed += index === 0 ? 0 : childDurationMs * 0.45;
      timeouts.current.push(
        window.setTimeout(() => setVisibleCount(index + 1), elapsed),
      );
    });
    return () => {
      timeouts.current.forEach((timer) => window.clearTimeout(timer));
      timeouts.current = [];
    };
  }, [inView, children.length, childDurationMs]);

  return (
    <ul ref={ref} className={cn("flex flex-col gap-3", className)}>
      {children.map((child, index) => (
        <li
          key={index}
          className="will-change-transform"
          style={{
            opacity: index < visibleCount ? 1 : 0,
            transform: index < visibleCount ? "translateX(0)" : "translateX(-16px)",
            transition: "opacity 300ms ease, transform 420ms cubic-bezier(0.2, 0, 0, 1)",
          }}
        >
          {child}
        </li>
      ))}
    </ul>
  );
}

export default StaggerCascade;
`,
    demo: `import { StaggerCascade } from "./stagger-cascade";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-10">
      <StaggerCascade className="w-72">
        <div className="rounded-lg border border-line bg-paper p-4 text-ink">Registry schema</div>
        <div className="rounded-lg border border-line bg-paper p-4 text-ink">Validated metadata</div>
        <div className="rounded-lg border border-line bg-paper p-4 text-ink">Mounted demos</div>
        <div className="rounded-lg border border-line bg-paper p-4 text-ink">Published resources</div>
      </StaggerCascade>
    </div>
  );
}
`,
  }),

  P("perspective-plane-reveal", {
    category: "motion",
    subcategory: "entrance",
    title: "Perspective Plane Reveal",
    description:
      "Content reveals as a plane rotating up from the floor of its own perspective container — rotateX from -75° with transform-origin at the bottom edge, so the element rises like a drawbridge instead of sliding.",
    tags: ["perspective", "3d", "reveal", "plane"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "swiss",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "expressive",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "in-view-trigger",
      visualModel: "floor-hinged-plane",
      motionModel: "rotate-x-rise",
      layoutModel: "block",
      semanticPurpose: "section-entrance",
    },
    source: `"use client";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/cn";

export interface PerspectivePlaneRevealProps {
  children: React.ReactNode;
  /** Start angle below the horizon. */
  fromAngle?: number;
  className?: string;
}

export function PerspectivePlaneReveal({ children, fromAngle = -75, className }: PerspectivePlaneRevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ once: true });
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const revealed = inView || Boolean(reduced);

  return (
    <div ref={ref} style={{ perspective: 1200 }}>
      <div
        className={cn("origin-bottom will-change-transform", className)}
        style={{
          transform: revealed ? "rotateX(0deg)" : \`rotateX(\${fromAngle}deg)\`,
          opacity: revealed ? 1 : 0,
          transition: "transform 780ms cubic-bezier(0.2, 0, 0, 1), opacity 400ms ease",
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default PerspectivePlaneReveal;
`,
    demo: `import { PerspectivePlaneReveal } from "./perspective-plane-reveal";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-10">
      <PerspectivePlaneReveal className="w-80 rounded-xl border border-line bg-paper p-8 shadow-2xl">
        <p className="font-display text-xl text-ink">Rises like a drawbridge</p>
        <p className="mt-2 text-sm text-ink/70">Hinged at its own bottom edge, not slid or faded.</p>
      </PerspectivePlaneReveal>
    </div>
  );
}
`,
  }),

  P("cursor-trail-ribbon", {
    category: "motion",
    subcategory: "experimental",
    title: "Cursor Trail Ribbon",
    description:
      "A fading ribbon that follows the pointer as a polyline of recent positions rendered on canvas with quadratic smoothing — width and opacity taper along the trail's age, decaying to nothing when the pointer stops.",
    tags: ["cursor", "trail", "canvas", "ribbon"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "playful",
      macrostructure: "full-bleed",
      density: "airy",
      shapeLanguage: "soft",
      motionLanguage: "kinetic",
      typographyStyle: "grotesk",
      colorStrategy: "neon-on-dark",
    },
    fingerprint: {
      interactionModel: "pointer-history",
      visualModel: "canvas-smoothed-polyline",
      motionModel: "age-tapered-decay",
      layoutModel: "overlay",
      semanticPurpose: "pointer-delight",
    },
    source: `"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface CursorTrailRibbonProps {
  /** Trail length in tracked points. */
  length?: number;
  /** Max ribbon width, px. */
  width?: number;
  colour?: string;
  className?: string;
}

export function CursorTrailRibbon({
  length = 28,
  width = 14,
  colour = "#41ead4",
  className,
}: CursorTrailRibbonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia?.("(pointer: coarse)").matches) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const points: Array<{ x: number; y: number; t: number }> = [];
    let raf: number | null = null;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      const now = performance.now();

      for (let i = 1; i < points.length; i++) {
        const p0 = points[i - 1]!;
        const p1 = points[i]!;
        const age = (now - p1.t) / 700;
        if (age > 1) continue;
        const falloff = 1 - age;
        const positionAlong = i / points.length;

        ctx.strokeStyle = colour;
        ctx.globalAlpha = falloff * 0.7;
        ctx.lineWidth = Math.max(0.5, width * positionAlong * falloff);
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      while (points.length > 0 && now - points[0]!.t > 700) points.shift();
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      points.push({ x: event.clientX - rect.left, y: event.clientY - rect.top, t: performance.now() });
      if (points.length > length) points.shift();
    };
    window.addEventListener("pointermove", onMove);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [length, width, colour]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none absolute inset-0", className)}
      aria-hidden
    />
  );
}

export default CursorTrailRibbon;
`,
    demo: `import { CursorTrailRibbon } from "./cursor-trail-ribbon";

export default function Demo() {
  return (
    <div className="relative min-h-[20rem] overflow-hidden rounded-xl bg-ink p-10">
      <p className="relative z-10 font-display text-2xl text-paper">Move your pointer</p>
      <p className="relative z-10 mt-2 text-sm text-paper/60">The ribbon remembers where you have been.</p>
      <CursorTrailRibbon />
    </div>
  );
}
`,
  }),

  P("idle-float-loop", {
    category: "motion",
    subcategory: "physics",
    title: "Idle Float Loop",
    description:
      "Multi-element idle float where each child bobs on its own sine wave with independent amplitude, period and phase — a still-life that breathes, with the entire system pausing via one reduced-motion check.",
    tags: ["float", "idle", "sine", "breathing"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "luxury",
      macrostructure: "scatter",
      density: "airy",
      shapeLanguage: "soft",
      motionLanguage: "subtle",
      typographyStyle: "humanist",
      colorStrategy: "pastel",
    },
    fingerprint: {
      interactionModel: "ambient-loop",
      visualModel: "phase-offset-bobbing",
      motionModel: "sine-wave-superposition",
      layoutModel: "scatter",
      semanticPurpose: "ambient-life",
    },
    source: `"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface FloatChild {
  content: React.ReactNode;
  /** Vertical amplitude, px. */
  amplitude?: number;
  /** Seconds per bob. */
  periodSeconds?: number;
  /** Phase offset in radians. */
  phase?: number;
}

export interface IdleFloatLoopProps {
  children: FloatChild[];
  className?: string;
}

export function IdleFloatLoop({ children, className }: IdleFloatLoopProps) {
  const refs = useRef<Array<HTMLDivElement | null>>([]);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduced) return;
    let raf: number | null = null;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      children.forEach((child, index) => {
        const node = refs.current[index];
        if (!node) return;
        const amplitude = child.amplitude ?? 10;
        const period = child.periodSeconds ?? 4;
        const phase = child.phase ?? index * 1.3;
        const y = Math.sin((elapsed / period) * Math.PI * 2 + phase) * amplitude;
        const tilt = Math.cos((elapsed / period) * Math.PI * 2 + phase) * 1.5;
        node.style.transform = \`translateY(\${y.toFixed(2)}px) rotate(\${tilt.toFixed(2)}deg)\`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [children, reduced]);

  return (
    <div className={cn("flex items-center justify-center gap-8", className)}>
      {children.map((child, index) => (
        <div
          key={index}
          ref={(node) => {
            refs.current[index] = node;
          }}
          aria-hidden={typeof child.content === "string"}
          className="will-change-transform"
        >
          {child.content}
        </div>
      ))}
    </div>
  );
}

export default IdleFloatLoop;
`,
    demo: `import { IdleFloatLoop } from "./idle-float-loop";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-10">
      <IdleFloatLoop
        children={[
          { content: "🎈", amplitude: 14, periodSeconds: 3.4 },
          { content: "☁️", amplitude: 8, periodSeconds: 5, phase: 1.4 },
          { content: "🪁", amplitude: 18, periodSeconds: 4.2, phase: 2.6 },
        ]}
      />
    </div>
  );
}
`,
  }),
];

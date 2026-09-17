import type { ResourceDefinition } from "../lib/definitions.js";

const P = (name: string, definition: Omit<ResourceDefinition, "name">): ResourceDefinition => ({
  name,
  ...definition,
});

export default [
  P("flowing-topological-bands", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Flowing Topological Bands",
    description: "Multi-band chromatic elevation isolines flowing organically across the entire viewport.",
    tags: ["topological", "bands", "contour", "isolines", "elevation"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "organic",
      macrostructure: "full-bleed",
      density: "medium",
      shapeLanguage: "soft",
      motionLanguage: "none",
      typographyStyle: "humanist",
      colorStrategy: "muted-earth",
    },
    fingerprint: {
      interactionModel: "passive-topological-bands",
      visualModel: "chromatic-contour-ribbons",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "topological-landscape-texture",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface FlowingTopologicalBandsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function FlowingTopologicalBands({ className, children, ...props }: FlowingTopologicalBandsProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 800 600">
        <path d="M0,80 C200,160 400,20 800,140" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M0,160 C250,220 450,90 800,210" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M0,260 C220,340 500,180 800,300" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M0,380 C300,450 520,290 800,420" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M0,500 C280,560 550,420 800,530" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { FlowingTopologicalBands } from "./flowing-topological-bands";

export default function FlowingTopologicalBandsDemo() {
  return (
    <FlowingTopologicalBands className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-sans text-ink">Topological Bands</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Organic elevation contour band harmonics.</p>
      </div>
    </FlowingTopologicalBands>
  );
}
`,
  }),

  P("matrix-hex-stream", {
    category: "backgrounds",
    subcategory: "canvases",
    title: "Matrix Hex Stream",
    description: "Hexadecimal byte stream memory dump (0xDEAD, 0xBEEF) raining downward on canvas.",
    tags: ["hex", "memory", "stream", "canvas", "cyber"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "technical",
      macrostructure: "full-bleed",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "kinetic",
      typographyStyle: "monospace",
      colorStrategy: "neon-on-dark",
    },
    fingerprint: {
      interactionModel: "passive-hex-stream",
      visualModel: "hexadecimal-memory-dump",
      motionModel: "vertical-code-rain",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "hex-telemetry-backdrop",
    },
    source: `"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface MatrixHexStreamProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function MatrixHexStream({ className, children, ...props }: MatrixHexStreamProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    resize();

    const hexCols = Math.floor(canvas.width / 50);
    const drops: number[] = Array.from({ length: hexCols }, () => Math.random() * -30);

    const render = () => {
      ctx.fillStyle = "rgba(10, 15, 25, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = "11px monospace";
      ctx.fillStyle = "#38bdf8";

      for (let i = 0; i < drops.length; i++) {
        const hex = "0x" + Math.floor(Math.random() * 65535).toString(16).toUpperCase().padStart(4, "0");
        const x = i * 50;
        const y = (drops[i] ?? 0) * 16;

        ctx.fillText(hex, x, y);
        if (y > canvas.height && Math.random() > 0.95) {
          drops[i] = 0;
        }
        drops[i] = (drops[i] ?? 0) + 1;
      }
      animId = requestAnimationFrame(render);
    };

    render();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-white overflow-hidden", className)} {...props}>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-40 -z-10" />
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { MatrixHexStream } from "./matrix-hex-stream";

export default function MatrixHexStreamDemo() {
  return (
    <MatrixHexStream className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-sky-500/30 bg-black/70 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-sky-400">Hexadecimal Memory</h3>
        <p className="text-xs text-white/70 mt-1 font-mono">Realtime 16-bit memory register streaming.</p>
      </div>
    </MatrixHexStream>
  );
}
`,
  }),

  P("strobe-grid-dots", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Strobe Grid Dots",
    description: "Periodic dot grid matrix with alternating concentric strobe rings.",
    tags: ["strobe", "dots", "grid", "optical", "matrix"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "full-bleed",
      density: "medium",
      shapeLanguage: "pill",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "passive-strobe-dots",
      visualModel: "concentric-strobe-matrix",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "stroboscopic-grid-texture",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface StrobeGridDotsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function StrobeGridDots({ className, children, ...props }: StrobeGridDotsProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="strobe-pat" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="15" cy="15" r="2" fill="currentColor" />
            <circle cx="15" cy="15" r="5" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#strobe-pat)" />
      </svg>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { StrobeGridDots } from "./strobe-grid-dots";

export default function StrobeGridDotsDemo() {
  return (
    <StrobeGridDots className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-ink">Strobe Dots Array</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Target dots surrounded by fine rings.</p>
      </div>
    </StrobeGridDots>
  );
}
`,
  }),

  P("sound-frequency-spectrogram", {
    category: "backgrounds",
    subcategory: "ambient",
    title: "Sound Frequency Spectrogram",
    description: "Waterfall audio spectrum analyzer heatmap spectrogram with chromatic acoustic intensity bands.",
    tags: ["spectrogram", "audio", "frequency", "fft", "waterfall"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "full-bleed",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "neon-on-dark",
    },
    fingerprint: {
      interactionModel: "passive-spectrogram-backdrop",
      visualModel: "frequency-intensity-heatmap",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "audio-spectrogram-canvas",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface SoundFrequencySpectrogramProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function SoundFrequencySpectrogram({ className, children, ...props }: SoundFrequencySpectrogramProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-white overflow-hidden", className)} {...props}>
      <div
        className="absolute inset-0 pointer-events-none opacity-25 -z-10"
        style={{
          backgroundImage: \`
            linear-gradient(to right, #3b82f6 0%, #10b981 30%, #f59e0b 60%, #ef4444 100%),
            repeating-linear-gradient(to bottom, transparent, transparent 3px, rgba(0,0,0,0.8) 3px, rgba(0,0,0,0.8) 5px)
          \`,
          backgroundBlendMode: "multiply",
        }}
      />
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { SoundFrequencySpectrogram } from "./sound-frequency-spectrogram";

export default function SoundFrequencySpectrogramDemo() {
  return (
    <SoundFrequencySpectrogram className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-white/20 bg-black/70 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-white">FFT Spectrogram</h3>
        <p className="text-xs text-white/70 mt-1 font-mono">Audio spectral frequency power distribution.</p>
      </div>
    </SoundFrequencySpectrogram>
  );
}
`,
  }),

  P("concentric-elliptic-orbits", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Concentric Elliptic Orbits",
    description: "Keplerian orbital mechanics planetary ellipses intersecting around gravitational focal points.",
    tags: ["orbits", "astronomy", "kepler", "ellipses", "space"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "full-bleed",
      density: "airy",
      shapeLanguage: "pill",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "passive-kepler-orbits",
      visualModel: "intersecting-orbital-ellipses",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "astronomy-orbital-mechanics",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface ConcentricEllipticOrbitsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function ConcentricEllipticOrbits({ className, children, ...props }: ConcentricEllipticOrbitsProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
        <ellipse cx="400" cy="300" rx="360" ry="120" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(-15 400 300)" />
        <ellipse cx="400" cy="300" rx="280" ry="90" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(25 400 300)" />
        <ellipse cx="400" cy="300" rx="200" ry="70" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(-40 400 300)" />
        <circle cx="400" cy="300" r="4" fill="currentColor" />
      </svg>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { ConcentricEllipticOrbits } from "./concentric-elliptic-orbits";

export default function ConcentricEllipticOrbitsDemo() {
  return (
    <ConcentricEllipticOrbits className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-ink">Keplerian Orbits</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Multi-axis planetary elliptical trajectories.</p>
      </div>
    </ConcentricEllipticOrbits>
  );
}
`,
  }),

  P("circuit-trace-ic-board", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Circuit Trace IC Board",
    description: "Dense microchip surface mount component bus traces with fine wire-bonded pinouts.",
    tags: ["ic", "microchip", "silicon", "pcb", "bus"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "full-bleed",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "neon-on-dark",
    },
    fingerprint: {
      interactionModel: "passive-silicon-microchip",
      visualModel: "ic-pinout-die-traces",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "microchip-die-texture",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface CircuitTraceICBoardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function CircuitTraceICBoard({ className, children, ...props }: CircuitTraceICBoardProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-emerald-400 overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="ic-pat" width="80" height="80" patternUnits="userSpaceOnUse">
            <rect x="25" y="25" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1" />
            <line x1="10" y1="30" x2="25" y2="30" stroke="currentColor" strokeWidth="1" />
            <line x1="10" y1="40" x2="25" y2="40" stroke="currentColor" strokeWidth="1" />
            <line x1="10" y1="50" x2="25" y2="50" stroke="currentColor" strokeWidth="1" />
            <line x1="55" y1="30" x2="70" y2="30" stroke="currentColor" strokeWidth="1" />
            <line x1="55" y1="40" x2="70" y2="40" stroke="currentColor" strokeWidth="1" />
            <line x1="55" y1="50" x2="70" y2="50" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ic-pat)" />
      </svg>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { CircuitTraceICBoard } from "./circuit-trace-ic-board";

export default function CircuitTraceICBoardDemo() {
  return (
    <CircuitTraceICBoard className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-emerald-500/30 bg-black/70 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-emerald-400">Integrated Circuit Die</h3>
        <p className="text-xs text-white/70 mt-1 font-mono">Microchip package with wire-bond lead pins.</p>
      </div>
    </CircuitTraceICBoard>
  );
}
`,
  }),

  P("paper-origami-plane", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Paper Origami Plane",
    description: "Diagonal isometric tessellated paper dart planes soaring across a minimalist backdrop.",
    tags: ["origami", "airplane", "paper", "flight", "minimal"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "playful",
      macrostructure: "full-bleed",
      density: "airy",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "passive-origami-fleet",
      visualModel: "tessellated-paper-airplanes",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "paper-airplane-texture",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface PaperOrigamiPlaneProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function PaperOrigamiPlane({ className, children, ...props }: PaperOrigamiPlaneProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="plane-pat" width="60" height="60" patternUnits="userSpaceOnUse">
            <polygon points="10,50 30,10 50,50 30,40" fill="none" stroke="currentColor" strokeWidth="1" />
            <line x1="30" y1="10" x2="30" y2="40" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#plane-pat)" />
      </svg>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { PaperOrigamiPlane } from "./paper-origami-plane";

export default function PaperOrigamiPlaneDemo() {
  return (
    <PaperOrigamiPlane className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-sans text-ink">Origami Airplanes</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Ascending paper dart flight squadron.</p>
      </div>
    </PaperOrigamiPlane>
  );
}
`,
  }),

  P("laser-scan-bar", {
    category: "backgrounds",
    subcategory: "ambient",
    title: "Laser Scan Bar",
    description: "Sweeping horizontal crimson laser line simulating a security barcode optical scanner.",
    tags: ["laser", "scanner", "barcode", "security", "crimson"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "full-bleed",
      density: "airy",
      shapeLanguage: "sharp",
      motionLanguage: "kinetic",
      typographyStyle: "monospace",
      colorStrategy: "neon-on-dark",
    },
    fingerprint: {
      interactionModel: "passive-laser-scan",
      visualModel: "sweeping-crimson-beam",
      motionModel: "vertical-bounce-sweep",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "security-laser-scanner",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface LaserScanBarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function LaserScanBar({ className, children, ...props }: LaserScanBarProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-white overflow-hidden", className)} {...props}>
      <div
        className="absolute inset-x-0 h-1 bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)] pointer-events-none -z-10 animate-bounce duration-1000 top-1/2"
      />
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/80 pointer-events-none -z-10" />
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { LaserScanBar } from "./laser-scan-bar";

export default function LaserScanBarDemo() {
  return (
    <LaserScanBar className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-red-500/30 bg-black/70 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-red-400">Security Laser Beam</h3>
        <p className="text-xs text-white/70 mt-1 font-mono">Horizontal barcode scanning laser pulse.</p>
      </div>
    </LaserScanBar>
  );
}
`,
  }),

  P("cosmic-nebula-clouds", {
    category: "backgrounds",
    subcategory: "ambient",
    title: "Cosmic Nebula Clouds",
    description: "Deep interstellar hydrogen dust clouds with ultraviolet chromatic gas dispersion.",
    tags: ["nebula", "space", "cosmic", "clouds", "astronomy"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "luxury",
      macrostructure: "full-bleed",
      density: "airy",
      shapeLanguage: "soft",
      motionLanguage: "subtle",
      typographyStyle: "serif-display",
      colorStrategy: "neon-on-dark",
    },
    fingerprint: {
      interactionModel: "passive-nebula-glow",
      visualModel: "chromatic-gas-cloud-dispersion",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "deep-space-nebula",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface CosmicNebulaCloudsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function CosmicNebulaClouds({ className, children, ...props }: CosmicNebulaCloudsProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-white overflow-hidden", className)} {...props}>
      <div
        className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-30 pointer-events-none -z-10"
        style={{ background: "radial-gradient(circle, #8b5cf6 0%, #ec4899 50%, transparent 80%)" }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[450px] h-[450px] rounded-full blur-3xl opacity-25 pointer-events-none -z-10"
        style={{ background: "radial-gradient(circle, #06b6d4 0%, #3b82f6 50%, transparent 80%)" }}
      />
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { CosmicNebulaClouds } from "./cosmic-nebula-clouds";

export default function CosmicNebulaCloudsDemo() {
  return (
    <CosmicNebulaClouds className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-white/20 bg-black/70 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-serif text-white">Interstellar Nebula</h3>
        <p className="text-xs text-white/70 mt-1 font-sans">Ultraviolet emission cloud luminescence.</p>
      </div>
    </CosmicNebulaClouds>
  );
}
`,
  }),

  P("bayer-matrix-dither", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Bayer Matrix Dither",
    description: "Ordered 4x4 Bayer dithering matrix pattern simulating classic Mac 1-bit bitmap graphics.",
    tags: ["bayer", "dither", "bitmap", "retro", "mac"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "retro",
      macrostructure: "full-bleed",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "passive-bayer-dither",
      visualModel: "ordered-threshold-matrix",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "one-bit-dithering-mask",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface BayerMatrixDitherProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function BayerMatrixDither({ className, children, ...props }: BayerMatrixDitherProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div
        className="absolute inset-0 pointer-events-none opacity-10 -z-10"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px), radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "8px 8px",
          backgroundPosition: "0 0, 4px 4px",
        }}
      />
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { BayerMatrixDither } from "./bayer-matrix-dither";

export default function BayerMatrixDitherDemo() {
  return (
    <BayerMatrixDither className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-ink">Bayer Ordered Dither</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Classic 1-bit threshold quantization grid.</p>
      </div>
    </BayerMatrixDither>
  );
}
`,
  }),

  P("acoustic-sound-nodes", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Acoustic Sound Nodes",
    description: "Chladni plate acoustic resonance nodal line patterns formed by harmonic frequency standing waves.",
    tags: ["chladni", "acoustics", "resonance", "sound", "nodal"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "full-bleed",
      density: "medium",
      shapeLanguage: "soft",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "passive-chladni-plate",
      visualModel: "acoustic-nodal-geometry",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "acoustic-resonance-pattern",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface AcousticSoundNodesProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function AcousticSoundNodes({ className, children, ...props }: AcousticSoundNodesProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400">
        <circle cx="300" cy="200" r="140" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" />
        <line x1="160" y1="200" x2="440" y2="200" stroke="currentColor" strokeWidth="1" />
        <line x1="300" y1="60" x2="300" y2="340" stroke="currentColor" strokeWidth="1" />
        <path d="M200 100 Q300 200 400 100" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M200 300 Q300 200 400 300" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { AcousticSoundNodes } from "./acoustic-sound-nodes";

export default function AcousticSoundNodesDemo() {
  return (
    <AcousticSoundNodes className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-ink">Chladni Nodal Lines</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Vibrational acoustic standing wave modes.</p>
      </div>
    </AcousticSoundNodes>
  );
}
`,
  }),

  P("optical-illusion-grid", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Optical Illusion Grid",
    description: "Famous Hermann grid optical illusion where phantom dark dots appear at white lane intersections.",
    tags: ["hermann", "illusion", "optical", "grid", "perception"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "full-bleed",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "passive-hermann-illusion",
      visualModel: "phantom-dot-grid",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "optical-illusion-texture",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface OpticalIllusionGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function OpticalIllusionGrid({ className, children, ...props }: OpticalIllusionGridProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div
        className="absolute inset-0 pointer-events-none opacity-20 -z-10"
        style={{
          backgroundImage: \`
            linear-gradient(to right, currentColor 6px, transparent 6px),
            linear-gradient(to bottom, currentColor 6px, transparent 6px)
          \`,
          backgroundSize: "36px 36px",
        }}
      />
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { OpticalIllusionGrid } from "./optical-illusion-grid";

export default function OpticalIllusionGridDemo() {
  return (
    <OpticalIllusionGrid className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-ink">Hermann Grid Illusion</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Retinal lateral inhibition optical phantom dots.</p>
      </div>
    </OpticalIllusionGrid>
  );
}
`,
  }),

  P("glitch-cyber-mosaic", {
    category: "backgrounds",
    subcategory: "canvases",
    title: "Glitch Cyber Mosaic",
    description: "Digital pixel sorting displacement glitch blocks shifting unpredictably across canvas.",
    tags: ["glitch", "pixel", "sorting", "cyber", "displacement"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "technical",
      macrostructure: "full-bleed",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "kinetic",
      typographyStyle: "monospace",
      colorStrategy: "neon-on-dark",
    },
    fingerprint: {
      interactionModel: "passive-glitch-canvas",
      visualModel: "pixel-sorting-shards",
      motionModel: "stroboscopic-slice-jitter",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "cybernetic-glitch-texture",
    },
    source: `"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface GlitchCyberMosaicProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function GlitchCyberMosaic({ className, children, ...props }: GlitchCyberMosaicProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let h = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const render = () => {
      ctx.fillStyle = "rgba(15, 23, 42, 0.2)";
      ctx.fillRect(0, 0, w, h);

      if (Math.random() > 0.4) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const bw = Math.random() * 80 + 20;
        const bh = Math.random() * 8 + 2;
        ctx.fillStyle = Math.random() > 0.5 ? "rgba(56, 189, 248, 0.4)" : "rgba(236, 72, 153, 0.4)";
        ctx.fillRect(x, y, bw, bh);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-white overflow-hidden", className)} {...props}>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none -z-10" />
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { GlitchCyberMosaic } from "./glitch-cyber-mosaic";

export default function GlitchCyberMosaicDemo() {
  return (
    <GlitchCyberMosaic className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-sky-500/30 bg-black/70 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-sky-400">Cyber Glitch Shards</h3>
        <p className="text-xs text-white/70 mt-1 font-mono">Digital stream dislocation horizontal artifacts.</p>
      </div>
    </GlitchCyberMosaic>
  );
}
`,
  }),

  P("geometric-cube-stack", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Geometric Cube Stack",
    description: "Vertical columns of tessellated isometric voxels forming modular architecture towers.",
    tags: ["voxels", "cubes", "towers", "isometric", "architecture"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "full-bleed",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "passive-voxel-towers",
      visualModel: "columnar-cube-pillars",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "isometric-voxel-texture",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface GeometricCubeStackProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function GeometricCubeStack({ className, children, ...props }: GeometricCubeStackProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="stack-pat" width="40" height="70" patternUnits="userSpaceOnUse">
            <polygon points="20,0 40,12 20,24 0,12" fill="none" stroke="currentColor" strokeWidth="1" />
            <polygon points="20,24 40,36 20,48 0,36" fill="none" stroke="currentColor" strokeWidth="1" />
            <polygon points="20,48 40,60 20,72 0,60" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#stack-pat)" />
      </svg>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { GeometricCubeStack } from "./geometric-cube-stack";

export default function GeometricCubeStackDemo() {
  return (
    <GeometricCubeStack className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-ink">Voxel Cube Columns</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Vertical isometric modular column tessellation.</p>
      </div>
    </GeometricCubeStack>
  );
}
`,
  }),

  P("concentric-hex-rings", {
    category: "backgrounds",
    subcategory: "ambient",
    title: "Concentric Hex Rings",
    description: "Concentric nesting regular hexagons scaling symmetrically outward from viewport center.",
    tags: ["hexagons", "concentric", "rings", "geometry", "radial"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "full-bleed",
      density: "airy",
      shapeLanguage: "sharp",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "neon-on-dark",
    },
    fingerprint: {
      interactionModel: "passive-hex-rings",
      visualModel: "nesting-hexagonal-shells",
      motionModel: "none",
      layoutModel: "center-anchored-radial",
      semanticPurpose: "hexagonal-target-canvas",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface ConcentricHexRingsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function ConcentricHexRings({ className, children, ...props }: ConcentricHexRingsProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-emerald-400 overflow-hidden", className)} {...props}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 -z-10">
        <svg className="w-[600px] h-[600px]" viewBox="0 0 200 200">
          {[20, 40, 60, 80].map((r, i) => (
            <polygon
              key={i}
              points={\`\${100 + r * Math.cos(0)},\${100 + r * Math.sin(0)} \${100 + r * Math.cos(Math.PI / 3)},\${100 + r * Math.sin(Math.PI / 3)} \${100 + r * Math.cos((2 * Math.PI) / 3)},\${100 + r * Math.sin((2 * Math.PI) / 3)} \${100 + r * Math.cos(Math.PI)},\${100 + r * Math.sin(Math.PI)} \${100 + r * Math.cos((4 * Math.PI) / 3)},\${100 + r * Math.sin((4 * Math.PI) / 3)} \${100 + r * Math.cos((5 * Math.PI) / 3)},\${100 + r * Math.sin((5 * Math.PI) / 3)}\`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { ConcentricHexRings } from "./concentric-hex-rings";

export default function ConcentricHexRingsDemo() {
  return (
    <ConcentricHexRings className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-emerald-500/30 bg-black/70 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-emerald-400">Hexagonal Target</h3>
        <p className="text-xs text-white/70 mt-1 font-mono">Concentric nested hexagonal radar shells.</p>
      </div>
    </ConcentricHexRings>
  );
}
`,
  }),

  P("fluid-smoke-curling", {
    category: "backgrounds",
    subcategory: "ambient",
    title: "Fluid Smoke Curling",
    description: "Curling delicate wisps of incense smoke rising and undulating in still air.",
    tags: ["smoke", "fluid", "incense", "ambient", "curling"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "organic",
      macrostructure: "full-bleed",
      density: "airy",
      shapeLanguage: "soft",
      motionLanguage: "subtle",
      typographyStyle: "serif-display",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "passive-smoke-wisp",
      visualModel: "curling-smoke-ribbon",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "ambient-smoke-veil",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface FluidSmokeCurlingProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function FluidSmokeCurling({ className, children, ...props }: FluidSmokeCurlingProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 400 600">
        <path d="M200 600 Q240 450 180 350 T220 150 Q230 50 200 0" fill="none" stroke="currentColor" strokeWidth="2" filter="blur(2px)" />
        <path d="M190 600 Q230 460 170 360 T210 160 Q220 60 190 0" fill="none" stroke="currentColor" strokeWidth="1" filter="blur(3px)" />
        <path d="M210 600 Q250 440 190 340 T230 140 Q240 40 210 0" fill="none" stroke="currentColor" strokeWidth="1.5" filter="blur(4px)" />
      </svg>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { FluidSmokeCurling } from "./fluid-smoke-curling";

export default function FluidSmokeCurlingDemo() {
  return (
    <FluidSmokeCurling className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-serif text-ink">Incense Smoke</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Delicate blurred laminar smoke wisps.</p>
      </div>
    </FluidSmokeCurling>
  );
}
`,
  }),

  P("matrix-binary-curtain", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Matrix Binary Curtain",
    description: "Alternating columns of digital binary 1s and 0s forming a structured computational veil.",
    tags: ["binary", "code", "curtain", "matrix", "bits"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "full-bleed",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "neon-on-dark",
    },
    fingerprint: {
      interactionModel: "passive-binary-curtain",
      visualModel: "columnar-binary-digits",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "binary-code-backdrop",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface MatrixBinaryCurtainProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function MatrixBinaryCurtain({ className, children, ...props }: MatrixBinaryCurtainProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-emerald-400 overflow-hidden font-mono", className)} {...props}>
      <div className="absolute inset-0 flex justify-around pointer-events-none opacity-20 -z-10 text-[10px] leading-tight select-none">
        {Array.from({ length: 12 }).map((_, col) => (
          <div key={col} className="flex flex-col">
            {Array.from({ length: 24 }).map((_, row) => (
              <span key={row}>{(col + row) % 2 === 0 ? "1" : "0"}</span>
            ))}
          </div>
        ))}
      </div>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { MatrixBinaryCurtain } from "./matrix-binary-curtain";

export default function MatrixBinaryCurtainDemo() {
  return (
    <MatrixBinaryCurtain className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-emerald-500/30 bg-black/70 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-emerald-400">Binary Curtain</h3>
        <p className="text-xs text-white/70 mt-1 font-mono">Structured columns of binary code bits.</p>
      </div>
    </MatrixBinaryCurtain>
  );
}
`,
  }),

  P("astronomy-stellar-orbits", {
    category: "backgrounds",
    subcategory: "ambient",
    title: "Astronomy Stellar Orbits",
    description: "Multi-body gravitational orbits tracing complex intersecting Spirograph rosettes.",
    tags: ["spirograph", "astronomy", "stellar", "rosette", "orbits"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "full-bleed",
      density: "airy",
      shapeLanguage: "pill",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "passive-stellar-rosette",
      visualModel: "spirograph-gravitational-rosette",
      motionModel: "none",
      layoutModel: "center-anchored-radial",
      semanticPurpose: "astronomical-rosette-canvas",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface AstronomyStellarOrbitsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function AstronomyStellarOrbits({ className, children, ...props }: AstronomyStellarOrbitsProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 -z-10">
        <svg className="w-[500px] h-[500px]" viewBox="0 0 200 200">
          {Array.from({ length: 8 }).map((_, i) => (
            <ellipse
              key={i}
              cx="100"
              cy="100"
              rx="75"
              ry="30"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
              transform={\`rotate(\${i * 22.5} 100 100)\`}
            />
          ))}
        </svg>
      </div>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { AstronomyStellarOrbits } from "./astronomy-stellar-orbits";

export default function AstronomyStellarOrbitsDemo() {
  return (
    <AstronomyStellarOrbits className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-ink">Gravitational Rosette</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Multi-body orbital resonance rosettes.</p>
      </div>
    </AstronomyStellarOrbits>
  );
}
`,
  }),

  P("prismatic-caustic-mesh", {
    category: "backgrounds",
    subcategory: "ambient",
    title: "Prismatic Caustic Mesh",
    description: "Chromatic optical glass caustic refractions separating into spectral rainbow beams.",
    tags: ["caustic", "prismatic", "optics", "rainbow", "glass"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "luxury",
      macrostructure: "full-bleed",
      density: "airy",
      shapeLanguage: "soft",
      motionLanguage: "none",
      typographyStyle: "serif-display",
      colorStrategy: "neon-on-dark",
    },
    fingerprint: {
      interactionModel: "passive-glass-caustics",
      visualModel: "prismatic-chromatic-refraction",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "crystal-caustics-layer",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface PrismaticCausticMeshProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function PrismaticCausticMesh({ className, children, ...props }: PrismaticCausticMeshProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-white overflow-hidden", className)} {...props}>
      <div
        className="absolute -top-20 -right-20 w-[600px] h-[400px] pointer-events-none opacity-30 -z-10 rotate-12 blur-3xl"
        style={{
          background: "linear-gradient(135deg, rgba(239, 68, 68, 0.4), rgba(59, 130, 246, 0.4), rgba(16, 185, 129, 0.4))",
        }}
      />
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { PrismaticCausticMesh } from "./prismatic-caustic-mesh";

export default function PrismaticCausticMeshDemo() {
  return (
    <PrismaticCausticMesh className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-white/20 bg-black/70 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-serif text-white">Prismatic Caustic</h3>
        <p className="text-xs text-white/70 mt-1 font-sans">Crystal glass chromatic dispersion mesh.</p>
      </div>
    </PrismaticCausticMesh>
  );
}
`,
  }),

  P("vector-force-field", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Vector Force Field",
    description: "Grid of oriented physics force vectors illustrating electromagnetic flux lines.",
    tags: ["vector", "physics", "force", "field", "flux"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "full-bleed",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "passive-vector-flux",
      visualModel: "oriented-arrow-grid",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "electromagnetic-vector-texture",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface VectorForceFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function VectorForceField({ className, children, ...props }: VectorForceFieldProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="vector-pat" width="40" height="40" patternUnits="userSpaceOnUse">
            <line x1="12" y1="28" x2="28" y2="12" stroke="currentColor" strokeWidth="1" />
            <polygon points="28,12 22,14 26,18" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#vector-pat)" />
      </svg>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { VectorForceField } from "./vector-force-field";

export default function VectorForceFieldDemo() {
  return (
    <VectorForceField className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-ink">Magnetic Vector Field</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Directional force flux vector arrows.</p>
      </div>
    </VectorForceField>
  );
}
`,
  }),

  P("halftone-circular-burst", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Halftone Circular Burst",
    description: "Radial burst of concentric halftone dots scaling upward toward center.",
    tags: ["halftone", "burst", "radial", "pop", "dots"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "playful",
      macrostructure: "full-bleed",
      density: "medium",
      shapeLanguage: "pill",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "passive-halftone-burst",
      visualModel: "radial-dot-burst-explosion",
      motionModel: "none",
      layoutModel: "center-anchored-radial",
      semanticPurpose: "comic-halftone-explosion",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface HalftoneCircularBurstProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function HalftoneCircularBurst({ className, children, ...props }: HalftoneCircularBurstProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15 -z-10">
        <svg className="w-[500px] h-[500px]" viewBox="0 0 200 200">
          {[20, 35, 50, 65, 80].map((r, ringIdx) => {
            const dots = 12 + ringIdx * 6;
            return Array.from({ length: dots }).map((_, dotIdx) => {
              const angle = (dotIdx / dots) * Math.PI * 2;
              const x = 100 + r * Math.cos(angle);
              const y = 100 + r * Math.sin(angle);
              return <circle key={\`\${ringIdx}-\${dotIdx}\`} cx={x} cy={y} r={ringIdx * 0.6 + 1} fill="currentColor" />;
            });
          })}
        </svg>
      </div>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { HalftoneCircularBurst } from "./halftone-circular-burst";

export default function HalftoneCircularBurstDemo() {
  return (
    <HalftoneCircularBurst className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-sans text-ink">Halftone Radial Burst</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Concentric radial scaling halftone dots.</p>
      </div>
    </HalftoneCircularBurst>
  );
}
`,
  }),

  P("topographic-peak-contours", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Topographic Peak Contours",
    description: "Mountain summit peak with concentric topological elevation rings and elevation benchmarks.",
    tags: ["peak", "summit", "topographic", "mountain", "elevation"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "organic",
      macrostructure: "full-bleed",
      density: "medium",
      shapeLanguage: "soft",
      motionLanguage: "none",
      typographyStyle: "humanist",
      colorStrategy: "muted-earth",
    },
    fingerprint: {
      interactionModel: "passive-mountain-peak",
      visualModel: "concentric-summit-isobars",
      motionModel: "none",
      layoutModel: "center-anchored-radial",
      semanticPurpose: "mountain-elevation-map",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface TopographicPeakContoursProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function TopographicPeakContours({ className, children, ...props }: TopographicPeakContoursProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400">
        <path d="M 300 200 m -40, 0 a 40,25 0 1,0 80,0 a 40,25 0 1,0 -80,0" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M 300 200 m -70, 0 a 70,45 0 1,0 140,0 a 70,45 0 1,0 -140,0" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M 300 200 m -110, 0 a 110,70 0 1,0 220,0 a 110,70 0 1,0 -220,0" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M 300 200 m -160, 0 a 160,105 0 1,0 320,0 a 160,105 0 1,0 -320,0" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="300" cy="200" r="2" fill="currentColor" />
      </svg>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { TopographicPeakContours } from "./topographic-peak-contours";

export default function TopographicPeakContoursDemo() {
  return (
    <TopographicPeakContours className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-sans text-ink">Summit Peak Isobars</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">High-altitude alpine topographic peak contours.</p>
      </div>
    </TopographicPeakContours>
  );
}
`,
  }),

  P("retro-synth-sun", {
    category: "backgrounds",
    subcategory: "ambient",
    title: "Retro Synth Sun",
    description: "Classic 80s outrun synthwave sun silhouette with horizontal sliced blind cutouts.",
    tags: ["synthwave", "sun", "retro", "80s", "outrun"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "retro",
      macrostructure: "full-bleed",
      density: "airy",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "neon-on-dark",
    },
    fingerprint: {
      interactionModel: "passive-outrun-sun",
      visualModel: "sliced-horizontal-sun-disc",
      motionModel: "none",
      layoutModel: "center-anchored-radial",
      semanticPurpose: "synthwave-sunset-disc",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface RetroSynthSunProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function RetroSynthSun({ className, children, ...props }: RetroSynthSunProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-white overflow-hidden", className)} {...props}>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-gradient-to-b from-amber-400 via-pink-500 to-purple-600 pointer-events-none opacity-70 -z-10 overflow-hidden shadow-[0_0_50px_rgba(236,72,153,0.5)]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "repeating-linear-gradient(to bottom, transparent 0px, transparent 10px, #020617 10px, #020617 14px)",
          }}
        />
      </div>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { RetroSynthSun } from "./retro-synth-sun";

export default function RetroSynthSunDemo() {
  return (
    <RetroSynthSun className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-pink-500/30 bg-black/70 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-pink-400">Outrun Sunset Disc</h3>
        <p className="text-xs text-white/70 mt-1 font-mono">Horizontal sliced retro sunset blinds.</p>
      </div>
    </RetroSynthSun>
  );
}
`,
  }),

  P("geometric-penrose-tiles", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Geometric Penrose Tiles",
    description: "Aperiodic non-repeating Penrose kite and dart rhombus tessellation with 5-fold local symmetry.",
    tags: ["penrose", "aperiodic", "rhombus", "tessellation", "geometry"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "full-bleed",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "geometric",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "passive-penrose-tiling",
      visualModel: "aperiodic-rhombus-lattice",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "aperiodic-tessellation-texture",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface GeometricPenroseTilesProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function GeometricPenroseTiles({ className, children, ...props }: GeometricPenroseTilesProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="penrose-pat" width="64" height="64" patternUnits="userSpaceOnUse">
            <polygon points="32,4 58,24 32,44 6,24" fill="none" stroke="currentColor" strokeWidth="1" />
            <polygon points="32,24 58,44 32,64 6,44" fill="none" stroke="currentColor" strokeWidth="1" />
            <line x1="32" y1="4" x2="32" y2="44" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#penrose-pat)" />
      </svg>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { GeometricPenroseTiles } from "./geometric-penrose-tiles";

export default function GeometricPenroseTilesDemo() {
  return (
    <GeometricPenroseTiles className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-ink">Penrose Aperiodic Tiling</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Kite and dart five-fold aperiodic geometry.</p>
      </div>
    </GeometricPenroseTiles>
  );
}
`,
  }),
];

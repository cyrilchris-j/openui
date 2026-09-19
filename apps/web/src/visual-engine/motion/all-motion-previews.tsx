import * as React from "react";
import { SwarmFlock } from "../backgrounds/swarm-flock.js";
import { MagnetNeedles } from "../backgrounds/magnet-needles.js";
import { LaserFlow } from "../backgrounds/laser-flow.js";
import { HalftoneMask } from "../backgrounds/halftone-mask.js";
import { ElasticMesh } from "../backgrounds/elastic-mesh.js";
import { RippleDistortion } from "../backgrounds/ripple-distortion.js";
import { TopographicWaves } from "../backgrounds/noise-waves.js";

// 1. glow-cursor-trail
export function GlowCursorTrailPreview() {
  const [pos, setPos] = React.useState({ x: 50, y: 50 });
  return (
    <div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
      }}
      className="relative w-full h-full bg-[#080b14] overflow-hidden flex items-center justify-center cursor-crosshair select-none"
    >
      <div
        className="absolute w-40 h-40 rounded-full bg-radial from-oxide via-amber-500/40 to-transparent blur-2xl pointer-events-none transition-all duration-75"
        style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-50%, -50%)" }}
      />
      <div
        className="absolute w-12 h-12 rounded-full border-2 border-amber-300 pointer-events-none transition-all duration-150 flex items-center justify-center"
        style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-50%, -50%)" }}
      >
        <div className="w-2 h-2 rounded-full bg-white shadow-lg shadow-white" />
      </div>
      <span className="font-mono text-xs text-white/90 z-10 font-bold tracking-widest uppercase">
        GLOW CURSOR TRAIL
      </span>
    </div>
  );
}

// 2. scroll-expand-card
export function ScrollExpandCardPreview() {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <div className="w-full h-full bg-[#090c16] flex items-center justify-center p-3 select-none">
      <div
        onClick={() => setExpanded(!expanded)}
        className={`cursor-pointer rounded-2xl bg-paper border border-line p-3 transition-all duration-500 shadow-2xl flex flex-col justify-between ${
          expanded ? "w-64 h-36 border-oxide bg-gradient-to-br from-paper via-white to-orange-50" : "w-44 h-24"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-[8px] text-oxide font-bold uppercase">SCROLL PROGRESS</span>
          <span className="font-mono text-[8px] px-1.5 py-0.5 rounded bg-surface text-ink">
            {expanded ? "100%" : "25%"}
          </span>
        </div>
        <span className="font-display font-black text-sm text-ink">{expanded ? "Full-Bleed Hero Surface" : "Compact Card Deck"}</span>
        <span className="font-mono text-[8px] text-graphite font-semibold">CLICK TO TOGGLE EXPANSION</span>
      </div>
    </div>
  );
}

// 3. ripple-distortion-lens
export function RippleDistortionLensPreview() {
  return (
    <div className="relative w-full h-full bg-[#060812] overflow-hidden">
      <RippleDistortion />
      <span className="absolute bottom-2 left-3 font-mono text-[9px] text-sky-400 font-bold uppercase tracking-wider pointer-events-none">
        RIPPLE DISTORTION
      </span>
    </div>
  );
}

// 4. elastic-mesh-grid
export function ElasticMeshGridPreview() {
  return (
    <div className="relative w-full h-full bg-[#070914] overflow-hidden">
      <ElasticMesh />
      <span className="absolute top-2 left-3 font-mono text-[9px] text-oxide font-bold uppercase tracking-wider pointer-events-none">
        ELASTIC MESH GRID
      </span>
    </div>
  );
}

// 5. swarm-cursor-flock
export function SwarmCursorFlockPreview() {
  return (
    <div className="relative w-full h-full bg-[#070912] overflow-hidden">
      <SwarmFlock />
      <span className="absolute top-2 right-3 font-mono text-[9px] text-cyan-400 font-bold uppercase tracking-wider pointer-events-none">
        SWARM BOIDS FLOCK
      </span>
    </div>
  );
}

// 6. halftone-reveal-mask
export function HalftoneRevealMaskPreview() {
  return (
    <div className="relative w-full h-full bg-[#090b14] overflow-hidden flex items-center justify-center">
      <HalftoneMask />
      <span className="absolute bottom-2 font-mono text-[9px] text-amber-300 font-bold uppercase tracking-wider pointer-events-none">
        HALFTONE REVEAL
      </span>
    </div>
  );
}

// 7. pixel-swap-grid
export function PixelSwapGridPreview() {
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full h-full bg-[#070a12] p-4 flex flex-col items-center justify-center select-none">
      <div className="grid grid-cols-8 gap-1.5">
        {[...Array(32)].map((_, i) => (
          <div
            key={i}
            className={`w-5 h-5 rounded-xs transition-all duration-300 ${
              (i + tick) % 4 === 0
                ? "bg-oxide scale-110 shadow-md shadow-oxide/50"
                : (i + tick) % 4 === 1
                ? "bg-sky-500"
                : (i + tick) % 4 === 2
                ? "bg-amber-400"
                : "bg-slate-800"
            }`}
          />
        ))}
      </div>
      <span className="mt-2 font-mono text-[8px] text-white/80 font-bold uppercase tracking-widest">
        PIXEL SWAP MOSAIC
      </span>
    </div>
  );
}

// 8. cursor-grid-mesh
export function CursorGridMeshPreview() {
  const [hovered, setHovered] = React.useState<number | null>(14);
  return (
    <div className="w-full h-full bg-[#060810] p-4 flex flex-col items-center justify-center select-none">
      <div className="grid grid-cols-8 gap-1.5">
        {[...Array(32)].map((_, i) => (
          <div
            key={i}
            onMouseEnter={() => setHovered(i)}
            className={`w-6 h-6 rounded-md border transition-all duration-150 cursor-pointer ${
              hovered === i
                ? "bg-cyan-400 border-white shadow-lg shadow-cyan-500/60 scale-125 z-10"
                : "border-slate-800/80 bg-slate-950 hover:border-cyan-600"
            }`}
          />
        ))}
      </div>
      <span className="mt-2 font-mono text-[8px] text-cyan-300 font-bold uppercase tracking-wider">
        HOVER TO ILLUMINATE CELLS
      </span>
    </div>
  );
}

// 9. animated-content-fade
export function AnimatedContentFadePreview() {
  return (
    <div className="w-full h-full bg-[#080a14] p-4 flex flex-col items-center justify-center gap-2 select-none">
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          className="w-56 p-2.5 rounded-xl bg-paper border border-line text-xs font-mono flex items-center justify-between shadow-lg animate-pulse"
          style={{ animationDelay: `${n * 300}ms` }}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-ink font-bold font-display">CASCADE ITEM 0{n}</span>
          </div>
          <span className="text-[9px] text-graphite font-mono">FADE TRANSITION</span>
        </div>
      ))}
    </div>
  );
}

// 10. fade-content-blur
export function FadeContentBlurPreview() {
  return (
    <div className="w-full h-full bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 p-4 flex items-center justify-center select-none group cursor-pointer">
      <div className="w-56 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/30 shadow-2xl filter blur-[2px] group-hover:blur-none transition-all duration-300 text-center">
        <span className="font-mono text-[9px] text-cyan-300 uppercase tracking-widest font-bold">AERO BLUR</span>
        <h4 className="font-display font-black text-sm text-white mt-1">Crystalline Focus</h4>
        <span className="font-mono text-[8px] text-slate-300 mt-2 block">HOVER TO DISSOLVE GAUSSIAN BLUR</span>
      </div>
    </div>
  );
}

// 11. electric-border-trace
export function ElectricBorderTracePreview() {
  return (
    <div className="w-full h-full bg-[#070912] p-4 flex items-center justify-center select-none">
      <div className="relative p-[2.5px] rounded-2xl overflow-hidden shadow-2xl">
        <div className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,#00ffff,#ba442c,#f59e0b,#00ffff)] animate-spin" style={{ animationDuration: "3s" }} />
        <div className="relative px-6 py-4 rounded-[14px] bg-[#0b0e17] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          <span className="text-cyan-400">⚡</span>
          <span>HIGH VOLTAGE TRACE</span>
        </div>
      </div>
    </div>
  );
}

// 12. orbit-images-cluster
export function OrbitImagesClusterPreview() {
  return (
    <div className="w-full h-full bg-[#070914] flex items-center justify-center select-none relative overflow-hidden">
      <div className="relative w-40 h-40 flex items-center justify-center">
        <div className="absolute inset-0 border border-slate-800 rounded-full" />
        <div className="absolute inset-0 animate-[spin_6s_linear_infinite]">
          <div className="absolute top-0 left-16 w-8 h-8 rounded-xl bg-oxide text-white font-mono text-xs flex items-center justify-center shadow-lg font-bold">
            01
          </div>
          <div className="absolute bottom-0 right-16 w-8 h-8 rounded-xl bg-sky-500 text-white font-mono text-xs flex items-center justify-center shadow-lg font-bold">
            02
          </div>
          <div className="absolute left-0 top-16 w-8 h-8 rounded-xl bg-amber-500 text-white font-mono text-xs flex items-center justify-center shadow-lg font-bold">
            03
          </div>
        </div>
        <div className="w-12 h-12 rounded-full bg-paper text-ink flex items-center justify-center font-mono text-sm font-bold shadow-xl border border-line">
          ◈
        </div>
      </div>
    </div>
  );
}

// 13. pixel-transition-curtain
export function PixelTransitionCurtainPreview() {
  const [active, setActive] = React.useState(true);
  React.useEffect(() => {
    const id = setInterval(() => setActive((a) => !a), 1500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full h-full bg-[#080c16] flex items-center justify-center p-4 select-none relative overflow-hidden">
      <div className="relative w-60 h-32 rounded-2xl bg-paper border border-line p-3 flex flex-col justify-between shadow-2xl overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-r from-oxide via-slate-900 to-sky-600 transition-all duration-700 ${
            active ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)" }}
        />
        <div className="relative z-10 flex justify-between">
          <span className="font-mono text-[8px] text-oxide font-bold uppercase">PIXEL CURTAIN WIPE</span>
          <span className="font-mono text-[8px] text-graphite font-bold">STATE: {active ? "A" : "B"}</span>
        </div>
        <h4 className="relative z-10 font-display font-black text-sm text-ink">View Transition</h4>
        <span className="relative z-10 font-mono text-[8px] text-graphite">DITHER CURTAIN WIPING</span>
      </div>
    </div>
  );
}

// 14. glare-hover-card
export function GlareHoverCardPreview() {
  const [tilt, setTilt] = React.useState({ x: 10, y: -5 });
  return (
    <div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setTilt({ x: ((e.clientX - r.left) / r.width - 0.5) * 35, y: ((e.clientY - r.top) / r.height - 0.5) * -35 });
      }}
      className="w-full h-full bg-[#070a14] p-4 flex items-center justify-center select-none [perspective:700px] cursor-pointer"
    >
      <div
        className="w-52 h-32 rounded-2xl p-[2px] shadow-2xl transition-transform duration-75"
        style={{
          background: `linear-gradient(${tilt.x * 5 + 45}deg, #ba442c, #38bdf8, #f59e0b, #10b981)`,
          transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        }}
      >
        <div className="w-full h-full rounded-[14px] bg-black/90 p-3 flex flex-col justify-between text-white font-mono">
          <div className="flex justify-between items-center">
            <span className="text-amber-300 font-bold text-[9px]">★ HOLOGRAPHIC FOIL</span>
            <span className="text-[8px] text-slate-400">GEN-01</span>
          </div>
          <h4 className="font-display font-black text-base tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-sky-200 to-rose-200">
            SPECULAR GLARE
          </h4>
          <span className="text-[8px] text-slate-400">MOVE POINTER TO SHIFT FOIL</span>
        </div>
      </div>
    </div>
  );
}

// 15. antigravity-float-mesh
export function AntigravityFloatMeshPreview() {
  return (
    <div className="w-full h-full bg-[#080b14] relative flex items-center justify-center select-none overflow-hidden p-4">
      <div className="absolute w-24 h-16 rounded-xl bg-surface border border-line -translate-x-12 -translate-y-6 animate-bounce shadow-md" style={{ animationDuration: "3.2s" }} />
      <div className="relative z-10 w-36 h-20 rounded-2xl bg-paper border border-oxide p-3 shadow-2xl animate-bounce flex flex-col justify-between" style={{ animationDuration: "2.4s" }}>
        <span className="font-mono text-[8px] text-oxide font-bold uppercase">ZERO GRAVITY</span>
        <span className="font-display font-black text-xs text-ink">Antigravity Mesh</span>
        <span className="font-mono text-[7px] text-graphite">SUSPENDED PARTICLES</span>
      </div>
      <div className="absolute w-28 h-18 rounded-xl bg-surface border border-line translate-x-14 translate-y-6 animate-bounce shadow-md" style={{ animationDuration: "3.8s" }} />
    </div>
  );
}

// 16. logo-loop-ticker
export function LogoLoopTickerPreview() {
  return (
    <div className="w-full h-full bg-[#070912] flex flex-col items-center justify-center gap-2 select-none overflow-hidden py-3">
      <div className="w-full overflow-hidden">
        <div className="inline-flex gap-8 animate-marquee font-mono text-sm font-bold text-white whitespace-nowrap">
          <span className="text-oxide">⚡ OPENUI</span>
          <span className="text-sky-400">◈ SPATIAL 3D</span>
          <span className="text-amber-400">⌘ MOTION ENGINE</span>
          <span className="text-emerald-400">✦ GENERATIVE</span>
          <span className="text-oxide">⚡ OPENUI</span>
          <span className="text-sky-400">◈ SPATIAL 3D</span>
        </div>
      </div>
      <span className="font-mono text-[8px] text-slate-400 uppercase tracking-widest font-bold">
        DUAL DIRECTION KINETIC LOOP
      </span>
    </div>
  );
}

// 17. target-cursor-reticle
export function TargetCursorReticlePreview() {
  const [coords, setCoords] = React.useState({ x: 140, y: 80 });
  return (
    <div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setCoords({ x: Math.floor(e.clientX - r.left), y: Math.floor(e.clientY - r.top) });
      }}
      className="relative w-full h-full bg-[#080b12] flex items-center justify-center select-none overflow-hidden cursor-crosshair"
    >
      <div className="absolute top-2 left-3 font-mono text-[9px] text-emerald-400 font-bold">
        HUD TARGET ACQUISITION: X:{coords.x} Y:{coords.y}
      </div>
      <div className="relative w-24 h-24 border border-emerald-500/50 rounded-full flex items-center justify-center">
        <div className="w-16 h-16 border border-emerald-400 rounded-full animate-ping opacity-50" />
        <div className="w-8 h-8 border border-emerald-400 flex items-center justify-center text-emerald-400 font-mono text-sm font-bold">
          +
        </div>
      </div>
      <span className="absolute bottom-2 right-3 font-mono text-[9px] text-emerald-400 font-bold">
        LOCK: 100% [READY]
      </span>
    </div>
  );
}

// 18. magic-rings-pulsar
export function MagicRingsPulsarPreview() {
  return (
    <div className="relative w-full h-full bg-[#060814] flex items-center justify-center select-none overflow-hidden">
      {[1, 2, 3, 4].map((n) => (
        <div
          key={n}
          className="absolute rounded-full border-2 border-oxide animate-ping opacity-60"
          style={{
            width: `${n * 35}px`,
            height: `${n * 35}px`,
            animationDuration: `${2 + n * 0.5}s`,
          }}
        />
      ))}
      <div className="relative z-10 w-10 h-10 rounded-full bg-amber-400 shadow-xl shadow-amber-400/50 flex items-center justify-center font-mono text-xs font-bold text-ink">
        ◎
      </div>
      <span className="absolute bottom-2 font-mono text-[9px] text-amber-300 font-bold uppercase tracking-wider">
        CONCENTRIC PULSAR SHOCKWAVE
      </span>
    </div>
  );
}

// 19. laser-flow-field
export function LaserFlowFieldPreview() {
  return (
    <div className="relative w-full h-full bg-[#050710] overflow-hidden">
      <LaserFlow />
      <span className="absolute top-2 right-3 font-mono text-[9px] text-cyan-300 font-bold uppercase tracking-wider pointer-events-none">
        LASER BEAM FLOW
      </span>
    </div>
  );
}

// 20. magnet-lines-field
export function MagnetLinesFieldPreview() {
  return (
    <div className="relative w-full h-full bg-[#060912] overflow-hidden">
      <MagnetNeedles />
      <span className="absolute bottom-2 left-3 font-mono text-[9px] text-amber-400 font-bold uppercase tracking-wider pointer-events-none">
        MAGNETIC VECTOR FIELD
      </span>
    </div>
  );
}

// 21. ghost-cursor-lag
export function GhostCursorLagPreview() {
  const [pos, setPos] = React.useState({ x: 120, y: 70 });
  return (
    <div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      className="relative w-full h-full bg-[#080a14] overflow-hidden flex items-center justify-center cursor-crosshair select-none"
    >
      {[300, 200, 100, 0].map((delay, idx) => (
        <div
          key={delay}
          className="absolute w-10 h-10 rounded-full border transition-all duration-300 flex items-center justify-center"
          style={{
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            transform: "translate(-50%, -50%)",
            transitionDelay: `${delay}ms`,
            borderColor: idx === 3 ? "#ffffff" : idx === 2 ? "#38bdf8" : idx === 1 ? "#ba442c" : "#f59e0b",
            opacity: 1 - idx * 0.25,
          }}
        >
          <div className="w-2 h-2 rounded-full bg-white" />
        </div>
      ))}
      <span className="absolute bottom-2 font-mono text-[9px] text-white/80 font-bold uppercase tracking-wider">
        GHOST SILHOUETTE TRAIL
      </span>
    </div>
  );
}

// 22. gradual-blur-backdrop
export function GradualBlurBackdropPreview() {
  return (
    <div className="relative w-full h-full bg-gradient-to-tr from-oxide via-amber-500 to-sky-500 p-4 select-none flex items-center justify-center overflow-hidden">
      <div className="w-56 p-4 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/40 shadow-2xl text-center text-white">
        <span className="font-mono text-[8px] uppercase tracking-widest font-bold">GRADUAL BACKDROP</span>
        <h4 className="font-display font-black text-base mt-1">Aero Refraction</h4>
        <span className="font-mono text-[8px] text-white/80 mt-1 block">PROGRESSIVE MULTI-STOP BLUR</span>
      </div>
    </div>
  );
}

// 23. click-spark-burst
export function ClickSparkBurstPreview() {
  const [burst, setBurst] = React.useState(0);
  return (
    <div
      onClick={() => setBurst((b) => b + 1)}
      className="relative w-full h-full p-4 flex flex-col items-center justify-center cursor-pointer select-none bg-[#090b14]"
    >
      <div className="flex gap-2">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-full bg-amber-400 animate-ping shadow-lg shadow-amber-400/80"
            style={{ animationDuration: `${0.5 + i * 0.15}s` }}
          />
        ))}
      </div>
      <button className="mt-3 px-5 py-2 rounded-xl bg-oxide text-white font-mono text-xs font-bold uppercase shadow-xl hover:scale-105 transition-transform">
        ⚡ CLICK BURST ({burst})
      </button>
      <span className="font-mono text-[8px] text-slate-400 mt-2 font-semibold">CLICK ANYWHERE TO EMIT SPARKS</span>
    </div>
  );
}

// 24. magnet-field-pull
export function MagnetFieldPullPreview() {
  return (
    <div className="relative w-full h-full bg-[#060812] overflow-hidden">
      <MagnetNeedles />
      <span className="absolute top-2 left-3 font-mono text-[9px] text-oxide font-bold uppercase tracking-wider pointer-events-none">
        GRAVITATIONAL PULL
      </span>
    </div>
  );
}

// 25. strands-motion-wave
export function StrandsMotionWavePreview() {
  return (
    <div className="relative w-full h-full bg-[#080b14] overflow-hidden">
      <TopographicWaves linesCount={14} />
      <span className="absolute bottom-2 right-3 font-mono text-[9px] text-sky-300 font-bold uppercase tracking-wider pointer-events-none">
        HARMONIC STRANDS WAVE
      </span>
    </div>
  );
}

// 26. sticker-peel-corner (Vivid holographic sticker with curled corner)
export function StickerPeelCornerPreview() {
  const [peeled, setPeeled] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setPeeled(true)}
      onMouseLeave={() => setPeeled(false)}
      onClick={() => setPeeled(!peeled)}
      className="relative w-full h-full bg-[#0a0d18] flex items-center justify-center p-4 cursor-pointer select-none overflow-hidden"
    >
      <div className="relative w-56 h-32 rounded-2xl bg-gradient-to-tr from-oxide via-amber-500 to-rose-600 p-4 shadow-2xl transition-all duration-300 overflow-hidden">
        {/* Corner curl triangle with realistic shadow */}
        <div
          className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-amber-100 via-amber-200 to-amber-400 shadow-2xl transition-all duration-300 transform origin-top-right ${
            peeled ? "scale-150 rotate-6" : "scale-100"
          }`}
          style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
        />
        <div className="relative z-10 flex flex-col justify-between h-full text-white">
          <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-amber-200">
            ★ HOLOGRAPHIC STICKER
          </span>
          <div>
            <h4 className="font-display font-black text-lg tracking-tight">PEEL 3D</h4>
            <span className="font-mono text-[8px] text-white/90">HOVER TO CURL CORNER</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 27. pixel-trail-emitter (Active glowing pixel emitter canvas)
export function PixelTrailEmitterPreview() {
  return (
    <div className="relative w-full h-full bg-[#080d18] flex flex-col items-center justify-center select-none overflow-hidden p-4">
      <div className="relative w-56 h-28 rounded-2xl bg-[#0c1222] border border-cyan-500/40 p-3 flex flex-col justify-between shadow-2xl overflow-hidden">
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2.5 h-2.5 bg-cyan-400 animate-pulse rounded-xs shadow-md shadow-cyan-400/50"
            style={{
              left: `${10 + ((i * 29) % 75)}%`,
              top: `${15 + ((i * 23) % 65)}%`,
              animationDuration: `${0.8 + i * 0.15}s`,
            }}
          />
        ))}
        <span className="relative z-10 font-mono text-[9px] text-cyan-300 font-bold uppercase tracking-wider">
          8-BIT PIXEL DUST
        </span>
        <h4 className="relative z-10 font-display font-black text-sm text-white">Pixel Emitter</h4>
        <span className="relative z-10 font-mono text-[8px] text-slate-400">DECAYING TRAIL PARTICLES</span>
      </div>
    </div>
  );
}

// 28. cubes-matrix-spin (3D Isometric Cube Spin Lattice)
export function CubesMatrixSpinPreview() {
  return (
    <div className="w-full h-full bg-[#080b14] flex items-center justify-center gap-3 select-none [perspective:700px] p-4">
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          className="w-14 h-14 rounded-xl bg-gradient-to-tr from-oxide to-amber-500 text-white font-mono text-sm font-bold flex flex-col items-center justify-center shadow-2xl animate-spin"
          style={{ animationDuration: `${3 + n * 1.5}s` }}
        >
          <span>0{n}</span>
          <span className="text-[7px]">3D</span>
        </div>
      ))}
    </div>
  );
}

// 29. metallic-paint-canvas (Liquid mercury metallic chrome surface)
export function MetallicPaintCanvasPreview() {
  return (
    <div className="w-full h-full bg-zinc-950 p-4 flex items-center justify-center select-none">
      <div className="w-60 h-32 rounded-2xl p-[2px] bg-gradient-to-r from-slate-300 via-zinc-100 to-slate-400 shadow-2xl">
        <div className="w-full h-full rounded-[14px] bg-gradient-to-tr from-zinc-900 via-zinc-700 to-zinc-950 p-3.5 flex flex-col justify-between text-white">
          <div className="flex justify-between items-center">
            <span className="font-mono text-[9px] text-zinc-300 font-bold uppercase tracking-wider">
              LIQUID MERCURY
            </span>
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          </div>
          <h4 className="font-display font-black text-lg tracking-tight">Metallic Chrome</h4>
          <span className="font-mono text-[8px] text-zinc-400">MOUSE TURBULENCE REFLECTION</span>
        </div>
      </div>
    </div>
  );
}

// 30. noise-surface-drift (Organic simplex noise displacement)
export function NoiseSurfaceDriftPreview() {
  return (
    <div className="relative w-full h-full bg-[#090d16] overflow-hidden">
      <TopographicWaves linesCount={12} />
      <span className="absolute top-2 left-3 font-mono text-[9px] text-amber-300 font-bold uppercase tracking-wider pointer-events-none">
        ORGANIC NOISE DRIFT
      </span>
    </div>
  );
}

// 31. shape-blur-lens (Focal shape masking with backdrop refraction)
export function ShapeBlurLensPreview() {
  return (
    <div className="relative w-full h-full bg-gradient-to-tr from-oxide via-amber-400 to-sky-500 p-4 select-none flex items-center justify-center overflow-hidden">
      <div className="w-28 h-28 rounded-full border-2 border-white/80 bg-white/30 backdrop-blur-2xl shadow-2xl flex flex-col items-center justify-center font-mono text-xs font-bold text-ink">
        <span className="font-display font-black text-sm">FOCAL LENS</span>
        <span className="font-mono text-[8px] text-graphite">REFRACTION</span>
      </div>
    </div>
  );
}

// 32. crosshair-reticle-aim (Precision coordinate telemetry HUD)
export function CrosshairReticleAimPreview() {
  const [coords, setCoords] = React.useState({ x: 160, y: 90 });
  return (
    <div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setCoords({ x: Math.floor(e.clientX - r.left), y: Math.floor(e.clientY - r.top) });
      }}
      className="relative w-full h-full bg-[#080d18] p-4 select-none flex items-center justify-center cursor-crosshair overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#131c31_1px,transparent_1px),linear-gradient(to_bottom,#131c31_1px,transparent_1px)] bg-[size:20px_20px]" />
      <div className="relative z-10 w-16 h-16 border border-sky-400 rounded-full flex items-center justify-center text-sky-400 font-mono text-base font-bold shadow-lg shadow-sky-500/40">
        +
      </div>
      <span className="absolute top-2 left-3 font-mono text-[9px] text-sky-400 font-bold">
        TELEMETRY: X:{coords.x} Y:{coords.y}
      </span>
      <span className="absolute bottom-2 right-3 font-mono text-[9px] text-sky-400 font-bold">
        STATUS: TRACKING
      </span>
    </div>
  );
}

// 33. image-trail-cursor
export function ImageTrailCursorPreview() {
  return (
    <div className="relative w-full h-full bg-[#070a14] p-4 flex items-center justify-center select-none overflow-hidden">
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          className="w-40 h-24 rounded-xl border border-line bg-paper p-3 shadow-2xl transition-all duration-300 flex flex-col justify-between absolute"
          style={{
            transform: `translate(${n * 16 - 32}px, ${n * 8 - 16}px) rotate(${n * 4 - 8}deg)`,
            zIndex: n,
          }}
        >
          <span className="font-mono text-[8px] text-oxide font-bold uppercase">TRAIL 0{n}</span>
          <span className="font-display font-bold text-xs text-ink">Cascading Burst</span>
        </div>
      ))}
    </div>
  );
}

// 34. ribbons-flow-field
export function RibbonsFlowFieldPreview() {
  return (
    <div className="relative w-full h-full bg-[#060814] overflow-hidden flex items-center justify-center select-none">
      <svg className="w-full h-full" viewBox="0 0 320 200">
        <path
          d="M 10,100 C 80,20 120,180 200,100 S 280,20 310,100"
          fill="none"
          stroke="#ba442c"
          strokeWidth="4"
          className="animate-pulse"
        />
        <path
          d="M 10,120 C 80,40 120,200 200,120 S 280,40 310,120"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="3"
        />
      </svg>
      <span className="absolute bottom-2 left-3 font-mono text-[9px] text-white font-bold uppercase tracking-wider">
        3D FLOWING RIBBONS
      </span>
    </div>
  );
}

// 35. splash-cursor-liquid
export function SplashCursorLiquidPreview() {
  const [ripples, setRipples] = React.useState<number[]>([1, 2]);
  return (
    <div
      onClick={() => setRipples((r) => [...r.slice(-4), Date.now()])}
      className="relative w-full h-full bg-[#050712] flex items-center justify-center cursor-pointer select-none overflow-hidden p-4"
    >
      {ripples.map((k) => (
        <div key={k} className="absolute w-24 h-24 rounded-full border-2 border-cyan-400 animate-ping opacity-75" />
      ))}
      <div className="relative z-10 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-mono text-xs font-bold uppercase shadow-xl">
        SPLASH RIPPLE
      </div>
      <span className="absolute bottom-2 font-mono text-[8px] text-cyan-300 font-bold">CLICK TO EMIT LIQUID RIPPLES</span>
    </div>
  );
}

// 36. meta-balls-canvas
export function MetaBallsCanvasPreview() {
  return (
    <div className="relative w-full h-full bg-[#080a14] flex items-center justify-center select-none overflow-hidden filter contrast-200">
      <div className="w-16 h-16 rounded-full bg-oxide animate-pulse blur-md" />
      <div className="w-16 h-16 rounded-full bg-amber-500 animate-pulse blur-md -ml-6" />
      <span className="absolute font-mono text-xs text-white font-black tracking-widest uppercase">
        METABALLS
      </span>
    </div>
  );
}

// 37. blob-cursor-physics
export function BlobCursorPhysicsPreview() {
  return (
    <div className="relative w-full h-full bg-[#070914] flex items-center justify-center select-none overflow-hidden">
      <div className="w-24 h-24 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-gradient-to-tr from-oxide via-amber-500 to-sky-500 animate-spin shadow-2xl" style={{ animationDuration: "8s" }} />
      <span className="absolute font-mono text-xs text-white font-bold uppercase">
        JELLY BLOB
      </span>
    </div>
  );
}

// 38. star-border-shimmer
export function StarBorderShimmerPreview() {
  return (
    <div className="w-full h-full bg-[#070a14] p-4 flex items-center justify-center select-none">
      <div className="relative p-1 rounded-2xl bg-gradient-to-r from-amber-400 via-white to-amber-400 shadow-2xl animate-pulse">
        <div className="px-6 py-4 rounded-[14px] bg-[#0c1018] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          <span>✨</span>
          <span>STARLIGHT SHIMMER</span>
        </div>
      </div>
    </div>
  );
}

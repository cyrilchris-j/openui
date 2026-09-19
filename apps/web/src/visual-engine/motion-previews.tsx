// Bespoke high-craft visual previews for all 100 OpenUI motion components
import * as React from "react";

export function BreathingLoaderPreview() {
  return (
    <div className="flex items-center justify-center font-mono select-none">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-oxide/40 animate-ping opacity-60" />
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-oxide to-amber-500/80 blur-xs animate-pulse flex items-center justify-center shadow-lg">
          <div className="w-8 h-8 rounded-full bg-paper" />
        </div>
        <span className="absolute text-[9px] font-bold tracking-widest text-ink uppercase">BREATHE</span>
      </div>
    </div>
  );
}

export function ClothSimulationBannerPreview() {
  const [offset, setOffset] = React.useState(0);
  React.useEffect(() => {
    let frame: number;
    let t = 0;
    const loop = () => {
      t += 0.05;
      setOffset(t);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);
  return (
    <div className="w-full max-w-[260px] h-20 rounded-xl overflow-hidden border border-line/40 bg-[#121620] relative select-none flex items-center justify-center">
      <svg className="w-full h-full" viewBox="0 0 260 80">
        {Array.from({ length: 9 }).map((_, i) => {
          const y = 10 + i * 7;
          const wave = Math.sin(offset + i * 0.3) * 6;
          return (
            <path
              key={i}
              d={`M 0,${y} Q 65,${y + wave} 130,${y} T 260,${y - wave}`}
              fill="none"
              stroke={i % 2 === 0 ? "#ba442c" : "#38bdf8"}
              strokeWidth="1.2"
              opacity={0.3 + i * 0.07}
            />
          );
        })}
      </svg>
      <span className="absolute font-mono text-[9px] uppercase tracking-widest font-bold text-white/90 bg-black/60 px-2 py-0.5 rounded border border-white/10">
        CLOTH KINEMATICS
      </span>
    </div>
  );
}

export function ConfettiBlastTriggerPreview() {
  const [blast, setBlast] = React.useState(0);
  return (
    <div className="flex flex-col items-center gap-2 font-mono select-none">
      <div className="relative w-28 h-14 flex items-center justify-center">
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i / 16) * 360;
          const dist = blast ? 40 : 10;
          const colors = ["bg-oxide", "bg-sky-400", "bg-amber-400", "bg-emerald-400", "bg-indigo-400"];
          return (
            <div
              key={i}
              className={`absolute w-2 h-2 rounded-xs ${colors[i % colors.length]} transition-all duration-700 ease-out`}
              style={{
                transform: `rotate(${angle}deg) translate(${dist}px) rotate(${blast * 90}deg)`,
                opacity: blast ? 1 : 0.2
              }}
            />
          );
        })}
        <button
          type="button"
          onClick={() => setBlast(b => b + 1)}
          className="relative z-10 px-3 py-1.5 rounded-xl bg-ink text-paper text-[10px] font-bold shadow-md hover:scale-105 active:scale-95 transition-transform"
        >
          🎉 BLAST
        </button>
      </div>
    </div>
  );
}

export function CountUpSpringPreview() {
  const [count, setCount] = React.useState(1240);
  React.useEffect(() => {
    const id = setInterval(() => setCount(c => c + Math.floor(Math.random() * 8 + 3)), 800);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="p-3 rounded-2xl border border-line/40 bg-paper shadow-sm font-mono select-none flex flex-col items-center">
      <span className="text-[9px] text-graphite font-bold uppercase tracking-widest mb-1">SPRING COUNTER</span>
      <div className="text-3xl font-display font-black text-oxide tabular-nums tracking-tight animate-pulse">
        {count.toLocaleString()}
      </div>
      <span className="text-[8.5px] text-emerald-600 font-bold mt-1">▲ OVERSHOOT ACTIVE</span>
    </div>
  );
}

export function CursorParticleFountainPreview() {
  return (
    <div className="w-full max-w-[250px] h-24 rounded-xl border border-line/40 bg-[#0b0e14] relative overflow-hidden select-none flex items-center justify-center font-mono">
      <div className="absolute bottom-2 w-3 h-3 rounded-full bg-oxide animate-ping" />
      {Array.from({ length: 20 }).map((_, i) => {
        const left = 35 + (i * 3) % 30;
        const delay = (i * 0.15);
        return (
          <div
            key={i}
            className="absolute bottom-2 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-xs animate-bounce"
            style={{
              left: `${left}%`,
              animationDuration: `${1 + (i % 5) * 0.2}s`,
              animationDelay: `${delay}s`
            }}
          />
        );
      })}
      <span className="relative z-10 text-[9px] text-white/90 font-bold uppercase tracking-widest bg-black/60 px-2 py-0.5 rounded border border-white/10">
        FOUNTAIN EMITTER
      </span>
    </div>
  );
}

export function CursorTrailRibbonPreview() {
  return (
    <div className="w-full max-w-[260px] h-20 rounded-xl border border-line/40 bg-[#0f141f] relative overflow-hidden select-none flex items-center justify-center">
      <svg className="w-full h-full" viewBox="0 0 260 80">
        <path
          d="M 20,40 Q 80,10 140,50 T 240,30"
          fill="none"
          stroke="#ba442c"
          strokeWidth="3.5"
          strokeLinecap="round"
          className="[stroke-dasharray:300] [stroke-dashoffset:300] animate-[dash_2.5s_ease-in-out_infinite_alternate]"
        />
        <path
          d="M 20,40 Q 80,10 140,50 T 240,30"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.8"
        />
      </svg>
      <span className="absolute bottom-2 text-[8.5px] font-mono text-graphite uppercase font-bold tracking-widest">
        CURVATURE TRAIL
      </span>
    </div>
  );
}

export function DataStreamRowsPreview() {
  return (
    <div className="w-full max-w-[260px] p-2.5 rounded-xl border border-line/40 bg-[#080b11] text-white font-mono text-[9px] select-none space-y-1.5 overflow-hidden shadow-md">
      <div className="flex gap-2 animate-marquee whitespace-nowrap text-emerald-400">
        <span>0x8F2A // SYNC_OK</span> <span>LATENCY: 4.2ms</span> <span>PACKET_4892</span> <span>VERIFIED</span>
      </div>
      <div className="flex gap-2 animate-marquee whitespace-nowrap text-oxide">
        <span>FRAME_DENSITY: 60FPS</span> <span>GPU_UTIL: 42%</span> <span>SHADERS: COMPILED</span>
      </div>
    </div>
  );
}

export function DragSnapGridPreview() {
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const snapTo = (dx: number, dy: number) => setPos({ x: dx, y: dy });
  return (
    <div className="flex flex-col items-center gap-2 font-mono select-none">
      <div className="w-32 h-20 rounded-xl border-2 border-dashed border-line/50 bg-line/5 relative flex items-center justify-center">
        <div
          onClick={() => snapTo((pos.x === 0 ? 30 : 0), 0)}
          className="w-10 h-10 rounded-lg bg-oxide text-white font-bold text-xs flex items-center justify-center shadow-md cursor-grab active:cursor-grabbing transition-transform duration-300 ease-spring"
          style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
        >
          SNAP
        </div>
      </div>
      <span className="text-[8.5px] text-graphite uppercase font-bold">CLICK TO SNAP ON GRID</span>
    </div>
  );
}

export function DynamicIslandMorphPreview() {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <div className="flex flex-col items-center font-mono select-none">
      <div
        onClick={() => setExpanded(!expanded)}
        className={`bg-black text-white rounded-full flex items-center justify-between transition-all duration-300 shadow-2xl cursor-pointer ${expanded ? "w-48 h-14 px-3.5 py-2 rounded-3xl" : "w-28 h-7 px-3 py-1"}`}
      >
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold tracking-tight">{expanded ? "Now Playing" : "Call"}</span>
        </div>
        {expanded ? (
          <div className="flex items-center gap-1 h-3">
            {[4, 10, 6, 12, 5].map((h, i) => (
              <div key={i} className="w-1 bg-oxide rounded-full animate-pulse" style={{ height: `${h}px` }} />
            ))}
          </div>
        ) : (
          <span className="text-[9px] text-oxide font-bold">02:14</span>
        )}
      </div>
      <span className="text-[8.5px] text-graphite uppercase font-bold mt-2">TAP TO MORPH</span>
    </div>
  );
}

export function ElasticAccordionPreview() {
  const [open, setOpen] = React.useState(true);
  return (
    <div className="w-full max-w-[240px] rounded-xl border border-line/40 bg-paper shadow-xs font-mono select-none overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full p-2.5 flex items-center justify-between text-left font-bold text-[11px] text-ink"
      >
        <span>Spring Accordion</span>
        <span className="text-oxide text-xs">{open ? "▲" : "▼"}</span>
      </button>
      <div className={`transition-all duration-500 ease-spring overflow-hidden ${open ? "max-h-20 p-2.5 pt-0 text-[10px] text-graphite" : "max-h-0"}`}>
        Rubbery spring kinematics with damped oscillation.
      </div>
    </div>
  );
}

export function ElasticBadgePopPreview() {
  const [key, setKey] = React.useState(0);
  return (
    <div className="flex flex-col items-center gap-2 font-mono select-none">
      <div key={key} className="px-4 py-1.5 rounded-full bg-oxide text-white font-bold text-xs shadow-md animate-[scaleUp_0.5s_cubic-bezier(0.34,1.56,0.64,1)]">
        ✦ POP! NEW FEATURE
      </div>
      <button
        type="button"
        onClick={() => setKey(k => k + 1)}
        className="text-[9px] text-graphite font-bold uppercase hover:text-ink"
      >
        TRIGGER POP
      </button>
    </div>
  );
}

export function ElasticBottomSheetPreview() {
  const [pulled, setPulled] = React.useState(false);
  return (
    <div className="w-48 h-24 rounded-2xl border border-line/40 bg-surface/30 relative overflow-hidden flex flex-col justify-end font-mono select-none">
      <div
        onClick={() => setPulled(!pulled)}
        className={`w-full bg-paper border-t border-line/40 p-2 rounded-t-2xl shadow-xl transition-transform duration-500 ease-spring cursor-pointer ${pulled ? "translate-y-0" : "translate-y-12"}`}
      >
        <div className="w-8 h-1 rounded-full bg-line/60 mx-auto mb-1.5" />
        <div className="text-[10px] font-bold text-ink text-center">Elastic Sheet</div>
        <div className="text-[8.5px] text-graphite text-center mt-1">Tap to slide</div>
      </div>
    </div>
  );
}

export function ElasticDrawerCurtainPreview() {
  const [open, setOpen] = React.useState(true);
  return (
    <div className="w-48 h-20 rounded-xl border border-line/40 bg-surface/30 relative overflow-hidden flex font-mono select-none">
      <div
        onClick={() => setOpen(!open)}
        className={`w-28 h-full bg-paper border-r border-line/40 p-2 shadow-xl transition-transform duration-500 ease-spring flex flex-col justify-between cursor-pointer ${open ? "translate-x-0" : "-translate-x-20"}`}
      >
        <span className="text-[9.5px] font-bold text-oxide">DRAWER</span>
        <span className="text-[8px] text-graphite">Tap to toggle</span>
      </div>
    </div>
  );
}

export function ElasticFabMenuPreview() {
  const [expanded, setExpanded] = React.useState(true);
  return (
    <div className="relative w-28 h-24 flex items-center justify-center font-mono select-none">
      {expanded && (
        <>
          <div className="absolute top-1 left-2 w-7 h-7 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs shadow-md animate-bounce">
            ✉
          </div>
          <div className="absolute top-1 right-2 w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs shadow-md animate-bounce" style={{ animationDelay: "100ms" }}>
            ⭐
          </div>
        </>
      )}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-10 h-10 rounded-full bg-oxide text-white font-bold text-lg flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95"
      >
        {expanded ? "✕" : "＋"}
      </button>
    </div>
  );
}

export function ElasticOrbitLoaderPreview() {
  return (
    <div className="relative w-20 h-20 flex items-center justify-center font-mono select-none">
      <div className="absolute inset-0 rounded-full border border-oxide/30 animate-spin" style={{ animationDuration: "3s" }} />
      <div className="w-8 h-8 rounded-full bg-oxide/20 border border-oxide flex items-center justify-center">
        <span className="w-2.5 h-2.5 rounded-full bg-oxide" />
      </div>
      <div className="absolute top-0 w-3 h-3 rounded-full bg-amber-400 shadow-xs animate-ping" />
    </div>
  );
}

export function ElasticRadioPillPreview() {
  const [opt, setOpt] = React.useState("DEV");
  return (
    <div className="flex items-center gap-1 p-1 rounded-full border border-line/40 bg-surface/50 font-mono text-[10px] font-bold select-none">
      {["DEV", "STAGE", "PROD"].map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => setOpt(o)}
          className={`px-3 py-1 rounded-full transition-all duration-300 ease-spring ${opt === o ? "bg-oxide text-white shadow-xs scale-105" : "text-graphite hover:text-ink"}`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export function ElasticSplitRevealPreview() {
  return (
    <div className="flex items-center gap-1 font-display font-black text-xl select-none">
      <span className="text-ink animate-pulse">OPEN</span>
      <span className="w-1 h-6 bg-oxide rounded-full" />
      <span className="text-oxide animate-pulse" style={{ animationDelay: "200ms" }}>MOTION</span>
    </div>
  );
}

export function ElasticStepperDotsPreview() {
  const [active, setActive] = React.useState(1);
  return (
    <div className="flex items-center gap-2 p-2 rounded-full border border-line/40 bg-paper shadow-xs select-none">
      {[0, 1, 2, 3].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => setActive(s)}
          className={`h-3 rounded-full transition-all duration-400 ease-spring ${active === s ? "w-8 bg-oxide shadow-xs" : "w-3 bg-line/40 hover:bg-line/70"}`}
        />
      ))}
    </div>
  );
}

export function ElasticTagReorderPreview() {
  return (
    <div className="flex items-center gap-1.5 font-mono text-[10px] select-none">
      <span className="px-2.5 py-1 rounded-md bg-oxide text-white font-bold shadow-xs cursor-grab">::: Motion</span>
      <span className="px-2.5 py-1 rounded-md border border-line/40 bg-paper text-ink cursor-grab">::: Layout</span>
    </div>
  );
}

export function ExitCollapseSwapPreview() {
  const [step, setStep] = React.useState(0);
  return (
    <div className="flex flex-col items-center gap-2 font-mono select-none">
      <div
        onClick={() => setStep(s => 1 - s)}
        className="w-32 h-16 rounded-xl border border-line/40 bg-paper shadow-md flex items-center justify-center font-bold text-xs text-ink cursor-pointer hover:scale-105 transition-all"
      >
        {step === 0 ? "Card A [Exit]" : "Card B [Enter]"}
      </div>
      <span className="text-[8.5px] text-graphite uppercase font-bold">CLICK TO COLLAPSE</span>
    </div>
  );
}

export function ExitFadeHierarchyPreview() {
  return (
    <div className="w-36 p-2 rounded-xl border border-line/40 bg-paper font-mono text-[10px] select-none space-y-1">
      <div className="font-bold text-ink">Parent Node</div>
      <div className="pl-3 border-l-2 border-oxide space-y-0.5 text-graphite text-[8.5px]">
        <div>Child 1 (0ms)</div>
        <div>Child 2 (+100ms)</div>
      </div>
    </div>
  );
}

export function FloatingDockMagnifierPreview() {
  const [hoverIdx, setHoverIdx] = React.useState<number | null>(null);
  const icons = ["🚀", "⚡", "🔥", "💎", "⚙"];
  return (
    <div className="flex items-end gap-1.5 p-2 rounded-2xl border border-line/40 bg-paper/90 shadow-2xl backdrop-blur-md select-none h-14">
      {icons.map((ic, i) => {
        const isCenter = hoverIdx === i;
        const isNeighbor = hoverIdx !== null && Math.abs(hoverIdx - i) === 1;
        const scale = isCenter ? "w-11 h-11 text-base -translate-y-2 bg-oxide text-white" : isNeighbor ? "w-9 h-9 text-sm -translate-y-1 bg-surface" : "w-8 h-8 text-xs bg-surface/50 text-ink";
        return (
          <button
            key={i}
            type="button"
            onMouseEnter={() => setHoverIdx(i)}
            onMouseLeave={() => setHoverIdx(null)}
            className={`rounded-xl border border-line/30 flex items-center justify-center transition-all duration-200 shadow-xs ${scale}`}
          >
            {ic}
          </button>
        );
      })}
    </div>
  );
}

export function FluidDrawerPeekPreview() {
  return (
    <div className="w-44 h-16 rounded-xl border border-line/40 bg-surface/40 relative overflow-hidden flex items-end justify-center font-mono select-none">
      <div className="w-36 bg-paper border-t border-line/40 px-3 py-1.5 rounded-t-xl shadow-lg flex items-center justify-between text-[9px] font-bold text-ink">
        <span>Peek Drawer</span>
        <span className="text-oxide">▲</span>
      </div>
    </div>
  );
}

export function FluidSegmentedMeterPreview() {
  return (
    <div className="w-full max-w-[240px] p-3 rounded-xl border border-line/40 bg-paper shadow-xs font-mono select-none space-y-1.5">
      <div className="flex justify-between text-[9.5px] font-bold text-graphite">
        <span>LIQUID FLOW LEVEL</span>
        <span className="text-oxide">82%</span>
      </div>
      <div className="h-3 w-full bg-line/20 rounded-full overflow-hidden flex">
        <div className="h-full bg-gradient-to-r from-sky-400 to-oxide w-[82%] rounded-full shadow-inner animate-pulse" />
      </div>
    </div>
  );
}

export function FluidTabIndicatorPreview() {
  const [tab, setTab] = React.useState("Flow");
  return (
    <div className="flex items-center gap-2 p-1.5 rounded-full border border-line/40 bg-paper shadow-xs font-mono text-[10.5px] font-bold select-none">
      {["Flow", "Waves", "Physics"].map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => setTab(t)}
          className={`px-3 py-1 rounded-full transition-all duration-300 ease-spring ${tab === t ? "bg-oxide text-white shadow-xs scale-105" : "text-graphite hover:text-ink"}`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

export function GlitchInterruptPreview() {
  return (
    <div className="font-display font-black text-2xl tracking-wider select-none relative">
      <span className="text-ink">GLITCH</span>
      <span className="absolute left-0.5 top-0 text-oxide opacity-70 animate-ping">GLITCH</span>
      <span className="absolute -left-0.5 top-0 text-sky-500 opacity-70">GLITCH</span>
    </div>
  );
}

export function GravityBounceBadgePreview() {
  return (
    <div className="flex flex-col items-center justify-center font-mono select-none">
      <div className="w-10 h-10 rounded-full bg-oxide text-white font-bold text-sm flex items-center justify-center shadow-lg animate-bounce">
        9.8
      </div>
      <div className="w-8 h-1 bg-ink/30 rounded-full blur-[1px] mt-1" />
      <span className="text-[8.5px] text-graphite uppercase font-bold mt-1">NEWTONIAN GRAVITY</span>
    </div>
  );
}

export function GravityWellCardPreview() {
  return (
    <div className="w-full max-w-[240px] p-3 rounded-2xl border border-line/40 bg-[#0d1017] text-white font-mono select-none shadow-xl flex items-center justify-center gap-3">
      <div className="w-8 h-8 rounded-full bg-oxide/20 border border-oxide flex items-center justify-center animate-spin">
        <span className="w-2 h-2 rounded-full bg-oxide" />
      </div>
      <div>
        <div className="text-xs font-bold">Gravity Well</div>
        <div className="text-[8.5px] text-graphite">Curving spacetime mesh</div>
      </div>
    </div>
  );
}

export function GyroscopicCardTiltPreview() {
  return (
    <div className="w-36 h-20 rounded-2xl border border-white/20 bg-gradient-to-tr from-[#1e293b] via-[#334155] to-oxide text-white p-3 font-mono select-none shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
      <div className="text-[9px] font-bold text-white/70">GYROSCOPIC</div>
      <div className="text-sm font-bold mt-2 tracking-wider">3D TILT</div>
    </div>
  );
}

export function HoverSwapFacePreview() {
  const [flipped, setFlipped] = React.useState(false);
  return (
    <div
      onClick={() => setFlipped(!flipped)}
      className="w-36 h-16 rounded-xl border border-line/40 bg-paper shadow-md flex items-center justify-center font-mono text-xs font-bold text-ink cursor-pointer hover:border-oxide transition-all"
    >
      {flipped ? <span className="text-oxide">Back Spec ↺</span> : <span>Front Face ↻</span>}
    </div>
  );
}

export function IdleFloatLoopPreview() {
  return (
    <div className="flex flex-col items-center font-mono select-none animate-[bounce_3s_ease-in-out_infinite]">
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-oxide to-amber-500 text-white flex items-center justify-center font-bold text-base shadow-xl">
        ☁
      </div>
      <span className="text-[8.5px] text-graphite font-bold uppercase mt-2">ZERO-G FLOAT</span>
    </div>
  );
}

export function InertiaScrollMarqueePreview() {
  return (
    <div className="w-full max-w-[270px] overflow-hidden whitespace-nowrap py-2 border-y border-line/40 font-mono text-[11px] font-bold select-none text-ink">
      <div className="inline-flex gap-4 animate-marquee">
        <span>⚡ VELOCITY INERTIA</span>
        <span className="text-oxide">✦ SPRING FRICTION</span>
        <span>⚡ VELOCITY INERTIA</span>
      </div>
    </div>
  );
}

export function InertialReboundScrollPreview() {
  return (
    <div className="w-44 h-16 rounded-xl border border-line/40 bg-paper p-2 font-mono text-[10px] select-none space-y-1 overflow-hidden shadow-xs">
      <div className="font-bold text-oxide">Overscroll Top ↑</div>
      <div className="text-ink">Smooth damped bounce</div>
    </div>
  );
}

export function KineticAccordionStackPreview() {
  return (
    <div className="w-48 font-mono select-none space-y-1">
      <div className="p-2 rounded-lg bg-oxide text-white font-bold text-[10px] shadow-xs">01 Kinetic Trigger</div>
      <div className="p-2 rounded-lg bg-line/20 text-ink text-[10px]">02 Damped Sibling</div>
    </div>
  );
}

export function KineticRubberbandTogglePreview() {
  const [on, setOn] = React.useState(true);
  return (
    <div className="flex items-center gap-2 font-mono select-none">
      <button
        type="button"
        onClick={() => setOn(!on)}
        className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-300 flex items-center ${on ? "bg-oxide" : "bg-line/40"}`}
      >
        <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-500 ease-spring ${on ? "translate-x-6" : "translate-x-0"}`} />
      </button>
      <span className="text-[10px] font-bold text-ink">{on ? "RUBBERBAND ON" : "OFF"}</span>
    </div>
  );
}

export function KineticSliderRailPreview() {
  const [val, setVal] = React.useState(50);
  return (
    <div className="w-full max-w-[240px] p-3 rounded-xl border border-line/40 bg-paper shadow-xs font-mono select-none space-y-2">
      <div className="flex justify-between text-[10px] font-bold">
        <span className="text-ink">KINETIC RAIL</span>
        <span className="text-oxide">{val}%</span>
      </div>
      <div className="relative h-2 bg-line/30 rounded-full flex items-center">
        <div className="h-full bg-oxide rounded-full" style={{ width: `${val}%` }} />
        <div className="w-4 h-4 rounded-full bg-white border-2 border-oxide shadow-md absolute -translate-x-1/2" style={{ left: `${val}%` }} />
      </div>
    </div>
  );
}

export function KineticStepperCounterPreview() {
  const [val, setVal] = React.useState(24);
  return (
    <div className="flex items-center gap-3 p-2 rounded-2xl border border-line/40 bg-paper shadow-sm font-mono select-none">
      <button type="button" onClick={() => setVal(v => v - 1)} className="w-8 h-8 rounded-lg bg-surface hover:bg-line/20 font-bold text-sm">▼</button>
      <span className="text-xl font-display font-bold text-oxide w-8 text-center">{val}</span>
      <button type="button" onClick={() => setVal(v => v + 1)} className="w-8 h-8 rounded-lg bg-oxide text-white font-bold text-sm shadow-xs">▲</button>
    </div>
  );
}

export function KineticTypeRevealPreview() {
  return (
    <div className="font-display font-black text-2xl tracking-wider select-none flex items-center gap-1">
      {["K", "I", "N", "E", "T", "I", "C"].map((c, i) => (
        <span
          key={i}
          className="text-ink hover:text-oxide hover:-translate-y-2 transition-transform duration-200 cursor-pointer inline-block"
          style={{ transitionDelay: `${i * 40}ms` }}
        >
          {c}
        </span>
      ))}
    </div>
  );
}

export function LiquidCardExpandPreview() {
  const [open, setOpen] = React.useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      className={`rounded-2xl border border-line/40 bg-paper shadow-md transition-all duration-500 ease-spring p-3 flex flex-col justify-center cursor-pointer select-none font-mono ${open ? "w-48 h-24 bg-oxide/5 border-oxide" : "w-32 h-14"}`}
    >
      <div className="text-xs font-bold text-ink">Liquid Plate</div>
      <div className="text-[9px] text-graphite">{open ? "Expanded with fluid elasticity" : "Tap to expand"}</div>
    </div>
  );
}

export function LiquidShapeMorphPreview() {
  return (
    <div className="relative w-20 h-20 flex items-center justify-center select-none">
      <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-oxide to-amber-500 animate-[spin_6s_linear_infinite] shadow-lg blur-[0.5px]" style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }} />
      <span className="absolute font-mono text-[8px] font-bold text-white uppercase tracking-widest">BLOB</span>
    </div>
  );
}

export function MagneticAnchorTooltipPreview() {
  return (
    <div className="flex flex-col items-center gap-2 font-mono select-none">
      <div className="px-3 py-1.5 rounded-xl bg-ink text-paper text-[10px] shadow-xl relative animate-bounce">
        Magnetic Anchor Attached
        <div className="w-2 h-2 bg-ink rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
      </div>
      <div className="w-4 h-4 rounded-full bg-oxide shadow-xs" />
    </div>
  );
}

export function MagneticButtonClusterPreview() {
  return (
    <div className="flex items-center gap-2 select-none font-mono">
      {["Accept", "Decline", "Inspect"].map((t, i) => (
        <button
          key={t}
          type="button"
          className={`px-3 py-1.5 rounded-xl text-[10px] font-bold shadow-xs hover:scale-115 transition-transform ${i === 0 ? "bg-oxide text-white" : "border border-line/40 bg-paper text-ink"}`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

export function MagneticCardHoverPreview() {
  return (
    <div className="w-36 h-20 rounded-2xl border border-line/40 bg-paper shadow-md p-3 font-mono select-none hover:shadow-2xl hover:scale-105 hover:border-oxide transition-all duration-300 flex flex-col justify-between">
      <span className="text-[9px] font-bold text-oxide">MAGNETIC</span>
      <span className="text-xs font-bold text-ink">Field Attractor</span>
    </div>
  );
}

export function MagneticCursorFollowerPreview() {
  return (
    <div className="relative w-36 h-20 rounded-xl border border-line/40 bg-surface/30 flex items-center justify-center font-mono select-none">
      <div className="w-6 h-6 rounded-full border-2 border-oxide animate-ping opacity-60" />
      <div className="w-3 h-3 rounded-full bg-oxide shadow-xs" />
      <span className="absolute bottom-1 text-[8px] text-graphite font-bold uppercase">CURSOR TARGET</span>
    </div>
  );
}

export function MagneticCursorHaloPreview() {
  return (
    <div className="relative w-32 h-20 flex items-center justify-center font-mono select-none">
      <div className="w-14 h-14 rounded-full bg-oxide/20 blur-md animate-pulse" />
      <div className="w-5 h-5 rounded-full bg-oxide flex items-center justify-center text-white text-[8px] font-bold shadow-sm">
        ✦
      </div>
    </div>
  );
}

export function MagneticDockPreview() {
  return (
    <div className="flex items-center gap-2 p-2 rounded-2xl border border-line/40 bg-paper shadow-xl select-none">
      {["⌥", "⌘", "⇧", "↵"].map((sym, i) => (
        <button
          key={i}
          type="button"
          className="w-8 h-8 rounded-lg bg-surface/60 hover:bg-oxide hover:text-white font-mono font-bold text-xs flex items-center justify-center transition-all hover:scale-125"
        >
          {sym}
        </button>
      ))}
    </div>
  );
}

export function MagneticPullCardPreview() {
  return (
    <div className="w-40 h-16 rounded-xl border border-line/40 bg-paper shadow-sm p-2.5 font-mono select-none flex items-center justify-between hover:border-oxide hover:translate-x-2 transition-all">
      <div className="text-[10px] font-bold text-ink">Elastic Tension</div>
      <span className="text-oxide text-xs font-bold">→</span>
    </div>
  );
}

export function MagneticRepelFieldPreview() {
  return (
    <div className="grid grid-cols-5 gap-2 select-none">
      {Array.from({ length: 15 }).map((_, i) => (
        <div key={i} className="w-3 h-3 rounded-full bg-line hover:scale-50 hover:bg-oxide transition-all duration-200" />
      ))}
    </div>
  );
}

export function MagneticSwitchSliderPreview() {
  const [on, setOn] = React.useState(true);
  return (
    <div className="flex items-center gap-3 font-mono select-none">
      <div
        onClick={() => setOn(!on)}
        className={`w-14 h-7 rounded-full p-1 transition-colors duration-300 cursor-pointer flex items-center ${on ? "bg-oxide" : "bg-line/40"}`}
      >
        <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ease-spring ${on ? "translate-x-7" : "translate-x-0"}`} />
      </div>
      <span className="text-xs font-bold text-ink">{on ? "CONNECTED" : "OFFLINE"}</span>
    </div>
  );
}

export function MomentumFlickCardPreview() {
  const [flicked, setFlicked] = React.useState(false);
  return (
    <div
      onClick={() => setFlicked(!flicked)}
      className={`w-36 h-20 rounded-2xl border border-line/40 bg-paper shadow-lg p-3 font-mono select-none cursor-pointer transition-transform duration-500 ease-spring ${flicked ? "translate-x-4 rotate-6 bg-oxide/5 border-oxide" : "hover:-translate-y-1"}`}
    >
      <div className="text-[9px] font-bold text-oxide uppercase">MOMENTUM</div>
      <div className="text-xs font-bold text-ink mt-1">Flick Me →</div>
    </div>
  );
}

export function MomentumPanelPreview() {
  return (
    <div className="w-44 h-16 rounded-xl border border-line/40 bg-paper shadow-md p-2.5 font-mono select-none flex items-center justify-between">
      <div>
        <div className="text-[10px] font-bold text-ink">Inertia Panel</div>
        <div className="text-[8.5px] text-graphite">Physics decay curve</div>
      </div>
      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
    </div>
  );
}

export function MorphSearchBarPreview() {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <div className="font-mono select-none">
      <div
        onClick={() => setExpanded(!expanded)}
        className={`h-9 rounded-full border border-line/50 bg-paper shadow-sm flex items-center gap-2 px-3 transition-all duration-300 cursor-pointer ${expanded ? "w-48 border-oxide" : "w-10 justify-center"}`}
      >
        <span>🔍</span>
        {expanded && <span className="text-[10px] text-ink font-semibold">search tags...</span>}
      </div>
    </div>
  );
}

export function MorphingHamburgerPreview() {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const id = setInterval(() => setOpen((o) => !o), 1800);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center p-4 select-none">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-xl bg-paper/80 border border-line/40 flex flex-col items-center justify-center gap-1.5 shadow-sm hover:border-oxide transition-colors"
      >
        <span className={`w-6 h-0.5 bg-ink rounded-full transition-all duration-300 ${open ? "rotate-45 translate-y-2 bg-oxide" : ""}`} />
        <span className={`w-6 h-0.5 bg-ink rounded-full transition-all duration-300 ${open ? "opacity-0" : ""}`} />
        <span className={`w-6 h-0.5 bg-ink rounded-full transition-all duration-300 ${open ? "-rotate-45 -translate-y-2 bg-oxide" : ""}`} />
      </button>
      <span className="font-mono text-[9px] uppercase tracking-widest text-graphite mt-2 font-bold">
        {open ? "STATE: ACTIVE" : "STATE: COLLAPSED"}
      </span>
    </div>
  );
}

export function OrbitRingSpinnerPreview() {
  return (
    <div className="relative w-20 h-20 flex items-center justify-center select-none font-mono">
      <div className="absolute inset-0 rounded-full border-2 border-oxide border-t-transparent animate-spin" />
      <div className="w-10 h-10 rounded-full border border-line/50 flex items-center justify-center">
        <span className="w-2.5 h-2.5 rounded-full bg-oxide" />
      </div>
    </div>
  );
}

export function OrbitSatelliteBadgePreview() {
  return (
    <div className="relative w-24 h-24 flex items-center justify-center font-mono select-none">
      <div className="w-14 h-14 rounded-2xl bg-paper border border-line/50 shadow-md flex items-center justify-center font-bold text-xs text-ink">
        ORBIT
      </div>
      <div className="absolute inset-0 rounded-full border border-dashed border-oxide/50 animate-spin" style={{ animationDuration: "4s" }}>
        <div className="w-3 h-3 rounded-full bg-oxide shadow-xs -translate-x-1.5" />
      </div>
    </div>
  );
}

export function OrbitalRevolutionPreview() {
  return (
    <div className="relative w-24 h-24 flex items-center justify-center select-none font-mono">
      <div className="w-6 h-6 rounded-full bg-amber-400 shadow-lg flex items-center justify-center text-[10px]">
        ☀️
      </div>
      <div className="absolute inset-2 rounded-full border border-line/40 animate-spin" style={{ animationDuration: "5s" }}>
        <div className="w-2.5 h-2.5 rounded-full bg-sky-400 -translate-x-1" />
      </div>
      <div className="absolute inset-0 rounded-full border border-line/30 animate-spin" style={{ animationDuration: "8s" }}>
        <div className="w-2 h-2 rounded-full bg-oxide -translate-x-1" />
      </div>
    </div>
  );
}

export function PageDiagonalWipePreview() {
  return (
    <div className="w-36 h-20 rounded-xl border border-line/40 bg-paper overflow-hidden relative font-mono select-none flex items-center justify-center">
      <div className="absolute inset-0 bg-oxide rotate-12 translate-x-10 scale-125 opacity-90" />
      <span className="relative z-10 font-bold text-xs text-white">DIAGONAL WIPE</span>
    </div>
  );
}

export function PageShutterTransitionPreview() {
  return (
    <div className="w-36 h-20 rounded-xl border border-line/40 bg-paper overflow-hidden relative font-mono select-none flex items-center justify-center">
      <div className="absolute top-0 inset-x-0 h-1/2 bg-[#121620] border-b border-oxide" />
      <div className="absolute bottom-0 inset-x-0 h-1/2 bg-[#121620] border-t border-oxide" />
      <span className="relative z-10 font-bold text-xs text-oxide">SHUTTER</span>
    </div>
  );
}

export function PageWipeTransitionPreview() {
  return (
    <div className="w-36 h-20 rounded-xl border border-line/40 bg-paper overflow-hidden relative font-mono select-none flex items-center justify-center">
      <div className="absolute inset-y-0 left-0 w-1/2 bg-oxide" />
      <span className="relative z-10 font-bold text-xs text-white mix-blend-difference">PAGE WIPE</span>
    </div>
  );
}

export function ParallaxDepthCardsPreview() {
  return (
    <div className="relative w-36 h-20 font-mono select-none">
      <div className="absolute top-0 left-0 w-28 h-14 rounded-xl border border-line/30 bg-surface/80 shadow-xs" />
      <div className="absolute top-2 left-3 w-28 h-14 rounded-xl border border-line/40 bg-paper shadow-md" />
      <div className="absolute top-4 left-6 w-28 h-14 rounded-xl border border-oxide bg-oxide/10 shadow-lg p-2 flex items-center justify-center text-[10px] font-bold text-oxide">
        PARALLAX Z
      </div>
    </div>
  );
}

export function ParallaxLayerStackPreview() {
  return (
    <div className="flex flex-col items-center gap-1 font-mono select-none">
      <div className="w-32 h-6 rounded-lg bg-oxide/20 border border-oxide/40 flex items-center justify-center text-[8.5px] font-bold text-oxide">Foreground (z: 30)</div>
      <div className="w-28 h-5 rounded-lg bg-surface border border-line/40 flex items-center justify-center text-[8px] text-ink">Midground (z: 20)</div>
      <div className="w-24 h-4 rounded-lg bg-line/20 flex items-center justify-center text-[7.5px] text-graphite">Background (z: 10)</div>
    </div>
  );
}

export function PerspectiveCarouselPreview() {
  return (
    <div className="flex items-center justify-center gap-1 font-mono select-none">
      <div className="w-16 h-16 rounded-xl border border-line/40 bg-paper shadow-sm scale-90 opacity-60 transform -rotate-12 flex items-center justify-center text-xs font-bold">1</div>
      <div className="w-20 h-20 rounded-xl border-2 border-oxide bg-oxide/10 shadow-xl scale-105 z-10 flex items-center justify-center text-sm font-bold text-oxide">2</div>
      <div className="w-16 h-16 rounded-xl border border-line/40 bg-paper shadow-sm scale-90 opacity-60 transform rotate-12 flex items-center justify-center text-xs font-bold">3</div>
    </div>
  );
}

export function PerspectiveCubeFlipPreview() {
  return (
    <div className="w-16 h-16 rounded-xl border-2 border-oxide bg-gradient-to-tr from-oxide to-amber-500 text-white font-mono font-bold text-xs flex items-center justify-center shadow-2xl transform rotate-12 hover:rotate-45 transition-transform duration-500 cursor-pointer">
      CUBE
    </div>
  );
}

export function PerspectivePlaneRevealPreview() {
  return (
    <div className="w-36 h-20 rounded-2xl border border-line/40 bg-paper shadow-xl p-3 font-mono select-none transform rotate-x-12 hover:rotate-x-0 transition-transform duration-500 flex flex-col justify-center">
      <span className="text-[9px] text-oxide font-bold uppercase">3D PROJECTION</span>
      <span className="text-xs font-bold text-ink">Plane Reveal</span>
    </div>
  );
}

export function PhysicsPendulumDialPreview() {
  return (
    <div className="flex flex-col items-center select-none font-mono">
      <div className="w-2 h-2 rounded-full bg-ink" />
      <div className="w-0.5 h-12 bg-line origin-top animate-[spin_2s_ease-in-out_infinite_alternate]" style={{ transformOrigin: "top" }}>
        <div className="w-5 h-5 rounded-full bg-oxide shadow-md translate-y-10 -translate-x-2 flex items-center justify-center text-[7px] text-white font-bold">
          g
        </div>
      </div>
      <span className="text-[8.5px] text-graphite uppercase font-bold mt-4">PENDULUM DIAL</span>
    </div>
  );
}

export function PhysicsRopePulleyPreview() {
  const [angle, setAngle] = React.useState(0);
  React.useEffect(() => {
    let frame: number;
    let t = 0;
    const loop = () => {
      t += 0.04;
      setAngle(Math.sin(t) * 22);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center p-3 select-none font-mono">
      <div className="relative w-12 h-12 rounded-full border-4 border-oxide bg-paper flex items-center justify-center shadow-md">
        <div className="w-2 h-2 rounded-full bg-ink" />
        <div className="absolute inset-0 flex items-center justify-center" style={{ transform: `rotate(${angle * 4}deg)` }}>
          <div className="w-full h-0.5 bg-oxide/50" />
        </div>
      </div>
      <div className="flex justify-between w-28 mt-1">
        <div className="flex flex-col items-center" style={{ transform: `translateY(${-angle}px)` }}>
          <div className="w-0.5 h-6 bg-line/60" />
          <div className="px-2 py-1 rounded bg-ink text-paper text-[8.5px] font-bold shadow-xs">5kg</div>
        </div>
        <div className="flex flex-col items-center" style={{ transform: `translateY(${angle}px)` }}>
          <div className="w-0.5 h-6 bg-line/60" />
          <div className="px-2 py-1 rounded bg-oxide text-white text-[8.5px] font-bold shadow-xs">5kg</div>
        </div>
      </div>
      <span className="text-[8.5px] text-graphite uppercase font-bold mt-2">PULLEY BALANCE</span>
    </div>
  );
}

export function PulseRingBeaconPreview() {
  return (
    <div className="relative w-20 h-20 flex items-center justify-center select-none font-mono">
      <div className="absolute inset-0 rounded-full border-2 border-oxide animate-ping opacity-75" />
      <div className="absolute inset-3 rounded-full border border-oxide/50 animate-ping opacity-50" style={{ animationDelay: "300ms" }} />
      <div className="w-6 h-6 rounded-full bg-oxide shadow-md flex items-center justify-center text-white text-[8px] font-bold">
        ⚡
      </div>
    </div>
  );
}

export function RadialProgressWheelPreview() {
  return (
    <div className="relative w-20 h-20 flex items-center justify-center font-mono select-none">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 60 60">
        <circle cx="30" cy="30" r="22" stroke="currentColor" strokeWidth="4" className="text-line/30" fill="transparent" />
        <circle
          cx="30"
          cy="30"
          r="22"
          stroke="#ba442c"
          strokeWidth="4"
          strokeDasharray="138"
          strokeDashoffset="35"
          strokeLinecap="round"
          fill="transparent"
        />
      </svg>
      <span className="absolute text-xs font-bold text-ink">75%</span>
    </div>
  );
}

export function ReboundCheckboxPreview() {
  const [checked, setChecked] = React.useState(true);
  return (
    <div
      onClick={() => setChecked(!checked)}
      className="flex items-center gap-2.5 p-3 rounded-xl border border-line/40 bg-paper shadow-xs font-mono text-[11px] font-bold text-ink cursor-pointer select-none hover:border-oxide transition-colors"
    >
      <div className={`w-5 h-5 rounded-md flex items-center justify-center text-xs transition-transform duration-300 ease-spring ${checked ? "bg-oxide text-white scale-110 shadow-xs" : "border border-line/60"}`}>
        {checked ? "✓" : ""}
      </div>
      <span>Rebound Toggle</span>
    </div>
  );
}

export function RippleTouchFieldPreview() {
  return (
    <div className="relative w-36 h-20 rounded-xl border border-line/40 bg-surface/30 overflow-hidden flex items-center justify-center select-none font-mono">
      <div className="absolute w-12 h-12 rounded-full border-2 border-oxide animate-ping opacity-60" />
      <div className="w-4 h-4 rounded-full bg-oxide/80 shadow-md" />
      <span className="absolute bottom-1 text-[8px] text-graphite uppercase font-bold">RIPPLE FIELD</span>
    </div>
  );
}

export function RubberSliderKnobPreview() {
  const [val, setVal] = React.useState(60);
  return (
    <div className="w-full max-w-[240px] p-3 rounded-xl border border-line/40 bg-paper shadow-xs font-mono select-none space-y-2">
      <div className="flex justify-between text-[10px] font-bold">
        <span className="text-ink">RUBBER KNOB</span>
        <span className="text-oxide">{val}%</span>
      </div>
      <div className="relative h-2 bg-line/30 rounded-full flex items-center">
        <div className="h-full bg-oxide rounded-full" style={{ width: `${val}%` }} />
        <div className="w-5 h-3 rounded-full bg-ink shadow-md absolute -translate-x-1/2 hover:scale-125 transition-transform" style={{ left: `${val}%` }} />
      </div>
    </div>
  );
}

export function ScrollCompressionPreview() {
  return (
    <div className="w-36 h-20 rounded-xl border border-line/40 bg-paper p-2 font-mono select-none flex flex-col justify-between shadow-xs">
      <div className="h-4 bg-line/30 rounded" />
      <div className="h-3 bg-oxide/80 rounded scale-y-75" />
      <div className="h-2 bg-line/20 rounded scale-y-50" />
      <span className="text-[8px] text-graphite uppercase font-bold text-center">EDGE COMPRESSION</span>
    </div>
  );
}

export function ScrollCurtainRevealPreview() {
  return (
    <div className="w-36 h-20 rounded-xl border border-line/40 bg-paper overflow-hidden relative font-mono select-none flex items-center justify-center">
      <div className="absolute top-0 inset-x-0 h-1/2 bg-[#121620]" />
      <div className="absolute bottom-0 inset-x-0 h-1/2 bg-[#121620]" />
      <span className="relative z-10 font-bold text-xs text-white">REVEAL</span>
    </div>
  );
}

export function ScrollLensMagnifierPreview() {
  return (
    <div className="relative p-3 rounded-xl border border-line/40 bg-paper font-mono select-none text-center">
      <div className="text-xs text-graphite">Precision Kinetic</div>
      <div className="text-lg font-bold text-oxide scale-125 my-1">TYPOGRAPHY</div>
      <div className="text-xs text-graphite">Subtle focus lens</div>
    </div>
  );
}

export function ScrollProgressRingPreview() {
  return (
    <div className="flex items-center gap-3 p-2.5 rounded-2xl border border-line/40 bg-paper shadow-sm font-mono select-none">
      <div className="relative w-10 h-10 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="14" stroke="currentColor" strokeWidth="3" className="text-line/30" fill="transparent" />
          <circle cx="18" cy="18" r="14" stroke="#ba442c" strokeWidth="3" strokeDasharray="88" strokeDashoffset="22" strokeLinecap="round" fill="transparent" />
        </svg>
        <span className="absolute text-[9px] font-bold text-ink">75%</span>
      </div>
      <div>
        <div className="text-[11px] font-bold text-ink">Scroll Depth</div>
        <div className="text-[8.5px] text-graphite">Page position metric</div>
      </div>
    </div>
  );
}

export function ScrollRevealPreview() {
  return (
    <div className="flex flex-col gap-1.5 w-40 font-mono select-none">
      <div className="p-2 rounded-lg bg-oxide text-white font-bold text-[10px] shadow-xs animate-[scaleUp_0.4s_ease-out]">
        01 Element Entered
      </div>
      <div className="p-2 rounded-lg border border-line/40 bg-paper text-ink text-[10px] opacity-60">
        02 Waiting trigger...
      </div>
    </div>
  );
}

export function ScrollSkewSectionsPreview() {
  return (
    <div className="w-36 h-20 rounded-xl border border-line/40 bg-paper shadow-md p-3 font-mono select-none transform -skew-y-6 hover:skew-y-0 transition-transform duration-300 flex flex-col justify-center">
      <span className="text-[9px] font-bold text-oxide uppercase">VELOCITY</span>
      <span className="text-xs font-bold text-ink">Skew Sections</span>
    </div>
  );
}

export function ScrollVelocityBlurHeroPreview() {
  return (
    <div className="font-display font-black text-2xl tracking-wider select-none text-center">
      <span className="text-ink blur-[1px]">MOTION</span>
      <span className="text-oxide ml-2 blur-[0.5px]">BLUR</span>
    </div>
  );
}

export function SharedLayoutMorphPreview() {
  const [grid, setGrid] = React.useState(true);
  return (
    <div className="flex flex-col items-center gap-2 font-mono select-none">
      <button
        type="button"
        onClick={() => setGrid(!grid)}
        className="text-[9px] font-bold uppercase text-oxide hover:underline"
      >
        TOGGLE {grid ? "LIST" : "GRID"}
      </button>
      <div className={`transition-all duration-400 ease-spring ${grid ? "grid grid-cols-2 gap-1.5 w-28" : "flex flex-col gap-1 w-28"}`}>
        <div className="h-6 rounded bg-oxide/20 border border-oxide" />
        <div className="h-6 rounded bg-sky-500/20 border border-sky-500" />
      </div>
    </div>
  );
}

export function ShimmerSkeletonLoaderPreview() {
  return (
    <div className="w-48 space-y-2 select-none font-mono">
      <div className="h-4 bg-line/20 rounded-md overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
      </div>
      <div className="h-3 w-3/4 bg-line/20 rounded-md overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
      </div>
    </div>
  );
}

export function SoundwaveVisualizerBarPreview() {
  return (
    <div className="flex items-end gap-1.5 h-12 p-2 rounded-xl border border-line/40 bg-[#0f141f] select-none">
      {[12, 28, 40, 20, 36, 48, 16, 32, 24].map((h, i) => (
        <div
          key={i}
          className="w-2 rounded-t-full bg-gradient-to-t from-oxide to-amber-400 animate-pulse"
          style={{ height: `${h}px`, animationDelay: `${i * 120}ms` }}
        />
      ))}
    </div>
  );
}

export function SplitFlapSolariBoardPreview() {
  return (
    <div className="flex items-center gap-1 font-mono select-none">
      {["O", "P", "E", "N", "U", "I"].map((c, i) => (
        <div key={i} className="w-7 h-10 rounded-sm bg-[#1e232d] text-white font-bold text-sm flex items-center justify-center border border-white/10 shadow-md">
          {c}
        </div>
      ))}
    </div>
  );
}

export function SpringCardStackSwipePreview() {
  return (
    <div className="relative w-36 h-20 font-mono select-none">
      <div className="absolute top-0 left-2 w-32 h-16 rounded-xl border border-line/30 bg-surface/60 shadow-xs scale-90" />
      <div className="absolute top-1 left-1 w-32 h-16 rounded-xl border border-line/40 bg-paper shadow-sm scale-95" />
      <div className="absolute top-2 left-0 w-32 h-16 rounded-xl border border-oxide bg-oxide/10 shadow-lg p-2 flex items-center justify-center text-xs font-bold text-oxide cursor-grab hover:scale-105 transition-transform">
        Swipe Card Stack
      </div>
    </div>
  );
}

export function SpringDrawerPreview() {
  const [open, setOpen] = React.useState(true);
  React.useEffect(() => {
    const id = setInterval(() => setOpen((o) => !o), 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="w-full max-w-[260px] h-32 rounded-xl border border-line bg-surface/30 relative overflow-hidden flex flex-col justify-end select-none font-mono">
      <div className={`w-full bg-paper border-t border-line p-3 rounded-t-xl shadow-xl transition-transform duration-500 ease-spring ${open ? "translate-y-0" : "translate-y-16"}`}>
        <div className="w-8 h-1 bg-line rounded-full mx-auto mb-2" />
        <div className="flex items-center justify-between text-[11px] font-bold text-ink">
          <span>Spring Velocity</span>
          <span className="text-oxide text-[9px] uppercase">Active</span>
        </div>
        <div className="text-[10px] text-graphite mt-1">Damped oscillation trajectory</div>
      </div>
    </div>
  );
}

export function SpringDropInPreview() {
  return (
    <div className="p-3 rounded-2xl border-2 border-oxide bg-paper shadow-2xl font-mono text-center select-none animate-[bounce_1.5s_infinite]">
      <div className="text-xs font-bold text-oxide uppercase">DROP-IN MODAL</div>
      <div className="text-[9.5px] text-ink mt-0.5">Spring overshoot settle</div>
    </div>
  );
}

export function SpringSnappingSliderPreview() {
  return (
    <div className="w-full max-w-[240px] p-3 rounded-xl border border-line/40 bg-paper shadow-xs font-mono select-none space-y-2">
      <div className="flex justify-between text-[10px] text-graphite font-bold">
        <span>SNAPPING DIAL</span>
        <span className="text-oxide">Step 2 / 4</span>
      </div>
      <div className="relative h-2 bg-line/30 rounded-full flex items-center justify-between px-2">
        <div className="w-4 h-4 rounded-full bg-oxide shadow-md absolute left-[50%] -translate-x-1/2" />
        {[0, 1, 2, 3].map(i => <span key={i} className="w-1.5 h-1.5 rounded-full bg-line" />)}
      </div>
    </div>
  );
}

export function SpringToastStackPreview() {
  return (
    <div className="relative w-44 h-16 font-mono select-none">
      <div className="absolute top-0 inset-x-2 h-10 rounded-xl border border-line/30 bg-surface scale-90 shadow-xs" />
      <div className="absolute top-2 inset-x-1 h-10 rounded-xl border border-line/40 bg-paper scale-95 shadow-sm" />
      <div className="absolute top-4 inset-x-0 h-10 rounded-xl border border-oxide bg-paper shadow-md px-3 flex items-center justify-between text-[10px] font-bold text-ink">
        <span>⚡ Toast message</span>
        <span className="text-oxide">✓</span>
      </div>
    </div>
  );
}

export function StaggerCascadePreview() {
  return (
    <div className="grid grid-cols-3 gap-1.5 w-36 select-none font-mono">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-8 rounded-lg border border-line/40 bg-paper shadow-xs flex items-center justify-center text-[10px] font-bold text-oxide animate-pulse"
          style={{ animationDelay: `${i * 150}ms` }}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
}

export function StaggeredAvatarFanPreview() {
  const users = ["bg-oxide", "bg-sky-500", "bg-amber-500", "bg-emerald-500"];
  return (
    <div className="flex items-center -space-x-2 select-none font-mono">
      {users.map((c, i) => (
        <div
          key={i}
          className={`w-9 h-9 rounded-full ${c} border-2 border-paper text-white text-xs font-bold flex items-center justify-center shadow-md transform hover:-translate-y-2 hover:rotate-6 transition-transform`}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
}

export function StaggeredBarChartPreview() {
  return (
    <div className="flex items-end gap-2 h-16 p-2 select-none font-mono">
      {[40, 75, 55, 95, 65].map((h, i) => (
        <div key={i} className="flex flex-col items-center gap-1">
          <div
            className="w-4 rounded-t bg-oxide shadow-xs transition-all duration-500"
            style={{ height: `${h}%` }}
          />
          <span className="text-[7.5px] text-graphite font-bold">{i + 1}Q</span>
        </div>
      ))}
    </div>
  );
}

export function StaggeredGlyphCascadePreview() {
  return (
    <div className="font-mono text-base font-black tracking-widest select-none flex items-center gap-1">
      {["S", "T", "A", "G", "G", "E", "R"].map((c, i) => (
        <span
          key={i}
          className="px-1 py-0.5 rounded bg-surface border border-line/40 text-ink animate-bounce"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          {c}
        </span>
      ))}
    </div>
  );
}

export function StaggeredListFadePreview() {
  return (
    <div className="w-36 space-y-1 font-mono text-[10px] select-none">
      {["Initialised Core", "Mounted Canvas", "Synced Registry"].map((t, i) => (
        <div
          key={i}
          className="p-1.5 rounded-lg border border-line/40 bg-paper shadow-2xs text-ink flex items-center gap-1.5"
          style={{ opacity: 1 - i * 0.2 }}
        >
          <span className="text-oxide font-bold">›</span>
          <span>{t}</span>
        </div>
      ))}
    </div>
  );
}

export function StaggeredMetricCounterPreview() {
  return (
    <div className="flex items-center gap-2 select-none font-mono">
      <div className="p-2 rounded-xl border border-line/40 bg-paper text-center shadow-xs">
        <div className="text-sm font-bold text-oxide">99.8%</div>
        <div className="text-[7.5px] text-graphite">UPTIME</div>
      </div>
      <div className="p-2 rounded-xl border border-line/40 bg-paper text-center shadow-xs">
        <div className="text-sm font-bold text-ink">14ms</div>
        <div className="text-[7.5px] text-graphite">LATENCY</div>
      </div>
    </div>
  );
}

export function StickyStackPreview() {
  return (
    <div className="relative w-36 h-20 font-mono select-none">
      <div className="absolute top-0 inset-x-0 p-2 rounded-xl border border-line/30 bg-surface shadow-xs text-[9px] text-graphite">
        Card Level 1
      </div>
      <div className="absolute top-3 inset-x-0 p-2 rounded-xl border border-line/40 bg-paper shadow-sm text-[9.5px] text-ink font-bold">
        Card Level 2 (Sticky)
      </div>
    </div>
  );
}

export function SwayTreeNavigationPreview() {
  return (
    <div className="font-mono text-[10px] select-none space-y-1 pl-2 border-l-2 border-dashed border-oxide">
      <div className="text-oxide font-bold">Tree Root ~</div>
      <div className="pl-3 text-ink">Branch A</div>
      <div className="pl-3 text-graphite">Branch B</div>
    </div>
  );
}

export function TiltSpringCardPreview() {
  return (
    <div className="w-36 h-20 rounded-2xl border border-line/40 bg-paper shadow-lg p-3 font-mono select-none transform hover:-rotate-6 hover:scale-105 transition-transform duration-300 flex flex-col justify-between">
      <span className="text-[9px] text-oxide font-bold">SPRING TILT</span>
      <span className="text-xs font-bold text-ink">Equilibrium ↺</span>
    </div>
  );
}

export function VelocityFadeListPreview() {
  return (
    <div className="w-36 space-y-1 font-mono text-[9.5px] select-none">
      <div className="p-1 rounded bg-oxide text-white font-bold blur-[0.5px]">Velocity High ↑</div>
      <div className="p-1 rounded bg-line/20 text-ink">Velocity Low</div>
    </div>
  );
}

export function WaveHandoffPreview() {
  return (
    <div className="flex items-center gap-1.5 select-none">
      {Array.from({ length: 7 }).map((_, i) => (
        <div
          key={i}
          className="w-2 h-8 rounded-full bg-oxide animate-bounce"
          style={{ animationDelay: `${i * 120}ms` }}
        />
      ))}
    </div>
  );
}

export function WaveProgressBarPreview() {
  return (
    <div className="w-full max-w-[240px] p-3 rounded-xl border border-line/40 bg-paper shadow-xs font-mono select-none space-y-1.5">
      <div className="flex justify-between text-[10px] font-bold">
        <span className="text-ink">WAVE HARMONIC</span>
        <span className="text-oxide">84%</span>
      </div>
      <div className="h-3 w-full bg-line/20 rounded-full overflow-hidden relative">
        <div className="h-full bg-gradient-to-r from-oxide via-amber-400 to-sky-400 w-[84%] animate-pulse rounded-full" />
      </div>
    </div>
  );
}

export function WaveTextRevealPreview() {
  return (
    <div className="font-display font-black text-2xl tracking-wider select-none flex items-center gap-0.5">
      {["W", "A", "V", "E", "S"].map((c, i) => (
        <span
          key={i}
          className="text-oxide animate-bounce inline-block"
          style={{ animationDelay: `${i * 120}ms` }}
        >
          {c}
        </span>
      ))}
    </div>
  );
}

export const MOTION_PREVIEWS_MAP: Record<string, () => React.JSX.Element> = {
  "breathing-loader": BreathingLoaderPreview,
  "cloth-simulation-banner": ClothSimulationBannerPreview,
  "confetti-blast-trigger": ConfettiBlastTriggerPreview,
  "count-up-spring": CountUpSpringPreview,
  "cursor-particle-fountain": CursorParticleFountainPreview,
  "cursor-trail-ribbon": CursorTrailRibbonPreview,
  "data-stream-rows": DataStreamRowsPreview,
  "drag-snap-grid": DragSnapGridPreview,
  "dynamic-island-morph": DynamicIslandMorphPreview,
  "elastic-accordion": ElasticAccordionPreview,
  "elastic-badge-pop": ElasticBadgePopPreview,
  "elastic-bottom-sheet": ElasticBottomSheetPreview,
  "elastic-drawer-curtain": ElasticDrawerCurtainPreview,
  "elastic-fab-menu": ElasticFabMenuPreview,
  "elastic-orbit-loader": ElasticOrbitLoaderPreview,
  "elastic-radio-pill": ElasticRadioPillPreview,
  "elastic-split-reveal": ElasticSplitRevealPreview,
  "elastic-stepper-dots": ElasticStepperDotsPreview,
  "elastic-tag-reorder": ElasticTagReorderPreview,
  "exit-collapse-swap": ExitCollapseSwapPreview,
  "exit-fade-hierarchy": ExitFadeHierarchyPreview,
  "floating-dock-magnifier": FloatingDockMagnifierPreview,
  "fluid-drawer-peek": FluidDrawerPeekPreview,
  "fluid-segmented-meter": FluidSegmentedMeterPreview,
  "fluid-tab-indicator": FluidTabIndicatorPreview,
  "glitch-interrupt": GlitchInterruptPreview,
  "gravity-bounce-badge": GravityBounceBadgePreview,
  "gravity-well-card": GravityWellCardPreview,
  "gyroscopic-card-tilt": GyroscopicCardTiltPreview,
  "hover-swap-face": HoverSwapFacePreview,
  "idle-float-loop": IdleFloatLoopPreview,
  "inertia-scroll-marquee": InertiaScrollMarqueePreview,
  "inertial-rebound-scroll": InertialReboundScrollPreview,
  "kinetic-accordion-stack": KineticAccordionStackPreview,
  "kinetic-rubberband-toggle": KineticRubberbandTogglePreview,
  "kinetic-slider-rail": KineticSliderRailPreview,
  "kinetic-stepper-counter": KineticStepperCounterPreview,
  "kinetic-type-reveal": KineticTypeRevealPreview,
  "liquid-card-expand": LiquidCardExpandPreview,
  "liquid-shape-morph": LiquidShapeMorphPreview,
  "magnetic-anchor-tooltip": MagneticAnchorTooltipPreview,
  "magnetic-button-cluster": MagneticButtonClusterPreview,
  "magnetic-card-hover": MagneticCardHoverPreview,
  "magnetic-cursor-follower": MagneticCursorFollowerPreview,
  "magnetic-cursor-halo": MagneticCursorHaloPreview,
  "magnetic-dock": MagneticDockPreview,
  "magnetic-pull-card": MagneticPullCardPreview,
  "magnetic-repel-field": MagneticRepelFieldPreview,
  "magnetic-switch-slider": MagneticSwitchSliderPreview,
  "momentum-flick-card": MomentumFlickCardPreview,
  "momentum-panel": MomentumPanelPreview,
  "morph-search-bar": MorphSearchBarPreview,
  "morphing-hamburger": MorphingHamburgerPreview,
  "orbit-ring-spinner": OrbitRingSpinnerPreview,
  "orbit-satellite-badge": OrbitSatelliteBadgePreview,
  "orbital-revolution": OrbitalRevolutionPreview,
  "page-diagonal-wipe": PageDiagonalWipePreview,
  "page-shutter-transition": PageShutterTransitionPreview,
  "page-wipe-transition": PageWipeTransitionPreview,
  "parallax-depth-cards": ParallaxDepthCardsPreview,
  "parallax-layer-stack": ParallaxLayerStackPreview,
  "perspective-carousel": PerspectiveCarouselPreview,
  "perspective-cube-flip": PerspectiveCubeFlipPreview,
  "perspective-plane-reveal": PerspectivePlaneRevealPreview,
  "physics-pendulum-dial": PhysicsPendulumDialPreview,
  "physics-rope-pulley": PhysicsRopePulleyPreview,
  "pulse-ring-beacon": PulseRingBeaconPreview,
  "radial-progress-wheel": RadialProgressWheelPreview,
  "rebound-checkbox": ReboundCheckboxPreview,
  "ripple-touch-field": RippleTouchFieldPreview,
  "rubber-slider-knob": RubberSliderKnobPreview,
  "scroll-compression": ScrollCompressionPreview,
  "scroll-curtain-reveal": ScrollCurtainRevealPreview,
  "scroll-lens-magnifier": ScrollLensMagnifierPreview,
  "scroll-progress-ring": ScrollProgressRingPreview,
  "scroll-reveal": ScrollRevealPreview,
  "scroll-skew-sections": ScrollSkewSectionsPreview,
  "scroll-velocity-blur-hero": ScrollVelocityBlurHeroPreview,
  "shared-layout-morph": SharedLayoutMorphPreview,
  "shimmer-skeleton-loader": ShimmerSkeletonLoaderPreview,
  "soundwave-visualizer-bar": SoundwaveVisualizerBarPreview,
  "split-flap-solari-board": SplitFlapSolariBoardPreview,
  "spring-card-stack-swipe": SpringCardStackSwipePreview,
  "spring-drawer": SpringDrawerPreview,
  "spring-drop-in": SpringDropInPreview,
  "spring-snapping-slider": SpringSnappingSliderPreview,
  "spring-toast-stack": SpringToastStackPreview,
  "stagger-cascade": StaggerCascadePreview,
  "staggered-avatar-fan": StaggeredAvatarFanPreview,
  "staggered-bar-chart": StaggeredBarChartPreview,
  "staggered-glyph-cascade": StaggeredGlyphCascadePreview,
  "staggered-list-fade": StaggeredListFadePreview,
  "staggered-metric-counter": StaggeredMetricCounterPreview,
  "sticky-stack": StickyStackPreview,
  "sway-tree-navigation": SwayTreeNavigationPreview,
  "tilt-spring-card": TiltSpringCardPreview,
  "velocity-fade-list": VelocityFadeListPreview,
  "wave-handoff": WaveHandoffPreview,
  "wave-progress-bar": WaveProgressBarPreview,
  "wave-text-reveal": WaveTextRevealPreview,
};

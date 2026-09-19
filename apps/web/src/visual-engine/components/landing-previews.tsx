import * as React from "react";
import { ModelViewer } from "../three/model-viewer.js";

export function StudioMinimalLandingPreview(): React.JSX.Element {
  return (
    <div className="w-full h-full p-4 flex flex-col justify-between bg-[#fcfbf7] select-none text-ink">
      <div className="flex items-center justify-between border-b border-line pb-2">
        <span className="font-mono text-[10px] font-bold">STUDIO // 2026</span>
        <div className="flex gap-2 text-[9px] font-mono text-graphite">
          <span>WORK</span>
          <span>ABOUT</span>
          <span className="text-oxide font-semibold">CONTACT</span>
        </div>
      </div>
      <div className="my-auto py-2 text-center">
        <span className="font-mono text-[9px] text-oxide uppercase tracking-widest">
          DIGITAL CRAFT & SPATIAL INTERACTION
        </span>
        <h3 className="font-serif italic text-2xl sm:text-3xl mt-1">Minimalism in Motion</h3>
      </div>
      <div className="flex items-center justify-between border-t border-line pt-2 text-[9px] font-mono text-graphite">
        <span>EST. 2026</span>
        <span>SWISS EDITORIAL SYSTEM</span>
      </div>
    </div>
  );
}

export function SpatialHardwareLandingPreview(): React.JSX.Element {
  return (
    <div className="w-full h-full relative flex items-center justify-center bg-[#090a0f] text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ModelViewer geometryType="torusKnot" color="#38bdf8" metalness={0.9} roughness={0.15} className="w-full h-full" />
      </div>
      <div className="relative z-10 p-3 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 text-center pointer-events-none">
        <span className="font-mono text-[9px] text-cyan-400 uppercase tracking-widest">
          SPATIAL HARDWARE OS
        </span>
        <h4 className="font-display font-bold text-lg text-white">GEN-III NEURAL CORE</h4>
        <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[9px]">
          120 FPS RETINA ENGINE
        </span>
      </div>
    </div>
  );
}

export function DeveloperInfraLandingPreview(): React.JSX.Element {
  return (
    <div className="w-full h-full p-3 bg-[#0d1117] text-white flex flex-col justify-between font-mono text-xs select-none">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          <span className="text-[10px] text-gray-400 ml-2">openui-infra.sh</span>
        </div>
        <span className="text-[10px] text-emerald-400">● RUNNING</span>
      </div>

      <div className="my-auto py-2 bg-black/50 p-2.5 rounded border border-white/5 space-y-1">
        <div className="text-gray-400 text-[11px]">$ openui deploy --cluster=global</div>
        <div className="text-emerald-400 text-[11px]">✔ 12 edge nodes synchronized (0.8ms)</div>
        <div className="text-cyan-400 text-[11px]">→ Ready at https://cluster.openui.run</div>
      </div>

      <div className="flex items-center justify-between text-[9px] text-gray-500 border-t border-white/10 pt-2">
        <span>LATENCY: 0.8ms</span>
        <span>REGION: US-EAST-1</span>
      </div>
    </div>
  );
}

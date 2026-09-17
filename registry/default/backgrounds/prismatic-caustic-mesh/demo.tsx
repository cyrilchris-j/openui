"use client";

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

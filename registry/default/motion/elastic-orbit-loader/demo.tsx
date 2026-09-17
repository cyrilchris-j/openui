import { ElasticOrbitLoader } from "./elastic-orbit-loader";

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

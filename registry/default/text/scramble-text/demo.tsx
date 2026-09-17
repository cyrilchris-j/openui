import { ScrambleText } from "./scramble-text";

export default function Demo() {
  return (
    <div className="flex min-h-[10rem] flex-col justify-center gap-4 bg-paper p-10">
      <ScrambleText text="REGISTRY ONLINE" className="text-step-2 text-ink" />
      <ScrambleText text="800 resources and counting" className="text-[0.9rem] text-graphite" />
    </div>
  );
}

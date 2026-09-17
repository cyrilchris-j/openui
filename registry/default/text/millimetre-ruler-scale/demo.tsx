import { MillimetreRulerScale } from "./millimetre-ruler-scale";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-10">
      <MillimetreRulerScale lengthMm={120} className="w-full max-w-xl" />
    </div>
  );
}

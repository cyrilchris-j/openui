import { FoundrySpecimenSheet } from "./foundry-specimen-sheet";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-10">
      <FoundrySpecimenSheet phrase="Quietly authoritative" className="w-full max-w-lg" />
    </div>
  );
}

import { KaraokeReadAlong } from "./karaoke-read-along";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-10">
      <KaraokeReadAlong
        chunks={["Registries", "should", "validate", "at", "build", "time,", "not", "in", "production."]}
      />
    </div>
  );
}

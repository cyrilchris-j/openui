import { WaveHandoff } from "./wave-handoff";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-10">
      <WaveHandoff
        className="max-w-lg"
        rows={[
          ["author", "schema", "validate"],
          ["mount", "index"],
          ["install", "compose", "ship"],
        ]}
      />
    </div>
  );
}

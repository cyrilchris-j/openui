import { IdleFadeWhisper } from "./idle-fade-whisper";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-10">
      <IdleFadeWhisper fadeSeconds={3}>
        Stop moving your pointer for a moment and watch this sentence whisper away.
      </IdleFadeWhisper>
    </div>
  );
}

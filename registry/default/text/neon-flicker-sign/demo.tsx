import { NeonFlickerSign } from "./neon-flicker-sign";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-ink p-10">
      <NeonFlickerSign className="text-step-4 tracking-[0.12em]" faultyIndices={[3]}>
        Open All Night
      </NeonFlickerSign>
    </div>
  );
}

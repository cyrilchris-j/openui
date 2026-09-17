import { BlindDebossToggle } from "./blind-deboss-toggle";

export default function Demo() {
  return (
    <div className="flex min-h-[12rem] items-center justify-center p-10" style={{ background: "#f0e8d6" }}>
      <BlindDebossToggle defaultOn />
    </div>
  );
}

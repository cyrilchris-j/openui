import { EmbossPaintType } from "./emboss-paint-type";

export default function Demo() {
  return (
    <div className="flex min-h-[12rem] items-center justify-center p-10" style={{ background: "#f3ede2" }}>
      <EmbossPaintType className="text-step-5 tracking-tight">Pressed</EmbossPaintType>
    </div>
  );
}

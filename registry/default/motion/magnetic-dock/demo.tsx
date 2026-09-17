import { MagneticDock } from "./magnetic-dock";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-end justify-center bg-paper p-10">
      <MagneticDock icons={["📐", "✏️", "🗂️", "⚙️", "📦", "🔍"]} />
    </div>
  );
}

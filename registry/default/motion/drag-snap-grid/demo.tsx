import { DragSnapGrid } from "./drag-snap-grid";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-10">
      <DragSnapGrid labels={["schema", "validate", "mount", "index", "install", "compose"]} className="w-full max-w-sm" />
    </div>
  );
}

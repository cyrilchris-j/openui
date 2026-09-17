import { SpringSnappingSlider } from "./spring-snapping-slider";

export default function Demo() {
  return (
    <div className="flex min-h-[22rem] items-center justify-center bg-paper p-10">
      <SpringSnappingSlider min={0} max={100} step={20} defaultValue={60} />
    </div>
  );
}

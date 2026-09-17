import { ElasticStretchText } from "./elastic-stretch-text";

export default function Demo() {
  return (
    <div className="flex min-h-[12rem] items-center justify-center bg-paper p-10">
      <ElasticStretchText text="STRETCH" className="font-display text-step-4 tracking-tight text-ink" />
    </div>
  );
}

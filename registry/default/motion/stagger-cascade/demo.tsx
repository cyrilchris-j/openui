import { StaggerCascade } from "./stagger-cascade";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-10">
      <StaggerCascade className="w-72">
        <div className="rounded-lg border border-line bg-paper p-4 text-ink">Registry schema</div>
        <div className="rounded-lg border border-line bg-paper p-4 text-ink">Validated metadata</div>
        <div className="rounded-lg border border-line bg-paper p-4 text-ink">Mounted demos</div>
        <div className="rounded-lg border border-line bg-paper p-4 text-ink">Published resources</div>
      </StaggerCascade>
    </div>
  );
}

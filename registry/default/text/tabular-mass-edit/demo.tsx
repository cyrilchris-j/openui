import { TabularMassEdit } from "./tabular-mass-edit";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-10">
      <TabularMassEdit rows={4} />
    </div>
  );
}

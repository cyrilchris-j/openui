import { BadgePillStatus } from "./badge-pill-status";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center gap-3 bg-paper p-8">
      <BadgePillStatus label="ACTIVE" variant="success" />
      <BadgePillStatus label="DEGRADED" variant="warning" />
    </div>
  );
}

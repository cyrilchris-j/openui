import { AcrosticColumn } from "./acrostic-column";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-10">
      <AcrosticColumn
        hidden="REGISTRY"
        lines={[
          "Records what frameworks abandon,",
          "Entries with names, not vibes,",
          "Guarded by a schema's firm handshake,",
          "Indexed so search can find the truth,",
          "Signed by contributors across the world,",
          "Trusted because the machine checked it,",
          "Reusable by anyone, forever,",
          "Yours to fork, break, and mend.",
        ]}
      />
    </div>
  );
}

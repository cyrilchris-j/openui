import { TrackedChangesAccept } from "./tracked-changes-accept";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-10">
      <TrackedChangesAccept
        className="w-full max-w-xl"
        segments={[
          { kind: "text", text: "The registry" },
          { kind: "change", id: "c1", remove: "might", insert: "must" },
          { kind: "text", text: "validate every resource before it is" },
          { kind: "change", id: "c2", remove: "shown", insert: "published" },
          { kind: "text", text: "to the catalogue." },
        ]}
      />
    </div>
  );
}

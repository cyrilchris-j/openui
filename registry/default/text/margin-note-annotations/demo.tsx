import { MarginNoteAnnotations } from "./margin-note-annotations";

export default function Demo() {
  return (
    <div className="min-h-[16rem] bg-paper p-10">
      <MarginNoteAnnotations
        body="Registries outlive frameworks[1], so metadata must be portable[2] and boring on purpose[3]."
        notes={[
          { marker: "1", note: "Frameworks churn; files on disk persist." },
          { marker: "2", note: "JSON over magic imports." },
          { marker: "3", note: "Boring metadata is debuggable metadata." },
        ]}
      />
    </div>
  );
}

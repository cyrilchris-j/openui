import { SharedLayoutMorph } from "./shared-layout-morph";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-10">
      <SharedLayoutMorph
        className="w-full max-w-md"
        items={[
          { id: "a", title: "Schema", body: "The contract every resource signs." },
          { id: "b", title: "Validate", body: "Metadata checked before publish." },
          { id: "c", title: "Mount", body: "Demos proven in a real DOM." },
          { id: "d", title: "Index", body: "Searchable, filterable, listed." },
          { id: "e", title: "Install", body: "One command, files on disk." },
          { id: "f", title: "Compose", body: "Resources combined into products." },
        ]}
      />
    </div>
  );
}

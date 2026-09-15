import { SegmentedControl } from "./segmented-control";

export default function Demo() {
  return (
    <div className="flex flex-col items-start gap-6 bg-paper p-10 text-ink">
      <SegmentedControl
        label="Preview density"
        defaultValue="medium"
        options={[
          { value: "compact", label: "Compact" },
          { value: "medium", label: "Medium" },
          { value: "airy", label: "Airy" },
        ]}
      />
      <SegmentedControl
        label="Code flavour"
        size="sm"
        defaultValue="react"
        options={[
          { value: "react", label: "React" },
          { value: "typescript", label: "TypeScript" },
          { value: "tailwind", label: "Tailwind" },
        ]}
      />
    </div>
  );
}

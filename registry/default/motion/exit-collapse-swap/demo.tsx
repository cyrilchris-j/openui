import { ExitCollapseSwap } from "./exit-collapse-swap";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-10">
      <ExitCollapseSwap
        className="w-full max-w-sm"
        items={["schema.json", "demo.tsx", "README.md", "design.md", "registry.json"]}
      />
    </div>
  );
}

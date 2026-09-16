import { CopyButton } from "./copy-button";

export default function Demo() {
  return (
    <div className="flex flex-wrap items-center gap-4 bg-paper p-10 text-ink">
      <CopyButton value="openui add magnetic-button" />
      <CopyButton value="openui add grain-background" label="Install background" />
    </div>
  );
}

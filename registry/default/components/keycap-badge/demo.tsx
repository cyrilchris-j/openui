import { KeycapBadge } from "./keycap-badge";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center gap-2 bg-paper p-8">
      <KeycapBadge keyLabel="⌘" />
      <KeycapBadge keyLabel="K" />
    </div>
  );
}

import { HoverReplaceText } from "./hover-replace-text";

export default function Demo() {
  return (
    <div className="flex min-h-[10rem] flex-col items-center justify-center gap-6 bg-paper p-10">
      <HoverReplaceText base="Read the essay" alt="12 minute read" className="font-display text-step-2 text-ink" />
      <HoverReplaceText base="Install the CLI" alt="pnpm dlx openui" className="font-mono text-[0.9rem] text-ink" />
    </div>
  );
}

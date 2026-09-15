import { SplitText } from "./split-text";

export default function Demo() {
  return (
    <div className="bg-paper p-10 text-ink">
      <SplitText
        as="p"
        onView
        stagger={60}
        className="max-w-2xl font-[family-name:var(--font-display)] text-4xl leading-[1.05] tracking-[-0.02em]"
        text="A registry is only as good as the design language it refuses to repeat."
      />
    </div>
  );
}

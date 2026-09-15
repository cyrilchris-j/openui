import { ScrollReveal, ScrollRevealItem } from "./scroll-reveal";

const ITEMS = ["01 / Registry", "02 / Design DNA", "03 / Playground", "04 / CLI"];

export default function Demo() {
  return (
    <div className="space-y-24 bg-paper p-10 text-ink">
      <ScrollReveal mode="children" stagger={90} className="grid gap-6 sm:grid-cols-2">
        {ITEMS.map((item, index) => (
          <ScrollRevealItem key={item} index={index} className="border border-line p-6 font-mono text-xs uppercase tracking-[0.2em]">
            {item}
          </ScrollRevealItem>
        ))}
      </ScrollReveal>
      <ScrollReveal className="h-24 border border-line p-6">
        <p className="font-[family-name:var(--font-display)] text-2xl">Block reveal</p>
      </ScrollReveal>
    </div>
  );
}

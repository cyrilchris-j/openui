import { StickyStack, StickyStackCard } from "./sticky-stack";

const CARDS = [
  { label: "Step 01", title: "Choose a design system", body: "Pick the DNA first. Everything installed afterwards inherits its rules." },
  { label: "Step 02", title: "Compose from the registry", body: "Sections, blocks and text effects that already agree with each other." },
  { label: "Step 03", title: "Audit before shipping", body: "Run the anti-slop audit and fix what it finds." },
];

export default function Demo() {
  return (
    <div className="bg-paper p-10 text-ink">
      <StickyStack>
        {CARDS.map((card) => (
          <StickyStackCard key={card.label} label={card.label} title={card.title}>
            {card.body}
          </StickyStackCard>
        ))}
      </StickyStack>
    </div>
  );
}

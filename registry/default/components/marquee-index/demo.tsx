import { MarqueeIndex } from "./marquee-index";

const RESOURCES = [
  "asymmetric-hero",
  "editorial-heading",
  "split-text",
  "cursor-trail",
  "grain-background",
  "ledger-table",
  "kinetic-ticker",
  "spotlight-follow",
  "sticky-aside",
  "contour-lines",
];

export default function Demo() {
  return (
    <div className="bg-paper p-0 font-sans text-ink">
      <MarqueeIndex items={RESOURCES} />
      <MarqueeIndex items={["components", "text", "motion", "interactions"]} direction="right" duration={24} />
    </div>
  );
}

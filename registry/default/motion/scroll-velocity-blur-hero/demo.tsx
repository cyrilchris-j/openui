import { ScrollVelocityBlurHero } from "./scroll-velocity-blur-hero";

export default function Demo() {
  return (
    <div className="min-h-[80vh] bg-paper p-10">
      <ScrollVelocityBlurHero className="text-step-6 text-ink">Motion has a direction</ScrollVelocityBlurHero>
      <p className="mt-6 max-w-prose text-ink/70">Scroll fast — the headline ghosts along your velocity. Stop — it snaps crisp.</p>
      <div className="h-[60vh]" />
    </div>
  );
}

import { ScrollProgressRing } from "./scroll-progress-ring";

export default function Demo() {
  return (
    <div className="relative min-h-[90vh] bg-paper p-10">
      <ScrollProgressRing className="fixed bottom-6 right-6 z-10 text-ink" />
      <p className="text-ink/70">Scroll the page — the ring fills, click it to jump back.</p>
      <div className="h-[80vh]" />
    </div>
  );
}

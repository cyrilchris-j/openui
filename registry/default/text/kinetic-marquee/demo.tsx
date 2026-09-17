import { KineticMarquee } from "./kinetic-marquee";

export default function Demo() {
  return (
    <div className="min-h-[16rem] bg-paper pt-16">
      <KineticMarquee text="800 resources · zero lock-in · MIT licensed" />
      <p className="mt-10 text-center text-[0.8rem] text-graphite">Scroll the page — the band reacts to velocity.</p>
    </div>
  );
}

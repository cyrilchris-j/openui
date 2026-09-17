import { TiltSpringCard } from "./tilt-spring-card";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-10">
      <TiltSpringCard className="w-64 p-8">
        <p className="font-display text-xl text-ink">Physical object</p>
        <p className="mt-2 text-sm text-ink/70">Circle your pointer quickly — the card overshoots and settles like a gyroscope.</p>
      </TiltSpringCard>
    </div>
  );
}

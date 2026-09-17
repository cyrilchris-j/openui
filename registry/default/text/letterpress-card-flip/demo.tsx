import { LetterpressCardFlip } from "./letterpress-card-flip";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center p-10" style={{ background: "#e9e2d3" }}>
      <LetterpressCardFlip name="Mira Chen" role="Registry Steward" contact="mira@openui.dev" />
    </div>
  );
}

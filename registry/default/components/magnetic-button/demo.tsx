import { MagneticButton } from "./magnetic-button";

export default function Demo() {
  return (
    <div className="flex flex-wrap items-center gap-6 bg-paper p-10 font-sans text-ink">
      <MagneticButton onClick={() => console.log("explore")}>Explore the registry</MagneticButton>
      <MagneticButton strength={24} follow={0.3}>
        Wider field
      </MagneticButton>
      <MagneticButton disabled>Disabled</MagneticButton>
    </div>
  );
}

import { ScrollShearType } from "./scroll-shear-type";

export default function Demo() {
  return (
    <div className="min-h-[64vh] bg-paper p-10">
      <ScrollShearType className="text-step-5 text-ink">Lean into it</ScrollShearType>
      <p className="mt-6 max-w-prose text-ink/70">
        Scroll the page — the headline shears with your velocity and settles back upright.
      </p>
      <div className="h-[40vh]" />
    </div>
  );
}

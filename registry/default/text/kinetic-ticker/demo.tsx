import { KineticTicker } from "./kinetic-ticker";

export default function Demo() {
  return (
    <div className="bg-paper p-10 text-ink">
      <p className="max-w-3xl font-[family-name:var(--font-display)] text-4xl leading-tight">
        <KineticTicker
          prefix="Build interfaces with"
          phrases={["a fingerprint", "an editorial voice", "an opinion", "asymmetry"]}
          suffix="."
        />
      </p>
    </div>
  );
}

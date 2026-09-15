import { AsymmetricHero } from "./asymmetric-hero";

export default function Demo() {
  return (
    <AsymmetricHero
      eyebrow="OpenUI Design Registry"
      statement={
        <>
          Interfaces should have <em className="italic text-oxide">a fingerprint.</em>
        </>
      }
      supporting={
        <p>
          Open code, distributed through a registry, governed by design DNA that both people and AI
          tools read before they build anything.
        </p>
      }
      facts={[
        { label: "Resources", value: "48" },
        { label: "Design systems", value: "02" },
        { label: "Runtime deps", value: "0" },
        { label: "License", value: "MIT" },
      ]}
      actions={
        <a
          href="#explore"
          className="border border-ink px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] transition-colors hover:bg-ink hover:text-paper"
        >
          Explore the registry
        </a>
      }
    />
  );
}

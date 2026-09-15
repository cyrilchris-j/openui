import { EditorialHeading } from "./editorial-heading";

export default function Demo() {
  return (
    <div className="space-y-14 bg-paper p-10 text-ink">
      <EditorialHeading
        as="h1"
        size="lg"
        index="01 — Thesis"
        lead="Interfaces should have"
        emphasis="a fingerprint."
      />
      <EditorialHeading
        size="md"
        index="02 — Registry"
        lead="Open code, not open endpoints."
        emphasis="Install the source."
      />
      <EditorialHeading size="sm" lead="A heading without emphasis" rule={false} />
    </div>
  );
}

import { ElasticAccordion } from "./elastic-accordion";

export default function Demo() {
  return (
    <div className="flex min-h-[20rem] items-center justify-center bg-paper p-10">
      <ElasticAccordion
        className="w-full max-w-md"
        items={[
          { q: "Is the metadata contract strict?", a: "Yes. Missing fields fail validation, and validation fails the build." },
          { q: "Can I fork a resource?", a: "Every resource is MIT-licensed source on disk. Fork, rename, resubmit through uniqueness." },
          { q: "Why 800?", a: "Scale forces systems: generators, validators, indexes. Copy-paste does not survive 800." },
        ]}
      />
    </div>
  );
}

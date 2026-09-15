import { AccordionIndex } from "./accordion-index";

export default function Demo() {
  return (
    <div className="mx-auto max-w-2xl bg-paper p-8 font-sans text-ink">
      <AccordionIndex
        defaultOpen={0}
        items={[
          {
            title: "What makes a resource distinctive?",
            meta: "01",
            body: "A stated position on seven design axes — genre, composition, density, shape, motion, typography and colour — recorded in design.md next to the source.",
          },
          {
            title: "Can I edit the code after installing?",
            meta: "02",
            body: "Yes. Resources are distributed as source. There is no runtime package to keep in sync, and no wrapper you have to work around.",
          },
          {
            title: "How is motion handled?",
            meta: "03",
            body: "Every animated resource ships a reduced-motion path and a named duration scale, so motion is consistent across a project rather than per component.",
          },
        ]}
      />
    </div>
  );
}

import { ScrollSkewSections } from "./scroll-skew-sections";

export default function Demo() {
  return (
    <div className="bg-paper">
      <ScrollSkewSections
        sections={[
          { title: "Even sections lean forward", body: "Skew follows scroll velocity." },
          { title: "Odd sections lean back", body: "The shear alternates through the page." },
          { title: "Rest flattens everything", body: "Stop scrolling and the grid returns." },
        ]}
      />
    </div>
  );
}

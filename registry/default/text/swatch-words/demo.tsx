import { SwatchWords } from "./swatch-words";

export default function Demo() {
  return (
    <div className="flex min-h-[12rem] items-center justify-center bg-paper p-10">
      <SwatchWords
        swatches={[
          { name: "Terracotta", hex: "#c86a4a" },
          { name: "Sage", hex: "#8ba888" },
          { name: "Ink", hex: "#22252a" },
          { name: "Ochre", hex: "#d9a441" },
        ]}
      />
    </div>
  );
}

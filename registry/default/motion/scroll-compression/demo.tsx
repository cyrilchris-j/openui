import { ScrollCompression } from "./scroll-compression";

export default function Demo() {
  return (
    <div className="bg-paper">
      <div className="p-10 text-center text-ink/60">Scroll down ↓</div>
      <ScrollCompression
        panels={[
          { title: "Signal", body: "The first panel holds the headline claim." },
          { title: "Proof", body: "The second carries the evidence." },
          { title: "Action", body: "The last one asks for the click." },
        ]}
      />
    </div>
  );
}

import { EditorialDropCap } from "./editorial-drop-cap";

export default function Demo() {
  return (
    <div className="bg-paper p-10">
      <EditorialDropCap
        lines={3}
        text="Typography is the craft of endowing human language with a durable visual form, and a page that opens with a measured initial is making a promise about the care inside."
      />
    </div>
  );
}

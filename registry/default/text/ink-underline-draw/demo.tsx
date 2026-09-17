import { InkUnderlineDraw } from "./ink-underline-draw";

export default function Demo() {
  return (
    <div className="flex min-h-[10rem] items-center justify-center bg-paper p-10">
      <p className="text-lg text-ink">
        Read the <InkUnderlineDraw>manifesto</InkUnderlineDraw> before contributing.
      </p>
    </div>
  );
}

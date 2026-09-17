import { LiquidShapeMorph } from "./liquid-shape-morph";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-10">
      <LiquidShapeMorph className="h-56 w-56">
        <p className="text-center font-display text-lg text-paper">stay fluid</p>
      </LiquidShapeMorph>
    </div>
  );
}

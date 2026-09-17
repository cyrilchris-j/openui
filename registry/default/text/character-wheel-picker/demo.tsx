import { CharacterWheelPicker } from "./character-wheel-picker";

export default function Demo() {
  return (
    <div className="flex min-h-[12rem] items-center justify-center bg-paper p-10">
      <CharacterWheelPicker length={5} />
    </div>
  );
}

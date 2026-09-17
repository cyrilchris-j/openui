import { BrailleDualRender } from "./braille-dual-render";

export default function Demo() {
  return (
    <div className="flex min-h-[12rem] items-center justify-center bg-paper p-10">
      <BrailleDualRender>Open to all</BrailleDualRender>
    </div>
  );
}

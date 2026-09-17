import { SpringDrawer } from "./spring-drawer";

export default function Demo() {
  return (
    <div className="flex min-h-[20rem] items-center justify-center bg-paper p-10">
      <SpringDrawer className="w-full max-w-md">
        <p className="font-display text-lg text-ink">Velocity-aware</p>
        <p className="mt-2 text-sm text-ink/70">Flick me and I finish the gesture. Drag slowly and I need majority travel.</p>
      </SpringDrawer>
    </div>
  );
}

import { TypewriterStack } from "./typewriter-stack";

export default function Demo() {
  return (
    <div className="flex min-h-[10rem] items-center justify-center bg-paper p-10">
      <p className="font-mono text-step-2 text-ink">
        <TypewriterStack phrases={["install once.", "own forever.", "compose freely."]} />
      </p>
    </div>
  );
}

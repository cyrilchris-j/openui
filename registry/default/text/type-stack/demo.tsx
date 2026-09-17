import { TypeStack } from "./type-stack";

export default function Demo() {
  return (
    <div className="flex min-h-[12rem] items-center justify-center bg-paper p-10">
      <p className="font-display text-step-3 text-ink">
        Design is <TypeStack phrases={["structure.", "rhythm.", "restraint.", "contrast."]} />
      </p>
    </div>
  );
}

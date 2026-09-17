import { VelocityFadeList } from "./velocity-fade-list";

export default function Demo() {
  return (
    <div className="min-h-[70vh] bg-paper p-10">
      <div className="h-[30vh]" />
      <VelocityFadeList
        rows={["Fast scroll dissolves me", "Slow scroll restores me", "Motion measures impatience", "Focus returns on rest"]}
        className="max-w-md"
      />
      <div className="h-[40vh]" />
    </div>
  );
}

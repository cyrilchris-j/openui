import { useEffect, useState } from "react";
import { LetterSlotMachine } from "./letter-slot-machine";

export default function Demo() {
  const words = ["OPEN", "SOURCE", "UI", "MILL"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % words.length), 2200);
    return () => window.clearInterval(timer);
  }, [words.length]);

  return (
    <div className="flex min-h-[12rem] items-center justify-center bg-paper p-10">
      <LetterSlotMachine value={words[index]!} className="text-step-4 text-ink" />
    </div>
  );
}

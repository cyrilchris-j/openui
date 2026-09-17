import { useState } from "react";
import { DecryptText } from "./decrypt-text";

export default function Demo() {
  const [run, setRun] = useState(1);
  return (
    <div className="flex min-h-[10rem] flex-col items-start justify-center gap-5 bg-ink p-10">
      <DecryptText
        runToken={run}
        text="ACCESS GRANTED"
        className="text-step-2 text-moss"
      />
      <button
        type="button"
        onClick={() => setRun((value) => value + 1)}
        className="border border-line px-3 py-1.5 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-paper transition-colors hover:border-oxide hover:text-oxide"
      >
        Re-run decryption
      </button>
    </div>
  );
}

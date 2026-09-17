import { useEffect, useState } from "react";
import { TallyGlyphCounter } from "./tally-glyph-counter";

export default function Demo() {
  const [value, setValue] = useState(12);

  useEffect(() => {
    const timer = window.setInterval(() => setValue((v) => (v >= 33 ? 3 : v + 3)), 1800);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-[13rem] items-center justify-center bg-paper p-10">
      <TallyGlyphCounter value={value} className="text-step-2" />
    </div>
  );
}

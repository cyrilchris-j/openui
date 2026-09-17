import { useEffect, useState } from "react";
import { CountUpSpring } from "./count-up-spring";

export default function Demo() {
  const [value, setValue] = useState(100);

  useEffect(() => {
    const timer = window.setInterval(
      () => setValue((current) => Math.max(0, current + Math.round((Math.random() - 0.35) * 60))),
      1800,
    );
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-[13rem] flex-col items-center justify-center gap-2 bg-paper p-10">
      <CountUpSpring value={value} className="font-display text-6xl text-ink" />
      <p className="font-mono text-xs text-ink/50">resources published</p>
    </div>
  );
}

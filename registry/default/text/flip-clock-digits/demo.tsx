import { useEffect, useState } from "react";
import { FlipClockDigits } from "./flip-clock-digits";

export default function Demo() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setSeconds((value) => (value + 1) % 60), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-[12rem] items-center justify-center bg-paper p-10">
      <FlipClockDigits value={seconds} digits={2} className="text-step-4" />
    </div>
  );
}

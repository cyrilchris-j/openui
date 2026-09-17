import { useEffect, useState } from "react";
import { PasswordStrengthMark } from "./password-strength-mark";

export default function Demo() {
  const scores = [0, 1, 2, 3, 4];
  const [index, setIndex] = useState(2);

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % scores.length), 1400);
    return () => window.clearInterval(timer);
  }, [scores.length]);

  return (
    <div className="flex min-h-[11rem] items-center justify-center bg-paper p-10">
      <PasswordStrengthMark score={scores[index]!} className="text-step-3 text-ink" />
    </div>
  );
}

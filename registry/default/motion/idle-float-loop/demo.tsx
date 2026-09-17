import { IdleFloatLoop } from "./idle-float-loop";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-10">
      <IdleFloatLoop
        children={[
          { content: "🎈", amplitude: 14, periodSeconds: 3.4 },
          { content: "☁️", amplitude: 8, periodSeconds: 5, phase: 1.4 },
          { content: "🪁", amplitude: 18, periodSeconds: 4.2, phase: 2.6 },
        ]}
      />
    </div>
  );
}

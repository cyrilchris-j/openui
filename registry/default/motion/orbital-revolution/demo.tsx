import { OrbitalRevolution } from "./orbital-revolution";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-10">
      <OrbitalRevolution
        bodies={[
          { label: "ui", radius: 110, periodSeconds: 6, phase: 0 },
          { label: "api", radius: 82, periodSeconds: 4.2, phase: 2.1 },
          { label: "cli", radius: 60, periodSeconds: 3, phase: 4.4 },
        ]}
      />
    </div>
  );
}

import { GerundLoadingLabel } from "./gerund-loading-label";

export default function Demo() {
  return (
    <div className="flex min-h-[12rem] items-center justify-center bg-paper p-10">
      <GerundLoadingLabel stages={["Reading registry", "Validating schemas", "Linking dependencies", "Writing types"]} />
    </div>
  );
}

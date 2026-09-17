import { TfAutoEmphasis } from "./tf-auto-emphasis";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-10">
      <TfAutoEmphasis className="w-full max-w-lg">
        The registry stores resources. Resources carry metadata. Metadata makes the registry trustworthy, and trust makes the resources useful. Useful resources make the registry worth keeping.
      </TfAutoEmphasis>
    </div>
  );
}

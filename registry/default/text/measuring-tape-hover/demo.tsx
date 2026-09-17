import { MeasuringTapeHover } from "./measuring-tape-hover";

export default function Demo() {
  return (
    <div className="flex min-h-[13rem] items-center justify-center bg-paper p-10">
      <MeasuringTapeHover className="w-full max-w-lg">
        Hover a word to measure it against the type size.
      </MeasuringTapeHover>
    </div>
  );
}

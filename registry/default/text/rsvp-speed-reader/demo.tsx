import { RsvpSpeedReader } from "./rsvp-speed-reader";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-10">
      <RsvpSpeedReader
        text="Speed reading works by removing the eye movement between words and presenting each one at a fixed point."
        wpm={320}
        className="w-full max-w-md"
      />
    </div>
  );
}

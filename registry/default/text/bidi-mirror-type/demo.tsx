import { BidiMirrorType } from "./bidi-mirror-type";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-10">
      <BidiMirrorType ltr="Open source for everyone" rtl="مفتوح المصدر للجميع" />
    </div>
  );
}

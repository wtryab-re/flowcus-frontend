import Simulator from "./Simulator";
import { BlurFade } from "@/components/ui/blur-fade";
export default function Test() {
  return (
    <>
      <section
        className="min-h-screen w-full px-4 sm:px-8 lg:px-12 py-2 max-w-7xl mx-auto hidden md:block "
        id="test"
      >
        <BlurFade inView={true} inViewMargin="0px" direction="up">
          <div className="text-4xl sm:text-5xl font-black uppercase tracking-tight opacity-75 mb-3 text-(--brand-font-color)">
            <p className="">Extension Simulator</p>
          </div>
          <div className="px-10 xl:px-0 border-b border-(--brand-font-color)/15 pb-8">
            <Simulator></Simulator>
          </div>
        </BlurFade>
      </section>
    </>
  );
}

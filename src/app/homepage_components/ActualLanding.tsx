"use client";

import { Ripple } from "@/components/ui/ripple";
import { BlurFade } from "@/components/ui/blur-fade";
import { IoMdOpen } from "react-icons/io";
import { ShinyButton } from "@/components/ui/shiny-button";
export default function ActualLanding() {
  const hook = "Tame the Distractions. Accelerate Your Reading.";
  const title = "Flowcus";
  const live = process.env.NEXT_PUBLIC_published || "false";
  const liveURL = process.env.NEXT_PUBLIC_liveURL || "";
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Ripple mainCircleOpacity={0.8} mainCircleSize={450} numCircles={15} />
      <div className="justify-center text-center flex flex-col items-center text-(--brand-font-color) h-full">
        <BlurFade duration={0.7} inView={true}>
          <h1 className="uppercase font-extrabold text-7xl ">{title}</h1>
          <p className="font-extralight">{hook}</p>
          {live === "false" ? (
            <button className="font-bold mt-2">Coming Soon</button>
          ) : (
            <ShinyButton
              className="mt-2"
              onClick={() => window.open(liveURL, "_blank")}
            >
              <a className="flex justify-center items-center gap-1 font-bold font-heading text-(--brand-font-color)">
                <p>Get Now</p>
                <IoMdOpen />
              </a>
            </ShinyButton>
          )}
        </BlurFade>
      </div>
    </div>
  );
}

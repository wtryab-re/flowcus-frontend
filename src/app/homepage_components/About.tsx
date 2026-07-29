import { BlurFade } from "@/components/ui/blur-fade";
import { FaEye, FaSun } from "react-icons/fa";
import { GiSoundWaves } from "react-icons/gi";
import { MdOutlineFontDownload } from "react-icons/md";

export default function About() {
  const description =
    "Flowcus combines smart Bionic highlighting, easy-to-read fonts, focus sounds and sepia tints to turn overwhelming text into effortless reading";

  const audience = ["ADHD", "Dyslexia", "Reading Fatigue", "Processing Delays"];

  const focusMechanisms = [
    {
      name: "Eye Tracking Anchors",
      description:
        "Bolds words so your eyes anchor instantly and your brain fills in the rest.",
      science:
        "Reduces micro-saccadic eye jumps and leverages foveal vision to recognize words faster without scanning every letter.",
      icon: <FaEye className="w-5 h-5" />,
    },
    {
      name: "Screen-Legible Overrides",
      description:
        "Replaces hard-to-read web fonts with clean fonts like Verdana and Open Sans.",
      science:
        "Eliminates visual crowding, preventing letters from blurring or swapping lines for readers with ADHD or dyslexia.",
      icon: <MdOutlineFontDownload className="w-5 h-5" />,
    },
    {
      name: "Eye-Comfort Overlay",
      description:
        "Replaces harsh white screen glare with a warm, low-contrast sepia tint.",
      science:
        "Lowers luminance contrast and retinal glare, easing strain on the visual cortex during long reading sessions.",
      icon: <FaSun className="w-5 h-5" />,
    },
    {
      name: "Focus Soundscapes",
      description:
        "Plays a soothing brown noise background blended with a subtle 40Hz focus tone.",
      science:
        "Masks ambient noise via stochastic resonance while encouraging Gamma brainwave entrainment for deep focus.",
      icon: <GiSoundWaves className="w-5 h-5" />,
    },
  ];

  return (
    <section
      className="min-h-screen w-full px-4 sm:px-8 lg:px-12 py-5 max-w-7xl mx-auto text-(--brand-font-color)"
      id="about"
    >
      {/* Top Header Section */}
      <BlurFade direction="up" inView={true} inViewMargin={"0px"}>
        <div className="border-b border-(--brand-font-color)/15 pb-8 mb-8">
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight opacity-75 mb-6 text-(--brand-font-color)">
            About
          </h2>

          {/* Side-by-Side: Description on Left, Checklist on Right */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12">
            {/* Main Pitch Description */}
            <h1 className="w-full lg:w-3/5 text-xl sm:text-2xl lg:text-3xl font-extrabold leading-relaxed">
              <span className="block mb-4  ">
                The only Bionic Reader on Chrome that actually works on web
                pages & PDFs.
              </span>
              {description}
            </h1>

            {/* Checklist Next to Description */}
            <div className="w-full lg:w-2/5 border-l-2 border-(--brand-font-color)/20 pl-6 py-1 shrink-0">
              <p className="text-xs font-bold uppercase tracking-widest text-(--brand-font-color) opacity-70 mb-4">
                Tailored Specifically For
              </p>
              <div className="grid grid-cols-2 gap-3">
                {audience.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="text-xs text-(--brand-font-color) opacity-70">
                      ✓
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-(--brand-font-color)">
                      {item.trim()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </BlurFade>

      {/* Focus Mechanisms Section */}
      <BlurFade direction="up" inView={true} inViewMargin={"0px"}>
        <div>
          <div className="mb-4 border-(--brand-font-color) ">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight opacity-75 text-(--brand-font-color)">
              Focus Mechanisms
            </h2>
            <p className="text-base opacity-90">
              Why Flowcus helps minds diagnosed with ADHD, dyslexia, and
              processing delays.
            </p>
          </div>

          {/* 2-Column Responsive Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-(--brand-font-color)/15 pb-8 sm:gap-8">
            {focusMechanisms.map((mechanism) => (
              <div
                key={mechanism.name}
                className="border border-(--brand-font-color)/20 rounded-xl p-6 sm:p-8 bg-(--brand-font-color)/2 hover:bg-(--brand-font-color)/5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-lg border border-(--brand-font-color)/20 bg-(--brand-font-color)/10 text-(--brand-font-color)">
                      {mechanism.icon}
                    </div>
                    <h3 className="text-xl font-bold tracking-tight">
                      {mechanism.name}
                    </h3>
                  </div>

                  <p className="text-base opacity-90 mb-6">
                    {mechanism.description}
                  </p>
                </div>

                {/* Science Highlight Box */}
                <div className="mt-auto p-4 rounded-lg bg-(--brand-font-color)/5 border border-(--brand-font-color)/15">
                  <p className="text-[11px] font-extrabold uppercase tracking-widest opacity-70 mb-1.5">
                    The Science Behind It
                  </p>
                  <p className="text-xs sm:text-sm leading-relaxed opacity-85">
                    {mechanism.science}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </BlurFade>
    </section>
  );
}

import { FiCheck } from "react-icons/fi";
import { BlurFade } from "@/components/ui/blur-fade";
export default function Pricing() {
  const plans = [
    {
      name: "Free",
      description: "Soothing audio environments to help you drop into focus.",
      price: "$0",
      period: "/month",
      buttonText: "Get started",
      buttonVariant: "secondary",
      highlighted: false,
      features: [
        "Focus soundscapes (Brown Noise & 40Hz)",
        "Eye-comfort overlay & sepia shield",
      ],
    },
    {
      name: "Pro",
      description: "Essential visual tools for web-only reading.",
      price: "$1",
      period: "/month",
      buttonText: "Get started",
      buttonVariant: "secondary",
      highlighted: false,
      features: [
        "Everything in Free",
        "Webpage Bionic reading",
        "Easy-to-read font overrides",
      ],
    },
    {
      name: "Power",
      description:
        "Unlocks the full Flowcus engine across all web pages and PDFs.",
      price: "$3",
      period: "/month",
      badge: "Best Value",
      buttonText: "Get started",
      buttonVariant: "primary",
      highlighted: true,
      features: [
        "Everything in Pro",
        "PDF Bionic reading",
        "Priority feature updates",
      ],
    },
  ];

  const live = process.env.NEXT_PUBLIC_published || "false";

  return (
    <section
      className="min-h-screen w-full px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto text-(--brand-font-color) "
      id="pricing"
    >
      <BlurFade direction="up" inView={true} inViewMargin={"0px"}>
        <div className="text-center mb-6">
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight opacity-75 mb-2 text-(--brand-font-color)">
            Pricing
          </h2>
        </div>
      </BlurFade>

      {/* Pricing Cards Grid */}
      <BlurFade direction="up" inView={true} inViewMargin={"0px"}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch border-b border-(--brand-font-color)/15 pb-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all border ${
                plan.highlighted
                  ? "border-(--brand-font-color) ring-2 ring-(--brand-font-color)/40 bg-(--brand-font-color)/10 scale-[1.02]"
                  : "border-(--brand-font-color)/20 hover:border-(--brand-font-color)/40 bg-(--brand-font-color)/2 transition-all duration-300"
              }`}
            >
              {/* Optional Badge for $3 Plan */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-full border border-(--brand-font-color) bg-(--brand-font-color) text-black shadow-sm">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div>
                {/* Centered Plan Title & Description */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold tracking-tight mb-3">
                    {plan.name}
                  </h3>
                  <p className="text-sm opacity-70 leading-relaxed min-h-10 max-w-xs mx-auto">
                    {plan.description}
                  </p>
                </div>

                {/* Centered Price Display */}
                <div className="text-center mb-8">
                  <span className="text-5xl font-extrabold tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-sm opacity-50 font-normal ml-1">
                    {plan.period}
                  </span>
                </div>

                {/* Features List with Green Checkmarks */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-sm opacity-90"
                    >
                      <FiCheck className="w-4 h-4 shrink-0 text-emerald-500 font-bold" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Button */}
              {live === "false" ? (
                <></>
              ) : (
                <button
                  className={`w-full py-3 px-4 rounded-xl text-sm font-semibold transition-all mt-auto cursor-pointer ${
                    plan.buttonVariant === "primary"
                      ? "border border-(--brand-font-color) bg-(--brand-font-color) text-black hover:opacity-90 font-bold shadow-sm transition-all duration-300"
                      : "border border-(--brand-font-color)/30 bg-(--brand-font-color)/5 hover:bg-(--brand-font-color)/10 text-(--brand-font-color) transition-all duration-300"
                  }`}
                >
                  {plan.buttonText}
                </button>
              )}
            </div>
          ))}
        </div>
      </BlurFade>
    </section>
  );
}

import Footer from "@/app/homepage_components/Footer";

export const metadata = {
  title: "Terms of Service — Flowcus",
  description:
    "Terms of Service and conditions for using the Flowcus Chrome Extension and web application.",
};

export default function TermsPage() {
  const termsSections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      content: (
        <p>
          By downloading, installing, accessing, or using the{" "}
          <strong>Flowcus</strong> Chrome Extension or website (collectively,
          the &quot;Service&quot;), you agree to be bound by these Terms of
          Service (&quot;Terms&quot;). If you do not agree to these Terms,
          please do not install or use the Service.
        </p>
      ),
    },
    {
      id: "description",
      title: "2. Description of Service",
      content: (
        <p>
          Flowcus provides accessibility, legibility, and ADHD-focused reading
          enhancements, including Bionic Reading text transformations,
          typography adjustments, background tinting, and focus soundscapes
          across web pages and PDF documents.
        </p>
      ),
    },
    {
      id: "license",
      title: "3. License and Use",
      content: (
        <div className="space-y-3">
          <p>
            Flowcus grants you a limited, non-exclusive, non-transferable,
            revocable license to use the extension for your personal,
            non-commercial, or internal business purposes in accordance with
            these Terms.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              You may not modify, reverse engineer, decompile, or disassemble
              the extension source code except as permitted by applicable law.
            </li>
            <li>
              You may not use Flowcus for any unlawful purpose or to interfere
              with the proper operation of third-party websites.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "subscriptions",
      title: "4. Premium Subscriptions & Billing",
      content: (
        <div className="space-y-3">
          <p>
            Flowcus offers free features as well as premium tier upgrades. Paid
            tiers and subscription licensing are managed securely through{" "}
            <strong>ExtensionPay</strong> and processed via{" "}
            <strong>Stripe</strong>.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Payments:</strong> All fees are billed in advance
              according to the plan selected during checkout.
            </li>
            <li>
              <strong>Refunds:</strong> Refund requests are subject to the terms
              provided at the time of purchase or as required by applicable
              consumer protection laws.
            </li>
            <li>
              <strong>Cancellation:</strong> You may cancel or manage your
              active subscription at any time through the ExtensionPay account
              portal accessible within the extension settings.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "intellectual-property",
      title: "5. Intellectual Property Rights",
      content: (
        <p>
          All title, ownership rights, and intellectual property rights in and
          to Flowcus (including but not limited to software code, branding,
          logos, and UI designs) remain the exclusive property of Flowcus.
          Third-party trademarks, fonts (such as Google Fonts), and assets
          belong to their respective owners.
        </p>
      ),
    },
    {
      id: "disclaimer",
      title: "6. Disclaimer of Warranties",
      content: (
        <p>
          The Service is provided on an <strong>&quot;AS IS&quot;</strong> and{" "}
          <strong>&quot;AS AVAILABLE&quot;</strong> basis without warranties of
          any kind, whether express or implied. While Flowcus aims to improve
          reading efficiency and focus, we do not guarantee specific educational
          or productivity outcomes.
        </p>
      ),
    },
    {
      id: "limitation-liability",
      title: "7. Limitation of Liability",
      content: (
        <p>
          To the maximum extent permitted by law, Flowcus and its creators shall
          not be liable for any indirect, incidental, special, consequential, or
          punitive damages arising out of or related to your use of or inability
          to use the Service.
        </p>
      ),
    },
    {
      id: "changes",
      title: "8. Changes to Terms",
      content: (
        <p>
          We reserve the right to update or modify these Terms at any time. Any
          changes will be posted on this page with an updated &quot;Last
          Updated&quot; date. Continued use of Flowcus following any updates
          constitutes acceptance of the new Terms.
        </p>
      ),
    },
    {
      id: "contact",
      title: "9. Contact Us",
      content: (
        <div className="space-y-2">
          <p>
            If you have any questions or concerns regarding these Terms of
            Service, please contact us at:
          </p>
          <p className="font-semibold text-(--brand-font-color)">
            Email:{" "}
            <a
              href="mailto:wtryab@gmail.com"
              className="underline hover:opacity-80"
            >
              wtryab@gmail.com
            </a>
          </p>
        </div>
      ),
    },
  ];

  return (
    <main className="min-h-screen w-full pt-16 pb-8 mx-auto text-(--brand-font-color) flex flex-col justify-between bg-linear-to-br from-(--brand-color) to-(--gradient-color)">
      {" "}
      <div className="px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="border-b border-(--brand-font-color)/15 pb-8 mb-10">
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-3">
            Terms of Service
          </h1>
          <p className="text-sm opacity-60 font-medium">
            Effective Date: July 30, 2026 &nbsp;|&nbsp; Last Updated: July 30,
            2026
          </p>
        </div>

        {/* Intro */}
        <p className="text-sm sm:text-base opacity-85 leading-relaxed mb-10">
          Welcome to <strong>Flowcus</strong>. These Terms of Service govern
          your access to and use of the Flowcus Chrome extension, website, and
          related reading enhancement tools.
        </p>

        {/* Sections */}
        <div className="space-y-12 mb-16">
          {termsSections.map((section) => (
            <section key={section.id} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-(--brand-font-color) border-b border-(--brand-font-color)/10 pb-2">
                {section.title}
              </h2>
              <div className="text-sm sm:text-base opacity-80 leading-relaxed">
                {section.content}
              </div>
            </section>
          ))}
        </div>
      </div>
      {/* Footer */}
      <div className="mt-12">
        <Footer />
      </div>
    </main>
  );
}

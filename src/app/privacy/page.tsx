import Footer from "@/app/homepage_components/Footer";

export const metadata = {
  title: "Privacy Policy — Flowcus",
  description: "Privacy Policy for Flowcus - Bionic ADHD Reader.",
};

export default function PrivacyPage() {
  const permissions = [
    {
      name: "storage",
      desc: "Saved settings and preferences are stored directly on your browser.",
    },
    {
      name: "offscreen",
      desc: "Enables centralized, low-latency audio playback for focus soundscapes without audio overlap across multiple tabs.",
    },
    {
      name: "tabs",
      desc: "Allows the extension to seamlessly redirect PDF links to the custom Flowcus Bionic PDF viewer.",
    },
    {
      name: "declarativeNetRequest",
      desc: "Used for background resource routing and smooth PDF viewing transitions.",
    },
    {
      name: "host_permissions (<all_urls>)",
      desc: "Required to apply typography modifications, Bionic text formatting, and sepia overlays across the web pages and PDFs you choose to view.",
    },
  ];

  const thirdParties = [
    {
      provider: "ExtensionPay / Stripe",
      purpose: "Payment processing & account licensing",
      data: "Email address, subscription status, billing information",
    },
    {
      provider: "Google Fonts",
      purpose: "Delivering custom legibility fonts",
      data: "Standard HTTP request headers (e.g., IP address, user agent)",
    },
  ];

  return (
    <main className="min-h-screen w-full  pt-16 pb-8 mx-auto text-(--brand-font-color) flex flex-col justify-between bg-linear-to-br from-(--brand-color) to-(--gradient-color)">
      <div
        className="px-4 sm:px-8 lg:px-12
      "
      >
        {/* Header */}
        <div className="border-b border-(--brand-font-color)/15 pb-8 mb-10">
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-3">
            Privacy Policy
          </h1>
          <p className="text-sm opacity-60 font-medium">
            Effective Date: July 30, 2026 &nbsp;|&nbsp; Last Updated: July 30,
            2026
          </p>
        </div>

        {/* Introduction */}
        <div className="space-y-6 text-sm sm:text-base opacity-85 leading-relaxed mb-10">
          <p>
            At <strong>Flowcus</strong>, we believe that focus and readability
            should never come at the expense of your personal privacy. Flowcus
            is designed to process your reading material locally on your device
            whenever possible.
          </p>
          <p>
            This Privacy Policy explains what data Flowcus collects, how it is
            used, and how your privacy is protected when you use our Chrome
            Extension.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-6 mb-12">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-(--brand-font-color) border-b border-(--brand-font-color)/10 pb-2">
            1. Information We Collect and Process
          </h2>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold opacity-95">
              A. Local On-Device Data (Not Collected or Transferred)
            </h3>
            <p className="text-sm sm:text-base opacity-80 leading-relaxed">
              Flowcus operates primarily on your local machine to adjust
              typography, generate Bionic Reading text overlays, apply sepia
              tinting, and play acoustic masking sounds.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base opacity-80">
              <li>
                <strong>Page Text & Web Content:</strong> Flowcus scans and
                transforms text on pages you visit directly inside your
                browser’s Document Object Model (DOM). None of your web page
                text, browsing activity, or reading content is ever recorded,
                stored on external servers, or transmitted to us.
              </li>
              <li>
                <strong>PDF Content:</strong> When you open a PDF, Flowcus
                processes the document locally in your browser to render the
                custom Bionic viewer.
              </li>
              <li>
                <strong>User Preferences:</strong> Your extension settings (such
                as bionic bolding ratios, selected fonts, sepia intensity, and
                audio volume) are saved locally using Chrome’s{" "}
                <code className="bg-(--brand-font-color)/10 px-1.5 py-0.5 rounded text-xs">
                  storage.local
                </code>{" "}
                API.
              </li>
            </ul>
          </div>

          <div className="space-y-4 pt-2">
            <h3 className="text-lg font-semibold opacity-95">
              B. Monetization & Payment Data (ExtensionPay)
            </h3>
            <p className="text-sm sm:text-base opacity-80 leading-relaxed">
              To unlock premium capabilities, Flowcus integrates with
              ExtensionPay, a secure third-party service that handles account
              creation, subscriptions, and payment processing (via Stripe).
            </p>
            <p className="text-sm sm:text-base opacity-80 leading-relaxed">
              When you upgrade or manage your subscription:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base opacity-80">
              <li>
                <strong>Email & Account Status:</strong> ExtensionPay collects
                your email address and subscription status to verify your
                account and grant access to paid features.
              </li>
              <li>
                <strong>Payment Credentials:</strong> All payment details
                (credit card numbers, billing addresses) are handled directly by
                secure payment processors (Stripe). Flowcus never sees or stores
                your financial or credit card information.
              </li>
            </ul>
          </div>

          <div className="space-y-4 pt-2">
            <h3 className="text-lg font-semibold opacity-95">
              C. External Assets
            </h3>
            <p className="text-sm sm:text-base opacity-80 leading-relaxed">
              <strong>Typography (Google Fonts):</strong> If you enable font
              overrides (such as Comic Neue or Open Sans), Flowcus fetches font
              stylesheets dynamically from Google Fonts. Google may collect
              standard technical logs (such as IP address and browser
              user-agent) as part of serving those static files.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-6 mb-12">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-(--brand-font-color) border-b border-(--brand-font-color)/10 pb-2">
            2. Explanation of Browser Permissions
          </h2>
          <p className="text-sm sm:text-base opacity-80 leading-relaxed">
            To deliver reading enhancements across websites and PDFs, Flowcus
            requests specific Chrome extension permissions:
          </p>
          <div className="space-y-3">
            {permissions.map((p) => (
              <div
                key={p.name}
                className="p-4 rounded-xl border border-(--brand-font-color)/15 bg-(--brand-font-color)/2"
              >
                <code className="text-xs font-bold uppercase tracking-wider bg-(--brand-font-color)/10 px-2 py-1 rounded">
                  {p.name}
                </code>
                <p className="text-sm opacity-80 mt-2 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-6 mb-12">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-(--brand-font-color) border-b border-(--brand-font-color)/10 pb-2">
            3. Data Sharing and Third Parties
          </h2>
          <p className="text-sm sm:text-base opacity-80 leading-relaxed">
            We do not sell, rent, trade, or monetize your personal data or
            reading habits. Data is only shared with essential third-party
            services required for operation:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-(--brand-font-color)/15 rounded-xl">
              <thead>
                <tr className="border-b border-(--brand-font-color)/15 bg-(--brand-font-color)/5 text-xs uppercase tracking-wider">
                  <th className="p-3 sm:p-4">Provider</th>
                  <th className="p-3 sm:p-4">Purpose</th>
                  <th className="p-3 sm:p-4">Data Handled</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-(--brand-font-color)/10 text-xs sm:text-sm opacity-80">
                {thirdParties.map((item) => (
                  <tr key={item.provider}>
                    <td className="p-3 sm:p-4 font-semibold">
                      {item.provider}
                    </td>
                    <td className="p-3 sm:p-4">{item.purpose}</td>
                    <td className="p-3 sm:p-4">{item.data}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-4 mb-12">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-(--brand-font-color) border-b border-(--brand-font-color)/10 pb-2">
            4. Data Security & Storage
          </h2>
          <p className="text-sm sm:text-base opacity-80 leading-relaxed">
            All preference data stays stored locally within your Chrome profile.
            You can erase all local data at any time by clearing your browser
            storage or uninstalling the Flowcus extension. Account and payment
            security for paid tiers is managed under standard bank-grade
            encryption protocols provided by ExtensionPay and Stripe.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-4 mb-12">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-(--brand-font-color) border-b border-(--brand-font-color)/10 pb-2">
            5. Changes to This Privacy Policy
          </h2>
          <p className="text-sm sm:text-base opacity-80 leading-relaxed">
            We may update this Privacy Policy from time to time to reflect
            functional updates or regulatory requirements. Any updates will be
            reflected in the <span className="font-bold">Last Updated</span>
            date at the top of this document.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-4 mb-16">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-(--brand-font-color) border-b border-(--brand-font-color)/10 pb-2">
            6. Contact Us
          </h2>
          <p className="text-sm sm:text-base opacity-80 leading-relaxed">
            If you have any questions, concerns, or feedback regarding this
            Privacy Policy or Flowcus, please reach out to us at our contact
            page or:
          </p>
          <p className="text-sm sm:text-base font-semibold text-(--brand-font-color)">
            Email:{" "}
            <a
              href="mailto:wtryab@gmail.com"
              className="underline hover:opacity-80"
            >
              wtryab@gmail.com
            </a>
          </p>
        </section>
      </div>

      {/* Footer Component */}
      <div className="">
        <Footer />
      </div>
    </main>
  );
}

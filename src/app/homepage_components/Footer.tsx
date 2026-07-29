import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full text-(--brand-font-color) pt-10">
      <div className="border-t border-(--brand-font-color)/15 p-6 sm:p-8">
        {/* Top Section: Brand & Nav Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6">
          {/* Logo & Brand Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="logo_2.png"
              alt=""
              className="rounded-md object-contain w-8"
            />
            <span className="text-xl font-black tracking-tight uppercase">
              Flowcus
            </span>
          </Link>

          {/* Navigation Links */}
          <ul className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium opacity-80">
            <li>
              <Link
                href="/#about"
                className="hover:opacity-100 transition-opacity"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="hover:opacity-100 transition-opacity"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/tos"
                className="hover:opacity-100 transition-opacity"
              >
                Terms of Service
              </Link>
            </li>

            <li>
              <Link
                href="/#contact"
                className="hover:opacity-100 transition-opacity"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Divider */}
        <div className="border-t border-(--brand-font-color)/10 pt-6">
          {/* Bottom Copyright Text */}
          <p className=" text-center text-xs sm:text-sm opacity-60">
            © {currentYear} FLOWCUS. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

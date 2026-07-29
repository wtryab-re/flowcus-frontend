"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
export default function Navbar() {
  const list = ["about", "test", "pricing", "contact"];
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show navbar after scrolling down 200 pixels
      if (window.scrollY > 10) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  const create_li = () => {
    return list.map((item) => (
      <li
        key={item}
        className="hover:transform-3d hover:scale-120 transition duration-200 text-(--brand-font-color)"
      >
        <a href={`#${item.toLowerCase()}`}>{item}</a>
      </li>
    ));
  };

  return (
    <header
      className={`fixed top-3 left-0 w-full z-10 flex justify-center p-2 text-xs ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      }
      ease-in-out duration-300
      `}
    >
      <div
        className="p-4 backdrop-blur-xs bg-black/20
 rounded-full"
      >
        <ul className="flex space-x-8 ">
          {create_li()}
          <li className="hover:transform-3d hover:scale-120 transition duration-200 text-(--brand-font-color)">
            <Link href="/privacy">privacy</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

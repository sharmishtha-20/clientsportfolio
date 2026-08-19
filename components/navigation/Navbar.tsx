"use client";

import { useState, useEffect } from "react";
import { ARTIST_DATA, NAV_ITEMS } from "@/data/content";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[990] transition-all duration-500 ${
          isScrolled
            ? "py-4 bg-[#F5F4EF]/90 backdrop-blur-md border-b border-[#D8D7D2]/60 shadow-[0_4px_30px_rgba(0,0,0,0.03)]"
            : "py-6 sm:py-8 bg-gradient-to-b from-black/70 via-black/30 to-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-12 flex items-center justify-between">
          {/* Logo / Artist Name */}
          <a
            href="#"
            className="group flex items-center space-x-3 text-left focus:outline-none"
            data-cursor="TOP"
          >
            <span
              className={`text-sm font-semibold tracking-tighter uppercase transition-transform group-hover:scale-105 ${
                isScrolled ? "text-[#111111]" : "text-[#F5F4EF] drop-shadow-sm"
              }`}
            >
              {ARTIST_DATA.name}
            </span>
            <span
              className={`hidden sm:inline-block text-[10px] tracking-widest font-mono border-l pl-3 transition-colors ${
                isScrolled
                  ? "text-[#777777] border-[#D8D7D2]"
                  : "text-neutral-300 border-white/25 drop-shadow-sm"
              }`}
            >
              AI FILMMAKER
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-12">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`hover-underline text-xs tracking-widest font-mono uppercase transition-all ${
                  isScrolled
                    ? "text-[#111111] opacity-75 hover:opacity-100"
                    : "text-[#F5F4EF] opacity-90 hover:opacity-100 drop-shadow-sm"
                }`}
                data-cursor="GO"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
              className={`text-xs font-mono tracking-widest uppercase px-3.5 py-1.5 rounded-full border transition-all ${
                isScrolled
                  ? "text-[#111111] border-[#111111]/30 hover:bg-[#111111] hover:text-[#F5F4EF]"
                  : "text-[#F5F4EF] border-white/40 bg-black/30 backdrop-blur-sm hover:bg-white hover:text-black"
              }`}
            >
              MENU
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Editorial Menu Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}

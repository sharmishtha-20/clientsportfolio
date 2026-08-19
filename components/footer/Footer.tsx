"use client";

import { ARTIST_DATA } from "@/data/content";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full py-12 px-6 sm:px-10 md:px-16 bg-[#F5F4EF] text-[#777777] border-t border-[#D8D7D2]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 text-xs font-mono tracking-widest uppercase">
        {/* Left info */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
          <span className="text-[#111111] font-semibold">{ARTIST_DATA.name}</span>
          <span className="hidden sm:inline-block text-[#D8D7D2]">/</span>
          <span>{ARTIST_DATA.role}</span>
        </div>

        {/* Right credits & Back to top */}
        <div className="flex items-center space-x-6 text-[#777777]">
          <span>© {ARTIST_DATA.year} ALL RIGHTS RESERVED</span>
          <button
            onClick={scrollToTop}
            className="hover:text-[#111111] transition-colors underline underline-offset-4"
          >
            TOP ↑
          </button>
        </div>
      </div>
    </footer>
  );
}

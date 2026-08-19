"use client";

import { useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { NAV_ITEMS, ARTIST_DATA } from "@/data/content";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const containerVariants: Variants = {
    closed: {
      opacity: 0,
      clipPath: "inset(0% 0% 100% 0%)",
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    open: {
      opacity: 1,
      clipPath: "inset(0% 0% 0% 0%)",
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as unknown as [number, number, number, number], staggerChildren: 0.08, delayChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    closed: { y: 30, opacity: 0 },
    open: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={containerVariants}
          className="fixed inset-0 z-[9990] bg-[#111111] text-[#F5F4EF] flex flex-col justify-between p-6 sm:p-10 md:hidden h-[100dvh] max-h-[100dvh] overflow-y-auto w-full"
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b border-neutral-800 pb-4">
            <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
              {ARTIST_DATA.name} {"//"} NAVIGATION
            </span>
            <button
              onClick={onClose}
              className="text-xs font-mono tracking-widest uppercase text-neutral-300 py-2 px-3 border border-neutral-700 rounded-full hover:bg-neutral-800 transition-colors"
            >
              CLOSE [×]
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-col space-y-4 my-auto">
            {NAV_ITEMS.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={onClose}
                variants={itemVariants}
                className="group flex items-baseline justify-between py-2 border-b border-neutral-800/60"
              >
                <span className="text-3xl font-light tracking-tighter group-hover:italic group-hover:translate-x-2 transition-all duration-300">
                  {item.label}
                </span>
                <span className="font-mono text-xs text-neutral-500 tracking-widest">
                  {item.number}
                </span>
              </motion.a>
            ))}
          </nav>

          {/* Footer info */}
          <div className="flex flex-col space-y-4 pt-6 border-t border-neutral-800">
            <div className="flex justify-between text-xs text-neutral-400 font-mono uppercase tracking-wider">
              <span>{ARTIST_DATA.location}</span>
              <a href={`mailto:${ARTIST_DATA.email}`} className="text-[#F5F4EF] hover:underline">
                {ARTIST_DATA.email}
              </a>
            </div>
            <div className="flex flex-wrap gap-4 sm:gap-6 text-xs text-neutral-400 font-mono uppercase">
              <a href={ARTIST_DATA.drive} target="_blank" rel="noreferrer" className="text-white hover:underline">
                The Drive ↗
              </a>
              <a href={ARTIST_DATA.socials.instagram} target="_blank" rel="noreferrer" className="hover:text-white">
                Instagram
              </a>
              <a href={ARTIST_DATA.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-white">
                LinkedIn
              </a>
              <a href={ARTIST_DATA.socials.behance} target="_blank" rel="noreferrer" className="hover:text-white">
                Behance
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

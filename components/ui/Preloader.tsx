"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ARTIST_DATA } from "@/data/content";

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            if (onComplete) onComplete();
          }, 300);
          return 100;
        }
        const diff = Math.floor(Math.random() * 18) + 8;
        return Math.min(prev + diff, 100);
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -20,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[100000] bg-[#111111] text-[#F5F4EF] flex flex-col justify-between p-8 md:p-16 pointer-events-auto"
        >
          <div className="flex justify-between items-center text-xs tracking-widest uppercase text-neutral-400 font-mono">
            <span>{ARTIST_DATA.name}</span>
            <span>{ARTIST_DATA.role}</span>
          </div>

          <div className="flex flex-col items-center justify-center space-y-4">
            <span className="text-display-hero font-light tracking-tighter tabular-nums">
              {progress < 10 ? `00${progress}` : progress < 100 ? `0${progress}` : "100"}
            </span>
            <div className="w-32 h-[1px] bg-neutral-800 relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 bottom-0 bg-[#F5F4EF]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-neutral-500 font-mono pt-2">
              INITIALIZING VISUAL ARCHIVE
            </span>
          </div>

          <div className="flex justify-between items-end text-xs tracking-widest uppercase text-neutral-500 font-mono">
            <span>{ARTIST_DATA.location}</span>
            <span>© {ARTIST_DATA.year}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { REALITY_CONTENT } from "@/data/content";

export default function RealitySlider() {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <div className="w-full max-w-2xl mx-auto my-12 select-none" data-cursor="DRAG">
      {/* Visual Instruction */}
      <div className="flex justify-between items-center text-xs font-mono tracking-widest text-neutral-400 uppercase mb-3">
        <span className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span>[AI GENERATION]</span>
        </span>
        <span className="text-[10px] text-neutral-500 hidden sm:inline-block">
          ← DRAG TO REVEAL REALITY →
        </span>
        <span className="flex items-center space-x-2">
          <span>[AUTHENTIC PHOTOGRAPH]</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
        </span>
      </div>

      {/* Comparison Container */}
      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
        className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-950 rounded-sm border border-neutral-800 shadow-2xl cursor-ew-resize"
      >
        {/* Layer 1: Real Photograph (Background) */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={REALITY_CONTENT.realImage}
            alt="Authentic 35mm photograph of the artist"
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            className="object-cover object-top"
          />
          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] font-mono tracking-widest text-emerald-400 uppercase rounded-sm border border-emerald-500/20">
            AUTHENTIC FILM // REAL
          </div>
        </div>

        {/* Layer 2: AI Generated Portrait (Clipped Foreground) */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden will-change-[clip-path]"
          style={{
            clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
          }}
        >
          <Image
            src={REALITY_CONTENT.aiImage}
            alt="AI Generated portrait of the artist"
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            className="object-cover object-top filter contrast-105"
          />
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] font-mono tracking-widest text-amber-400 uppercase rounded-sm border border-amber-500/20">
            SYNTHETIC PERSONA // AI
          </div>
        </div>

        {/* Dividing Handle */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-white pointer-events-none shadow-[0_0_12px_rgba(255,255,255,0.8)]"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-lg font-mono text-[10px] font-bold">
            ⟷
          </div>
        </div>
      </div>
    </div>
  );
}

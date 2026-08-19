"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { STILL_ARCHIVE_ITEMS } from "@/data/projects";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Archive() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const totalItems = STILL_ARCHIVE_ITEMS.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalItems);
  }, [totalItems]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems);
  }, [totalItems]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Mouse & Touch Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || dragStartX === null) return;
    const diff = e.clientX - dragStartX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) prevSlide();
      else nextSlide();
      setIsDragging(false);
      setDragStartX(null);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragStartX(null);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStartX === null) return;
    const diff = e.touches[0].clientX - dragStartX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) prevSlide();
      else nextSlide();
      setDragStartX(null);
    }
  };

  return (
    <section
      id="archive"
      className="relative w-full min-h-screen py-24 sm:py-32 md:py-40 bg-[#F5F4EF] text-[#111111] border-t border-[#D8D7D2] overflow-hidden select-none"
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Background Ambient Grid & Subtle Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(0,0,0,0.02),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.025)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-60" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 relative z-10 flex flex-col justify-between min-h-[720px]">
        {/* Section Header: Minimalist Editorial Header */}
        <div className="flex justify-between items-center border-b border-[#D8D7D2] pb-6">
          <div className="flex items-center space-x-3">
            <span className="font-mono text-xs tracking-widest text-[#111111] uppercase font-semibold">
              03 {"//"} THE STILL ARCHIVE
            </span>
            <span className="w-6 h-[1px] bg-[#D8D7D2] hidden sm:inline-block" />
            <span className="text-[11px] font-mono tracking-widest text-[#777777] uppercase hidden sm:inline-block">
              CURATED GENERATIVE STILLS
            </span>
          </div>

          {/* Slide Index Badge */}
          <div className="px-3.5 py-1 rounded-full border border-[#D8D7D2] bg-white text-xs font-mono tracking-widest text-[#111111] shadow-sm">
            [0{activeIndex + 1} / 0{totalItems}]
          </div>
        </div>

        {/* 3D Interactive Floating Card Rail */}
        <div
          className="relative w-full h-[460px] sm:h-[500px] md:h-[540px] my-auto flex items-center justify-center cursor-grab active:cursor-grabbing"
          style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          {STILL_ARCHIVE_ITEMS.map((item, index) => {
            // Calculate cyclic offset relative to activeIndex
            let offset = index - activeIndex;
            if (offset > totalItems / 2) offset -= totalItems;
            if (offset < -totalItems / 2) offset += totalItems;

            const isActive = offset === 0;
            const isVisible = Math.abs(offset) <= 2;

            if (!isVisible) return null;

            // 3D Matrix Transformations
            const translateX = offset * 260;
            const translateZ = isActive ? 80 : -Math.abs(offset) * 130;
            const rotateY = offset * -14;
            const scale = isActive ? 1.22 : Math.max(0.72, 1 - Math.abs(offset) * 0.16);
            const opacity = isActive ? 1 : Math.max(0.45, 1 - Math.abs(offset) * 0.28);
            const translateY = item.elevation + offset * 8;

            return (
              <div
                key={item.id}
                onClick={() => setActiveIndex(index)}
                style={{
                  transform: `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) rotateZ(${item.rotation}deg) scale(${scale})`,
                  zIndex: 50 - Math.abs(offset) * 10,
                  opacity: opacity,
                  transition: isDragging
                    ? "none"
                    : "transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.65s ease-out, filter 0.65s ease-out",
                }}
                className={`absolute w-[240px] sm:w-[280px] md:w-[310px] aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer select-none ${
                  isActive
                    ? "ring-1 ring-black/25 shadow-[0_30px_70px_rgba(0,0,0,0.22)]"
                    : "ring-1 ring-[#D8D7D2] shadow-[0_12px_35px_rgba(0,0,0,0.08)] filter brightness-[0.95] hover:brightness-100"
                }`}
              >
                {/* Card Surface */}
                <div className="relative w-full h-full bg-[#E5E4DE] overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    priority={isActive}
                    sizes="(max-width: 768px) 280px, 310px"
                    className="object-cover object-center filter brightness-[0.98] contrast-[1.04]"
                  />

                  {/* Gradient Vignette for Crisp Card Text Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                  {/* Pinned Micro-Tag on Top Edge */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex justify-between items-center z-10">
                    <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-[#111111] bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#D8D7D2] shadow-sm font-medium">
                      {item.tag}
                    </span>
                    <span className="text-[9px] font-mono tracking-widest text-[#777777] bg-white/80 backdrop-blur-md px-2 py-0.5 rounded border border-[#D8D7D2]">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Bottom Card Short Information */}
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10 flex flex-col justify-end space-y-1">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-300 uppercase">
                      {item.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-light tracking-tight uppercase text-white leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-neutral-300 font-light leading-relaxed truncate opacity-90">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Timeline Navigation & Controls */}
        <div className="border-t border-[#D8D7D2] pt-5 flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Active Item Details */}
          <div className="flex items-center space-x-3 text-xs font-mono text-[#777777]">
            <span className="text-[#111111] font-semibold">
              {STILL_ARCHIVE_ITEMS[activeIndex].title}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#D8D7D2]" />
            <span className="text-[#777777] uppercase">
              {STILL_ARCHIVE_ITEMS[activeIndex].medium}
            </span>
          </div>

          {/* Interactive Navigation Pills & Prev / Next Arrows */}
          <div className="flex items-center space-x-4">
            {/* Step Indicators */}
            <div className="flex items-center space-x-1.5">
              {STILL_ARCHIVE_ITEMS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Jump to slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === idx
                      ? "w-8 bg-[#111111] shadow-sm"
                      : "w-2 bg-[#D8D7D2] hover:bg-[#999999]"
                  }`}
                />
              ))}
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center space-x-2 pl-3 border-l border-[#D8D7D2]">
              <button
                onClick={prevSlide}
                aria-label="Previous still"
                className="w-8 h-8 rounded-full border border-[#D8D7D2] bg-white hover:bg-[#111111] hover:text-[#F5F4EF] flex items-center justify-center text-[#111111] transition-all cursor-pointer shadow-sm"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next still"
                className="w-8 h-8 rounded-full border border-[#D8D7D2] bg-white hover:bg-[#111111] hover:text-[#F5F4EF] flex items-center justify-center text-[#111111] transition-all cursor-pointer shadow-sm"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

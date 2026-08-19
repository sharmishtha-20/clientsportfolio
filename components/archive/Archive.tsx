"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { STILL_ARCHIVE_ITEMS, type StillArchiveItem } from "@/data/projects";

interface ArchiveCardProps {
  item: StillArchiveItem;
  index: number;
  priority?: boolean;
}

function ArchiveCard({ item, index, priority = false }: ArchiveCardProps) {
  return (
    <div className="w-[260px] xs:w-[280px] sm:w-[320px] md:w-[350px] lg:w-[370px] shrink-0 flex flex-col group select-none">
      {/* Visual Card */}
      <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden ring-1 ring-[#D8D7D2] shadow-[0_12px_35px_rgba(0,0,0,0.08)] bg-[#E5E4DE] transition-all duration-500 group-hover:shadow-[0_22px_50px_rgba(0,0,0,0.14)] group-hover:ring-black/20">
        <Image
          src={item.src}
          alt={item.title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 280px, (max-width: 1200px) 350px, 370px"
          className="object-cover object-center filter brightness-[0.98] contrast-[1.04] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />

        {/* Gradient Vignette for Crisp Card Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

        {/* Pinned Micro-Tag on Top Edge */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex justify-between items-center z-10 pointer-events-none">
          <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-[#111111] bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#D8D7D2] shadow-sm font-medium">
            {item.tag}
          </span>
          <span className="text-[9px] font-mono tracking-widest text-[#777777] bg-white/80 backdrop-blur-md px-2 py-0.5 rounded border border-[#D8D7D2]">
            0{index + 1}
          </span>
        </div>

        {/* Bottom Card Title Overlay */}
        <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10 flex flex-col justify-end space-y-0.5 pointer-events-none">
          <span className="text-[10px] font-mono tracking-widest text-neutral-300 uppercase">
            {item.category}
          </span>
          <h3 className="text-base sm:text-lg font-light tracking-tight uppercase text-white leading-tight">
            {item.title}
          </h3>
        </div>
      </div>

      {/* Synchronized One-Line Description Attached Directly Below Image */}
      <div className="mt-3.5 sm:mt-4 px-1 flex flex-col space-y-1.5">
        <p className="text-xs sm:text-sm text-[#444444] font-light leading-relaxed">
          &ldquo;{item.description}&rdquo;
        </p>
        <div className="flex items-center space-x-2 text-[10px] font-mono text-[#777777] uppercase tracking-widest">
          <span>{item.medium}</span>
          <span className="text-[#D8D7D2]">•</span>
          <span>{item.year}</span>
        </div>
      </div>
    </div>
  );
}

export default function Archive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const set1Ref = useRef<HTMLDivElement>(null);
  const set2Ref = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!trackRef.current || !set1Ref.current || !set2Ref.current) return;

    let tween: gsap.core.Tween | null = null;

    const initAnimation = () => {
      if (!trackRef.current || !set1Ref.current || !set2Ref.current) return;

      const distance = set2Ref.current.offsetLeft - set1Ref.current.offsetLeft;
      if (distance <= 0) return;

      // Premium, slow editorial continuous velocity (~30px / second)
      const speed = 32;
      const duration = distance / speed;
      const prevProgress = tween ? tween.progress() : 0;

      if (tween) {
        tween.kill();
      }

      gsap.set(trackRef.current, { x: 0 });

      tween = gsap.to(trackRef.current, {
        x: -distance,
        duration: duration,
        ease: "none",
        repeat: -1,
      });

      if (prevProgress > 0) {
        tween.progress(prevProgress);
      }

      tweenRef.current = tween;
    };

    // Small timeout to ensure initial layout measurement is accurate
    const timer = setTimeout(initAnimation, 60);

    const handleResize = () => {
      initAnimation();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      if (tween) tween.kill();
    };
  }, []);

  const handleMouseEnter = () => {
    if (typeof window !== "undefined" && window.innerWidth >= 768 && tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 0.35, duration: 0.8, ease: "power2.out" });
    }
  };

  const handleMouseLeave = () => {
    if (typeof window !== "undefined" && window.innerWidth >= 768 && tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 1, duration: 0.8, ease: "power2.out" });
    }
  };

  return (
    <section
      id="archive"
      className="relative w-full py-20 sm:py-28 md:py-36 bg-[#F5F4EF] text-[#111111] border-t border-[#D8D7D2] overflow-hidden select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Ambient Grid & Subtle Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(0,0,0,0.02),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.025)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-60" />

      <div className="w-full relative z-10 flex flex-col space-y-8 sm:space-y-12 md:space-y-14">
        {/* Section Header: Minimalist Editorial Header */}
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-10 md:px-16 flex justify-between items-center border-b border-[#D8D7D2] pb-6">
          <div className="flex items-center space-x-3">
            <span className="font-mono text-xs tracking-widest text-[#111111] uppercase font-semibold">
              03 {"//"} THE STILL ARCHIVE
            </span>
            <span className="w-6 h-[1px] bg-[#D8D7D2] hidden sm:inline-block" />
            <span className="text-[11px] font-mono tracking-widest text-[#777777] uppercase hidden sm:inline-block">
              CURATED GENERATIVE STILLS
            </span>
          </div>


        </div>

        {/* Horizontal Continuous Moving Image Track */}
        <div className="w-full overflow-hidden" ref={containerRef}>
          <div
            ref={trackRef}
            className="flex gap-6 sm:gap-8 md:gap-10 w-max will-change-transform py-2 pl-6 sm:pl-10 md:pl-16"
          >
            {/* Sequence 1 */}
            <div ref={set1Ref} className="flex gap-6 sm:gap-8 md:gap-10 shrink-0">
              {STILL_ARCHIVE_ITEMS.map((item, index) => (
                <ArchiveCard
                  key={`seq1-${item.id}`}
                  item={item}
                  index={index}
                  priority={index < 3}
                />
              ))}
            </div>

            {/* Sequence 2 */}
            <div
              ref={set2Ref}
              className="flex gap-6 sm:gap-8 md:gap-10 shrink-0"
              aria-hidden="true"
            >
              {STILL_ARCHIVE_ITEMS.map((item, index) => (
                <ArchiveCard
                  key={`seq2-${item.id}`}
                  item={item}
                  index={index}
                  priority={false}
                />
              ))}
            </div>

            {/* Sequence 3 (ensures seamless continuity on large/ultra-wide screens) */}
            <div
              className="flex gap-6 sm:gap-8 md:gap-10 shrink-0"
              aria-hidden="true"
            >
              {STILL_ARCHIVE_ITEMS.map((item, index) => (
                <ArchiveCard
                  key={`seq3-${item.id}`}
                  item={item}
                  index={index}
                  priority={false}
                />
              ))}
            </div>

            {/* Sequence 4 */}
            <div
              className="flex gap-6 sm:gap-8 md:gap-10 shrink-0"
              aria-hidden="true"
            >
              {STILL_ARCHIVE_ITEMS.map((item, index) => (
                <ArchiveCard
                  key={`seq4-${item.id}`}
                  item={item}
                  index={index}
                  priority={false}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Timeline Note / Marker */}
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-10 md:px-16 pt-6 border-t border-[#D8D7D2] flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-3 text-xs font-mono text-[#777777]">
            <span className="text-[#111111] font-semibold uppercase">
              GENERATIVE STILL REEL
            </span>
            <span className="w-1 h-1 rounded-full bg-[#D8D7D2]" />
            <span className="text-[#777777] uppercase text-[11px]">
              CONTINUOUS EDITORIAL STREAM
            </span>
          </div>

          <div className="flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#777777] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
            <span>01 — 0{STILL_ARCHIVE_ITEMS.length} ARCHIVE // CONSTANT VELOCITY</span>
          </div>
        </div>
      </div>
    </section>
  );
}

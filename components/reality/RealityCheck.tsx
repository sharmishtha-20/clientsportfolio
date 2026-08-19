"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REALITY_CONTENT } from "@/data/content";
import RealitySlider from "./RealitySlider";

export default function RealityCheck() {
  const containerRef = useRef<HTMLElement>(null);
  const openingTextRef = useRef<HTMLHeadingElement>(null);
  const fragmentsRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Opening Statement Entrance
      if (openingTextRef.current) {
        gsap.fromTo(
          openingTextRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: openingTextRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 2. Fragments Staggered Reveal
      if (fragmentsRef.current) {
        const spans = fragmentsRef.current.querySelectorAll(".reality-fragment");
        gsap.fromTo(
          spans,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            stagger: 0.25,
            duration: 1.0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: fragmentsRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 3. Final Philosophy Punchline
      if (philosophyRef.current) {
        const lines = philosophyRef.current.querySelectorAll(".philosophy-line");
        gsap.fromTo(
          lines,
          { yPercent: 80, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: philosophyRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="reality"
      className="relative w-full py-32 sm:py-44 md:py-56 px-6 sm:px-10 md:px-16 bg-[#0D0D0E] text-[#F5F4EF] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Section Tag */}
        <div className="flex items-center space-x-3 mb-12 sm:mb-16">
          <span className="font-mono text-xs tracking-[0.3em] text-neutral-500 uppercase">
            04 {"//"} THE REALITY CHECK
          </span>
        </div>

        {/* 1. Opening Statement */}
        <div className="max-w-4xl mb-16 sm:mb-24">
          <h2
            ref={openingTextRef}
            className="text-display-huge font-light tracking-tighter uppercase text-[#F5F4EF] leading-[0.92]"
          >
            {REALITY_CONTENT.opening}
          </h2>
        </div>

        {/* 2. Visual Fragments Sequence */}
        <div
          ref={fragmentsRef}
          className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-20 text-xs sm:text-sm md:text-base font-mono tracking-widest text-neutral-400 uppercase"
        >
          {REALITY_CONTENT.fragments.map((frag, idx) => (
            <span
              key={idx}
              className="reality-fragment px-4 py-2 rounded-full border border-neutral-800 bg-neutral-900/60"
            >
              {frag}
            </span>
          ))}
        </div>

        {/* 3. Interactive Signature Element: AI vs Real Wipe Slider */}
        <div className="w-full my-8">
          <RealitySlider />
        </div>

        {/* 4. Grand Philosophical Manifesto */}
        <div
          ref={philosophyRef}
          className="mt-24 sm:mt-32 max-w-4xl space-y-4 select-none"
        >
          <div className="overflow-hidden">
            <span className="philosophy-line block text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-neutral-400 uppercase">
              {REALITY_CONTENT.philosophy.line1}
            </span>
          </div>

          <div className="overflow-hidden">
            <span className="philosophy-line block text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-editorial-serif italic text-[#F5F4EF]">
              {REALITY_CONTENT.philosophy.line2}
            </span>
          </div>

          <div className="overflow-hidden">
            <span className="philosophy-line block text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-neutral-200 uppercase">
              {REALITY_CONTENT.philosophy.line3}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

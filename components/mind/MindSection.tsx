"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MIND_CONTENT } from "@/data/content";

export default function MindSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingLinesRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Line by Line Statement Reveal
      if (headingLinesRef.current) {
        const lines = headingLinesRef.current.querySelectorAll(".mind-statement-line");
        gsap.fromTo(
          lines,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            stagger: 0.14,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingLinesRef.current,
              start: "top 80%",
              end: "bottom 60%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 3. Clip Path Reveal for Editorial Portrait
      if (imageWrapperRef.current && imageRef.current) {
        gsap.fromTo(
          imageWrapperRef.current,
          { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 1.6,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: imageWrapperRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Parallax image drift inside wrapper
        gsap.fromTo(
          imageRef.current,
          { scale: 1.15, yPercent: -5 },
          {
            scale: 1.0,
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: imageWrapperRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="mind"
      className="relative w-full py-28 sm:py-36 md:py-48 px-6 sm:px-10 md:px-16 bg-[#F5F4EF] text-[#111111] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Index Marker */}
        <div className="flex items-center space-x-3 mb-12 sm:mb-16">
          <span className="font-mono text-xs tracking-widest text-[#777777] uppercase">
            {MIND_CONTENT.sectionNumber} {"//"} {MIND_CONTENT.sectionTitle}
          </span>
          <div className="flex-1 h-[1px] bg-[#D8D7D2]" />
        </div>

        {/* Large Statement Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Huge Editorial Statement */}
          <div className="lg:col-span-8">
            <div ref={headingLinesRef} className="space-y-1 sm:space-y-2 select-none">
              {MIND_CONTENT.statementLines.map((line, idx) => (
                <div key={idx} className="overflow-hidden">
                  <span
                    className={`mind-statement-line block text-display-huge font-light tracking-tighter uppercase leading-[0.92] ${idx === 2 || idx === 4 ? "text-editorial-serif font-normal italic lowercase first-letter:uppercase" : ""
                      }`}
                  >
                    {line}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Editorial Portrait with Clip-Path Reveal */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="sticky top-28 space-y-3">
              <div
                ref={imageWrapperRef}
                className="relative aspect-[3/4] w-full overflow-hidden bg-[#E5E4DE] shadow-xl"
                data-cursor="VIEW"
              >
                <div ref={imageRef} className="relative w-full h-full">
                  <Image
                    src={MIND_CONTENT.portrait.src}
                    alt={MIND_CONTENT.portrait.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover object-top filter grayscale contrast-105 hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </div>

              {/* Minimal Caption */}
              <div className="flex justify-between items-center text-[10px] sm:text-xs font-mono tracking-widest text-[#777777] uppercase pt-1">
                <span>{MIND_CONTENT.portrait.caption}</span>
                <span>FIG. 01</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PRACTICE_ITEMS } from "@/data/content";

export default function PracticeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prevIndexRef = useRef(0);
  const isInitialMount = useRef(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!sectionRef.current || !pinContainerRef.current) return;

      const totalItems = PRACTICE_ITEMS.length;

      // Master scroll trigger pinning the moving archive gallery
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${totalItems * 100}%`,
        pin: pinContainerRef.current,
        scrub: 0.4,
        onUpdate: (self) => {
          const rawProgress = self.progress * totalItems;
          const index = Math.min(Math.floor(rawProgress), totalItems - 1);
          setActiveIndex(index);
        },
        onLeave: () => {
          // Auto turn off audio & pause when leaving Section 02 downward
          setIsMuted(true);
          videoRefs.current.forEach((video) => {
            if (video) {
              video.muted = true;
              video.pause();
            }
          });
        },
        onLeaveBack: () => {
          // Auto turn off audio & pause when leaving Section 02 upward
          setIsMuted(true);
          videoRefs.current.forEach((video) => {
            if (video) {
              video.muted = true;
              video.pause();
            }
          });
        },
        onEnter: () => {
          const curVideo = videoRefs.current[activeIndex];
          if (curVideo) {
            curVideo.play().catch(() => {});
          }
        },
        onEnterBack: () => {
          const curVideo = videoRefs.current[activeIndex];
          if (curVideo) {
            curVideo.play().catch(() => {});
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeIndex]);

  // Directional GSAP Video Transitions (Forward: Left out / Right in; Backward: Right out / Left in)
  useEffect(() => {
    const prevIndex = prevIndexRef.current;
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const slideOffset = isMobile ? 10 : 15; // subtle cinematic shift percentage

    if (isInitialMount.current) {
      isInitialMount.current = false;
      slideRefs.current.forEach((slide, idx) => {
        if (!slide) return;
        if (idx === activeIndex) {
          gsap.set(slide, { opacity: 1, xPercent: 0, pointerEvents: "auto", zIndex: 2 });
        } else {
          gsap.set(slide, { opacity: 0, xPercent: slideOffset, pointerEvents: "none", zIndex: 1 });
        }
      });
      return;
    }

    if (prevIndex === activeIndex) return;

    const isForward = activeIndex > prevIndex;
    const prevSlide = slideRefs.current[prevIndex];
    const nextSlide = slideRefs.current[activeIndex];

    // Animate current/leaving slide
    if (prevSlide) {
      gsap.to(prevSlide, {
        xPercent: isForward ? -slideOffset : slideOffset,
        opacity: 0,
        duration: 0.75,
        ease: "power2.out",
        zIndex: 1,
        pointerEvents: "none",
      });
    }

    // Animate next/entering slide
    if (nextSlide) {
      gsap.fromTo(
        nextSlide,
        {
          xPercent: isForward ? slideOffset : -slideOffset,
          opacity: 0,
          zIndex: 2,
        },
        {
          xPercent: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power2.out",
          pointerEvents: "auto",
        }
      );
    }

    // Hide any other non-active slides
    slideRefs.current.forEach((slide, idx) => {
      if (slide && idx !== prevIndex && idx !== activeIndex) {
        gsap.set(slide, {
          opacity: 0,
          xPercent: isForward ? slideOffset : -slideOffset,
          zIndex: 0,
          pointerEvents: "none",
        });
      }
    });

    prevIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Manage video autoplay, pause, and mute on index change
  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (!video) return;
      if (idx === activeIndex) {
        video.muted = isMuted;
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [activeIndex, isMuted]);

  // Audio Toggle Handler
  const toggleAudio = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    const currentVideo = videoRefs.current[activeIndex];
    if (currentVideo) {
      currentVideo.muted = nextMuted;
      if (!nextMuted) {
        currentVideo.volume = 1;
        currentVideo.play().catch(() => {});
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="practice"
      className="relative w-full bg-[#050506] text-[#F5F4EF]"
      style={{ height: `${PRACTICE_ITEMS.length * 100 + 100}vh` }}
    >
      {/* Anchor for #moving-archive */}
      <span id="moving-archive" className="absolute -top-24" />

      <div
        ref={pinContainerRef}
        className="w-full h-screen sticky top-0 flex flex-col justify-between p-6 sm:p-10 md:p-14 overflow-hidden select-none"
      >
        {/* Full-bleed Standout Dynamic Video Showcase */}
        <div className="absolute inset-0 z-0 bg-[#000000] overflow-hidden">
          {PRACTICE_ITEMS.map((item, index) => {
            return (
              <div
                key={item.id}
                ref={(el) => {
                  slideRefs.current[index] = el;
                }}
                className="absolute inset-0 will-change-transform overflow-hidden"
              >
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  src={item.media.src}
                  poster={item.media.poster}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover filter brightness-[0.98] contrast-[1.04]"
                />

                {/* Refined gradient vignettes for maximum text contrast without washing out video */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/60 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* Top Header Information */}
        <div className="relative z-10 flex justify-between items-start border-b border-white/15 pb-4 backdrop-blur-[2px]">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono tracking-widest text-[#F5F4EF] uppercase">
              02 {"//"} THE MOVING ARCHIVE
            </span>
            <span className="w-6 h-[1px] bg-neutral-700 hidden sm:inline-block" />
            <span className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase hidden sm:inline-block">
              AI CINEMATOGRAPHY &amp; SOUND
            </span>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <span className="text-[10px] font-mono tracking-widest px-2.5 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 uppercase hidden xs:inline-block backdrop-blur-md">
              ● 4K SYNTHETIC SEQUENCE
            </span>
            <div className="text-xs font-mono tracking-widest text-neutral-300 uppercase">
              <span>[0{activeIndex + 1} / 0{PRACTICE_ITEMS.length}]</span>
            </div>
          </div>
        </div>

        {/* Left Corner Compact Info Overlay */}
        <div className="relative z-10 my-auto sm:my-0 sm:mt-auto sm:mb-4 max-w-md">
          {PRACTICE_ITEMS.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={item.id}
                className={`transition-all duration-700 ease-out backdrop-blur-md bg-black/45 border border-white/10 p-5 sm:p-6 rounded-2xl shadow-2xl ${
                  isActive
                    ? "opacity-100 translate-y-0 relative pointer-events-auto"
                    : "opacity-0 translate-y-6 absolute pointer-events-none"
                }`}
              >
                {/* Category & Live Indicator */}
                <div className="flex items-center space-x-2.5 mb-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase text-neutral-300">
                    {item.subtitle}
                  </span>
                </div>

                {/* Video Title */}
                <h2 className="text-xl sm:text-2xl md:text-3xl font-light tracking-tight uppercase text-[#F5F4EF] leading-tight">
                  {item.title}
                </h2>

                {/* Short Impactful Description */}
                <p className="mt-2 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                  {item.description}
                </p>

                {/* Minimal Specs */}
                {item.details && item.details.length > 0 && (
                  <div className="mt-3.5 flex flex-wrap gap-1.5">
                    {item.details.map((detail, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/15 bg-black/50 text-neutral-300 backdrop-blur-sm"
                      >
                        {detail}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Bar: Timeline Navigation + Audio Controls (Bottom Right Corner) */}
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 border-t border-white/15 pt-4 backdrop-blur-[2px]">
          {/* Timeline Sequence Tabs */}
          <div className="flex items-center space-x-4 sm:space-x-6 overflow-x-auto no-scrollbar max-w-full pb-1 sm:pb-0">
            {PRACTICE_ITEMS.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <div
                  key={item.id}
                  className={`flex items-center space-x-2 transition-all duration-500 whitespace-nowrap ${
                    isActive ? "text-white opacity-100" : "text-neutral-500 opacity-40"
                  }`}
                >
                  <span
                    className={`font-mono text-[10px] sm:text-xs ${
                      isActive ? "text-emerald-400 font-semibold" : ""
                    }`}
                  >
                    0{index + 1}
                  </span>
                  <span className="text-xs tracking-wider uppercase font-light hidden md:inline-block">
                    {item.title}
                  </span>
                  {index < PRACTICE_ITEMS.length - 1 && (
                    <span className="text-neutral-700 ml-3 hidden md:inline-block">/</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Right Controls: Audio On/Off Button & Scroll Cue */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest text-neutral-400 uppercase hidden sm:flex">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-500 animate-ping" />
              <span>SCROLL TO ADVANCE ↓</span>
            </div>

            {/* Audio On / Off Button */}
            <button
              onClick={toggleAudio}
              type="button"
              id="moving-archive-audio-btn"
              aria-label={isMuted ? "Turn sound on" : "Turn sound off"}
              className={`flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full border transition-all duration-300 cursor-pointer backdrop-blur-md ${
                !isMuted
                  ? "bg-emerald-500/20 border-emerald-400/50 text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.3)] hover:bg-emerald-500/30"
                  : "bg-black/60 border-white/20 text-neutral-300 hover:bg-black/80 hover:border-white/40"
              }`}
            >
              {/* Sound Wave Bars / Mute Icon */}
              {!isMuted ? (
                <div className="flex items-end space-x-0.5 h-3.5 w-3.5 pb-0.5">
                  <span className="w-[2px] bg-emerald-400 animate-pulse h-2" />
                  <span className="w-[2px] bg-emerald-400 animate-pulse h-3.5 delay-75" />
                  <span className="w-[2px] bg-emerald-400 animate-pulse h-1.5 delay-150" />
                  <span className="w-[2px] bg-emerald-400 animate-pulse h-3 delay-100" />
                </div>
              ) : (
                <svg
                  className="w-3.5 h-3.5 text-neutral-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              )}

              <span className="text-[10px] font-mono tracking-widest uppercase font-medium">
                {isMuted ? "AUDIO OFF" : "AUDIO ON"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

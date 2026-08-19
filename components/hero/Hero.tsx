"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ARTIST_DATA, HERO_CONTENT } from "@/data/content";
import HeroScene from "@/components/3d/HeroScene";
import { ArrowDown, Volume2, VolumeX, Play, Pause } from "lucide-react";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const mediaContainerRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const userMutedRef = useRef(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Initial entrance timeline
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 1.6 },
      });

      tl.fromTo(
        mediaContainerRef.current,
        { scale: 1.1, opacity: 0 },
        { scale: 1.0, opacity: 1, duration: 2.0, ease: "power2.out" }
      ).fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 1.2 },
        "-=0.8"
      );

      // 2. Cinematic Scroll Parallax & Scale
      if (heroRef.current && mediaContainerRef.current) {
        gsap.to(mediaContainerRef.current, {
          scale: 1.06,
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        if (scrollIndicatorRef.current) {
          gsap.to(scrollIndicatorRef.current, {
            opacity: 0,
            y: 20,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "25% top",
              scrub: true,
            },
          });
        }

        // 3. Auto mute/pause audio when scrolling out of Hero, and resume when scrolling back
        ScrollTrigger.create({
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          onLeave: () => {
            if (videoRef.current) {
              videoRef.current.muted = true;
              videoRef.current.pause();
              setIsMuted(true);
              setIsPlaying(false);
            }
          },
          onEnterBack: () => {
            if (videoRef.current) {
              if (!userMutedRef.current) {
                videoRef.current.muted = false;
                setIsMuted(false);
              }
              videoRef.current.play().catch(() => {
                if (videoRef.current) {
                  videoRef.current.muted = true;
                  setIsMuted(true);
                  videoRef.current.play().catch(() => {});
                }
              });
              setIsPlaying(true);
            }
          },
        });
      }
    }, heroRef);

    // Initial Auto Audio playback handler (handling browser autoplay policies)
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      video.volume = 1;
      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsMuted(false);
            setIsPlaying(true);
          })
          .catch(() => {
            // Browser restricted unmuted autoplay before gesture - start muted and unmute on first gesture
            video.muted = true;
            setIsMuted(true);
            video.play().catch(() => {});

            const enableAudioOnGesture = () => {
              if (video && !userMutedRef.current) {
                video.muted = false;
                video.volume = 1;
                setIsMuted(false);
                video.play().catch(() => {});
              }
              window.removeEventListener("click", enableAudioOnGesture);
              window.removeEventListener("touchstart", enableAudioOnGesture);
              window.removeEventListener("scroll", enableAudioOnGesture);
              window.removeEventListener("keydown", enableAudioOnGesture);
            };

            window.addEventListener("click", enableAudioOnGesture, { once: true });
            window.addEventListener("touchstart", enableAudioOnGesture, { once: true });
            window.addEventListener("scroll", enableAudioOnGesture, { once: true });
            window.addEventListener("keydown", enableAudioOnGesture, { once: true });
          });
      }
    }

    return () => ctx.revert();
  }, []);

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      userMutedRef.current = nextMuted;
      setIsMuted(nextMuted);
      if (!nextMuted) {
        videoRef.current.volume = 1;
        videoRef.current.play().catch(() => {});
      }
    }
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full h-screen min-h-[640px] flex flex-col justify-between overflow-hidden bg-[#0D0D0E] text-[#F5F4EF]"
      data-cursor="EXPLORE"
    >
      {/* Background Media Container (Pure, Clear, Bright Video Showcase) */}
      <div
        ref={mediaContainerRef}
        className="absolute inset-0 w-full h-full will-change-transform"
      >
        {HERO_CONTENT.media.videoSrc ? (
          <video
            ref={videoRef}
            src={HERO_CONTENT.media.videoSrc}
            poster={HERO_CONTENT.media.posterImage}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className="w-full h-full object-cover opacity-100 brightness-[1.08] contrast-100"
          />
        ) : (
          <Image
            src={HERO_CONTENT.media.fallbackImage}
            alt={`${ARTIST_DATA.name} Cinematic Background`}
            fill
            priority
            quality={95}
            className="object-cover object-center opacity-100 brightness-100"
            sizes="100vw"
          />
        )}
      </div>

      {/* Subtle 3D Ambient Dust Layer */}
      <HeroScene />

      {/* Top Spacer */}
      <div className="relative z-20 pt-28 sm:pt-32" />

      {/* Bottom Area: Centered Scroll Prompt + Bottom Right Controls */}
      <div className="relative z-20 px-6 sm:px-10 md:px-16 pb-10 sm:pb-14 w-full">
        {/* Centered Scroll to Enter Cue */}
        <div
          ref={scrollIndicatorRef}
          className="flex flex-col items-center justify-center space-y-2 text-neutral-200 hover:text-white transition-colors cursor-pointer mx-auto w-fit select-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
          onClick={() => {
            const nextSection = document.getElementById("mind");
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
          data-cursor="SCROLL"
        >
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] uppercase text-white/90">
            {HERO_CONTENT.scrollPrompt}
          </span>
          <div className="w-7 h-7 rounded-full border border-white/40 bg-black/40 backdrop-blur-sm flex items-center justify-center animate-bounce shadow-lg">
            <ArrowDown size={12} className="text-white" />
          </div>
        </div>

        {/* Bottom Right Corner: Video Controls (Play/Pause & Audio Mute/Unmute) */}
        <div className="absolute right-6 sm:right-10 md:right-16 bottom-10 sm:pb-0 bottom-8 sm:bottom-10 flex items-center space-x-3 bg-black/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-2xl z-30">
          {/* Play / Pause Button */}
          <button
            onClick={togglePlay}
            className="flex items-center space-x-1.5 text-[10px] font-mono tracking-widest uppercase text-neutral-200 hover:text-white transition-colors pr-2.5 border-r border-white/20"
            aria-label={isPlaying ? "Pause Video" : "Play Video"}
            data-cursor="CLICK"
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
            <span>{isPlaying ? "PAUSE" : "PLAY"}</span>
          </button>

          {/* Audio Mute / Unmute Button */}
          <button
            onClick={toggleAudio}
            className="flex items-center space-x-1.5 text-[10px] font-mono tracking-widest uppercase text-neutral-200 hover:text-white transition-colors pl-1"
            aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
            data-cursor="CLICK"
          >
            {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} className="text-emerald-400" />}
            <span className={isMuted ? "" : "text-emerald-400 font-semibold"}>
              {isMuted ? "SOUND OFF" : "SOUND ON"}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

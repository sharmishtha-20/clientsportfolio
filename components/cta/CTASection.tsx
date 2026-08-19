"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ARTIST_DATA, CTA_CONTENT } from "@/data/content";
import { ArrowUpRight, Copy, Check } from "lucide-react";

export default function CTASection() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Heading reveals
      if (headingRef.current) {
        const lines = headingRef.current.querySelectorAll(".cta-heading-line");
        gsap.fromTo(
          lines,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Subheading & Action
      if (subRef.current) {
        gsap.fromTo(
          subRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: subRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Social Links Stagger
      if (linksRef.current) {
        const links = linksRef.current.querySelectorAll(".cta-social-link");
        gsap.fromTo(
          links,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: linksRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(ARTIST_DATA.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative w-full py-32 sm:py-44 md:py-56 px-6 sm:px-10 md:px-16 bg-[#F5F4EF] text-[#111111] border-t border-[#D8D7D2]"
    >
      <div className="max-w-7xl mx-auto flex flex-col justify-between">
        {/* Section Index */}
        <div className="flex items-center space-x-3 mb-16">
          <span className="font-mono text-xs tracking-widest text-[#777777] uppercase">
            05 {"//"} COLLABORATION &amp; DIRECTION
          </span>
          <div className="flex-1 h-[1px] bg-[#D8D7D2]" />
        </div>

        {/* Large Typography Statement */}
        <div className="mb-16 sm:mb-20">
          <h2
            ref={headingRef}
            className="text-display-huge font-light tracking-tighter uppercase text-[#111111] leading-[0.88] select-none"
          >
            <div className="overflow-hidden">
              <span className="cta-heading-line block">
                {CTA_CONTENT.headlineTop}
              </span>
            </div>
            <div className="overflow-hidden mt-1 sm:mt-2">
              <span className="cta-heading-line block text-editorial-serif italic font-normal lowercase first-letter:uppercase">
                {CTA_CONTENT.headlineBottom}
              </span>
            </div>
          </h2>
        </div>

        {/* Action Prompt */}
        <div
          ref={subRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-16 border-b border-[#D8D7D2]"
        >
          <div className="space-y-2">
            <p className="text-base sm:text-xl text-[#777777] font-light">
              {CTA_CONTENT.subheading}
            </p>
            <div className="flex items-center space-x-4">
              <a
                href={`mailto:${ARTIST_DATA.email}`}
                className="group inline-flex items-center space-x-3 text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-[#111111] hover:underline"
                data-cursor="EMAIL"
              >
                <span>{CTA_CONTENT.action}</span>
                <div className="w-8 h-8 rounded-full border border-[#111111] flex items-center justify-center group-hover:bg-[#111111] group-hover:text-[#F5F4EF] transition-colors">
                  <ArrowUpRight size={16} />
                </div>
              </a>
            </div>
          </div>


        </div>

        {/* Minimal Text Social Links */}
        <div
          ref={linksRef}
          className="pt-12 flex flex-wrap gap-8 sm:gap-14 text-xs font-mono tracking-widest text-[#111111] uppercase"
        >
          <a
            href={`mailto:${ARTIST_DATA.email}`}
            target="_blank"
            rel="noreferrer"
            className="cta-social-link hover-underline hover:text-black transition-colors"
            data-cursor="EMAIL"
          >
            EMAIL ↗
          </a>
          <a
            href={ARTIST_DATA.drive}
            target="_blank"
            rel="noreferrer"
            className="cta-social-link hover-underline hover:text-black transition-colors font-medium"
            data-cursor="DRIVE"
          >
            THE DRIVE ↗
          </a>
          <a
            href={ARTIST_DATA.socials.instagram}
            target="_blank"
            rel="noreferrer"
            className="cta-social-link hover-underline hover:text-black transition-colors"
            data-cursor="INSTAGRAM"
          >
            INSTAGRAM ↗
          </a>
          <a
            href={ARTIST_DATA.socials.behance}
            target="_blank"
            rel="noreferrer"
            className="cta-social-link hover-underline hover:text-black transition-colors"
          >
            BEHANCE ↗
          </a>
        </div>
      </div>
    </section>
  );
}

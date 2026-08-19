"use client";

import { useState } from "react";
import Preloader from "@/components/ui/Preloader";
import Navbar from "@/components/navigation/Navbar";
import Hero from "@/components/hero/Hero";
import MindSection from "@/components/mind/MindSection";
import PracticeSection from "@/components/practice/PracticeSection";
import Archive from "@/components/archive/Archive";
import RealityCheck from "@/components/reality/RealityCheck";
import CTASection from "@/components/cta/CTASection";
import Footer from "@/components/footer/Footer";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Preloader onComplete={() => setLoaded(true)} />
      <Navbar />
      <main className="relative flex flex-col w-full min-h-screen">
        <Hero />
        <MindSection />
        <PracticeSection />
        <Archive />
        <RealityCheck />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

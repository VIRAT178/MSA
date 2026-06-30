import React, { useEffect, useState } from "react";
import { SPORTS_PROGRAMS } from "../data";
import { Trophy } from "lucide-react";

interface HeroProps {
  onLearnMore: (sportId: string) => void;
  onAdmissionsClick: () => void;
}

export default function Hero({ onLearnMore, onAdmissionsClick }: HeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = SPORTS_PROGRAMS;
  const activeSlide = slides[activeIndex];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => window.clearInterval(interval);
  }, [slides.length]);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden" id="hero-container">
      <div className="absolute inset-0">
        <img
          src={activeSlide.bgImage}
          alt={`${activeSlide.name} hero background`}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/20 to-transparent" />
      </div>

      <div className="relative z-20 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8 text-left max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-3 text-sm font-black uppercase tracking-[0.15em] text-white shadow-2xl shadow-black/20">
            <Trophy className="h-4 w-4" />
            {activeSlide.id === "msa-campus" ? "MSA CAMPUS" : `ELITE PROGRAM: ${activeSlide.name.toUpperCase()}`}
          </span>

          <div className="space-y-5">
            <h1 className="font-sans text-4xl sm:text-5xl lg:text-[4.0rem] font-black uppercase tracking-[-0.04em] text-white leading-[0.95] drop-shadow-[0_25px_45px_rgba(0,0,0,0.85)]">
              <span className="block">TRAIN.</span>
              <span className="block">PERFORM.</span>
              <span className="block text-red-500">EXCELLENCE.</span>
            </h1>
            <div className="flex items-center gap-3 mt-2">
              <span className="h-1 w-24 rounded-full bg-white" />
              <span className="h-1 w-12 rounded-full bg-red-600" />
              <span className="h-1 w-10 rounded-full bg-white/70" />
            </div>
          </div>

          <p className="text-zinc-100 text-base sm:text-lg max-w-xl font-medium leading-relaxed tracking-wide">
            {activeSlide.tagline}
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => onLearnMore(activeSlide.id)}
              className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-4 text-sm font-black uppercase tracking-[0.2em] text-white shadow-xl shadow-red-600/30 transition hover:bg-red-700"
            >
              EXPLORE {activeSlide.name.toUpperCase()}
            </button>

            <button
              onClick={onAdmissionsClick}
              className="inline-flex items-center justify-center rounded-full border border-white px-6 py-4 text-sm font-black uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-black"
            >
              APPLY FOR TRIAL
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const slides = [
  {
    fa: {
      title: "آینده حرکت،",
      highlight: "از همین‌جا شروع می‌شود",
      description:
        "تازه‌ترین اخبار، بررسی‌ها و فناوری‌های دنیای خودروهای برقی",
    },
    en: {
      title: "The future of mobility,",
      highlight: "starts right here",
      description:
        "The latest news, reviews, and technologies from the world of electric cars",
    },
    image:
      "/images/hero-d1.webp",
  },
  {
    fa: {
      title: "نسل جدید،",
      highlight: "هوشمندتر از همیشه",
      description:
        "با جدیدترین فناوری‌های خودروهای الکتریکی و سیستم‌های هوشمند آشنا شوید",
    },
    en: {
      title: "A new generation,",
      highlight: "smarter than ever",
      description:
        "Discover the latest electric vehicle technologies and intelligent systems",
    },
    image:
      "/images/hero-d2.webp",
  },
  {
    fa: {
      title: "انرژی پاک،",
      highlight: "حرکت به سوی آینده",
      description:
        "دنیای خودروهای برقی را با ElectroCar بهتر بشناسید",
    },
    en: {
      title: "Clean energy,",
      highlight: "driving toward the future",
      description:
        "Get to know the world of electric cars better with ElectroCar",
    },
    image:
      "/images/hero-d3.webp",
  },
];

const ui = {
  fa: {
    welcome: "به دنیای خودروهای برقی خوش آمدید!",
    news: "مشاهده آخرین اخبار ←",
    cars: "بررسی خودروها",
    slide: "اسلاید",
    tags: ["خودروهای برقی", "هوشمند", "سبز"],
  },
  en: {
    welcome: "Welcome to the world of electric cars!",
    news: "View latest news →",
    cars: "Explore cars",
    slide: "Slide",
    tags: ["Electric cars", "Smart", "Green"],
  },
};

export default function Hero() {
  const [active, setActive] = useState(0);
  const { language } = useLanguage();

  const t = ui[language];
  const isFa = language === "fa";

  const slide = slides[active];
  const content = slide[language];

  const nextSlide = () => {
    setActive((prev) => (prev + 1) % slides.length);
  };

  const previousSlide = () => {
    setActive((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  return (
    <section className="relative min-h-[100svh] overflow-hidden"> 
     <div className="hero-image relative min-h-[100svh]" 
     style={{ backgroundImage: `url("${slide.image}")`, }} >
        {/* Overlay (mirrored with the reading direction) */}
        <div
          className={`absolute inset-0 from-[#050b11]/30 via-[#050b11]/60 to-[#050b11] ${
            isFa ? "bg-gradient-to-l" : "bg-gradient-to-r"
          }`}
        />

        <div className="site-container relative z-10 flex min-h-[100svh] items-center">
          <div className="max-w-2xl">

            <div className="mb-5 flex items-center gap-2 text-sm text-gray-300">
              <span className="h-2 w-2 rounded-full bg-[#39f77b]" />
              {t.welcome}
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.5] text-white sm:text-5xl md:text-6xl">
              {content.title}
              <br />
              <span className="text-[#39f77b]">
                {content.highlight}
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-gray-300 md:text-lg">
              {content.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/news"
                className="rounded-full bg-[#39f77b] px-7 py-3.5 text-sm font-bold text-[#06100a] shadow-[0_0_35px_rgba(57,247,123,0.2)] transition hover:scale-[1.03] hover:bg-[#5cff93]"
              >
                {t.news}
              </a>

              <a
                href="/cars"
                className="rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-[#39f77b]/50 hover:text-[#39f77b]"
              >
                {t.cars}
              </a>
            </div>

            {/* Slider controls */}
            <div className="mt-10 flex items-center gap-4">

              <button
                onClick={previousSlide}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-gray-400 transition hover:border-[#39f77b] hover:text-[#39f77b]"
              >
                ←
              </button>

              <div className="flex items-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActive(index)}
                    aria-label={`${t.slide} ${index + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      active === index
                        ? "w-7 bg-[#39f77b]"
                        : "w-2 bg-white/30"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-gray-400 transition hover:border-[#39f77b] hover:text-[#39f77b]"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom information */}
        <div className="absolute bottom-5 left-0 right-0 z-10">
          <div className="site-container">
            <div className="flex items-center justify-end gap-2 text-xs text-gray-400">
              <span>{t.tags[0]}</span>
              <span className="text-[#39f77b]">•</span>
              <span>{t.tags[1]}</span>
              <span className="text-[#39f77b]">•</span>
              <span>{t.tags[2]}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EVTechnology from "@/components/EVTechnology";
import { useLanguage } from "@/context/LanguageContext";

const ui = {
  fa: {
    badge: "فناوری خودروهای برقی",
    titleA: "پشت پرده",
    highlight: "خودروهای آینده",
    titleB: "چیست؟",
    desc: "از باتری و موتور الکتریکی گرفته تا سیستم ترمز احیاکننده، مدیریت باتری و فناوری‌های کمک‌راننده؛ تکنولوژی‌های اصلی خودروهای برقی را بشناسید.",
  },
  en: {
    badge: "Electric car technology",
    titleA: "What's behind",
    highlight: "the cars of the future?",
    titleB: "",
    desc: "From the battery and electric motor to regenerative braking, battery management, and driver-assistance technologies, get to know the key technologies of electric cars.",
  },
};

export default function TechnologyPage() {
  const { language } = useLanguage();
  const t = ui[language];

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#05070b] pt-[40px] text-white sm:pt-[60px]">
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(57,247,123,0.14),transparent_45%)]" />
          {/* Technical grid, fades out toward the edges */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />

          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="mb-5 inline-flex rounded-full border border-[#39f77b]/20 bg-[#39f77b]/10 px-4 py-2 text-sm font-medium text-[#39f77b]">
                {t.badge}
              </span>

              <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                {t.titleA}{" "}
                <span className="text-[#39f77b]">{t.highlight}</span>{" "}
                {t.titleB}
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
                {t.desc}
              </p>
            </div>
          </div>
        </section>

        <EVTechnology />
      </main>

      <Footer />
    </>
  );
}


"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

const values = {
  fa: [
    {
      icon: "⚡",
      title: "تمرکز بر خودروهای برقی",
      text: "ElectroCar با تمرکز بر دنیای خودروهای الکتریکی، اطلاعات فنی و محتوای مرتبط با این حوزه را در اختیار کاربران قرار می‌دهد.",
    },
    {
      icon: "◉",
      title: "محتوای قابل فهم",
      text: "هدف ما این است که موضوعات فنی پیچیده را با زبانی ساده‌تر و قابل فهم برای علاقه‌مندان خودرو توضیح دهیم.",
    },
    {
      icon: "↗",
      title: "نگاه به آینده",
      text: "فناوری خودروهای برقی با سرعت زیادی در حال تغییر است و ElectroCar تلاش می‌کند تحولات این حوزه را دنبال کند.",
    },
    {
      icon: "▣",
      title: "بررسی و مقایسه",
      text: "مشخصات خودروها، فناوری‌ها و روش‌های مختلف شارژ را می‌توان در بخش‌های مختلف سایت بررسی و مقایسه کرد.",
    },
  ],
  en: [
    {
      icon: "⚡",
      title: "Focus on electric cars",
      text: "By focusing on the world of electric cars, ElectroCar provides users with technical information and content related to this field.",
    },
    {
      icon: "◉",
      title: "Easy-to-understand content",
      text: "Our goal is to explain complex technical topics in simpler language that car enthusiasts can easily follow.",
    },
    {
      icon: "↗",
      title: "Looking ahead",
      text: "Electric car technology is changing fast, and ElectroCar strives to follow the developments in this field.",
    },
    {
      icon: "▣",
      title: "Review and compare",
      text: "Car specs, technologies, and the different charging methods can be explored and compared in different sections of the site.",
    },
  ],
};

const stats = {
  fa: [
    { value: "01", title: "مقالات", text: "مطالب آموزشی و تخصصی" },
    { value: "02", title: "فناوری", text: "بررسی تکنولوژی‌های EV" },
    { value: "03", title: "اطلاعات روز", text: "تازه‌ترین اطلاعات دنیای خودروهای برقی" },
  ],
  en: [
    { value: "01", title: "Articles", text: "Educational and specialist content" },
    { value: "02", title: "Technology", text: "Exploring EV technologies" },
    { value: "03", title: "Up-to-date Information", text: "The latest in the world of electric cars" },
  ],
};

const ui = {
  fa: {
    badge: "درباره ElectroCar",
    titleA: "آینده حمل‌ونقل",
    highlight: "الکتریکی",
    titleB: "را بشناسید",
    desc: "ElectroCar یک پلتفرم محتوایی با تمرکز بر خودروهای برقی، فناوری‌های مرتبط، روش‌های شارژ و تحولات صنعت خودرو است.",
    aboutLabel: "درباره ما",
    aboutTitle: "ElectroCar برای علاقه‌مندان به دنیای خودرو",
    aboutP1:
      "صنعت خودرو در سال‌های اخیر تغییرات زیادی را تجربه کرده است. خودروهای برقی، سیستم‌های هوشمند، فناوری‌های جدید باتری و زیرساخت‌های شارژ، بخش مهمی از این تغییر هستند.",
    aboutP2:
      "ElectroCar با هدف ارائه محتوای آموزشی، معرفی خودروها، بررسی فناوری‌ها و انتشار اخبار مرتبط با این حوزه طراحی شده است.",
    whyLabel: "چرا ElectroCar؟",
    whyTitle: "محتوایی برای شناخت بهتر خودروهای برقی",
    sectionsLabel: "بخش‌های سایت",
    sectionsTitle: "ElectroCar چه چیزهایی ارائه می‌دهد؟",
  },
  en: {
    badge: "About ElectroCar",
    titleA: "Get to know the future of",
    highlight: "electric",
    titleB: "transportation",
    desc: "ElectroCar is a content platform focused on electric cars, related technologies, charging methods, and developments in the automotive industry.",
    aboutLabel: "About us",
    aboutTitle: "ElectroCar, for car enthusiasts",
    aboutP1:
      "The automotive industry has gone through major changes in recent years. Electric cars, smart systems, new battery technologies, and charging infrastructure are an important part of this change.",
    aboutP2:
      "ElectroCar is designed to provide educational content, introduce cars, review technologies, and publish news related to this field.",
    whyLabel: "Why ElectroCar?",
    whyTitle: "Content for getting to know electric cars better",
    sectionsLabel: "Site sections",
    sectionsTitle: "What does ElectroCar offer?",
  },
};

export default function AboutContent() {
  const { language } = useLanguage();
  const t = ui[language];

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#05070b] text-white">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(57,247,123,0.14),transparent_45%)]" />

          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex rounded-full border border-[#39f77b]/20 bg-[#39f77b]/10 px-4 py-2 text-sm text-[#39f77b]">
                {t.badge}
              </span>

              <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                {t.titleA}{" "}
                <span className="text-[#39f77b]">{t.highlight}</span>{" "}
                {t.titleB}
              </h1>

              <p className="mx-auto mt-6 max-w-2xl leading-8 text-gray-400">
                {t.desc}
              </p>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-[#39f77b]">
                {t.aboutLabel}
              </p>

              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                {t.aboutTitle}
              </h2>

              <p className="mt-6 leading-8 text-gray-400">
                {t.aboutP1}
              </p>

              <p className="mt-5 leading-8 text-gray-400">
                {t.aboutP2}
              </p>
            </div>

            {/* Visual */}
            <div
              dir="ltr"
              className="relative min-h-[400px] overflow-hidden rounded-3xl border border-white/10 bg-[#0b0f16]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,247,123,0.13),transparent_50%)]" />

              <div className="absolute left-1/2 top-1/2 flex h-52 w-52 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#39f77b]/20 bg-[#39f77b]/5">
                <div className="flex h-32 w-32 items-center justify-center rounded-full border border-[#39f77b]/30 bg-[#39f77b]/10 text-5xl text-[#39f77b]">
                  ⚡
                </div>
              </div>

              <div className="absolute left-8 top-8 rounded-xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur">
                <p className="text-xs text-gray-500">Focus</p>
                <p className="mt-1 font-bold">Electric Mobility</p>
              </div>

              <div className="absolute bottom-8 right-8 rounded-xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur">
                <p className="text-xs text-gray-500">Future</p>
                <p className="mt-1 font-bold text-[#39f77b]">
                  Electric
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="border-y border-white/10 bg-[#080b10]">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <p className="text-sm font-semibold text-[#39f77b]">
                {t.whyLabel}
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                {t.whyTitle}
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {values[language].map((item) => (
                <div
                  key={item.icon + item.title}
                  className="rounded-3xl border border-white/10 bg-[#0b0f16] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#39f77b]/30"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#39f77b]/10 text-2xl text-[#39f77b]">
                    {item.icon}
                  </div>

                  <h3 className="mt-6 font-bold">{item.title}</h3>

                  <p className="mt-3 text-sm leading-7 text-gray-500">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold text-[#39f77b]">
              {t.sectionsLabel}
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              {t.sectionsTitle}
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {stats[language].map((item) => (
              <div
                key={item.value}
                className="rounded-3xl border border-white/10 bg-[#0b0f16] p-7"
              >
                <span className="text-4xl font-black text-[#39f77b]/20">
                  {item.value}
                </span>

                <h3 className="mt-5 text-xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-7 text-gray-500">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

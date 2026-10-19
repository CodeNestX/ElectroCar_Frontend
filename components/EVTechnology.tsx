"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

type Language = "fa" | "en";

type IconName =
  | "battery"
  | "motor"
  | "bms"
  | "regen"
  | "adas"
  | "software"
  | "inverter"
  | "wheel";

/** Custom line icons on a 24px grid (replaces the old text glyphs). */
function TechIcon({
  name,
  className = "h-7 w-7",
  strokeWidth = 1.6,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "battery":
      return (
        <svg {...common}>
          <rect x="2.5" y="7" width="17" height="10" rx="2.2" />
          <path d="M22 10.5v3" />
          <path d="m11.5 9.5-2.2 3h3.4l-2.2 3" />
        </svg>
      );
    case "motor":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <circle cx="12" cy="12" r="2.6" />
          <path d="M12 9.4V3.6M14.3 13.3l5 2.9M9.7 13.3l-5 2.9" />
        </svg>
      );
    case "bms":
      return (
        <svg {...common}>
          <rect x="6" y="6" width="12" height="12" rx="2.2" />
          <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" />
          <path d="m9.6 12.2 1.7 1.7 3.2-3.4" />
        </svg>
      );
    case "regen":
      return (
        <svg {...common}>
          <path d="M20 11.5A8 8 0 0 0 6.2 6.6L4 9" />
          <path d="M4 4.5V9h4.5" />
          <path d="M4 12.5a8 8 0 0 0 13.8 4.9L20 15" />
          <path d="M20 19.5V15h-4.5" />
        </svg>
      );
    case "adas":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.1" fill="currentColor" />
          <path d="M12 12 18.4 5.6" />
        </svg>
      );
    case "software":
      return (
        <svg {...common}>
          <path d="m8 8-4 4 4 4" />
          <path d="m16 8 4 4-4 4" />
          <path d="m13.6 5.5-3.2 13" />
        </svg>
      );
    case "inverter":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2.5" />
          <path d="M6.5 12c1.4-4 2.7-4 4 0s2.6 4 4 0 1.9-3 3-2.2" />
        </svg>
      );
    case "wheel":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="2.4" />
          <path d="M12 9.6V3.2M14.1 13.2l5.5 3.2M9.9 13.2l-5.5 3.2" />
        </svg>
      );
  }
}

function CheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

function ChevronIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={`${className} rtl:-scale-x-100`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

type Technology = {
  id: string;
  title: string;
  subtitle: string;
  icon: IconName;
  description: string;
  details: string[];
};

const technologies: Record<Language, Technology[]> = {
  fa: [
    {
      id: "battery",
      title: "باتری",
      subtitle: "قلب انرژی خودرو",
      icon: "battery",
      description:
        "باتری یکی از مهم‌ترین بخش‌های خودروهای برقی است. انرژی الکتریکی مورد نیاز موتور و بسیاری از سیستم‌های خودرو در باتری ذخیره می‌شود.",
      details: [
        "بسیاری از خودروهای مدرن از باتری‌های لیتیوم-یونی استفاده می‌کنند.",
        "ظرفیت باتری معمولاً با kWh بیان می‌شود.",
        "سیستم مدیریت باتری وضعیت سلول‌ها و دمای آن‌ها را کنترل می‌کند.",
        "دما، نحوه شارژ و الگوی استفاده می‌توانند روی عملکرد باتری تأثیر بگذارند.",
      ],
    },
    {
      id: "motor",
      title: "موتور الکتریکی",
      subtitle: "تبدیل انرژی به حرکت",
      icon: "motor",
      description:
        "موتور الکتریکی انرژی ذخیره‌شده در باتری را به نیروی مکانیکی تبدیل می‌کند. یکی از ویژگی‌های مهم موتورهای الکتریکی، ارائه گشتاور بالا از دورهای پایین است.",
      details: [
        "موتورهای مختلفی مانند PMSM و القایی در خودروهای برقی استفاده می‌شوند.",
        "خودرو می‌تواند یک یا چند موتور الکتریکی داشته باشد.",
        "موتورهای دوگانه امکان ایجاد سیستم چهارچرخ محرک را فراهم می‌کنند.",
        "کنترل الکترونیکی موتور نقش مهمی در بازده و عملکرد خودرو دارد.",
      ],
    },
    {
      id: "bms",
      title: "سیستم BMS",
      subtitle: "مدیریت هوشمند باتری",
      icon: "bms",
      description:
        "Battery Management System یا BMS وظیفه نظارت و مدیریت باتری را بر عهده دارد و به حفظ عملکرد، ایمنی و شرایط مناسب سلول‌های باتری کمک می‌کند.",
      details: [
        "نظارت بر ولتاژ سلول‌ها",
        "کنترل دمای باتری",
        "مدیریت وضعیت شارژ باتری",
        "کمک به محافظت از باتری در شرایط غیرعادی",
      ],
    },
    {
      id: "regen",
      title: "ترمز احیاکننده",
      subtitle: "بازگرداندن انرژی",
      icon: "regen",
      description:
        "در سیستم ترمز احیاکننده، هنگام کاهش سرعت بخشی از انرژی جنبشی خودرو می‌تواند به انرژی الکتریکی تبدیل شده و دوباره به باتری منتقل شود.",
      details: [
        "در زمان کاهش سرعت، موتور می‌تواند مانند یک ژنراتور عمل کند.",
        "انرژی حاصل می‌تواند به باتری بازگردد.",
        "این سیستم می‌تواند نیاز به استفاده از ترمز اصطکاکی را کاهش دهد.",
        "میزان بازیابی انرژی به شرایط رانندگی و طراحی خودرو بستگی دارد.",
      ],
    },
    {
      id: "adas",
      title: "ADAS",
      subtitle: "سیستم‌های کمک‌راننده",
      icon: "adas",
      description:
        "سیستم‌های پیشرفته کمک‌راننده مجموعه‌ای از دوربین‌ها، رادارها و نرم‌افزارها هستند که برای کمک به راننده در شرایط مختلف طراحی شده‌اند.",
      details: [
        "هشدار خروج از خط",
        "کروز کنترل تطبیقی",
        "ترمز اضطراری خودکار",
        "تشخیص خودروها و موانع اطراف",
      ],
    },
    {
      id: "software",
      title: "نرم‌افزار خودرو",
      subtitle: "خودرویی که به‌روزرسانی می‌شود",
      icon: "software",
      description:
        "نرم‌افزار در خودروهای مدرن نقش بسیار مهمی دارد. بسیاری از قابلیت‌های خودرو توسط نرم‌افزار کنترل می‌شوند و برخی سازندگان امکان به‌روزرسانی از راه دور را فراهم کرده‌اند.",
      details: [
        "کنترل سیستم‌های خودرو",
        "مدیریت انرژی",
        "بهبود عملکرد سیستم‌ها",
        "به‌روزرسانی نرم‌افزاری از راه دور در برخی مدل‌ها",
      ],
    },
  ],
  en: [
    {
      id: "battery",
      title: "Battery",
      subtitle: "The heart of the car's energy",
      icon: "battery",
      description:
        "The battery is one of the most important parts of an electric car. The electrical energy needed by the motor and many of the car's systems is stored in the battery.",
      details: [
        "Many modern cars use lithium-ion batteries.",
        "Battery capacity is usually expressed in kWh.",
        "The battery management system monitors the condition and temperature of the cells.",
        "Temperature, charging habits, and usage patterns can affect battery performance.",
      ],
    },
    {
      id: "motor",
      title: "Electric motor",
      subtitle: "Turning energy into motion",
      icon: "motor",
      description:
        "The electric motor converts the energy stored in the battery into mechanical force. One key characteristic of electric motors is delivering high torque from low speeds.",
      details: [
        "Different motor types, such as PMSM and induction motors, are used in electric cars.",
        "A car can have one or several electric motors.",
        "Dual motors make it possible to create an all-wheel-drive system.",
        "Electronic motor control plays an important role in the car's efficiency and performance.",
      ],
    },
    {
      id: "bms",
      title: "BMS",
      subtitle: "Smart battery management",
      icon: "bms",
      description:
        "The Battery Management System (BMS) monitors and manages the battery, helping maintain the performance, safety, and proper condition of the battery cells.",
      details: [
        "Monitoring cell voltage",
        "Controlling battery temperature",
        "Managing the battery's state of charge",
        "Helping protect the battery in abnormal conditions",
      ],
    },
    {
      id: "regen",
      title: "Regenerative braking",
      subtitle: "Recovering energy",
      icon: "regen",
      description:
        "In a regenerative braking system, part of the car's kinetic energy can be converted into electrical energy during deceleration and sent back to the battery.",
      details: [
        "When slowing down, the motor can act like a generator.",
        "The recovered energy can return to the battery.",
        "This system can reduce the need for friction braking.",
        "The amount of energy recovered depends on driving conditions and the car's design.",
      ],
    },
    {
      id: "adas",
      title: "ADAS",
      subtitle: "Driver assistance systems",
      icon: "adas",
      description:
        "Advanced driver assistance systems are a set of cameras, radars, and software designed to help the driver in various situations.",
      details: [
        "Lane departure warning",
        "Adaptive cruise control",
        "Automatic emergency braking",
        "Detection of nearby vehicles and obstacles",
      ],
    },
    {
      id: "software",
      title: "Car software",
      subtitle: "A car that gets updated",
      icon: "software",
      description:
        "Software plays a very important role in modern cars. Many of a car's features are controlled by software, and some manufacturers offer over-the-air updates.",
      details: [
        "Controlling the car's systems",
        "Energy management",
        "Improving system performance",
        "Over-the-air software updates in some models",
      ],
    },
  ],
};

const architecture: Record<
  Language,
  { number: string; icon: IconName; title: string; text: string }[]
> = {
  fa: [
    { number: "01",
      icon: "battery", title: "باتری", text: "انرژی الکتریکی را ذخیره می‌کند." },
    {
      number: "02",
      icon: "inverter",
      title: "اینورتر",
      text: "توان الکتریکی را برای موتور مدیریت و تبدیل می‌کند.",
    },
    {
      number: "03",
      icon: "motor",
      title: "موتور",
      text: "انرژی الکتریکی را به حرکت تبدیل می‌کند.",
    },
    {
      number: "04",
      icon: "wheel",
      title: "چرخ‌ها",
      text: "نیروی تولیدشده را به حرکت خودرو تبدیل می‌کنند.",
    },
  ],
  en: [
    { number: "01",
      icon: "battery", title: "Battery", text: "Stores electrical energy." },
    {
      number: "02",
      icon: "inverter",
      title: "Inverter",
      text: "Manages and converts electrical power for the motor.",
    },
    {
      number: "03",
      icon: "motor",
      title: "Motor",
      text: "Converts electrical energy into motion.",
    },
    {
      number: "04",
      icon: "wheel",
      title: "Wheels",
      text: "Turn the generated force into the car's movement.",
    },
  ],
};

const ui = {
  fa: {
    introTitle: "تکنولوژی‌های اصلی خودروهای برقی",
    introText:
      "خودروهای برقی فقط یک موتور و باتری نیستند. مجموعه‌ای از سیستم‌های الکترونیکی، نرم‌افزاری و مکانیکی در کنار یکدیگر عملکرد خودرو را شکل می‌دهند.",
    keyTech: "فناوری کلیدی خودروهای برقی",
    aboutTech: "درباره این فناوری",
    keyPoints: "نکات مهم",
    archTitle: "یک خودروی برقی چگونه حرکت می‌کند؟",
    archText:
      "به‌صورت ساده، انرژی از باتری دریافت و توسط مجموعه‌ای از سیستم‌های الکتریکی و مکانیکی به حرکت تبدیل می‌شود.",
    batteryTitle: "چرا باتری این‌قدر مهم است؟",
    batteryText:
      "باتری بخش بزرگی از هزینه و وزن یک خودروی برقی را تشکیل می‌دهد و ظرفیت آن مستقیماً روی مقدار انرژی قابل ذخیره تأثیر دارد.",
    capacityUnit: "واحد ظرفیت",
    management: "مدیریت",
    importantNote: "نکته مهم",
    moreTitle: "ظرفیت بیشتر همیشه به معنی عملکرد بهتر نیست",
    moreText:
      "برد خودرو تنها به ظرفیت باتری وابسته نیست. وزن خودرو، آیرودینامیک، بازده موتور، شرایط آب‌وهوا، سرعت رانندگی و سبک رانندگی نیز می‌توانند روی مصرف انرژی تأثیر داشته باشند.",
    moreConclusion:
      "بنابراین هنگام بررسی خودروهای برقی، بهتر است مجموعه‌ای از مشخصات فنی را در کنار یکدیگر بررسی کنید.",
    adasTitle: "فناوری‌هایی که به راننده کمک می‌کنند",
    adasText:
      "سیستم‌های کمک‌راننده با استفاده از حسگرها و نرم‌افزارهای مختلف، اطلاعات محیط اطراف خودرو را تحلیل کرده و در برخی شرایط به راننده هشدار یا کمک ارائه می‌کنند.",
    adasList: [
      "کروز کنترل تطبیقی",
      "هشدار خروج از خط",
      "ترمز اضطراری",
      "تشخیص نقاط کور",
      "تشخیص علائم رانندگی",
      "پارک خودکار",
    ],
    adasNote:
      "سیستم‌های کمک‌راننده جایگزین توجه و کنترل راننده نیستند و قابلیت‌های واقعی آن‌ها به مدل خودرو و تجهیزات نصب‌شده بستگی دارد.",
    note: "توجه:",
    disclaimer:
      "مطالب این صفحه برای نمونه محتوایی و طراحی رابط کاربری تهیه شده‌اند. جزئیات فنی نهایی باید پیش از انتشار با منابع رسمی سازندگان و منابع تخصصی معتبر بررسی شوند.",
  },
  en: {
    introTitle: "Key technologies in electric cars",
    introText:
      "Electric cars are more than just a motor and a battery. A set of electronic, software, and mechanical systems work together to shape the car's performance.",
    keyTech: "A key electric-car technology",
    aboutTech: "About this technology",
    keyPoints: "Key points",
    archTitle: "How does an electric car move?",
    archText:
      "In simple terms, energy is drawn from the battery and turned into motion by a set of electrical and mechanical systems.",
    batteryTitle: "Why is the battery so important?",
    batteryText:
      "The battery makes up a large share of an electric car's cost and weight, and its capacity directly affects how much energy can be stored.",
    capacityUnit: "Capacity unit",
    management: "Management",
    importantNote: "Important note",
    moreTitle: "More capacity doesn't always mean better performance",
    moreText:
      "A car's range doesn't depend on battery capacity alone. Vehicle weight, aerodynamics, motor efficiency, weather conditions, driving speed, and driving style can also affect energy consumption.",
    moreConclusion:
      "So when evaluating electric cars, it's best to look at a range of technical specs together.",
    adasTitle: "Technologies that help the driver",
    adasText:
      "Driver assistance systems use various sensors and software to analyze the car's surroundings and, in some situations, warn or assist the driver.",
    adasList: [
      "Adaptive cruise control",
      "Lane departure warning",
      "Emergency braking",
      "Blind-spot detection",
      "Traffic sign recognition",
      "Automatic parking",
    ],
    adasNote:
      "Driver assistance systems do not replace the driver's attention and control, and their actual capabilities depend on the car model and installed equipment.",
    note: "Note:",
    disclaimer:
      "The content on this page was prepared as a content and UI design sample. The final technical details should be verified against official manufacturer sources and reliable specialist sources before publication.",
  },
};

export default function EVTechnology() {
  const [activeTechnology, setActiveTechnology] = useState("battery");
  const { language } = useLanguage();

  const t = ui[language];
  const techList = technologies[language];
  const arch = architecture[language];

  const activeIndex = Math.max(
    0,
    techList.findIndex((item) => item.id === activeTechnology)
  );
  const active = techList[activeIndex];

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      {/* Intro */}
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <p className="mb-3 text-sm font-semibold text-[#39f77b]">
          EV Technology
        </p>

        <h2 className="text-3xl font-bold sm:text-4xl">{t.introTitle}</h2>

        <p className="mt-5 leading-8 text-gray-400">{t.introText}</p>
      </div>

      {/* Explorer: list + detail */}
      <div className="grid gap-6 lg:grid-cols-[340px_1fr] lg:items-start">
        {/* Technology list */}
        <div
          role="tablist"
          aria-orientation="vertical"
          className="grid grid-cols-2 gap-3 lg:sticky lg:top-28 lg:grid-cols-1"
        >
          {techList.map((technology, index) => {
            const isActive = activeTechnology === technology.id;

            return (
              <button
                key={technology.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTechnology(technology.id)}
                className={`group relative flex items-center gap-4 overflow-hidden rounded-2xl border p-3 text-start transition duration-300 sm:p-4 ${
                  isActive
                    ? "border-[#39f77b]/40 bg-gradient-to-br from-[#39f77b]/[0.12] to-[#39f77b]/[0.03]"
                    : "border-white/10 bg-[#0b0f16] hover:border-white/20 hover:bg-white/[0.03]"
                }`}
              >
                {/* Active indicator bar */}
                <span
                  aria-hidden="true"
                  className={`absolute inset-y-3 start-0 w-[3px] rounded-full bg-[#39f77b] transition-opacity duration-300 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />

                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition duration-300 sm:h-14 sm:w-14 ${
                    isActive
                      ? "border-[#39f77b] bg-[#39f77b] text-[#04120a] shadow-[0_8px_28px_-8px_rgba(57,247,123,0.7)]"
                      : "border-white/10 bg-white/[0.04] text-[#39f77b] group-hover:border-[#39f77b]/30"
                  }`}
                >
                  <TechIcon name={technology.icon} className="h-6 w-6 sm:h-7 sm:w-7" />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold sm:text-base">
                    {technology.title}
                  </span>

                  <span className="mt-0.5 hidden truncate text-xs text-gray-500 lg:block">
                    {technology.subtitle}
                  </span>
                </span>

                <span
                  dir="ltr"
                  className={`hidden text-xs font-bold tabular-nums transition-colors lg:block ${
                    isActive ? "text-[#39f77b]" : "text-gray-700"
                  }`}
                >
                  {pad(index + 1)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active technology */}
        <div
          key={active.id}
          role="tabpanel"
          className="tech-panel relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0f1a1a] via-[#0b0f16] to-[#05070b]"
        >
          {/* Decorative background */}
          <div className="pointer-events-none absolute -end-24 -top-24 h-72 w-72 rounded-full bg-[#39f77b]/10 blur-3xl" />
          <TechIcon
            name={active.icon}
            strokeWidth={0.7}
            className="pointer-events-none absolute -bottom-16 -end-10 h-72 w-72 text-[#39f77b]/[0.07]"
          />

          <div className="relative p-6 sm:p-8 lg:p-10">
            {/* Header */}
            <div className="flex items-center gap-5">
              <span className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl border border-[#39f77b]/30 bg-[#39f77b]/10 text-[#39f77b] sm:h-24 sm:w-24">
                <span className="absolute inset-0 rounded-3xl bg-[#39f77b]/20 blur-xl" />
                <TechIcon
                  name={active.icon}
                  strokeWidth={1.5}
                  className="relative h-10 w-10 sm:h-12 sm:w-12"
                />
              </span>

              <div className="min-w-0">
                <p className="text-xs font-semibold tracking-wide text-[#39f77b]">
                  <span dir="ltr" className="tabular-nums">
                    {pad(activeIndex + 1)} / {pad(techList.length)}
                  </span>
                  <span className="mx-2 text-gray-700">•</span>
                  {t.keyTech}
                </p>

                <h3 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                  {active.title}
                </h3>

                <p className="mt-1 text-gray-500">{active.subtitle}</p>
              </div>
            </div>

            <div className="my-7 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* About */}
            <p className="text-sm font-semibold text-[#39f77b]">
              {t.aboutTech}
            </p>

            <p className="mt-3 max-w-3xl leading-8 text-gray-300">
              {active.description}
            </p>

            {/* Key points */}
            <h4 className="mb-4 mt-9 font-bold">{t.keyPoints}</h4>

            <div className="grid gap-3 sm:grid-cols-2">
              {active.details.map((detail, i) => (
                <div
                  key={detail}
                  className="flex gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition hover:border-[#39f77b]/25"
                >
                  <span
                    dir="ltr"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#39f77b]/10 text-xs font-bold tabular-nums text-[#39f77b]"
                  >
                    {i + 1}
                  </span>

                  <p className="text-sm leading-7 text-gray-400">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* How EV works */}
      <div className="mt-24">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold text-[#39f77b]">
            EV Architecture
          </p>

          <h2 className="text-3xl font-bold sm:text-4xl">{t.archTitle}</h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-500">
            {t.archText}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {arch.map((item, index) => (
            <div
              key={item.number}
              className="group relative rounded-3xl border border-white/10 bg-[#0b0f16] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#39f77b]/30"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#39f77b]/20 bg-[#39f77b]/10 text-[#39f77b] transition group-hover:bg-[#39f77b] group-hover:text-[#04120a]">
                  <TechIcon name={item.icon} className="h-7 w-7" />
                </span>

                <span className="text-3xl font-black text-white/[0.07]">
                  {item.number}
                </span>
              </div>

              <h3 className="mt-6 text-lg font-bold">{item.title}</h3>

              <p className="mt-2 text-sm leading-7 text-gray-500">
                {item.text}
              </p>

              {/* Arrow to the next step */}
              {index < arch.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute -end-6 top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-[#39f77b]/30 bg-[#05070b] text-[#39f77b] lg:flex"
                >
                  <ChevronIcon className="h-3.5 w-3.5" />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Battery */}
      <div className="mt-24">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-[#0b0f16] p-8">
            <p className="text-sm font-semibold text-[#39f77b]">Battery Pack</p>

            <h2 className="mt-3 text-3xl font-bold">{t.batteryTitle}</h2>

            <p className="mt-5 leading-8 text-gray-400">{t.batteryText}</p>

            {/* Battery pack graphic */}
            <div dir="ltr" className="mt-8 flex items-center">
              <div className="flex h-16 flex-1 gap-1.5 rounded-2xl border border-[#39f77b]/30 bg-black/30 p-1.5">
                {[1, 0.85, 0.7, 0.55, 0.4, 0.25].map((o) => (
                  <span
                    key={o}
                    className="flex-1 rounded-lg bg-[#39f77b]"
                    style={{ opacity: o }}
                  />
                ))}
              </div>

              <span className="h-7 w-1.5 rounded-e-md bg-[#39f77b]/40" />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <span className="text-xs text-gray-500">{t.capacityUnit}</span>

                <p className="mt-2 text-xl font-bold text-[#39f77b]">kWh</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <span className="text-xs text-gray-500">{t.management}</span>

                <p className="mt-2 text-xl font-bold text-[#39f77b]">BMS</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#39f77b]/20 bg-gradient-to-br from-[#39f77b]/[0.08] to-[#39f77b]/[0.02] p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#39f77b]/15 text-[#39f77b]">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 11v5M12 8h.01" />
                </svg>
              </span>

              <p className="text-sm font-semibold text-[#39f77b]">
                {t.importantNote}
              </p>
            </div>

            <h2 className="mt-5 text-2xl font-bold">{t.moreTitle}</h2>

            <p className="mt-5 leading-8 text-gray-400">{t.moreText}</p>

            <div className="mt-7 rounded-2xl border border-[#39f77b]/10 bg-black/20 p-5">
              <p className="text-sm leading-7 text-gray-400">
                {t.moreConclusion}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ADAS */}
      <div className="mt-24 overflow-hidden rounded-3xl border border-white/10 bg-[#0b0f16]">
        <div className="grid lg:grid-cols-2">
          {/* Radar visual */}
          <div className="relative flex min-h-[380px] items-center justify-center overflow-hidden bg-gradient-to-br from-[#0d1713] via-[#0b0f16] to-[#05070b] p-8">
            <div className="relative h-64 w-64 sm:h-72 sm:w-72">
              {/* rings */}
              <span className="absolute inset-0 rounded-full border border-[#39f77b]/20" />
              <span className="absolute inset-[16%] rounded-full border border-[#39f77b]/20" />
              <span className="absolute inset-[32%] rounded-full border border-[#39f77b]/25" />

              {/* crosshair */}
              <span className="absolute inset-x-0 top-1/2 h-px bg-[#39f77b]/10" />
              <span className="absolute inset-y-0 start-1/2 w-px bg-[#39f77b]/10" />

              {/* sweep */}
              <span
                aria-hidden="true"
                className="radar-sweep absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, rgba(57,247,123,0.28), rgba(57,247,123,0) 70deg, rgba(57,247,123,0) 360deg)",
                }}
              />

              {/* blips */}
              <span className="absolute left-[68%] top-[24%] h-2 w-2 animate-pulse rounded-full bg-[#39f77b] shadow-[0_0_12px_#39f77b]" />
              <span className="absolute left-[24%] top-[36%] h-1.5 w-1.5 animate-pulse rounded-full bg-[#39f77b]/80" />
              <span className="absolute left-[60%] top-[72%] h-1.5 w-1.5 animate-pulse rounded-full bg-[#39f77b]/80" />

              {/* center */}
              <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#39f77b]/40 bg-[#07110c] text-[#39f77b]">
                <TechIcon name="adas" className="h-8 w-8" />
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-6 text-center">
              <h3 className="text-xl font-bold">ADAS</h3>

              <p className="mt-1 text-xs text-gray-500">
                Advanced Driver Assistance Systems
              </p>
            </div>
          </div>

          <div className="p-8 lg:p-10">
            <p className="text-sm font-semibold text-[#39f77b]">
              Driver Assistance
            </p>

            <h2 className="mt-3 text-3xl font-bold">{t.adasTitle}</h2>

            <p className="mt-5 leading-8 text-gray-400">{t.adasText}</p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {t.adasList.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm text-gray-300"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#39f77b]/15 text-[#39f77b]">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-7 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-4">
              <p className="text-xs leading-6 text-gray-500">{t.adasNote}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-10 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5 text-sm leading-7 text-gray-400">
        <span className="font-semibold text-yellow-400">{t.note}</span>{" "}
        {t.disclaimer}
      </div>

      <style>{`
        .tech-panel { animation: techIn .45s ease both; }
        .radar-sweep { animation: radarSpin 5s linear infinite; }
        @keyframes techIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        @keyframes radarSpin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) {
          .tech-panel, .radar-sweep { animation: none; }
        }
      `}</style>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

// Social media channels
const socialLinks = [
  {
    key: "instagram",
    href: "https://instagram.com/",
    labelFa: "اینستاگرام",
    labelEn: "Instagram",
  },
  {
    key: "telegram",
    href: "https://t.me/",
    labelFa: "تلگرام",
    labelEn: "Telegram",
  },
  {
    key: "bale",
    href: "https://ble.ir/",
    labelFa: "پیام‌رسان بله",
    labelEn: "Bale",
  },
] as const;

// Trending tags/topics for quick navigation
const trendingTopics = [
  {
    fa: "فناوری باتری‌های نوین",
    en: "Next-Gen Batteries",
    href: "/search?q=باتری",
  },
  {
    fa: "ایستگاه‌های شارژ سریع",
    en: "Ultra-Fast Charging",
    href: "/search?q=شارژ",
  },
  {
    fa: "خودروهای تمام الکتریکی",
    en: "All-Electric Vehicles",
    href: "/technology",
  },
  {
    fa: "هوش مصنوعی و خودران",
    en: "Autopilot & AI",
    href: "/articles",
  },
  {
    fa: "حمل‌ونقل پایدار و سبز",
    en: "Sustainable Mobility",
    href: "/about",
  },
];

// Quick navigation links
const navigationLinks = [
  { fa: "صفحه اصلی", en: "Home", href: "/" },
  { fa: "مقالات تخصصی", en: "Articles", href: "/articles" },
  { fa: "فناوری و نوآوری", en: "Technology", href: "/technology" },
  { fa: "جستجوی پیشرفته", en: "Search Hub", href: "/search" },
  { fa: "درباره ولتینو", en: "About Voltinou", href: "/about" },
  { fa: "ارتباط و همکاری", en: "Contact Us", href: "/contact" },
];

function SocialIcon({
  name,
  className = "h-5 w-5",
}: {
  name: (typeof socialLinks)[number]["key"];
  className?: string;
}) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "instagram") {
    return (
      <svg {...common}>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" />
      </svg>
    );
  }

  if (name === "telegram") {
    return (
      <svg {...common}>
        <path d="M21 4 3 11l5.5 2L19 6.5 10 14.5V19l3-3.2 4.5 3.2L21 4Z" />
      </svg>
    );
  }

  // Bale official logo (without text)
  return (
    <svg
      className={className}
      viewBox="-1 -10 612 612"
      fill="currentColor"
      aria-hidden="true"
    >
      <g transform="translate(59.0625, 9.375)">
        <path d="M0 0 C10.16888405 6.59451569 20.07714491 13.58075916 29.9375 20.625 C30.71512695 21.17833008 31.49275391 21.73166016 32.29394531 22.30175781 C34.57422328 23.92584068 36.85061977 25.55516969 39.125 27.1875 C39.85299805 27.70892578 40.58099609 28.23035156 41.33105469 28.76757812 C45.18760438 31.5539138 48.95766215 34.41471661 52.6640625 37.3984375 C53.43339111 38.01130615 54.20271973 38.6241748 54.99536133 39.25561523 C56.46642118 40.43453391 57.92534747 41.62880254 59.36987305 42.84008789 C60.02769775 43.36594482 60.68552246 43.89180176 61.36328125 44.43359375 C61.93473877 44.90595459 62.50619629 45.37831543 63.0949707 45.86499023 C64.9995315 46.86750833 64.9995315 46.86750833 67.34375 45.99291992 C70.13447195 44.5211188 72.50901416 42.85057037 75.01171875 40.9296875 C80.68849269 36.71981701 86.57097611 33.16856948 92.75 29.75 C94.37905273 28.84664917 94.37905273 28.84664917 96.04101562 27.92504883 C167.56652016 -11.21714814 250.78112602 -19.09103771 328.85253906 3.46728516 C382.11163928 19.31969969 434.75742985 52.02113796 469.66796875 95.796875 C471.97153323 98.66740974 474.35579548 101.45485214 476.75 104.25 C487.70043035 117.42102846 496.664973 131.65771181 504.9375 146.625 C505.36272949 147.37974609 505.78795898 148.13449219 506.22607422 148.91210938 C544.21000034 216.49750349 551.21148764 299.08937076 530.77734375 373.26171875 C515.1127555 428.24745326 482.92134349 480.63241558 438.9375 517.625 C438.39480469 518.08148926 437.85210937 518.53797852 437.29296875 519.00830078 C391.41772881 557.40548367 335.66231712 582.89492136 275.9375 589.625 C274.71341431 589.76639404 274.71341431 589.76639404 273.46459961 589.91064453 C263.08971631 590.94342162 252.66568348 590.86870441 242.25 590.875 C240.74475769 590.87601212 240.74475769 590.87601212 239.20910645 590.87704468 C223.89964207 590.86070603 209.04297596 590.31818366 193.9375 587.625 C192.92993652 587.45339355 191.92237305 587.28178711 190.88427734 587.10498047 C133.221793 577.11514923 81.05670842 551.04271011 37.9375 511.625 C36.9784375 510.77035156 36.019375 509.91570313 35.03125 509.03515625 C8.15034688 484.99139125 -13.75821123 454.28082699 -29.08398438 421.70166016 C-29.75710697 420.27312203 -30.4385868 418.84850153 -31.12695312 417.42724609 C-44.15961992 390.47123201 -51.99687007 361.8049048 -56.375 332.25 C-56.53460205 331.18273682 -56.6942041 330.11547363 -56.85864258 329.01586914 C-59.48552498 309.84441428 -59.21585121 290.42462324 -59.22363281 271.1171875 C-59.22774614 268.40467651 -59.23327906 265.69216873 -59.23867798 262.97966003 C-59.25211569 255.67242207 -59.25826029 248.36518968 -59.26268864 241.05794144 C-59.26547073 236.48539365 -59.26971092 231.91284791 -59.27419281 227.34030151 C-59.28635645 214.64525995 -59.29666785 201.95021999 -59.3000679 189.25517273 C-59.30028747 188.44686557 -59.30050703 187.63855842 -59.30073325 186.80575711 C-59.30095153 185.99572403 -59.30116981 185.18569095 -59.3013947 184.35111141 C-59.30183814 182.71014849 -59.30228471 181.06918557 -59.30273438 179.42822266 C-59.3029558 178.61428012 -59.30317723 177.80033758 -59.30340537 176.96173012 C-59.30736203 163.74380319 -59.32485543 150.52593108 -59.3480939 137.30802536 C-59.37183554 123.69294267 -59.38427069 110.07788753 -59.38543582 96.46278381 C-59.38634993 88.83573396 -59.39203724 81.20875602 -59.41025543 73.58172607 C-59.42569311 67.09703107 -59.43075455 60.61243032 -59.42251733 54.12772042 C-59.41862648 50.8248289 -59.42111609 47.52216557 -59.43357468 44.21928978 C-59.44632028 40.62918595 -59.44040305 37.03956387 -59.42999268 33.44946289 C-59.43804908 32.4202667 -59.44610548 31.39107052 -59.45440602 30.33068657 C-59.38128425 19.49576827 -57.67854825 9.6757542 -50.0625 1.625 C-49.49789062 0.99722656 -48.93328125 0.36945312 -48.3515625 -0.27734375 C-33.98209748 -14.61649345 -15.17750021 -9.63381837 0 0 Z M318.90039062 184.56445312 C317.62161305 185.84515401 316.34260455 187.12562435 315.06338501 188.40588379 C312.32943162 191.14297649 309.59703389 193.88160906 306.86585999 196.62147522 C302.54905288 200.95188368 298.22836305 205.27840432 293.90710449 209.60437012 C284.74759034 218.77494106 275.59234113 227.94976441 266.4375 237.125 C256.52486751 247.05966673 246.61149141 256.99358498 236.69325781 266.92266035 C232.39470618 271.22620098 228.09860554 275.53216918 223.80435085 279.83999729 C221.14211365 282.5096695 218.4778281 285.17729009 215.81296921 287.84434509 C214.57447301 289.08471998 213.33684482 290.32596224 212.10013199 291.56811523 C210.41770935 293.25770826 208.73227031 294.94423273 207.04602051 296.63000488 C206.55284411 297.12677624 206.05966771 297.6235476 205.55154657 298.13537264 C202.16568698 301.51090651 202.16568698 301.51090651 199.9375 302.625 C199.69978882 302.06262634 199.46207764 301.50025269 199.21716309 300.9208374 C197.64775019 298.10516126 195.74131944 296.17446181 193.46289062 293.89160156 C192.07003845 292.48929291 192.07003845 292.48929291 190.64904785 291.05865479 C189.6308679 290.0440579 188.61242852 289.0297213 187.59375 288.015625 C186.54410075 286.96462682 185.4947484 285.91333205 184.44567871 284.86175537 C182.24306673 282.6561951 180.03688109 280.45428954 177.828125 278.25488281 C175.02202338 275.46009123 172.22488493 272.65652997 169.43045807 269.85007095 C167.26170088 267.67401485 165.0881133 265.50283338 162.91313171 263.33300018 C161.88162654 262.30281384 160.85156207 261.27118254 159.82307434 260.2379837 C144.92699564 245.28873587 129.68255729 233.83073698 107.8125 233.1875 C91.09164839 233.8898664 76.90761937 239.93111415 64.9375 251.625 C52.31698314 266.16228478 48.93447322 281.41007534 49.7421875 300.12548828 C50.17603483 305.67764944 51.71589891 310.5530428 53.9375 315.625 C54.32679687 316.54023438 54.71609375 317.45546875 55.1171875 318.3984375 C62.91875091 334.50935838 79.6590102 347.53960213 92.12109375 360.046875 C93.08543158 361.01527464 94.04974162 361.98370195 95.01402473 362.95215607 C99.54192285 367.49899092 104.07215294 372.04348616 108.6053223 376.5850656 C113.79061195 381.78014385 118.9674844 386.98342704 124.1374802 392.19372439 C128.17068853 396.25726463 132.21170693 400.31293435 136.25846058 404.3629849 C138.65972094 406.76657209 141.05770487 409.1732059 143.44735527 411.58834076 C160.23531249 429.26530496 160.23531249 429.26530496 181.4375 440.625 C182.5615625 440.99625 183.685625 441.3675 184.84375 441.75 C199.9735843 446.02914506 215.59320068 443.9979882 229.625 437.0625 C242.70168371 429.14594618 253.41266884 416.30926011 264.16137695 405.578125 C265.86587398 403.8799063 267.5705555 402.18187275 269.27540588 400.48400879 C274.35030086 395.42817431 279.4210329 390.36817667 284.49087051 385.30727196 C286.40605518 383.39560929 288.32155063 381.48425821 290.23706061 379.57292151 C298.70051838 371.12789526 307.16263627 362.68152906 315.62073994 354.23114014 C317.68017436 352.17361498 319.73961438 350.11609542 321.79907227 348.05859375 C322.31081704 347.54733271 322.82256182 347.03607167 323.34981402 346.50931787 C331.65343011 338.21401553 339.96554134 329.92728005 348.28119753 321.64404917 C356.84671205 313.1116596 365.40462649 304.57170642 373.95519036 296.02433395 C378.74517914 291.23650299 383.53835825 286.45196765 388.34008217 281.67590332 C392.85267331 277.18662942 397.35560207 272.68788235 401.85141563 268.18180847 C403.49785345 266.5348763 405.14768849 264.89133189 406.80123901 263.25154114 C421.51150206 248.67821034 421.51150206 248.67821034 430.8125 230.375 C431.20179688 229.25609375 431.59109375 228.1371875 431.9921875 226.984375 C436.20683198 212.00671281 434.01795344 195.94873845 426.6015625 182.33984375 C417.22645895 167.04478045 404.31859226 157.92615862 386.9375 153.625 C357.12113356 147.9114577 338.32387883 165.05429068 318.90039062 184.56445312 Z " />
      </g>
    </svg>
  );
}

export default function Footer() {
  const { language } = useLanguage();
  const isFa = language === "fa";

  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText("info@voltinou.ir");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      className="relative overflow-hidden bg-gradient-to-b from-[#08131d] via-[#050b11] to-[#020508] text-gray-300 select-none border-t border-white/5"
      dir={isFa ? "rtl" : "ltr"}
    >
      {/* Top Ambient Glow & Horizon Light */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-44 w-[750px] max-w-full rounded-full bg-gradient-to-r from-emerald-500/15 via-[#39f77b]/25 to-cyan-500/15 blur-3xl"
        aria-hidden="true"
      />

      {/* Top border glowing beam */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#39f77b]/80 to-transparent shadow-[0_0_15px_rgba(57,247,123,0.8)]"
        aria-hidden="true"
      />

      <div className="site-container relative z-10 pt-10 pb-8">
        {/* ========================================================
            MAIN 4-COLUMN FOOTER NAVIGATION (SLIM & MINIMAL)
        ======================================================== */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-12">
          {/* ----------------- Column 1: Brand & Identity ----------------- */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              {/* Brand Logo with Electric Flare */}
              <Link
                href="/"
                aria-label="Voltinou"
                className="group inline-flex items-center gap-1.5 focus:outline-none"
              >
                {isFa ? (
                  <div className="relative flex items-center text-2xl font-black tracking-tight leading-none select-none">
                    <span className="bg-gradient-to-l from-[#4efda4] to-[#39f77b] bg-clip-text text-transparent drop-shadow-[0_0_14px_rgba(57,247,123,0.5)]">
                      ولت
                    </span>
                    <span className="mx-1.5 inline-flex items-center justify-center text-[#39f77b] drop-shadow-[0_0_12px_#39f77b] transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">
                      <svg
                        className="h-4.5 w-4.5 animate-pulse"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M13 2L3 14h8l-2 8 11-13h-8l3-7Z" />
                      </svg>
                    </span>
                    <span className="text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]">
                      ینو
                    </span>
                  </div>
                ) : (
                  <div className="relative flex items-center text-xl font-black tracking-wider leading-none select-none">
                    <span className="bg-gradient-to-r from-[#39f77b] to-[#4efda4] bg-clip-text text-transparent drop-shadow-[0_0_14px_rgba(57,247,123,0.5)]">
                      VOLT
                    </span>
                    <span className="mx-1 inline-flex items-center justify-center text-[#39f77b] drop-shadow-[0_0_10px_#39f77b] transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">
                      <svg
                        className="h-3.5 w-3.5 animate-pulse"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M13 2L3 14h8l-2 8 11-13h-8l3-7Z" />
                      </svg>
                    </span>
                    <span className="text-white font-extrabold tracking-widest">
                      INOU
                    </span>
                  </div>
                )}
              </Link>

              {/* Brand Mission Description */}
              <p className="mt-4 text-xs sm:text-sm leading-6 text-gray-400">
                {isFa ? (
                  <>
                    مرجع اخبار، بررسی‌های تخصصی، فناوری باتری و ایستگاه‌های شارژ خودروهای برقی در مسیر حرکت پاک و پایدار.
                  </>
                ) : (
                  <>
                    Your premier hub for electric vehicle news, battery technology, and charging infrastructure.
                  </>
                )}
              </p>
            </div>

            {/* Quick Contact Capsule */}
            <div className="mt-5 pt-4 border-t border-white/5 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleCopyEmail}
                title={isFa ? "کلیک برای کپی ایمیل" : "Click to copy email"}
                className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-gray-300 transition-all duration-200 hover:border-[#39f77b]/50 hover:bg-[#39f77b]/10 hover:text-white cursor-pointer"
              >
                <svg
                  className="h-3.5 w-3.5 text-[#39f77b]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span dir="ltr" className="font-mono text-xs">
                  info@voltinou.ir
                </span>
                <span className="text-[10px] text-gray-500 group-hover:text-[#39f77b]">
                  {copiedEmail ? (isFa ? "کپی شد!" : "Copied!") : isFa ? "کپی" : "Copy"}
                </span>
              </button>

              <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/5 bg-white/[0.02] px-2.5 py-1.5 text-[11px] text-gray-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{isFa ? "پشتیبانی فعال" : "Online Support"}</span>
              </span>
            </div>
          </div>

          {/* ----------------- Column 2: Navigation Links ----------------- */}
          <div className="lg:col-span-2 md:col-span-1">
            <h4 className="flex items-center gap-2 text-xs font-bold tracking-wider text-white uppercase">
              <span className="h-3.5 w-1 rounded-full bg-[#39f77b] shadow-[0_0_8px_#39f77b]" />
              <span>{isFa ? "بخش‌های اصلی" : "Navigation"}</span>
            </h4>

            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-gray-400 transition-all duration-200 hover:text-[#39f77b] hover:translate-x-1 rtl:hover:-translate-x-1"
                  >
                    <span className="h-1 w-1 rounded-full bg-white/20 transition-all duration-200 group-hover:w-2 group-hover:bg-[#39f77b] group-hover:shadow-[0_0_8px_#39f77b]" />
                    <span>{isFa ? link.fa : link.en}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ----------------- Column 3: Trending Topics ----------------- */}
          <div className="lg:col-span-3 md:col-span-1">
            <h4 className="flex items-center gap-2 text-xs font-bold tracking-wider text-white uppercase">
              <span className="h-3.5 w-1 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,200,255,0.8)]" />
              <span>{isFa ? "مباحث پرطرفدار" : "Trending Topics"}</span>
            </h4>

            <div className="mt-4 flex flex-wrap gap-2">
              {trendingTopics.map((topic, i) => (
                <Link
                  key={i}
                  href={topic.href}
                  className="group flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-xs text-gray-300 transition-all duration-200 hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-white hover:shadow-[0_0_14px_-4px_rgba(0,200,255,0.4)]"
                >
                  <span className="text-cyan-400/70 group-hover:text-cyan-400 text-[11px]">#</span>
                  <span>{isFa ? topic.fa : topic.en}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* ----------------- Column 4: Minimal Social Channels ----------------- */}
          <div className="lg:col-span-3 md:col-span-1">
            <h4 className="flex items-center gap-2 text-xs font-bold tracking-wider text-white uppercase">
              <span className="h-3.5 w-1 rounded-full bg-[#39f77b] shadow-[0_0_8px_#39f77b]" />
              <span>{isFa ? "شبکه‌های اجتماعی" : "Connect"}</span>
            </h4>

            <p className="mt-4 text-xs text-gray-400 leading-relaxed">
              {isFa
                ? "برای دریافت آخرین اخبار و بررسی‌ها ما را دنبال کنید:"
                : "Follow our official channels for the latest updates:"}
            </p>

            <div className="mt-3.5 flex items-center gap-2.5">
              {socialLinks.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={isFa ? item.labelFa : item.labelEn}
                  title={isFa ? item.labelFa : item.labelEn}
                  className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:border-[#39f77b]/50 hover:bg-[#39f77b]/10 hover:text-[#39f77b] hover:shadow-[0_6px_20px_-4px_rgba(57,247,123,0.4)] cursor-pointer"
                >
                  <SocialIcon
                    name={item.key}
                    className="h-4.5 w-4.5 transition-transform duration-300 group-hover:scale-110"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================
            SUB-FOOTER / COPYRIGHT & BACK TO TOP
        ======================================================== */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-gray-500">
          {/* Copyright & Slogan */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <span className="text-gray-400">
              {isFa
                ? `© ${new Date().getFullYear()} ولتینو (Voltinou) — تمامی حقوق محفوظ است.`
                : `© ${new Date().getFullYear()} Voltinou. All rights reserved.`}
            </span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="inline-flex items-center gap-1.5 text-gray-400">
              <span>{isFa ? "طراحی شده با الهام از آینده حرکت پاک" : "Engineered for clean electric mobility"}</span>
              <span className="text-[#39f77b]">⚡</span>
            </span>
          </div>

          {/* Quick Legal + Back to Top Button */}
          <div className="flex items-center justify-between sm:justify-end gap-6">
            <div className="flex items-center gap-4 text-gray-400">
              <Link
                href="/about"
                className="transition hover:text-[#39f77b]"
              >
                {isFa ? "حریم خصوصی" : "Privacy"}
              </Link>
              <span>•</span>
              <Link
                href="/contact"
                className="transition hover:text-[#39f77b]"
              >
                {isFa ? "قوانین و شرایط" : "Terms"}
              </Link>
            </div>

            {/* Back to top button */}
            <button
              type="button"
              onClick={scrollToTop}
              title={isFa ? "بازگشت به ابتدای صفحه" : "Back to Top"}
              aria-label={isFa ? "بازگشت به ابتدای صفحه" : "Back to top"}
              className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-gray-400 transition-all duration-300 hover:border-[#39f77b]/50 hover:bg-[#39f77b]/10 hover:text-[#39f77b] hover:shadow-[0_0_20px_rgba(57,247,123,0.3)] cursor-pointer"
            >
              <span>{isFa ? "بازگشت به بالا" : "Back to top"}</span>
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

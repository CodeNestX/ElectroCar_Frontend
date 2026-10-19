"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

// TODO: put your real account links here
const socialLinks = [
  { key: "instagram", href: "https://instagram.com/", label: "Instagram" },
  { key: "telegram", href: "https://t.me/", label: "Telegram" },
  { key: "bale", href: "https://ble.ir/", label: "Bale" },
] as const;

function SocialIcon({ name }: { name: (typeof socialLinks)[number]["key"] }) {
  const common = {
    className: "h-5 w-5",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "instagram") {
    return (
      <svg {...common}>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
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

  // Bale: chat bubble
  return (
    <svg {...common}>
      <path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-5 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
      <path d="M8.5 11h7" />
    </svg>
  );
}

export default function Footer() {
  const { language } = useLanguage();

  const isFa = language === "fa";

  return (
    <footer className="border-t border-white/5 bg-[#091521]">
      <div className="site-container py-14">

        {/* Main Footer */}
        <div
          className={`grid gap-10 text-center md:grid-cols-2 lg:grid-cols-4 ${
            isFa ? "lg:text-right" : "lg:text-left"
          }`}
        >

          {/* Brand */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className={`flex items-center justify-center gap-3 ${
                isFa ? "lg:justify-start" : "lg:justify-start"
              }`}
            >
              <div className="flex h-10 w-10 items-center justify-center">
                <svg
                  viewBox="0 0 64 64"
                  className="h-10 w-10"
                  fill="none"
                >
                  <path
                    d="M42 7H18L8 25h19L17 57l35-37H33L42 7Z"
                    fill="url(#footerLogo)"
                  />

                  <defs>
                    <linearGradient
                      id="footerLogo"
                      x1="10"
                      y1="10"
                      x2="52"
                      y2="52"
                    >
                      <stop stopColor="#00c8ff" />
                      <stop offset="1" stopColor="#39f77b" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <span className="text-xl font-extrabold">
                Electro<span className="text-[#39f77b]">Car</span>
              </span>
            </Link>

            {/* Brand Description */}
            <p
              className={`mt-5 text-center text-sm leading-7 text-gray-500 ${
                isFa ? "lg:text-right" : "lg:text-left"
              }`}
            >
              {isFa ? (
                <>
                  مرجع اخبار، مقالات، بررسی و فناوری خودروهای برقی.
                  <br />
                  با ElectroCar دنیای حرکت الکتریکی را بهتر بشناسید.
                </>
              ) : (
                <>
                  Your source for electric vehicle news, articles,
                  reviews, and technology.
                  <br />
                  Discover the world of electric mobility with ElectroCar.
                </>
              )}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 font-bold text-white">
              {isFa ? "دسترسی سریع" : "Quick Links"}
            </h3>

            <div
              className={`flex flex-col gap-3 text-sm text-gray-500 ${
                isFa ? "items-center lg:items-start" : "items-center lg:items-start"
              }`}
            >
              <Link
                href="/"
                className="transition hover:text-[#39f77b]"
              >
                {isFa ? "صفحه اصلی" : "Home"}
              </Link>

              <Link href="/articles" className="transition hover:text-[#39f77b]">
                {isFa ? "مقالات" : "Articles"}
              </Link>

              <Link href="/technology" className="transition hover:text-[#39f77b]">
                {isFa ? "تکنولوژی" : "Technology"}
              </Link>

              <Link href="/about" className="transition hover:text-[#39f77b]">
                {isFa ? "درباره ما" : "About Us"}
              </Link>

              <Link href="/contact" className="transition hover:text-[#39f77b]">
                {isFa ? "تماس با ما" : "Contact Us"}
              </Link>
            </div>
          </div>

          {/* Contact methods */}
          <div>
            <h3 className="mb-5 font-bold text-white">
              {isFa ? "راه‌های ارتباطی" : "Contact Methods"}
            </h3>

            <div className="flex items-center justify-center gap-3 lg:justify-start">
              {socialLinks.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  title={item.label}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-gray-400 transition duration-200 hover:-translate-y-0.5 hover:border-[#39f77b]/50 hover:bg-[#39f77b]/10 hover:text-[#39f77b] hover:shadow-[0_8px_24px_-8px_rgba(57,247,123,0.5)]"
                >
                  <SocialIcon name={item.key} />
                </a>
              ))}
            </div>
          </div>

          {/* About */}
          <div>
            <Link
              href="/about"
              className="mb-5 block font-bold text-white transition hover:text-[#39f77b]"
            >
              {isFa ? "درباره ElectroCar" : "About ElectroCar"}
            </Link>

            <p
              className={`text-center text-sm leading-7 text-gray-500 ${
                isFa ? "lg:text-right" : "lg:text-left"
              }`}
            >
              {isFa ? (
                <>
                  ElectroCar یک پلتفرم محتوایی با تمرکز بر خودروهای
                  الکتریکی، فناوری‌های نوین و آینده صنعت حمل‌ونقل است.
                </>
              ) : (
                <>
                  ElectroCar is a content platform focused on electric
                  vehicles, emerging technologies, and the future of
                  transportation.
                </>
              )}
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-white/5 pt-6 text-center text-xs text-gray-600">
          {isFa
            ? `© ${new Date().getFullYear()} ElectroCar — تمامی حقوق محفوظ است.`
            : `© ${new Date().getFullYear()} ElectroCar — All rights reserved.`}
        </div>

      </div>
    </footer>
  );
}


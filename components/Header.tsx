"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { getUserInfo } from "@/api/services"; // <--- اضافه شدن سرویس

const menuItems = [
  { fa: "خانه", en: "Home", href: "/", icon: "⌂" },
  // { fa: "اخبار", en: "News", href: "/news", icon: "◈" },
  { fa: "مقالات", en: "Articles", href: "/articles", icon: "✦" },
  { fa: "تکنولوژی", en: "Technology", href: "/technology", icon: "⚙" },
  { fa: "درباره ما", en: "About Us", href: "/about", icon: "ⓘ" },
  { fa: "تماس با ما", en: "Contact", href: "/contact", icon: "✉" },
];

const quickSearches = {
  fa: ["Tesla", "BYD", "باتری", "شارژ سریع"],
  en: ["Tesla", "BYD", "Battery", "Fast charging"],
};

type Lang = "fa" | "en";

function SearchIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

function CloseIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  );
}

function UserIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" />
    </svg>
  );
}

function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  // Points to the "forward" side; flips automatically in RTL
  return (
    <svg
      className={`${className} rtl:-scale-x-100`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

/**
 * Two-option language switch with a sliding thumb.
 * The order is fixed (FA | EN) in both directions, so it never jumps around.
 */
function LanguageToggle({
  language,
  onChange,
  labels,
  className = "",
}: {
  language: Lang;
  onChange: (lang: Lang) => void;
  labels: [string, string];
  className?: string;
}) {
  const isEn = language === "en";

  return (
    <div
      dir="ltr"
      role="group"
      className={`relative grid grid-cols-2 rounded-full border border-white/10 bg-white/[0.03] p-1 ${className}`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-[#39f77b]/[0.14] shadow-[inset_0_0_0_1px_rgba(57,247,123,0.3)] transition-transform duration-300 ease-out motion-reduce:transition-none ${
          isEn ? "translate-x-full" : "translate-x-0"
        }`}
      />

      <button
        type="button"
        onClick={() => onChange("fa")}
        aria-label="زبان فارسی"
        aria-pressed={!isEn}
        className={`relative z-10 rounded-full px-3 py-1.5 text-xs font-bold transition-colors duration-200 ${
          !isEn ? "text-[#39f77b]" : "text-gray-500 hover:text-gray-200"
        }`}
      >
        {labels[0]}
      </button>

      <button
        type="button"
        onClick={() => onChange("en")}
        aria-label="English language"
        aria-pressed={isEn}
        className={`relative z-10 rounded-full px-3 py-1.5 text-xs font-bold transition-colors duration-200 ${
          isEn ? "text-[#39f77b]" : "text-gray-500 hover:text-gray-200"
        }`}
      >
        {labels[1]}
      </button>
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  // استیت ذخیره اطلاعات کاربر
  const [user, setUser] = useState<any>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const chargeRef = useRef<HTMLSpanElement>(null);

  const pathname = usePathname() ?? "";
  const router = useRouter();

  const { language, setLanguage } = useLanguage();
  const isFa = language === "fa";

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // بررسی وضعیت لاگین کاربر در زمان لود هدر
  useEffect(() => {
    getUserInfo()
      .then((res) => {
        setUser(res.data?.data || res.data);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  /* Scroll: glass gets denser, and the "charge" line fills with reading progress */
  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 8);

      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;

      if (chargeRef.current) {
        chargeRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  /* Close menus after navigation */
  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  /* Lock page scroll while the mobile menu is open */
  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* Keyboard: Esc closes, "/" or Ctrl/Cmd+K opens search (desktop) */
  useEffect(() => {
    const handleKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setSearchOpen(false);
        return;
      }

      const target = event.target as HTMLElement | null;
      const isTyping =
        !!target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      const wantsSearch =
        (event.key === "/" && !isTyping) ||
        ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k");

      if (wantsSearch && window.matchMedia("(min-width: 640px)").matches) {
        event.preventDefault();
        setOpen(false);
        setSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeys);

    return () => {
      window.removeEventListener("keydown", handleKeys);
    };
  }, []);

  /* Focus the search field once the panel is visible */
  useEffect(() => {
    if (!searchOpen) return;

    const timer = setTimeout(() => searchInputRef.current?.focus(), 60);

    return () => clearTimeout(timer);
  }, [searchOpen]);

  const handleSearch = () => {
    const value = query.trim();

    if (!value) return;

    setSearchOpen(false);
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(value)}`);
  };

  const handleLanguageChange = (lang: Lang) => {
    setLanguage(lang);
  };

  const overlayVisible = open || searchOpen;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pt-3 sm:pt-4">
        <div className="site-container">
          <div className="relative">

            {/* ───────── Floating bar ───────── */}
            <div
              className={`relative flex h-[60px] items-center justify-between gap-3 rounded-2xl border px-3 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 sm:h-[68px] sm:px-4 lg:grid lg:grid-cols-[1fr_auto_1fr] ${
                scrolled
                  ? "border-white/10 bg-[#08131d]/90 shadow-[0_14px_40px_-14px_rgba(0,0,0,0.75)]"
                  : "border-white/[0.07] bg-[#08131d]/55"
              }`}
            >
              {/* Charge line: fills as you scroll down the page */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-5 -bottom-px h-[2px] overflow-hidden rounded-full bg-white/[0.04]"
              >
                <span
                  ref={chargeRef}
                  className="block h-full w-full origin-left bg-gradient-to-r from-[#00c8ff] to-[#39f77b] shadow-[0_0_12px_rgba(57,247,123,0.8)] will-change-transform rtl:origin-right rtl:bg-gradient-to-l"
                  style={{ transform: "scaleX(0)" }}
                />
              </span>

              {/* Logo */}
              <Link
                href="/"
                aria-label="ElectroCar"
                className="group flex w-fit shrink-0 items-center gap-2.5 justify-self-start sm:gap-3"
              >
                <span className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-[#00c8ff]/10 to-[#39f77b]/10 transition-colors duration-300 group-hover:border-[#39f77b]/40 sm:h-11 sm:w-11">
                  <span className="absolute inset-0 rounded-xl bg-[#39f77b]/25 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />

                  <svg
                    viewBox="0 0 64 64"
                    className="relative h-6 w-6 sm:h-7 sm:w-7"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M42 7H18L8 25h19L17 57l35-37H33L42 7Z"
                      fill="url(#logoGradient)"
                    />

                    <defs>
                      <linearGradient
                        id="logoGradient"
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
                </span>

                <span className="text-xl font-extrabold tracking-tight sm:text-2xl">
                  <span className="text-white">Electro</span>
                  <span className="text-[#39f77b]">Car</span>
                </span>
              </Link>

              {/* Desktop navigation (centered) */}
              <nav
                aria-label={isFa ? "منوی اصلی" : "Main navigation"}
                className="hidden items-center gap-8 justify-self-center lg:flex xl:gap-10"
              >
                {menuItems.map((item) => {
                  const active = isActive(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`group relative whitespace-nowrap py-2 text-sm font-medium transition-colors duration-200 ${
                        active
                          ? "text-white"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {isFa ? item.fa : item.en}

                      {/* LED under the current page */}
                      <span
                        aria-hidden="true"
                        className={`absolute -bottom-1 left-1/2 h-[3px] -translate-x-1/2 rounded-full transition-all duration-300 ${
                          active
                            ? "w-5 bg-[#39f77b] shadow-[0_0_10px_#39f77b]"
                            : "w-0 bg-white/30 group-hover:w-2.5"
                        }`}
                      />
                    </Link>
                  );
                })}
              </nav>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 justify-self-end">

                <div className="hidden sm:block">
                  <LanguageToggle
                    language={language}
                    onChange={handleLanguageChange}
                    labels={["FA", "EN"]}
                    className="w-[84px]"
                  />
                </div>

                {/* Desktop search trigger (icon only; press "/" to open) */}
                <button
                  type="button"
                  onClick={() => setSearchOpen((value) => !value)}
                  aria-label={isFa ? "جستجو" : "Search"}
                  aria-expanded={searchOpen}
                  className={`hidden h-10 w-10 items-center justify-center rounded-full border transition-colors duration-200 sm:flex ${
                    searchOpen
                      ? "border-[#39f77b]/40 bg-[#39f77b]/10 text-[#39f77b]"
                      : "border-white/10 bg-white/[0.03] text-gray-400 hover:border-[#39f77b]/30 hover:text-white"
                  }`}
                >
                  <SearchIcon className="h-[18px] w-[18px]" />
                </button>

                {/* دکمه کاربری داینامیک دسکتاپ */}
                {user ? (
                  <Link
                    href="/profile"
                    className="hidden h-10 items-center gap-2 rounded-full border border-[#39f77b]/30 bg-[#39f77b]/10 px-4 text-sm font-bold text-[#39f77b] transition hover:bg-[#39f77b]/20 sm:flex"
                  >
                    <UserIcon className="h-[18px] w-[18px]" />
                    <span>{user.first_name || user.name || (isFa ? "پروفایل" : "Profile")}</span>
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="hidden h-10 items-center gap-2 rounded-full bg-[#39f77b] px-4 text-sm font-bold text-[#031008] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#39f77b] sm:flex"
                  >
                    <UserIcon className="h-[18px] w-[18px]" />
                    <span>{isFa ? "ورود" : "Login"}</span>
                  </Link>
                )}

                {/* Mobile menu button */}
                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(false);
                    setOpen((value) => !value);
                  }}
                  aria-label={
                    open
                      ? isFa ? "بستن منو" : "Close menu"
                      : isFa ? "باز کردن منو" : "Open menu"
                  }
                  aria-expanded={open}
                  className={`flex h-10 w-10 flex-col items-center justify-center gap-1 rounded-xl border transition-colors duration-200 lg:hidden ${
                    open
                      ? "border-[#39f77b]/40 bg-[#39f77b]/10 text-[#39f77b]"
                      : "border-white/10 bg-white/[0.03] text-gray-300 hover:border-[#39f77b]/30 hover:text-[#39f77b]"
                  }`}
                >
                  <span
                    className={`block h-0.5 w-5 rounded-full bg-current transition-transform duration-300 motion-reduce:transition-none ${
                      open ? "translate-y-[6px] rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-200 motion-reduce:transition-none ${
                      open ? "scale-x-0 opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-5 rounded-full bg-current transition-transform duration-300 motion-reduce:transition-none ${
                      open ? "-translate-y-[6px] -rotate-45" : ""
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* ───────── Desktop search panel ───────── */}
            <div
              className={`absolute inset-x-0 top-full z-10 mt-2 hidden rounded-2xl border border-white/10 bg-[#08131d]/95 p-4 shadow-2xl backdrop-blur-2xl transition-all duration-300 motion-reduce:transition-none sm:block ${
                searchOpen
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-2 opacity-0"
              }`}
            >
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSearch();
                }}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-1.5 transition-colors focus-within:border-[#39f77b]/40"
              >
                <SearchIcon className="ms-2.5 h-5 w-5 shrink-0 text-[#39f77b]" />

                <input
                  ref={searchInputRef}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={
                    isFa
                      ? "دنبال چه چیزی می‌گردید؟"
                      : "What are you looking for?"
                  }
                  className="min-w-0 flex-1 bg-transparent px-1 py-2.5 text-sm text-white outline-none placeholder:text-white/30"
                />

                <button
                  type="submit"
                  disabled={!query.trim()}
                  className="shrink-0 rounded-lg bg-[#39f77b] px-5 py-2.5 text-sm font-bold text-[#031008] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#39f77b] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {isFa ? "جستجو" : "Search"}
                </button>

                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  aria-label={isFa ? "بستن جستجو" : "Close search"}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-white/5 hover:text-white"
                >
                  <CloseIcon />
                </button>
              </form>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-xs text-white/35">
                  {isFa ? "جستجوهای پرتکرار:" : "Popular searches:"}
                </span>

                {quickSearches[language].map((term) => (
                  <Link
                    key={term}
                    href={`/search?q=${encodeURIComponent(term)}`}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-gray-300 transition hover:border-[#39f77b]/40 hover:text-[#39f77b]"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </div>

            {/* ───────── Mobile menu ───────── */}
            <div
              className={`absolute inset-x-0 top-full z-10 mt-2 overflow-hidden rounded-2xl border border-white/10 bg-[#08131d]/95 shadow-2xl backdrop-blur-2xl transition-all duration-300 motion-reduce:transition-none lg:hidden ${
                open
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-2 opacity-0"
              }`}
            >
              <div className="max-h-[calc(100vh-110px)] space-y-4 overflow-y-auto p-3">

                {/* Search */}
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    handleSearch();
                  }}
                  className="flex items-center rounded-xl border border-white/10 bg-white/[0.03] p-1 transition-colors focus-within:border-[#39f77b]/40"
                >
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={isFa ? "جستجو در سایت..." : "Search the site..."}
                    className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/30"
                  />

                  <button
                    type="submit"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#39f77b] text-[#031008]"
                    aria-label={isFa ? "جستجو" : "Search"}
                  >
                    <SearchIcon className="h-4 w-4" />
                  </button>
                </form>

                {/* Language */}
                <LanguageToggle
                  language={language}
                  onChange={handleLanguageChange}
                  labels={["فارسی", "English"]}
                  className="w-full"
                />

                {/* دکمه کاربری داینامیک موبایل */}
                {user ? (
                  <Link
                    href="/profile"
                    className="flex items-center justify-center gap-2 rounded-xl border border-[#39f77b]/30 bg-[#39f77b]/10 py-3 text-sm font-bold text-[#39f77b]"
                  >
                    <UserIcon className="h-[18px] w-[18px]" />
                    {user.first_name || user.name || (isFa ? "مشاهده پروفایل" : "View Profile")}
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#39f77b] py-3 text-sm font-bold text-[#031008] transition hover:brightness-110"
                  >
                    <UserIcon className="h-[18px] w-[18px]" />
                    {isFa ? "ورود / ثبت‌نام" : "Login / Register"}
                  </Link>
                )}

                {/* Links */}
                <nav
                  aria-label={isFa ? "منوی موبایل" : "Mobile navigation"}
                  className="space-y-1"
                >
                  {menuItems.map((item) => {
                    const active = isActive(item.href);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-200 ${
                          active
                            ? "bg-[#39f77b]/[0.1] text-[#39f77b]"
                            : "text-gray-300 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <span
                          className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm ${
                            active
                              ? "bg-[#39f77b]/15"
                              : "bg-white/5 text-[#39f77b]"
                          }`}
                        >
                          {item.icon}
                        </span>

                        <span className="flex-1 text-sm font-medium">
                          {isFa ? item.fa : item.en}
                        </span>

                        <ArrowIcon
                          className={`h-4 w-4 transition-opacity ${
                            active
                              ? "opacity-80"
                              : "opacity-30 group-hover:opacity-70"
                          }`}
                        />
                      </Link>
                    );
                  })}
                </nav>

                <p className="border-t border-white/5 pt-3 text-center text-xs text-white/30">
                  ElectroCar · {isFa ? "دنیای خودروهای برقی" : "The world of electric cars"}
                </p>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Backdrop for the mobile menu and the search panel */}
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/55 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none ${
          overlayVisible
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => {
          setOpen(false);
          setSearchOpen(false);
        }}
      />
    </>
  );
}
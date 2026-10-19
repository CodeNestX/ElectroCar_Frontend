"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import LoginDesktopEn from "@/components/login/LoginDesktopEn";
import LoginDesktopFa from "@/components/login/LoginDesktopFa";
import LoginMobileEn from "@/components/login/LoginMobileEn";
import LoginMobileFa from "@/components/login/LoginMobileFa";

// Picks one of the 4 layouts: (desktop | mobile) x (fa | en).
// The language comes from the site's language switch (LanguageContext),
// so the page opens in whatever language the visitor had chosen.
export default function LoginPage() {
  const { language } = useLanguage();
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(query.matches);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  // Until we know the screen size, show the plain dark background (no flash of the wrong layout)
  if (isDesktop === null) {
    return <div className="min-h-screen bg-[#050d12]" />;
  }

  if (isDesktop) {
    return language === "fa" ? <LoginDesktopFa /> : <LoginDesktopEn />;
  }

  return language === "fa" ? <LoginMobileFa /> : <LoginMobileEn />;
}

"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticlesPageFa from "./ArticlesPageFa";
import ArticlesPageEn from "./ArticlesPageEn";
import { useLanguage } from "@/context/LanguageContext";

export default function ArticlesView() {
  const { language } = useLanguage();

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-[#05070b] pt-24 pb-20">
        {language === "fa" ? <ArticlesPageFa /> : <ArticlesPageEn />}
      </main>

      <Footer />
    </>
  );
}
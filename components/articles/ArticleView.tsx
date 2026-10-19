"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import ArticleDetailFa from "@/components/articles/ArticleDetailFa";
import ArticleDetailEn from "@/components/articles/ArticleDetailEn";
import { useLanguage } from "@/context/LanguageContext";
import { Article } from "@/types/article";

export default function ArticleView({ id, article }: { id: number; article: Article }) {
  const { language } = useLanguage();
  const router = useRouter();
  
  const [isClientReady, setIsClientReady] = useState(false);
  const initialLang = useRef(language);

  // ۱. کنترل ریدایرکت هنگام تغییر زبان
  useEffect(() => {
    // این هوک فقط یک‌بار بعد از لود کامل و خوانده شدن زبان از لوکال استوریج اجرا می‌شود
    setIsClientReady(true);
    initialLang.current = language;
  }, []); // وابستگی خالی

  useEffect(() => {
    // اگر کلاینت آماده بود و کاربری به صورت دستی زبان را از هدر تغییر داد:
    if (isClientReady && initialLang.current !== language) {
      router.push("/"); // هدایت به صفحه اصلی
    }
  }, [language, isClientReady, router]);

  // ۲. مدیریت مقالات بازدید شده در لوکال استوریج
  useEffect(() => {
    if (!id) return;

    const savedIds = localStorage.getItem("visited_articles");
    const visitedList: number[] = savedIds ? JSON.parse(savedIds) : [];

    if (!visitedList.includes(id)) {
      visitedList.push(id);
      localStorage.setItem("visited_articles", JSON.stringify(visitedList));
    }
  }, [id]);

  // اگر کاربر زبان را تغییر داد، تا زمان انجام ریدایرکت، یک صفحه لودینگ ساده نشان می‌دهیم 
  // تا از رندر شدن محتوای درهم‌ریخته جلوگیری کنیم
  if (isClientReady && initialLang.current !== language) {
    return (
      <div className="min-h-screen bg-[#050b11] flex items-center justify-center text-[#39f77b] font-bold animate-pulse">
        {language === 'fa' ? 'در حال انتقال...' : 'Redirecting...'}
      </div>
    );
  }

  return (
    <>
      <Header />
      
      {/* رندر محتوای مقاله بر اساس زبانی که با آن وارد صفحه شده است */}
      {initialLang.current === 'fa' ? (
        <ArticleDetailFa article={article} />
      ) : (
        <ArticleDetailEn article={article} />
      )}
    </>
  );
}
"use client";

import { useEffect, useState } from "react";
import SectionTitle from "./SectionTitle";
import ArticleCard from "./articles/ArticleCard";
import ArticleCardEn from "@/components/articles/ArticleCardEn"; // در صورت وجود کامپوننت انگلیسی
import { useLanguage } from "@/context/LanguageContext";
import { getLatestArticles } from "@/api/services";

const ui = {
  fa: {
    title: "آخرین مقالات",
    description: "تازه‌ترین مقالات آموزشی و تخصصی درباره دنیای خودروهای برقی",
    link: "مشاهده همه مقالات",
    loading: "در حال دریافت مقالات...",
    empty: "مقاله‌ای یافت نشد.",
  },
  en: {
    title: "Latest Articles",
    description: "The latest educational and specialist articles about the world of electric cars",
    link: "View all articles",
    loading: "Loading articles...",
    empty: "No articles found.",
  },
};

export default function ArticlesSection() {
  const { language } = useLanguage();
  const t = ui[language];
  
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const res = await getLatestArticles();
        
        // بک‌اند در ریسپانس کلید data را برمی‌گرداند
        let fetchedData = res.data?.data || [];
        
        // چون بک‌اند در /articles/last فیلتر زبان ندارد، اینجا مقالات را بر اساس زبان فعلی کاربر فیلتر می‌کنیم
        fetchedData = fetchedData.filter((item: any) => item.language === language);
        
        setArticles(fetchedData);
      } catch (error) {
        console.error("Failed to fetch latest articles:", error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [language]);

  return (
    <section className="section-space">
      <div className="site-container">
        <SectionTitle
          title={t.title}
          description={t.description}
          linkText={t.link}
          linkHref="/articles"
        />

        {loading ? (
          <div className="py-10 text-center text-sm text-gray-500 font-medium">
            {t.loading}
          </div>
        ) : articles.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {articles.map((item) => (
              language === "fa" ? (
                <ArticleCard key={item.id} article={item} />
              ) : (
                <ArticleCardEn key={item.id} article={item} />
              )
            ))}
          </div>
        ) : (
          <div className="py-10 text-center text-sm text-gray-500">
            {t.empty}
          </div>
        )}
      </div>
    </section>
  );
}
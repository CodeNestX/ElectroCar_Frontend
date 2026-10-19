"use client";

import { useEffect, useState } from "react";
import ArticleCard from "@/components/articles/ArticleCard";
import { useLanguage } from "@/context/LanguageContext";
import { getCategoryByLanguage, getArticlesByCategoryTranslationId } from "@/api/services";
import { Article } from "@/types/article"; // اضافه شدن اینترفیس مقالات

// تعریف ساختار دسته‌بندی برای جلوگیری از استفاده از any
interface Category {
  id: number;
  category_id?: number;
  name: string;
}

export default function ArticlesPageFa() {
  const { language, dir } = useLanguage();
  const [categories, setCategories] = useState<Category[]>([]);
  const [articles, setArticles] = useState<Article[]>([]); // استفاده از Article[] به جای any[]
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  // ۱. گرفتن دسته‌بندی‌ها بر اساس زبان
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategoryByLanguage(language);
        const catData = res.data.data;
        const fetchedCategories = Array.isArray(catData) ? catData : [];

        setCategories(fetchedCategories);

        if (fetchedCategories.length > 0) {
          setActiveCategory(fetchedCategories[0]);
        }
      } catch (error: any) {
        console.error("خطا در دریافت دسته‌بندی‌ها:", error.message);
      }
    };

    fetchCategories();
  }, [language]);

  // ۲. گرفتن مقالات بر اساس دسته‌بندی انتخاب‌شده
  useEffect(() => {
    const fetchArticlesByCategory = async () => {
      if (!activeCategory) return;

      try {
        setLoading(true);
        // ارسال شناسه یا category_id به بک‌اند
        const categoryId = activeCategory.id;
        const res = await getArticlesByCategoryTranslationId(categoryId);
        const artData = res.data.data || res.data;
        
        setArticles(Array.isArray(artData) ? artData : []);
      } catch (error: any) {
        console.error("خطا در دریافت مقالات دسته‌بندی:", error.message);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticlesByCategory();
  }, [activeCategory]);

  return (
    <main dir={dir} className="mx-auto min-h-[70vh] max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <span className="mb-3 inline-block text-sm font-semibold text-green-400">
          دانشنامه ElectroCar
        </span>
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          مقالات خودروهای برقی
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-8 text-gray-400 sm:text-base">
          راهنماها، آموزش‌ها و مطالب تخصصی درباره فناوری خودروهای الکتریکی
        </p>
      </div>

      <div className="mb-8 flex flex-wrap justify-center gap-3">
        {categories.map((category) => {
          const catId = category.category_id || category.id;
          const activeId = activeCategory?.category_id || activeCategory?.id;
          const isActive = activeId === catId;

          return (
            <button
              key={catId}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-5 py-2.5 text-sm transition-all duration-200 ${
                isActive
                  ? "border-green-400 bg-green-400 text-[#050b11] font-bold shadow-lg shadow-cyan-400/20"
                  : "border-white/10 bg-white/3 text-gray-300 hover:border-green-400/60 hover:text-green-300"
              }`}
            >
              {category.name}
            </button>
          );
        })}
      </div>

      <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
        <h2 className="text-lg font-bold">
          {activeCategory?.name || "مقالات"}
        </h2>
        <span className="text-sm text-gray-400">
          {articles.length} مقاله
        </span>
      </div>

      {loading ? (
        <div className="py-20 text-center text-gray-400">
          در حال بارگذاری اطلاعات از سرور...
        </div>
      ) : articles.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/3 py-16 text-center">
          <p className="text-gray-300">
            مقاله‌ای در این دسته‌بندی وجود ندارد.
          </p>
        </div>
      )}
    </main>
  );
}
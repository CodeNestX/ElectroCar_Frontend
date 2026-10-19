"use client";

import { useState, useEffect } from "react";
import { searchArticles } from "@/api/services";
import ArticleCard from "./articles/ArticleCard";
import ArticleCardEn from "@/components/articles/ArticleCardEn"; // در صورت وجود
import { useLanguage } from "@/context/LanguageContext";

const ui = {
  fa: {
    placeholder: "جستجو در مقالات...",
    button: "بگرد",
    searching: "در حال جستجو...",
    notFound: "مقاله‌ای با این کلمه یافت نشد.",
    error: "خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید.",
  },
  en: {
    placeholder: "Search articles...",
    button: "Search",
    searching: "Searching...",
    notFound: "No articles found with this keyword.",
    error: "Server connection error. Please try again later.",
  }
};

export default function SearchContent({ query }: { query?: string }) {
  const { language } = useLanguage();
  const t = ui[language];

  // مقدار اولیه از پراپ URL گرفته می‌شود
  const [searchQuery, setSearchQuery] = useState(query || "");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

  const performSearch = async (term: string) => {
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);
      setSearchError("");
      
      const res = await searchArticles(term);
      let fetchedData = res.data?.data || [];
      
      // فیلتر کردن نتایج بر اساس زبان فعلی کاربر
      fetchedData = fetchedData.filter((item: any) => item.language === language);
      
      if (fetchedData.length === 0) {
        setSearchError(t.notFound);
      }
      
      setSearchResults(fetchedData);
      
    } catch (error: any) {
      console.error("Search failed:", error);
      if (error.response?.status === 404) {
        setSearchError(t.notFound);
      } else {
        setSearchError(t.error);
      }
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // اگر کاربر از طریق URL (مثل هدر) جستجو کرد، به صورت خودکار کوئری اجرا شود
  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query, language]); // با تغییر زبان هم نتایج آپدیت می‌شوند

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 pt-24 min-h-screen">
      <form onSubmit={handleSearch} className="relative flex items-center mb-8">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.placeholder}
          className={`w-full p-4 rounded-xl border border-gray-800 bg-[#0b1722] text-white focus:outline-none focus:ring-2 focus:ring-[#39f77b] ${
            language === 'fa' ? 'pl-24 pr-4' : 'pr-24 pl-4'
          }`}
        />
        <button
          type="submit"
          disabled={isSearching}
          className={`absolute px-6 py-2 bg-[#39f77b] text-black font-bold rounded-lg hover:bg-[#2de26d] transition disabled:opacity-50 ${
            language === 'fa' ? 'left-2' : 'right-2'
          }`}
        >
          {isSearching ? t.searching : t.button}
        </button>
      </form>

      {searchError && (
        <div className="text-center text-red-400 py-10 font-medium bg-red-900/10 rounded-xl border border-red-900/30">
          {searchError}
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {searchResults.map((article) => (
            language === 'fa' ? (
              <ArticleCard key={article.id} article={article} />
            ) : (
              <ArticleCardEn key={article.id} article={article} />
            )
          ))}
        </div>
      )}
    </div>
  );
}
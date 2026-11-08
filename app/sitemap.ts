import type { MetadataRoute } from "next";
import { getArticlesSitemap } from "@/api/services";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://voltinou.ir";

  // ۱. تعریف صفحات ثابت و معتبر سایت (Static Routes)
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/technology`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // ۲. دریافت تمام مقالات منتشر شده از اندپوینت اختصاصی سایت‌مپ
  let dynamicArticles: MetadataRoute.Sitemap = [];
  
  try {
    const res = await getArticlesSitemap(); 
    const articles = res.data?.data || [];

    // تبدیل مقالات به فرمت استاندارد نقشه سایت
    dynamicArticles = articles.map((article: any) => ({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: new Date(article.updated_at || article.created_at || new Date()),
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch (error) {
    console.error("خطا در دریافت مقالات برای تولید نقشه سایت:", error);
  }

  // ۳. ترکیب صفحات ثابت و مقالات داینامیک
  return [...staticRoutes, ...dynamicArticles];
}

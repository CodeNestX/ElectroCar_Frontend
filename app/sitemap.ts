import type { MetadataRoute } from "next";
import { getLatestArticles } from "@/api/services"; // یا هر تابعی که همه مقالات را برمی‌گرداند

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://electrocar.ir";

  // ۱. تعریف صفحات ثابت سایت (Static Routes)
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cars`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/charging`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
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

  // ۲. دریافت مقالات از بک‌اند به صورت داینامیک
  let dynamicArticles: MetadataRoute.Sitemap = [];
  
  try {
    // در اینجا از تابعی استفاده کنید که لیست مقالات را از بک‌اند می‌آورد
    // اگر تابعی مثل getAllArticles دارید، بهتر است از آن استفاده کنید
    const res = await getLatestArticles(); 
    const articles = res.data?.data || [];

    // تبدیل مقالات به فرمت استاندارد نقشه سایت
    dynamicArticles = articles.map((article: any) => ({
      url: `${baseUrl}/articles/${article.slug}`,
      // اگر در دیتابیس تاریخ آپدیت (updated_at) دارید، آن را در اولویت قرار دهید
      lastModified: new Date(article.updated_at || article.created_at || new Date()),
      changeFrequency: "weekly",
      priority: 0.8, // اولویت مقالات معمولاً 0.7 یا 0.8 در نظر گرفته می‌شود
    }));
  } catch (error) {
    console.error("خطا در دریافت مقالات برای تولید نقشه سایت:", error);
    // در صورت خطا، سایت کرش نمی‌کند و فقط صفحات استاتیک در سایت‌مپ قرار می‌گیرند
  }

  // ۳. ترکیب صفحات ثابت و مقالات داینامیک و ارسال به عنوان خروجی نهایی
  return [...staticRoutes, ...dynamicArticles];
}
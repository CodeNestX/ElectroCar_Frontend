import { Article } from "@/types/article";

interface ArticleCardEnProps {
  article: Article;
}

export default function ArticleCardEn({ article }: ArticleCardEnProps) {
  // تبدیل تاریخ دیتابیس به فرمت استاندارد میلادی (مثلاً: October 18, 2026)
  const formattedDate = article.created_at
    ? new Date(article.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <article dir="ltr" className="ev-card group overflow-hidden rounded-2xl text-left">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={article.cover_url}
          alt={article.alt_text || article.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-t from-[#07121c] via-transparent to-transparent" />

      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-3 flex items-center gap-2 text-[11px] text-gray-500">
          <span>{formattedDate}</span>
          <span>•</span>
          <span>{article.reading_time_minutes} min read</span>
        </div>

        <h2 className="line-clamp-2 text-base font-bold leading-7 text-white transition group-hover:text-[#39f77b]">
          {article.title}
        </h2>

        <p className="mt-3 line-clamp-3 text-xs leading-6 text-gray-500">
          {article.excerpt}
        </p>

        <a
          href={`/articles/${article.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#39f77b]"
        >
          Read article
          <span>→</span>
        </a>
      </div>
    </article>
  );
}
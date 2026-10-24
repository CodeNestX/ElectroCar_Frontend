import { Article } from "@/types/article";

interface ArticleCardEnProps {
  // view_count comes from the backend (the number of recorded views of the article)
  article: Article & { view_count?: number | string | null };
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

  const viewCount = Number(article.view_count);
  const hasViews = article.view_count != null && Number.isFinite(viewCount);

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
        <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-gray-500">
          <span>{formattedDate}</span>
          <span>•</span>
          <span>{article.reading_time_minutes} min read</span>

          {hasViews && (
            <>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
              <circle cx="12" cy="12" r="2.8" />
            </svg>
                {viewCount.toLocaleString("en-US")} {viewCount === 1 ? "view" : "views"}
              </span>
            </>
          )}
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
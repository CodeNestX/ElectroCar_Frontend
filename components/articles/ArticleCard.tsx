import { formatToShamsi } from "@/api/converDate";
import { Article } from "@/types/article";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({
  article,
}: ArticleCardProps) {
  return (
    <article dir="rtl" className="ev-card group overflow-hidden rounded-2xl">

      {/* Image */}
      <div className="relative h-56 overflow-hidden">

        <img
          src={article.cover_url}
          alt={article.alt_text}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-t from-[#07121c] via-transparent to-transparent" />

      </div>

      {/* Content */}
      <div className="p-5">

        <div className="mb-3 flex items-center gap-2 text-[11px] text-gray-500">
          <span>{formatToShamsi(article.created_at?.split("T")[0])}</span>
          <span>•</span>
          <span>{article.reading_time_minutes} دقیقه مطالعه</span>
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
          مطالعه مقاله
          <span>←</span>
        </a>

      </div>

    </article>
  );
}
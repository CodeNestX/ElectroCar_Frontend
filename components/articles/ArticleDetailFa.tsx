"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getArticleBlocksBySlug,
  getArticleComments,
  recordArticleView,
  createComment,
} from "@/api/services";
import { Article } from "@/types/article";

interface ArticleDetailFaProps {
  article: Article;
}

const AUTO_MS = 10000; // تنظیم زمان چرخش خودکار روی ۱۰ ثانیه

export default function ArticleDetailFa({ article }: ArticleDetailFaProps) {
  const [blocks, setBlocks] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  // استیت‌های اسلایدر کامنت‌ها
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!article?.id || !article?.slug) return;

    // ۱. ثبت بازدید به صورت بک‌گراند
    recordArticleView(article.id).catch(console.error);

    // ۲. دریافت بلوک‌های محتوایی
    getArticleBlocksBySlug(article.slug)
      .then((res) => setBlocks(res.data?.data || []))
      .catch(console.error);

    // ۳. دریافت کامنت‌های تایید شده این مقاله
    getArticleComments(article.id)
      .then((res) => setComments(res.data?.data || []))
      .catch(console.error);

  }, [article?.id, article?.slug]);

  const total = comments.length;
  const current = comments[Math.min(currentIndex, total - 1)];

  const go = useCallback(
    (next: number) => setCurrentIndex(((next % total) + total) % total),
    [total]
  );

  // چرخش خودکار کامنت‌ها هر ۱۰ ثانیه (با قابلیت مکث با هاور ماوس)
  useEffect(() => {
    if (paused || total < 2) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % total);
    }, AUTO_MS);
    return () => clearInterval(timer);
  }, [paused, total]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setIsSubmittingComment(true);
      await createComment(article.id, newComment);
      setNewComment("");
      alert("نظر شما با موفقیت ثبت شد و پس از تایید مدیریت نمایش داده خواهد شد.");
    } catch (error: any) {
      console.error("خطا در ثبت کامنت:", error);
      alert(error.response?.data?.message || "برای ثبت نظر باید وارد حساب کاربری خود شوید.");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  if (!article) return null;

  return (
    <article className="max-w-4xl mx-auto p-4 md:p-6 mt-32" dir="rtl">
      {/* هدر مقاله */}
      <header className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
        {article.cover_url && (
          <img
            src={article.cover_url}
            alt={article.alt_text || article.title}
            className="w-full rounded-2xl object-cover shadow-sm"
          />
        )}
      </header>

      {/* محتوای مقاله (رندر بلوک‌ها) */}
      <section className="prose prose-lg max-w-none mb-16 mx-auto text-right">
        {blocks.length > 0 ? (
          blocks.map((block) => {
            const isAparat = block.media_url?.includes('aparat.com');

            return (
              <div key={block.id} className="my-6">
                {block.text_content && (
                  <div dangerouslySetInnerHTML={{ __html: block.text_content }} />
                )}

                {block.media_url && block.media_type === 'image' && (
                  <img src={block.media_url} alt={block.alt_text} className="w-full rounded-lg my-4" />
                )}

                {block.media_url && block.media_type === 'video' && (
                  isAparat ? (
                    <div className="relative w-full rounded-xl overflow-hidden my-6" style={{ paddingTop: '56.25%' }}>
                      <iframe
                        src={block.media_url}
                        allowFullScreen
                        className="absolute top-0 left-0 w-full h-full border-0"
                      ></iframe>
                    </div>
                  ) : (
                    <video src={block.media_url} controls className="w-full rounded-xl my-6" />
                  )
                )}
              </div>
            );
          })
        ) : (
          <p>{article.excerpt}</p>
        )}
      </section>

      {/* بخش دیدگاه‌ها و اسلایدر */}
      <section className="mt-16 border-t border-slate-800 pt-10 text-right">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-8 w-3 rounded-full bg-emerald-500" />
          <h3 className="text-2xl font-bold text-white">
            دیدگاه‌ها{" "}
            <span className="text-lg font-normal text-emerald-400">({total})</span>
          </h3>
        </div>
        {/* فرم ارسال دیدگاه جدید */}
        <form
          onSubmit={handleCommentSubmit}
          className="space-y-5 mb-12 rounded-3xl border border-slate-800/80 bg-slate-900/80 p-6 backdrop-blur-sm sm:p-8"
        >
          <h4 className="text-lg font-semibold text-slate-100">ثبت دیدگاه جدید</h4>

          <div>
            <label className="mb-2 block text-xs font-medium text-slate-400">متن دیدگاه</label>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={4}
              placeholder="دیدگاه خود را در مورد این مقاله بنویسید..."
              className="w-full resize-none rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition-all duration-200 placeholder:text-slate-600 focus:border-emerald-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmittingComment}
            className="rounded-2xl bg-emerald-500 px-8 py-3 text-sm font-bold text-slate-950 transition-all duration-200 hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95 disabled:opacity-50"
          >
            {isSubmittingComment ? "در حال ثبت..." : "ارسال دیدگاه"}
          </button>
        </form>

        {/* کاروسل (اسلایدر) کامنت‌ها */}
        {total > 0 ? (
          <div
            className="relative "
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <div className="pointer-events-none absolute -inset-4 rounded-[2.5rem] bg-emerald-500/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-950/90 p-7 shadow-2xl sm:p-10">
              {/* علامت نقل قول بزرگ */}
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="absolute end-6 top-6 h-14 w-14 text-emerald-400/15 sm:h-20 sm:w-20"
                fill="currentColor"
              >
                <path d="M9.6 5C6.5 6.3 4 9 4 13v6h6v-6H7c0-2 1.1-3.6 2.9-4.5L9.6 5Zm10 0c-3.1 1.3-5.6 4-5.6 8v6h6v-6h-3c0-2 1.1-3.6 2.9-4.5L19.6 5Z" />
              </svg>

              {current && (
                <div key={current.id || currentIndex} className="comment-slide relative min-h-[140px]">
                  <div className=" flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-400/10 text-lg font-bold text-emerald-300">
                      {current.user_name ? current.user_name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div>
                      <div className="font-bold text-white">{current.user_name || "کاربر مهمان"}</div>
                      <div className="text-xs text-slate-500">دیدگاه کاربران</div>
                    </div>
                  </div>

                  <p className="max-w-3xl mt-8 text-base leading-9 text-slate-200 sm:text-lg">
                    {current.content}
                  </p>
                </div>
              )}

              {/* کنترل‌ها (دکمه‌های قبلی/بعدی و دکمه‌های دایره‌ای شماره‌دار پایین) */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800/80 pt-6">
                {/* دکمه قبلی */}
                <button
                  type="button"
                  onClick={() => go(currentIndex - 1)}
                  className="flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-2 text-xs font-medium text-slate-300 transition-all hover:border-emerald-500/50 hover:bg-slate-900 hover:text-white order-2 sm:order-1"
                >
                  <span>→</span> قبلی
                </button>

                {/* دکمه‌های دایره‌ای شماره‌دار پایین */}
                <div className="flex flex-wrap items-center justify-center gap-2 max-w-[80%] overflow-x-auto py-1 order-1 sm:order-2" role="tablist" aria-label="دیدگاه‌ها">
                  {comments.map((c, i) => (
                    <button
                      key={c.id || i}
                      type="button"
                      role="tab"
                      aria-selected={i === currentIndex}
                      aria-label={`دیدگاه ${i + 1}`}
                      onClick={() => go(i)}
                      className={`flex h-3.5 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${i === currentIndex
                        ? "w-8 bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-400/25"
                        : "w-3.5 bg-slate-700 hover:bg-slate-600 text-transparent"
                        }`}
                    />
                  ))}
                </div>

                {/* دکمه بعدی */}
                <button
                  type="button"
                  onClick={() => go(currentIndex + 1)}
                  className="flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-2 text-xs font-medium text-slate-300 transition-all hover:border-emerald-500/50 hover:bg-slate-900 hover:text-white order-3 sm:order-3"
                >
                  بعدی <span>←</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl mb-12">
            <p className="text-slate-400 text-sm">هنوز نظری برای این مقاله ثبت نشده است.</p>
            <p className="text-slate-600 text-xs mt-1">اولین نفری باشید که دیدگاه خود را می‌نویسد!</p>
          </div>
        )}

      </section>

      <style>{`
        .comment-slide { animation: commentIn .5s ease both; }
        @keyframes commentIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) { .comment-slide { animation: none; } }
      `}</style>
    </article>
  );
}
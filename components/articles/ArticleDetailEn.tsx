"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  getArticleBlocksBySlug,
  getArticleComments,
  recordArticleView,
  createComment,
} from "@/api/services";
import { Article } from "@/types/article"; 

interface ArticleDetailEnProps {
  article: Article; 
}

type CommentDialogState = { type: "success" | "error"; message: string } | null;

// پنجره اعلان هماهنگ با تم سایت (جایگزین alert مرورگر) — فقط ظاهر، بدون ارتباط با بک‌اند
function CommentDialog({
  dialog,
  onClose,
}: {
  dialog: CommentDialogState;
  onClose: () => void;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!dialog) return;

    buttonRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dialog, onClose]);

  if (!dialog) return null;

  const ok = dialog.type === "success";

  return (
    <div
      dir="ltr"
      className="fixed inset-0 z-200 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="comment-dialog-title"
        onClick={(e) => e.stopPropagation()}
        className="comment-dialog relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-slate-900 to-slate-950 p-7 text-center shadow-2xl"
      >
        <div
          className={`pointer-events-none absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full blur-3xl ${
            ok ? "bg-emerald-500/20" : "bg-red-500/20"
          }`}
        />

        <div
          className={`relative mx-auto flex h-16 w-16 items-center justify-center rounded-full border ${
            ok
              ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
              : "border-red-400/40 bg-red-400/10 text-red-300"
          }`}
        >
          {ok ? (
            <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 7v6M12 17h.01" />
            </svg>
          )}
        </div>

        <h4 id="comment-dialog-title" className="relative mt-5 text-lg font-bold text-white">
          {ok ? "Comment submitted" : "Could not submit comment"}
        </h4>

        <p className="relative mt-3 text-sm leading-7 text-slate-400">{dialog.message}</p>

        <button
          ref={buttonRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className={`relative mt-7 w-full rounded-2xl px-6 py-3 text-sm font-bold transition-all duration-200 active:scale-95 ${
            ok
              ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20"
              : "bg-slate-800 text-white hover:bg-slate-700"
          }`}
        >
          Got it
        </button>
      </div>

      <style>{`
        .comment-dialog { animation: commentDialogIn .25s ease both; }
        @keyframes commentDialogIn { from { opacity: 0; transform: translateY(12px) scale(.97); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) { .comment-dialog { animation: none; } }
      `}</style>
    </div>
  );
}

export default function ArticleDetailEn({ article }: ArticleDetailEnProps) {
  const [blocks, setBlocks] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [dialog, setDialog] = useState<CommentDialogState>(null);
  const closeDialog = useCallback(() => setDialog(null), []);
  const contentSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!contentSectionRef.current || !article?.id) return;
    const links = contentSectionRef.current.querySelectorAll<HTMLAnchorElement>('a[href*="/contact"]');
    links.forEach((link) => {
      const rawHref = link.getAttribute("href") || "";
      try {
        const url = new URL(rawHref, window.location.origin);
        if (url.pathname === "/contact") {
          if (!url.searchParams.has("article_id")) {
            url.searchParams.set("article_id", String(article.id));
          }
          if (!url.searchParams.has("source_type")) {
            url.searchParams.set("source_type", "article");
          }
          link.setAttribute("href", `${url.pathname}${url.search}`);
        }
      } catch {}
    });
  }, [article?.id, blocks]);

  useEffect(() => {
    // جلوگیری از کرش کردن صفحه قبل از دریافت کامل دیتا
    if (!article?.id || !article?.slug) return;

    // ۱. ثبت بازدید
    recordArticleView(article.id).catch(console.error);

    // ۲. دریافت بلوک‌های محتوایی مقاله
    getArticleBlocksBySlug(article.slug)
      .then((res) => setBlocks(res.data?.data || []))
      .catch(console.error);

    // ۳. دریافت کامنت‌های تایید شده
    getArticleComments(article.id)
      .then((res) => setComments(res.data?.data || []))
      .catch(console.error);
      
  }, [article?.id, article?.slug]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setIsSubmittingComment(true);
      await createComment(article.id, newComment);
      setNewComment("");
      setDialog({ type: "success", message: "Your comment was submitted successfully and will be displayed after approval." });
    } catch (error: any) {
      console.error("Error submitting comment:", error);
      setDialog({ type: "error", message: error.response?.data?.message || "Please log in to submit a comment." });
    } finally {
      setIsSubmittingComment(false);
    }
  };

  if (!article) return null;

  return (
    <article dir="ltr" className="max-w-4xl mx-auto p-4 md:p-6 mt-8 text-left">
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">{article.title}</h1>
        {article.cover_url && (
          <img
            src={article.cover_url}
            alt={article.alt_text || article.title}
            className="w-full rounded-2xl object-cover shadow-sm"
          />
        )}
      </header>

      {/* Summary / Lead */}
      {article.excerpt && (
        <div className="mb-10 rounded-2xl border-l-4 border-[#39f77b] bg-[#0b1722]/80 p-5 md:p-6 text-gray-200 leading-relaxed text-base md:text-lg shadow-sm border border-white/5">
          <p className="font-bold text-[#39f77b] text-sm mb-2 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#39f77b]"></span>
            Summary
          </p>
          <p className="leading-8 text-gray-200">{article.excerpt}</p>
        </div>
      )}

      {/* Article Blocks */}
      <section ref={contentSectionRef} className="prose prose-lg max-w-none mb-16 mx-auto prose-invert">
        {blocks.map((block) => {
          // بررسی تعلق لینک به سایت آپارات
          const isAparat = block.media_url?.includes('aparat.com');

          return (
            <div key={block.id} className="my-6 text-gray-300">
              {block.text_content && (
                <div dangerouslySetInnerHTML={{ __html: block.text_content }} />
              )}
              
              {block.media_url && block.media_type === 'image' && (
                <img src={block.media_url} alt={block.alt_text} className="w-full rounded-lg my-4" />
              )}
              
              {block.media_url && block.media_type === 'video' && (
                isAparat ? (
                  // نمایش پخش‌کننده آپارات به صورت رسپانسیو (نسبت 16:9)
                  <div className="relative w-full rounded-xl overflow-hidden my-6" style={{ paddingTop: '56.25%' }}>
                    <iframe
                      src={block.media_url}
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full border-0"
                    ></iframe>
                  </div>
                ) : (
                  // نمایش فایل‌های ویدئویی معمولی (مثل mp4)
                  <video src={block.media_url} controls className="w-full rounded-xl my-6" />
                )
              )}
            </div>
          );
        })}
      </section>

      {/* Consultation & Contact CTA Card */}
      <div className="my-10 rounded-2xl border border-emerald-500/20 bg-linear-to-r from-emerald-950/20 via-slate-900/80 to-slate-900/80 p-5 backdrop-blur-sm sm:flex sm:items-center sm:justify-between gap-4">
        <div className="mb-3 sm:mb-0">
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Request Consultation or Inquire About This Topic
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Need more information or professional guidance regarding this article or vehicle? Contact our specialists.
          </p>
        </div>
        <a
          href={`/contact?article_id=${article.id}&source_type=article`}
          className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-emerald-400 active:scale-95 shadow-md shadow-emerald-500/20"
        >
          Contact Us
          <span>→</span>
        </a>
      </div>

      {/* Comments Section */}
      <section className="border-t border-gray-800 pt-10 mt-10">
        <h2 className="text-2xl font-bold mb-6 text-white">Comments ({comments.length})</h2>

        <form onSubmit={handleCommentSubmit} className="mb-10">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment here..."
            rows={4}
            className="w-full p-4 border border-gray-700 bg-gray-900 text-white rounded-xl focus:ring-2 focus:ring-green-500 mb-4 outline-none"
          />
          <button
            type="submit"
            disabled={isSubmittingComment}
            className="px-8 py-3 bg-green-500 text-black font-bold rounded-lg hover:bg-green-400 transition disabled:opacity-50"
          >
            {isSubmittingComment ? "Submitting..." : "Submit Comment"}
          </button>
        </form>

        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="p-4 bg-gray-900 border border-gray-800 rounded-xl">
              <div className="font-bold text-white mb-2">{comment.user_name || "User"}</div>
              <div className="text-gray-400">{comment.content}</div>
            </div>
          ))}
          {comments.length === 0 && (
            <div className="text-gray-500 text-center py-4">Be the first to leave a comment!</div>
          )}
        </div>
      </section>

      <CommentDialog dialog={dialog} onClose={closeDialog} />
    </article>
  );
}
"use client";

import { useEffect, useState } from "react";
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

export default function ArticleDetailFa({ article }: ArticleDetailFaProps) {
  const [blocks, setBlocks] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  useEffect(() => {
    // علامت سوال‌ها باعث میشن اگه مقاله هنوز لود نشده بود، ریکت کرش نکنه
    if (!article?.id || !article?.slug) return;

    // ۱. ثبت بازدید به صورت بک‌گراند
    recordArticleView(article.id).catch(console.error);

    // ۲. دریافت بلوک‌های محتوایی (متن و عکس‌های داخل مقاله)
    getArticleBlocksBySlug(article.slug)
      .then((res) => setBlocks(res.data?.data || []))
      .catch(console.error);

    // ۳. دریافت کامنت‌های تایید شده این مقاله
    getArticleComments(article.id)
      .then((res) => setComments(res.data?.data || []))
      .catch(console.error);
      
  }, [article?.id, article?.slug]); // <--- ارور ۵۰۰ دقیقاً اینجا حل شد

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

  // اگر دیتا خالی بود چیزی رندر نکن تا صفحه نشکنه
  if (!article) return null;

  return (
    <article className="max-w-4xl mx-auto p-4 md:p-6 mt-32">
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
      <section className="prose prose-lg max-w-none mb-16 mx-auto">
        {blocks.length > 0 ? (
          blocks.map((block) => {
            // بررسی می‌کنیم که آیا لینک ویدئو متعلق به آپارات است یا خیر
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
                    // نمایش ویدئوی آپارات از طریق iframe (با نسبت تصویر استاندارد 16:9)
                    <div className="relative w-full rounded-xl overflow-hidden my-6" style={{ paddingTop: '56.25%' }}>
                      <iframe
                        src={block.media_url}
                        allowFullScreen
                        className="absolute top-0 left-0 w-full h-full border-0"
                      ></iframe>
                    </div>
                  ) : (
                    // نمایش ویدئوهای معمولی (فایل mp4)
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

      {/* بخش کامنت‌ها */}
      <section className="border-t pt-10 mt-10">
        <h2 className="text-2xl font-bold mb-6">نظرات ({comments.length})</h2>

        <form onSubmit={handleCommentSubmit} className="mb-10">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="دیدگاه خود را بنویسید..."
            rows={4}
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 mb-4 outline-none"
          />
          <button
            type="submit"
            disabled={isSubmittingComment}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isSubmittingComment ? "در حال ثبت..." : "ارسال نظر"}
          </button>
        </form>

        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="p-4 bg-gray-50 border border-gray-100 rounded-xl">
              <div className="font-bold text-gray-800 mb-2">{comment.user_name}</div>
              <div className="text-gray-600">{comment.content}</div>
            </div>
          ))}
          {comments.length === 0 && (
            <div className="text-gray-500 text-center py-4">اولین نفری باشید که نظر می‌دهد!</div>
          )}
        </div>
      </section>
    </article>
  );
}
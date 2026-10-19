"use client";

import { useEffect, useState } from "react";
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

export default function ArticleDetailEn({ article }: ArticleDetailEnProps) {
  const [blocks, setBlocks] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

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
      alert("Your comment was submitted successfully and will be displayed after approval.");
    } catch (error: any) {
      console.error("Error submitting comment:", error);
      alert(error.response?.data?.message || "Please log in to submit a comment.");
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

      {/* Article Blocks */}
      <section className="prose prose-lg max-w-none mb-16 mx-auto prose-invert">
        {blocks.length > 0 ? (
          blocks.map((block) => {
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
          })
        ) : (
          <p className="text-gray-400">{article.excerpt}</p>
        )}
      </section>

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
    </article>
  );
}
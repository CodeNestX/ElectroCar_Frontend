import { apiClient } from "./apiClient";

// ================================
// Categories
// ================================

// دریافت دسته‌بندی‌ها بر اساس زبان
export const getCategoryByLanguage = async (language: string = "fa") => {
  return await apiClient.get(`/categories/language?lang=${language}`);
};

// ================================
// Articles
// ================================

// دریافت جدیدترین مقالات (مخصوص صفحه اصلی)
export const getLatestArticles = async () => {
  return await apiClient.get(`/articles/last`);
};

// دریافت تمام مقالات یک زبان خاص
export const getArticlesByLanguage = async (language: string = "fa") => {
  return await apiClient.get(`/articles/language?lang=${language}`);
};

// دریافت مقالات بر اساس شناسه ترجمه دسته‌بندی
export const getArticlesByCategoryTranslationId = async (categoryTranslationId: number | string) => {
  return await apiClient.get(`/articles/category_translation/${categoryTranslationId}`);
};

// دریافت مقاله تکی بر اساس اسلاگ
export const getArticleBySlug = async (slug: string) => {
  return await apiClient.get(`/articles/slug/${slug}`);
};

// دریافت بلوک‌های محتوایی مقاله با اسلاگ
export const getArticleBlocksBySlug = async (slug: string) => {
  return await apiClient.get(`/articles/${slug}/blocks/slug`);
};

// جستجوی مقالات
export const searchArticles = async (prompt: string) => {
  return await apiClient.post(`/articles/search`, { prompt }); // طبق کد شما در روت GET تعریف شده اما در کنترلر از req.body می‌خواند. اگر GET است باید به صورت Query بفرستید. فرض را بر POST گذاشتم.
};

// ثبت بازدید مقاله
export const recordArticleView = async (articleId: number | string) => {
  return await apiClient.post(`/articles/view`, { article_id: articleId });
};

// ================================
// Comments
// ================================

// دریافت کامنت‌های تایید شده یک مقاله
export const getArticleComments = async (articleId: number | string) => {
  return await apiClient.get(`/articles/${articleId}/comments`);
};

// ثبت کامنت جدید
export const createComment = async (articleId: number, content: string, parentId?: number) => {
  return await apiClient.post(`/comments`, { article_id: articleId, content, parent_id: parentId });
};

// ================================
// Users
// ================================

// دریافت اطلاعات کاربر لاگین شده
export const getUserInfo = async () => {
  return await apiClient.get(`/users/me`);
};

// ================================
// Contact
// ================================

// ارسال پیام تماس با ما
export const sendMessage = async (name: string, subject: string, message: string, email?: string, mobile?: string) => {
  const data = {
    name,
    subject,
    message,
    email: email || undefined,
    mobile: mobile || undefined,
    source_type: "website"
  };
  return await apiClient.post(`/contact`, data);
};
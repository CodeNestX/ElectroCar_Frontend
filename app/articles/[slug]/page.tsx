import { getArticleBySlug } from '@/api/services';
import ArticleView from '@/components/articles/ArticleView';
import { notFound } from 'next/navigation';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  try {
    const articleRes = await getArticleBySlug(slug);
    
    // گرفتن اولین مقاله از آرایه‌ی برگشتی دیتابیس
    const articleData = articleRes.data?.data?.[0]; 

    if (!articleData) {
      notFound();
    }

    // پاس دادن مقاله به کامپوننت ویو
    return <ArticleView id={articleData.id} article={articleData} />;
    
  } catch (error) {
    console.error("خطا در دریافت مقاله:", error);
    notFound();
  }
}
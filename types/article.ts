export interface Article {
  id: number;
  category_translation_id: number;
  title: string;
  slug: string;
  excerpt: string;
  language: string;
  status: string;
  cover_url: string;
  alt_text: string;
  caption: string;
  published_at:string;
  category_slug : string
  category : string;
  reading_time_minutes : number;
  created_at:string;
}
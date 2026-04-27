export interface Article {
  id: number;
  title: string;
  summary: string | null;
  tags: string[];
  published_at: Date | null;
  created_at: Date;
}

export interface Case {
  id: number;
  company: string;
  title: string;
  metrics: string | null;
  summary: string | null;
  tags: string[];
  created_at: Date;
}

export interface NewsItem {
  id: number;
  title: string;
  summary: string | null;
  source_url: string;
  source_name: string;
  published_at: Date | null;
  fetched_at: Date;
}

export type Section = 'articles' | 'cases' | 'news';
import SectionTitle from '@/components/SectionTitle';
import ArticleCard from '@/components/ArticleCard';
import CaseCard from '@/components/CaseCard';
import NewsItemComponent from '@/components/NewsItem';
import { Article, Case, NewsItem } from '@/lib/types';

async function getArticles(): Promise<Article[]> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/articles`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

async function getCases(): Promise<Case[]> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/cases`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

async function getNews(): Promise<NewsItem[]> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/news?limit=20`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function Home() {
  const [articles, cases, news] = await Promise.all([
    getArticles(),
    getCases(),
    getNews(),
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Section 1: AI商业模式创新 */}
      <section id="articles" className="mb-20">
        <SectionTitle
          title="AI商业模式创新"
          subtitle="深度解析AI时代的商业新物种"
        />
        <div className="grid md:grid-cols-2 gap-6">
          {articles.length > 0 ? (
            articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))
          ) : (
            <p className="text-gray-500 col-span-2">暂无文章</p>
          )}
        </div>
      </section>

      {/* Section 2: AI企业应用 */}
      <section id="cases" className="mb-20">
        <SectionTitle
          title="AI企业应用"
          subtitle="真实案例，量化AI价值"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cases.length > 0 ? (
            cases.map((caseItem) => (
              <CaseCard key={caseItem.id} caseItem={caseItem} />
            ))
          ) : (
            <p className="text-gray-500 col-span-4">暂无案例</p>
          )}
        </div>
      </section>

      {/* Section 3: 大模型每日资讯 */}
      <section id="news">
        <SectionTitle
          title="大模型每日资讯"
          subtitle="每日更新，追踪AI最新动态"
        />
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          {news.length > 0 ? (
            news.map((item) => (
              <NewsItemComponent key={item.id} item={item} />
            ))
          ) : (
            <p className="text-gray-500">暂无资讯</p>
          )}
        </div>
      </section>
    </div>
  );
}
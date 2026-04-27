import { Article } from '@/lib/types';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="group bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
      <div className="flex flex-wrap gap-2 mb-3">
        {article.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
      <h3 className="text-xl font-serif font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
        {article.title}
      </h3>
      {article.summary && (
        <p className="text-gray-600 mt-3 line-clamp-3">{article.summary}</p>
      )}
      {article.published_at && (
        <time className="block text-sm text-gray-400 mt-4">
          {new Date(article.published_at).toLocaleDateString('zh-CN')}
        </time>
      )}
    </article>
  );
}
import { NewsItem } from '@/lib/types';

interface NewsItemProps {
  item: NewsItem;
}

export default function NewsItemComponent({ item }: NewsItemProps) {
  return (
    <div className="flex gap-4 py-4 border-b border-gray-100 last:border-0">
      <div className="flex-shrink-0 w-20 text-xs text-gray-400 pt-1">
        {item.published_at
          ? new Date(item.published_at).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
          : '最近'}
      </div>
      <div className="flex-1 min-w-0">
        <a
          href={item.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-900 hover:text-indigo-600 transition-colors font-medium block truncate"
        >
          {item.title}
        </a>
        {item.summary && (
          <p className="text-gray-500 text-sm mt-1 line-clamp-2">{item.summary}</p>
        )}
        <span className="text-xs text-gray-400 mt-2 inline-block">{item.source_name}</span>
      </div>
    </div>
  );
}
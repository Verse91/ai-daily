import { Case } from '@/lib/types';

interface CaseCardProps {
  caseItem: Case;
}

export default function CaseCard({ caseItem }: CaseCardProps) {
  return (
    <article className="group bg-white rounded-lg border border-gray-200 p-5 hover:border-indigo-300 hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-sm font-medium text-indigo-600">{caseItem.company}</span>
          <h3 className="text-lg font-semibold text-gray-900 mt-1 group-hover:text-indigo-600 transition-colors">
            {caseItem.title}
          </h3>
        </div>
      </div>
      {caseItem.metrics && (
        <p className="text-2xl font-bold text-gray-900 mt-3">{caseItem.metrics}</p>
      )}
      {caseItem.summary && (
        <p className="text-gray-600 text-sm mt-3 line-clamp-2">{caseItem.summary}</p>
      )}
      {caseItem.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {caseItem.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-gray-50 text-gray-500 rounded border border-gray-200"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-600">
              AI Daily - 每日AI资讯站
            </p>
            <p className="text-xs text-gray-400 mt-1">
              聚焦商业模式创新 · 企业应用案例 · 大模型资讯
            </p>
          </div>
          <div className="text-xs text-gray-400">
            © 2026 AI Daily. 技术栈: Next.js + PostgreSQL + Tavily + MiniMax
          </div>
        </div>
      </div>
    </footer>
  );
}
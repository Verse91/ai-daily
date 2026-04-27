import Link from 'next/link';

export default function Header() {
  const today = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-serif font-bold text-gray-900">
              AI Daily
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#articles" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              商业模式
            </a>
            <a href="#cases" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              企业应用
            </a>
            <a href="#news" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              每日资讯
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">{today}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
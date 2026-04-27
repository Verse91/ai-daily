import SectionTitle from '@/components/SectionTitle';
import ArticleCard from '@/components/ArticleCard';
import CaseCard from '@/components/CaseCard';
import NewsItemComponent from '@/components/NewsItem';
import { Article, Case, NewsItem } from '@/lib/types';

// Seed data for demonstration - replace with DB queries in production
const seedArticles: Article[] = [
  {
    id: 1,
    title: 'AI Native时代：初创公司如何用AI重新定义商业模式',
    summary: '从OpenAI到Anthropic，AI原生公司正在颠覆传统商业逻辑。本文深入分析AI Native的核心特征，以及初创公司如何在产品、增长和盈利模式上实现突破性创新。',
    tags: ['AI Native', '创业', '商业模式'],
    published_at: new Date('2026-04-25'),
    created_at: new Date(),
  },
  {
    id: 2,
    title: '订阅制AI助手：SaaS定价的新篇章',
    summary: '随着ChatGPT Plus、Claude Pro等服务流行，AI助手订阅模式正在成为主流。本文探讨不同定价策略对用户留存和收入增长的影响。',
    tags: ['SaaS', '定价策略', 'AI助手'],
    published_at: new Date('2026-04-23'),
    created_at: new Date(),
  },
];

const seedCases: Case[] = [
  {
    id: 1,
    company: 'JPMorgan',
    title: 'AI驱动的信贷风险评估系统',
    metrics: '坏账率降低 25%',
    summary: '引入机器学习模型进行信贷评估，显著提升了风险识别能力和审批效率。',
    tags: ['金融', '风险管理', '信贷'],
    created_at: new Date(),
  },
  {
    id: 2,
    company: 'Amazon',
    title: '智能仓储机器人调度系统',
    metrics: '拣货效率提升 40%',
    summary: '通过强化学习优化机器人路径和任务分配，大幅降低仓储运营成本。',
    tags: ['物流', '机器人', '强化学习'],
    created_at: new Date(),
  },
  {
    id: 3,
    company: 'Siemens',
    title: '预测性维护AI平台',
    metrics: '停机时间减少 60%',
    summary: '工业设备传感器数据实时分析，提前预测故障并自动触发维护流程。',
    tags: ['工业4.0', '预测维护', 'IoT'],
    created_at: new Date(),
  },
  {
    id: 4,
    company: 'Cleveland Clinic',
    title: 'AI辅助影像诊断系统',
    metrics: '诊断准确率达 94%',
    summary: '深度学习模型辅助放射科医生分析医学影像，提升早期疾病检测能力。',
    tags: ['医疗', '影像诊断', '深度学习'],
    created_at: new Date(),
  },
];

const seedNews: NewsItem[] = [
  {
    id: 1,
    title: 'OpenAI发布GPT-5，性能大幅提升',
    summary: 'GPT-5在多项基准测试中刷新纪录，推理能力和多模态理解达到新高度。',
    source_url: 'https://openai.com',
    source_name: 'OpenAI',
    published_at: new Date('2026-04-27'),
    fetched_at: new Date(),
  },
  {
    id: 2,
    title: 'Anthropic推出Claude 4，主打长上下文处理',
    summary: 'Claude 4支持200K token上下文窗口，专为长文档分析和复杂任务设计。',
    source_url: 'https://anthropic.com',
    source_name: 'Anthropic',
    published_at: new Date('2026-04-26'),
    fetched_at: new Date(),
  },
  {
    id: 3,
    title: 'Google发布Gemini 2.0 Ultra，挑战GPT-5',
    summary: 'Gemini 2.0 Ultra在代码生成和数学推理方面表现优异，已向开发者开放API。',
    source_url: 'https://blog.google',
    source_name: 'Google',
    published_at: new Date('2026-04-25'),
    fetched_at: new Date(),
  },
  {
    id: 4,
    title: 'Meta开源LLaMA 4，参数规模创新高',
    summary: 'LLaMA 4最大版本达到400B参数，性能直逼闭源模型，引发开源社区热议。',
    source_url: 'https://meta.com',
    source_name: 'Meta',
    published_at: new Date('2026-04-24'),
    fetched_at: new Date(),
  },
  {
    id: 5,
    title: 'Microsoft Copilot全面升级，支持GPT-5',
    summary: 'Microsoft 365 Copilot现在支持GPT-5，企业用户可享更智能的办公助手体验。',
    source_url: 'https://microsoft.com',
    source_name: 'Microsoft',
    published_at: new Date('2026-04-23'),
    fetched_at: new Date(),
  },
];

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Section 1: AI商业模式创新 */}
      <section id="articles" className="mb-20">
        <SectionTitle
          title="AI商业模式创新"
          subtitle="深度解析AI时代的商业新物种"
        />
        <div className="grid md:grid-cols-2 gap-6">
          {seedArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* Section 2: AI企业应用 */}
      <section id="cases" className="mb-20">
        <SectionTitle
          title="AI企业应用"
          subtitle="真实案例，量化AI价值"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {seedCases.map((caseItem) => (
            <CaseCard key={caseItem.id} caseItem={caseItem} />
          ))}
        </div>
      </section>

      {/* Section 3: 大模型每日资讯 */}
      <section id="news">
        <SectionTitle
          title="大模型每日资讯"
          subtitle="每日更新，追踪AI最新动态"
        />
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          {seedNews.map((item) => (
            <NewsItemComponent key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
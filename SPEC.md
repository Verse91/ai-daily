# AI Daily - 每日AI资讯站

## 1. Concept & Vision

一个每日更新的AI资讯网站，聚焦三大板块：商业模式创新（深度文章）、企业应用案例（实操导向）、大模型资讯（每日速递）。风格致敬 Claude Blog — 简洁、克制、阅读友好，让内容成为主角。目标：做中文圈最有品质的AI日报。

## 2. Design Language

**风格参考**：Claude Blog — 白底黑字、衬线标题、无干扰布局

**色彩系统**：
- 背景：`#FAFAFA`（近白）
- 主文字：`#1A1A1A`（近黑）
- 强调色：`#6366F1`（Indigo，用于链接/CTA）
- 卡片边框：`#E5E7EB`
- 标签背景：`#F3F4F6`
- 禁用/次级：`#9CA3AF`

**字体**：
- 标题：`"Newsreader", "Noto Serif SC", Georgia, serif`（衬线，Claude风格）
- 正文：`"Inter", "Noto Sans SC", system-ui, sans-serif`
- 代码/标签：`"JetBrains Mono", monospace`

**间距系统**：4px 基准网格，卡片间距 24px，内边距 20px

**动效**：淡入 300ms ease-out，Hover 时卡片轻微上浮 `translateY(-2px)`

**图片**：无装饰性图片，内容图片（新闻配图）保持 16:9 比例

## 3. Layout & Structure

```
┌─────────────────────────────────────┐
│           Header (固定)              │
│  Logo · 导航 · 日期                  │
├─────────────────────────────────────┤
│                                     │
│  Section 1: AI商业模式创新            │
│  [大卡片 × 1-2篇精选深度文章]         │
│                                     │
│  Section 2: AI企业应用               │
│  [案例卡片网格 2×N]                  │
│                                     │
│  Section 3: 大模型每日资讯            │
│  [时间线列表，按日分组]               │
│                                     │
├─────────────────────────────────────┤
│           Footer                    │
└─────────────────────────────────────┘
```

**响应式策略**：
- Desktop（>1024px）：三栏/双栏网格
- Tablet（768-1024px）：双栏
- Mobile（<768px）：单栏堆叠，导航收起

**页面节奏**：Hero section 不需要，内容即英雄

## 4. Features & Interactions

### 4.1 首页展示
- 三大板块各自独立滚动
- 日期标识"今日" badge
- 资讯按时间倒序

### 4.2 商业模式创新（Section 1）
- 精读型文章，标题 + 摘要 + 标签
- 点击卡片 → 文章详情页（未来扩展）
- 管理员通过 CMS 或脚本发布

### 4.3 企业应用案例（Section 2）
- 公司 logo（可选）+ 案例标题 + 核心数据
- 标签分类（金融/医疗/制造/零售...）

### 4.4 大模型每日资讯（Section 3）
- 数据来源：Tavily API 搜索 AI 新闻
- 每日自动抓取 → LLM 摘要 → 入库 → 渲染
- 资讯条目：来源网站 · 发布时间 · 标题 · 摘要

### 4.5 管理员功能（轻量）
- 手动触发抓取任务
- 查看上次同步时间
- 未来：CMS 写稿入口

### 4.6 Agent 自动更新工作流
```
每日定时触发 (cron 08:00)
    ↓
Tavily API 搜索"AI news today"
    ↓
获取 Top 20 条结果
    ↓
逐条调用 MiniMax API 生成中文摘要
    ↓
存入 PostgreSQL
    ↓
前端 Next.js SSR 渲染
```

**错误处理**：
- API 失败 → 记录日志，保留旧数据
- 重复内容 → 基于 URL 去重
- LLM 失败 → 降级为 Tavily 原始摘要

## 5. Component Inventory

### Header
- 左侧：Logo "AI Daily"（衬线字体）
- 中间：导航（三个板块快速跳转）
- 右侧：当前日期 + 刷新按钮
- Hover：导航项下划线动画

### SectionTitle
- 板块标题（大号衬线）
- 副标题（次级颜色）
- 右侧"查看更多"链接（可选）

### ArticleCard（商业模式用）
- 标题（衬线，黑字）
- 摘要（2行截断）
- 标签列表
- 发布日期
- Hover：轻微上浮 + 阴影加深

### CaseCard（企业应用用）
- 公司名 + 案例标题
- 核心指标（放大字体突出）
- 标签
- Hover：边框变强调色

### NewsItem（大模型资讯用）
- 时间戳（灰色小字）
- 标题（可点击外链）
- 摘要（LLM生成，100字内）
- 来源网站 favicon + 名称

### Footer
- 版权信息
- 技术栈说明
- 最后更新时间

## 6. Technical Approach

### 前端
- **Framework**：Next.js 14（App Router）
- **Styling**：Tailwind CSS + CSS Variables
- **状态管理**：React Context（轻量即可）
- **部署**：本地 dev server，`npm run dev`

### 后端（API Routes）
- Next.js API Routes 提供数据接口
- `/api/news` - 获取资讯列表
- `/api/cases` - 获取案例列表
- `/api/articles` - 获取深度文章
- `/api/admin/sync` - 手动触发同步

### 数据库
- **PostgreSQL**（本地 Docker 运行）
- **Schema**：

```sql
-- 深度文章
CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  summary TEXT,
  tags TEXT[],
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 企业案例
CREATE TABLE cases (
  id SERIAL PRIMARY KEY,
  company VARCHAR(100),
  title VARCHAR(255) NOT NULL,
  metrics VARCHAR(255),
  summary TEXT,
  tags TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);

-- 每日资讯
CREATE TABLE news (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  summary TEXT,
  source_url VARCHAR(500),
  source_name VARCHAR(100),
  published_at TIMESTAMP,
  fetched_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(source_url)
);
```

### 爬取/生成 Agent
- **脚本**：`/scripts/daily_sync.py`
- **依赖**：tavily-python, psycopg2, minimax-sdk
- **Cron**：每日 08:00 自动运行（macOS crontab 或 launchd）
- **输出**：JSON 日志 + 数据库写入

### 环境变量
```
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/ai_daily

# Tavily
TAVILY_API_KEY=tvly-xxx

# MiniMax
MINIMAX_API_KEY=xxx
MINIMAX_API_URL=https://api.minimax.chat/v1
```

## 7. File Structure

```
ai-daily/
├── SPEC.md
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env.local
├── public/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx          # 首页
│   │   ├── globals.css
│   │   └── api/
│   │       ├── news/route.ts
│   │       ├── cases/route.ts
│   │       ├── articles/route.ts
│   │       └── admin/sync/route.ts
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── SectionTitle.tsx
│   │   ├── ArticleCard.tsx
│   │   ├── CaseCard.tsx
│   │   └── NewsItem.tsx
│   ├── lib/
│   │   ├── db.ts             # PostgreSQL 连接
│   │   └── types.ts          # TypeScript 类型
│   └── hooks/
│       └── useNews.ts
├── scripts/
│   └── daily_sync.py         # 每日同步脚本
├── sql/
│   └── init.sql              # 数据库初始化
└── data/
    └── seed.json             # 测试数据
```

## 8. MVP Scope

**第一期（本周）**：
- [ ] Next.js 项目搭建完成
- [ ] 静态页面渲染三大板块
- [ ] PostgreSQL 数据库初始化
- [ ] Tavily → MiniMax → DB 的每日同步脚本
- [ ] 本地跑通，首页能看到假数据

**第二期（下周）**：
- [ ] API Routes 连接数据库
- [ ] 前端动态渲染真实数据
- [ ] 移动端适配验收
- [ ] Cron 自动任务配置

**第三期（未来）**：
- [ ] CMS 后台
- [ ] 文章详情页
- [ ] 订阅/邮件通知
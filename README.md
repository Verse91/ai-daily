# AI Daily - 每日AI资讯站

聚焦商业模式创新、企业应用案例与大模型资讯的每日更新平台。

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
cd scripts && pip install -r requirements.txt
```

### 2. 配置环境变量

复制 `.env.local.example` 为 `.env.local` 并填入你的 API Keys：

```bash
cp .env.local.example .env.local
```

### 3. 启动数据库

确保 PostgreSQL 正在运行：

```bash
docker ps | grep postgres
```

如果没有运行：

```bash
docker run -d --name postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=ai_daily \
  -p 5432:5432 \
  postgres:16
```

初始化数据库表：

```bash
docker exec -i postgres psql -U postgres -d ai_daily < sql/init.sql
```

### 4. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

## 📁 项目结构

```
ai-daily/
├── src/
│   ├── app/
│   │   ├── api/              # API Routes
│   │   │   ├── articles/     # 文章接口
│   │   │   ├── cases/        # 案例接口
│   │   │   ├── news/         # 资讯接口
│   │   │   └── admin/sync/   # 手动触发同步
│   │   ├── page.tsx          # 首页
│   │   └── layout.tsx        # 布局
│   ├── components/            # UI 组件
│   └── lib/                  # 工具库
├── scripts/
│   ├── daily_sync.py         # 每日同步脚本
│   └── requirements.txt      # Python 依赖
├── sql/
│   └── init.sql              # 数据库初始化
└── data/                     # 种子数据
```

## 🔄 每日同步

### 自动同步 (macOS)

将 plist 复制到 LaunchAgents 并加载：

```bash
cp scripts/com.ai-daily.daily-sync.plist ~/Library/LaunchAgents/
launchctl load ~/Library/LaunchAgents/com.ai-daily.daily-sync.plist
```

### 手动同步

```bash
curl -X POST http://localhost:3000/api/admin/sync
```

或直接运行 Python 脚本：

```bash
python3 scripts/daily_sync.py
```

### 查看日志

```bash
tail -f logs/daily_sync.log
```

## 🔌 API

| 端点 | 方法 | 描述 |
|------|------|------|
| `/api/articles` | GET | 获取文章列表 |
| `/api/cases` | GET | 获取案例列表 |
| `/api/news` | GET | 获取资讯列表 |
| `/api/admin/sync` | POST | 手动触发同步 |

## 🛠️ 技术栈

- **前端**: Next.js 14 + TypeScript + Tailwind CSS
- **数据库**: PostgreSQL 16
- **搜索**: Tavily API
- **摘要生成**: MiniMax API
- **部署**: Vercel (前端) + Railway/Render (数据库)

## 📝 开发备忘

- Next.js App Router 使用 Server Components
- 数据库连接使用 `pg` 包
- 样式采用 Tailwind CSS + CSS Variables
- 响应式设计优先移动端

## 🔒 环境变量

| 变量 | 描述 | 必填 |
|------|------|------|
| `DATABASE_URL` | PostgreSQL 连接字符串 | ✅ |
| `TAVILY_API_KEY` | Tavily 搜索 API Key | ✅ |
| `MINIMAX_API_KEY` | MiniMax API Key | ❌ |
| `NEXT_PUBLIC_SITE_URL` | 网站 URL | ❌ |

## 📄 License

MIT
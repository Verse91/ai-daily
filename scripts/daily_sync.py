#!/usr/bin/env python3
"""
AI Daily - 每日同步脚本
从 Tavily 搜索 AI 新闻 → MiniMax 生成摘要 → 存入 PostgreSQL
"""

import os
import json
import re
from datetime import datetime
from tavily import TavilyClient
import psycopg2
import requests

# ============ 配置 ============
TAVILY_API_KEY = os.environ.get('TAVILY_API_KEY', 'tvly-your-tavily-key')
MINIMAX_API_KEY = os.environ.get('MINIMAX_API_KEY', 'your-minimax-key')
MINIMAX_API_URL = os.environ.get('MINIMAX_API_URL', 'https://api.minimax.chat/v1')
MINIMAX_MODEL = os.environ.get('MINIMAX_MODEL', 'MiniMax-01')
DATABASE_URL = os.environ.get('DATABASE_URL', 'postgresql://postgres:postgres@localhost:5432/ai_daily')

SEARCH_QUERIES = [
    'AI news today 2026',
    'artificial intelligence latest developments',
    'OpenAI Anthropic Google Meta AI updates',
    'LLM large language model news',
]

# ============ 数据库操作 ============
def get_db_connection():
    return psycopg2.connect(DATABASE_URL)

def init_db():
    """初始化数据库表"""
    conn = get_db_connection()
    cur = conn.cursor()
    
    cur.execute('''
        CREATE TABLE IF NOT EXISTS articles (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            summary TEXT,
            tags TEXT[] DEFAULT '{}',
            published_at TIMESTAMP,
            created_at TIMESTAMP DEFAULT NOW()
        )
    ''')
    
    cur.execute('''
        CREATE TABLE IF NOT EXISTS cases (
            id SERIAL PRIMARY KEY,
            company VARCHAR(100),
            title VARCHAR(255) NOT NULL,
            metrics VARCHAR(255),
            summary TEXT,
            tags TEXT[] DEFAULT '{}',
            created_at TIMESTAMP DEFAULT NOW()
        )
    ''')
    
    cur.execute('''
        CREATE TABLE IF NOT EXISTS news (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            summary TEXT,
            source_url VARCHAR(500),
            source_name VARCHAR(100),
            published_at TIMESTAMP,
            fetched_at TIMESTAMP DEFAULT NOW(),
            UNIQUE(source_url)
        )
    ''')
    
    conn.commit()
    cur.close()
    conn.close()
    print('[DB] 表初始化完成')

def news_exists(url):
    """检查新闻是否已存在"""
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT id FROM news WHERE source_url = %s', (url,))
    exists = cur.fetchone() is not None
    cur.close()
    conn.close()
    return exists

def insert_news(title, summary, url, source, published_at=None):
    """插入新闻"""
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute('''
            INSERT INTO news (title, summary, source_url, source_name, published_at, fetched_at)
            VALUES (%s, %s, %s, %s, %s, NOW())
            ON CONFLICT (source_url) DO UPDATE SET
                title = EXCLUDED.title,
                summary = EXCLUDED.summary,
                fetched_at = NOW()
        ''', (title, summary, url, source, published_at))
        conn.commit()
        print(f'[DB] 插入: {title[:50]}...')
    except Exception as e:
        print(f'[DB] 插入失败: {e}')
    finally:
        cur.close()
        conn.close()

# ============ Tavily 搜索 ============
def search_tavily(query):
    """搜索 Tavily"""
    client = TavilyClient(api_key=TAVILY_API_KEY)
    results = client.search(query=query, max_results=5, lang='en')
    return results.get('results', [])

def search_all():
    """聚合多次搜索结果"""
    all_results = []
    for query in SEARCH_QUERIES:
        print(f'[Search] 查询: {query}')
        try:
            results = search_tavily(query)
            all_results.extend(results)
        except Exception as e:
            print(f'[Search] 查询失败: {e}')
    
    # 去重
    seen = set()
    unique = []
    for r in all_results:
        if r['url'] not in seen:
            seen.add(r['url'])
            unique.append(r)
    
    return unique

# ============ MiniMax 摘要生成 ============
def generate_summary(title, content):
    """调用 MiniMax 生成中文摘要（100字内）"""
    if not MINIMAX_API_KEY or MINIMAX_API_KEY == 'your-minimax-key':
        print('[MiniMax] 未配置 API Key，使用原始内容')
        return content[:200] if content else ''
    
    prompt = f"""请为以下AI新闻生成一条简短的中文摘要（不超过100字）：

标题：{title}
内容：{content[:500] if content else '无详细信息'}

只输出摘要文字，不要其他解释。"""
    
    try:
        response = requests.post(
            f"{MINIMAX_API_URL}/text/chatcompletion_v2",
            headers={
                "Authorization": f"Bearer {MINIMAX_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "model": MINIMAX_MODEL,
                "messages": [
                    {"role": "user", "content": prompt}
                ],
                "max_tokens": 200,
                "temperature": 0.3,
            },
            timeout=30
        )
        
        if response.status_code == 200:
            result = response.json()
            # 解析 MiniMax 的响应格式
            choices = result.get('choices', [])
            if choices and len(choices) > 0:
                summary = choices[0].get('message', {}).get('content', '')
                # 清理特殊字符
                summary = re.sub(r'[#*`\[\]]', '', summary).strip()
                return summary
        
        print(f'[MiniMax] API 错误: {response.status_code} - {response.text[:100]}')
        return content[:200] if content else ''
        
    except Exception as e:
        print(f'[MiniMax] 调用失败: {e}')
        return content[:200] if content else ''

# ============ 主流程 ============
def sync():
    """每日同步主流程"""
    print(f'[Sync] 开始同步 - {datetime.now().isoformat()}')
    start_time = datetime.now()
    
    # 初始化数据库
    init_db()
    
    # 搜索
    results = search_all()
    print(f'[Search] 获取 {len(results)} 条结果')
    
    if not results:
        print('[Sync] 没有获取到任何结果')
        return
    
    # 逐条处理
    inserted = 0
    skipped = 0
    for r in results:
        try:
            if news_exists(r['url']):
                print(f'[Skip] 已存在: {r["url"][:60]}...')
                skipped += 1
                continue
            
            # 生成摘要
            summary = generate_summary(r['title'], r.get('content', ''))
            
            # 提取来源名
            source = r.get('source', 'Unknown')
            if '://' in source:
                source = source.split('://')[1].split('/')[0]
            
            # 插入数据库
            insert_news(
                title=r['title'],
                summary=summary,
                url=r['url'],
                source=source,
                published_at=r.get('published_at')
            )
            inserted += 1
            
        except Exception as e:
            print(f'[Sync] 处理失败: {e}')
            continue
    
    elapsed = (datetime.now() - start_time).total_seconds()
    print(f'[Sync] 完成！插入 {inserted} 条，跳过 {skipped} 条，耗时 {elapsed:.1f}秒')

if __name__ == '__main__':
    sync()
#!/bin/bash
# AI Daily - 每日定时同步脚本
# 添加到 crontab: 0 8 * * * /Users/wangjd/clawd/ai-daily/scripts/run_daily_sync.sh

# 设置环境变量
export DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ai_daily"
export TAVILY_API_KEY="tvly-your-key"
export MINIMAX_API_KEY="your-minimax-key"

# 进入项目目录
cd /Users/wangjd/clawd/ai-daily/scripts

# 激活虚拟环境（如果有）
# source ../venv/bin/activate

# 运行同步脚本
/usr/bin/python3 daily_sync.py >> ../logs/daily_sync.log 2>&1

echo "[$(date)] 同步任务完成" >> ../logs/daily_sync.log
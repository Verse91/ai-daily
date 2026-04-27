import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST() {
  try {
    // 获取脚本路径
    const scriptPath = process.cwd() + '/scripts/daily_sync.py';
    
    // 设置环境变量
    const env = {
      ...process.env,
      DATABASE_URL: process.env.DATABASE_URL,
      TAVILY_API_KEY: process.env.TAVILY_API_KEY || '',
      MINIMAX_API_KEY: process.env.MINIMAX_API_KEY || '',
    };
    
    // 执行同步脚本（超时30秒）
    const { stdout, stderr } = await execAsync(
      `python3 "${scriptPath}"`,
      { 
        env,
        timeout: 30000,
      }
    );
    
    return NextResponse.json({
      success: true,
      output: stdout,
      errors: stderr,
    });
  } catch (error: unknown) {
    console.error('[Admin/Sync] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({
      success: false,
      error: errorMessage,
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: '/api/admin/sync',
    method: 'POST',
    description: '手动触发每日资讯同步任务',
    environment: {
      hasDatabase: !!process.env.DATABASE_URL,
      hasTavilyKey: !!process.env.TAVILY_API_KEY,
      hasMiniMaxKey: !!process.env.MINIMAX_API_KEY,
    }
  });
}
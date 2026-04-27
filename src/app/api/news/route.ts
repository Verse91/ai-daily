import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '20');
  
  try {
    const result = await pool.query(
      'SELECT id, title, summary, source_url, source_name, published_at, fetched_at FROM news ORDER BY published_at DESC LIMIT $1',
      [limit]
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('[API/news] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}
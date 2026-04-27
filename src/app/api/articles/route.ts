import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  try {
    const result = await pool.query(
      'SELECT id, title, summary, tags, published_at, created_at FROM articles ORDER BY published_at DESC LIMIT 10'
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('[API/articles] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}
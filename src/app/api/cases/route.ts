import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  try {
    const result = await pool.query(
      'SELECT id, company, title, metrics, summary, tags, created_at FROM cases ORDER BY created_at DESC LIMIT 20'
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('[API/cases] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch cases' }, { status: 500 });
  }
}
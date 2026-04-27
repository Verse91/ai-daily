import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function query<T>(text: string, params?: unknown[]): Promise<T[]> {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result.rows as T[];
  } finally {
    client.release();
  }
}

export async function getArticles() {
  const { Pool } = await import('pg');
  const p = new Pool({ connectionString: process.env.DATABASE_URL });
  const res = await p.query('SELECT * FROM articles ORDER BY published_at DESC LIMIT 5');
  await p.end();
  return res.rows;
}

export async function getCases() {
  const { Pool } = await import('pg');
  const p = new Pool({ connectionString: process.env.DATABASE_URL });
  const res = await p.query('SELECT * FROM cases ORDER BY created_at DESC LIMIT 10');
  await p.end();
  return res.rows;
}

export async function getNews(limit = 20) {
  const { Pool } = await import('pg');
  const p = new Pool({ connectionString: process.env.DATABASE_URL });
  const res = await p.query('SELECT * FROM news ORDER BY published_at DESC LIMIT $1', [limit]);
  await p.end();
  return res.rows;
}

export default pool;
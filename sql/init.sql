-- AI Daily Database Schema

CREATE TABLE IF NOT EXISTS articles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  summary TEXT,
  tags TEXT[] DEFAULT '{}',
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cases (
  id SERIAL PRIMARY KEY,
  company VARCHAR(100),
  title VARCHAR(255) NOT NULL,
  metrics VARCHAR(255),
  summary TEXT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS news (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  summary TEXT,
  source_url VARCHAR(500),
  source_name VARCHAR(100),
  published_at TIMESTAMP,
  fetched_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(source_url)
);

-- Indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_news_fetched_at ON news(fetched_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_cases_created_at ON cases(created_at DESC);
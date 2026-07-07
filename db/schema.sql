-- PostgreSQL initialization script for database tools
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'developer',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  repo_url VARCHAR(255),
  status VARCHAR(50) DEFAULT 'production',
  deploy_provider VARCHAR(50) DEFAULT 'vercel',
  last_updated TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS api_keys (
  id SERIAL PRIMARY KEY,
  owner_id UUID NOT NULL,
  key_hint VARCHAR(30),
  scope VARCHAR(100),
  active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS system_logs (
  id SERIAL PRIMARY KEY,
  event_type VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  severity VARCHAR(20) DEFAULT 'info',
  logged_at TIMESTAMP DEFAULT NOW()
);
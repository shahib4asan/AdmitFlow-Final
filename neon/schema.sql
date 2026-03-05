-- ═══════════════════════════════════════════════════════════════════════════
-- ADMITFLOW — NEON DATABASE SCHEMA
-- Run this in the Neon SQL Editor after creating your project
-- ═══════════════════════════════════════════════════════════════════════════

-- ─── USERS (replaces Supabase auth.users) ────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id            UUID PRIMARY KEY,
  email         TEXT NOT NULL UNIQUE,
  name          TEXT,
  password_hash TEXT,                    -- NULL for OAuth users
  provider      TEXT NOT NULL DEFAULT 'email',  -- 'email' | 'google'
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ─── UNIVERSITIES ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS universities (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  country     TEXT NOT NULL DEFAULT 'Canada',
  program     TEXT NOT NULL DEFAULT '',
  deadline    DATE NOT NULL,
  portal_link TEXT,
  fee         NUMERIC DEFAULT 0,
  status      TEXT NOT NULL DEFAULT 'Not started'
              CHECK (status IN ('Not started','In progress','Submitted','Interview','Accepted','Rejected')),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─── DOCUMENTS ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS documents (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  university_id  UUID NOT NULL REFERENCES universities(id) ON DELETE CASCADE,
  type           TEXT NOT NULL,
  file_url       TEXT,
  completed      BOOLEAN DEFAULT FALSE
);

-- ─── EXAM TRACKER ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS exam_tracker (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  ielts_date     DATE,
  target_score   NUMERIC(3,1),
  achieved_score NUMERIC(3,1),
  gre_score      NUMERIC(5,0)
);

-- ─── COST TRACKER ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS cost_tracker (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  ielts_cost   NUMERIC DEFAULT 0,
  courier_cost NUMERIC DEFAULT 0,
  visa_fee     NUMERIC DEFAULT 0
);

-- ─── SUBSCRIPTIONS ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS subscriptions (
  user_id     UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  plan_type   TEXT NOT NULL DEFAULT 'free' CHECK (plan_type IN ('free','premium')),
  expiry_date TIMESTAMPTZ
);

-- ─── INDEXES ─────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_universities_user_id ON universities(user_id);
CREATE INDEX IF NOT EXISTS idx_universities_deadline ON universities(deadline);
CREATE INDEX IF NOT EXISTS idx_documents_university_id ON documents(university_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

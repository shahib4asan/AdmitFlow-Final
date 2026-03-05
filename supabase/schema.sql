-- ═══════════════════════════════════════════════════════════════════════════
-- ADMITFLOW DATABASE SCHEMA
-- Run this entire file in Supabase → SQL Editor → New Query → Run
-- ═══════════════════════════════════════════════════════════════════════════

-- ─── UNIVERSITIES ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS universities (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
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
  type           TEXT NOT NULL,  -- 'sop' | 'cv' | 'ielts' | 'transcript' | 'passport' | 'lor1' | 'lor2'
  file_url       TEXT,
  completed      BOOLEAN DEFAULT FALSE
);

-- ─── EXAM TRACKER ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS exam_tracker (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  ielts_date     DATE,
  target_score   NUMERIC(3,1),
  achieved_score NUMERIC(3,1),
  gre_score      NUMERIC(5,0)
);

-- ─── COST TRACKER ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS cost_tracker (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  ielts_cost   NUMERIC DEFAULT 0,
  courier_cost NUMERIC DEFAULT 0,
  visa_fee     NUMERIC DEFAULT 0
);

-- ─── SUBSCRIPTIONS ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS subscriptions (
  user_id     UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_type   TEXT NOT NULL DEFAULT 'free' CHECK (plan_type IN ('free','premium')),
  expiry_date TIMESTAMPTZ
);

-- ═══════════════════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY (RLS)
-- ═══════════════════════════════════════════════════════════════════════════

ALTER TABLE universities  ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents     ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_tracker  ENABLE ROW LEVEL SECURITY;
ALTER TABLE cost_tracker  ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- ─── UNIVERSITIES POLICIES ───────────────────────────────────────────────────
CREATE POLICY "Users can view own universities"
  ON universities FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own universities"
  ON universities FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own universities"
  ON universities FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own universities"
  ON universities FOR DELETE
  USING (auth.uid() = user_id);

-- ─── DOCUMENTS POLICIES ──────────────────────────────────────────────────────
CREATE POLICY "Users can view own documents"
  ON documents FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM universities
      WHERE universities.id = documents.university_id
      AND universities.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own documents"
  ON documents FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM universities
      WHERE universities.id = documents.university_id
      AND universities.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own documents"
  ON documents FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM universities
      WHERE universities.id = documents.university_id
      AND universities.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own documents"
  ON documents FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM universities
      WHERE universities.id = documents.university_id
      AND universities.user_id = auth.uid()
    )
  );

-- ─── EXAM TRACKER POLICIES ───────────────────────────────────────────────────
CREATE POLICY "Users can manage own exam data"
  ON exam_tracker FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ─── COST TRACKER POLICIES ───────────────────────────────────────────────────
CREATE POLICY "Users can manage own cost data"
  ON cost_tracker FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ─── SUBSCRIPTION POLICIES ───────────────────────────────────────────────────
CREATE POLICY "Users can view own subscription"
  ON subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own subscription"
  ON subscriptions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own subscription"
  ON subscriptions FOR UPDATE
  USING (auth.uid() = user_id);

-- ═══════════════════════════════════════════════════════════════════════════
-- STORAGE BUCKET
-- Run this after creating tables
-- ═══════════════════════════════════════════════════════════════════════════

-- Create documents storage bucket (also do this in Supabase Dashboard → Storage)
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', false)
ON CONFLICT DO NOTHING;

-- Storage policies
CREATE POLICY "Users can upload own documents"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view own documents"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own documents"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- ═══════════════════════════════════════════════════════════════════════════
-- INDEXES (for performance)
-- ═══════════════════════════════════════════════════════════════════════════
CREATE INDEX IF NOT EXISTS idx_universities_user_id ON universities(user_id);
CREATE INDEX IF NOT EXISTS idx_universities_deadline ON universities(deadline);
CREATE INDEX IF NOT EXISTS idx_documents_university_id ON documents(university_id);

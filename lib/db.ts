import { neon } from '@neondatabase/serverless'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set')
}

export const sql = neon(process.env.DATABASE_URL)

// ─────────────────────────────────────────────────────────────────────────────
// INIT — Run once to create all tables
// ─────────────────────────────────────────────────────────────────────────────

export async function initDb() {
  // Users
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name                TEXT NOT NULL,
      email               TEXT UNIQUE NOT NULL,
      password_hash       TEXT NOT NULL,
      phone               TEXT,
      country             TEXT,
      target_universities TEXT[],
      ielts_score         NUMERIC(3,1),
      sat_score           INTEGER,
      toefl_score         INTEGER,
      gre_score           INTEGER,
      created_at          TIMESTAMPTZ DEFAULT NOW(),
      updated_at          TIMESTAMPTZ DEFAULT NOW()
    );
  `

  // Subscriptions
  await sql`
    CREATE TABLE IF NOT EXISTS subscriptions (
      id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      plan       TEXT NOT NULL DEFAULT 'free',
      status     TEXT NOT NULL DEFAULT 'active',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(user_id)
    );
  `

  // Universities
  await sql`
    CREATE TABLE IF NOT EXISTS universities (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      name        TEXT NOT NULL,
      program     TEXT,
      country     TEXT,
      deadline    DATE,
      status      TEXT DEFAULT 'not_started',
      notes       TEXT,
      portal_url  TEXT,
      fee         NUMERIC(10,2),
      created_at  TIMESTAMPTZ DEFAULT NOW(),
      updated_at  TIMESTAMPTZ DEFAULT NOW()
    );
  `

  // Documents
  await sql`
    CREATE TABLE IF NOT EXISTS documents (
      id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      university_id UUID REFERENCES universities(id) ON DELETE SET NULL,
      name          TEXT NOT NULL,
      type          TEXT,
      status        TEXT DEFAULT 'pending',
      file_url      TEXT,
      notes         TEXT,
      created_at    TIMESTAMPTZ DEFAULT NOW(),
      updated_at    TIMESTAMPTZ DEFAULT NOW()
    );
  `

  // Exam tracker
  await sql`
    CREATE TABLE IF NOT EXISTS exam_tracker (
      id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      ielts_score  NUMERIC(3,1),
      ielts_date   DATE,
      toefl_score  INTEGER,
      toefl_date   DATE,
      gre_score    INTEGER,
      gre_date     DATE,
      sat_score    INTEGER,
      sat_date     DATE,
      notes        TEXT,
      created_at   TIMESTAMPTZ DEFAULT NOW(),
      updated_at   TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(user_id)
    );
  `

  // Cost tracker
  await sql`
    CREATE TABLE IF NOT EXISTS cost_tracker (
      id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id           UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      university_id     UUID REFERENCES universities(id) ON DELETE SET NULL,
      category          TEXT NOT NULL,
      label             TEXT NOT NULL,
      amount            NUMERIC(10,2) NOT NULL DEFAULT 0,
      currency          TEXT DEFAULT 'BDT',
      paid              BOOLEAN DEFAULT FALSE,
      due_date          DATE,
      notes             TEXT,
      created_at        TIMESTAMPTZ DEFAULT NOW(),
      updated_at        TIMESTAMPTZ DEFAULT NOW()
    );
  `
}

// ─────────────────────────────────────────────────────────────────────────────
// USERS
// ─────────────────────────────────────────────────────────────────────────────

export async function getUserByEmail(email: string) {
  const rows = await sql`
    SELECT * FROM users WHERE email = ${email} LIMIT 1
  `
  return rows[0] ?? null
}

export async function getUserById(id: string) {
  const rows = await sql`
    SELECT * FROM users WHERE id = ${id} LIMIT 1
  `
  return rows[0] ?? null
}

export async function createUser(data: {
  name: string
  email: string
  password_hash: string
  phone?: string
  country?: string
  target_universities?: string[]
  ielts_score?: number
  toefl_score?: number
  sat_score?: number
  gre_score?: number
}) {
  const rows = await sql`
    INSERT INTO users (
      name, email, password_hash, phone, country,
      target_universities, ielts_score, toefl_score, sat_score, gre_score
    ) VALUES (
      ${data.name}, ${data.email}, ${data.password_hash},
      ${data.phone ?? null}, ${data.country ?? null},
      ${data.target_universities ?? null},
      ${data.ielts_score ?? null}, ${data.toefl_score ?? null},
      ${data.sat_score ?? null}, ${data.gre_score ?? null}
    )
    RETURNING *
  `
  return rows[0]
}

// ─────────────────────────────────────────────────────────────────────────────
// SUBSCRIPTIONS
// ─────────────────────────────────────────────────────────────────────────────

export async function getSubscription(userId: string) {
  const rows = await sql`
    SELECT * FROM subscriptions WHERE user_id = ${userId} LIMIT 1
  `
  // Return 'free' plan if no subscription row exists
  return rows[0] ?? { user_id: userId, plan: 'free', status: 'active' }
}

export async function upsertSubscription(userId: string, plan: string) {
  const rows = await sql`
    INSERT INTO subscriptions (user_id, plan, status)
    VALUES (${userId}, ${plan}, 'active')
    ON CONFLICT (user_id)
    DO UPDATE SET plan = ${plan}, status = 'active', updated_at = NOW()
    RETURNING *
  `
  return rows[0]
}

// ─────────────────────────────────────────────────────────────────────────────
// UNIVERSITIES
// ─────────────────────────────────────────────────────────────────────────────

export async function getUniversities(userId: string) {
  return await sql`
    SELECT * FROM universities
    WHERE user_id = ${userId}
    ORDER BY deadline ASC NULLS LAST, created_at DESC
  `
}

export async function getUniversitiesSimple(userId: string) {
  return await sql`
    SELECT id, name, program, deadline, status
    FROM universities
    WHERE user_id = ${userId}
    ORDER BY name ASC
  `
}

export async function getUniversityById(id: string, userId: string) {
  const rows = await sql`
    SELECT * FROM universities
    WHERE id = ${id} AND user_id = ${userId}
    LIMIT 1
  `
  return rows[0] ?? null
}

export async function createUniversity(userId: string, data: {
  name: string
  program?: string
  country?: string
  deadline?: string
  status?: string
  notes?: string
  portal_url?: string
  fee?: number
}) {
  const rows = await sql`
    INSERT INTO universities (
      user_id, name, program, country, deadline, status, notes, portal_url, fee
    ) VALUES (
      ${userId}, ${data.name}, ${data.program ?? null},
      ${data.country ?? null}, ${data.deadline ?? null},
      ${data.status ?? 'not_started'}, ${data.notes ?? null},
      ${data.portal_url ?? null}, ${data.fee ?? null}
    )
    RETURNING *
  `
  return rows[0]
}

export async function updateUniversity(id: string, userId: string, data: {
  name?: string
  program?: string
  country?: string
  deadline?: string
  status?: string
  notes?: string
  portal_url?: string
  fee?: number
}) {
  const rows = await sql`
    UPDATE universities SET
      name        = COALESCE(${data.name ?? null}, name),
      program     = COALESCE(${data.program ?? null}, program),
      country     = COALESCE(${data.country ?? null}, country),
      deadline    = COALESCE(${data.deadline ?? null}::DATE, deadline),
      status      = COALESCE(${data.status ?? null}, status),
      notes       = COALESCE(${data.notes ?? null}, notes),
      portal_url  = COALESCE(${data.portal_url ?? null}, portal_url),
      fee         = COALESCE(${data.fee ?? null}, fee),
      updated_at  = NOW()
    WHERE id = ${id} AND user_id = ${userId}
    RETURNING *
  `
  return rows[0] ?? null
}

export async function deleteUniversity(id: string, userId: string) {
  await sql`
    DELETE FROM universities WHERE id = ${id} AND user_id = ${userId}
  `
}

// ─────────────────────────────────────────────────────────────────────────────
// DOCUMENTS
// ─────────────────────────────────────────────────────────────────────────────

export async function getDocuments(userId: string) {
  return await sql`
    SELECT d.*, u.name AS university_name
    FROM documents d
    LEFT JOIN universities u ON d.university_id = u.id
    WHERE d.user_id = ${userId}
    ORDER BY d.created_at DESC
  `
}

export async function createDocument(userId: string, data: {
  name: string
  type?: string
  status?: string
  university_id?: string
  file_url?: string
  notes?: string
}) {
  const rows = await sql`
    INSERT INTO documents (user_id, name, type, status, university_id, file_url, notes)
    VALUES (
      ${userId}, ${data.name}, ${data.type ?? null},
      ${data.status ?? 'pending'}, ${data.university_id ?? null},
      ${data.file_url ?? null}, ${data.notes ?? null}
    )
    RETURNING *
  `
  return rows[0]
}

export async function updateDocument(id: string, userId: string, data: {
  name?: string
  type?: string
  status?: string
  file_url?: string
  notes?: string
}) {
  const rows = await sql`
    UPDATE documents SET
      name       = COALESCE(${data.name ?? null}, name),
      type       = COALESCE(${data.type ?? null}, type),
      status     = COALESCE(${data.status ?? null}, status),
      file_url   = COALESCE(${data.file_url ?? null}, file_url),
      notes      = COALESCE(${data.notes ?? null}, notes),
      updated_at = NOW()
    WHERE id = ${id} AND user_id = ${userId}
    RETURNING *
  `
  return rows[0] ?? null
}

export async function deleteDocument(id: string, userId: string) {
  await sql`
    DELETE FROM documents WHERE id = ${id} AND user_id = ${userId}
  `
}

// ─────────────────────────────────────────────────────────────────────────────
// EXAM TRACKER
// ─────────────────────────────────────────────────────────────────────────────

export async function getExamTracker(userId: string) {
  const rows = await sql`
    SELECT * FROM exam_tracker WHERE user_id = ${userId} LIMIT 1
  `
  return rows[0] ?? null
}

export async function upsertExamTracker(userId: string, data: {
  ielts_score?: number
  ielts_date?: string
  toefl_score?: number
  toefl_date?: string
  gre_score?: number
  gre_date?: string
  sat_score?: number
  sat_date?: string
  notes?: string
}) {
  const rows = await sql`
    INSERT INTO exam_tracker (
      user_id, ielts_score, ielts_date, toefl_score, toefl_date,
      gre_score, gre_date, sat_score, sat_date, notes
    ) VALUES (
      ${userId},
      ${data.ielts_score ?? null}, ${data.ielts_date ?? null},
      ${data.toefl_score ?? null}, ${data.toefl_date ?? null},
      ${data.gre_score ?? null},   ${data.gre_date ?? null},
      ${data.sat_score ?? null},   ${data.sat_date ?? null},
      ${data.notes ?? null}
    )
    ON CONFLICT (user_id) DO UPDATE SET
      ielts_score  = COALESCE(${data.ielts_score ?? null}, exam_tracker.ielts_score),
      ielts_date   = COALESCE(${data.ielts_date ?? null}::DATE, exam_tracker.ielts_date),
      toefl_score  = COALESCE(${data.toefl_score ?? null}, exam_tracker.toefl_score),
      toefl_date   = COALESCE(${data.toefl_date ?? null}::DATE, exam_tracker.toefl_date),
      gre_score    = COALESCE(${data.gre_score ?? null}, exam_tracker.gre_score),
      gre_date     = COALESCE(${data.gre_date ?? null}::DATE, exam_tracker.gre_date),
      sat_score    = COALESCE(${data.sat_score ?? null}, exam_tracker.sat_score),
      sat_date     = COALESCE(${data.sat_date ?? null}::DATE, exam_tracker.sat_date),
      notes        = COALESCE(${data.notes ?? null}, exam_tracker.notes),
      updated_at   = NOW()
    RETURNING *
  `
  return rows[0]
}

// ─────────────────────────────────────────────────────────────────────────────
// COST TRACKER
// ─────────────────────────────────────────────────────────────────────────────

export async function getCostTracker(userId: string) {
  return await sql`
    SELECT c.*, u.name AS university_name
    FROM cost_tracker c
    LEFT JOIN universities u ON c.university_id = u.id
    WHERE c.user_id = ${userId}
    ORDER BY c.created_at DESC
  `
}

export async function upsertCostTracker(userId: string, data: {
  id?: string
  university_id?: string
  category: string
  label: string
  amount: number
  currency?: string
  paid?: boolean
  due_date?: string
  notes?: string
}) {
  if (data.id) {
    // Update existing row
    const rows = await sql`
      UPDATE cost_tracker SET
        university_id = COALESCE(${data.university_id ?? null}, university_id),
        category      = ${data.category},
        label         = ${data.label},
        amount        = ${data.amount},
        currency      = COALESCE(${data.currency ?? null}, currency),
        paid          = COALESCE(${data.paid ?? null}, paid),
        due_date      = COALESCE(${data.due_date ?? null}::DATE, due_date),
        notes         = COALESCE(${data.notes ?? null}, notes),
        updated_at    = NOW()
      WHERE id = ${data.id} AND user_id = ${userId}
      RETURNING *
    `
    return rows[0]
  } else {
    // Insert new row
    const rows = await sql`
      INSERT INTO cost_tracker (
        user_id, university_id, category, label, amount, currency, paid, due_date, notes
      ) VALUES (
        ${userId},
        ${data.university_id ?? null},
        ${data.category},
        ${data.label},
        ${data.amount},
        ${data.currency ?? 'BDT'},
        ${data.paid ?? false},
        ${data.due_date ?? null},
        ${data.notes ?? null}
      )
      RETURNING *
    `
    return rows[0]
  }
}

export async function deleteCostItem(id: string, userId: string) {
  await sql`
    DELETE FROM cost_tracker WHERE id = ${id} AND user_id = ${userId}
  `
}

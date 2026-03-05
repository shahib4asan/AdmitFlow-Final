# 🚀 AdmitFlow — Setup Guide

> Never Miss a University Deadline Again.

Bangladesh-focused study abroad application tracker built with Next.js 14 + Supabase.

---

## 📁 Folder Structure

```
admitflow/
├── app/
│   ├── page.tsx                    ← Landing page
│   ├── layout.tsx                  ← Root layout
│   ├── globals.css
│   ├── auth/
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── callback/route.ts       ← OAuth callback
│   ├── dashboard/
│   │   ├── layout.tsx              ← Auth guard + sidebar
│   │   ├── page.tsx                ← Overview
│   │   ├── universities/page.tsx
│   │   ├── documents/page.tsx
│   │   ├── exams/page.tsx
│   │   └── costs/page.tsx
│   └── api/
│       └── cron/reminders/route.ts ← Email reminder cron
├── components/
│   ├── landing/                    ← Landing page sections
│   └── dashboard/                  ← Dashboard components
├── lib/
│   └── supabase.ts                 ← Supabase client
├── types/
│   └── database.ts                 ← TypeScript types
├── supabase/
│   └── schema.sql                  ← Run this in Supabase
├── middleware.ts                   ← Route protection
├── vercel.json                     ← Cron schedule
└── .env.local.example              ← Copy to .env.local
```

---

## ✅ STEP 1 — Local Setup

### 1.1 — Clone / download this project

```bash
# If you downloaded as zip, unzip it, then:
cd admitflow
```

### 1.2 — Install dependencies

```bash
npm install
```

### 1.3 — Create your .env.local file

```bash
cp .env.local.example .env.local
```

Leave it open — you'll fill in the values in the next steps.

---

## ✅ STEP 2 — Create Supabase Project

1. Go to **https://supabase.com**
2. Click **Start your project** → Sign in with GitHub
3. Click **New Project**
4. Fill in:
   - **Name**: admitflow
   - **Database Password**: make a strong password and SAVE IT
   - **Region**: Singapore (closest to Bangladesh)
5. Click **Create new project** — wait ~2 minutes

---

## ✅ STEP 3 — Run the Database Schema

1. In your Supabase project, click **SQL Editor** in the left sidebar
2. Click **New query**
3. Open the file `supabase/schema.sql` from this project
4. Copy ALL the content and paste it into the SQL editor
5. Click **Run** (green button)
6. You should see "Success. No rows returned" — your tables are created!

---

## ✅ STEP 4 — Get Your Supabase API Keys

1. In Supabase, click **Project Settings** (gear icon) → **API**
2. Copy these values into your `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **IMPORTANT**: The service role key is secret. Never put it in frontend code.

---

## ✅ STEP 5 — Configure Authentication

### 5.1 — Enable Email Auth

1. Supabase → **Authentication** → **Providers**
2. **Email** should already be enabled ✓

### 5.2 — Set Redirect URL

1. Supabase → **Authentication** → **URL Configuration**
2. Set **Site URL** to: `http://localhost:3000`
3. Add to **Redirect URLs**: `http://localhost:3000/auth/callback`

### 5.3 — Enable Google OAuth (Optional but recommended)

1. Go to **https://console.cloud.google.com**
2. Create a new project (or use existing)
3. Search for **"OAuth consent screen"** → Configure it (External)
4. Go to **Credentials** → **Create Credentials** → **OAuth Client ID**
5. Application type: **Web application**
6. Authorized redirect URIs: `https://xxxxxxxxxxxx.supabase.co/auth/v1/callback`
   (replace xxxxxxxxxxxx with your Supabase project ID)
7. Copy the **Client ID** and **Client Secret**
8. Go back to Supabase → **Authentication** → **Providers** → **Google**
9. Enable it and paste your Client ID and Client Secret

---

## ✅ STEP 6 — Create Storage Bucket

1. Supabase → **Storage** → **New bucket**
2. Name: `documents`
3. **Public bucket**: OFF (private)
4. Click **Save**

---

## ✅ STEP 7 — Set Up Email Reminders (Resend)

1. Go to **https://resend.com** → Sign up free
2. Go to **API Keys** → **Create API Key**
3. Copy the key and add to `.env.local`:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
   ```
4. In Resend, add your domain (or use the test `onboarding@resend.dev` for testing)
5. Update `from` email in `app/api/cron/reminders/route.ts`

---

## ✅ STEP 8 — Run Locally

```bash
npm run dev
```

Open **http://localhost:3000** — your app is running!

Test the flow:
1. Click "Get Started Free" → Create an account
2. Check your email → Confirm your account
3. Log in → You'll be taken to the dashboard
4. Add a university → Documents checklist is created automatically

---

## ✅ STEP 9 — Deploy to Vercel

### 9.1 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial AdmitFlow commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/admitflow.git
git push -u origin main
```

### 9.2 — Deploy on Vercel

1. Go to **https://vercel.com** → Log in with GitHub
2. Click **Add New** → **Project**
3. Find your `admitflow` repo → Click **Import**
4. Framework Preset: **Next.js** (auto-detected)
5. Click **Deploy** — first deploy will fail because env vars are missing

### 9.3 — Add Environment Variables in Vercel

1. Vercel → Your project → **Settings** → **Environment Variables**
2. Add ALL variables from your `.env.local`:

| Name | Value |
|------|-------|
| NEXT_PUBLIC_SUPABASE_URL | https://xxx.supabase.co |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | eyJ... |
| SUPABASE_SERVICE_ROLE_KEY | eyJ... |
| NEXT_PUBLIC_APP_URL | https://your-project.vercel.app |
| RESEND_API_KEY | re_... |
| CRON_SECRET | any-random-long-string |

3. Go to **Deployments** → click the three dots on your latest deployment → **Redeploy**

### 9.4 — Update Supabase Redirect URLs

After deployment, Supabase needs to know your production URL:

1. Supabase → **Authentication** → **URL Configuration**
2. Add to Site URL: `https://your-project.vercel.app`
3. Add to Redirect URLs: `https://your-project.vercel.app/auth/callback`

---

## ✅ STEP 10 — Enable Vercel Cron

The `vercel.json` file already sets up a daily cron at 8 AM UTC:

```json
{
  "crons": [{
    "path": "/api/cron/reminders",
    "schedule": "0 8 * * *"
  }]
}
```

This requires a **Vercel Pro plan** for cron jobs. Alternative: use a free service like **cron-job.org** to call your endpoint daily with the `x-cron-secret` header.

---

## 🔒 Security Checklist

- [x] Row Level Security enabled on all tables
- [x] Users can only read/write their own data
- [x] Service role key never exposed to frontend
- [x] Storage bucket is private
- [x] Cron endpoint protected with secret key
- [x] `.env.local` in `.gitignore`

---

## 🛠 Tech Stack

| Layer | Tool |
|-------|------|
| Frontend | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Database | Supabase Postgres |
| Auth | Supabase Auth (Email + Google) |
| File Storage | Supabase Storage |
| Email | Resend |
| Deployment | Vercel |

---

## 📈 Future Features (Not Yet Built)

- Payment integration (SSLCommerz for Bangladesh)
- WhatsApp reminder via Twilio
- Consultant dashboard (B2B)
- Visa stage tracker
- Referral system

---

## ❓ Need Help?

Common issues:

**"Invalid API Key" error**: Make sure your `.env.local` has no extra spaces around the `=` sign.

**Google login not working**: Double-check the redirect URI in Google Cloud Console matches exactly what Supabase shows.

**Emails not sending**: Check that your Resend domain is verified and the `from` address matches your verified domain.

**Cron not firing**: On free Vercel, crons don't work. Use cron-job.org as a free alternative.

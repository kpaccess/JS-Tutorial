# JS Mastery – Setup Guide

## 1. Create a Supabase project (free)

1. Go to https://app.supabase.com and create a new project
2. Wait for it to provision (~1 min)
3. Go to **Project Settings → API**
4. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon / public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 2. Set up the database

1. In Supabase, open **SQL Editor**
2. Paste the entire contents of `supabase/schema.sql`
3. Click **Run** — this creates all tables, RLS policies, and the auto-profile trigger

## 3. Configure environment variables

```bash
cp .env.local.example .env.local
# then fill in your Supabase URL and anon key
```

## 4. Run locally

```bash
npm install
npm run dev
# → http://localhost:3000
```

## 5. Deploy to Netlify

### Option A – Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify init
netlify env:set NEXT_PUBLIC_SUPABASE_URL  "your-url"
netlify env:set NEXT_PUBLIC_SUPABASE_ANON_KEY "your-key"
netlify deploy --prod
```

### Option B – Netlify UI (drag & drop or Git)
1. Push this repo to GitHub
2. Go to https://app.netlify.com → **Add new site → Import from Git**
3. Connect your repo
4. Build settings are auto-detected from `netlify.toml`
5. Add environment variables in **Site Settings → Environment variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Deploy!

### Supabase auth URLs
In Supabase → **Authentication → URL Configuration**:
- Set **Site URL** to your real deployed app URL, not localhost:
  `https://your-site.netlify.app`
- Add these **Redirect URLs**:
  `http://localhost:3000/api/auth/callback`
  `https://your-site.netlify.app/api/auth/callback`

Keep localhost in the redirect URL allow-list for local development, but do not use localhost as the Supabase **Site URL** for a production project. The Site URL is Supabase's fallback when a redirect URL is missing or rejected.

If Google sign-in sends you to a Netlify "Site not found" page, the **Site URL** is pointing at a deleted, renamed, or misspelled Netlify site. If Google sign-in sends you to `localhost:3000` from production, the **Site URL** is still set to localhost or the production callback URL is missing from the redirect allow-list. Update it to the current production URL and start the sign-in flow again from `/login`; do not refresh or reuse an old Google/Supabase callback URL.

### Google provider callback URL
In Google Cloud Console → your OAuth Client → **Authorized redirect URIs**, add the Supabase callback URL:
`https://your-project-id.supabase.co/auth/v1/callback`

---

## Architecture

```
app/
  page.tsx              ← Landing page
  login/page.tsx        ← Email/password login
  register/page.tsx     ← Sign up
  dashboard/
    layout.tsx          ← Auth guard + nav
    page.tsx            ← Course overview + progress
    course/[lessonId]/
      page.tsx          ← Server page (fetches data)
    progress/page.tsx   ← Detailed progress view
  api/auth/callback/    ← Supabase OAuth callback

components/
  layout/DashboardNav   ← Top navbar
  course/LessonViewer   ← Lesson content + 1hr timer
  quiz/QuizPanel        ← Quiz flow (intro → questions → result)

lib/
  supabase/             ← Client, server, proxy helpers
  course-data.ts        ← All 20 lessons + 100 quiz questions

supabase/
  schema.sql            ← DB migration (run once in SQL editor)
```

## Course structure

| Week | Level        | Topics |
|------|-------------|--------|
| 1    | Basic        | Intro, Variables, Operators, Control Flow, Loops |
| 2    | Intermediate | Functions, Arrays, Objects, DOM, Events |
| 3    | Advanced     | Async/Await, Fetch API, Closures, Classes, Modules |
| 4    | Advanced+    | Error Handling, Web APIs, Generators, Patterns, Performance |

**Grading:**
- Pass threshold: 70%
- 5 questions per lesson
- Sequential unlock: complete a lesson's quiz before the next unlocks
- Unlimited retakes on failure
- Minimum 1 hour per lesson before quiz unlocks

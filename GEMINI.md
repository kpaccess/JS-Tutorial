# Tutorial Series Project Metadata

## Project Overview
A multi-language interactive learning platform covering JavaScript, Java, and future languages like Python.

## Core Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4, shadcn/ui
- **Auth & Database**: Supabase (`@supabase/ssr` & `@supabase/supabase-js`)
- **Deployment**: Netlify (`@netlify/plugin-nextjs`)
- **Icons**: Lucide React
- **Notifications**: Sonner

## Architectural Rules & Conventions

### 1. Next.js 16 Awareness
- **CRITICAL**: This project uses an experimental/future version of Next.js (16.2.6).
- APIs, conventions, and file structure may differ from standard training data. 
- Always refer to `node_modules/next/dist/docs/` before making significant architectural assumptions or using new APIs.
- Heed all deprecation notices.

### 2. State & Data Fetching
- **Supabase**: Use Supabase for auth and database interactions. Refer to `/lib/supabase/` for client, server, and middleware utilities.
- **Data Model**: Core types are defined in `/types/index.ts`. Content is driven by static files in `/lib/courses/` and progress/state is stored in Supabase (`user_progress`, `quiz_attempts`).

### 3. Styling & UI Components
- **Tailwind v4**: This project uses Tailwind CSS v4 via `@tailwindcss/postcss`. Avoid using legacy v3 patterns if they conflict.
- **shadcn/ui**: Rely on existing components in `/components/ui/` before building custom UI elements or adding new libraries.

### 4. Git Protocol
- Avoid staging or committing changes automatically unless explicitly requested.

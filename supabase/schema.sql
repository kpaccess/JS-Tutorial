-- Run this in your Supabase SQL editor to set up the database

-- Profiles (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text not null default '',
  email text not null default '',
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- User progress per lesson
create table public.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  lesson_id text not null,
  completed boolean not null default false,
  time_spent_minutes integer not null default 0,
  last_accessed_at timestamptz not null default now(),
  completed_at timestamptz,
  unique(user_id, lesson_id)
);

alter table public.user_progress enable row level security;

create policy "Users manage own progress"
  on public.user_progress for all
  using (auth.uid() = user_id);

-- Quiz attempts
create table public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  lesson_id text not null,
  score integer not null,
  total_questions integer not null,
  passed boolean not null,
  answers jsonb not null default '[]',
  attempt_number integer not null default 1,
  created_at timestamptz not null default now()
);

alter table public.quiz_attempts enable row level security;

create policy "Users manage own attempts"
  on public.quiz_attempts for all
  using (auth.uid() = user_id);

-- Indexes
create index on public.user_progress(user_id);
create index on public.quiz_attempts(user_id, lesson_id);

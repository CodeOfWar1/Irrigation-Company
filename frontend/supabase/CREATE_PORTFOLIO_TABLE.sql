-- Create portfolio_projects table in Supabase
-- 1. Go to https://supabase.com/dashboard and open your project
-- 2. Click "SQL Editor" in the left sidebar
-- 3. Click "New query", paste this entire file, then click "Run"

create table if not exists public.portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sector text not null default 'Commercial & institutional' check (sector in ('Residential', 'Commercial & institutional')),
  image_urls jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.portfolio_projects enable row level security;

drop policy if exists "Portfolio projects are viewable by everyone" on public.portfolio_projects;
create policy "Portfolio projects are viewable by everyone"
  on public.portfolio_projects for select
  using (true);

drop policy if exists "Authenticated users can insert portfolio projects" on public.portfolio_projects;
create policy "Authenticated users can insert portfolio projects"
  on public.portfolio_projects for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated users can update portfolio projects" on public.portfolio_projects;
create policy "Authenticated users can update portfolio projects"
  on public.portfolio_projects for update
  to authenticated
  using (true);

drop policy if exists "Authenticated users can delete portfolio projects" on public.portfolio_projects;
create policy "Authenticated users can delete portfolio projects"
  on public.portfolio_projects for delete
  to authenticated
  using (true);

-- Optional: allow anonymous insert so the app can add projects without auth (e.g. if admin uses API key only)
-- Uncomment the next 3 lines only if you want anyone with the anon key to insert:
-- drop policy if exists "Allow anon insert portfolio" on public.portfolio_projects;
-- create policy "Allow anon insert portfolio" on public.portfolio_projects for insert to anon with check (true);

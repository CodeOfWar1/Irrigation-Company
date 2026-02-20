-- Portfolio projects: admin-added projects shown on the portfolio page.
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New query).

create table if not exists public.portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sector text not null default 'Commercial & institutional' check (sector in ('Residential', 'Commercial & institutional')),
  image_urls jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

-- Allow read for anonymous (public portfolio page) and full access for authenticated users (admin).
alter table public.portfolio_projects enable row level security;

create policy "Portfolio projects are viewable by everyone"
  on public.portfolio_projects for select
  using (true);

create policy "Authenticated users can insert portfolio projects"
  on public.portfolio_projects for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update portfolio projects"
  on public.portfolio_projects for update
  to authenticated
  using (true);

create policy "Authenticated users can delete portfolio projects"
  on public.portfolio_projects for delete
  to authenticated
  using (true);

comment on table public.portfolio_projects is 'Projects added from admin dashboard; shown on portfolio page with file-based projects.';

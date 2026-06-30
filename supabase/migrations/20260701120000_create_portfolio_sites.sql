create table public.portfolio_sites (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.portfolio_sites enable row level security;

create policy "Public read published sites"
  on public.portfolio_sites
  for select
  to anon, authenticated
  using (published = true);

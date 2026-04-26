-- Nile Horizon — Supabase schema for trips + storage
-- Run in Supabase SQL Editor (or via migrations).

create extension if not exists "pgcrypto";

-- Trips ---------------------------------------------------------------------
create table public.trips (
  id uuid primary key default gen_random_uuid(),
  title_ar text not null,
  title_en text not null,
  short_description_ar text,
  short_description_en text,
  full_description_ar text,
  full_description_en text,
  destination text not null check (destination in ('sharm', 'hurghada', 'marsa_alam')),
  duration text not null,
  price numeric(12, 2) not null,
  currency text not null default 'USD',
  cover_image text,
  gallery_images text[] not null default '{}',
  is_featured boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists trips_destination_idx on public.trips (destination);
create index if not exists trips_active_idx on public.trips (is_active);
create index if not exists trips_featured_idx on public.trips (is_featured);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trips_set_updated_at on public.trips;
create trigger trips_set_updated_at
before update on public.trips
for each row execute procedure public.set_updated_at();

alter table public.trips enable row level security;

-- Anonymous users: only active trips
create policy "trips_select_public_active"
  on public.trips
  for select
  to anon
  using (is_active = true);

-- Authenticated users (admins): full access
create policy "trips_select_authenticated"
  on public.trips
  for select
  to authenticated
  using (true);

create policy "trips_insert_authenticated"
  on public.trips
  for insert
  to authenticated
  with check (true);

create policy "trips_update_authenticated"
  on public.trips
  for update
  to authenticated
  using (true)
  with check (true);

create policy "trips_delete_authenticated"
  on public.trips
  for delete
  to authenticated
  using (true);

-- Storage -------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('trip-images', 'trip-images', true)
on conflict (id) do nothing;

create policy "trip_images_public_read"
  on storage.objects
  for select
  to public
  using (bucket_id = 'trip-images');

create policy "trip_images_auth_upload"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'trip-images');

create policy "trip_images_auth_update"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'trip-images');

create policy "trip_images_auth_delete"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'trip-images');

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

-- Admin panel + public site use anon/publishable key
create policy "trips_select_anon"
  on public.trips
  for select
  to anon
  using (true);

create policy "trips_insert_anon"
  on public.trips
  for insert
  to anon
  with check (true);

create policy "trips_update_anon"
  on public.trips
  for update
  to anon
  using (true)
  with check (true);

create policy "trips_delete_anon"
  on public.trips
  for delete
  to anon
  using (true);

-- Authenticated users (Supabase Auth) — full access
create policy "trips_all_authenticated"
  on public.trips
  for all
  to authenticated
  using (true)
  with check (true);

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

-- Admin panel uses anon key (local password auth) — allow image uploads
create policy "trip_images_anon_upload"
  on storage.objects
  for insert
  to anon
  with check (bucket_id = 'trip-images');

create policy "trip_images_anon_update"
  on storage.objects
  for update
  to anon
  using (bucket_id = 'trip-images');

create policy "trip_images_anon_delete"
  on storage.objects
  for delete
  to anon
  using (bucket_id = 'trip-images');

-- Bookings ------------------------------------------------------------------
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  trip_id text not null,
  trip_title text,
  customer_name text not null,
  customer_email text,
  customer_phone text not null,
  travel_date date,
  guests int not null default 1 check (guests > 0),
  message text,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'cancelled')),
  locale text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists bookings_status_idx on public.bookings (status);
create index if not exists bookings_created_idx on public.bookings (created_at desc);
create index if not exists bookings_trip_idx on public.bookings (trip_id);

drop trigger if exists bookings_set_updated_at on public.bookings;
create trigger bookings_set_updated_at
before update on public.bookings
for each row execute procedure public.set_updated_at();

alter table public.bookings enable row level security;

-- Public website: submit booking requests
create policy "bookings_insert_anon"
  on public.bookings
  for insert
  to anon
  with check (true);

create policy "bookings_select_anon"
  on public.bookings
  for select
  to anon
  using (true);

create policy "bookings_update_anon"
  on public.bookings
  for update
  to anon
  using (true)
  with check (true);

create policy "bookings_delete_anon"
  on public.bookings
  for delete
  to anon
  using (true);

-- Authenticated admins (Supabase Auth)
create policy "bookings_all_authenticated"
  on public.bookings
  for all
  to authenticated
  using (true)
  with check (true);
